import Image from 'next/image';
import { useState, useEffect } from 'react';

type ModalProps = {
  closeModal: () => void;
  onPrevImg: (currentIdx:number) => void;
  onNextImg: (currentIdx:number) => void;
  imgIdx: number;
  uri: string;
  alt: string;
  width: number;
  height: number;
};

const opacityTransitionDuration: number = 700;
const closeIconUri = '/gallery-lightbox/cross.svg';
const arrowIconUri = '/gallery-lightbox/arrow.svg';

const Modal: React.FC<ModalProps> = ({
  closeModal,
  onPrevImg,
  onNextImg,
  imgIdx,
  uri,
  alt,
  width,
  height,
}) => {
  const handleClose = () => {
    closeModal();
  };
  console.log(uri);
  
  return (
    <div
      className={`fixed z-50 inset-0 flex justify-between bg-gray-600 bg-opacity-50`}
    >
      <button
        className="fixed aspect-square w-32 right-0 top-0 z-10 bg-[length:40px_40px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${closeIconUri})` }}
        onClick={handleClose}
        aria-label="Close the lightbox"
      >
      </button>
      <button
        className="aspect-square w-32 rotate-180 bg-no-repeat bg-[length:50px_50px] bg-center transition-opacity opacity-60 hover:opacity-100 duration-300  cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => onPrevImg(imgIdx)}
        aria-label="previous image"
      >
      </button>
      <div className="my-8">
        <Image
          className="size-full object-contain"
          src={uri}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      <button
        className="aspect-square w-32 bg-[length:50px_50px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${arrowIconUri})` }}
        onClick={() => onNextImg(imgIdx)}
        aria-label="next image"
      >
      </button>
    </div>
  );
};

export default Modal;
