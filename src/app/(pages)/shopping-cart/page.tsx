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

export default function CartPage() {
  const detailedCartProducts = useSelector(selectDetailedCartProducts);
  const windowWidth = useViewportWidth();

  // Les produits devenus indisponibles après leur ajout dans le panier et avant le paiement sont retirés des données à envoyer à la validation du panier. Ils restent tout de même sur la page avec la mention "indisponible".
  const availableCartProducts = detailedCartProducts.filter((p) => p.available);

  // Au cas où un produit devient indisponible après avoir été ajouté dans le panier, on l'enlève de la validation du panier mais on le laisse sur le rendu de la page
  const validationData = availableCartProducts.map(
    ({
      updatedAt,
      gallery,
      shippingCost,
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

  // Les frais de livraison seront égaux aux frais de livraison les plus élevés parmi l'ensemble des articles dans le panier disponibles à la vente.
  const shippingCost: number =
    availableCartProducts.length === 0
      ? 0
      : Math.max(
          ...availableCartProducts.map((product) => product.shippingCost)
        );

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
    <div className="flex-1 flex flex-col max-lg:mb-28">
      {cartArticlesJSX.length === 0 ? (
        <>
          <h1 className="text-7xl inspiration-font thickening-2 sm:text-right max-sm:ml-10 sm:mr-20">
            Panier
          </h1>
          <div className="flex-1 flex flex-col justify-center gap-16">
            <div className="text-lg text-center">Votre panier est vide</div>
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
        <div className="flex-1 flex max-lg:flex-col-reverse justify-center gap-10 lg:gap-10 xl:gap-16 2xl:gap-32">
          <div className="max-lg:w-full self-center lg:self-start flex flex-col gap-8 sm:gap-4 p-3 sm:p-6 3xl:p-10 border border-gray-400 rounded-xl">
            {cartArticlesJSX}
          </div>
          <div className="flex flex-col">
            <h1 className="text-7xl licorice-font thickening-2 text-right max-sm:mr-10">
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
                <div className="flex sm:max-lg:justify-between lg:flex-col lg:gap-12 3xl:gap-20 py-4 sm:py-5 lg:py-0 px-3 sm:px-10 lg:px-0 max-lg:border-y-[1px] border-slate-900">
                  <div className="flex flex-col max-lg:justify-center gap-2 lg:gap-6 text-sm sm:text-xl lg:text-base 2xl:text-lg whitespace-nowrap">
                    <p>
                      <span>
                        Sous-total
                        <span className="sm:text-lg lg:text-sm 3xl:text-base">
                          {' '}
                          (TVA incluse)
                        </span>{' '}
                        :
                      </span>{' '}
                      {cartSubTotal.toFixed(2)} €
                    </p>
                    <p>Frais de livraison : {shippingCost.toFixed(2)} €</p>
                  </div>
                  <p className="max-sm:flex-1 max-lg:flex max-sm:flex-col max-lg:items-center max-lg:gap-2 text-lg sm:text-2xl lg:text-lg 3xl:text-xl text-center">
                    <span>Total :</span>
                    <span className="xl:text-xl font-bold">
                      {' '}
                      {cartTotal.toFixed(2)} €
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
