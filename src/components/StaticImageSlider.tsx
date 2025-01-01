import React, { useState } from 'react';
import ArrowBtn from './ArrowBtn';

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
    <div className={`flex items-center justify-between`}>
      {/* Left arrow */}
      {isArrowsVisible && (
        <ArrowBtn
          onClick={handlePrev}
          className={`${
            arrowsPosition === 'under' ? 'absolute bottom-0 left-1/4' : ''
          } w-[10%] h-20 flex items-center justify-center opacity-70 transition hover:scale-110 hover:opacity-90 duration-300 cursor-pointer`}
          ariaLabel="Previous slide"
        />
      )}

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
        <ArrowBtn
          onClick={handleNext}
          className={`${
            arrowsPosition === 'under' ? 'absolute bottom-0 right-1/4' : ''
          } w-[10%] h-20 rotate-180 flex items-center justify-center opacity-70 transition hover:scale-110 hover:opacity-90 duration-300 cursor-pointer`}
          ariaLabel="Previous slide"
        />
      )}
    </div>
  );
};

export default StaticImageSlider;
