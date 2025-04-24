'use client';

import Image, { ImageProps } from 'next/image';
import { useTranslation, Trans } from 'react-i18next';
import removeContextMenu from '../../../utils/removeContextMenu';
import StaticImageSlider from '@/components/StaticImageSlider';
import useViewportWidth from '@/hooks/useViewportWidth';
import { smBreakpoint } from '@/data/breakpoints';
import { FormattedImage } from '@/types';
import LoadableImage from '@/components/LoadableImage';

type GalleryClientProps = {
  images: FormattedImage[] | null;
};

const AboutClient: React.FC<GalleryClientProps> = ({ images }) => {
  useTranslation();
  const windowWidth = useViewportWidth();

  // Seule la première image du slider, visible dès le chargement de la page,
  // est marquée avec `priority={true}` pour que Next.js la précharge immédiatement (via <link rel="preload"> dans le <head>).
  // Cela optimise le LCP (Largest Contentful Paint) et améliore les performances.
  // Les autres images seront chargées de manière lazy par défaut (chargement de l'img lors de son premier rendu).
  const imagesJSX =
    images === null
      ? []
      : images.map((img, i) => {
          const { formats, ...rest } = img;
          return (
            <div key={i} className="h-full">
              <LoadableImage
                className="size-full object-contain"
                {...rest}
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 37rem, 62rem"
                priority={i === 0}
                placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
                blurDataURL={formats?.thumbnail?.url}
                onContextMenu={removeContextMenu}
              />
            </div>
          );
        });

  return (
    <div className="relative flex-1 flex flex-col items-center gap-5 sm:gap-10">
      <h1 className="text-center text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
        Qui suis je ?
      </h1>
      <div className="flex-1 flex items-center justify-center">
        {imagesJSX.length > 0 && (
          <StaticImageSlider
            className="w-screen sm:w-[37rem] lg:w-[62rem] h-[27rem] sm:h-[35rem] lg:h-[27rem] 3xl:h-[31rem]"
            isArrowsVisible={imagesJSX.length > 1}
            arrowsPosition={windowWidth < smBreakpoint ? 'under' : 'lateral'}
          >
            {imagesJSX}
          </StaticImageSlider>
        )}
      </div>
    </div>
  );
};

export default AboutClient;
