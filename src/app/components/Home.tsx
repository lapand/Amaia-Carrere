import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

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

  const handleScrollToGallery = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const gallery = document.getElementById('Gallery');

    if (gallery) {
      window.scrollTo({
        top: gallery.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative h-full flex flex-col luckiest-guy">
      <div className="relative text-surface-900 flex-1">
        <p className="absolute max-sm:w-screen max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:py-2 top-[45%] sm:top-20 sm:left-[10%] text-3xl sm:text-6xl xl:text-7xl text-center sm:licorice-font sm:thickening">
          <Trans i18nKey="common:home.tagline" components={{ break: <br /> }} />
        </p>
        <h2 className="absolute max-sm:w-full top-[15%] sm:top-[60%] md:top-[63%] sm:right-[65%] md:right-[55%] 2xl:right-[45%] max-sm:flex max-sm:flex-col max-sm:gap-2 text-lg xs:text-xl sm:text-2xl 3xl:text-3xl sm:text-center">
          <span
            className={`${
              is1TitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            } sm:absolute sm:aspect-square sm:bg-white/30 sm:backdrop-blur-sm sm:py-3 sm:px-5 rounded-full flex items-center transition-all duration-700 sm:border-2 border-black`}
          >
            <Trans
              i18nKey="common:home.title1"
              components={{ strong: <strong /> }}
            />
          </span>
          <span
            className={`${
              is2TitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            } sm:absolute sm:top-36 3xl:top-40 sm:left-28 sm:aspect-square sm:bg-white/30 sm:backdrop-blur-sm sm:py-3 sm:px-5 rounded-full flex items-center transition-all duration-700 sm:border-2 border-black`}
          >
            <Trans
              i18nKey="common:home.title2"
              components={{ strong: <strong /> }}
            />
          </span>
          <span
            className={`${
              is3TitleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            } sm:absolute sm:-top-8 xl:top-20 sm:left-52 lg:left-72 sm:aspect-square sm:bg-white/30 sm:backdrop-blur-sm sm:py-3 sm:px-5 rounded-full flex items-center transition-all duration-700 sm:border-2 border-black`}
          >
            <Trans
              i18nKey="common:home.title3"
              components={{ strong: <strong /> }}
            />
          </span>
        </h2>
      </div>
      <Link
        href=""
        className="absolute bottom-[15%] sm:bottom-8 md:bottom-0 right-10 translate-x-1/2 w-8 lg:w-10 h-[3rem] lg:h-[5rem] rounded-full border-2 border-surface-800 cursor-pointer hover:bg-slate-50/70"
        onClick={handleScrollToGallery}
        aria-label={`Scroll down to the next section`}
        tabIndex={0}
      >
        <span className="scroll-down-btn scroll-down-btn1">
          <span></span>
        </span>
        <span className="scroll-down-btn scroll-down-btn2">
          <span></span>
        </span>
      </Link>
    </div>
  );
};

export default Home;
