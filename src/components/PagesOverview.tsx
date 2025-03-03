'use client';

import { homeSectionIds, routes } from '@/config/config.global';
import removeContextMenu from '@/utils/removeContextMenu';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

const PagesOverview = () => {
  return (
    <div>
      <section
        id={homeSectionIds.secondSection}
        className="flex flex-col section-pt pb-10 xl:pb-12 3xl:pb-16"
      >
        <div className="bg-primary-600">
          <div className="m-6 border border-primary-200">
            <h2 className="py-8 pl-16 regards text-4xl bg-primary-600 text-primary-200">
              Illustratrice Jeunesse
            </h2>
            <div className="h-32 flex justify-center items-start gap-40 bg-primary-600">
              <div className="flex gap-8">
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/19.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/20.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/26.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
              </div>
              <Link
                href={routes.gallery}
                className="relative z-10 transition-transform duration-300 hover:rotate-1"
              >
                <Button
                  className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                  aria-label={`to gallery page`}
                >
                  Voir la galerie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col section-pt pb-10 xl:pb-12 3xl:pb-16">
        <div className="bg-primary-600">
          <div className="m-6 border border-primary-200">
            <h2 className="py-8 pl-16 regards text-4xl bg-primary-600 text-primary-200">
              Bande dessinée
            </h2>
            <div className="h-32 flex justify-center items-start gap-40 bg-primary-600">
              <div className="flex gap-8">
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/19.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/20.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/26.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
              </div>
              <Link
                href={routes.gallery}
                className="relative z-10 transition-transform duration-300 hover:rotate-1"
              >
                <Button
                  className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                  aria-label={`to gallery page`}
                >
                  Voir la galerie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col section-pt pb-10 xl:pb-12 3xl:pb-16">
        <div className="bg-primary-600">
          <div className="m-6 border border-primary-200">
            <h2 className="py-8 pl-16 regards text-4xl bg-primary-600 text-primary-200">
              Fantasy
            </h2>
            <div className="h-32 flex justify-center items-start gap-40 bg-primary-600">
              <div className="flex gap-8">
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/19.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/20.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
                <div className="size-56 bg-primary-600 border border-primary-200 p-3">
                  <div className="size-full border border-primary-200">
                    <Image
                      src={'/gallery/26.webp'}
                      alt={'test'}
                      width={2500}
                      height={2350}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
                      quality={100}
                      className="size-full object-cover gray-to-color"
                      onContextMenu={removeContextMenu}
                      // placeholder={placeholder}
                      // blurDataURL={blurDataURL}
                    />
                  </div>
                </div>
              </div>
              <Link
                href={routes.gallery}
                className="relative z-10 transition-transform duration-300 hover:rotate-1"
              >
                <Button
                  className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                  aria-label={`to gallery page`}
                >
                  Voir la galerie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
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
