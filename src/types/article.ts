export type ArticleCardType = {
  id: string;
  updatedAt: Date;
  gallery: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  title: string;
  description: string;
  price: string;
  about: string;
  available: boolean;
};

export type CartArticle = {
  id: string;
  quantity: number;
};

export type DetailedCartProduct = ArticleCardType & CartArticle;