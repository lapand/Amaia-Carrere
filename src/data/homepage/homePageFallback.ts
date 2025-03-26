import { FormattedImage } from '@/types';
import dataURIs from './dataUris.json';

type FallbackImageArray = [
  FormattedImage,
  FormattedImage,
  FormattedImage
];

// Retourne des données de secours pour les images de la HomePage.
export const fallbackHomePageData: {
  heroMobile: string;
  heroDesktop: string;
  illustrationsJeunesse: FallbackImageArray;
  bandesDessinees: FallbackImageArray;
  fantasy: FallbackImageArray;
} = {
  heroMobile: '/fallbackHomePage/home-mobile.webp',
  heroDesktop: '/fallbackHomePage/home.webp',
  illustrationsJeunesse: [
    {
      src: '/fallbackHomePage/1.webp',
      alt: 'Chat ailé courant après une souris abeille',
      width: 3550,
      height: 2000,
      formats: {
        thumbnail: { url: dataURIs['1.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/2.webp',
      alt: 'Ttinka monte sur la Lune pour prendre en photo une girafe',
      width: 1800,
      height: 2200,
      formats: {
        thumbnail: { url: dataURIs['2.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/3.webp',
      alt: 'Lapin et paon sur une branche observe la Lune',
      width: 2500,
      height: 2400,
      formats: {
        thumbnail: { url: dataURIs['3.webp'], width: 20, height: 20 },
      },
    },
  ],
  bandesDessinees: [
    {
      src: '/fallbackHomePage/4.webp',
      alt: 'Extrait de la BD Lunatique: rencontre avec les extraterrestres',
      width: 1550,
      height: 2200,
      formats: {
        thumbnail: { url: dataURIs['4.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/5.webp',
      alt: 'Extrait de la BD Lunatique: astronaute et extraterrestre',
      width: 2600,
      height: 900,
      formats: {
        thumbnail: { url: dataURIs['5.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/6.webp',
      alt: "Bande dessinée: chute d'une falaise",
      width: 1550,
      height: 2200,
      formats: {
        thumbnail: { url: dataURIs['6.webp'], width: 20, height: 20 },
      },
    },
  ],
  fantasy: [
    {
      src: '/fallbackHomePage/7.webp',
      alt: 'Fantasy noir et blanc, univers fantastique',
      width: 3800,
      height: 2700,
      formats: {
        thumbnail: { url: dataURIs['7.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/8.webp',
      alt: 'Fantasy, arbre et êtres fantastiques',
      width: 3800,
      height: 2850,
      formats: {
        thumbnail: { url: dataURIs['8.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/9.webp',
      alt: 'Oeil de dragon bleu',
      width: 3800,
      height: 2700,
      formats: {
        thumbnail: { url: dataURIs['9.webp'], width: 20, height: 20 },
      },
    },
  ],
};
