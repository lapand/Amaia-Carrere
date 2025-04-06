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
      className={`${className} relative transition-colors duration-300 overflow-hidden border-transparent bg-gradient-to-br from-primary-400 to-primary-600 hover:text-primary-600 hover:border-primary-600 rounded-3xl text-primary-200 shadow-btn focus-visible:ring-2 ring-offset-2 ring-gray-950 active:shadow-active-btn before:content-[''] before:absolute before:size-full before:top-full before:left-full before:-translate-x-6 before:-translate-y-6 before:bg-yellow-500 before:rounded-3xl hover:before:top-0 hover:before:left-0 hover:before:translate-x-0 hover:before:translate-y-0 before:transition-all hover:before:z-[-1] tactile-btn`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
