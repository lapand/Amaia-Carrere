import { Trans } from 'react-i18next';
import Image, { ImageProps } from 'next/image';
import { DetailedCartProduct } from '../types';

const CartArticle: React.FC<DetailedCartProduct> = ({
  id,
  gallery,
  title,
  description,
  price,
  quantity,
}) => {
  return (
    <div
      className={`md:h-[350px] flex max-md:flex-col max-md:items-center w-4/5 sm:w-3/5 mx-auto md:w-full max-w-3xl bg-primary-800 border border-primary-800 rounded-lg shadow`}
    >
      {/* <div> */}
        {gallery.length !== 0 && (
          <div
            className={`md:w-2/5 flex justify-center items-center max-md:rounded-t-lg md:rounded-l-lg overflow-hidden`}
          >
            <Image {...gallery[0]} />
          </div>
        )}
        <div className="md:w-3/5 overflow-auto p-5 md:p-10">
          <h5 className="mb-5 text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
          <p className="text-gray-400">{description}</p>
        </div>
      {/* </div>
      <div>
        <p>Prix unitaire: {price}</p>
        <p>Quantité: {quantity}</p>
      </div> */}
    </div>
  );
};

export default CartArticle;
