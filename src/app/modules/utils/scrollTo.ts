import { scroller } from "react-scroll";

export const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuint',
    });
    setTimeout(() => {
      window.scrollBy(0, 30);
    }, 900);
  };