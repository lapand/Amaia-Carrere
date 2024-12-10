'use client';

import Section from '../components/Section';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trans, useTranslation } from 'react-i18next';
import Button from '../components/Button';
import Link from 'next/link';

const Home: React.FC = () => {

  useTranslation();

  const [is1TitleVisible, setIs1TitleVisible] = useState(false);
  const [is2TitleVisible, setIs2TitleVisible] = useState(false);
  const [is3TitleVisible, setIs3TitleVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIs1TitleVisible(true);
    }, 500);
    const timer2 = setTimeout(() => {
      setIs2TitleVisible(true);
    }, 1200);
    const timer3 = setTimeout(() => {
      setIs3TitleVisible(true);
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <Section className='h-screen pb-safe-bottom border-none bg-[url("/home-mobile.webp")] sm:bg-[url("/home.webp")] bg-cover bg-top'>
      <div className="relative h-full flex flex-col luckiest-guy">
        <div className="relative text-surface-900 flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-block sm:licorice-font sm:thickening">
              {/* <h1 className="text-3xl sm:text-6xl xl:text-8xl text-center m-10">
              Amaia Carrere
            </h1> */}
              <h1 className="h-4/5 min-w-36 mb-10">
                <Image
                  src="/amaia-logo.webp"
                  alt="Site logo - Amaia Carrere"
                  width={483}
                  height={141}
                  className="size-full"
                  priority
                />
              </h1>
              <p className="max-sm:py-2 text-2xl sm:text-5xl xl:text-6xl text-center">
                <Trans
                  i18nKey="common:home.tagline"
                  components={{ break: <br /> }}
                />
              </p>
            </div>
          </div>
          <Link href="/gallery" className='self-center transition-transform duration-300 hover:scale-105 hover:rotate-3'>
            <Button className="text-2xl rounded-3xl px-8 py-4">
              Entrer
            </Button>
          </Link>
          <h2 className="flex justify-end items-end text-xl xs:text-2xl sm:text-3xl 3xl:text-4xl sm:text-center">
            <span
              className={`${
                is1TitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              } sm:aspect-square sm:bg-white/30 sm:backdrop-blur-sm sm:py-5 sm:px-7 mb-10 rounded-full flex items-center transition-all duration-700 sm:border-2 border-black`}
            >
              <Trans
                i18nKey="common:home.title1"
                components={{ strong: <strong /> }}
              />
            </span>
            <span
              className={`${
                is2TitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              } sm:aspect-square sm:bg-white/30 sm:backdrop-blur-sm sm:py-5 sm:px-7 mb-6 -ml-10 rounded-full flex items-center transition-all duration-700 sm:border-2 border-black`}
            >
              <Trans
                i18nKey="common:home.title2"
                components={{ strong: <strong /> }}
              />
            </span>
            <span
              className={`${
                is3TitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              } sm:aspect-square sm:bg-white/30 sm:backdrop-blur-sm sm:py-5 sm:px-7 -ml-6 rounded-full flex items-center transition-all duration-700 sm:border-2 border-black`}
            >
              <Trans
                i18nKey="common:home.title3"
                components={{ strong: <strong /> }}
              />
            </span>
          </h2>
        </div>
      </div>
    </Section>
  );
};

export default Home;
