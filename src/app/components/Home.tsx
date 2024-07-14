import { useTranslation, Trans } from 'react-i18next';

const tableBgPath = '/table.png';
const bulbBgPath = '/ampoule-suspendue.png';

const Home: React.FC = () => {
  useTranslation();

  return (
    <div className="licorice-font relative h-full flex flex-col">
      <div
        className="absolute -top-1 left-4 md:left-auto md:right-4 min-w-24 w-1/6 h-32 md:h-44 2xl:h-64 bg-contain bg-no-repeat bg-top"
        style={{ backgroundImage: `url(${bulbBgPath})` }}
      ></div>
      <div className="flex-1 flex flex-col justify-center max-md:mt-16 text-center">
        <p className="text-5xl lg:text-6xl 2xl:text-7xl">
          <Trans i18nKey="common:home.tagline">
            <br />
          </Trans>
        </p>
        <h2 className="text-2xl lg:text-3xl 2xl:text-5xl mt-5">
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
    </div>
  );
};

export default Home;
