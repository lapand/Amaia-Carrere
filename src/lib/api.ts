import {
  ABOUT_FETCH_URL,
  GALLERY_FETCH_URL,
  HOMEPAGE_FETCH_URL,
  STRAPI_API_KEY,
} from '@/config/config.server';
import { FormattedHomePage, FormattedImage } from '@/types';
import {
  formatAboutData,
  formatGallery,
  formatHomeData,
} from '@/utils/formatters';
import { fallbackHomePageData } from '@/data/homepage/homePageFallback';

// HEAD ping pour tester si l'application Strapi est disponible
export async function isStrapiAvailable(): Promise<boolean> {
  try {
    const res = await fetch(HOMEPAGE_FETCH_URL, {
      method: 'HEAD',
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
      // Evite que Next mette ce ping en cache
      cache: 'no-store',
    });

    return res.ok;
  } catch (error) {
    console.error('Strapi est injoignable :', error);
    return false;
  }
}

export async function getHomePageData(): Promise<FormattedHomePage> {
  try {
    const res = await fetch(HOMEPAGE_FETCH_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
    });

    const data = await res.json();

    // Retourne des données de secours au cas où la structure de la réponse ne serait pas celle attendue.
    if (!data?.data) {
      return fallbackHomePageData;
    }

    // Vérifie que l'API de Strapi soit disponible
    const strapiIsUp = await isStrapiAvailable();

    // Formatage des données
    let formattedData = formatHomeData(data.data);

    // Si Strapi est indisponible et que le fetch de Next a servi les URLs des images en cache, les fichiers images utilisés dans des éléments img (via le composant Image de Next.js) seront disponibles car préalablement mis en cache par le navigateur de l'utilisateur.
    // En revanche, les fichiers utilisés dans des backgrounds ne sont pas mis en cache par le navigateur, ce qui veut dire que les URLs de ces images servis par Next à partir du cache du fetch entraineront une erreur lors de la requête de récupération (l'API Strapi étant indisponible).
    // On remplace donc les URLs des images du cache du fetch utilisées dans des backgrounds (heroMobile et heroDesktop) par des versions de secours locales.
    if (!strapiIsUp) {
      formattedData = {
        ...formattedData,
        heroMobile: fallbackHomePageData.heroMobile,
        heroDesktop: fallbackHomePageData.heroDesktop,
      };
    }

    return formattedData;
  } catch (error) {
    // Retourne des données de secours :
    // => si la requête vers l'API de Strapi échoue ET que le cache du fetch est vide
    // => si une autre erreur se produit
    console.error('Erreur dans getHomePageData :', error);
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

    const data = await res.json();

    // Retourne des données de secours au cas où la structure de la réponse ne serait pas celle attendue.
    if (!data?.data) {
      return null;
    }

    // Formatage des données
    const formattedData = formatGallery(data.data);

    return formattedData;
  } catch (error) {
    // Retourne des données de secours :
    // => si la requête vers l'API de Strapi échoue ET que le cache du fetch est vide
    // => si une autre erreur se produit
    console.error('Erreur dans getGalleryData :', error);
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

    const data = await res.json();

    // Retourne des données de secours au cas où la structure de la réponse ne serait pas celle attendue.
    if (!data?.data) {
      return null;
    }

    // Formatage des données
    const formattedData = formatAboutData(data.data);

    return formattedData;
  } catch (error) {
    // Retourne des données de secours :
    // => si la requête vers l'API de Strapi échoue ET que le cache du fetch est vide
    // => si une autre erreur se produit
    console.error('Erreur dans getAboutData :', error);
    return null;
  }
}
