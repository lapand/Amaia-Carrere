import Image from 'next/image';
import { useState } from 'react';
import Loader from './Loader';
import removeContextMenu from '../utils/removeContextMenu';
import { FormattedImage } from '@/types';
import { getNextIdx, getPrevIdx } from '@/utils/getIndex';

type GallerySliderProps = {
  images: FormattedImage[];
  imgIdx: number;
  slideDuration?: number;
};

const arrowIconUri = '/arrow.svg';

const GallerySlider: React.FC<GallerySliderProps> = ({
  images,
  imgIdx,
  slideDuration = 300,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(imgIdx);
  const { src, alt, width, height, formats } = images[activeIdx];

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(getPrevIdx(images, activeIdx));
      setIsLoading(true);
    }, slideDuration);
  };
  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(getNextIdx(images, activeIdx));
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
        className="w-[10%] rotate-180 bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handlePrev()}
        aria-label="prev image"
      />
      <div
        className={`w-4/5 my-8 transition ${`duration-${slideDuration}`} ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={100}
          placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
          blurDataURL={formats?.thumbnail?.url}
          className="size-full object-contain"
          onLoad={handleImgLoad}
          onContextMenu={removeContextMenu}
        />
      </div>
      <button
        className="w-[10%] bg-[length:45px_45px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => handleNext()}
        aria-label="next image"
      />
    </div>
  );
};

export default GallerySlider;
