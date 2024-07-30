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
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} relative overflow-hidden py-3 px-4 bg-gradient-to-b from-blue-500 to-primary-500 rounded-xl text-white shadow-btn transition focus-visible:ring-2 ring-offset-2 ring-gray-950 before:content-[''] before:absolute before:size-full before:top-0 before:-left-full hover:before:animate-shine before:shine-bg after:absolute after:inset-0 hover:after:bg-black/10 active:after:bg-gradient-to-b active:after:from-transparent active:after:to-black/20 active:transform-onclick active:shadow-active-btn`}
      style={style}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
