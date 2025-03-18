import { STRAPI_API_BASE_URL } from '@/config/config.server';
import {
  APIArticleType,
  APIHomePageType,
  ArticleCardType,
  FormattedHomePage,
  FormattedImage,
  ImageData,
} from '@/types';
import { adjustArray } from './adjustArray';
import { fallbackHomePageData } from '@/data/homePageFallback';

const getFullUrl = (imageUrl?: string) =>
  imageUrl ? `${STRAPI_API_BASE_URL}${imageUrl}` : '';

const formatImgArr = (
  arr: ImageData[],
  fallbackHomePageArr: [FormattedImage, FormattedImage, FormattedImage]
): FormattedImage[] => {
  const result = arr.map(
    ({ url, alternativeText, width, height, formats }) => ({
      src: url ? `${STRAPI_API_BASE_URL}${url}` : '',
      alt: alternativeText || '',
      width: width || 0,
      height: height || 0,
      formats: Object.keys(formats || {}).reduce((acc, key) => {
        const format = formats?.[key];
        if (format) {
          acc[key] = {
            width: format.width,
            height: format.height,
            url: getFullUrl(format.url) || '',
          };
        }
        return acc;
      }, {} as Record<string, { width: number; height: number; url: string }>),
    })
  );
  return adjustArray(result, fallbackHomePageArr);
};

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
    illustrationsJeunesse: formatImgArr(
      illustrationsJeunesse,
      fallbackHomePageData.illustrationsJeunesse
    ),
    bandesDessinees: formatImgArr(
      bandesDessinees,
      fallbackHomePageData.bandesDessinees
    ),
    fantasy: formatImgArr(fantasy, fallbackHomePageData.fantasy),
  };
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
  };
}
