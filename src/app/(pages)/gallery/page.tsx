'use client';

import { useState } from 'react';
import GalleryItem from '../../../components/GalleryItem';
import ModalWithTransition from '../../../components/ModalWithTransition';
import GallerySlider from '../../../components/GallerySlider';
import { draws } from '../../../data/draws';
import { useTranslation } from 'react-i18next';
import { getPrevIdx, getNextIdx } from '../../../utils/getIndex';
import ScrollProgressBtn from '../../../components/ScrollProgressBtn';
import { AnimatePresence } from 'framer-motion';
import usePageScrolling from '../../../hooks/usePageScrolling';

const Gallery: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { t } = useTranslation('common');
  const isPageScrolling = usePageScrolling(200);

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
    <div className='flex-1 flex flex-col'>
      <div className='flex-1 flex flex-col gap-24'>
        <h1 className="text-7xl sm:licorice-font sm:thickening text-right">
          Galerie
        </h1>
        <div className="columns-2 lg:columns-3 gap-4 sm:gap-5">
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
      <AnimatePresence>
        {isPageScrolling && (
          <ScrollProgressBtn className="fixed z-30 bottom-10 right-10" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
