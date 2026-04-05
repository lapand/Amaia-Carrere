// =========================================================
// DONNEES STATIQUES EXPOSÉES AU NAVIGATEUR OU AU SERVEUR
// =========================================================

import { slugify } from '@/utils/slugify';

// Ensemble des routes de navigation de l'application
export const routes = {
  home: '/',
  gallery: '/gallery',
  news: '/news',
  shop: '/shop',
  article: (title: string, id: string) =>
    `/shop/articles/${slugify(title)}/${id}`,
  shoppingCart: '/shopping-cart',
  stripe: {
    // URLs de redirection après paiement Stripe
    success: `/success`,
    cancel: `/cancel`,
  },
  about: '/about',
  contact: '/contact',
};

// Liste des chemins de navigation restreints pour différents composants
export const restrictedPaths: { [key: string]: string[] } = {
  scrollProgressBtn: [routes.shoppingCart, ...Object.values(routes.stripe)],
};

// IDs des sections de la page d'accueil vers lesquelles un scroll est nécessaire
export const homeSectionIds = {
  firstSection: 'first-section',
  secondSection: 'second-section',
};
