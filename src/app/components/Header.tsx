'use client';

import { Link, scroller } from 'react-scroll';
import Image from 'next/image';
import Menu from './Menu';
import { useState } from 'react';
import Fade from './Fade';
import { useTranslation } from 'react-i18next';

const langData = [
  {
    langName: 'euskadi',
    languageCode: 'eus',
    iconUri: '/basco-flag.png',
    posX: -50,
    posY: 30,
    delay: 0,
  },
  {
    langName: 'french',
    languageCode: 'fr',
    iconUri: '/french-flag.png',
    posX: 0,
    posY: 40,
    delay: 100,
  },
  {
    langName: 'english',
    languageCode: 'en',
    iconUri: '/english-flag.png',
    posX: 50,
    posY: 30,
    delay: 200,
  },
];

const Header: React.FC = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const { i18n } = useTranslation();

  const handleToggle = (language: string) => {
    switch (language) {
      case 'eus':
        i18n.changeLanguage('eus');
        break;
      case 'en':
        i18n.changeLanguage('en');
        break;
      case 'fr':
        i18n.changeLanguage('fr');
        break;
    }
  };

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const JSXLanguages = langData.map((lang, i: number) => {
    return (
      <Fade
        key={i}
        visible={isLanguagesVisible}
        delay={lang.delay}
        className="absolute left-0 top-0"
        style={{ transform: `translate3d(${lang.posX}px, ${lang.posY}px, 0)` }}
      >
        <button
          key={i}
          className="language-icon absolute top-0 left-0"
          onClick={() => handleToggle(lang.languageCode)}
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
    <header className="fixed z-10 w-full header-height flex items-center justify-around sm:justify-between md:px-6 lg:px-16 xl:px-28 bg-white border-b border-slate-500">
      <h1 className="min-w-40 w-[15%] max-w-64 cursor-pointer">
        <Link
          to="Home"
          smooth={true}
          duration={800}
          onClick={() => scrollToSection('Home')}
          aria-label="Homepage"
        >
          <Image
            src="/amaia-logo.png"
            alt="Site logo - Amaia Carrere"
            width={200}
            height={200}
            className="size-full"
          />
        </Link>
      </h1>
      <div className="flex items-center gap-6 md:gap-12 lg:gap-16 xl:gap-24">
        <div className="relative">
          <button
            className="block header-icon black-to-color"
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
          {JSXLanguages}
        </div>
        <div>
          <Menu />
        </div>
        <div className="flex items-center sm:gap-2">
          <div className="header-icon black-to-color">
            <Image
              src="/insta-icon.svg"
              alt="instagram-icon"
              width={100}
              height={100}
              className="size-full"
            />
          </div>
          <div className="header-icon black-to-color">
            <Image
              src="/facebook-icon.svg"
              alt="facebook-icon"
              width={100}
              height={100}
              className="size-full"
            />
          </div>
          <div className="header-icon black-to-color">
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
    </header>
  );
};

export default Header;
