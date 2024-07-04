import { useState } from 'react';
import GalleryItem from './GalleryItem';
import Modal from './Modal';
import GallerySlider from './GallerySlider';
import { getPrevIdx, getNextIdx } from '../modules/array-utils/getIndex';

export type DrawType = {
  uri: string;
  alt: string;
  width: number;
  height: number;
  colSpan: 1 | 2;
};

const draws: DrawType[] = [
  {
    uri: '/gallery/xilaba-mendiak-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/xilaba-dantz-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/maggy-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/histoire-bd-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 1,
  },
  {
    uri: '/gallery/11chewal-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 1,
  },
  {
    uri: '/gallery/chat-fee-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/temple-carpe-koi-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/argaihizkia-affiche-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/amitie-lapin-paon-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/oeil-dragon-bleu-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
  {
    uri: '/gallery/quetzacoaltl-m.jpg',
    alt: '',
    width: 850,
    height: 850,
    colSpan: 2,
  },
];

const Gallery: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openModal = (imgIdx: number) => {
    setIsModalOpened(true);
    setActiveIdx(imgIdx);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };
  const onPrevImg = (currentIdx: number) => {
    setActiveIdx(getPrevIdx(draws, currentIdx));
  };
  const onNextImg = (currentIdx: number) => {
    setActiveIdx(getNextIdx(draws, currentIdx));
  };

  const galleryItems = draws.map((draw, i: number) => (
    <GalleryItem
      key={i}
      imgIdx={i}
      uri={draw.uri}
      alt={draw.alt}
      width={draw.width}
      height={draw.height}
      colSpan={draw.colSpan}
      openModal={openModal}
    />
  ));

  return (
    <div className="">
      {/* <h2 className="londrina-shadow text-4xl m-8">Galerie</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-12 my-20 mx-5 sm:mx-8 lg:mx-14 xl:mx-24 2xl:mx-72">
        {galleryItems}
      </div>
      {isModalOpened && (
        <Modal closeModal={closeModal}>
          {activeIdx !== null && (
            <GallerySlider
              onPrevImg={onPrevImg}
              onNextImg={onNextImg}
              imgIdx={activeIdx}
              {...draws[activeIdx]}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
