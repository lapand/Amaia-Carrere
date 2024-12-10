// Vérification des variables d'environnement
if (!process.env.NEXT_PUBLIC_FRONT_BASE_URL) {
  throw new Error("NEXT_PUBLIC_FRONT_BASE_URL n'est pas défini.");
}
if (!process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_API_BASE_URL n'est pas défini.");
}
if (!process.env.STRIPE_SECRET) {
  throw new Error("STRIPE_SECRET n'est pas défini.");
}
if (!process.env.MYMAIL) {
  throw new Error("MYMAIL n'est pas défini.");
}
if (!process.env.SENDGRID_USER) {
  throw new Error("SENDGRID_USER n'est pas défini.");
}
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY n'est pas défini.");
}
if (!process.env.CONTACT_FORM_RECIPIENT) {
  throw new Error("CONTACT_FORM_RECIPIENT n'est pas défini.");
}

// Variables d'env exposées au navigateur
export const FRONT_BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;
export const STRAPI_API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL;

// Variables d'env restant côté serveur
export const STRIPE_SECRET = process.env.STRIPE_SECRET;
export const {
  MYMAIL,
  SENDGRID_USER,
  SENDGRID_API_KEY,
  CONTACT_FORM_RECIPIENT,
} = process.env;

// Autres constantes applicatives
// export const DEFAULT_CURRENCY = 'EUR';
// export const ALLOWED_COUNTRIES = ['FR'];
export const SUCCESS_URL = `${FRONT_BASE_URL}/success`;
export const CANCEL_URL = `${FRONT_BASE_URL}/cancel`;
export const getArticlesEndpoint = `${STRAPI_API_BASE_URL}/api/articles?populate=gallery`;
