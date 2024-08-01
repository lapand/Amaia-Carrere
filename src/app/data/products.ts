// Les attributs alt des images sont dans les fichiers de traduction i18n et seront ajoutés au moment de l'utilisation des données dans un composant.
type ProductImg = {
  uri: string;
  width: number;
  height: number;
};

type IncompleteProductsType = {
  gallery: ProductImg[];
  btnLink: string;
  reverse: boolean;
  imgFormat: 'landscape' | 'portrait' | 'square';
};

export const productData: IncompleteProductsType[] = [
  {
    gallery: [
      {
        uri: '/forSale/lunatique/lunatique1.png',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique2.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique3.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique4.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique5.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique6.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique7.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/lunatique/lunatique8.jpg',
        width: 850,
        height: 850,
      },
    ],
    btnLink: '',
    reverse: false,
    imgFormat: 'portrait',
  },
  {
    gallery: [
      {
        uri: '/forSale/ttinka/ttinka1.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/ttinka/ttinka2.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/ttinka/ttinka3.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/ttinka/ttinka4.jpg',
        width: 850,
        height: 850,
      },
      {
        uri: '/forSale/ttinka/ttinka5.jpg',
        width: 850,
        height: 850,
      },
    ],
    btnLink: 'https://www.belarri.com/produit/ttinka',
    reverse: true,
    imgFormat: "square",
  },
];
