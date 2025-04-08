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

  // Synchronisation du store avec les props statiques uniquement si les props contiennent des données plus récentes que celles du store.
  // Une vérification de la fraicheur des données sera faite à chaque nouveau rendu SSG ISR afin de savoir si une mise à jour doit être effectuée avec les nouvelles props statiques.
  // On stockera la date de mise à jour avec les props statiques pour pouvoir la comparer ultérieurement.
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
  }, [dispatch, staticArticles, fetchTimestamp, shop]);

  const articlesJSX = shop.articles.map((article, i) => {
    return <ArticleCard key={i} {...article} />;
  });

  return (
    <div className="flex-1 flex flex-col items-center gap-10 sm:gap-16">
      <h1 className="text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
        Boutique
      </h1>
      <div className="sm:w-[35rem] lg:w-[50rem] xl:w-[65rem] 2xl:w-[75rem] 3xl:w-[85rem] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
        {articlesError}
        {articlesJSX}
      </div>
    </div>
  );
};

export default ShopClient;
