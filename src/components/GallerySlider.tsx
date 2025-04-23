import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import removeContextMenu from '../utils/removeContextMenu';
import { FormattedImage } from '@/types';
import { getNextIdx, getPrevIdx } from '@/utils/getIndex';
import { GALLERY_SLIDER_SIZES } from '@/app/(pages)/gallery/GalleryClient';
import { preloadOptimizedImage } from '@/utils/preloadOptimizedImage';
import { AnimatePresence, motion } from 'framer-motion';

type GallerySliderProps = {
  /** Tableau d'images formatées à afficher dans le slider */
  images: FormattedImage[];
  /** Index initial de l'image active */
  imgIdx: number;
  /** Durée de transition des slides (en secondes) */
  slideDuration?: number;
};

const arrowIconUri = '/arrow.svg';

/**
 * Composant de diaporama plein écran permettant de naviguer entre des images,
 * avec préchargement des images adjacentes et animations de transition.
 *
 * - Utilise `framer-motion` pour les animations d'entrée/sortie.
 * - Précharge les 2 images précédentes et suivantes.
 * - Affiche un loader uniquement si le chargement dépasse un seuil de 0.4s.
 * - Utilise le composant `Image` de Next.js pour bénéficier de l'optimisation.
 */
const GallerySlider: React.FC<GallerySliderProps> = ({
  images,
  imgIdx,
  slideDuration = 0.4,
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(imgIdx);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { src, alt, width, height, formats } = images[activeIdx];

  useEffect(() => {
    setIsTransitioning(true);

    // Preload les 2 img précédentes et les 2 suivantes
    const offsets = [-2, -1, 1, 2];
    offsets.forEach((offset) => {
      const idx = (activeIdx + offset + images.length) % images.length;
      preloadOptimizedImage(images[idx].src, {
        sizes: GALLERY_SLIDER_SIZES,
      });
    });
  }, [activeIdx, images]);

  /** Affiche l'image précédente */
  const handlePrev = () => {
    setActiveIdx(getPrevIdx(images, activeIdx));
  };

  /** Affiche l'image suivante */
  const handleNext = () => {
    setActiveIdx(getNextIdx(images, activeIdx));
  };

  return (
    <div className="h-full flex justify-between">
      <button
        className="w-[10%] rotate-180 bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handlePrev()}
        aria-label="prev image"
      />
      <div className={`w-4/5 my-8`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="size-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: slideDuration / 2 }}
          >
            {isTransitioning && (
              <motion.div
                className="size-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Loader width={100} height={80} />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              transition={{ duration: slideDuration / 2 }}
              className="size-full"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={GALLERY_SLIDER_SIZES}
                quality={100}
                placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
                blurDataURL={formats?.thumbnail?.url}
                className="size-full object-contain"
                onLoad={() => setIsTransitioning(false)}
                onContextMenu={removeContextMenu}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        className="w-[10%] bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      />
    </div>
  );
};

export default GallerySlider;
