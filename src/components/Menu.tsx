import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LinkNavigation from './LinkNavigation';
import TransitionDOM from './TransitionDOM';
import MenuIcon from '@/assets/menu.svg';
import { socials } from '@/data/contact';
import HeaderSocial from './HeaderSocial';

// menuIconBreakpoint <=> Tailwind breakpoint max-lg
const menuIconBreakpoint: number = 1024;

const Menu: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isSideMenuOpened, setIsSideMenuOpened] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

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
    windowWidth >= menuIconBreakpoint && setIsSideMenuOpened(false);
  }, [windowWidth]);

  const closeLateralMenu = () => {
    windowWidth < menuIconBreakpoint && setIsSideMenuOpened((prev) => !prev);
  };

  const liJSX = menuArray.map((item, i) => {
    return (
      <li key={item}>
        <LinkNavigation i={i} content={item} onClick={closeLateralMenu} />
      </li>
    );
  });

  const socialsJSX = socials.map((social, i: number) => (
    <div key={i} className="size-14 p-3">
      <HeaderSocial key={i} {...social} />
    </div>
  ));

  return (
    <nav className="luckiest-guy flex items-center">
      {/* Icone menu */}
      {windowWidth < menuIconBreakpoint && (
        <button
          onClick={closeLateralMenu}
          className="w-12 sm:w-[3.5rem] aspect-square group p-2"
          aria-label="Toggle menu panel"
          ref={menuIconRef}
        >
          <MenuIcon
            className={`size-full transition-colors duration-300 ${
              isSideMenuOpened ? 'text-amber-300' : 'text-amber-50'
            } group-hover:text-amber-300`}
          />
        </button>
      )}

      {/* Items du menu (laptop et +) */}
      {windowWidth >= menuIconBreakpoint && (
        <ul className="flex gap-4 xl:gap-8 lg:text-lg">{liJSX}</ul>
      )}

      {/* Volet latéral (mobile & tablette) */}
      <TransitionDOM
        className="absolute side-nav w-72 flex flex-col justify-center gap-12 p-10 bg-primary-600/80 border-2 border-primary-600"
        from={{ x: 300 }}
        style={{ transform: `translate3d(0, 0, 0)` }}
        visible={windowWidth < menuIconBreakpoint && isSideMenuOpened}
        duration={300}
        ref={sideNavRef}
      >
        <ul className="flex flex-col justify-center gap-6 text-4xl">{liJSX}</ul>
        <div className="flex gap-6">{socialsJSX}</div>
      </TransitionDOM>
    </nav>
  );
};

export default Menu;
