import React from 'react';

interface ArrowBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
}

const ArrowBtn: React.FC<ArrowBtnProps> = ({
  onClick,
  ariaLabel,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 60"
        fill="none"
        stroke="#555555"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: '#F59E0B', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#F59E0B', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M10 30 Q 30 10, 70 10 Q 90 30, 70 50 Q 30 50, 10 30 Z"
          fill="url(#grad1)"
        />
      </svg>
    </button>
  );
};

export default ArrowBtn;
