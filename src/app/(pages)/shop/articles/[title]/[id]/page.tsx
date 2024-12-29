import { formatArticle } from '@/utils/formatters';
import ArticleClient from './ArticleClient';
import { STRAPI_API_BASE_URL } from '@/config/config';

// Invalide le cache toutes les heures générant ainsi une nouvelle ArticlePage statique avec des données mises à jour
export const revalidate = 15;

// Génération des routes dynamiques pour SSG sous forme /[title]/[id] avec encodage du titre pour un URL valide
export async function generateStaticParams() {
  try {
    let articles = await fetch(
      `${STRAPI_API_BASE_URL}/api/articles?fields=documentId,title`
    ).then((res) => res.json());

    if (!articles || !articles.data) {
      throw new Error('No data returned from API');
    }

    return articles.data.map((article: { [key: string]: any }) => ({
      title: encodeURIComponent(article.title),
      id: article.documentId,
    }));
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Retrieve article data from Strapi API
async function getArticle(id: string) {
  try {
    const res = await fetch(
      `${STRAPI_API_BASE_URL}/api/articles/${id}?populate=galerie`
    );
    const article = await res.json();

    return formatArticle(article.data);
  } catch (error) {
    console.error('Erreur:', error);
    return undefined;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { title: string; id: string };
}) {
  const article = await getArticle(params.id);

  // Stocke la date de la mise à jour des données de l'article en vue de la comparer avec la date des données dynamiques reçues lors de l'invalidation du panier, permettant ainsi de toujours afficher les données les plus récentes.
  const fetchTimestamp = Date.now();

  return (
    <ArticleClient staticArticle={article} fetchTimestamp={fetchTimestamp} />
  );
}
