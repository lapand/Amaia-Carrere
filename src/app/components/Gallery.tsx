import { useState } from 'react';
import GalleryItem from './GalleryItem';
import ModalWithTransition from './ModalWithTransition';
import GallerySlider from './GallerySlider';
import { draws } from '../data/draws';

const Gallery: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
console.log(draws);

  const openModal = (imgIdx: number) => {
    setIsModalOpened(true);
    setSelectedIdx(imgIdx);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };

  const galleryItems = draws.map((draw, i: number) => (
    <GalleryItem
      key={i}
      imgIdx={i}
      src={draw.src}
      alt={draw.alt}
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
        {selectedIdx !== null && <GallerySlider selectedIdx={selectedIdx} />}
      </ModalWithTransition>
    </div>
  );
};

export default Gallery;
