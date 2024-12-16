import { motion } from 'framer-motion';
import { bubbleType } from '@/app/page';
import HomeBubble from './HomeBubble';

export type bubbleType = {
    x: string;
    y: string;
    delay: number;
    speed: number;
  };
  
  const bubblesData: bubbleType[] = [
    {
      x: 'left-[500px]',
      y: '100vh',
      delay: 0,
      speed: 15,
    },
    {
      x: 'left-[1000px]',
      y: '100vh',
      delay: .5,
      speed: 23,
    },
    {
      x: 'left-[1500px]',
      y: '100vh',
      delay: .7,
      speed: 20,
    },
  ];

const MovingBubble: React.FC<{ bubble: bubbleType; idx: number }> = ({
  bubble,
  idx,
}) => {
  return (
    <motion.div
      initial={{ y: bubble.y }} // Position initiale en bas de la page
      animate={{ y: '-100vh' }} // Déplace la bulle vers le haut
      transition={{
        delay: bubble.delay,
        duration: bubble.speed, // Durée de l'animation
        repeat: Infinity, // Répétition infinie
        repeatType: 'loop', // Répétition sous forme de boucle
        ease: 'linear', // Mouvement linéaire
      }}
      className={`absolute ${bubble.x} `}
    >
      <HomeBubble idx={idx} />
    </motion.div>
  );
};

export default MovingBubble;
