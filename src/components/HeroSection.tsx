'use client';

import Image, { ImageProps } from 'next/image';
import { Trans, useTranslation } from 'react-i18next';
import Button from './Button';
import Link from 'next/link';
import HomeBubble from '@/components/HomeBubble';
import { motion } from 'framer-motion';
import useViewportWidth from '@/hooks/useViewportWidth';
import { mobileBreakpoint } from '@/data/breakpoints';
import { homeSectionIds, routes } from '@/config/config.global';
import { BackgroundImage } from '@/lib/api';
import ArrowDownAnimation from './ArrowDownAnimation ';
import scrollToSection from '@/utils/scrollToSection';
import removeContextMenu from '@/utils/removeContextMenu';

const dwarfImg: ImageProps = {
  src: '/about/lutin.png',
  alt: 'lutin barbu au chapeau pointu tenant un crayon',
  width: 1323,
  height: 1389,
};

type bubbleType = {
  x: string;
  y: string;
  delay: number;
  initialRotate: number;
};

const bubblesData: bubbleType[] = [
  {
    x: 'sm:left-[10%] lg:left-[55%] xl:left-[27%] 3xl:left-[30%]',
    y: 'sm:max-lg:top-[18%] lg:max-xl:bottom-[10%] xl:top-[20%]',
    delay: 0.5,
    initialRotate: -500,
  },
  {
    x: 'sm:left-[45%]',
    y: 'sm:top-[15%]',
    delay: 1,
    initialRotate: 800,
  },
  {
    x: 'sm:max-lg:right-[12%] lg:max-xl:right-[8%] xl:left-[55%]',
    y: 'sm:bottom-[22%] lg:bottom-[8%] xl:bottom-[10%]',
    delay: 1.5,
    initialRotate: -600,
  },
];

interface HomeProps {
  backgroundImage: BackgroundImage | null;
}

const HeroSection: React.FC<HomeProps> = ({ backgroundImage }) => {
  const windowWidth = useViewportWidth();

  const bgStyle: React.CSSProperties & { [key: string]: string } = {
    '--bg-url-mobile': backgroundImage?.bgImageMobile
      ? `url(${backgroundImage.bgImageMobile})`
      : 'url(/home-mobile.webp)',

    '--bg-url-desktop': backgroundImage?.bgImageDesktop
      ? `url(${backgroundImage.bgImageDesktop})`
      : 'url(/home.webp)',
  };

  const bubbles = bubblesData.map((bubble, i) => (
    <motion.div
      key={i}
      initial={{
        scale: 0,
        rotate: windowWidth < mobileBreakpoint ? 0 : bubble.initialRotate,
      }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: bubble.delay, duration: 1.5, type: 'spring' }}
      className={`sm:absolute ${bubble.x} ${bubble.y}`}
    >
      <HomeBubble idx={i} />
    </motion.div>
  ));

  return (
    <section
      id={homeSectionIds.firstSection}
      style={bgStyle}
      className="h-[130vh] sm:h-[160vh] flex flex-col pb-16 section-pt"
    >
      <div className="relative flex max-sm:flex-col-reverse flex-col justify-center items-center gap-6 xl:gap-20 py-10">
        <div className="flex flex-col gap-10 regards">
          <p className="text-7xl">
            Bienvenue dans mon atelier,
            <br />
            source de rêves crayonnés.
          </p>
          <h1 className="text-right text-4.5xl underline decoration-4 underline-offset-4">
            Amaia Carrere
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Link
              href={''}
              className="relative z-10 transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="rounded-3xl px-8 sm:px-10 lg:px-8 py-3 sm:py-5 lg:py-4 luckiest-guy text-2xl sm:text-3xl lg:text-2xl"
                onClick={(e) =>
                  scrollToSection(e, homeSectionIds.secondSection)
                }
                aria-label={`Scroll down to the next section`}
                tabIndex={0}
              >
                Découvrir
              </Button>
            </Link>
            <div className="absolute right-[150%] -bottom-9 w-60">
              <Image
                {...dwarfImg}
                className="size-full object-contain"
                onContextMenu={removeContextMenu}
                quality={100}
              />
            </div>
          </div>
          <ArrowDownAnimation />
        </div>
        {/* {windowWidth < mobileBreakpoint ? (
          <div className="w-screen">{bubbles}</div>
        ) : (
          bubbles
        )} */}
      </div>
      <div className="flex-1 hero-bg gray-to-color"></div>
    </section>
  );
};

export default HeroSection;

// Blur black local
{
  /* <h1 className="inspiration-font text-6xl sm:text-6.5xl xl:text-[8rem] thickening-1 rounded-3xl px-6 py-2 border border-black text-white bg-black/30 backdrop-blur-sm"> */
}
// Blur white local
{
  /* <h1 className="inspiration-font text-6xl sm:text-6.5xl xl:text-[8rem] thickening-1 bg-white/30 sm:backdrop-blur-sm rounded-3xl px-6 py-2"> */
}
// Overlay black global
{
  /* <h1 className="inspiration-font text-6xl sm:text-6.5xl xl:text-[8rem] thickening-2 text-white"> */
}
// .hero-bg {
//   @apply bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/40;
