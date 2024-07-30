import ForSaleSlider from './ForSaleSlider';

type ImageType = {
  uri: string;
  width: number;
  height: number;
};

export type CardType = {
  headline: string;
  content: string;
  gallery?: ImageType[];
  imgAlt?: string;
  imgFormat?: 'landscape' | 'portrait' | 'square';
};

const Card: React.FC<CardType> = ({
  headline,
  content,
  gallery,
  imgAlt = "",
  imgFormat = 'portrait',
}) => {

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
    <div className={`${cardHeight} flex max-md:flex-col max-md:items-center sm:w-3/5 mx-auto md:w-full max-w-3xl bg-primary-800 border border-primary-800 rounded-lg shadow`}>
      {gallery && gallery.length !== 0 && (
        <div className="md:w-2/5 flex justify-center items-center max-md:rounded-t-lg md:rounded-l-lg overflow-hidden">
          {gallery.length !== 0 && (
            <ForSaleSlider
              gallery={gallery}
              alt={imgAlt}
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
