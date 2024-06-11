"use client";

import { Link, scroller } from 'react-scroll';
import Image from 'next/image';
import Menu from './Menu';

const Header: React.FC = () => {

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return(
      <header className="fixed z-10 w-full header-height flex items-center justify-between px-4 bg-white border-b border-slate-500">
        <div>
          <Link
            to="Home" 
            smooth={true} 
            duration={800} 
            onClick={() => scrollToSection("Home")}
          >
            <h2 className="inspiration-font text-5xl">Amaia</h2>
            {/* <Image 
              src=""
              alt="logo"
              width={500}
              height={500}
              style={{
                width: "auto",
                height:"100%",
                cursor: "pointer",
              }}
            /> */}
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <div className="w-5 h-5">
              <Image src="/instagram-icon.svg" alt="instagram-icon" width={100} height={100} className="size-full"/>
            </div>
            <div className="w-5 h-5">
              <Image src="/facebook-icon.svg" alt="facebook-icon" width={100} height={100} className="size-full"/>
            </div>
            <div className="w-5 h-5">
              <Image src="/pinterest-icon.svg" alt="pinterest-icon" width={100} height={100} className="size-full"/>
            </div>
        </div>
        <div className="w-5 h-5">
          <Image src="/language-icon.svg" alt="facebook-icon" width={100} height={100} className="size-full"/>
        </div>
        <div>
          <Menu />
        </div>
      </header>
  );
}

export default Header;