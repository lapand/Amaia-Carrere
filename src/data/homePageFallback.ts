import { FormattedImage } from '@/types';

export type FallbackImageArray = [
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
  heroMobile: '/home-mobile.webp',
  heroDesktop: '/home.webp',
  illustrationsJeunesse: [
    {
      src: '/gallery/19.webp',
      alt: '',
      width: 3550,
      height: 2000,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
    {
      src: '/gallery/20.webp',
      alt: '',
      width: 1800,
      height: 2200,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
    {
      src: '/gallery/26.webp',
      alt: '',
      width: 2500,
      height: 2400,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
  ],
  bandesDessinees: [
    {
      src: '/gallery/7.webp',
      alt: '',
      width: 1550,
      height: 2200,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
    {
      src: '/gallery/16.webp',
      alt: '',
      width: 2600,
      height: 900,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
    {
      src: '/gallery/1.webp',
      alt: '',
      width: 1550,
      height: 2200,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
  ],
  fantasy: [
    {
      src: '/gallery/21.webp',
      alt: '',
      width: 3800,
      height: 2700,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
    {
      src: '/gallery/22.webp',
      alt: '',
      width: 3800,
      height: 2850,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
    {
      src: '/gallery/23.webp',
      alt: '',
      width: 3800,
      height: 2700,
      formats: { thumbnail: { url: '', width: 20, height: 20 } },
    },
  ],
};
