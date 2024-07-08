'use client';

import { Link, scroller } from 'react-scroll';
import Image from 'next/image';
import Menu from './Menu';
import { useState } from 'react';
import Fade from './Fade';

const langData = [
  {
    langName: 'basque',
    iconUri: '/basco-flag.png',
    posX: -150,
    posY: 130,
  },
  {
    langName: 'french',
    iconUri: '/french-flag.png',
    posX: 0,
    posY: 160,
  },
  {
    langName: 'english',
    iconUri: '/english-flag.png',
    posX: 150,
    posY: 130,
  },
];

const Header: React.FC = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const JSXLanguages = langData.map((lang, i: number) => {
    return (
      <Fade key={i} visible={isLanguagesVisible} from={{opacity: 0, x: 0, y: 0, z: 0}} className='absolute left-0 top-0'>
      <button
        key={i}
        className="header-icon absolute top-0 left-0 transition-transform"
        style={{ transform: `translate(${lang.posX}%, ${lang.posY}%)` }}
        onClick={() => null}
        aria-label={`Switch to ${lang.langName} language`}
      >
        <Image
          src={`${lang.iconUri}`}
          alt={`${lang.langName} flag icon`}
          width={100}
          height={100}
          className="size-full"
        />
      </button>
      </Fade>
    );
  });

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
            <h2 className="inspiration-font text-4xl md:text-5xl 2xl:text-6xl cursor-pointer">
              Amaia
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:gap-6 2xl:gap-10">
          <div className="header-icon">
            <Image
              src="/insta-icon.svg"
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
        <div className="relative">
          <button
            className="header-icon block"
            onClick={() => setIsLanguagesVisible((v) => !v)}
            aria-label="Toggle language panel"
          >
            <Image
              src="/language-icon.svg"
              alt="facebook-icon"
              width={100}
              height={100}
              className="size-full"
            />
          </button>
          {/* <Fade visible={isLanguagesVisible} className='absolute top-0 left-0'>0 */}
            {JSXLanguages}
          {/* </Fade> */}
          {/* {isLanguagesVisible && JSXLanguages} */}
        </div>
        <div>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
