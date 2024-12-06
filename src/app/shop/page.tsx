import ShopClient from './ShopClient';

const STRAPI_API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
const articlesEndpoint = '/api/articles?populate=img';

// Invalide le cache toutes les heures générant ainsi une nouvelle ShopPage statique avec des données mises à jour
export const revalidate = 60;

// Server Component
// Récupération des données et transfert au Client Component
export default async function ShopPage() {
  try {
    const response = await fetch(`${STRAPI_API_BASE_URL}${articlesEndpoint}`);
    const data = await response.json();
    console.log(data);
    const formattedData = data.data.map((article: any) => {
      const { documentId, title, price, updatedAt } = article;
      const description = article.description || '';
      const img = article.img || {};
      const src = img.url ? `${STRAPI_API_BASE_URL}${img.url}` : '';
      const alt = img.alternativeText || 'Image indisponible';
      const width = img.width || 0;
      const height = img.height || 0;
      return {
        id: documentId,
        updatedAt,
        img: {
          src,
          alt,
          width,
          height,
        },
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
