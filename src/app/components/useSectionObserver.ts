import { Dispatch, SetStateAction, useEffect } from 'react';

const useSectionObserver = (
  sectionNames: string[],
  setActiveSection: Dispatch<SetStateAction<string>>
) => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionNames.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionNames.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [sectionNames, setActiveSection]);
};

export default useSectionObserver;
