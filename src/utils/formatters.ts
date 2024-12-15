import { STRAPI_API_BASE_URL } from '@/config/config';
import { APIArticleType, ArticleCardType } from '@/types';

export function formatArticle(article: APIArticleType): ArticleCardType {
  const {
    documentId,
    title,
    description,
    gallery,
    price,
    updatedAt,
    about,
    available,
  } = article;

  const formattedGallery = !gallery
    ? []
    : gallery.map((img: any) => ({
        src: img.url ? `${STRAPI_API_BASE_URL}${img.url}` : '',
        alt: img.alternativeText || 'Image indisponible',
        width: img.width || 0,
        height: img.height || 0,
      }));

  return {
    id: documentId,
    updatedAt,
    gallery: formattedGallery,
    title,
    description: description || '',
    price: price.toFixed(2),
    about: about || '',
    available,
  };
}
