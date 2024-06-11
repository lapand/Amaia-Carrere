import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import i18next from "./modules/i18n";
import { I18nextProvider } from 'react-i18next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amaia Carrere - Illustratrice jeunesse, fantasy, bande dessinée",
  description: "Portfolio d'Amaia Carrere, présentation de mon travail de dessinatrice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <I18nextProvider i18n={i18next}> */}
        <body className={`${inter.className}`}>
          <Header />
          {children}
        </body>
      {/* </I18nextProvider> */}
    </html>
  );
}
