'use client';

import { useState } from 'react';
import GalleryItem from '../../../components/GalleryItem';
import ModalWithTransition from '../../../components/ModalWithTransition';
import GallerySlider from '../../../components/GallerySlider';
import { FormattedImage } from '@/types';

type GalleryClientProps = {
  images: FormattedImage[] | null;
};

export const GALLERY_SLIDER_SIZES = "80vw";

const GalleryClient: React.FC<GalleryClientProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openModal = (imgIdx: number) => {
    setActiveIdx(imgIdx);
  };
  const closeModal = () => {
    setActiveIdx(null);
  };

  const galleryItems =
    images === null
      ? null
      : images.map((img, i: number) => (
          <GalleryItem key={i} image={img} imgIdx={i} openModal={openModal} />
        ));

  return (
    <div className="flex-1 flex flex-col items-center gap-10 sm:gap-16">
      <h1 className="text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
        Galerie
      </h1>
      <div className="lg:w-[55rem] xl:w-[75rem] 2xl:w-[80rem] 3xl:w-[90rem] columns-2 md:columns-3 xl:columns-4 gap-3 lg:gap-5">
        {galleryItems}
      </div>
      <ModalWithTransition visible={activeIdx !== null} closeModal={closeModal}>
        {activeIdx !== null && images !== null && (
          <GallerySlider images={images} imgIdx={activeIdx} />
        )}
      </ModalWithTransition>
    </div>
  );
};

export default GalleryClient;


// Exemple simplifié de ce que voit le navigateur :
{/* <img
  src="/_next/image?url=...&w=1200&q=100"
  srcset="
    /_next/image?url=...&w=640&q=100 640w,
    /_next/image?url=...&w=750&q=100 750w,
    /_next/image?url=...&w=1080&q=100 1080w,
    /_next/image?url=...&w=1920&q=100 1920w
  "
  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 30vw, 20vw"
/> */}


// const preloadOptimizedImage = (imageUrl: string, width: number = 1200, quality: number = 100) => {
//   const url = new URL('/_next/image', window.location.origin);
//   url.searchParams.set('url', imageUrl);
//   url.searchParams.set('w', width.toString());
//   url.searchParams.set('q', quality.toString());

//   const img = new window.Image();
//   img.src = url.toString();
// };

// Variante avec contrôle de window.innerWidth
// const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
// const getIdealWidth = () => {
//   if (viewportWidth < 768) return 600;
//   if (viewportWidth < 1280) return 1000;
//   return 1400;
// };
// Puis utiliser w=${getIdealWidth()} dans l’URL de préchargement
// Comme tu le sais, tu peux générer toi-même cette URL avec les bons paramètres :
// const nextOptimizedUrl = `/__next/image?url=${encodeURIComponent(image.src)}&w=${width}&q=${quality}`;
// Mais attention, ce n’est fiable que si tu connais bien le fonctionnement de ton next.config.js, notamment :
// les deviceSizes
// les imageSizes
// le loader utilisé
// la qualité par défaut

