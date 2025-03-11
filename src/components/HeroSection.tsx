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

  const maskImageProgress = useTransform(
    smoothProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 15%), rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 100%`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) 10%, rgba(0, 0, 0, 0) 15%), rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 100%`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 100%)`,
      `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 1) 100%, rgba(0, 0, 0, 1) 100%)`,
    ]
  );

  useMotionValueEvent(maskImageProgress, 'change', (latest) => {
    console.log('maskImageProgress: ', latest);
  });

  return (
    <section
      id={homeSectionIds.firstSection}
      style={bgStyle}
      // className="h-[130vh] sm:h-[160vh] flex flex-col pb-16 section-pt"
      className="flex flex-col pb-16"
    >
      <div className="sticky top-[var(--header-height)] hero-height flex flex-col justify-center items-center gap-10 sm:gap-20 p-2">
        <div className="flex flex-col gap-6 2xl:gap-10 annie-use-your-telescope thickening-1">
          <p className="text-center text-5xl xs:text-5.5xl sm:text-6xl md:text-6.5xl lg:text-7xl xl:text-8xl 3xl:text-9xl">
            Bienvenue dans mon atelier,
            <br />
            source de rêves crayonnés.
          </p>
          <h1 className="text-right text-4.5xl sm:text-5xl lg:text-5.5xl xl:text-6xl">
            <span className="underline-custom after:h-1">Amaia Carrere</span>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Link
              href={''}
              className="relative z-10 transition-transform duration-300 hover:rotate-1"
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
            <div className="absolute right-[145%] lg:right-[145%] 3xl:right-[105%] -bottom-9 w-[13.3rem] lg:w-[15.3rem]">
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
            backgroundImage: `var(--bg-url-desktop)`,
            maskImage: maskImageProgress,
          }}
        />
      </div>
      <div ref={heroBgRef} className="hero-height" />
    </section>
  );
};

export default HeroSection;

// const heroBgX = useTransform(smoothProgress, [0, 1], ['100%', '0%']);
// useMotionValueEvent(heroBgX, 'change', (latest) => {
//   console.log('heroBgX: ', latest);
// });

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
