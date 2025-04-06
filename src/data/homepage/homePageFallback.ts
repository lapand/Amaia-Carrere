import { FormattedImage } from '@/types';
import dataURIs from './dataUris.json';

type FallbackImageArray = [FormattedImage, FormattedImage, FormattedImage];

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
      src: '/fallbackHomePage/chat-aile.webp',
      alt: 'Chat ailé courant après une souris abeille',
      width: 3550,
      height: 2000,
      formats: {
        thumbnail: { url: dataURIs['chat-aile.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/ttinka.webp',
      alt: 'Ttinka monte sur la Lune pour prendre en photo une girafe',
      width: 1800,
      height: 2200,
      formats: {
        thumbnail: { url: dataURIs['ttinka.webp'], width: 20, height: 20 },
      },
    },
    {
      src: '/fallbackHomePage/paon-lapin.webp',
      alt: 'Lapin et paon sur une branche observe la Lune',
      width: 2500,
      height: 2400,
      formats: {
        thumbnail: { url: dataURIs['paon-lapin.webp'], width: 20, height: 20 },
      },
    },
  ],
  bandesDessinees: [
    {
      src: '/fallbackHomePage/rencontre-extraterrestre.webp',
      alt: 'Extrait de la BD Lunatique: rencontre avec les extraterrestres',
      width: 1550,
      height: 2200,
      formats: {
        thumbnail: {
          url: dataURIs['rencontre-extraterrestre.webp'],
          width: 20,
          height: 20,
        },
      },
    },
    {
      src: '/fallbackHomePage/astronaute-et-extraterrestre.webp',
      alt: 'Extrait de la BD Lunatique: astronaute et extraterrestre',
      width: 2600,
      height: 900,
      formats: {
        thumbnail: {
          url: dataURIs['astronaute-et-extraterrestre.webp'],
          width: 20,
          height: 20,
        },
      },
    },
    {
      src: '/fallbackHomePage/chute.webp',
      alt: "Bande dessinée: chute d'une falaise",
      width: 1550,
      height: 2200,
      formats: {
        thumbnail: { url: dataURIs['chute.webp'], width: 20, height: 20 },
      },
    },
  ],
  fantasy: [
    {
      src: '/fallbackHomePage/fantasy-noir-et-blanc.webp',
      alt: 'Fantasy noir et blanc, univers fantastique',
      width: 3800,
      height: 2700,
      formats: {
        thumbnail: {
          url: dataURIs['fantasy-noir-et-blanc.webp'],
          width: 20,
          height: 20,
        },
      },
    },
    {
      src: '/fallbackHomePage/arbre-fantastique.webp',
      alt: 'Fantasy, arbre et êtres fantastiques',
      width: 3800,
      height: 2850,
      formats: {
        thumbnail: {
          url: dataURIs['arbre-fantastique.webp'],
          width: 20,
          height: 20,
        },
      },
    },
    {
      src: '/fallbackHomePage/oeil-dragon-bleu.webp',
      alt: 'Oeil de dragon bleu',
      width: 3800,
      height: 2700,
      formats: {
        thumbnail: {
          url: dataURIs['oeil-dragon-bleu.webp'],
          width: 20,
          height: 20,
        },
      },
    },
  ],
};
