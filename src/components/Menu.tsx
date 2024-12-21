import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LinkNavigation from './LinkNavigation';
import TransitionDOM from './TransitionDOM';

// menuIconBreakpoint <=> Tailwind breakpoint max-lg
const menuIconBreakpoint: number = 1024;

const Menu: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const { t } = useTranslation('common');
  const menuArray: string[] = t('menu', { returnObjects: true }) as string[];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleClickOutside = (event: Event) => {
      if (
        sideNavRef.current &&
        menuIconRef.current &&
        !sideNavRef.current.contains(event.target as Node) &&
        !menuIconRef.current.contains(event.target as Node)
      ) {
        setIsSideMenuOpened(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    windowWidth > menuIconBreakpoint && setIsSideMenuOpened(false);
  }, [windowWidth]);

  const closeLateralMenu = () => {
    windowWidth <= menuIconBreakpoint && setIsSideMenuOpened((prev) => !prev);
  };

  const liJSX = menuArray.map((item, i) => {
    return (
      <li
        key={item}
        className={`${
          isMenuVisible
            ? '-translate-x-0 opacity-100'
            : '-translate-x-10 opacity-0'
        }`}
      >
        <LinkNavigation i={i} content={item} onClick={closeLateralMenu} />
      </li>
    );
  });

  return (
    <nav className="luckiest-guy flex items-center">
      {/* Icone menu */}
      {windowWidth <= menuIconBreakpoint && (
        <button
          onClick={closeLateralMenu}
          className="w-11 2xl:w-12 aspect-square"
          aria-label="Toggle menu"
          ref={menuIconRef}
        >
          <Image
            src="/menu.svg"
            alt="menu-icon"
            width={100}
            height={100}
            className="size-full"
          />
        </button>
      )}

      {/* Items du menu (laptop et +) */}
      {windowWidth > menuIconBreakpoint && (
        <ul className="flex gap-5 lg:gap-6 xl:gap-10 2xl:gap-14 3xl:gap-20 lg:text-lg 2xl:text-xl">
          {liJSX}
        </ul>
      )}

      {/* Volet latéral (mobile & tablette) */}
      <TransitionDOM
        className="fixed side-nav w-72 p-10 bg-surface-200/70 border-2 border-l-surface-300"
        from={{ x: 300 }}
        style={{ transform: `translate3d(0, 0, 0)` }}
        visible={windowWidth <= menuIconBreakpoint && isSideMenuOpened}
        duration={300}
        ref={sideNavRef}
      >
        <ul className="size-full flex flex-col justify-center gap-6 text-4xl">
          {liJSX}
        </ul>
      </TransitionDOM>
    </nav>
  );
};

export default Menu;
