import Button from './Button';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/configureStore';
import { LanguageOptionType } from '@/types/selectOptions';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValidationIcon from './ValidationIcon';
import Button2 from './Button2';

type AddToCartType = {
  id: string;
  quantity: number;
  language?: LanguageOptionType;
  size?: 'sm' | 'md';
};

const AddToCart: React.FC<AddToCartType> = ({
  id,
  quantity,
  language,
  size = 'md',
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isAdded, setIsAdded] = useState(false);

  let btnSize = 'w-9';
  let iconSize = 'size-6';
  if (size === 'sm') {
    btnSize = 'w-8';
    iconSize = 'size-5';
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        language: language
          ? {
              name: language.label,
              code: language.value,
            }
          : undefined,
        quantity,
      })
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <AnimatePresence>
        {isAdded && (
          <motion.p
            className="text-primary-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            +{quantity}
          </motion.p>
        )}
      </AnimatePresence>
      <div className={`${iconSize}`}>
        <AnimatePresence mode="wait">
          {!isAdded ? (
            <motion.img
              key="shopping-cart"
              src="/shopping-cart.webp"
              alt="shopping-cart-icon"
              width={100}
              height={100}
              className="size-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="validation-icon" // Clé unique pour chaque composant
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ValidationIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button2
        onClick={handleAddToCart}
        className={`${btnSize} aspect-square rounded-full py-3 px-4 text-xl flex justify-center items-center`}
      >
        +
      </Button2>
    </div>
  );
};

export default AddToCart;
