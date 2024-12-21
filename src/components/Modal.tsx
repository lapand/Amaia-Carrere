import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFocusTrap from '../hooks/useFocusTrap';
import Button from './Button';
import useDisableBodyScroll from '@/hooks/useDisableBodyScroll';

/**
 * Props du composant Modal
 * @typedef {object} ModalProps
 * @property {boolean} isOpen - Indique si la modale est ouverte.
 * @property {number} [duration=500] - Durée de l'animation d'ouverture/fermeture (en ms).
 * @property {() => void} closeModal - Fonction appelée pour fermer la modale.
 * @property {ReactNode} [children] - Contenu principal à afficher dans la modale.
 * @property {string} [className] - Classes CSS supplémentaires pour personnaliser le contenu.
 * @property {object} [closeBtn] - Configuration du bouton de fermeture.
 * @property {boolean} [closeBtn.show=true] - Affiche ou masque le bouton de fermeture.
 * @property {string} [closeBtn.imgSrc] - URL de l'image pour personnaliser le bouton de fermeture.
 * @property {boolean} [isWindowScrollDisabled=false] - Désactive le défilement de la page lorsque la modale est ouverte.
 * @property {boolean} [isClickOutsideActive=false] - Ferme la modale lorsque l'utilisateur clique en dehors de son contenu.
 */
type ModalProps = {
  isOpen: boolean;
  duration?: number;
  closeModal: () => void;
  children?: ReactNode;
  className?: string;
  closeBtn?: {
    show: boolean;
    imgSrc?: string;
  };
  isWindowScrollDisabled?: boolean;
  isClickOutsideActive?: boolean;
};

/**
 * Composant Modal
 * Ce composant affiche une fenêtre modale animée au-dessus du contenu principal.
 * Il inclut des fonctionnalités comme :
 * - Animation via Framer Motion.
 * - Désactivation du défilement de la page.
 * - Gestion du focus pour l'accessibilité.
 * - Fermeture via un bouton ou un clic en dehors.
 */

const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  className,
  duration = 500,
  isOpen,
  closeBtn = {
    show: true,
    imgSrc: '',
  },
  isWindowScrollDisabled = false,
  isClickOutsideActive = false,
}) => {
  // Références pour la gestion du focus
  const closeButtonRef = useRef(null);
  const validationBtnRef = useRef(null);

  // Utilisation d'un hook pour gérer le focus lors de l'ouverture de la modale
  const modalRef = useFocusTrap(isOpen, validationBtnRef);

  // Référence pour la gestion du contenu
  const contentRef = useRef<HTMLDivElement>(null);

  // Désactive le défilement de la page si la modale est ouverte
  isWindowScrollDisabled && useDisableBodyScroll(isOpen, duration);

  // Gestion de la fermeture de la modale
  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  // Ferme la modale lorsqu'un clic est effectué en dehors de son contenu
  useEffect(() => {
    if (isClickOutsideActive) {
      const handleClickOutside = (event: Event) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      isOpen && document.addEventListener('click', handleClickOutside);

      return () => {
        isOpen && document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isClickOutsideActive, isOpen, handleClose]);

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
          <div
            ref={contentRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-5/6 lg:w-1/2 3xl:w-[800px] flex flex-col items-center justify-center gap-6 sm:gap-8 py-6 px-4 sm:px-8 bg-slate-200 border border-slate-800 rounded-md"
          >
            {/* Contenu principal de la modale */}
            <motion.div
              className={`max-h-56 overflow-auto ${className}`}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              }}
              exit={{ scale: 0 }}
            >
              {children}
            </motion.div>

            {/* Bouton de validation */}
            <div ref={validationBtnRef}>
              <Button
                className="max-lg:text-lg py-[6px] px-8"
                onClick={handleClose}
              >
                Valider
              </Button>
            </div>

            {/* Bouton de fermeture */}
            {closeBtn.show && (
              <button
                ref={closeButtonRef}
                className="absolute right-0 top-0 z-10 aspect-square w-10 bg-[length:50%_50%] bg-no-repeat bg-center transition-transform hover:scale-90 hover:rotate-180 duration-300 cursor-pointer"
                style={{
                  backgroundImage: `${
                    closeBtn.imgSrc ? `url(${closeBtn.imgSrc})` : 'none'
                  }`,
                }}
                onClick={handleClose}
                aria-label="Close the modal"
              >
                {!closeBtn.imgSrc && 'X'}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
