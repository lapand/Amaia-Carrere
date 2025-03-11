'use client';

import { homeSectionIds, routes } from '@/config/config.global';
import { ImageProps } from 'next/image';
import GalleryOverview from './GalleryOverview';
import Link from 'next/link';
import Button from './Button';
import ContactForm from './Form';

const galleryOverviewData: { title: string; images: ImageProps[] }[] = [
  {
    title: 'Illustration Jeunesse',
    images: [
      {
        src: '/gallery/19.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
      {
        src: '/gallery/20.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
      {
        src: '/gallery/26.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
    ],
  },
  {
    title: 'Bande dessinée',
    images: [
      {
        src: '/gallery/19.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
      {
        src: '/gallery/20.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
      {
        src: '/gallery/26.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
    ],
  },
  {
    title: 'Fantasy',
    images: [
      {
        src: '/gallery/19.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
      {
        src: '/gallery/20.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
      {
        src: '/gallery/26.webp',
        alt: 'test',
        width: 2500,
        height: 2350,
      },
    ],
  },
];

const galleryOverviewSections = galleryOverviewData.map((obj, i: number) => (
  <GalleryOverview
    key={i}
    title={obj.title}
    images={obj.images}
    isFirst={i === 0}
    isLast={i === galleryOverviewData.length - 1}
  />
));

const PagesOverview = () => {
  return (
    <div>
      {galleryOverviewSections}
      <section className="flex flex-col m-6">
        <h2 className="py-8 max-sm:text-center sm:pl-16 regards text-4xl">
          Qui suis-je ?
        </h2>
        <div className="flex max-sm:flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-20">
          <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] text-pretty annie-use-your-telescope text-3xl font-bold">
            Dessinatrice près de Bayonne et du pays basque, je crée des
            illustrations jeunesse, fantasy, ainsi que des bandes dessinées.
          </p>
          <div className="w-full sm:w-[450px] lg:w-[400px] 2xl:w-[450px] flex justify-center">
            <Link
              href={routes.gallery}
              className="transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                aria-label={`to gallery page`}
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col mt-10 sm:mt-16 lg:mt-20 text-primary-200">
        <div className="bg-primary-600">
          <div className="m-6 border border-primary-200">
            <h2 className="py-8 sm:pl-16 max-sm:text-center regards text-4xl">
              Ma boutique en ligne
            </h2>
            <div className="h-12 sm:h-32 flex max-sm:flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-20">
              <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] annie-use-your-telescope text-3xl font-bold">
                Découvrez mes articles en vente ici =&gt;
              </p>
              <div className="ml-40">
                <Link
                  href={routes.shop}
                  className="transition-transform duration-300 hover:rotate-1"
                >
                  <Button
                    className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                    aria-label={`to shop page`}
                  >
                    Voir les produits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="m-6 py-8 pl-16 regards text-4xl">Me contacter</h2>
        <div className="flex max-sm:flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-20">
          <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] annie-use-your-telescope text-3xl font-bold">
            Si vous êtes intéressés par des projets d'illustrations, vous pouvez
            m'en faire part via le formulaire de contact.
            <br />
            <br />
            N'hésitez pas à m'écrire pour une précision sur les produits en
            vente dans la section boutique.
            <br />
            <br />
            Suite à un achat via la boutique en ligne, les produits ne sont ni
            échangés, ni remboursés.
            <br />
            Pour toute réclamation, je vous invite également à me contacter via
            le formulaire ci-joint.
          </p>
          <div className="w-full sm:w-[450px] lg:w-[400px] 2xl:w-[450px]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PagesOverview;
