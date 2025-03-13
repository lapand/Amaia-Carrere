'use client';

import Image, { ImageProps } from 'next/image';
import { Trans, useTranslation } from 'react-i18next';
import Button from './Button';
import Link from 'next/link';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { homeSectionIds } from '@/config/config.global';
import { BackgroundImage } from '@/lib/api';
import ArrowDownAnimation from './ArrowDownAnimation ';
import scrollToSection from '@/utils/scrollToSection';
import removeContextMenu from '@/utils/removeContextMenu';
import { useRef } from 'react';
import useViewportWidth from '@/hooks/useViewportWidth';
import { smBreakpoint } from '@/data/breakpoints';

const dwarfImg: ImageProps = {
  src: '/about/lutin.png',
  alt: 'lutin barbu au chapeau pointu tenant un crayon',
  width: 1323,
  height: 1389,
};

interface HomeProps {
  backgroundImage: BackgroundImage | null;
}

const HeroSection: React.FC<HomeProps> = ({ backgroundImage }) => {
  const windowWidth = useViewportWidth();
  const isMobileViewport = windowWidth < smBreakpoint;
  const heroBgRef = useRef<HTMLDivElement>(null);

  const bgStyle: React.CSSProperties & { [key: string]: string } = {
    '--bg-url-mobile': backgroundImage?.bgImageMobile
      ? `url(${backgroundImage.bgImageMobile})`
      : 'url(/home-mobile.webp)',

    '--bg-url-desktop': backgroundImage?.bgImageDesktop
      ? `url(${backgroundImage.bgImageDesktop})`
      : 'url(/home.webp)',
  };

  // MotionValues indiquant la progression(scrollYProgress) et position(scrollY) du scroll vertical
  const { scrollYProgress } = useScroll({
    target: heroBgRef,
    offset: ['start end', 'end end'],
  });

  // Utilisation de useSpring pour adoucir l'animation de la progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const maskImageProgress = useTransform(smoothProgress, (progress) => {
    const start = progress * 100;
    let startOpacity = 0;
    if (progress < 0.1) {
      startOpacity = progress / 0.1;
    } else {
      startOpacity = 1;
    }

    return `linear-gradient(to top left, rgba(0, 0, 0, ${startOpacity}), rgba(0, 0, 0, ${startOpacity}) ${start}%, rgba(0, 0, 0, 0) ${
      start + 5
    }%)`;
  });

  const pointerEventsMotionValue = useTransform(smoothProgress, (progress) =>
    progress < 0.3 ? 'none' : 'auto'
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('scrollYProgress: ', latest);
  });

  return (
    <section
      id={homeSectionIds.firstSection}
      style={bgStyle}
      className="flex flex-col"
    >
      <div className="sticky top-[var(--header-height)] hero-height flex flex-col justify-center items-center gap-10 sm:gap-20 p-2 max-sm:-mt-10">
        <div className="flex flex-col gap-6 2xl:gap-10 annie-use-your-telescope thickening-1">
          <p className="text-center text-4.5xl xs:text-5xl sm:text-6xl md:text-6.5xl lg:text-7xl xl:text-8xl 3xl:text-9xl">
            Bienvenue dans mon atelier,
            {!isMobileViewport ? <br /> : ' '}
            source de rêves crayonnés.
          </p>
          <h1 className="text-right text-4.5xl sm:text-5xl lg:text-5.5xl xl:text-6xl underline-custom after:h-1 after:w-52 sm:after:w-[32rem] lg:after:w-[37.6rem]">
            Amaia Carrere
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Link
              href={''}
              className="relative transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="rounded-3xl px-8 lg:px-8 py-3 lg:py-4 luckiest-guy text-xl lg:text-2xl"
                onClick={(e) =>
                  scrollToSection(e, homeSectionIds.secondSection)
                }
                aria-label={`Scroll down to the next section`}
                tabIndex={0}
              >
                Découvrir
              </Button>
            </Link>
            <div className="absolute right-[50%] xs:right-[65%] sm:right-[145%] lg:right-[164%] xl:right-[145%] 3xl:right-[105%] bottom-[-3.2rem] sm:-bottom-9 lg:-bottom-10 w-[12rem] sm:w-[14rem] lg:w-[15.3rem]">
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
        <motion.div
          className="absolute top-0 left-0 hero-height w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: isMobileViewport
              ? `var(--bg-url-mobile)`
              : `var(--bg-url-desktop)`,
            maskImage: maskImageProgress,
            pointerEvents: pointerEventsMotionValue,
          }}
        />
      </div>
      <div
        ref={heroBgRef}
        id={homeSectionIds.secondSection}
        className="hero-height"
      />
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
