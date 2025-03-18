import { HOMEPAGE_FETCH_URL, STRAPI_API_KEY } from '@/config/config.server';
import { FormattedHomePage } from '@/types';
import { formatHomeData } from '@/utils/formatters';
import { fallbackHomePageData } from '@/data/homePageFallback';

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
    // console.log(formattedData);

    return formattedData;
  } catch (error) {
    console.error('Erreur dans getHomePageData :', error);
    // Retourne des données de secours au cas où l'API de Strapi renvoie une erreur
    return fallbackHomePageData;
  }
}
