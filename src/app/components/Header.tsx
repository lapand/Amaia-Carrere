'use client';

import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import TransitionDOM from './TransitionDOM';
import { useTranslation } from 'react-i18next';

const langData = [
  {
    langName: 'euskadi',
    languageCode: 'eus',
    iconUri: '/basco-flag.png',
    posX: '-translate-x-[50px]',
    posY: 'translate-y-[60px] sm:translate-y-[40px]',
    delay: 0,
  },
  {
    langName: 'french',
    languageCode: 'fr',
    iconUri: '/french-flag.png',
    posX: '',
    posY: 'translate-y-[60px]',
    delay: 100,
  },
  {
    langName: 'english',
    languageCode: 'en',
    iconUri: '/english-flag.png',
    posX: 'translate-x-[50px]',
    posY: 'translate-y-[60px] sm:translate-y-[40px]',
    delay: 200,
  },
];

const Header: React.FC = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [whiteHeaderStyle, setWhiteHeaderStyle] = useState(false);
  const { i18n } = useTranslation();
  const langIconRefs = useRef<RefObject<HTMLButtonElement>[]>([]);

  // Assure que langIconRefs.current est toujours un tableau de la bonne longueur
  langIconRefs.current = langData.map(
    (_, i) => langIconRefs.current[i] ?? createRef()
  );

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

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        langIconRefs.current.every((ref) => ref.current !== null) &&
        langIconRefs.current.every(
          (ref) => !ref.current?.contains(event.target as Node)
        )
      ) {
        setIsLanguagesVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleScrollToHome = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const home = document.getElementById('Home');

    if (home) {
      window.scrollTo({
        top: home.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const JSXLanguages = langData.map((lang, i: number) => {
    return (
      <TransitionDOM
        key={i}
        visible={isLanguagesVisible}
        delay={lang.delay}
        className={`absolute left-0 top-0 ${lang.posX} ${lang.posY}`}
      >
        <button
          ref={langIconRefs.current[i]}
          className="size-12 p-2 cursor-pointer transition-transform max-sm:scale-90 hover:scale-105 sm:hover:scale-110"
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
      </TransitionDOM>
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      const shouldAddStyle = window.scrollY > 50;
      if (shouldAddStyle && !whiteHeaderStyle) {
        setWhiteHeaderStyle(true);
      } else if (!shouldAddStyle && whiteHeaderStyle) {
        setWhiteHeaderStyle(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [whiteHeaderStyle]);

  let headerStyle = '';
  if(whiteHeaderStyle) {
    headerStyle = 'border-slate-500 bg-white';
  } else {
    headerStyle = 'border-transparent';
  }

  return (
    <header
      className={`fixed z-30 w-full header-height flex items-center justify-between gap-4 px-4 sm:px-12 xl:px-20 border-b transition-all duration-500 ease-in-out ${headerStyle}`}
    >
      <div className="h-full flex items-center gap-6 sm:gap-10 xl:gap-12 2xl:gap-32">
        <h1 className="h-4/5 min-w-36 cursor-pointer">
          <Link
            href=""
            onClick={handleScrollToHome}
            aria-label="Homepage"
            tabIndex={0}
          >
            <Image
              src="/amaia-logo.webp"
              alt="Site logo - Amaia Carrere"
              width={483}
              height={141}
              className="size-full"
              priority
            />
          </Link>
        </h1>
        <div className="relative">
          <button
            className="block header-icon black-to-color"
            onClick={() => setIsLanguagesVisible((v) => !v)}
            aria-label="Toggle language panel"
          >
            <Image
              src="/language-icon.svg"
              alt="language-icon"
              width={100}
              height={100}
              className="size-full"
              priority
            />
          </button>
          {JSXLanguages}
        </div>
      </div>
      <div className="flex items-center max-xl:flex-row-reverse gap-6 md:gap-12 lg:gap-16 xl:gap-24">
        <div>
          <Menu />
        </div>
        <div className="max-sm:absolute max-sm:left-2 max-sm:top-full flex items-center sm:gap-2">
          <div className="header-icon black-to-color">
            <Link
              href={'https://www.instagram.com/amaia.carrere'}
              target="_blank"
            >
              <Image
                src="/insta-icon.svg"
                alt="instagram-icon"
                width={100}
                height={100}
                className="size-full"
                priority
              />
            </Link>
          </div>
          <div className="header-icon black-to-color">
            <Link
              href={'https://www.facebook.com/amaia.carrere'}
              target="_blank"
            >
              <Image
                src="/facebook-icon.svg"
                alt="facebook-icon"
                width={100}
                height={100}
                className="size-full"
                priority
              />
            </Link>
          </div>
          <div className="header-icon black-to-color">
            <Link
              href={'https://www.linkedin.com/in/amaia-carrere-6302b7245'}
              target="_blank"
            >
              <Image
                src="/linkedin.svg"
                alt="linkedin-icon"
                width={100}
                height={100}
                className="size-full"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
