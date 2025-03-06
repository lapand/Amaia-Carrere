import React, { useState } from 'react';
import Button from './Button';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import removeContextMenu from '@/utils/removeContextMenu';
import { routes } from '@/config/config.global';
import { AnimatePresence, motion } from 'framer-motion';
import { breakpoints } from '@/data/breakpoints';
import useViewportWidth from '@/hooks/useViewportWidth';

type GalleryOverviewProps = {
  title: string;
  images: ImageProps[];
};

const timeToDeroule = 'duration-700';
const externalMargin = 'm-4 sm:m-6';

const GalleryOverview: React.FC<GalleryOverviewProps> = ({ title, images }) => {
  const [activeImg, setActiveImg] = useState<number | null>(null);

  const windowWidth = useViewportWidth();
  const isViewportOverXl = windowWidth >= breakpoints.xl;

  let itemWidth = 6;
  if (windowWidth >= breakpoints.sm) itemWidth = 9;
  if (windowWidth >= breakpoints.md) itemWidth = 12;
  if (windowWidth >= breakpoints.lg) itemWidth = 14;
  let itemGap = 0.5;
  if (windowWidth >= breakpoints.sm) itemGap = 2;
  let hauteurImgDeroulante = 15;
  if (windowWidth >= breakpoints.xs) hauteurImgDeroulante = 18;
  if (windowWidth >= breakpoints.sm) hauteurImgDeroulante = 40;

  const toGalleryBtn = (
    <Link
      href={routes.gallery}
      className="transition-transform duration-300 hover:rotate-1"
    >
      <Button
        className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
        aria-label={`to gallery page`}
      >
        Voir la galerie
      </Button>
    </Link>
  );

  const JSXImages = images.map((img, i: number) => (
    <div
      key={i}
      style={{ width: `${itemWidth}rem`, height: `${itemWidth}rem` }}
      className="bg-primary-600 border border-primary-200 p-3"
    >
      <button
        className="size-full border border-primary-200"
        onClick={() => (activeImg === i ? setActiveImg(null) : setActiveImg(i))}
      >
        <Image
          {...img}
          sizes="(max-width: 1024px) 30vw, 15vw"
          quality={100}
          className={`size-full object-cover ${
            activeImg === i ? '' : 'gray-to-color'
          }`}
          onContextMenu={removeContextMenu}
          // placeholder={placeholder}
          // blurDataURL={blurDataURL}
        />
      </button>
    </div>
  ));

  const JSXBigImages = images.map((img, i: number) => (
    <div
      key={i}
      className={`${timeToDeroule} absolute transition-transform`}
      style={{
        height: `${hauteurImgDeroulante}rem`,
        transform:
          activeImg === i ? '' : `translateY(-${hauteurImgDeroulante}rem)`,
      }}
    >
      <Image
        {...img}
        sizes="(max-width: 640px) 90vw, 80vw"
        quality={100}
        className="size-full object-contain mask-image-x"
        onContextMenu={removeContextMenu}
        // placeholder={placeholder}
        // blurDataURL={blurDataURL}
      />
    </div>
  ));

  return (
    <section className="flex flex-col xl:section-pt">
      <div className="z-10 bg-primary-600">
        <div className={`${externalMargin} border border-primary-200`}>
          <h2 className="py-2 xl:py-8 xl:pl-16 max-xl:text-center regards text-2.5xl sm:text-4xl bg-primary-600 text-primary-200">
            {title}
          </h2>
          <div className="relative h-12 sm:h-32 flex justify-center items-start bg-primary-600">
            <div className="flex flex-col gap-2">
              <div className="h-2">
                <AnimatePresence>
                  {activeImg !== null && (
                    <div
                      className={`h-full place-items-center transition-transform ${timeToDeroule}`}
                      style={{
                        width: `${itemWidth}rem`,
                        transform: `translateX(${
                          activeImg * (itemGap + itemWidth)
                        }rem)`,
                      }}
                    >
                      <motion.div
                        className="h-full w-10 sm:w-16 rounded-full bg-amber-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex" style={{ gap: `${itemGap}rem` }}>
                {JSXImages}
              </div>
            </div>
            {isViewportOverXl && (
              <div className="relative z-10 ml-40">{toGalleryBtn}</div>
            )}
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden flex justify-center">
        {JSXBigImages}
        <div
          className={`transition-all ${timeToDeroule}`}
          style={{
            height: activeImg === null ? 0 : `${hauteurImgDeroulante}rem`,
          }}
        />
      </div>
      <div className="bg-primary-600">
        <div className={`${externalMargin} border-t border-primary-200`} />
      </div>
      {!isViewportOverXl && (
        <div className="h-40 sm:h-60 place-content-center mx-auto">
          {toGalleryBtn}
        </div>
      )}
    </section>
  );
};

export default GalleryOverview;
