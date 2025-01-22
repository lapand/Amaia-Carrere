// =========================================================
// DONNEES STATIQUES EXPOSÉES AU NAVIGATEUR OU AU SERVEUR
// =========================================================

import { slugify } from '@/utils/slugify';

// Front site parameters
export const FRONT_BASE_URL = process.env.FRONT_BASE_URL;
export const routes = {
  home: '/',
  gallery: '/gallery',
  shop: '/shop',
  article: (title: string, id: string) =>
    `/shop/articles/${slugify(title)}/${id}`,
  shoppingCart: '/shopping-cart',
  stripe: {
    // URLs de redirection après paiement Stripe
    success: `${FRONT_BASE_URL}/success`,
    cancel: `${FRONT_BASE_URL}/cancel`,
  },
  about: '/about',
  contact: '/contact',
};
