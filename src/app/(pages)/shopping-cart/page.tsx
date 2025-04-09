'use client';

import { useSelector } from 'react-redux';
import CartArticle from '../../../components/CartArticle';
import React from 'react';
import Link from 'next/link';
import Button from '../../../components/Button';
import CartValidation from '../../../components/CartValidation';
import { selectDetailedCartProducts } from '@/store/selectors/shopSelectors';
import useViewportWidth from '@/hooks/useViewportWidth';
import { lgBreakpoint } from '@/data/breakpoints';
import { routes } from '@/config/config.global';
import getShippingCost from '@/utils/getShippingCost';

export default function CartPage() {
  const detailedCartProducts = useSelector(selectDetailedCartProducts);
  const windowWidth = useViewportWidth();

  // Les produits devenus indisponibles après leur ajout dans le panier et avant le paiement sont retirés des données à envoyer à la validation du panier. Ils restent tout de même sur la page avec la mention "indisponible".
  const availableCartProducts = detailedCartProducts.filter((p) => p.available);

  const validationData = availableCartProducts.map(
    ({
      updatedAt,
      gallery,
      description,
      languages,
      available,
      about,
      price,
      ...rest
    }) => {
      const priceInNb = parseFloat(price);
      return {
        price: priceInNb,
        ...rest,
      };
    }
  );

  let cartSubTotal: number = 0;
  availableCartProducts.forEach(
    (item) => (cartSubTotal += item.quantity * parseFloat(item.price))
  );

  const totalWeight = availableCartProducts.reduce(
    (total, product) => total + product.weight * product.quantity,
    0
  );

  const shippingCost = getShippingCost(totalWeight);

  const cartTotal = cartSubTotal + shippingCost;

  const cartArticlesJSX = detailedCartProducts.map((product, i) => {
    return (
      <React.Fragment key={i}>
        <CartArticle {...product} />
        <div className="border-t-2 border-surface-300"></div>
      </React.Fragment>
    );
  });

  return (
    <div className="flex-1 flex flex-col items-center">
      {cartArticlesJSX.length === 0 ? (
        <>
          <h1 className="regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
            Panier
          </h1>
          <div className="flex-1 flex flex-col justify-center gap-16">
            <div className="text-center text-2.5xl sm:text-3xl lg:text-3.5xl 2xl:text-4xl annie-use-your-telescope font-bold">
              Votre panier est vide
            </div>
            <Link
              href={routes.shop}
              className="transition-transform duration-300 hover:rotate-1 text-center"
            >
              <Button className="text-lg px-6 py-3">
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex-1 flex max-lg:flex-col-reverse justify-end lg:justify-center gap-10 lg:gap-10 xl:gap-16 2xl:gap-32 max-lg:mb-28">
          <div className="max-lg:w-full self-center lg:self-start flex flex-col gap-8 sm:gap-4 p-3 sm:p-6 3xl:p-10 border border-gray-400 rounded-xl">
            {cartArticlesJSX}
          </div>
          <div className="flex flex-col lg:max-xl:gap-6">
            <h1 className="self-center regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
              Panier
            </h1>
            <div
              style={
                windowWidth < lgBreakpoint
                  ? { boxShadow: '0 -2px 16px 4px rgba(15, 23, 42, .7)' }
                  : {}
              }
              className="flex-1 relative max-lg:fixed max-lg:z-50 max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:bg-slate-100"
            >
              <div className="lg:sticky lg:top-56 xl:top-48 3xl:top-[300px] flex flex-col lg:gap-12 3xl:gap-16 border-l lg:border-l-gray-500 lg:p-4 xl:p-10">
                <div className="flex flex-col xs:flex-row lg:flex-col sm:max-lg:justify-between max-xs:gap-2 lg:gap-12 3xl:gap-20 py-4 sm:py-5 lg:py-0 px-3 sm:px-10 lg:px-0 max-lg:border-y-[1px] border-slate-900">
                  <div className="flex flex-col max-lg:justify-center gap-2 lg:gap-6 whitespace-nowrap">
                    <p>
                      <span className="annie-use-your-telescope font-bold text-2xl sm:text-2.5xl lg:text-2xl 2xl:text-2.5xl">
                        Sous-total
                        <span className="text-xl sm:text-xl lg:text-xl 3xl:text-xl">
                          {' '}
                          (avec TVA)
                        </span>{' '}
                        :
                      </span>{' '}
                      <span className="text-lg sm:text-xl lg:text-base 2xl:text-xl">
                        {cartSubTotal.toFixed(2)}
                      </span>{' '}
                      €
                    </p>
                    <p className="text-sm sm:text-xl lg:text-base 2xl:text-lg">
                      <span className="annie-use-your-telescope font-bold text-2xl sm:text-2xl lg:text-xl 2xl:text-2xl">
                        Frais de livraison :
                      </span>{' '}
                      <span className="text-lg sm:text-xl lg:text-base 2xl:text-lg">
                        {shippingCost.toFixed(2)}
                      </span>{' '}
                      €
                    </p>
                  </div>
                  <p className="max-sm:flex-1 max-lg:flex xs:flex-col sm:flex-row max-lg:items-center max-lg:gap-2 text-center">
                    <span className="annie-use-your-telescope font-bold text-2.5xl sm:text-4xl lg:text-2.5xl">
                      Total :
                    </span>
                    <span className="text-xl xs:text-1.5xl sm:text-2xl xl:text-xl font-bold">
                      {' '}
                      <span className="text-1.5xl sm:text-2.5xl lg:text-xl 2xl:text-xl">
                        {cartTotal.toFixed(2)}
                      </span>{' '}
                      €
                    </span>
                  </p>
                </div>
                <CartValidation
                  validationData={validationData}
                  shippingCost={shippingCost}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
