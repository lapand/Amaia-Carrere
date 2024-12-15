'use client';

import Section from '../../../components/Section';
import { useSelector } from 'react-redux';
import CartArticle from '../../../components/CartArticle';
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';
import CartValidation from '../../../components/CartValidation';
import { selectDetailedCartProducts } from '@/store/selectors/shopSelectors';

export default function CartPage() {
  const detailedCartProducts = useSelector(selectDetailedCartProducts);

  // Au cas où un produit devient indisponible après avoir été ajouté dans le panier, on l'enlève de la validation du panier mais on le laisse sur le rendu de la page
  const validationData = detailedCartProducts
    .filter((p) => p.available)
    .map(({ updatedAt, gallery, price, ...rest }) => {
      const priceInNb = parseFloat(price);
      return {
        ...rest,
        price: priceInNb,
      };
    });

  let cartTotal: number = 0;
  detailedCartProducts
    .filter((p) => p.available)
    .forEach((item) => (cartTotal += item.quantity * parseFloat(item.price)));

  const cartArticlesJSX = detailedCartProducts.map((product, i) => {
    return (
      <React.Fragment key={i}>
        <CartArticle {...product} />
        <div className="border-t-2 border-surface-300"></div>
      </React.Fragment>
    );
  });

  return (
    <div className="flex-1 flex flex-col gap-24">
      <h1 className="text-7xl sm:licorice-font sm:thickening text-right">
        Your Shopping Cart
      </h1>
      {cartArticlesJSX.length === 0 ? (
        <>
          <div className="text-lg text-center">Votre panier est vide</div>
          <Link
            href="/shop"
            className="transition-transform duration-300 hover:scale-105 hover:rotate-1 text-center"
          >
            <Button className="text-xl rounded-3xl px-8 py-4">
              Retour à la boutique
            </Button>
          </Link>
        </>
      ) : (
        <div className="flex-1 flex max-sm:flex-col justify-center gap-32">
          <div className="self-start flex flex-col gap-4 p-10 border border-gray-400 rounded-xl">
            {cartArticlesJSX}
          </div>
          <div className="relative sm:w-96">
            <div className="sm:sticky top-28 3xl:top-80 flex flex-col gap-16">
              <h2 className="text-xl text-center underline">Total panier</h2>
              <p className="text-lg text-center">
                <span>
                  Sous-total <span className="text-sm">(TVA incluse)</span> :
                </span>
                <span className="font-bold"> {cartTotal.toFixed(2)} €</span>
              </p>
              <CartValidation validationData={validationData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
