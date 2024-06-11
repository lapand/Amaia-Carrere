'use client';

import { Link, scroller } from 'react-scroll';
import Image from 'next/image';
import Menu from './Menu';

const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <header className="fixed z-10 w-full header-height flex items-center justify-between px-4 md:px-6 lg:px-16 xl:px-28 bg-white border-b border-slate-500">
      <div className="flex items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24 2xl:gap-36">
        <div>
          <Link
            to="Home"
            smooth={true}
            duration={800}
            onClick={() => scrollToSection('Home')}
          >
            <h2 className="inspiration-font text-4xl md:text-5xl 2xl:text-7xl cursor-pointer">
              Amaia
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="header-icon">
            <Image
              src="/instagram-icon.svg"
              alt="instagram-icon"
              width={100}
              height={100}
              className="size-full"
            />
          </div>
          <div className="header-icon">
            <Image
              src="/facebook-icon.svg"
              alt="facebook-icon"
              width={100}
              height={100}
              className="size-full"
            />
          </div>
          <div className="header-icon">
            <Image
              src="/pinterest-icon.svg"
              alt="pinterest-icon"
              width={100}
              height={100}
              className="size-full"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24">
        <div className="header-icon">
          <Image
            src="/language-icon.svg"
            alt="facebook-icon"
            width={100}
            height={100}
            className="size-full"
          />
        </div>
        <div>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
