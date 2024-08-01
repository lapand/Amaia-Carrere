import React from 'react';
import Product from './Product';
import { useTranslation } from 'react-i18next';
import { productData } from '../data/products';

type ProductType = {
  id: number;
  title?: string;
  card: {
    headline?: string;
    content?: string;
    gallery?: {
      uri: string;
      width: number;
      height: number;
    }[];
    imgAlt?: string;
    imgFormat?: 'landscape' | 'portrait' | 'square';
    reverse: boolean;
  };
  btn?: {
    btnText: string;
    btnLink: string;
  };
};

const ForSale: React.FC = () => {
  const { t } = useTranslation('common');
  const tradProduct: any[] = t('products', { returnObjects: true }) as any[];

  const products = tradProduct.map((product, i): ProductType => {
    return {
      id: product.id,
      card: {
        imgAlt: product.card.imgAlt,
        imgFormat: productData[i].imgFormat,
        gallery: productData[i].gallery,
        reverse: productData[i].reverse,
      },
      btn: {
        btnText: product.btnText,
        btnLink: productData[i].btnLink,
      },
    };
  });

  const productsJSX = products.map((product, i) => {
    return (
      <React.Fragment key={i}>
        <Product {...product} />
        <div className="border-t-2 border-surface-300 min-w-64 w-[15%]"></div>
      </React.Fragment>
    );
  });

  return (
    <div className="flex flex-col items-center gap-20 md:gap-24 m-4 lg:m-12 xl:m-24">
      {productsJSX}
    </div>
  );
};

export default ForSale;
