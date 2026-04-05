import useIsTouchDevice from '@/hooks/useIsTouchDevice';
import { AtLeastOne } from '@/types';
import { computeStyle } from '@/utils/computeStyle';
import { PanInfo, motion, useMotionValue } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type ArrowButtonProps = {
  onClick: () => void;
  direction: 'left' | 'right';
  style: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  customArrows?: React.ReactNode;
  ariaHidden?: boolean;
  tabIndex?: number;
};

type PaginationDotsProps = {
  totalSlides: number;
  activeIdx: number;
  onSelect: (index: number) => void;
  className?: string;
  style: React.CSSProperties;
  ariaHidden?: boolean;
  tabIndex?: number;
};

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
  autoDelay?: number | false;
};

const arrowIconUri = '/black-arrow.svg';

// Parcours récursivement tous les enfants et sous-enfants d'un noeud pour leur appliquer draggable={false} afin que le drag de Framer motion fonctionne correctement sur ce noeud.
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
  ariaHidden,
  tabIndex,
}: ArrowButtonProps) {
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
      aria-hidden={ariaHidden}
      tabIndex={tabIndex}
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

const PaginationDots = React.memo(function PaginationDots({
  totalSlides,
  activeIdx,
  onSelect,
  className,
  style,
  ariaHidden,
  tabIndex,
}: PaginationDotsProps) {
  return (
    <div
      className={`flex space-x-2 rtl:space-x-reverse h-8 ${className}`}
      style={style}
    >
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-current={i === activeIdx}
          aria-label={`Slide ${i + 1}`}
          aria-hidden={ariaHidden}
          tabIndex={tabIndex}
          onClick={() => onSelect(i)}
          className={`p-2 group`}
        >
          <span
            className={`block size-4 rounded-full outline outline-aubergine-600 border border-aubergine-100 opacity-90 transition duration-300 ${
              i !== activeIdx
                ? 'bg-aubergine-400 outline-1 group-hover:scale-[1.3] group-hover:outline-1'
                : 'bg-aubergine-450 outline-1 scale-[1.3]'
            }`}
          />
        </button>
      ))}
    </div>
  );
});

const ONE_SECOND = 1000;

const DRAG_BUFFER = 20;

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
  autoDelay = false,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const totalSlides = Math.min(React.Children.count(children), maxSlides);
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

  const handleFadeDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;

    if (offset < -DRAG_BUFFER) {
      handleNext();
    } else if (offset > DRAG_BUFFER) {
      handlePrev();
    }
  };

  const handleSlideDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && activeIdx < totalSlides - 1) {
      handleNext();
    } else if (x >= DRAG_BUFFER && activeIdx > 0) {
      handlePrev();
    }
  };

  // Gestion du slide automatique - Bloque le défilé auto lors du drag
  useEffect(() => {
    if (!autoDelay || autoDelay <= 0) return;

    const interval = setInterval(() => {
      const x = dragX.get();
      x === 0 && handleNext();
    }, autoDelay * ONE_SECOND);

    return () => clearInterval(interval);
  }, [autoDelay]);

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
    // Boîte externe. N’altère pas le layout interne.
    <div className={`${className} overflow-hidden`}>
      {/* Layout interne */}
      <div className="w-full flex flex-col items-center gap-6">
        {/* Content + Control arrows */}
        <div className={`w-full flex`}>
          {/* Left arrow */}
          {isControlArrowsVisible && (
            <ArrowButton
              onClick={handlePrev}
              direction="left"
              style={{
                ...computedArrowStyle,
                visibility: totalSlides > 1 ? 'visible' : 'hidden',
                pointerEvents: totalSlides > 1 ? 'auto' : 'none',
              }}
              ariaHidden={totalSlides <= 1}
              tabIndex={totalSlides > 1 ? 0 : -1}
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
                    onDragEnd={handleFadeDragEnd}
                    style={{
                      transitionProperty: 'opacity, visibility',
                      transitionDuration: `${transitionDuration}s`,
                      x: dragX,
                    }}
                    className={`absolute size-full ${
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
          {isControlArrowsVisible && (
            <ArrowButton
              onClick={handleNext}
              direction="right"
              style={{
                ...computedArrowStyle,
                visibility: totalSlides > 1 ? 'visible' : 'hidden',
                pointerEvents: totalSlides > 1 ? 'auto' : 'none',
              }}
              ariaHidden={totalSlides <= 1}
              tabIndex={totalSlides > 1 ? 0 : -1}
              hoverStyle={computedArrowHoverStyle}
              customArrows={customArrows}
            />
          )}
        </div>

        {/* PaginationDots */}
        {isPaginationVisible && (
          <PaginationDots
            totalSlides={totalSlides}
            activeIdx={activeIdx}
            onSelect={onSelectImg}
            style={{
              visibility: totalSlides > 1 ? 'visible' : 'hidden',
              pointerEvents: totalSlides > 1 ? 'auto' : 'none',
            }}
            ariaHidden={totalSlides <= 1}
            tabIndex={totalSlides > 1 ? 0 : -1}
          />
        )}
      </div>
    </div>
  );
};

export default StaticSlider;
