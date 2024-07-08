import { ReactNode } from 'react';
import Fade from './Fade';

type ModalProps = {
  closeModal: () => void;
  children: ReactNode;
  visible: boolean,
  duration?: number,
};

const closeIconUri = '/gallery-lightbox/cross.svg';

const ModalWithTransition: React.FC<ModalProps> = ({
  children,
  closeModal,
  visible,
  duration,
}) => {
  const handleClose = () => {
    closeModal();
  };

  return (
    <Fade
      className="fixed z-50 inset-0"
      visible={visible}
      duration={duration}
    >
      <div className={`h-full bg-gray-600 bg-opacity-80`}>
        <button
          className="fixed aspect-square w-32 right-0 top-0 z-10 bg-[length:40px_40px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
          style={{ backgroundImage: `url(${closeIconUri})` }}
          onClick={handleClose}
          aria-label="Close the lightbox"
        ></button>
        {children}
      </div>
    </Fade>
  );
};

export default ModalWithTransition;
