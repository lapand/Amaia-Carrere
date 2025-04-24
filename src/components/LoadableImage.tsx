import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';
import Loader from './Loader';

interface LoadableImageProps extends ImageProps {}

const LoadableImage: React.FC<LoadableImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader width={60} height={48} />}
      <Image
        {...props}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default LoadableImage;
