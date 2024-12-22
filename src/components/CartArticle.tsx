import Image from 'next/image';
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
    <li className="relative lg:w-[600px] xl:w-[650px] 3xl:w-[700px] h-60 sm:h-40 flex max-sm:flex-wrap justify-between items-center gap-4 sm:gap-2 lg:gap-4">
      {/* Image */}
      <div className="size-40">
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

      {/* Description & prix & quantité */}
      <div className="max-sm:order-3 max-sm:w-full sm:w-1/2 flex gap-2 xl:gap-10 bg-gradient-to-r from-[rgb(253,186,116)] to-transparent p-3 xl:p-4 rounded-lg text-orange-950 overflow-hidden">
        <div className="w-3/4 flex flex-col gap-2 text-sm line-clamp-2 text-ellipsis break-words">
          <p className="max-2xl:text-sm font-bold line-clamp-1 text-ellipsis break-words text-base">
            {title}
          </p>
          <p className="line-clamp-2 text-ellipsis break-words">
            {description}
          </p>
        </div>
        {available && (
          <p className="w-1/4 self-center max-2xl:text-sm text-right line-clamp-1 text-ellipsis break-words">
            {(quantity * parseFloat(price)).toFixed(2)} €
          </p>
        )}
      </div>
      {available ? (
        <div className="max-sm:order-2 max-sm:self-end">
          <QuantitySelector id={id} size="sm" />
        </div>
      ) : (
        <div className="max-sm:self-end text-[15px] lg:max-2xl:text-sm text-red-600 font-bold">
          Article indisponible
        </div>
      )}

      {/* Btn supprimer l'article */}
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
