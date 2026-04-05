'use client';

import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import TransitionDOM from './TransitionDOM';
import { useTranslation } from 'react-i18next';
import HeaderCart from './HeaderCart';
import HeaderSocial from './HeaderSocial';
import { lgBreakpoint, smBreakpoint } from '@/data/breakpoints';
import { socials } from '@/data/contact';
import { SiteLanguageType } from '@/types/siteLanguage';
import useViewportWidth from '@/hooks/useViewportWidth';
import { AnimatePresence, motion } from 'framer-motion';
import { routes } from '@/config/config.global';
import LanguageIcon from '@/assets/language-icon.svg';

const langData: SiteLanguageType[] = [
  {
    langName: 'euskadi',
    languageCode: 'eus',
    iconUri: '/basco-flag.png',
    posX: 'lg:translate-x-12',
    posY: 'lg:translate-y-12',
    delay: 0,
  },
  {
    langName: 'french',
    languageCode: 'fr',
    iconUri: '/french-flag.png',
    posX: '',
    posY: 'lg:translate-y-14',
    delay: 100,
  },
  {
    langName: 'english',
    languageCode: 'en',
    iconUri: '/english-flag.png',
    posX: 'lg:translate-x-14',
    posY: '',
    delay: 200,
  },
];

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
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

  const JSXLanguages = langData.map((lang, i: number) => {
    return (
      <TransitionDOM
        key={i}
        visible={isLanguagesVisible}
        delay={lang.delay}
        className={`lg:absolute left-0 top-0 ${lang.posX} ${lang.posY}`}
      >
        <motion.button
          ref={langIconRefs.current[i]}
          className="size-12 p-2 cursor-pointer"
          onClick={() => handleToggle(lang.languageCode)}
          aria-label={`Switch to ${lang.langName} language`}
          whileHover={{
            scale: 1.1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 7,
            },
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          <Image
            src={`${lang.iconUri}`}
            alt={`${lang.langName} flag icon`}
            width={100}
            height={100}
            className="size-full"
          />
        </motion.button>
      </TransitionDOM>
    );
  });

  const socialsJSX = socials.map((social, i: number) => (
    <div key={i} className="size-12 p-3">
      <HeaderSocial key={i} {...social} />
    </div>
  ));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className={`sticky top-0 z-[100] w-full header-height flex items-center justify-between gap-1 xs:gap-2 xs:px-2 sm:px-6 lg:px-2 xl:px-12 text-primary-200 bg-primary-600`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-full flex items-center gap-1 sm:gap-6 xl:gap-12 2xl:gap-32">
            <div className="relative">
              <motion.button
                className="block w-11 sm:w-12 aspect-square p-3 group"
                onClick={() => setIsLanguagesVisible((v) => !v)}
                aria-label="Toggle language panel"
                initial={{ scale: isLanguagesVisible ? 1.15 : 1 }}
                whileHover={{
                  scale: 1.15,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 10,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <LanguageIcon
                  className={`size-full transition-colors duration-300 ${
                    isLanguagesVisible ? 'text-amber-300' : 'text-amber-50'
                  } group-hover:text-amber-300`}
                />
              </motion.button>
              {windowWidth < lgBreakpoint ? (
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

            {/* logo du site */}
            <div className="cursor-pointer">
              <Link href={routes.home} aria-label="Homepage" tabIndex={0}>
                <div className="h-16 w-32 xs:w-36 sm:w-44 logo-mask transition-colors duration-300 bg-white hover:bg-amber-300" />
              </Link>
            </div>
          </div>
          <div className="flex items-center max-lg:flex-row-reverse gap-1 xs:gap-2 sm:gap-8 md:gap-12 lg:gap-6 xl:gap-16 2xl:gap-24">
            <div>
              <Menu />
            </div>
            {windowWidth >= smBreakpoint && (
              <div className={`flex items-center xl:gap-2`}>{socialsJSX}</div>
            )}
            <HeaderCart />
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
