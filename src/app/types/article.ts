export type ArticleCardType = {
  id: string;
  updatedAt: Date;
  img: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  price: string;
};

export type CartArticle = {
  id: string;
  quantity: number;
};

export type DetailedCartProduct = ArticleCardType & CartArticle;