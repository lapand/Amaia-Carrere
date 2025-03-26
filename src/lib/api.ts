import {
  ABOUT_FETCH_URL,
  GALLERY_FETCH_URL,
  HOMEPAGE_FETCH_URL,
  STRAPI_API_KEY,
} from '@/config/config.server';
import { FormattedHomePage, FormattedImage } from '@/types';
import { formatAboutData, formatGallery, formatHomeData } from '@/utils/formatters';
import { fallbackHomePageData } from '@/data/homepage/homePageFallback';

export async function getHomePageData(): Promise<FormattedHomePage> {
  try {
    const res = await fetch(HOMEPAGE_FETCH_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Erreur HTTP ${res.status}: Impossible de récupérer les données de la page Home`
      );
    }

    const data = await res.json();

    // Retourne des données de secours au cas où data serait falsy
    if (!data?.data) {      
      return fallbackHomePageData;
    }

    const formattedData = formatHomeData(data.data);

    return formattedData;
  } catch (error) {
    console.error('Erreur dans getHomePageData :', error);
    // Retourne des données de secours au cas où l'API de Strapi renvoie une erreur
    return fallbackHomePageData;
  }
}

export async function getGalleryData(): Promise<FormattedImage[] | null> {
  try {
    const res = await fetch(GALLERY_FETCH_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Erreur HTTP ${res.status}: Impossible de récupérer les données de la page Gallery`
      );
    }

    const data = await res.json();

    // Retourne des données de secours au cas où data serait falsy
    if (!data?.data) {
      return null;
    }

    const formattedData = formatGallery(data.data);

    return formattedData;
  } catch (error) {
    console.error('Erreur dans getGalleryData :', error);
    // Retourne des données de secours au cas où l'API de Strapi renvoie une erreur
    return null;
  }
}

export async function getAboutData(): Promise<FormattedImage[] | null> {
  try {
    const res = await fetch(ABOUT_FETCH_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Erreur HTTP ${res.status}: Impossible de récupérer les données de la page About`
      );
    }

    const data = await res.json();

    // Retourne des données de secours au cas où data serait falsy
    if (!data?.data) {
      return null;
    }

    const formattedData = formatAboutData(data.data);

    return formattedData;
  } catch (error) {
    console.error('Erreur dans getAboutData :', error);
    // Retourne des données de secours au cas où l'API de Strapi renvoie une erreur
    return null;
  }
}
