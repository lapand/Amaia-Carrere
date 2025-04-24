import { useState } from 'react';
import { getPrevIdx, getNextIdx } from '../utils/getIndex';
import removeContextMenu from '../utils/removeContextMenu';
import { ImageProps } from 'next/image';
import LoadableImage from './LoadableImage';

type ShopSliderProps = {
  gallery: ImageProps[];
};

const arrowIconUri = '/black-arrow.svg';

const ShopSlider: React.FC<ShopSliderProps> = ({ gallery }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const onNextImg = () => {
    setActiveIdx(getNextIdx(gallery, activeIdx));
  };

  const onPrevImg = () => {
    setActiveIdx(getPrevIdx(gallery, activeIdx));
  };

  const onSelectImg = (i: number) => {
    setActiveIdx(i);
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
        <span className="w-3/5 aspect-square flex items-center justify-center rounded-full bg-aubergine-100/90 border-2 border-aubergine-700">
          <span
            style={{ backgroundImage: `url(${arrowIconUri})` }}
            className="size-full rotate-180 bg-no-repeat bg-[length:20px_20px] bg-center"
          />
        </span>
      </button>
      <button
        className="absolute h-full end-0 w-16 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 duration-300 cursor-pointer"
        onClick={() => onNextImg()}
        aria-label="next image"
      >
        <span className="w-3/5 aspect-square flex items-center justify-center rounded-full bg-aubergine-100/90 border-2 border-aubergine-700">
          <span
            style={{ backgroundImage: `url(${arrowIconUri})` }}
            className="size-full bg-no-repeat bg-[length:20px_20px] bg-center"
          />
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
        className="p-2 group"
        aria-current={i === activeIdx ? true : false}
        aria-label={`Slide ${i + 1}`}
        onClick={() => onSelectImg(i)}
      >
        <span
          className={`block size-4 rounded-full outline outline-aubergine-600 border border-aubergine-100 opacity-90 transition duration-300 ${
            i !== activeIdx
              ? 'bg-aubergine-400 outline-1 group-hover:scale-[1.3] group-hover:outline-1'
              : 'bg-aubergine-450 outline-1 scale-[1.3]'
          }`}
        />
      </button>
    );
  }

  const sliderIndicators = (
    <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-2 rtl:space-x-reverse">
      {indicators}
    </div>
  );

  // Seule la première image du slider, visible dès le chargement de la page,
  // est marquée avec `priority={true}` pour que Next.js la précharge immédiatement (via <link rel="preload"> dans le <head>).
  // Cela optimise le LCP (Largest Contentful Paint) et améliore les performances.
  // Les autres images seront chargées de manière lazy par défaut (chargement de l'img lors de son premier rendu).
  const images = gallery.map((img, i) => {
    return (
      <div
        key={i}
        className={`absolute size-full transition-opacity duration-500 ${
          i === activeIdx ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LoadableImage
          className="size-full object-contain"
          {...img}
          priority={i === 0}
          onContextMenu={removeContextMenu}
        />
      </div>
    );
  });

  return (
    <div className="relative size-full flex">
      <div className={`relative w-full`}>{images}</div>
      {gallery.length > 1 && sliderControls}
      {gallery.length > 1 && sliderIndicators}
    </div>
  );
};

export default ShopSlider;
