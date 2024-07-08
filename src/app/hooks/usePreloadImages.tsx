import { useEffect } from 'react';

const usePreloadImages = (imageUrls: string[]) => {
  useEffect(() => {
    const images = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    return () => {
      images.forEach((img) => {
        img.src = '';
      });
    };
  }, [imageUrls]);
};

export default usePreloadImages;
