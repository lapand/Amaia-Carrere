import React, { useState } from 'react';
import Button from './Button';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import removeContextMenu from '@/utils/removeContextMenu';
import { routes } from '@/config/config.global';

type GalleryOverviewProps = {
  title: string;
  images: ImageProps[];
};

const GalleryOverview: React.FC<GalleryOverviewProps> = ({ title, images }) => {
  const [activeImg, setActiveImg] = useState<number | null>(null);

  const JSXImages = images.map((img, i: number) => (
    <div className="size-56 bg-primary-600 border border-primary-200 p-3">
      <button
        className="size-full border border-primary-200"
        onClick={() => setActiveImg(i)}
      >
        <Image
          key={i}
          {...img}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
          quality={100}
          className="size-full object-cover gray-to-color"
          onContextMenu={removeContextMenu}
          // placeholder={placeholder}
          // blurDataURL={blurDataURL}
        />
      </button>
    </div>
  ));

  return (
    <section className="flex flex-col section-pt">
      <div className="bg-primary-600">
        <div className="m-6 border border-primary-200">
          <h2 className="py-8 pl-16 regards text-4xl bg-primary-600 text-primary-200">
            {title}
          </h2>
          <div className="h-32 flex justify-center items-start gap-40 bg-primary-600">
            <div className="flex gap-8">{JSXImages}</div>
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
      <div>
        {activeImg && (
          <Image
            {...images[activeImg]}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
            quality={100}
            className="size-full object-cover gray-to-color"
            onContextMenu={removeContextMenu}
            // placeholder={placeholder}
            // blurDataURL={blurDataURL}
          />
        )}
      </div>
    </section>
  );
};

export default GalleryOverview;
