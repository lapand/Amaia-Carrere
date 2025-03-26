import React from 'react';
import GalleryClient from './GalleryClient';
import { getGalleryData } from '@/lib/api';

// Invalide le cache toutes les heures générant ainsi une nouvelle GalleryPage statique avec des données mises à jour
// Ceci est une sécurité supplémentaire au cas où l'invalidation du cache par le webhook Strapi ne se réalise pas correctement.
export const revalidate = 3600;

export default async function GalleryPage() {
  const data = await getGalleryData();

  return <GalleryClient images={data} />;
}
