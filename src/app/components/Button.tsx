import { CSSProperties } from 'react';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
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
      className={`${className} py-3 px-4 bg-gradient-to-br from-primary-300 to-primary-500 rounded-xl text-white btn-shadow hover:brightness-90`}
      style={style}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
