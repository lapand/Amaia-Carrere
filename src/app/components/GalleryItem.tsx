import Image from 'next/image';
import { useEffect, useRef } from 'react';

type GalleryItemProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  openModal: (imgIdx:number) => void;
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
      className={`out-view flex justify-center items-center overflow-hidden bg-black mb-5 cursor-pointer rounded-md after:absolute after:pointer-events-none after:text-white after:luckiest-guy after:text-xl hover:after:content-["OUVRIR"]`}
      ref={galleryItemRef}
      onClick={() => openModal(imgIdx)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover transition duration-500 ease-in-out hover:scale-105 hover:opacity-60"
      />
    </div>
  );
};

export default GalleryItem;
