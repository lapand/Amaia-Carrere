import { AtLeastOne } from '@/types';
import { computeStyle } from '@/utils/computeStyle';
import React, { useCallback, useState } from 'react';

type ArrowBtnStyle = AtLeastOne<{
  width: string;
  height: string;
  backgroundColor: string;
  backgroundImage: string;
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  padding: string;
  margin: string;
  opacity: string;
  transitionDuration: string;
}>;

type StaticSliderProps = {
  children?: React.ReactNode;
  customArrows?: React.ReactNode;
  isControlArrowsVisible?: boolean;
  arrowBtnStyle?: ArrowBtnStyle;
  arrowBtnHoverStyle?: Partial<ArrowBtnStyle>;
  isPaginationVisible?: boolean;
  maxSlides?: number;
  transitionDuration?: number;
};

const arrowIconUri = '/black-arrow.svg';

{
  /* Control arrow */
}
const ArrowButton = React.memo(function ArrowButton({
  onClick,
  direction,
  style,
  hoverStyle,
  customArrows,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
  style: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  customArrows?: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const appliedStyle = {
    ...style,
    ...(isHovered && hoverStyle),
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${direction === 'left' ? 'previous' : 'next'} slide`}
      className={`flex items-center justify-center transition-all cursor-pointer ${
        direction === 'left' ? 'rotate-180' : ''
      }`}
      style={{
        ...appliedStyle,
        alignSelf: style.height === 'auto' ? 'auto' : 'center',
      }}
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
  );
});

const StaticSlider: React.FC<StaticSliderProps> = ({
  children,
  isControlArrowsVisible = true,
  arrowBtnStyle,
  arrowBtnHoverStyle,
  isPaginationVisible = false,
  maxSlides = 10,
  transitionDuration = 0.3,
  customArrows,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const totalSlides = Math.min(React.Children.count(children), maxSlides);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

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

  const defaultWidth = '4rem';
  const defaultHeight = arrowBtnStyle?.height?.includes('%')
    ? 'auto'
    : arrowBtnStyle?.height ?? 'auto';

  const completedArrowBtnStyle = {
    ...arrowBtnStyle,
    width: arrowBtnStyle?.width ?? defaultWidth,
    height: defaultHeight,
  };

  const computedArrowStyle = computeStyle(completedArrowBtnStyle);
  const computedArrowHoverStyle = computeStyle(arrowBtnHoverStyle);

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
        {totalSlides > 1 && isControlArrowsVisible && (
          <ArrowButton
            onClick={handlePrev}
            direction="left"
            style={computedArrowStyle}
            hoverStyle={computedArrowHoverStyle}
            customArrows={customArrows}
          />
        )}

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
        {totalSlides > 1 && isControlArrowsVisible && (
          <ArrowButton
            onClick={handleNext}
            direction="right"
            style={computedArrowStyle}
            hoverStyle={computedArrowHoverStyle}
            customArrows={customArrows}
          />
        )}
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
