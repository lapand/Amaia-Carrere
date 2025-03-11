import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import ClientI18nProvider from '../modules/i18n/ClientI18nProvider';
import PageLoader from '../components/PageLoader';
import PreloadResources from '../components/PreloadResources';
import Footer from '../components/Footer';
import ReduxProvider from '../components/ReduxProvider';
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
  return (
    <html lang="fr">
      <body
        className={`relative overflow-y-scroll bg-amber-200 ${inter.className}`}
      >
        <PreloadResources />
        <PageLoader>
          <ReduxProvider>
            <ClientI18nProvider>
              <div className="relative min-h-screen flex flex-col page-margin border border-gray-800">
                <Header />
                <main className="relative flex-1 flex flex-col">
                  {children}
                  {/* Le bg global du site est attribué à une div fixed car "background-attachment: fixed" n'est pas supporté par Safari sur iOS */}
                  <div className="absolute z-[-1] size-full main-bg" />
                </main>
                <Footer />
                <ScrollProgressBtn className="fixed z-40 bottom-24 right-5 sm:right-10" />
              </div>
            </ClientI18nProvider>
          </ReduxProvider>
        </PageLoader>
      </body>
    </html>
  );
}
