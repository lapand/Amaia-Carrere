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
import { lgBreakpoint, smBreakpoint } from '@/data/breakpoints';
import { socials } from '@/data/contact';
import { SiteLanguageType } from '@/types/siteLanguage';
import useViewportWidth from '@/hooks/useViewportWidth';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { routes } from '@/config/config.global';

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
  const pathname = usePathname();

  // MotionValues indiquant la progression(scrollYProgress) et position(scrollY) du scroll vertical
  const { scrollY } = useScroll();

  // Ecoute les changements de scrollY et déclenche l'apparition du composant lorsqu'il dépasse le seuil sur la page d'accueil
  // useMotionValueEvent(scrollY, 'change', (currentY) => {
  //   if (pathname === '/') {
  //     setIsVisible(currentY > 500);
  //   }
  // });

  // Maintenir la présence du header dans le DOM sur les pages autres que la page d'accueil
  // useEffect(() => {
  //   setIsVisible(pathname !== '/');
  // }, [pathname]);

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

  const hideSocialLinks =
    pathname.startsWith('/shop') || pathname === '/shopping-cart';

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
            scale: 1.2,
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
    <HeaderSocial key={i} {...social} />
  ));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className={`sticky top-0 z-[100] w-full header-height flex items-center justify-between gap-1 xs:gap-2 px-2 sm:px-6 xl:px-20 bg-primary-600 text-primary-200`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="h-full flex items-center gap-1 xs:gap-2 sm:gap-6 xl:gap-12 2xl:gap-32">
            <div className="relative">
              <motion.button
                className="block w-12 aspect-square p-3 cursor-pointer"
                onClick={() => setIsLanguagesVisible((v) => !v)}
                aria-label="Toggle language panel"
                whileHover={{
                  scale: 1.2,
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
                <Image
                  src="/language-icon.svg"
                  alt="language-icon"
                  width={100}
                  height={100}
                  className="size-full"
                  priority
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
            <div className="w-32 xs:w-40 sm:w-44 cursor-pointer">
              <Link href={routes.home} aria-label="Homepage" tabIndex={0}>
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
          <div className="flex items-center max-lg:flex-row-reverse gap-1 xs:gap-2 sm:gap-6 md:gap-12 lg:gap-10 xl:gap-16 2xl:gap-24">
            <div>
              <Menu />
            </div>
            {windowWidth < smBreakpoint && hideSocialLinks ? (
              ''
            ) : (
              <div
                className={`max-sm:fixed ${
                  pathname === '/contact'
                    ? 'max-sm:right-0 max-sm:rounded-l-lg max-sm:border-l-slate-500'
                    : 'max-sm:left-0 max-sm:rounded-r-lg max-sm:border-r-slate-500'
                } max-sm:bottom-[15%] flex max-sm:flex-col items-center xl:gap-2 max-sm:bg-slate-100 max-sm:border max-sm:border-y-slate-500 max-sm:shadow-sm max-sm:shadow-slate-950`}
              >
                {socialsJSX}
              </div>
            )}
            <div>
              <HeaderCart />
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
