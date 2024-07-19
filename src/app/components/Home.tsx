import Image from 'next/image';
import { Link } from 'react-scroll';
import { useTranslation, Trans } from 'react-i18next';
import { scrollToSection } from '../modules/utils/scrollTo';

const tableBgPath = '/table.png';
const bulbBgPath = '/ampoule-suspendue.png';

const Home: React.FC = () => {
  useTranslation();

  return (
    <div className="licorice-font relative h-full flex flex-col">
      <div
        className="absolute -top-1 right-4 min-w-24 w-1/6 h-36 sm:h-44 2xl:h-64 bg-contain bg-no-repeat bg-top"
        style={{ backgroundImage: `url(${bulbBgPath})` }}
      ></div>
      <div className="text-surface-900 flex-1 flex flex-col justify-center max-md:mt-16 text-center">
        <p className="text-5xl sm:text-6xl md:text-7xl">
          <Trans i18nKey="common:home.tagline">
            <br />
          </Trans>
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl 2xl:text-5xl mt-5">
          <Trans i18nKey="common:home.title">
            <strong></strong>
            <strong></strong>
          </Trans>
        </h2>
      </div>
      <div className="flex-1 relative w-full">
        <div
          className="absolute size-full bg-contain bg-no-repeat bg-center md:bg-left"
          style={{ backgroundImage: `url(${tableBgPath})` }}
        ></div>
      </div>
      <Link
        className="absolute bottom-8 md:bottom-0 right-1/2 lg:right-[5%] 2xl:right-1/4 translate-x-1/2 w-8 h-[3rem] lg:w-10 lg:h-[5rem] rounded-full border-2 border-surface-800 cursor-pointer hover:animate-bounce2"
        to={"Gallery"} 
        smooth={true} 
        duration={800} 
        onClick={() => {
          scrollToSection("Gallery");
        }}
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
