import Image from 'next/image';
import { useEffect, useRef } from 'react';

type GalleryItemProps = {
  uri: string;
  alt: string;
  width: number;
  height: number;
  colSpan: 1 | 2;
  openModal: (imgIdx:number) => void;
  imgIdx: number;
};

const GalleryItem: React.FC<GalleryItemProps> = ({
  uri,
  alt,
  width,
  height,
  colSpan,
  openModal,
  imgIdx,
}) => {
  const galleryItemRef = useRef<HTMLDivElement | null>();

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      if (galleryItemRef.current && entries[0].isIntersecting) {
        galleryItemRef.current.classList.add('in-view');
        observer.unobserve(galleryItemRef.current);
      }
    }, {threshold: .2});

    if (galleryItemRef.current) {
      observer.observe(galleryItemRef.current);
    }
  }, []);

  return (
    <div
      className={`${
        colSpan === 2 ? 'col-span-2' : 'col-span-1'
      } flex justify-center items-center cursor-pointer overflow-hidden out-view`}
      ref={galleryItemRef}
      onClick={() => openModal(imgIdx)}
    >
      <Image
        src={uri}
        alt={alt}
        width={width}
        height={height}
        className="size-full object-contain transition-transform duration-400 hover:scale-105 grayscale hover:grayscale-0"
      />
    </div>
  );
};

export default GalleryItem;
