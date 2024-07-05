import Image from 'next/image';

type ForSaleSliderProps = {
  onPrevImg: (currentIdx: number) => void;
  onNextImg: (currentIdx: number) => void;
  onSelectImg: (currentIdx: number) => void;
  imgIdx: number;
  uri: string;
  alt: string;
  width: number;
  height: number;
  galleryLength: number;
};

const arrowIconUri = '/forSale/forSaleSlider/black-arrow.svg';

const ForSaleSlider: React.FC<ForSaleSliderProps> = ({
  onPrevImg,
  onNextImg,
  onSelectImg,
  imgIdx,
  uri,
  alt,
  width,
  height,
  galleryLength,
}) => {
  const indicators = [];
  for (let i = 0; i < galleryLength; i++) {
    indicators.push(
      <button
        key={i}
        type="button"
        className={`w-3 h-3 rounded-full border-[1px] border-white opacity-90  ${
          i === imgIdx ? 'bg-white' : 'bg-primary-800'
        } hover:bg-white`}
        aria-current={`${i === imgIdx ? 'true' : 'false'}`}
        aria-label={`Slide ${i + 1}`}
        onClick={() => onSelectImg(i)}
      ></button>
    );
  }

  return (
    <div className="relative h-full flex">
      <div className="w-full">
        <Image
          className="size-full object-cover"
          src={uri}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      {/* Slider controls */}
      <button
        className="absolute h-full start-0 w-16 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
        onClick={() => onPrevImg(imgIdx)}
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
        onClick={() => onNextImg(imgIdx)}
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
