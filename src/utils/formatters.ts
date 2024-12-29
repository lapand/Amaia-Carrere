import { STRAPI_API_BASE_URL } from '@/config/config';
import { APIArticleType, ArticleCardType } from '@/types';

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
  };
}
