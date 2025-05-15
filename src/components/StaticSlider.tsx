import useIsTouchDevice from '@/hooks/useIsTouchDevice';
import { AtLeastOne } from '@/types';
import { computeStyle } from '@/utils/computeStyle';
import {
  PanInfo,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';

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
  transitionType?: 'fade' | 'slide';
  transitionDuration?: number;
  className?: string; // S’applique à la boîte externe. N’altère pas le layout interne.
  aspectRatioClassName?: string; // Définit l'aspect-ratio du contenu du slider
  draggable?: boolean | 'touch';
};

const arrowIconUri = '/black-arrow.svg';

// Parcours récursivement tous les enfants et sous-enfants pour leur appliquer draggable={false} afin que le drag de Framer motion fonctionne correctement
function cloneWithDraggableFalse(node: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(node)) return node;
  return React.cloneElement(node as React.ReactElement<any>, {
    draggable: false,
    children: React.Children.map(node.props.children, cloneWithDraggableFalse),
  });
}

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

const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const StaticSlider: React.FC<StaticSliderProps> = ({
  children,
  isControlArrowsVisible = true,
  arrowBtnStyle,
  arrowBtnHoverStyle,
  isPaginationVisible = false,
  maxSlides = 10,
  transitionType = 'fade',
  transitionDuration = 0.3,
  customArrows,
  className = 'size-full',
  aspectRatioClassName = 'aspect-square',
  draggable = 'touch',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const totalSlides = Math.min(React.Children.count(children), maxSlides);
  const [dragging, setDragging] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  const shouldEnableDrag =
    draggable === true || (draggable === 'touch' && isTouchDevice);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const onSelectImg = (i: number) => {
    setActiveIdx(i);
  };

  const dragX = useMotionValue(0);

  const onDragStart = () => {
    setDragging(true);
  };

  const handleFadeDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setDragging(false);

    const offset = info.offset.x;

    if (offset < -DRAG_BUFFER) {
      handleNext();
    } else if (offset > DRAG_BUFFER) {
      handlePrev();
    }
  };

  const handleSlideDragEnd = () => {
    setDragging(false);

    const x = dragX.get();

    if (x <= -DRAG_BUFFER && activeIdx < totalSlides - 1) {
      handleNext();
    } else if (x >= DRAG_BUFFER && activeIdx > 0) {
      handlePrev();
    }
  };

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

  // Désactive le drag natif des children pour que le drag de Framer motion fonctionne correctement
  const slides = useMemo(
    () => React.Children.map(children, cloneWithDraggableFalse) ?? [],
    [children]
  );

  if (totalSlides === 0) {
    return (
      <div className="flex justify-center items-center">
        Aucune image disponible
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden`}>
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
          <motion.div
            className={`${aspectRatioClassName} relative flex-1 border-x border-gray-400 overflow-hidden`}
          >
            {transitionType === 'fade' ? (
              // --- FADE ---
              slides.map((child, i) =>
                i >= maxSlides ? null : (
                  <motion.div
                    key={i}
                    drag={shouldEnableDrag ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragStart={onDragStart}
                    onDragEnd={handleFadeDragEnd}
                    style={{
                      transitionDuration: `${transitionDuration}s`,
                    }}
                    className={`absolute size-full transition-all ${
                      i === activeIdx
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                    } ${
                      shouldEnableDrag && 'cursor-grab active:cursor-grabbing'
                    }`}
                  >
                    {child}
                  </motion.div>
                )
              )
            ) : (
              // --- SLIDE ---
              <motion.div
                drag={shouldEnableDrag ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                style={{
                  x: dragX,
                }}
                animate={{ translateX: `-${100 * activeIdx}%` }}
                transition={SPRING_OPTIONS}
                onDragStart={onDragStart}
                onDragEnd={handleSlideDragEnd}
                className={`flex h-full ${
                  shouldEnableDrag && 'cursor-grab active:cursor-grabbing'
                }`}
              >
                {slides.map((child, i) =>
                  i >= maxSlides ? null : (
                    <motion.div
                      key={i}
                      animate={{ scale: activeIdx === i ? 1 : 0.8 }}
                      transition={SPRING_OPTIONS}
                      className="w-full shrink-0"
                    >
                      {child}
                    </motion.div>
                  )
                )}
              </motion.div>
            )}
          </motion.div>

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
    </div>
  );
};

export default StaticSlider;
