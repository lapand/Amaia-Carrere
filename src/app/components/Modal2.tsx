import { ReactNode, useCallback, useEffect, useRef } from 'react';
import useDisableBodyScroll from '../hooks/useDisableBodyScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Trans } from 'react-i18next';
import useFocusTrap from '../hooks/useFocusTrap';

type ModalProps = {
  isOpen: boolean;
  duration: number;
  closeModal: () => void;
  children: ReactNode;
  width?: string;
  itemKey?: number | null;
  bgColor: string;
  className?: string;
};

const closeIconUri = '/cross.svg';

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  className,
  width = 'w-full',
  itemKey,
  bgColor,
  duration = 500,
  isOpen,
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef(null);
  const modalRef = useFocusTrap(isOpen, closeButtonRef);
  useDisableBodyScroll(isOpen, duration);

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        childRef.current &&
        !childRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    isOpen && document.addEventListener('click', handleClickOutside);

    return () => {
      isOpen && document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 1000 }}
          className={`fixed z-50 inset-0 flex justify-center items-center bg-gray-600 bg-opacity-80`}
        >
          <button
            ref={closeButtonRef}
            className="fixed aspect-square w-32 lg:w-44 right-0 top-0 z-10 bg-28% bg-no-repeat bg-center transition-transform hover:scale-90 hover:rotate-180 duration-300 cursor-pointer"
            style={{ backgroundImage: `url(${closeIconUri})` }}
            onClick={handleClose}
            aria-label="Close the modal"
          />
          <div
            className={`${width} h-4/5 flex flex-col items-center justify-center gap-2`}
          >
            {itemKey !== null && (
              <h3
                className="self-start text-[22px] font-bold text-surface-100 p-2 pr-24 rounded-l"
                style={{
                  backgroundImage: `linear-gradient(to right, rgb(${bgColor}), rgba(${bgColor} / 0))`,
                }}
              >
                <Trans
                  i18nKey={`common:myApproach.items.${itemKey}.title`}
                  components={{ break: <br /> }}
                />
              </h3>
            )}
            <motion.div
              ref={childRef}
              className={`max-h-full overflow-auto sm:pr-6 ${className}`}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              }}
              exit={{ scale: 0 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
