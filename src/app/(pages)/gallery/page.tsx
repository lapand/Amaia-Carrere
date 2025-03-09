'use client';

import { useState } from 'react';
import GalleryItem from '../../../components/GalleryItem';
import ModalWithTransition from '../../../components/ModalWithTransition';
import GallerySlider from '../../../components/GallerySlider';
import { draws } from '../../../data/draws';
import { useTranslation } from 'react-i18next';
import { getPrevIdx, getNextIdx } from '../../../utils/getIndex';

const Gallery: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { t } = useTranslation('common');

  const imgAltObj: any = t('gallery.alt', {
    returnObjects: true,
  });

  const openModal = (imgIdx: number) => {
    setIsModalOpened(true);
    setActiveIdx(imgIdx);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };
  const changePrevIdx = () => {
    setActiveIdx(getPrevIdx(draws, activeIdx as number));
  };
  const changeNextIdx = () => {
    setActiveIdx(getNextIdx(draws, activeIdx as number));
  };

  const galleryItems = draws.map((draw, i: number) => (
    <GalleryItem
      key={i}
      imgIdx={i}
      src={draw.src}
      alt={imgAltObj[(i + 1).toString()]}
      width={draw.width}
      height={draw.height}
      // blurDataURL={draw.blurDataURL}
      openModal={openModal}
    />
  ));

  return (
    <div className="flex-1 flex flex-col gap-10 sm:gap-16">
      <div className="relative">
        <h1 className="text-center sm:text-right sm:mr-20 text-primary-600 annie-use-your-telescope thickening-1 text-6.5xl sm:text-7xl 2xl:text-8xl">
          <span className="underline-custom after:h-[0.375rem]">
            &nbsp;Galerie
          </span>
        </h1>
      </div>
      <div className="columns-2 md:columns-3 xl:columns-4 gap-3 lg:gap-5">
        {galleryItems}
      </div>
      <ModalWithTransition visible={isModalOpened} closeModal={closeModal}>
        {activeIdx !== null && (
          <GallerySlider
            activeDraw={{
              ...draws[activeIdx],
              alt: imgAltObj[(activeIdx + 1).toString()],
            }}
            changePrevIdx={changePrevIdx}
            changeNextIdx={changeNextIdx}
          />
        )}
      </ModalWithTransition>
    </div>
  );
};

export default Gallery;
