import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import ArrowIcon from '/public/arrow.svg';

type ScrollProgressBtnType = {
  className?: string;
};

const ScrollProgressBtn: React.FC<ScrollProgressBtnType> = ({ className }) => {
  // Utilisation du hook useScroll pour obtenir la progression du scroll
  const { scrollYProgress } = useScroll();

  // Utilisation de useSpring pour adoucir l'animation de la progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dimensions du cercle SVG
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    smoothProgress,
    (progress) => circumference - progress * circumference
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className={`${className} flex justify-center items-center`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      whileHover={{
        scale: 1.1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 10,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <button
        className={`relative size-12 flex justify-center items-center bg-accent text-white font-bold rounded-full border border-black`}
        onClick={handleScrollToTop}
      >
        <motion.svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
        >
          <motion.circle
            className="text-accent2"
            stroke="currentColor"
            strokeWidth="5"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </motion.svg>
        <ArrowIcon
          fill="white"
          stroke="black"
          strokeWidth={3}
          viewBox="-5 -5 53.728 92.485"
          className="-rotate-90 size-6"
        />
      </button>
    </motion.div>
  );
};

export default ScrollProgressBtn;
