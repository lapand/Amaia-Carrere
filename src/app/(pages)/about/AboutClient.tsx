'use client';

import { useTranslation, Trans } from 'react-i18next';
import removeContextMenu from '../../../utils/removeContextMenu';
import { FormattedImage } from '@/types';
import LoadableImage from '@/components/LoadableImage';
import StaticSlider from '@/components/StaticSlider';
import { smBreakpoint } from '@/data/breakpoints';
import useViewportWidth from '@/hooks/useViewportWidth';

type GalleryClientProps = {
  images: FormattedImage[] | null;
};

const AboutClient: React.FC<GalleryClientProps> = ({ images }) => {
  const windowWidth = useViewportWidth();
  useTranslation();

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
      <StaticSlider
        className="flex-1 flex items-center w-full sm:w-[35rem] lg:w-[40rem] 3xl:w-[50rem]"
        aspectRatioClassName="aspect-square lg:aspect-video"
        isControlArrowsVisible={windowWidth >= smBreakpoint}
        arrowBtnStyle={{
          width: '4rem',
          borderRadius: '0 200px 200px 0',
          transitionDuration: '500ms',
        }}
        arrowBtnHoverStyle={{
          backgroundColor: 'rgba(117,69,145,.3)',
        }}
        isPaginationVisible
        maxSlides={7}
        transitionType="slide"
        draggable
      >
        {imagesJSX}
      </StaticSlider>
    </div>
  );
};

export default AboutClient;
