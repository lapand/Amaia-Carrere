import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
  ariaLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  style,
  ariaLabel,
  type,
  onMouseOver,
  onMouseEnter,
  onMouseLeave,
  disabled,
}) => {
  return (
    <motion.button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // className={`${className} relative overflow-hidden bg-gradient-to-b from-blue-500 to-primary-500 rounded-xl text-white shadow-btn focus-visible:ring-2 ring-offset-2 ring-gray-950 before:content-[''] before:absolute before:size-full before:top-0 before:-left-full hover:before:animate-shine before:shine-bg after:absolute after:inset-0 hover:after:bg-black/10 active:after:bg-gradient-to-b active:after:from-transparent active:after:to-black/20 active:transform-onclick active:shadow-active-btn`}
      className={`${className} relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-[#62564e] to-primary-600 hover:text-[rgb(224,155,43)] hover:bg-none hover:border-[rgb(224,155,43)] rounded-xl text-primary-200 shadow-btn focus-visible:ring-2 ring-offset-2 ring-gray-950  active:after:bg-gradient-to-b active:after:from-transparent active:after:to-black/20 active:transform-onclick active:shadow-active-btn`}
      style={style}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
      whileHover={{
        scale: disabled ? 1 : 1.05,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 10,
        },
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
