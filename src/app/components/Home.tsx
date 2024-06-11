import { useTranslation, Trans } from "react-i18next";

const tableBgPath = "/table.png";
const bulbBgPath = "/ampoule-suspendue.png";

const Home: React.FC = () => {

  useTranslation();

    return(
      <div className="licorice-font relative h-full flex flex-col justify-center gap-16 xl:gap-32 2xl:gap-40">
        <div 
          className="absolute top-0 left-4 md:left-auto md:right-4 min-w-24 w-1/6 h-32 md:h-44 2xl:h-80 bg-contain bg-no-repeat bg-top" 
          style={{ backgroundImage: `url(${bulbBgPath})` }}
        ></div>
        <div className="flex flex-col justify-end text-center">
          <p className="text-5xl lg:text-6xl 2xl:text-7xl">
            {/* <Trans i18nKey="home.tagline"> */}
                Bienvenue dans mon atelier,<br/>
                source de rêves crayonnés
            {/* </Trans> */}
          </p>
          <h2 className="text-2xl lg:text-3xl 2xl:text-5xl mt-5">
            {/* <Trans i18nKey="home.title"> */}
              <strong>Illustratrice</strong> Jeunesse / Fantasy / <strong>Bande dessinée</strong>
            {/* </Trans> */}
          </h2>
        </div>
        <div className="relative h-1/3 xl:h-2/5 w-full">
          <div className="absolute size-full bg-contain bg-no-repeat bg-center md:bg-left" style={{ backgroundImage: `url(${tableBgPath})` }}
          ></div>
        </div>
      </div>
    );
}

export default Home;