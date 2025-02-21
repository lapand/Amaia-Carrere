import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import ClientI18nProvider from '../modules/i18n/ClientI18nProvider';
import PageLoader from '../components/PageLoader';
import PreloadResources from '../components/PreloadResources';
import Footer from '../components/Footer';
import ReduxProvider from '../components/ReduxProvider';
import { extractStaticRoutes } from '@/utils/routes';
import { routes } from '@/config/config.global';
import RouteWrapper from '@/components/RouteWrapper';
import ScrollProgressBtn from '@/components/ScrollProgressBtn';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amaia Carrere - Illustratrice jeunesse, fantasy, bande dessinée',
  description:
    'Bienvenue dans mon atelier, source de rêves crayonnés. Bandes dessinées, illustrations jeunesse et oeuvres fantasy. Amaia Carrere, auteur illustratrice.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retourne un tableau Array de l'ensemble des chemins des routes statiques du site
  const staticRoutes = extractStaticRoutes(routes);

  // Définit les routes qui ne devront pas afficher les enfants du RouteWrapper
  const forbiddenRoutes: string[] = [
    routes.shoppingCart,
    routes.gallery,
    ...Object.values(routes.stripe),
  ];

  // Définit les routes qui devront afficher les enfants du RouteWrapper
  const allowedRoutes = staticRoutes.filter(
    (route) => !forbiddenRoutes.includes(route)
  );
  console.log(allowedRoutes, forbiddenRoutes);

  return (
    <html lang="fr">
      <body className={`relative overflow-y-scroll ${inter.className}`}>
        <PreloadResources />
        <PageLoader>
          <ReduxProvider>
            <ClientI18nProvider>
              <Header />
              <main className="relative flex min-h-screen flex-col">
                {/* Le bg global du site est attribué à une div fixed car "background-attachment: fixed" n'est pas supporté par Safari sur iOS */}
                <div className="fixed z-[-1] size-full main-bg" />
                {children}
                <RouteWrapper paths={allowedRoutes}>
                  <ScrollProgressBtn className="fixed z-40 bottom-24 right-5 sm:right-10" />
                </RouteWrapper>
              </main>
              <Footer />
            </ClientI18nProvider>
          </ReduxProvider>
        </PageLoader>
      </body>
    </html>
  );
}
