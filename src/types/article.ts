export type APIArticleType = {
  documentId: string;
  titre: string;
  descriptionCourte?: string;
  galerie?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  }[];
  prix: number;
  fraisLivraison: number;
  updatedAt: Date;
  disponibilite: boolean;
  descriptionComplete?: string;
};

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
  shippingCost: number;
  about: string;
  available: boolean;
};

export type CartArticle = {
  id: string;
  quantity: number;
};

export type DetailedCartProduct = ArticleCardType & CartArticle;
