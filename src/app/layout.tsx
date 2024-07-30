import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import ClientI18nProvider from './modules/i18n/ClientI18nProvider';

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
        <ClientI18nProvider>
          <Header />
          {children}
        </ClientI18nProvider>
      </body>
    </html>
  );
}
