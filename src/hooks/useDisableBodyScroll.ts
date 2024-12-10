import { useEffect } from 'react';

const useDisableBodyScroll = (isModalOpen: boolean, delay: number = 0) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isModalOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scrollBarWidth}px`;
    } else {
      timeoutId = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.marginRight = '';
      }, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [isModalOpen, delay]);
};

export default useDisableBodyScroll;
