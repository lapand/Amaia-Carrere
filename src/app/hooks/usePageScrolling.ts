import { useState, useEffect } from 'react';

const usePageScrolling = (threshold: number = 150): boolean => {
  const [isPageScrolling, setIsPageScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldAddStyle = window.scrollY > threshold;
      setIsPageScrolling(shouldAddStyle);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isPageScrolling;
};

export default usePageScrolling;
