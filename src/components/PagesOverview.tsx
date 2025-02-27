'use client';

import { homeSectionIds } from '@/config/config.global';
import removeContextMenu from '@/utils/removeContextMenu';
import Image from 'next/image';

const PagesOverview = () => {
  return (
    <div>
      <section
        id={homeSectionIds.secondSection}
        className="flex flex-col section-pt pb-10 xl:pb-12 3xl:pb-16"
      >
        <h2 className="mb-10 py-4 pl-16 regards text-4xl">
          Illustratrice Jeunesse
        </h2>
        <div className="flex max-sm:flex-col max-sm:items-center sm:justify-center gap-8">
          <div className="size-96 bg-primary-200 border border-primary-600 p-3">
            <div className="size-full border border-primary-600">
              <Image
                src={'/gallery/19.webp'}
                alt={'test'}
                width={2500}
                height={2350}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                quality={100}
                className="size-full object-cover"
                onContextMenu={removeContextMenu}
                // placeholder={placeholder}
                // blurDataURL={blurDataURL}
              />
            </div>
          </div>
          <div className="size-96 bg-primary-200 border border-primary-600 p-3">
            <div className="size-full border border-primary-600">
              {' '}
              <Image
                src={'/gallery/20.webp'}
                alt={'test'}
                width={2500}
                height={2350}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                quality={100}
                className="size-full object-cover"
                onContextMenu={removeContextMenu}
                // placeholder={placeholder}
                // blurDataURL={blurDataURL}
              />
            </div>
          </div>
          <div className="size-96 bg-primary-200 border border-primary-600 p-3">
            <div className="size-full border border-primary-600">
              {' '}
              <Image
                src={'/gallery/26.webp'}
                alt={'test'}
                width={2500}
                height={2350}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                quality={100}
                className="size-full object-cover"
                onContextMenu={removeContextMenu}
                // placeholder={placeholder}
                // blurDataURL={blurDataURL}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16 regards text-4xl">Bande dessinée</h2>
        <div className="flex flex-col items-center gap-5"></div>
      </section>
      <section className="pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16 regards text-4xl">Fantasy</h2>
        <div className="flex flex-col items-center gap-5"></div>
      </section>
      <section className="flex flex-col bg-primary-600 text-primary-200">
        <div className="m-6 border border-primary-200 pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
          <h2 className="mb-10 py-4 pl-16 regards text-4xl">Qui suis-je ?</h2>
          <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
        </div>
      </section>
      <section className="flex flex-col pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16 regards text-4xl">
          Découvrez ma boutique en ligne
        </h2>
        <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
      </section>
      <section className="flex flex-col pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16"></h2>
        <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
      </section>
    </div>
  );
};

export default PagesOverview;
