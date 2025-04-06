'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import removeContextMenu from '../utils/removeContextMenu';
import { FormattedImage } from '@/types';

type GalleryItemProps = {
  image: FormattedImage;
  openModal: (imgIdx: number) => void;
  imgIdx: number;
};

const GalleryItem: React.FC<GalleryItemProps> = ({
  image,
  openModal,
  imgIdx,
}) => {
  const galleryItemRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { src, alt, width, height, formats } = image;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (galleryItemRef.current && entries[0].isIntersecting) {
          galleryItemRef.current.classList.add('in-view');
          observer.unobserve(galleryItemRef.current);
        }
      },
      { threshold: 0 }
    );

    if (galleryItemRef.current) {
      observer.observe(galleryItemRef.current);
    }
  }, []);

  return (
    <div
      className={`relative flex justify-center items-center overflow-hidden out-view translate-y-40 bg-black mb-3 lg:mb-5 cursor-pointer rounded-md after:absolute after:pointer-events-none after:text-white after:luckiest-guy after:text-xl hover:after:content-["OUVRIR"]`}
      ref={galleryItemRef}
      onClick={() => openModal(imgIdx)}
    >
      {isLoading && <Loader />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 30vw, 20vw"
        quality={100}
        className="w-full h-auto object-cover transition duration-500 ease-in-out hover:scale-105 hover:opacity-60"
        onLoad={() => setIsLoading(false)}
        onContextMenu={removeContextMenu}
        placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
        blurDataURL={formats?.thumbnail?.url}
      />
    </div>
  );
};

export default GalleryItem;
