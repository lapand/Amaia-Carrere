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
      className={`${className} py-3 px-4 bg-gradient-to-br from-blue-500 to-primary-300 rounded-xl text-white btn-shadow transition hover:scale-105 focus:ring-2 ring-offset-2 ring-blue-500`}
      style={style}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
