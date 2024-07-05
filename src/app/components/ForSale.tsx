import React from 'react';
import Product from './Product';

export type ImageType = {
  uri: string;
  alt: string;
  width: number;
  height: number;
};

export type CardType = {
  headline: string;
  content: string;
  gallery?: ImageType[];
  imgFormat?: 'landscape' | 'portrait' | 'square';
};

type Product = {
  title: string;
  card: CardType;
  btnText?: string;
};

const products: Product[] = [
  {
    title: 'Lunatique',
    card: {
      headline:
        "Lunatique est un recueil de BD humouristiques et de gags qui se passent en majorité dans l'espace.",
      content:
        "Le crowdfunding pour Lunatique, le fanzine de l'espace, va commencer dès le 20 Juin !!\n\nLe lien Ulule sera diffusé sur mes réseaux et sur le site ce jour là.",
      gallery: [
        {
          uri: '/forSale/lunatique/lunatique1.png',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique2.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique3.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique4.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique5.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique6.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique7.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/lunatique/lunatique8.jpg',
          alt: 'lunatique fanzine',
          width: 850,
          height: 850,
        },
      ],
    },
    btnText: 'Vers le site marchand',
  },
  {
    title: 'Ttinka',
    card: {
      headline: 'Livre-CD pour les tout petits de 0 à 6 ans',
      content:
        "Les textes sont d'Arantxa Hirigoyen, la musique de Philippe Albor, et j'ai fait les illustrations :)\n\nProduit par la maison de disque Belarri, de Matthieu Haramboure.\nTtinka est disponible en ligne depuis le 15 Novembre sur le site Belarri.",
      imgFormat: 'square',
      gallery: [
        {
          uri: '/forSale/ttinka/ttinka1.jpg',
          alt: 'livre Ttinka',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/ttinka/ttinka2.jpg',
          alt: 'livre Ttinka',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/ttinka/ttinka3.jpg',
          alt: 'livre Ttinka',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/ttinka/ttinka4.jpg',
          alt: 'livre Ttinka',
          width: 850,
          height: 850,
        },
        {
          uri: '/forSale/ttinka/ttinka5.jpg',
          alt: 'livre Ttinka',
          width: 850,
          height: 850,
        },
      ],
    },
    btnText: 'Vers le site marchand',
  },
];

const ForSale: React.FC = () => {
  const productsJSX = products.map((product, i) => {
    return (
      <React.Fragment key={i}>
        <Product {...product} />
        <div className="border-t-2 border-surface-400 min-w-64 w-[15%]"></div>
      </React.Fragment>
    );
  });

  return (
    <div className="flex flex-col items-center gap-20 md:gap-32 m-4 lg:m-12 xl:m-32">
      {productsJSX}
    </div>
  );
};

export default ForSale;
