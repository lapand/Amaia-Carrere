'use client';

import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import TransitionDOM from './TransitionDOM';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import HeaderCart from './HeaderCart';
import HeaderSocial from './HeaderSocial';
import { mobileBreakpoint, socials } from '@/config/config';
import { LanguageType } from '@/types/language';
import useViewportWidth from '@/hooks/useViewportWidth';

const langData: LanguageType[] = [
  {
    langName: 'euskadi',
    languageCode: 'eus',
    iconUri: '/basco-flag.png',
    posX: 'sm:translate-x-12',
    posY: 'sm:translate-y-12',
    delay: 0,
  },
  {
    langName: 'french',
    languageCode: 'fr',
    iconUri: '/french-flag.png',
    posX: '',
    posY: 'sm:translate-y-14',
    delay: 100,
  },
  {
    langName: 'english',
    languageCode: 'en',
    iconUri: '/english-flag.png',
    posX: 'sm:translate-x-14',
    posY: '',
    delay: 200,
  },
];

const Header: React.FC = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [whiteHeaderStyle, setWhiteHeaderStyle] = useState(false);
  const { i18n } = useTranslation();
  const langIconRefs = useRef<RefObject<HTMLButtonElement>[]>([]);
  const windowWidth = useViewportWidth();

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
    setIsLanguagesVisible(false);
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

  // Pages sans header
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  const JSXLanguages = langData.map((lang, i: number) => {
    console.log(lang);

    return (
      <TransitionDOM
        key={i}
        visible={isLanguagesVisible}
        delay={lang.delay}
        className={`sm:absolute left-0 top-0 ${lang.posX} ${lang.posY}`}
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

  const socialsJSX = socials.map((social, i: number) => (
    <HeaderSocial key={i} {...social} />
  ));

  let headerStyle = '';
  if (whiteHeaderStyle) {
    headerStyle = 'border-slate-500 bg-slate-100';
  } else {
    headerStyle = 'border-transparent';
  }

  return (
    <header
      className={`fixed z-30 w-full header-height flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-12 xl:px-20 border-b transition-all duration-500 ease-in-out ${headerStyle}`}
    >
      <div className="h-full flex items-center gap-6 sm:gap-10 xl:gap-12 2xl:gap-32">
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
          {windowWidth < mobileBreakpoint ? (
            <div
              className={`fixed top-20 left-0 flex flex-col gap-1 transition-transform ${
                isLanguagesVisible ? '-translate-x-0' : '-translate-x-16'
              } bg-slate-100 rounded-r-lg border border-y-slate-500 border-r-slate-500 shadow-sm shadow-slate-950`}
            >
              {JSXLanguages}
            </div>
          ) : (
            JSXLanguages
          )}
        </div>
        <div className="h-4/5 min-w-36 cursor-pointer">
          <Link href="/" aria-label="Homepage" tabIndex={0}>
            <Image
              src="/amaia-logo.webp"
              alt="Site logo - Amaia Carrere"
              width={483}
              height={141}
              className="size-full"
              priority
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center max-xl:flex-row-reverse gap-6 md:gap-12 lg:gap-16 xl:gap-24">
        <div>
          <Menu />
        </div>
        <div className="max-sm:fixed max-sm:left-0 max-sm:bottom-[15%] flex max-sm:flex-col items-center sm:gap-2 max-sm:bg-slate-100 max-sm:rounded-r-lg max-sm:border max-sm:border-y-slate-500 max-sm:border-r-slate-500 max-sm:shadow-sm max-sm:shadow-slate-950">
          {socialsJSX}
        </div>
        <div>
          <HeaderCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
