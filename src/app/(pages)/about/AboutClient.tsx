'use client';

import Image, { ImageProps } from 'next/image';
import { useTranslation, Trans } from 'react-i18next';
import removeContextMenu from '../../../utils/removeContextMenu';
import StaticImageSlider from '@/components/StaticImageSlider';
import useViewportWidth from '@/hooks/useViewportWidth';
import { smBreakpoint } from '@/data/breakpoints';
import { FormattedImage } from '@/types';

const aboutSectionDraws: any[] = [
  {
    src: '/lutin.webp',
    alt: 'lutin barbu au chapeau pointu tenant un crayon',
    width: 1323,
    height: 1389,
    text: (
      <Trans
        i18nKey="common:about.bubble1"
        components={{ break: <br />, strong: <strong /> }}
      />
    ),
  },
  {
    src: '/lutin.webp',
    alt: 'lutin barbu au chapeau pointu tenant un crayon',
    width: 1323,
    height: 1389,
    text: (
      <Trans
        i18nKey="common:about.bubble2"
        components={{ strong: <strong /> }}
      />
    ),
  },
];

type GalleryClientProps = {
  images: FormattedImage[] | null;
};

const AboutClient: React.FC<GalleryClientProps> = ({ images }) => {
  useTranslation();
  const windowWidth = useViewportWidth();

  const imagesJSX =
    images === null
      ? []
      : images.map((img, i) => {
          const { src, alt, width, height, formats } = img;
          return (
            <div
              key={i}
              className="h-full"
            >
              <Image
                className="size-full object-contain"
                // className="h-[45%] sm:h-2/3 w-auto"
                src={src}
                alt={alt}
                width={width}
                height={height}
                placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
                blurDataURL={formats?.thumbnail?.url}
                onContextMenu={removeContextMenu}
                quality={100}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* <div className="absolute top-0 right-0 w-[380px] sm:w-[450px] lg:w-[400px] h-[280px] sm:h-[330px] lg:h-[300px] px-14 sm:px-6 pb-24 pt-9 sm:pt-7 flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat">
          <p className="licorice-font text-2.5xl sm:text-4xl lg:text-3xl font-semibold text-center text-pretty">
            {draw.text}
          </p>
        </div> */}
            </div>
          );
        });

  return (
    <div className="relative flex-1 max-sm:flex max-sm:flex-col">
      <h1 className="max-sm:text-center text-primary-600 annie-use-your-telescope thickening-1 text-6.5xl sm:text-7xl 2xl:text-8xl">
        <span className="underline-custom after:h-[0.325rem] after:bottom-4">
          Qui suis je ?
        </span>
      </h1>
      <div className="relative sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 max-sm:flex-1 sm:h-full flex justify-center items-center">
        {aboutSectionDraws.length > 0 && (
          <StaticImageSlider
            className="w-screen sm:w-[600px] lg:w-[1000px] h-[430px] sm:h-[550px] lg:h-[430px]"
            isArrowsVisible={aboutSectionDraws.length > 1}
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
