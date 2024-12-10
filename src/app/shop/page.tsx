import ShopClient from './ShopClient';
import { STRAPI_API_BASE_URL, getArticlesEndpoint } from '@/config/config';

// Invalide le cache toutes les heures générant ainsi une nouvelle ShopPage statique avec des données mises à jour
export const revalidate = 30;

// Récupération des données et transfert au Client Component
export default async function ShopPage() {
  try {
    const response = await fetch(getArticlesEndpoint);
    const data = await response.json();
    // console.log(data);
    const formattedData = data.data.map((article: any) => {
      const { documentId, title, price, updatedAt } = article;
      const description = article.description || '';
      const gallery = !article.gallery
        ? []
        : article.gallery.map((img: any) => {
            const src = img.url ? `${STRAPI_API_BASE_URL}${img.url}` : '';
            const alt = img.alternativeText || 'Image indisponible';
            const width = img.width || 0;
            const height = img.height || 0;
            return {
              src,
              alt,
              width,
              height,
            };
          });
      // console.log(gallery);

      return {
        id: documentId,
        updatedAt,
        gallery,
        title,
        description,
        price: price.toFixed(2),
      };
    });
    return <ShopClient articles={formattedData} />;
  } catch (error) {
    console.error('Erreur:', error);
    const articlesError = 'Error: Articles not found';
    return <ShopClient articles={[]} articlesError={articlesError} />;
  }
}
