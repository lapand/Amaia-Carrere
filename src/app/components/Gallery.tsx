import { useState } from 'react';
import GalleryItem from './GalleryItem';
import ModalWithTransition from './ModalWithTransition';
import GallerySlider from './GallerySlider';
import { draws } from '../data/draws';
import { useTranslation } from 'react-i18next';
import { getPrevIdx, getNextIdx } from '../modules/utils/getIndex';
import usePreloadImages from '../hooks/usePreloadImages';

const Gallery: React.FC = () => {
  usePreloadImages(draws.map((o) => o.src));
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { t } = useTranslation('common');

  const imgAltObj: { [key: string]: string } = t('gallery.alt', {
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
  }
  const changeNextIdx = () => {
    setActiveIdx(getNextIdx(draws, activeIdx as number));
  }

  const galleryItems = draws.map((draw, i: number) => (
    <GalleryItem
      key={i}
      imgIdx={i}
      src={draw.src}
      alt={imgAltObj[(i + 1).toString()]}
      width={draw.width}
      height={draw.height}
      openModal={openModal}
    />
  ));

  return (
    <div className="">
      {/* <h2 className="londrina-shadow text-4xl m-8">Galerie</h2> */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 my-20 mx-5 sm:mx-8 lg:mx-14 xl:mx-[15%]">
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
