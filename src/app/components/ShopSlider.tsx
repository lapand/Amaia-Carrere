import Image from 'next/image';
import { useState } from 'react';
import { getPrevIdx, getNextIdx } from '../modules/utils/getIndex';
import removeContextMenu from '../modules/utils/removeContextMenu';
import Loader from './Loader';

type ImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ShopSliderProps = {
  gallery: ImageType[];
};

const arrowIconUri = '/forSale/forSaleSlider/black-arrow.svg';

const ShopSlider: React.FC<ShopSliderProps> = ({ gallery }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const onNextImg = () => {
    setCurrentIdx(getNextIdx(gallery, currentIdx));
  };

  const onPrevImg = () => {
    setCurrentIdx(getPrevIdx(gallery, currentIdx));
  };

  const onSelectImg = (i: number) => {
    setCurrentIdx(i);
  };

  if (gallery.length === 0) {
    return (
      <div className="flex justify-center items-center">
        Aucune image disponible
      </div>
    );
  }

  const sliderControls = (
    <>
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
    </>
  );

  const indicators = [];
  for (let i = 0; i < gallery.length; i++) {
    indicators.push(
      <button
        key={i}
        type="button"
        className={`w-3 h-3 rounded-full border-[1px] border-white opacity-90  ${
          i === currentIdx ? 'bg-white' : 'bg-primary-800'
        } hover:bg-white`}
        aria-current={`${i === currentIdx ? 'true' : 'false'}`}
        aria-label={`Slide ${i + 1}`}
        onClick={() => onSelectImg(i)}
      ></button>
    );
  }

  const sliderIndicators = (
    <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      {indicators}
    </div>
  );

  return (
    <div className="relative size-full flex">
      {/* {isLoading && <Loader width={60} height={48} />} */}
      <div className={`w-full transition-opacity`}>
        <Image
          {...gallery[currentIdx]}
          className="size-full object-contain"
          onContextMenu={removeContextMenu}
        />
      </div>
      {gallery.length > 1 && sliderControls}
      {gallery.length > 1 && sliderIndicators}
    </div>
  );
};

export default ShopSlider;
