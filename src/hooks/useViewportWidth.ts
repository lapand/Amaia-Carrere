import { useState, useEffect } from 'react';

const useViewportWidth = (): number => {
  const [width, setWidth] = useState<number>(window.innerWidth || 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default useViewportWidth;
