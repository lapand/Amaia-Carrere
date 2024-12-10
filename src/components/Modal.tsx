import { ReactNode } from 'react';

type ModalProps = {
  closeModal: () => void;
  children: ReactNode;
};

const closeIconUri = '/cross.svg';

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
}) => {
  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={`fixed z-50 inset-0 bg-gray-600 bg-opacity-80`}>
      <button
        className="fixed aspect-square w-32 right-0 top-0 z-10 bg-[length:40px_40px] bg-no-repeat bg-center transition-opacity opacity-60 hover:opacity-100 duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${closeIconUri})` }}
        onClick={handleClose}
        aria-label="Close the lightbox"
      ></button>
      {children}
    </div>
  );
};

export default Modal;
