import { Draft } from "@reduxjs/toolkit";
import { ImageProps } from "next/image";

export type GalleryType = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type ArticleLanguageType = {
  name: string;
  code: string;
};

export type APIArticleType = {
  documentId: string;
  titre: string;
  descriptionCourte?: string;
  galerie?: GalleryType[];
  prix: number;
  fraisLivraison: number;
  updatedAt: Date;
  disponibilite: boolean;
  descriptionComplete?: string;
  langages: ArticleLanguageType[];
};

export type ArticleCardType = {
  id: string;
  updatedAt: Date;
  gallery: Draft<ImageProps[]>;
  title: string;
  description: string;
  price: string;
  shippingCost: number;
  about: string;
  available: boolean;
  languages: ArticleLanguageType[];
};

export type CartArticle = {
  id: string;
  quantity: number;
  selectedLanguage?: ArticleLanguageType;
};

export type DetailedCartProduct = ArticleCardType & CartArticle;
