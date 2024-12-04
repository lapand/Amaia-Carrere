import { RefObject, useEffect, useRef } from 'react';

/**
 * Hook qui gère le focus dans une modale en empêchant de sortir
 * de celle-ci en utilisant la touche "Tab". Il place le focus
 * sur un élément initial lors de l'ouverture de la modale.
 *
 * @param {boolean} isOpen - Indique si la modale est ouverte.
 * @param {RefObject<HTMLElement>} initialRef - Référence à l'élément
 *         sur lequel le focus doit être placé à l'ouverture de la modale.
 * @returns {RefObject<HTMLDivElement>} - Référence à l'élément
 *         de la modale pour le focus trap.
 */
const useFocusTrap = (
  isOpen: boolean,
  initialRef: RefObject<HTMLElement>
): RefObject<HTMLDivElement> => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Met le focus sur l'élément initial
    initialRef.current?.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, initialRef]);

  return modalRef;
};

export default useFocusTrap;
