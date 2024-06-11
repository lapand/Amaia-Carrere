import Image from 'next/image';
import { Link, scroller } from 'react-scroll';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const sectionNames: string[] = ["Home", "", "", "About", "Contact"];

const Menu: React.FC = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { t } = useTranslation();
    const menuArray: string[] = t('menu', { returnObjects: true }) as string[];
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
      return () => removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (sectionId: string) => {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    };

    const handleClick = () => {
      setIsMenuVisible(isMenuVisible => !isMenuVisible);
    }

    // const liJSX = menuArray.map((item, index) => {
    //   return(
    //     <li key={item}>
    //       <Link 
    //         to={sectionNames[index]} 
    //         smooth={true} 
    //         duration={800} 
    //         onClick={() => {
    //           scrollToSection(sectionNames[index]);
    //           windowWidth <= 500 && handleClick();
    //         }}
    //       >
    //         {item}
    //       </Link>
    //     </li>
    //   );
    // })

    return(
      <nav className="flex items-center">
        <button 
          onClick={handleClick}
          className="w-12 h-12"
        >
          <Image src="/menu.svg" alt="menu-icon" width={100} height={100} className="size-full"/>
        </button>
        <ul>
          {/* {liJSX} */}
        </ul>
      </nav>
    );
}

export default Menu;