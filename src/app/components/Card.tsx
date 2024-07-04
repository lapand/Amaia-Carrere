import { useState, useEffect, useRef } from 'react';
import ForSaleSlider from './ForSaleSlider';
import { CardType } from './ForSale';
import { getPrevIdx, getNextIdx } from '../modules/array-utils/getIndex';

const Card: React.FC<CardType> = ({
  headline,
  content,
  gallery,
  imgFormat = 'portrait',
}) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(
    gallery && gallery.length > 0 ? 0 : null
  );

  const onPrevImg = (currentIdx: number) => {
    setActiveIdx(getPrevIdx(gallery!, currentIdx));
  };
  const onNextImg = (currentIdx: number) => {
    setActiveIdx(getNextIdx(gallery!, currentIdx));
  };
  const onSelectImg = (currentIdx: number) => {
    setActiveIdx(currentIdx);
  };

  const contentJSX = content
    .split('\n')
    .map((line: string, i: number, linesTable) => {
      if (i !== linesTable.length - 1) {
        return (
          <span key={i}>
            {line}
            <br />
          </span>
        );
      } else {
        return <span key={i}>{line}</span>;
      }
    });

    let cardHeight = "";
    if(imgFormat === "portrait") {
      cardHeight = "md:h-[400px]";
    } else if(imgFormat === "landscape") {
      cardHeight = "md:h-[300px]";
    } else if(imgFormat === "square") {
      cardHeight = "md:h-[350px]";
    }

  return (
    <div className={`${cardHeight} flex max-md:flex-col max-md:items-center md:max-w-3xl bg-primary-800 border border-primary-800 rounded-lg shadow`}>
      {gallery && gallery.length !== 0 && (
        <div className="md:w-2/5 flex justify-center items-center max-md:rounded-t-lg md:rounded-l-lg overflow-hidden">
          {activeIdx !== null && (
            <ForSaleSlider
              onPrevImg={onPrevImg}
              onNextImg={onNextImg}
              onSelectImg={onSelectImg}
              {...gallery[activeIdx]}
              imgIdx={activeIdx}
              galleryLength={gallery.length}
            />
          )}
        </div>
      )}
      <div className="md:w-3/5 overflow-auto p-5 md:p-10">
        <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {headline}
        </h5>
        <p className="text-gray-700 dark:text-gray-400">{contentJSX}</p>
      </div>
    </div>
  );
};

export default Card;
