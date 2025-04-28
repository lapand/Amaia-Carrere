import React, { useState } from 'react';

type StaticSliderProps = {
  children?: React.ReactNode;
  customArrows?: React.ReactNode;
  isControlArrowsVisible?: boolean;
  isPaginationVisible?: boolean;
  maxSlides?: number;
  transitionDuration?: number;
};

const arrowIconUri = '/black-arrow.svg';

const StaticSlider: React.FC<StaticSliderProps> = ({
  children,
  isControlArrowsVisible = true,
  isPaginationVisible = false,
  maxSlides = 10,
  transitionDuration = 0.3,
  customArrows,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const totalSlides = Math.min(React.Children.count(children), maxSlides);

  const handlePrev = () =>
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % totalSlides);

  const onSelectImg = (i: number) => {
    setActiveIdx(i);
  };

  if (totalSlides === 0) {
    return (
      <div className="flex justify-center items-center">
        Aucune image disponible
      </div>
    );
  }

  {
    /* Control arrows */
  }
  const sliderControls = {
    leftArrow: (
      <button
        className="w-16 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
        onClick={() => handlePrev()}
        aria-label="previous slide"
      >
        <span className="size-full rotate-180 flex items-center justify-center">
          {customArrows || (
            <span
              style={{ backgroundImage: `url(${arrowIconUri})` }}
              className="size-full bg-no-repeat bg-[length:20px_20px] bg-center"
            />
          )}
        </span>
      </button>
    ),
    rightArrow: (
      <button
        className="w-16 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
        onClick={() => handleNext()}
        aria-label="next slide"
      >
        <span className="size-full flex items-center justify-center">
          {customArrows || (
            <span
              style={{ backgroundImage: `url(${arrowIconUri})` }}
              className="size-full bg-no-repeat bg-[length:20px_20px] bg-center"
            />
          )}
        </span>
      </button>
    ),
  };

  {
    /* Indicators */
  }
  const indicators = [];
  for (let i = 0; i < totalSlides; i++) {
    indicators.push(
      <button
        key={i}
        type="button"
        className="p-2 group"
        aria-current={i === activeIdx ? true : false}
        aria-label={`Slide ${i + 1}`}
        onClick={() => onSelectImg(i)}
      >
        <span
          className={`block size-4 rounded-full outline outline-aubergine-600 border border-aubergine-100 opacity-90 transition duration-300 ${
            i !== activeIdx
              ? 'bg-aubergine-400 outline-1 group-hover:scale-[1.3] group-hover:outline-1'
              : 'bg-aubergine-450 outline-1 scale-[1.3]'
          }`}
        />
      </button>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {/* Content + Control arrows */}
      <div className={`w-full flex`}>
        {/* Left arrow */}
        {totalSlides > 1 && isControlArrowsVisible && sliderControls.leftArrow}

        {/* Content */}
        <div className="relative flex-1 aspect-square border-x border-gray-400">
          {React.Children.map(children, (child, i) =>
            i >= maxSlides ? null : (
              <div
                key={i}
                style={{ transitionDuration: `${transitionDuration}s` }}
                className={`absolute size-full transition-all ${
                  i === activeIdx
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                }`}
              >
                {child}
              </div>
            )
          )}
        </div>

        {/* Right arrow */}
        {totalSlides > 1 && isControlArrowsVisible && sliderControls.rightArrow}
      </div>

      {/* Indicators */}
      {totalSlides > 1 && isPaginationVisible && (
        <div className="flex bottom-5 left-1/2 space-x-2 rtl:space-x-reverse">
          {indicators}
        </div>
      )}
    </div>
  );
};

export default StaticSlider;
