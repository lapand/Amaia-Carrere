'use client';

import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import { useTranslation } from 'react-i18next';
import { productData } from '../data/products';
import Section from '../components/Section';
import ArticleCard from '../components/ArticleCard';
import { ArticleCardType } from '@/app/types';
import { addArticles } from '../store/slices/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

const STRAPI_API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
const articlesEndpoint = '/api/articles?populate=img';

const Shop: React.FC = () => {
  const { t } = useTranslation('common');
  const tradProduct: any[] = t('products', { returnObjects: true }) as any[];
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.shop.articles);
  console.log(articles);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${STRAPI_API_BASE_URL}${articlesEndpoint}`
        );
        const data = await response.json();
        // console.log(data);

        const formattedData = data.data.map((article: any) => {
          const { documentId, title, price } = article;
          const description = article.description || '';
          const img = article.img || {};
          const src = img.url ? `${STRAPI_API_BASE_URL}${img.url}` : '';
          const alt = img.alternativeText || 'Image indisponible';
          const width = img.width || 0;
          const height = img.height || 0;
          return {
            id: documentId,
            img: {
              src,
              alt,
              width,
              height,
            },
            title,
            description,
            price: price.toFixed(2),
          };
        });

        dispatch(addArticles(formattedData));
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchData();
  }, []);

  const articlesJSX = articles.map((article, i) => {
    return <ArticleCard key={i} {...article} />;
  });

  return (
    <Section className="min-h-screen" id="shop">
      <div className="flex-1 flex flex-col gap-32 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
        <h1 className="text-7xl sm:licorice-font sm:thickening text-right">
          Boutique
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-12">
          {articlesJSX}
          {articlesJSX}
          {articlesJSX}
        </div>
      </div>
    </Section>
  );
};

export default Shop;
