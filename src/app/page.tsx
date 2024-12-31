'use client';

import Image from 'next/image';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../components/Button';
import Link from 'next/link';
import HomeBubble from '@/components/HomeBubble';
import { motion } from 'framer-motion';
import useViewportWidth from '@/hooks/useViewportWidth';
import { mobileBreakpoint } from '@/config/config';

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

const Home: React.FC = () => {
  const windowWidth = useViewportWidth();

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
    <div className='relative h-screen text-surface-900 luckiest-guy border-none bg-[url("/home-mobile.webp")] sm:bg-[url("/home.webp")] bg-cover bg-top p-10 sm:p-16 max-sm:pb-safe-bottom flex max-sm:flex-col-reverse justify-center items-center max-sm:gap-6'>
      <h1 className="absolute z-50 top-10 lg:top-20 left-2 sm:left-10 lg:left-20 w-72 sm:w-96 lg:w-80 3xl:w-[500px] transition-all duration-[1500ms]">
        <Image
          src="/amaia-logo.webp"
          alt="Site logo - Amaia Carrere"
          width={483}
          height={141}
          className="size-full"
          priority
        />
      </h1>
      <Link
        href="/gallery"
        className="relative z-10 transition-transform duration-300 hover:rotate-3"
      >
        <Button className="text-2xl sm:text-3xl lg:text-2xl rounded-3xl px-8 sm:px-10 lg:px-8 py-3 sm:py-5 lg:py-4">
          Entrer
        </Button>
      </Link>
      {windowWidth < mobileBreakpoint ? (
        <div className="w-screen">{bubbles}</div>
      ) : (
        bubbles
      )}
    </div>
  );
};

export default Home;
