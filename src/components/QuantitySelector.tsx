import Image from 'next/image';
import Button from './Button';
import { addToCart, decrementQuantity } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/configureStore';

type QuantitySelectorType = {
  id: string;
  size?: 'sm' | 'md';
};

const QuantitySelector: React.FC<QuantitySelectorType> = ({
  id,
  size = 'md',
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const quantity = useSelector((state: RootState) => {
    const article = state.cart.articles.find((item) => item.id === id);
    return !article ? undefined : article.quantity;
  });

  let btnSize = 'w-9';
  let iconSize = 'size-6';
  if (size === 'sm') {
    btnSize = 'w-8';
    iconSize = 'size-5';
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {quantity && quantity > 0 && (
        <Button
          onClick={() => dispatch(decrementQuantity(id))}
          className={`${btnSize} aspect-square rounded-full py-0 px-0 text-xl flex justify-center items-center bg-none outline outline-1 outline-gray-500`}
          style={{ color: 'black' }}
        >
          -
        </Button>
      )}
      <div className={`${iconSize}`}>
        {!quantity || quantity === 0 ? (
          <Image
            src="/shopping-cart.png"
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
      <Button
        onClick={() => dispatch(addToCart(id))}
        className={`${btnSize} aspect-square rounded-full py-0 px-0 text-xl flex justify-center items-center`}
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
