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
      className={`flex justify-center items-center overflow-hidden mb-5 cursor-pointer rounded-md out-view`}
      ref={galleryItemRef}
      onClick={() => openModal(imgIdx)}
    >
      <Image
        src={uri}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover transition duration-500 ease-in-out hover:scale-105"
      />
    </div>
  );
};

export default GalleryItem;
