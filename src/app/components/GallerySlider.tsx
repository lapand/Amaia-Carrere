import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPrevIdx, getNextIdx } from '../modules/array-utils/getIndex';
import usePreloadImages from '../hooks/usePreloadImages';

const highQualityDraws = [
  {
    src: '/gallery-lightbox/xilaba-mendiak.jpg',
    alt: '',
    width: 2500,
    height: 1750,
  },
  {
    src: '/gallery-lightbox/xilaba-dantz.jpg',
    alt: '',
    width: 2500,
    height: 1800,
  },
  {
    src: '/gallery-lightbox/maggy-rvb.jpg',
    alt: '',
    width: 2500,
    height: 1700,
  },
  {
    src: '/gallery-lightbox/histoire-bd.jpg',
    alt: '',
    width: 2500,
    height: 3500,
  },
  {
    src: '/gallery-lightbox/11chewal.jpg',
    alt: '',
    width: 2500,
    height: 3500,
  },
  {
    src: '/gallery-lightbox/chat-fee.jpg',
    alt: '',
    width: 2500,
    height: 1400,
  },
  {
    src: '/gallery-lightbox/temple-carpe-koi.jpg',
    alt: '',
    width: 2500,
    height: 1750,
  },
  {
    src: '/gallery-lightbox/argaihizkia-affiche.jpg',
    alt: '',
    width: 2500,
    height: 2900,
  },
  {
    src: '/gallery-lightbox/amitie-lapin-paon.jpg',
    alt: '',
    width: 2500,
    height: 2300,
  },
  {
    src: '/gallery-lightbox/oeil-dragon-bleu.jpg',
    alt: '',
    width: 2500,
    height: 1750,
  },
  {
    src: '/gallery-lightbox/quetzacoaltl.jpg',
    alt: '',
    width: 2500,
    height: 1800,
  },
];

type GallerySliderProps = {
  selectedIdx: number;
  galleryLength?: number;
  slideDuration?: number;
};

const arrowIconUri = '/gallery-lightbox/arrow.svg';

const GallerySlider: React.FC<GallerySliderProps> = ({
  selectedIdx,
  slideDuration = 300,
}) => {
  // usePreloadImages(highQualityDraws.map(o => o.src));

  const [activeIdx, setActiveIdx] = useState<number>(selectedIdx);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(getPrevIdx(highQualityDraws, activeIdx));
      setIsLoading(true);
    }, slideDuration);
  };
  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(getNextIdx(highQualityDraws, activeIdx));
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
          {...highQualityDraws[activeIdx]}
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
