import { useState, useEffect, useRef, PropsWithChildren } from 'react';

interface ScrollAnimatedCompProps extends PropsWithChildren {
  openAt: number;
  closeAt: number;
  transitionDuration?: number;
  transitionDelay?: number;
  className?: string;
  enterClassName?: string;
  exitClassName?: string;
  style?: React.CSSProperties;
  enterStyle?: React.CSSProperties;
  exitStyle?: React.CSSProperties;
}

const nbIntoStringInMS = (n: number) => (n ? n.toString() + 'ms' : '');

const ScrollAnimatedComp: React.FC<ScrollAnimatedCompProps> = ({
  children,
  openAt,
  closeAt,
  className,
  enterClassName,
  exitClassName,
  style,
  enterStyle,
  exitStyle,
  transitionDuration = 0,
  transitionDelay = 0,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [parentScrollTop, setParentScrollTop] = useState(0);
  const transiOffTimeoutIdRef = useRef<NodeJS.Timeout>(null);
  const componentRef = useRef<HTMLDivElement>(null); //
  const transitionDurationStr = nbIntoStringInMS(transitionDuration);
  const transitionDelayStr = nbIntoStringInMS(transitionDelay);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > openAt && window.scrollY < closeAt ? open() : close();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  const open = () => {
    if (transiOffTimeoutIdRef.current) {
      clearTimeout(transiOffTimeoutIdRef.current);
      transiOffTimeoutIdRef.current = null;
      const transiInTimeoutId = setTimeout(() => {
        setIsVisible(true);
        clearTimeout(transiInTimeoutId);
      }, 100);
    }
    if (!isOpened) {
      setIsOpened(true);
      const transiInTimeoutId = setTimeout(() => {
        setIsVisible(true);
        clearTimeout(transiInTimeoutId);
      }, 100);
    }
  };

  const close = () => {
    if (isOpened && !transiOffTimeoutIdRef.current) {
      transiOffTimeoutIdRef.current = setTimeout(() => {
        setIsOpened(false);
        clearTimeout(transiOffTimeoutIdRef.current);
        transiOffTimeoutIdRef.current = null;
      }, transitionDuration);
      setIsVisible(false);
    }
  };

  return (
    <>
      {isOpened && (
        <div
          className={`${className} ${
            isVisible ? enterClassName : exitClassName
          }`}
          style={{
            transition: `all ${transitionDurationStr} cubic-bezier(0.4, 0, 0.2, 1) ${transitionDelayStr}`,
            ...style,
            ...(isVisible ? enterStyle : exitStyle),
          }}
          ref={componentRef}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ScrollAnimatedComp;