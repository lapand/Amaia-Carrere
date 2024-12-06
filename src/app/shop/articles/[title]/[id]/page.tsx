import { notFound } from 'next/navigation';
import ArticleClient from './ArticleClient';
import { ArticleCardType } from '@/app/types';

const STRAPI_API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;
const articlesEndpoint = '/api/articles?populate=img';

// Génération des routes dynamiques pour SSG
export async function generateStaticParams() {
  let articles = await fetch(`${STRAPI_API_BASE_URL}${articlesEndpoint}`).then(
    (res) => res.json()
  );

  return articles.data.map((article: { [key: string]: any }) => ({
    id: article.documentId,
  }));
}

async function getArticle(id: string) {
  let res = await fetch(`${STRAPI_API_BASE_URL}${articlesEndpoint}/${id}`); // URL à modifier pour trouver un seul article strapi
  let article = await res.json();
  // console.log(article);
  if (!article) {
    notFound();
  } else {
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
