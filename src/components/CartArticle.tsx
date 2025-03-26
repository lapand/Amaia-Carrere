import Image from 'next/image';
import { DetailedCartProduct } from '../types';
import QuantityAdjuster from './QuantityAdjuster';
import useRemoveFromCart from '@/hooks/useRemoveFromCart';
import Button2 from './Button2';
import CrossIcon from '@/assets/cross.svg';

const CartArticle: React.FC<DetailedCartProduct> = ({
  id,
  gallery,
  title,
  description,
  price,
  quantity,
  available,
  selectedLanguage,
}) => {
  const handleRemoveFromCart = useRemoveFromCart();

  return (
    <li className="relative lg:w-[600px] xl:w-[650px] 3xl:w-[700px] max-sm:max-h-80 sm:h-40 flex max-sm:flex-wrap justify-between items-center gap-4 sm:gap-2 lg:gap-4">
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
      <div className="max-sm:order-3 max-sm:w-full sm:w-1/2 flex gap-2 bg-gradient-to-r from-amber-200 to-transparent p-3 xl:p-4 rounded-lg text-orange-950 overflow-hidden">
        <div className="flex-1 flex flex-col gap-2 text-sm line-clamp-2 text-ellipsis break-words">
          <p className="max-2xl:text-sm font-bold line-clamp-1 text-ellipsis break-words text-base">
            {title}
          </p>
          <hr className="bg-gradient-to-tr from-gray-600 to-transparent border-none h-[2px] w-4/5" />
          <p className="line-clamp-2 text-ellipsis break-words">
            {description}
          </p>
          {selectedLanguage && (
            <>
              <hr className="bg-gradient-to-tr from-gray-600 to-transparent border-none h-[2px] w-3/5" />
              <p>Langue: {selectedLanguage.name}</p>
            </>
          )}
        </div>
        {available && (
          <p className="w-20 self-center max-2xl:text-sm text-right whitespace-nowrap">
            {(quantity * parseFloat(price)).toFixed(2)} €
          </p>
        )}
      </div>
      {available ? (
        <div className="max-sm:order-2 max-sm:self-end">
          <QuantityAdjuster id={id} language={selectedLanguage} size="sm" />
        </div>
      ) : (
        <div className="max-sm:self-end text-[15px] lg:max-2xl:text-sm text-red-600 font-bold">
          Article indisponible
        </div>
      )}

      {/* Btn supprimer l'article */}
      <div className="absolute top-0 right-0">
        <Button2
          onClick={() => handleRemoveFromCart(id, selectedLanguage)}
          className="size-8 flex justify-center items-center bg-none outline outline-1 outline-gray-500"
          aria-label="Retirer l'article du panier"
        >
          <CrossIcon className="size-[0.8rem] transition-colors duration-300 text-primary-600" />
        </Button2>
      </div>
    </li>
  );
};

export default CartArticle;
