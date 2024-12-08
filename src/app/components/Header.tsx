'use client';

import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import TransitionDOM from './TransitionDOM';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Button from './Button';
import { updateQuantity } from '../store/slices/cartSlice';

const langData = [
  {
    langName: 'euskadi',
    languageCode: 'eus',
    iconUri: '/basco-flag.png',
    posX: 'translate-x-[50px]',
    posY: 'translate-y-[60px] sm:translate-y-[50px]',
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
    posX: 'translate-x-[60px]',
    posY: '',
    delay: 200,
  },
];

const Header: React.FC = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [whiteHeaderStyle, setWhiteHeaderStyle] = useState(false);
  const { i18n } = useTranslation();
  const langIconRefs = useRef<RefObject<HTMLButtonElement>[]>([]);

  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.articles);

  const articlesData = useSelector((state: RootState) => {
    return state.shop.articles.filter((item) =>
      cartItems.some((article) => item.id === article.id)
    );
  });

  const detailedCartItem = articlesData.map((article) => {
    const idx = cartItems.findIndex((item) => item.id === article.id);
    return { ...article, quantity: cartItems[idx].quantity };
  });

  let cartItemCount = 0;
  cartItems.forEach((item) => (cartItemCount += item.quantity));
  let totalPrice = 0;
  detailedCartItem.forEach(
    (item) => (totalPrice += item.quantity * parseFloat(item.price))
  );

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
  if (whiteHeaderStyle) {
    headerStyle = 'border-slate-500 bg-white';
  } else {
    headerStyle = 'border-transparent';
  }

  // Pages sans header
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  const cartItemJSX =
    detailedCartItem.length === 0
      ? 'Panier vide'
      : detailedCartItem.map((item, i: number) => {
          return (
            <li
              key={i}
              className="flex justify-between items-center gap-4 mb-2"
            >
              <div className="size-16">
                {!item.gallery[0] ? (
                  <div className="size-full flex justify-center items-center text-xs text-center">
                    Image Introuvable
                  </div>
                ) : (
                  <Image
                    {...item.gallery[0]}
                    className="size-full object-contain"
                    priority
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-xs font-bold line-clamp-1 text-ellipsis break-words">
                  {item.title}
                </p>
                <p className="text-xs line-clamp-1 text-ellipsis break-words">
                  {item.quantity} x {item.price} €
                </p>
              </div>
              <Image
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: 0 }))
                }
                src="/cross.svg"
                alt="Retirer l'article du panier"
                width={20}
                height={20}
                className="size-9 p-3 object-contain transition-transform hover:scale-125 cursor-pointer"
                priority
              />
            </li>
          );
        });

  return (
    <header
      className={`fixed z-30 w-full header-height flex items-center justify-between gap-4 px-4 sm:px-12 xl:px-20 border-b transition-all duration-500 ease-in-out ${headerStyle}`}
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
          {JSXLanguages}
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
        <div>
          <div className="relative w-12 aspect-square p-3 cursor-pointer group">
            <Link href={'/shopping-cart'} className="relative">
              <Image
                src="/shopping-cart.png"
                alt="shopping-cart-icon"
                width={100}
                height={100}
                className="size-full"
                priority
              />
              {
                <span className="absolute top-3/4 left-3/4 text-xs bg-accent rounded-full size-5 flex justify-center items-center border border-black">
                  {cartItemCount}
                </span>
              }
            </Link>
            {/* Infobulle */}
            <div className="absolute right-0 flex flex-col gap-4 w-48 sm:w-80 mt-6 text-sm bg-gray-800 text-white rounded-lg shadow-lg p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:cursor-auto">
              <p className="self-center text-base">
                Total : {totalPrice.toFixed(2)} €
              </p>
              <Link
                href="/shopping-cart"
                className="self-center group transition-transform duration-300 hover:scale-105"
              >
                <Button className="flex items-center rounded-xl px-4 py-3">
                  <Image
                    src="/shopping-cart.png"
                    alt="shopping-cart-icon"
                    width={100}
                    height={100}
                    className="size-5"
                    priority
                  />
                  <span className="ml-2">Voir mon panier</span>
                </Button>
              </Link>
              <div className="flex flex-col gap-3">
                <p>Articles présents :</p>
                <ul className="max-h-56 sm:max-h-64 overflow-y-auto overflow-x-hidden">
                  {cartItemJSX}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
