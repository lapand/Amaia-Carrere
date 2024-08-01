import Image from 'next/image';
import { useState } from 'react';
import { getPrevIdx, getNextIdx } from '../modules/utils/getIndex';
import removeContextMenu from '../modules/utils/removeContextMenu';
import Loader from './Loader';

type ImageType = {
  uri: string;
  width: number;
  height: number;
};

type ForSaleSliderProps = {
  gallery: ImageType[];
  alt: string;
  galleryLength: number;
};

const arrowIconUri = '/forSale/forSaleSlider/black-arrow.svg';

const ForSaleSlider: React.FC<ForSaleSliderProps> = ({
  gallery,
  alt,
  galleryLength,
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNextImg = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImgIdx(getNextIdx(gallery, currentImgIdx));
      setIsLoading(true);
    }, 150);
  };

  const onPrevImg = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImgIdx(getPrevIdx(gallery, currentImgIdx));
      setIsLoading(true);
    }, 150);
  };

  const handleImgLoad = () => {
    setIsLoading(false);
    setIsTransitioning(false);
  };

  const onSelectImg = (i: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImgIdx(i);
      setIsLoading(true);
    }, 150);
  };

  const indicators = [];
  for (let i = 0; i < galleryLength; i++) {
    indicators.push(
      <button
        key={i}
        type="button"
        className={`w-3 h-3 rounded-full border-[1px] border-white opacity-90  ${
          i === currentImgIdx ? 'bg-white' : 'bg-primary-800'
        } hover:bg-white`}
        aria-current={`${i === currentImgIdx ? 'true' : 'false'}`}
        aria-label={`Slide ${i + 1}`}
        onClick={() => onSelectImg(i)}
      ></button>
    );
  }

  return (
    <div className="relative h-full flex">
      {isLoading && <Loader width={60} height={48} />}
      <div
        className={`w-full transition-opacity ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={gallery[currentImgIdx].uri}
          alt={alt}
          width={gallery[currentImgIdx].width}
          height={gallery[currentImgIdx].height}
          className="size-full object-cover"
          onContextMenu={removeContextMenu}
          onLoad={handleImgLoad}
        />
      </div>
      {/* Slider controls */}
      <button
        className="absolute h-full start-0 w-16 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
        onClick={() => onPrevImg()}
        aria-label="previous image"
      >
        <span className="w-3/5 aspect-square flex items-center justify-center rounded-full bg-white/90 border-2 border-primary-800">
          <span
            style={{ backgroundImage: `url(${arrowIconUri})` }}
            className="size-full rotate-180 bg-no-repeat bg-[length:20px_20px] bg-center"
          ></span>
        </span>
      </button>
      <button
        className="absolute h-full end-0 w-16 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
        onClick={() => onNextImg()}
        aria-label="next image"
      >
        <span className="w-3/5 aspect-square flex items-center justify-center rounded-full bg-white/90 border-2 border-primary-800">
          <span
            style={{ backgroundImage: `url(${arrowIconUri})` }}
            className="size-full bg-no-repeat bg-[length:20px_20px] bg-center"
          ></span>
        </span>
      </button>
      {/* Slider indicators */}
      <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {indicators}
      </div>
    </div>
  );
};

export default ForSaleSlider;
