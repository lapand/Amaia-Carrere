import React from 'react';
import { motion } from 'framer-motion';

type UnderlineAnimationType = {
  className: string;
};

const UnderlineAnimation: React.FC<UnderlineAnimationType> = ({
  className,
}) => {
  return (
<motion.svg
  width="300"
  height="50"
  viewBox="0 0 300 50"
  initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
  animate={{ strokeDashoffset: 0 }}
  transition={{ duration: 1.5, ease: 'easeInOut' }}
  className={className}
>
  <motion.path
    d="M10,45 C50,10 150,10 200,45 C250,80 290,10 290,45"
    stroke="#333333"
    strokeWidth="4"
    fill="none"
    strokeLinecap="round"
  />
</motion.svg>




  );
};

export default UnderlineAnimation;
