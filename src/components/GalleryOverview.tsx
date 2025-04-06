import React, { useState } from 'react';
import Button from './Button';
import Link from 'next/link';
import Image from 'next/image';
import removeContextMenu from '@/utils/removeContextMenu';
import { routes } from '@/config/config.global';
import { breakpoints } from '@/data/breakpoints';
import useViewportWidth from '@/hooks/useViewportWidth';
import { FormattedImage } from '@/types';

type GalleryOverviewProps = {
  title: string;
  images: FormattedImage[];
  colorTheme?: 'light' | 'dark';
  isLast?: boolean;
};

const timeToDeroule = 'duration-700';
const externalMargin = 'm-4 sm:m-6';

const toGalleryBtn = (
  <Link
    href={routes.gallery}
    className="transition-transform duration-300 hover:rotate-1"
  >
    <Button
      className="px-6 py-3 luckiest-guy text-lg"
      aria-label={`to gallery page`}
    >
      Voir la galerie
    </Button>
  </Link>
);

const GalleryOverview: React.FC<GalleryOverviewProps> = ({
  title,
  images,
  colorTheme = 'dark',
  isLast = false,
}) => {
  const [activeImg, setActiveImg] = useState<number | null>(null);
  const windowWidth = useViewportWidth();
  const isViewportOverXl = windowWidth >= breakpoints.xl;

  let hauteurImgDeroulante = 15;
  if (windowWidth >= breakpoints.xs) hauteurImgDeroulante = 18;
  if (windowWidth >= breakpoints.sm) hauteurImgDeroulante = 40;

  const colors = {
    bg: colorTheme === 'light' ? '' : 'bg-primary-600',
    text: colorTheme === 'light' ? 'text-primary-600' : 'text-primary-200',
    border:
      colorTheme === 'light' ? 'border-primary-600' : 'border-primary-200',
  };

  const JSXImages = images.map((img, i: number) => {
    const { src, alt, width, height, formats } = img;

    return (
      <div
        key={i}
        className={`${colors.border} ${
          colorTheme === 'light' ? 'border-2' : 'border'
        } ${colorTheme === 'light' ? 'bg-amber-50' : colors.bg} ${
          activeImg === i
            ? 'before:bg-aubergine-400'
            : 'before:bg-aubergine-500'
        } relative size-24 xs:size-[6.5rem] sm:size-40 md:size-48 lg:size-56 before:duration-300 p-1 xs:p-2 sm:p-3 before:content-[''] before:absolute before:size-4 sm:before:size-6 xl:before:size-5 before:bottom-full before:left-full before:-translate-x-1/2 before:translate-y-1/2 before:border before:border-aubergine-300 before:rounded-full before:transition-colors before:z-[-1] hover:before:bg-aubergine-400`}
      >
        <button
          className={`${colors.border} size-full border`}
          onClick={() =>
            activeImg === i ? setActiveImg(null) : setActiveImg(i)
          }
        >
          <Image
            className={`size-full object-cover ${
              activeImg === i ? '' : 'gray-to-color'
            }`}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 1024px) 30vw, 15vw"
            quality={100}
            placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
            blurDataURL={formats?.thumbnail?.url}
            onContextMenu={removeContextMenu}
          />
        </button>
      </div>
    );
  });

  const JSXBigImages = images.map((img, i: number) => {
    const { src, alt, width, height, formats } = img;

    return (
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
          className="size-full object-contain mask-image-x"
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 640px) 90vw, 80vw"
          quality={100}
          placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
          blurDataURL={formats?.thumbnail?.url}
          onContextMenu={removeContextMenu}
        />
      </div>
    );
  });

  return (
    <section className={`flex flex-col`}>
      <div className={`${colors.bg} z-10`}>
        <div
          className={`${externalMargin} ${colors.border} ${
            colorTheme === 'light' ? 'border-2' : 'border'
          } flex flex-col sm:gap-6`}
        >
          <h2
            className={`${colors.text} py-4 xl:py-8 text-center regards text-3.5xl sm:text-4xl`}
          >
            {title}
          </h2>
          <div className="relative h-10 xs:h-12 sm:h-16 md:h-20 lg:h-32 flex justify-center items-start">
            <div className="flex gap-4 sm:gap-8">{JSXImages}</div>
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
      <div className={`${colors.bg}`}>
        <div
          className={`${externalMargin} ${colors.border} ${
            colorTheme === 'light' ? 'border-t-2' : 'border-t'
          }`}
        />
      </div>
      {!isViewportOverXl && !isLast && (
        <div className="mt-20 sm:mt-32 mb-2 xs:mb-6 sm:mb-8 place-content-center mx-auto">
          {toGalleryBtn}
        </div>
      )}
    </section>
  );
};

export default GalleryOverview;
