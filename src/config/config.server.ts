// =========================================
// VARIABLES D'ENV EXPOSÉES AU SERVEUR
// =========================================

type AllowedCountry = 'FR' | 'ES' | 'BE' | 'GB';

// Front URL
export const FRONT_BASE_URL = process.env.FRONT_BASE_URL;

// Strapi API
// --- Base URLs ---
export const STRAPI_API_BASE_URL = process.env.STRAPI_API_BASE_URL;
export const ARTICLES_ENDPOINT_BASE = '/api/articles';
export const ARTICLES_POPULATE_PARAMS =
  '?populate[0]=langages&populate[1]=galerie';
// --- Fetch GET URLs ---
export const ARTICLES_FETCH_URL = `${STRAPI_API_BASE_URL}${ARTICLES_ENDPOINT_BASE}${ARTICLES_POPULATE_PARAMS}`;
export const ARTICLES_FETCH_FOR_STATIC_PARAMS = `${STRAPI_API_BASE_URL}${ARTICLES_ENDPOINT_BASE}?fields=documentId,title`;
export const generateArticleUrl = (id: string): string =>
  `${STRAPI_API_BASE_URL}${ARTICLES_ENDPOINT_BASE}/${id}${ARTICLES_POPULATE_PARAMS}`;

// Stripe
export const STRIPE_SECRET = process.env.STRIPE_SECRET;
// --- Paramètres paiement Stripe ---
export const DEFAULT_CURRENCY = 'eur';
export const ALLOWED_COUNTRIES: AllowedCountry[] = ['FR', 'ES', 'BE', 'GB'];
// --- URLs de redirection après paiement Stripe ---
export const SUCCESS_URL = `${FRONT_BASE_URL}/success`;
export const CANCEL_URL = `${FRONT_BASE_URL}/cancel`;

// Sendmail
export const {
  MYMAIL,
  SENDGRID_USER,
  SENDGRID_API_KEY,
  CONTACT_FORM_RECIPIENT,
} = process.env;
