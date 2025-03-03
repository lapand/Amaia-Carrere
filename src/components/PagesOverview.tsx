'use client';

import { homeSectionIds } from '@/config/config.global';
import { ImageProps } from 'next/image';
import GalleryOverview from './GalleryOverview';

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
  <GalleryOverview key={i} title={obj.title} images={obj.images} />
));

const PagesOverview = () => {
  return (
    <div id={homeSectionIds.secondSection}>
      {galleryOverviewSections}
      <section className="flex flex-col section-pt">
        <div className="bg-primary-600">
          <div className="m-6 border-t border-primary-200" />
        </div>
        <div className="m-6 border border-primary-200">
          <h2 className="py-8 pl-16 regards text-4xl">Qui suis-je ?</h2>
          <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
        </div>
      </section>
      <section className="flex flex-col section-pt">
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
