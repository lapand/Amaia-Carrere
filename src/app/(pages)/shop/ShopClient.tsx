'use client';

import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import ArticleCard from '../../../components/ArticleCard';
import { ArticleCardType } from '@/types';
import {
  setStaticUpdatedAt,
  syncArticles,
} from '../../../store/slices/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/configureStore';

type ShopClientType = {
  staticArticles: ArticleCardType[];
  fetchTimestamp: number | null;
  articlesError?: string;
};

const ShopClient: React.FC<ShopClientType> = ({
  staticArticles,
  fetchTimestamp,
  articlesError,
}) => {
  // const { t } = useTranslation('common');
  // const tradProduct: any[] = t('products', { returnObjects: true }) as any[];
  const dispatch = useDispatch<AppDispatch>();

  // Mise à jour du rendu à partir du store et non à partir des props statiques car les données des articles peuvent être modifiées après la validation du panier si il y a discordance avec les données de la bdd.
  const shop = useSelector((state: RootState) => state.shop);
  // console.log(articles);

  // Synchronisation du store avec les props statiques uniquement si les props contiennent des données plus récentes que celles du store
  // Un nouveau rendu SSG ISR provoquera ainsi une mise à jour du store tandis que des données modifiées dynamiquement dans le store (par exemple, par l'invalidation d'un article d'un panier après comparaison à la bdd) seront rendues prioritairement.
  // Cela permet ainsi de profiter des optimisations SSG/ISR (SEO, performances) en mettant à jour les données en temps réel lors d'une action utilisateur (comme la discordance d'informations entre le panier utilisateur et les articles correspondants en base de données).
  useEffect(() => {
    if (fetchTimestamp) {
      const { staticUpdatedAt, dynamicUpdatedAt } = shop;
      const shouldSyncArticles =
        (!staticUpdatedAt && !dynamicUpdatedAt) ||
        (!dynamicUpdatedAt && fetchTimestamp > (staticUpdatedAt || 0)) ||
        (!staticUpdatedAt && fetchTimestamp > (dynamicUpdatedAt || 0)) ||
        (fetchTimestamp > (dynamicUpdatedAt || 0) &&
          fetchTimestamp > (staticUpdatedAt || 0));

      if (shouldSyncArticles) {
        dispatch(syncArticles(staticArticles));
        dispatch(setStaticUpdatedAt(fetchTimestamp));
      }
    }
  }, [dispatch, staticArticles, shop]);

  const articlesJSX = shop.articles.map((article, i) => {
    return <ArticleCard key={i} {...article} />;
  });

  return (
    <div className="flex-1 flex flex-col gap-10 sm:gap-16">
      <h1 className="text-6xl sm:text-6.5xl xl:text-7xl inspiration-font thickening text-right">
        Boutique
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-12">
        {articlesError}
        {articlesJSX}
      </div>
    </div>
  );
};

export default ShopClient;
