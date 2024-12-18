'use client';

import { useSelector } from 'react-redux';
import CartArticle from '../../../components/CartArticle';
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';
import CartValidation from '../../../components/CartValidation';
import { selectDetailedCartProducts } from '@/store/selectors/shopSelectors';
import useViewportWidth from '@/hooks/useViewportWidth';
import { lgBreakpoint } from '@/config/config';

export default function CartPage() {
  const detailedCartProducts = useSelector(selectDetailedCartProducts);
  const windowWidth = useViewportWidth();

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
    <div className="flex-1 flex flex-col max-lg:mb-16">
      {cartArticlesJSX.length === 0 ? (
        <>
          <h1 className="text-7xl inspiration-font thickening text-right">
            Panier
          </h1>
          <div className="flex-1 flex flex-col justify-center gap-16">
            <div className="text-lg text-center">Votre panier est vide</div>
            <Link
              href="/shop"
              className="transition-transform duration-300 hover:rotate-1 text-center"
            >
              <Button className="text-lg rounded-3xl px-6 py-3">
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex-1 flex max-lg:flex-col-reverse justify-center gap-10 lg:gap-10 xl:gap-24 2xl:gap-32">
          <div className="max-lg:w-full self-center lg:self-start flex flex-col gap-8 sm:gap-4 p-3 sm:p-6 3xl:p-10 border border-gray-400 rounded-xl">
            {cartArticlesJSX}
          </div>
          <div className="relative flex flex-col gap-20 3xl:gap-40">
            <h1 className="text-7xl licorice-font thickening text-right">
              Panier
            </h1>
            <div
              style={
                windowWidth < lgBreakpoint
                  ? { boxShadow: '0 -2px 16px 4px rgba(15, 23, 42, .7)' }
                  : {}
              }
              className="fixed max-lg:z-50 max-lg:bottom-0 max-lg:left-0 max-lg:w-full lg:sticky lg:top-80 3xl:top-[420px] flex flex-col lg:gap-16 max-lg:bg-slate-100"
            >
              {/* <h2 className="text-xl text-center underline">Total panier</h2> */}
              <p className="max-lg:flex max-lg:justify-between sm:text-2xl lg:text-lg 3xl:text-xl py-4 sm:py-5 lg:py-0 px-10 sm:px-32 lg:px-0 text-center max-lg:border-y-[1px] border-slate-900">
                <span>
                  Sous-total
                  <span className="sm:text-lg lg:text-sm 3xl:text-base"> (TVA incluse)</span>:
                </span>
                {windowWidth >= lgBreakpoint && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                <span className="xl:text-xl font-bold"> {cartTotal.toFixed(2)} €</span>
              </p>
              <CartValidation validationData={validationData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
