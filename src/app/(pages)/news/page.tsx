import React from 'react';
import NewsClient from './NewsClient';
import { fallbackHomePageData } from '@/data/homepage/homePageFallback';
// import { getNewsData } from '@/lib/api';

// Invalide le cache toutes les 12 heures générant ainsi une nouvelle NewsPage statique avec des données mises à jour
// Ceci est une sécurité supplémentaire au cas où l'invalidation du cache par le webhook Strapi ne se réalise pas correctement.
export const revalidate = 43200;

export default async function NewsPage() {
  //   const data = await getNewsData();
  const data = [
    {
      mainImg: {
        src: '/pink-et-renard.webp',
        alt: '',
        width: 300,
        height: 300,
        formats: {},
      },
      title: 'BD éducatives',
      content: `Comment aborder un sujet important dans la vie d’un pré-ado de manière ludique et amusante ?

Grâce aux dessins drôles et percutants d’Amaia Carrere, suivez les adorables personnages de Pink et Renard à travers des sujets importants pour les ados :
Le consentement, les injonctions, les règles, les protections hygiéniques, le zizi.

Des œuvres originales spécialement créées pour eux, proposées en grand format (A2 ou A3) adapté à un affichage dans différents lieux d’un établissement (salle de classe, couloir, toilettes, préau, …).

Imprimées sur Dibond avec protection anti-graffiti, ce matériau est léger, résistant et recyclable.

Allez plus loin dans la transmission et l’éducation :
Vous avez un idée de sujet, une envie spécifique pour votre établissement ?
Nous serions ravis de vous proposer une planche adaptée à vos besoins !`,
      linkText: `⫸ Vers le site des éditions Waouche`,
      link: 'https://waouche.com',
      gallery: [
        {
          src: '/pink-et-renard-le-consentement.webp',
          alt: '',
          width: 300,
          height: 300,
          formats: {},
        },
        {
          src: '/pink-et-renard-les-regles.webp',
          alt: '',
          width: 300,
          height: 300,
          formats: {},
        },
      ],
    },
  ];

  return <NewsClient articles={data} />;
}
