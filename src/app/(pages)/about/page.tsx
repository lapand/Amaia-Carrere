'use client';

import Image, { ImageProps } from 'next/image';
import { useTranslation, Trans } from 'react-i18next';
import removeContextMenu from '../../../utils/removeContextMenu';
import StaticImageSlider from '@/components/StaticImageSlider';
import useViewportWidth from '@/hooks/useViewportWidth';
import { mobileBreakpoint } from '@/config/config';

interface aboutSectionDrawsType extends ImageProps {
  text: React.ReactNode;
}

const aboutSectionDraws: aboutSectionDrawsType[] = [
  {
    src: '/about/lutin.png',
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
    src: '/about/lutin.png',
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

const About: React.FC = () => {
  useTranslation();
  const windowWidth = useViewportWidth();

  const drawsComponents = aboutSectionDraws.map((draw, i) => {
    return (
      <div key={i} className="h-full relative flex lg:justify-center items-end">
        <Image
          {...draw}
          // className="size-full object-contain"
          className="h-[45%] sm:h-2/3 w-auto"
          onContextMenu={removeContextMenu}
          quality={100}
        />
        <div className="absolute top-0 right-0 w-[380px] sm:w-[450px] lg:w-[400px] h-[280px] sm:h-[330px] lg:h-[300px] px-8 sm:px-6 pb-24 pt-9 sm:pt-7 flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat">
          <p className="licorice-font text-2.5xl sm:text-4xl lg:text-3xl font-semibold text-center text-pretty">
            {draw.text}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="relative flex-1 max-sm:flex max-sm:flex-col">
      <h1 className="text-6xl sm:text-6.5xl xl:text-7xl inspiration-font thickening-2 max-sm:ml-10">
        Qui suis je ?
      </h1>
      <div className="relative sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 max-sm:flex-1 sm:h-full flex justify-center items-center">
        {aboutSectionDraws.length > 0 && (
          <StaticImageSlider
            className="w-screen sm:w-[600px] lg:w-[1000px] h-[430px] sm:h-[550px] lg:h-[430px]"
            isArrowsVisible={aboutSectionDraws.length > 1}
            arrowsPosition={
              windowWidth < mobileBreakpoint ? 'under' : 'lateral'
            }
          >
            {drawsComponents}
          </StaticImageSlider>
        )}
      </div>
    </div>
  );
};

export default About;
