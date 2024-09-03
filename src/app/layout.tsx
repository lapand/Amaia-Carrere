import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import ClientI18nProvider from './modules/i18n/ClientI18nProvider';
import PageLoader from './components/PageLoader';
import PreloadResources from './components/PreloadResources';

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
          <ClientI18nProvider>
            <Header />
            {children}
          </ClientI18nProvider>
        </PageLoader>
      </body>
    </html>
  );
}
