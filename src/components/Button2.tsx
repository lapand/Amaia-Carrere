import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type Button2Props = {
  ariaLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button2: React.FC<Button2Props> = ({
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
      className={`${className} relative transition-colors duration-300 overflow-hidden border-transparent bg-gradient-to-br from-aubergine-400 to-aubergine-700 rounded-3xl text-primary-200 shadow-btn focus-visible:ring-2 ring-offset-2 ring-aubergine-600 active:shadow-active-btn`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
      whileHover={{
        scale: disabled ? 1 : 1.1,
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

export default Button2;