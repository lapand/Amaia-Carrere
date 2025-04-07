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
import ArrowDownAnimation from './ArrowDownAnimation ';
import scrollToSection from '@/utils/scrollToSection';
import removeContextMenu from '@/utils/removeContextMenu';
import { useRef } from 'react';
import useViewportWidth from '@/hooks/useViewportWidth';
import { lgBreakpoint, smBreakpoint } from '@/data/breakpoints';
import { HeroBg } from '@/types';

const dwarfImg: ImageProps = {
  src: '/lutin-violet.webp',
  alt: 'lutin barbu au chapeau pointu tenant un crayon',
  width: 1323,
  height: 1389,
};

interface HomeProps {
  backgroundImage: HeroBg;
}

const HeroSection: React.FC<HomeProps> = ({ backgroundImage }) => {
  const windowWidth = useViewportWidth();
  const isMobileViewport = windowWidth < smBreakpoint;
  const isViewportAboveLg = windowWidth >= lgBreakpoint;
  const heroBgRef = useRef<HTMLDivElement>(null);

  const bgStyle: React.CSSProperties & { [key: string]: string } = {
    '--bg-url-mobile': `url(${backgroundImage.heroMobile})`,
    '--bg-url-desktop': `url(${backgroundImage.heroDesktop})`,
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

  // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  //   console.log('scrollYProgress: ', latest);
  // });

  return (
    <section
      id={homeSectionIds.firstSection}
      style={bgStyle}
      className="flex flex-col"
    >
      <div className="sticky overflow-hidden top-[var(--header-height)] hero-height flex flex-col justify-center items-center gap-10 sm:gap-20 px-2 xs:px-4 sm:px-0 max-sm:-mt-10">
        <div className=" flex flex-col gap-6 2xl:gap-10 annie-use-your-telescope thickening-1">
          <p className="text-center text-4.5xl sm:text-6xl md:text-6.5xl lg:text-7xl xl:text-8xl 3xl:text-9xl">
            Bienvenue dans mon atelier,
            {!isMobileViewport ? <br /> : ' '}
            source de rêves crayonnés.
          </p>
          <div className="self-end relative w-[70%] sm:w-[25rem] lg:w-[30rem] xl:w-[32rem] 3xl:w-[36rem]">
            <h1 className="text-right text-4.5xl sm:text-5xl lg:text-5.5xl xl:text-6xl underline-custom after:h-1">
              Amaia Carrere
            </h1>
            {/* dwarf image */}
            <div className="absolute pointer-events-none w-[10rem] xs:w-[11rem] sm:w-[14rem] lg:w-[15.3rem] -top-[0.4rem] xs:-top-[0.7rem] sm:-top-[1.2rem] lg:-top-[1.3rem] xl:-top-[0.9rem] -left-[7.6rem] xs:-left-[8.4rem] sm:-left-[10.6rem] lg:-left-[11.6rem]">
              <Image
                {...dwarfImg}
                className="size-full object-contain"
                onContextMenu={removeContextMenu}
                quality={100}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <Link
              href={''}
              className="relative transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="px-8 lg:px-8 py-3 lg:py-4 luckiest-guy xs:text-xl lg:text-2xl"
                onClick={(e) =>
                  scrollToSection(e, homeSectionIds.secondSection)
                }
                aria-label={`Scroll down to the next section`}
                tabIndex={0}
              >
                Découvrir
              </Button>
            </Link>
          </div>
          <ArrowDownAnimation />
        </div>

        {/* Astronaute + lune */}
        {isViewportAboveLg && (
          <div className="absolute -top-6 sm:top-0 3xl:top-10 left-40 sm:left-24 lg:left-8 xl:left-32 3xl:left-64 w-32 sm:w-40 xl:w-44">
            <Image
              src="/ttinka.webp"
              alt="Personnage de Ttinka endormi sur la Lune"
              width={612}
              height={695}
              className="size-full object-contain"
              onContextMenu={removeContextMenu}
              quality={100}
            />
            <div className="absolute top-1/2 sm:top-[80%] lg:top-full right-[130%] sm:right-full lg:right-3/4 xl:right-full w-12 sm:w-16 max-sm:rotate-[45deg]">
              <Image
                src="/astronaute.webp"
                alt="Un astronaute s'élance dans l'espace"
                width={261}
                height={373}
                className="size-full object-contain"
                onContextMenu={removeContextMenu}
                quality={100}
              />
            </div>
          </div>
        )}

        {/* Astronaute + souris */}
        {!isMobileViewport && (
          <div className="absolute pointer-events-none bottom-10 sm:bottom-28 lg:bottom-20 xl:bottom-20 2xl:bottom-10 3xl:bottom-28 right-10 sm:right-20 lg:right-12 xl:right-20 3xl:right-56 w-28 sm:w-32 lg:w-36">
            <Image
              src="/astronaute2.webp"
              alt="Un astronaute s'échappe en courant"
              width={247}
              height={269}
              className="size-full object-contain"
              onContextMenu={removeContextMenu}
              quality={100}
            />
            <div className="absolute top-5 sm:top-0 -left-40 sm:-left-48 lg:-left-36 xl:-left-56 w-16 sm:w-20 scale-x-[-1]">
              <Image
                src="/souris-abeille.webp"
                alt="Une souris abeille"
                width={370}
                height={200}
                className="size-full object-contain"
                onContextMenu={removeContextMenu}
                quality={100}
              />
            </div>
          </div>
        )}

        {/* Background full screen et transition d'apparition au scroll */}
        <motion.div
          className="absolute z-20 top-0 left-0 hero-height w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: isMobileViewport
              ? `var(--bg-url-mobile)`
              : `var(--bg-url-desktop)`,
            maskImage: maskImageProgress,
            pointerEvents: pointerEventsMotionValue,
          }}
        />
      </div>

      {/* Hauteur de heroSection supplémentaire pour permettre le scroll et l'affichage du bg full screen en absolute */}
      <div
        ref={heroBgRef}
        id={homeSectionIds.secondSection}
        className="hero-height"
      />
    </section>
  );
};

export default HeroSection;
