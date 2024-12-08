'use client';

import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import Section from '../components/Section';
import ArticleCard from '../components/ArticleCard';
import { ArticleCardType } from '@/app/types';
import { syncArticles } from '../store/slices/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

type ShopClientType = {
  articles: ArticleCardType[];
  articlesError?: string;
};

const ShopClient: React.FC<ShopClientType> = ({ articles, articlesError }) => {
  // const { t } = useTranslation('common');
  // const tradProduct: any[] = t('products', { returnObjects: true }) as any[];
  const dispatch = useDispatch<AppDispatch>();
  // console.log(articles);

  useEffect(() => {
    dispatch(syncArticles(articles));
  }, []);

  const articlesJSX = articles.map((article, i) => {
    return <ArticleCard key={i} {...article} />;
  });

  return (
    <Section className="min-h-screen" id="shop">
      <div className="flex-1 flex flex-col gap-24 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
        <h1 className="text-7xl sm:licorice-font sm:thickening text-right">
          Boutique
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-12">
          {articlesError}
          {articlesJSX}
        </div>
      </div>
    </Section>
  );
};

export default ShopClient;
