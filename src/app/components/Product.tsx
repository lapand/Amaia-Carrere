import Button from './Button';
import Image from 'next/image';
import { useState, useEffect, useRef, ReactNode } from 'react';
import Card from './Card';
import { CardType } from './ForSale';

type ProductProps = {
  title: string;
  card: CardType;
  btnText?: string;
};

const Product: React.FC<ProductProps> = ({ title, card, btnText }) => {
    
  return (
    <div className="flex flex-col items-center gap-12 md:gap-20">
      <h3 className="inspiration-font text-8xl">{title}</h3>
      <div className="flex flex-col gap-5">
        <Card {...card} />
        {btnText && (
          <div className="text-center md:text-end">
            <Button className="hover:brightness-50">{btnText}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
