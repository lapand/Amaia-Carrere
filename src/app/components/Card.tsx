import { Trans } from 'react-i18next';
import ForSaleSlider from './ForSaleSlider';

export type ImageType = {
  uri: string;
  width: number;
  height: number;
};

type CardPropsType = {
  id: number;
  headline?: string;
  content?: string;
  gallery?: ImageType[];
  imgAlt?: string;
  imgFormat?: 'landscape' | 'portrait' | 'square';
  reverse?: boolean;
};

const Card: React.FC<CardPropsType> = ({
  id,
  headline,
  content,
  gallery,
  imgAlt = '',
  imgFormat = 'portrait',
  reverse = false,
}) => {
  let cardHeight = '';
  if (imgFormat === 'portrait') {
    cardHeight = 'md:h-[400px]';
  } else if (imgFormat === 'landscape') {
    cardHeight = 'md:h-[300px]';
  } else if (imgFormat === 'square') {
    cardHeight = 'md:h-[350px]';
  }

  const flexDirection = reverse ? 'md:flex-row-reverse' : '';
  const rounded = reverse ? 'md:rounded-r-lg' : 'md:rounded-l-lg';

  return (
    <div
      className={`${cardHeight} flex max-md:flex-col ${flexDirection} max-md:items-center w-4/5 sm:w-3/5 mx-auto md:w-full max-w-3xl bg-primary-800 border border-primary-800 rounded-lg shadow`}
    >
      {gallery && gallery.length !== 0 && (
        <div className={`md:w-2/5 flex justify-center items-center max-md:rounded-t-lg ${rounded} overflow-hidden`}>
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
        <h5 className="mb-5 text-2xl font-bold tracking-tight text-white">
          <Trans
            i18nKey={`common:products.${id - 1}.card.headline`}
            components={{ strong: <strong /> }}
          />
        </h5>
        <p className="text-gray-400">
          <Trans
            i18nKey={`common:products.${id - 1}.card.content`}
            components={{ strong: <strong />, break: <br /> }}
          />
        </p>
      </div>
    </div>
  );
};

export default Card;
