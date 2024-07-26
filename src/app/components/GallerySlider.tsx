import Image from 'next/image';
import { useState } from 'react';

type DrawType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type GallerySliderProps = {
  activeDraw: DrawType;
  slideDuration?: number;
  changePrevIdx: () => void;
  changeNextIdx: () => void;
};

const arrowIconUri = '/arrow.svg';

const GallerySlider: React.FC<GallerySliderProps> = ({
  activeDraw,
  slideDuration = 300,
  changePrevIdx,
  changeNextIdx,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      changePrevIdx();
      setIsLoading(true);
    }, slideDuration);
  };
  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      changeNextIdx();
      setIsLoading(true);
    }, slideDuration);
  };

  const handleImgLoad = () => {
    setIsLoading(false);
    setIsTransitioning(false);
  };

  const loader = (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-16">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 absolute"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-300 absolute"></div>
      </div>
      <p className="luckiest-guy text-4xl">Loading...</p>
    </div>
  );

  return (
    <div className="h-full flex justify-between">
      {/* {isLoading && loader} */}
      <button
        className="aspect-square rotate-180 w-36 bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 hover:bg-black/30 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handlePrev()}
        aria-label="next image"
      ></button>
      <div
        className={`my-8 transition ${`duration-${slideDuration}`} ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          className="size-full object-contain"
          {...activeDraw}
          onLoad={handleImgLoad}
        />
      </div>
      <button
        className="aspect-square w-36 bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 hover:bg-black/30 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      ></button>
    </div>
  );
};

export default GallerySlider;
