import { ReactNode } from 'react';
import Fade from './Fade';

type ModalProps = {
  closeModal: () => void;
  children: ReactNode;
  visible: boolean,
  duration?: number,
};

const closeIconUri = '/pencil-cross.png';

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
          className="fixed aspect-square w-32 lg:w-44 right-0 top-0 z-10 bg-28% bg-no-repeat bg-center transition-transform hover:scale-90 hover:rotate-180 duration-300 cursor-pointer"
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
