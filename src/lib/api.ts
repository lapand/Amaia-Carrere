import {
  HOMEPAGE_FETCH_URL,
  STRAPI_API_KEY,
  STRAPI_API_BASE_URL,
} from '@/config/config.server';

export interface BackgroundImage {
  bgImageMobile: string | null;
  bgImageDesktop: string | null;
}

export async function getHomepageData(): Promise<BackgroundImage | null> {
  try {
    const res = await fetch(HOMEPAGE_FETCH_URL, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
      cache: 'no-cache', // remettre le cache en prod et webhook strapi déclenchera une invalidation du cache
    });

    if (!res.ok) {
      throw new Error(
        `Erreur HTTP ${res.status}: Impossible de récupérer les données`
      );
    }

    const data = await res.json();

    const getFullUrl = (imageUrl?: string) =>
      imageUrl ? `${STRAPI_API_BASE_URL}${imageUrl}` : null;

    const backgroundImage = {
      bgImageMobile: getFullUrl(data?.data?.bgImageMobile?.url),
      bgImageDesktop: getFullUrl(data?.data?.bgImageDesktop?.url),
    };

    return backgroundImage;
  } catch (error) {
    console.error('Erreur dans getHomepageData :', error);
    return null;
  }
}
