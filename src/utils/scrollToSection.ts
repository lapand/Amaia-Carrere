import { MouseEvent } from 'react';

const scrollToSection = (
  event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  sectionId: string
) => {
  event.preventDefault();
  const section = document.getElementById(sectionId);

  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  }
};

export default scrollToSection;
