'use client';

import { useState } from 'react';
import GalleryItem from '../components/GalleryItem';
import ModalWithTransition from '../components/ModalWithTransition';
import GallerySlider from '../components/GallerySlider';
import { draws } from '../data/draws';
import { useTranslation } from 'react-i18next';
import { getPrevIdx, getNextIdx } from '../modules/utils/getIndex';
import Section from '../components/Section';

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
    <Section className="min-h-screen" id="gallery">
      {/* <h2 className="londrina-shadow text-4xl m-8">Galerie</h2> */}
      <div className="columns-2 lg:columns-3 gap-4 sm:gap-5 my-20 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%] 2xl:mx-[20%]">
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
    </Section>
  );
};

export default Gallery;
