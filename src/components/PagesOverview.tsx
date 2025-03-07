'use client';

import { homeSectionIds, routes } from '@/config/config.global';
import { ImageProps } from 'next/image';
import GalleryOverview from './GalleryOverview';
import Link from 'next/link';
import Button from './Button';

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
    isLast={i === galleryOverviewData.length - 1}
  />
));

const PagesOverview = () => {
  return (
    <div id={homeSectionIds.secondSection}>
      {galleryOverviewSections}
      <section className="flex flex-col border-t-2 border-primary-600">
        <div className="m-6">
          <h2 className="py-8 max-sm:text-center sm:pl-16 regards text-4xl">
            Qui suis-je ?
          </h2>
          <div className="flex max-sm:flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-20">
            <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[35rem] text-pretty font-bold">
              Dessinatrice près de Bayonne et du pays basque, je crée des
              illustrations jeunesse, fantasy, ainsi que des bandes dessinées.
            </p>
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
      <section className="flex flex-col mt-10 sm:mt-16 lg:mt-20">
        <div className="bg-primary-600">
          <div className="m-6 border border-primary-200">
            <h2 className="py-8 pl-16 regards text-4xl bg-primary-600 text-primary-200">
              Ma boutique en ligne
            </h2>
            <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
          </div>
        </div>
      </section>
      <section className="flex flex-col pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="m-6 py-8 pl-16 regards text-4xl">Me contacter</h2>
        <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
      </section>
    </div>
  );
};

export default PagesOverview;
