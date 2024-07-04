import Image from 'next/image';

type GallerySliderProps = {
  onPrevImg: (currentIdx: number) => void;
  onNextImg: (currentIdx: number) => void;
  imgIdx: number;
  uri: string;
  alt: string;
  width: number;
  height: number;
  galleryLength?: number;
};

const arrowIconUri = '/gallery-lightbox/arrow.svg';

const GallerySlider: React.FC<GallerySliderProps> = ({
  onPrevImg,
  onNextImg,
  imgIdx,
  uri,
  alt,
  width,
  height,
}) => {
    
  return (
    <div className="h-full flex justify-between">
      <button
        className="aspect-square w-32 rotate-180 bg-no-repeat bg-[length:50px_50px] bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => onPrevImg(imgIdx)}
        aria-label="previous image"
      ></button>
      <div className="my-8">
        <Image
          className="size-full object-contain"
          src={uri}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      <button
        className="aspect-square w-32 bg-[length:50px_50px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => onNextImg(imgIdx)}
        aria-label="next image"
      ></button>
      {/* Slider indicators */}
      <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button
          type="button"
          className="w-3 h-3 rounded-full bg-slate-900 opacity-40"
          aria-current="true"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full bg-slate-900 opacity-40"
          aria-current="false"
          aria-label="Slide 2"
          data-carousel-slide-to="1"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full bg-slate-900 opacity-40"
          aria-current="false"
          aria-label="Slide 3"
          data-carousel-slide-to="2"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full bg-slate-900 opacity-40"
          aria-current="false"
          aria-label="Slide 4"
          data-carousel-slide-to="3"
        ></button>
        <button
          type="button"
          className="w-3 h-3 rounded-full bg-slate-900 opacity-40"
          aria-current="false"
          aria-label="Slide 5"
          data-carousel-slide-to="4"
        ></button>
      </div>
    </div>
  );
};

export default GallerySlider;
