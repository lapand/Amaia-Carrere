import { formatArticle } from '@/utils/formatters';
import ShopClient from './ShopClient';
import { getArticlesEndpoint } from '@/config/config';
import { APIArticleType } from '@/types';

// Invalide le cache toutes les heures générant ainsi une nouvelle ShopPage statique avec des données mises à jour
export const revalidate = 30;

// Récupération des données et transfert au Client Component
export default async function ShopPage() {
  try {
    const response = await fetch(getArticlesEndpoint);
    const data = await response.json();
    // console.log(data);

    // Stocke la date de la mise à jour des données des articles en vue de la comparer avec la date des données dynamiques reçues lors de l'invalidation du panier, permettant ainsi de toujours afficher les données les plus récentes.
    const fetchTimestamp = Date.now();
    // console.log(1, fetchTimestamp);

    const formattedData = data.data.map((article: APIArticleType) =>
      formatArticle(article)
    );
    return (
      <ShopClient
        staticArticles={formattedData}
        fetchTimestamp={fetchTimestamp}
      />
    );
  } catch (error) {
    console.error('Erreur:', error);
    const articlesError = 'Error: Articles not found';
    return (
      <ShopClient
        staticArticles={[]}
        fetchTimestamp={null}
        articlesError={articlesError}
      />
    );
  }
}
