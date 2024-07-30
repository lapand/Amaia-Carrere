'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import removeContextMenu from '../modules/utils/removeContextMenu';

type GalleryItemProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  openModal: (imgIdx: number) => void;
  imgIdx: number;
};

const GalleryItem: React.FC<GalleryItemProps> = ({
  src,
  alt,
  width,
  height,
  openModal,
  imgIdx,
}) => {
  const galleryItemRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (galleryItemRef.current && entries[0].isIntersecting) {
          galleryItemRef.current.classList.add('in-view');
          observer.unobserve(galleryItemRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (galleryItemRef.current) {
      observer.observe(galleryItemRef.current);
    }
  }, []);

  return (
    <div
      className={`out-view translate-y-40 relative flex justify-center items-center overflow-hidden bg-black mb-5 cursor-pointer rounded-md after:absolute after:pointer-events-none after:text-white after:luckiest-guy after:text-xl hover:after:content-["OUVRIR"]`}
      ref={galleryItemRef}
      onClick={() => openModal(imgIdx)}
    >
      {isLoading && <Loader />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 25vw"
        quality={100}
        className="w-full h-auto object-cover transition duration-500 ease-in-out hover:scale-105 hover:opacity-60"
        onLoad={() => setIsLoading(false)}
        onContextMenu={removeContextMenu}
        // placeholder="blur"
        // blurDataURL={`${src}.blurDataURL`}
      />
    </div>
  );
};

export default GalleryItem;
