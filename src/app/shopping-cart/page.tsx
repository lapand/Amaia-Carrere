'use client';

import Section from '../../components/Section';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartArticle from '../../components/CartArticle';
import React from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import CartValidation from '../../components/CartValidation';

export default function CartPage() {
  const cartArticles = useSelector((state: RootState) => state.cart.articles);

  const articlesData = useSelector((state: RootState) => {
    return state.shop.articles.filter((item) =>
      cartArticles.some((article) => item.id === article.id)
    );
  });

  const detailedCartProduct = articlesData.map((article) => {
    const idx = cartArticles.findIndex((item) => item.id === article.id);
    return { ...article, quantity: cartArticles[idx].quantity };
  });

  let cartTotal: number = 0;
  detailedCartProduct.forEach(
    (item) => (cartTotal += item.quantity * parseFloat(item.price))
  );

  const validationData = detailedCartProduct.map(
    ({ updatedAt, gallery, price, ...rest }) => {
      const priceInNb = parseFloat(price);
      return {
        ...rest,
        price: priceInNb,
      };
    }
  );

  const cartArticlesJSX = detailedCartProduct.map((product, i) => {
    return (
      <React.Fragment key={i}>
        <CartArticle {...product} />
        <div className="border-t-2 border-surface-300"></div>
      </React.Fragment>
    );
  });

  return (
    <Section className="min-h-screen flex">
      <div className="flex-1 flex flex-col gap-24 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
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
            <div className="relative sm:w-96 flex flex-col gap-16">
              <h2 className="text-xl text-center underline">Total panier</h2>
              <p className="sm:sticky top-28 3xl:top-40 text-lg text-center">
                <span>
                  Sous-total <span className="text-sm">(TVA incluse)</span> :
                </span>
                <span className="font-bold"> {cartTotal.toFixed(2)} €</span>
              </p>
              <CartValidation validationData={validationData} />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
