import { SocialType } from '@/types/social';

export const emailParts = {
  part1: 'carrereamaia',
  part2: '@outlook',
  part3: '.fr',
};
export const addressParts = {
  part1: '44, ',
  part2: 'Rue Victor Hugo, ',
  part3: '64100 Bayonne, France',
};
export const telParts = {
  part1: '078',
  part2: '834',
  part3: '2728',
};

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
export const getArticlesEndpoint = `${STRAPI_API_BASE_URL}/api/articles?populate=galerie`;

export const socials: SocialType[] = [
  {
    href: 'https://www.instagram.com/amaia.carrere',
    src: '/insta-icon.svg',
    alt: 'instagram-icon',
  },
  {
    href: 'https://www.facebook.com/amaia.carrere',
    src: '/facebook-icon.svg',
    alt: 'facebook-icon',
  },
  {
    href: 'https://www.linkedin.com/in/amaia-carrere-6302b7245',
    src: '/linkedin.svg',
    alt: 'linkedin-icon',
  },
];

export const mobileBreakpoint = 640;
export const lgBreakpoint = 1024;
export const xlBreakpoint = 1280;
