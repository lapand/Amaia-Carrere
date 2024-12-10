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
    "Portfolio d'Amaia Carrere, présentation de mon travail de dessinatrice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className}`}>
        <PreloadResources />
        <PageLoader>
          <ReduxProvider>
            <ClientI18nProvider>
              <Header />
              <main className="flex min-h-screen flex-col main-bg">
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
