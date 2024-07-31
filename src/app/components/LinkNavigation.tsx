import { useEffect } from 'react';
import { sectionNames } from './Menu';
import Link from 'next/link';

type LinkNavigationProps = {
    i: number,
    content: string,
    onClick: () => void;
    activeSection: string;
}

const LinkNavigation: React.FC<LinkNavigationProps> = ({ i, content, onClick, activeSection }) => {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
    const eventListeners: { link: HTMLAnchorElement, handleClick: (event: Event) => void }[] = [];

    links.forEach((link) => {
      const handleClick = (event: Event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = targetId && document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      };

      link.addEventListener('click', handleClick);
      eventListeners.push({ link, handleClick });
    });

    return () => {
      eventListeners.forEach(({ link, handleClick }) => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <Link
      href={`#${sectionNames[i]}`}
      onClick={() => {
        onClick();
      }}
      className={`nav-link ${
        activeSection === sectionNames[i] ? 'active' : ''
      }`}
      aria-label={`Go to ${sectionNames[i]}`}
      tabIndex={0}
    >
      {content}
    </Link>
  );
};

export default LinkNavigation;