'use client';

import { useState } from 'react';
import GalleryItem from '../../../components/GalleryItem';
import ModalWithTransition from '../../../components/ModalWithTransition';
import GallerySlider from '../../../components/GallerySlider';
import { FormattedImage } from '@/types';

type GalleryClientProps = {
  images: FormattedImage[] | null;
};

const GalleryClient: React.FC<GalleryClientProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
console.log(images);

  const openModal = (imgIdx: number) => {
    setActiveIdx(imgIdx);
  };
  const closeModal = () => {
    setActiveIdx(null);
  };

  const galleryItems =
    images === null
      ? null
      : images.map((img, i: number) => (
          <GalleryItem key={i} image={img} imgIdx={i} openModal={openModal} />
        ));

  return (
    <div className="flex-1 flex flex-col items-center gap-10 sm:gap-16">
      <div className="relative">
        <h1 className="text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl">
          <span className="inline-block underline-custom after:h-[0.28rem] after:bottom-2 2xl:after:bottom-3">
            Galerie
          </span>
        </h1>
      </div>
      <div className="lg:w-[55rem] xl:w-[75rem] 2xl:w-[80rem] 3xl:w-[90rem] columns-2 md:columns-3 xl:columns-4 gap-3 lg:gap-5">
        {galleryItems}
      </div>
      <ModalWithTransition visible={activeIdx !== null} closeModal={closeModal}>
        {activeIdx !== null && images !== null && (
          <GallerySlider images={images} imgIdx={activeIdx} />
        )}
      </ModalWithTransition>
    </div>
  );
};

export default GalleryClient;
