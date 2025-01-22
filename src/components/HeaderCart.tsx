import React, { useState } from 'react';
import Button from './Button';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectDetailedCartProducts } from '@/store/selectors/shopSelectors';
import { AnimatePresence, motion } from 'framer-motion';
import useRemoveFromCart from '@/hooks/useRemoveFromCart';
import { routes } from '@/config/config.global';

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
              <Image
                onClick={() =>
                  handleRemoveFromCart(id, selectedLanguage || undefined)
                }
                src="/cross.svg"
                alt="Retirer l'article du panier"
                width={20}
                height={20}
                className="size-9 p-3 object-contain transition-transform hover:scale-125 cursor-pointer"
                priority
              />
            </li>
          );
        });

  return (
    <>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative size-12 p-3 cursor-pointer"
      >
        <Link href={routes.shoppingCart} className="relative">
          <Image
            src="/shopping-cart.png"
            alt="shopping-cart-icon"
            width={100}
            height={100}
            className="size-full"
            priority
          />
          <span className="absolute top-[20px] left-[16px] text-xs bg-accent rounded-full size-5 flex justify-center items-center border border-black">
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
            <div className=" flex flex-col gap-4 w-48 sm:w-80 text-sm bg-gray-800 text-white rounded-l-lg shadow-lg p-5">
              <p className="self-center text-base">
                Total : {totalPrice.toFixed(2)} €
              </p>
              <Link href={routes.shoppingCart} className="self-center">
                <Button className="flex items-center rounded-xl px-4 py-3">
                  <Image
                    src="/shopping-cart.png"
                    alt="shopping-cart-icon"
                    width={100}
                    height={100}
                    className="size-5 invert"
                    priority
                  />
                  <span className="ml-2">Voir mon panier</span>
                </Button>
              </Link>
              <div className="flex flex-col gap-3">
                <p>Articles présents :</p>
                <ul className="max-h-56 sm:max-h-64 overflow-y-auto overflow-x-hidden">
                  {cartItemJSX}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderCart;
