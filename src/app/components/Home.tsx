import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next';

const tableBgPath = '/table.png';
const bulbBgPath = '/ampoule-suspendue.png';

const Home: React.FC = () => {
  useTranslation();

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
    <div className="relative h-full flex flex-col licorice-font">
      <div className="relative text-surface-900 flex-1">
        <p className="absolute max-sm:w-screen max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:py-2 top-1/2 sm:top-20 sm:left-[10%] max-sm:backdrop-blur-sm max-sm:bg-white/20 text-4.5xl xs:text-5xl sm:text-6xl xl:text-7xl tt text-center">
          <Trans i18nKey="common:home.tagline" components={{ break: <br /> }} />
        </p>
        <h2 className="absolute max-sm:w-full max-sm:flex max-sm:flex-col max-sm:gap-2 top-[15%] sm:top-3/4 sm:right-[15%] max-sm:py-2 text-lg xs:text-xl sm:text-2xl xl:text-3xl sm:text-center luckiest-guy">
          <span className="sm:block sm:mb-6 xl:mb-10">
            <Trans
              i18nKey="common:home.title1"
              components={{ strong: <strong /> }}
            />
          </span>
          <span className="sm:mt-10 sm:mr-6 lg:mr-10 2xl:mr-16">
            <Trans
              i18nKey="common:home.title2"
              components={{ strong: <strong /> }}
            />
          </span>
          <span className="sm:mt-10 sm:ml-6 lg:ml-10 2xl:ml-16">
            <Trans
              i18nKey="common:home.title3"
              components={{ strong: <strong /> }}
            />
          </span>
        </h2>
      </div>
      <Link
        href=""
        className="absolute bottom-28 sm:bottom-8 md:bottom-0 right-10 translate-x-1/2 w-8 lg:w-10 h-[3rem] lg:h-[5rem] rounded-full border-2 border-surface-800 cursor-pointer hover:bg-slate-50/70"
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
