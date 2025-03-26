// ===================================================
// DONNEES STATIQUES EXPOSÉES UNIQUEMENT AU SERVEUR
// ===================================================

type AllowedCountry = 'FR' | 'ES' | 'BE' | 'GB';

// Front Base URL
export const FRONT_BASE_URL = process.env.FRONT_BASE_URL;

// Strapi API
// --- Base URLs ---
export const STRAPI_API_KEY = process.env.STRAPI_API_KEY;
export const STRAPI_WEBHOOK_REVALIDATE_TOKEN =
  process.env.STRAPI_WEBHOOK_REVALIDATE_TOKEN;
export const STRAPI_API_BASE_URL = process.env.STRAPI_API_BASE_URL;
const ARTICLES_ENDPOINT_BASE = '/api/articles';
const ARTICLES_POPULATE_PARAMS =
  '?populate[0]=langages&populate[1]=galerie';
const HOMEPAGE_ENDPOINT_BASE = '/api/page-accueil';
const ALL_POPULATE_PARAMS = '?populate=*';
const GALLERY_ENDPOINT_BASE = '/api/galerie-images';
const ABOUT_ENDPOINT_BASE = '/api/a-propos-images';
// --- Fetch GET URLs ---
export const ARTICLES_FETCH_URL = `${STRAPI_API_BASE_URL}${ARTICLES_ENDPOINT_BASE}${ARTICLES_POPULATE_PARAMS}`;
export const ARTICLES_FETCH_FOR_STATIC_PARAMS = `${STRAPI_API_BASE_URL}${ARTICLES_ENDPOINT_BASE}?fields=documentId,titre`;
export const buildArticleApiUrl = (id: string): string =>
  `${STRAPI_API_BASE_URL}${ARTICLES_ENDPOINT_BASE}/${id}${ARTICLES_POPULATE_PARAMS}`;
export const HOMEPAGE_FETCH_URL = `${STRAPI_API_BASE_URL}${HOMEPAGE_ENDPOINT_BASE}${ALL_POPULATE_PARAMS}`;
export const GALLERY_FETCH_URL = `${STRAPI_API_BASE_URL}${GALLERY_ENDPOINT_BASE}${ALL_POPULATE_PARAMS}`;
export const ABOUT_FETCH_URL = `${STRAPI_API_BASE_URL}${ABOUT_ENDPOINT_BASE}${ALL_POPULATE_PARAMS}`;
// // Strapi API
// export const STRAPI_API_KEY = process.env.STRAPI_API_KEY;
// export const STRAPI_API_BASE_URL = process.env.STRAPI_API_BASE_URL;

// // Regroupement des routes API dans un objet
// export const apiRoutes = {
//   articles: {
//     base: '/api/articles',
//     populateParams: '?populate[0]=langages&populate[1]=galerie',
//     fetchAll: `${STRAPI_API_BASE_URL}/api/articles?populate[0]=langages&populate[1]=galerie`,
//     fetchForStatic: `${STRAPI_API_BASE_URL}/api/articles?fields=documentId,titre`,
//     fetchById: (id: string) =>
//       `${STRAPI_API_BASE_URL}/api/articles/${id}?populate[0]=langages&populate[1]=galerie`,
//   },
//   homepage: {
//     base: '/api/page-accueil',
//     populateParams: '?populate[0]=bgImageMobile&populate[1]=bgImageDesktop',
//     fetch: `${STRAPI_API_BASE_URL}/api/page-accueil?populate[0]=bgImageMobile&populate[1]=bgImageDesktop`,
//   },
// };

// Stripe
export const STRIPE_SECRET = process.env.STRIPE_SECRET;
export const DEFAULT_CURRENCY = 'eur';
export const ALLOWED_COUNTRIES: AllowedCountry[] = ['FR', 'ES', 'BE', 'GB'];

// Sendmail
export const {
  MYMAIL,
  SENDGRID_USER,
  SENDGRID_API_KEY,
  CONTACT_FORM_RECIPIENT,
} = process.env;
