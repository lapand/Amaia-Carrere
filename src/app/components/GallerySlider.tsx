import Image from 'next/image';
import { useState } from 'react';
import Loader from './Loader';

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

  return (
    <div className="h-full flex justify-between">
      {isLoading && <Loader width={100} height={80} />}
      <button
        className="aspect-square rotate-180 w-36 bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
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
          {...activeDraw}
          quality={100}
          className="size-full object-contain"
          onLoad={handleImgLoad}
        />
      </div>
      <button
        className="aspect-square w-36 bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      ></button>
    </div>
  );
};

export default GallerySlider;
