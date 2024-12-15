import { Trans } from 'react-i18next';
import Image, { ImageProps } from 'next/image';
import { DetailedCartProduct } from '../types';
import { updateQuantity } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import QuantitySelector from './QuantitySelector';

const CartArticle: React.FC<DetailedCartProduct> = ({
  id,
  gallery,
  title,
  description,
  price,
  quantity,
  available,
}) => {
  const dispatch = useDispatch();

  return (
    <li className="relative w-[740px] h-40 flex justify-between items-center gap-4 mb-2">
      <div className="size-32 sm:size-40">
        {!gallery[0] ? (
          <div className="size-full flex justify-center items-center text-xs text-center">
            Image Introuvable
          </div>
        ) : (
          <Image
            {...gallery[0]}
            className="size-full object-contain"
            priority
          />
        )}
      </div>
      <div className="w-1/2 flex gap-10 bg-gray-800 p-4 pr-6 rounded-lg text-white overflow-hidden">
        <div className="w-3/4 flex flex-col gap-2 text-sm line-clamp-2 text-ellipsis break-words">
          <p className="font-bold line-clamp-1 text-ellipsis break-words text-base">
            {title}
          </p>
          <p className="line-clamp-2 text-ellipsis break-words">
            {description}
          </p>
        </div>
        {available && (
          <p className="w-1/4 self-center text-right line-clamp-1 text-ellipsis break-words">
            {(quantity * parseFloat(price)).toFixed(2)} €
          </p>
        )}
      </div>
      {available ? (
        <QuantitySelector id={id} />
      ) : (
        <div className="text-[15px] text-red-600 font-bold">
          Article indisponible
        </div>
      )}
      <div
        onClick={() => dispatch(updateQuantity({ id: id, quantity: 0 }))}
        className="absolute top-0 right-0 size-8 p-[.6rem] border border-white invert rounded-full cursor-pointer transition-transform hover:scale-110 hover:invert-0 hover:bg-gray-800"
      >
        <Image
          src="/cross.svg"
          alt="Retirer l'article du panier"
          width={20}
          height={20}
          className="size-full object-contain"
          priority
        />
      </div>
    </li>
  );
};

export default CartArticle;
