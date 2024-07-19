import Image from 'next/image';
import { useState } from 'react';
import usePreloadImages from '../hooks/usePreloadImages';

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

const arrowIconUri = '/test-arrow.png';

const GallerySlider: React.FC<GallerySliderProps> = ({
  activeDraw,
  slideDuration = 300,
  changePrevIdx,
  changeNextIdx,
}) => {
  // usePreloadImages(draws.map(o => o.src));

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
      <button
        className="aspect-square w-32 lg:w-44 rotate-180 scale-y-[-1] bg-70% bg-no-repeat bg-center hover:bg-black/30 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handlePrev()}
        aria-label="previous image"
      ></button>
      {isLoading && loader}
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
        className="aspect-square w-32 lg:w-44 bg-70% bg-no-repeat bg-center hover:bg-black/30 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      ></button>
      {/* <button
        className="aspect-square w-32 bg-[length:50px_50px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      ></button> */}
    </div>
  );
};

export default GallerySlider;
