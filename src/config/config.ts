import { LanguageType } from "@/types/language";
import { SocialType } from "@/types/social";

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

export const langData: LanguageType[] = [
  {
    langName: 'euskadi',
    languageCode: 'eus',
    iconUri: '/basco-flag.png',
    posX: 'translate-x-[50px]',
    posY: 'translate-y-[60px] sm:translate-y-[50px]',
    delay: 0,
  },
  {
    langName: 'french',
    languageCode: 'fr',
    iconUri: '/french-flag.png',
    posX: '',
    posY: 'translate-y-[60px]',
    delay: 100,
  },
  {
    langName: 'english',
    languageCode: 'en',
    iconUri: '/english-flag.png',
    posX: 'translate-x-[60px]',
    posY: '',
    delay: 200,
  },
];

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
