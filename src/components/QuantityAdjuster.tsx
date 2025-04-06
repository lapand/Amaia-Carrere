import Image from 'next/image';
import Button2 from './Button2';
import { addToCart, decrementQuantity } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/configureStore';
import { ArticleLanguageType } from '@/types';

type QuantityAdjusterType = {
  id: string;
  language?: ArticleLanguageType;
  size?: 'sm' | 'md';
};

const QuantityAdjuster: React.FC<QuantityAdjusterType> = ({
  id,
  language,
  size = 'md',
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const quantity = useSelector((state: RootState) => {
    const article = state.cart.articles.find(
      (item) =>
        item.id === id &&
        (item.selectedLanguage?.code === language?.code ||
          (!item.selectedLanguage && !language))
    );
    return !article ? undefined : article.quantity;
  });

  let btnSize = 'w-9';
  let contentSize = 'size-6';
  if (size === 'sm') {
    btnSize = 'w-8';
    contentSize = 'size-5';
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {quantity && quantity > 0 && (
        <Button2
          onClick={() => dispatch(decrementQuantity({ id, language }))}
          className={`${btnSize} aspect-square py-3 px-4 text-xl flex justify-center items-center bg-none text-primary-600 outline outline-1 outline-gray-500 hover:outline-none hover:bg-neutral-700 hover:text-amber-50`}
        >
          -
        </Button2>
      )}
      <div className={`${contentSize}`}>
        {!quantity || quantity === 0 ? (
          <Image
            src="/shopping-cart.webp"
            alt="shopping-cart-icon"
            width={100}
            height={100}
            className="size-full"
            priority
          />
        ) : (
          <p className="text-center">{quantity}</p>
        )}
      </div>
      <Button2
        onClick={() => dispatch(addToCart({ id, language, quantity: 1 }))}
        className={`${btnSize} aspect-square py-3 px-4 text-xl flex justify-center items-center`}
      >
        +
      </Button2>
    </div>
  );
};

export default QuantityAdjuster;
