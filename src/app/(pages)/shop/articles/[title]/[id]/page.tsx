import { formatArticle } from '@/utils/formatters';
import ArticleClient from './ArticleClient';
import {
  ARTICLES_FETCH_FOR_STATIC_PARAMS,
  buildArticleApiUrl,
  STRAPI_API_KEY,
} from '@/config/config.server';
import { routes } from '@/config/config.global';
import { redirect } from 'next/navigation';
import { slugify } from '@/utils/slugify';

// Invalide le cache toutes les heures générant ainsi une nouvelle ArticlePage statique avec des données mises à jour
// Ceci est une sécurité supplémentaire au cas où l'invalidation du cache par le webhook Strapi ne se réalise pas correctement.
export const revalidate = 3600;

// Génération des routes dynamiques pour SSG sous forme /[title]/[id] avec encodage du titre pour un URL valide
export async function generateStaticParams() {
  try {
    let articles = await fetch(ARTICLES_FETCH_FOR_STATIC_PARAMS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    }).then((res) => res.json());

    if (!articles || !articles.data) {
      throw new Error('No data returned from API');
    }

    return articles.data.map((article: { [key: string]: any }) => ({
      title: slugify(article.titre),
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
    const res = await fetch(buildArticleApiUrl(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    });
    const article = await res.json();

    return article ? formatArticle(article.data) : undefined;
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

  // Redirige vers l'URL correcte si le titre ne correspond pas
  if (article) {
    const expectedTitle = slugify(article.title);
    if (params.title !== expectedTitle) {
      redirect(routes.article(article.title, params.id));
    }
  }

  // Stocke la date de la mise à jour des données de l'article en vue de la comparer avec la date des données dynamiques reçues lors de l'invalidation du panier, permettant ainsi de toujours afficher les données les plus récentes.
  const fetchTimestamp = Date.now();

  return (
    <ArticleClient staticArticle={article} fetchTimestamp={fetchTimestamp} />
  );
}
