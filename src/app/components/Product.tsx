import Link from 'next/link';
import Button from './Button';
import Card from './Card';
import { Trans } from 'react-i18next';
import { ImageType } from './Card';

type CardType = {
  headline?: string;
  content?: string;
  gallery?: ImageType[];
  imgAlt?: string;
  imgFormat?: 'landscape' | 'portrait' | 'square';
};

type ProductProps = {
  id: number;
  title?: string;
  card: CardType;
  btn?: {
    btnText: string;
    btnLink?: string;
  };
};

const Product: React.FC<ProductProps> = ({ id, card, btn }) => {
  
  return (
    <div className="flex flex-col items-center gap-12 md:gap-16">
      <h3 className="inspiration-font text-6xl sm:text-8xl">
        <Trans
          i18nKey={`common:products.${id - 1}.title`}
          components={{ strong: <strong /> }}
        />
      </h3>
      <div className="flex flex-col gap-5">
        <Card id={id} {...card} />
        {btn && (
          <div className="text-center md:text-end">
            {btn.btnLink ? (
              <Link href={btn.btnLink} target="_blank">
                <Button>{btn.btnText}</Button>
              </Link>
            ) : (
              <Button>{btn.btnText}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
