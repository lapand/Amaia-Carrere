import { CSSProperties } from 'react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  ariaLabel?: string,
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
}) => {
  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} relative overflow-hidden py-3 px-4 bg-gradient-to-b from-blue-500 to-primary-500 rounded-xl text-white btn-shadow transition focus:ring-2 ring-offset-2 ring-primary-300 before:content-[''] before:absolute before:size-full before:top-0 before:-left-full hover:before:animate-shine before:shine-bg after:absolute after:inset-0 hover:after:bg-black/10 active:after:bg-black/20`}
      style={style}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
