import { useState, useEffect, useRef, PropsWithChildren } from 'react';

interface ScrollAnimatedCompProps extends PropsWithChildren {
  showAt: number;
  hideAt: number;
  transitionDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollAnimatedComp: React.FC<ScrollAnimatedCompProps> = ({
  children,
  showAt,
  hideAt,
  transitionDuration,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const transiOffTimeoutIdRef = useRef<NodeJS.Timeout>(null);

  let transitionDurationString = '';
  if (transitionDuration) {
    transitionDurationString = transitionDuration.toString() + 'ms';
  }

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > showAt && window.scrollY < hideAt ? open() : close();
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
          className={`absolute -right-[80%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat transition duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDuration: transitionDurationString }}  
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ScrollAnimatedComp;
