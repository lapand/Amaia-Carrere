import { STRAPI_API_BASE_URL } from '@/config/config.server';
import {
  APIAboutType,
  APIArticleType,
  APIHomePageType,
  ArticleCardType,
  FormattedHomePage,
  FormattedImage,
  ImageData,
} from '@/types';
import { adjustArray } from './adjustArray';
import { fallbackHomePageData } from '@/data/homepage/homePageFallback';
import { APIGalleryType } from '@/types';

const getFullUrl = (imageUrl?: string) =>
  imageUrl ? `${STRAPI_API_BASE_URL}${imageUrl}` : '';

const formatAPIImg = (arr: ImageData[]): FormattedImage[] =>
  arr.map(({ url, alternativeText, width, height, formats }) => ({
    src: getFullUrl(url),
    alt: alternativeText || '',
    width: width || 0,
    height: height || 0,
    formats: Object.keys(formats || {}).reduce((acc, key) => {
      const format = formats?.[key];
      if (format) {
        acc[key] = {
          width: format.width,
          height: format.height,
          url: getFullUrl(format.url),
        };
      }
      return acc;
    }, {} as Record<string, { width: number; height: number; url: string }>),
  }));

export function formatHomeData(data: APIHomePageType): FormattedHomePage {
  const {
    heroMobile,
    heroDesktop,
    illustrationsJeunesse,
    bandesDessinees,
    fantasy,
  } = data;

  return {
    heroMobile: getFullUrl(heroMobile.url),
    heroDesktop: getFullUrl(heroDesktop.url),
    illustrationsJeunesse: adjustArray(
      formatAPIImg(illustrationsJeunesse),
      fallbackHomePageData.illustrationsJeunesse
    ),
    bandesDessinees: adjustArray(
      formatAPIImg(bandesDessinees),
      fallbackHomePageData.bandesDessinees
    ),
    fantasy: adjustArray(formatAPIImg(fantasy), fallbackHomePageData.fantasy),
  };
}

export function formatGallery(data: APIGalleryType): FormattedImage[] {
  return formatAPIImg(data.map((obj) => obj.image));
}

export function formatAboutData(data: APIAboutType): FormattedImage[] {
  return formatAPIImg(data.map((obj) => obj.image));
}

export function formatArticle(article: APIArticleType): ArticleCardType {
  const {
    documentId,
    titre,
    descriptionCourte,
    galerie,
    prix,
    fraisLivraison,
    updatedAt,
    descriptionComplete,
    disponibilite,
    langages,
    poidsEnGramme,
  } = article;

  const formattedGallery = !galerie
    ? []
    : galerie.map((img: any) => ({
        src: img.url ? `${STRAPI_API_BASE_URL}${img.url}` : '',
        alt: img.alternativeText || 'Image indisponible',
        width: img.width || 0,
        height: img.height || 0,
      }));

  return {
    id: documentId,
    updatedAt,
    gallery: formattedGallery,
    title: titre,
    description: descriptionCourte || '',
    price: prix.toFixed(2),
    shippingCost: fraisLivraison,
    about: descriptionComplete || '',
    available: disponibilite,
    languages: langages,
    weight: poidsEnGramme,
  };
}
