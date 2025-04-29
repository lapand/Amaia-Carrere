import React from 'react';
import AboutClient from './AboutClient';
import { getAboutData } from '@/lib/api';

// Invalide le cache toutes les 12 heures générant ainsi une nouvelle AboutPage statique avec des données mises à jour
// Ceci est une sécurité supplémentaire au cas où l'invalidation du cache par le webhook Strapi ne se réalise pas correctement.
export const revalidate = 43200;

export default async function AboutPage() {
  const data = await getAboutData();

  return <AboutClient images={data} />;
}
