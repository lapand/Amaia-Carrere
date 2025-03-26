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
    <div className="flex-1 flex flex-col gap-10 sm:gap-16">
      <div className="relative">
        <h1 className="text-center sm:text-right sm:mr-20 text-primary-600 annie-use-your-telescope thickening-1 text-6.5xl sm:text-7xl 2xl:text-8xl">
          <span className="underline-custom after:h-[0.325rem] after:bottom-4">Galerie</span>
        </h1>
      </div>
      <div className="columns-2 md:columns-3 xl:columns-4 gap-3 lg:gap-5">
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
