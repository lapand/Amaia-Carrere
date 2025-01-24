import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import ClientI18nProvider from '../modules/i18n/ClientI18nProvider';
import PageLoader from '../components/PageLoader';
import PreloadResources from '../components/PreloadResources';
import Footer from '../components/Footer';
import ReduxProvider from '../components/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amaia Carrere - Illustratrice jeunesse, fantasy, bande dessinée',
  description:
    "Bienvenue dans mon atelier, source de rêves crayonnés. Bandes dessinées, illustrations jeunesse et oeuvres fantasy. Amaia Carrere, auteur illustratrice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              </main>
              <Footer />
            </ClientI18nProvider>
          </ReduxProvider>
        </PageLoader>
      </body>
    </html>
  );
}
