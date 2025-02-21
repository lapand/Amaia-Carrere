import { getHomepageData } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import PagesOverview from '@/components/PagesOverview';

export default async function HomePage() {
  // Récupère le backgroundImage depuis l'API de Strapi
  const backgroundImage = await getHomepageData();

  return (
    <div className="flex flex-col">
      <HeroSection backgroundImage={backgroundImage || null} />
      <PagesOverview />
    </div>
  );
}
