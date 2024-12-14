import ArticleClient from './ArticleClient';
import { STRAPI_API_BASE_URL } from '@/config/config';

// Invalide le cache toutes les heures générant ainsi une nouvelle ArticlePage statique avec des données mises à jour
export const revalidate = 30;

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
  }
}

// Retrieve article data from Strapi API
async function getArticle(id: string) {
  try {
    let res = await fetch(
      `${STRAPI_API_BASE_URL}/api/articles/${id}?populate=gallery`
    );
    let article = await res.json();
    // console.log(article);
    let {
      documentId,
      title,
      description,
      gallery,
      price,
      updatedAt,
      about,
      available,
    } = article.data;
    gallery = !gallery
      ? []
      : gallery.map((img: any) => {
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
      description: description || '',
      price: price.toFixed(2),
      about: about || '',
      available,
    };
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

  return <ArticleClient article={article} />;
}
