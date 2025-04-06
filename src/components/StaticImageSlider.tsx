import React, { useState } from 'react';
import IconBtn from './IconBtn';

type StaticImageSliderProps = {
  children: React.ReactNode;
  className?: string;
  isArrowsVisible?: boolean;
  arrowsPosition?: 'lateral' | 'under';
};

const StaticImageSlider: React.FC<StaticImageSliderProps> = ({
  children,
  className = '',
  isArrowsVisible = true,
  arrowsPosition = 'lateral',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className={`relative flex items-center justify-between`}>
      {/* Left arrow */}
      {isArrowsVisible && (
        <IconBtn
          onClick={handlePrev}
          position={arrowsPosition === 'under' ? 'absolute' : 'relative'}
          className={`${
            arrowsPosition === 'under'
              ? 'size-14 -bottom-5 left-1/4'
              : 'w-[10%] h-20'
          } opacity-70 transition hover:scale-110 hover:opacity-90 duration-300`}
          icon={{
            src: '/black-arrow.svg',
            alt: 'left arrow',
            size: 0.8,
            rotate: 180,
          }}
          ariaLabel="Previous slide"
        />
      )}

      {/* Content */}
      <div className={`${className}`}>
        {React.Children.map(children, (child, index) => (
          <div
            className={`${arrowsPosition === 'under' ? 'h-[90%]' : 'h-full'}`}
            style={{
              display: index === activeIndex ? 'block' : 'none',
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right arrow */}
      {isArrowsVisible && (
        <IconBtn
          onClick={handleNext}
          position={arrowsPosition === 'under' ? 'absolute' : 'relative'}
          className={`${
            arrowsPosition === 'under'
              ? 'size-14 -bottom-5 right-1/4'
              : 'w-[10%] h-20'
          } rotate-180 opacity-70 transition hover:scale-110 hover:opacity-90 duration-300`}
          icon={{
            src: '/black-arrow.svg',
            alt: 'right arrow',
            size: 0.8,
            rotate: 180,
          }}
          ariaLabel="Previous slide"
        />
      )}
    </div>
  );
};

export default StaticImageSlider;
