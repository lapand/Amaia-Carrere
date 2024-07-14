import Image from 'next/image';
import { useState } from 'react';
import { getPrevIdx, getNextIdx } from '../modules/array-utils/getIndex';
import usePreloadImages from '../hooks/usePreloadImages'
import { draws } from '../data/draws'; // optimisation des perfs pour éviter le double import avec Gallery ?

type GallerySliderProps = {
  selectedIdx: number;
  slideDuration?: number;
};

const arrowIconUri = '/arrow.svg';

const GallerySlider: React.FC<GallerySliderProps> = ({
  selectedIdx,
  slideDuration = 300,
}) => {
  // usePreloadImages(draws.map(o => o.src));

  const [activeIdx, setActiveIdx] = useState<number>(selectedIdx);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(getPrevIdx(draws, activeIdx));
      setIsLoading(true);
    }, slideDuration);
  };
  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(getNextIdx(draws, activeIdx));
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
      <p className='luckiest-guy text-4xl'>Loading...</p>
    </div>
  );

  return (
    <div className="h-full flex justify-between">
      <button
        className="aspect-square w-32 rotate-180 bg-no-repeat bg-[length:50px_50px] bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
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
          {...draws[activeIdx]}
          onLoad={handleImgLoad}
        />
      </div>
      <button
        className="aspect-square w-32 bg-[length:50px_50px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      ></button>
    </div>
  );
};

export default GallerySlider;
