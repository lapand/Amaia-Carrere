import React, { useState } from 'react';
import Button from './Button';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectDetailedCartProducts } from '@/store/selectors/shopSelectors';
import { AnimatePresence, motion } from 'framer-motion';
import useRemoveFromCart from '@/hooks/useRemoveFromCart';
import { routes } from '@/config/config.global';
import CrossIcon from '@/assets/cross.svg';
import Button2 from './Button2';

const HeaderCart = () => {
  const [isHovered, setIsHovered] = useState(false);
  const detailedCartProducts = useSelector(selectDetailedCartProducts);

  let cartItemCount = 0;
  detailedCartProducts.forEach((item) => (cartItemCount += item.quantity));
  let totalPrice = 0;
  detailedCartProducts
    .filter((p) => p.available)
    .forEach((item) => (totalPrice += item.quantity * parseFloat(item.price)));

  const handleRemoveFromCart = useRemoveFromCart();

  const cartItemJSX =
    detailedCartProducts.length === 0
      ? 'Panier vide'
      : detailedCartProducts.map((item, i: number) => {
          const {
            id,
            available,
            title,
            gallery,
            quantity,
            price,
            selectedLanguage,
          } = item;
          return (
            <li
              key={i}
              className="flex justify-between items-center gap-4 mb-2"
            >
              <div className="size-16">
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
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-xs font-bold line-clamp-1 text-ellipsis break-words">
                  {title}
                </p>
                {available ? (
                  <p className="text-xs line-clamp-1 text-ellipsis break-words">
                    {quantity} x {price} €
                    {selectedLanguage && ` (${selectedLanguage.code})`}
                  </p>
                ) : (
                  <div className="text-xs text-red-600 font-bold">
                    Article indisponible
                  </div>
                )}
              </div>
              <Button2
                onClick={() =>
                  handleRemoveFromCart(id, selectedLanguage || undefined)
                }
                className="size-7 flex justify-center items-center border border-amber-100 transition-colors bg-none group hover:bg-amber-200"
                aria-label="Retirer l'article du panier"
              >
                <CrossIcon className="size-[0.7rem] transition-colors text-amber-100 group-hover:text-primary-600" />
              </Button2>
            </li>
          );
        });

  return (
    <div>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative flex items-center cursor-pointer group hover:scale-110 transition-transform duration-300 ${
          isHovered ? 'scale-110' : ''
        }`}
      >
        <Link
          href={routes.shoppingCart}
          className="relative p-3 flex items-center"
        >
          <span
            className={`size-6 sm:size-7 cart-icon-mask transition-colors duration-300 ${
              isHovered ? 'bg-amber-300' : 'bg-amber-50'
            } group-hover:bg-amber-300`}
          />
          <span className="absolute bottom-0 sm:bottom-1 right-1 sm:right-2 flex justify-center items-center text-xs bg-primary-200 rounded-full size-4 text-primary-800">
            {cartItemCount}
          </span>
        </Link>
      </motion.div>

      {/* Infobulle */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, x: 300 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 pt-5"
          >
            <div className=" flex flex-col gap-4 w-72 sm:w-80 text-sm bg-primary-600 text-primary-200 rounded-l-lg shadow-lg p-5">
              <p className="self-center text-base">
                Total : {totalPrice.toFixed(2)} €
              </p>
              <Link href={routes.shoppingCart} className="self-center">
                <Button
                  className="flex items-center px-4 py-3 group"
                  aria-label="Vers le panier"
                >
                  <span className="inline-block size-5 cart-icon-mask transition-colors duration-300 bg-amber-50 group-hover:bg-primary-600" />
                  <span className="ml-2">Voir mon panier</span>
                </Button>
              </Link>
              <div className="flex flex-col gap-3">
                <p>Articles présents :</p>
                <ul className="max-h-56 sm:max-h-64 overflow-y-auto overflow-x-hidden pr-1">
                  {cartItemJSX}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderCart;
