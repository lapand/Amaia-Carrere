import Image from 'next/image';
import { Link, scroller } from 'react-scroll';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const sectionNames: string[] = ["Home", "Gallery", "ForSale", "About", "Contact"];
// menuIconBreakpoint <=> Tailwind breakpoint -sm
const menuIconBreakpoint: number = 640;

const Menu: React.FC = () => {

    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [isSideMenuOpened, setIsSideMenuOpened] = useState(false);
    const sideNavRef = useRef<HTMLDivElement>(null);
    const menuIconRef = useRef<HTMLButtonElement>(null);

    const { t } = useTranslation();
    const menuArray: string[] = t('menu', { returnObjects: true }) as string[];

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      }

      const handleClickOutside = (event: Event) => {
        if (
          sideNavRef.current && menuIconRef.current &&
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
      }
    }, []);

    useEffect(() => {
      windowWidth > menuIconBreakpoint && setIsSideMenuOpened(false);
    }, [windowWidth])

    const handleClick = () => {
      setIsSideMenuOpened(isSideMenuOpened => !isSideMenuOpened);
    }

    const scrollToSection = (sectionId: string) => {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    };

    const liJSX = sectionNames.map((item, index) => {
      return(
        <li key={item}>
          <Link 
            to={sectionNames[index]} 
            smooth={true} 
            duration={800} 
            onClick={() => {
              scrollToSection(sectionNames[index]);
              windowWidth <= menuIconBreakpoint && handleClick();
            }}
            className="nav-link"
            activeClass="active"
            spy={true}
          >
            {item}
          </Link>
        </li>
      );
    })

    return(
      <nav className="luckiest-guy flex items-center">
        {windowWidth <= menuIconBreakpoint &&
          <button 
            onClick={handleClick}
            className="w-10 2xl:w-12 aspect-square"
            aria-label="Toggle menu"
            ref={menuIconRef}
          >
            <Image src="/menu.svg" alt="menu-icon" width={100} height={100} className="size-full"/>
          </button>
        }
        {windowWidth > menuIconBreakpoint &&
          <ul className="flex gap-5 lg:gap-6 xl:gap-8 2xl:gap-20 2xl:text-xl">
            {liJSX}
          </ul>
        }
        {(windowWidth <= menuIconBreakpoint && isSideMenuOpened) &&
          <div 
            className="fixed side-nav w-72 p-10 bg-surface-200 border-2 border-l-surface-300"
            ref={sideNavRef}
          >
            <ul className="size-full flex flex-col justify-center gap-6 text-4xl">
              {liJSX}
            </ul>
          </div>
        }
      </nav>
    );
}

export default Menu;