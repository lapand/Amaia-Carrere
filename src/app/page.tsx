import { getHomePageData } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import PagesOverview from '@/components/PagesOverview';

// Invalide le cache toutes les heures générant ainsi une nouvelle HomePage statique avec des données mises à jour
// Ceci est une sécurité supplémentaire au cas où l'invalidation du cache par le webhook Strapi ne se réalise pas correctement.
export const revalidate = 3600;

export default async function HomePage() {
  // Récupère les données de la page d'accueil depuis l'API de Strapi
  const {
    heroMobile,
    heroDesktop,
    illustrationsJeunesse,
    bandesDessinees,
    fantasy,
  } = await getHomePageData();

  return (
    <div className="flex flex-col">
      <HeroSection
        backgroundImage={{
          heroMobile,
          heroDesktop,
        }}
      />
      <PagesOverview
        data={{
          illustrationsJeunesse,
          bandesDessinees,
          fantasy,
        }}
      />
    </div>
  );
}
