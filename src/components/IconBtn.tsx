import React from 'react';

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: {
    src: string;
    alt: string;
    size?: number;
    rotate?: number;
  };
  ariaLabel: string;
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  customStyle?: React.CSSProperties;
}

const IconBtn: React.FC<IconBtnProps> = ({
  icon,
  ariaLabel,
  onClick,
  position = 'relative',
  className,
  style,
  ...rest
}) => {
  const { src: iconSrc, alt: iconAlt, size: iconSize = 1, rotate = 0 } = icon;

  // Validation runtime
  if (iconSize !== undefined && (iconSize <= 0 || iconSize > 1)) {
    throw new Error(
      'iconSize must be defined between 0 (exclusive) and 1 (inclusive).'
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${position} overflow-hidden cursor-pointer ${className}`}
      aria-label={ariaLabel}
      style={style}
      {...rest}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        style={{
          width: `100%`,
          height: 'auto', // Conserve les proportions intrinsèques
          position: 'absolute',
          top: '50%',
          left: '50%',
          transformOrigin: 'center',
          transform: `translate(-50%, -50%) scale(${iconSize}) rotate(${rotate}deg)`,
        }}
      />
    </button>
  );
};

export default IconBtn;
