import Link from 'next/link';
import Button from './Button';
import Card from './Card';
import { CardType } from './Card';

type ProductProps = {
  title: string;
  card: CardType;
  btn?: {
    btnText: string;
    btnLink?: string;
  };
};

const Product: React.FC<ProductProps> = ({ title, card, btn }) => {
  return (
    <div className="flex flex-col items-center gap-12 md:gap-16">
      <h3 className="inspiration-font text-8xl">{title}</h3>
      <div className="flex flex-col gap-5">
        <Card {...card} />
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
