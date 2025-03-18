'use client';

import { homeSectionIds, routes } from '@/config/config.global';
import GalleryOverview from './GalleryOverview';
import Link from 'next/link';
import Button from './Button';
import ContactForm from './Form';
import Separator from './Separator';
import { PagesOverviewData } from '@/types';
import { camelToKebab } from '@/utils/camelToKebab';

type PagesOverviewProps = {
  data: PagesOverviewData;
};

const PagesOverview: React.FC<PagesOverviewProps> = ({ data }) => {
  // console.log(data);
  
  const entries = Object.entries(data);
  const galleryOverviewSections = entries.map((arr, i: number) => (
    <GalleryOverview
      key={i}
      title={camelToKebab(arr[0])}
      images={arr[1]}
      colorTheme={i % 2 !== 0 ? 'light' : 'dark'}
      isFirst={i === 0}
      isLast={i === entries.length - 1}
    />
  ));

  return (
    <div className="flex flex-col gap-10 sm:gap-12 lg:gap-20">
      <Separator size="sm" />
      <section className="flex flex-col gap-10 sm:gap-16">
        <h2 className="text-center regards text-4xl">Qui suis-je ?</h2>
        <div className="flex flex-col justify-center items-center gap-8 sm:gap-12">
          <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] text-center text-pretty annie-use-your-telescope text-3xl font-bold max-sm:px-4">
            Dessinatrice près de Bayonne et du pays basque.
            <br />
            Je crée des illustrations jeunesse, fantasy, ainsi que des bandes
            dessinées.
          </p>
          <div className="flex justify-center">
            <Link
              href={routes.gallery}
              className="transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                aria-label={`to gallery page`}
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {galleryOverviewSections}
      <section className="flex flex-col gap-10 sm:gap-16 mt-8">
        <h2 className="text-center regards text-4xl">Ma boutique</h2>
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] text-center text-pretty annie-use-your-telescope text-3xl font-bold max-sm:px-4">
            Découvrez mes articles en vente ici
          </p>
          <span className="inline-block rotate-90 text-4xl font-bold annie-use-your-telescope">
            =&gt;
          </span>
          <div className="flex justify-center">
            <Link
              href={routes.shop}
              className="transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="rounded-3xl px-6 py-3 luckiest-guy text-lg"
                aria-label={`to shop page`}
              >
                Voir les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Separator size="sm" />
      <section className="flex flex-col gap-10 sm:gap-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="text-center regards text-4xl">Me contacter</h2>
        <div className="flex max-sm:flex-col justify-center items-center gap-8 sm:gap-12 lg:gap-20">
          <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] annie-use-your-telescope text-3xl font-bold max-sm:px-4">
            Si vous êtes intéressés par des projets d'illustrations, vous pouvez
            m'en faire part via le formulaire de contact.
            <br />
            <br />
            N'hésitez pas à m'écrire pour une précision sur les produits en
            vente dans la section boutique.
            <br />
            <br />
            Suite à un achat via la boutique en ligne, les produits ne sont ni
            échangés, ni remboursés.
            <br />
            Pour toute réclamation, je vous invite également à me contacter via
            le formulaire ci-joint.
          </p>
          <div className="w-full sm:w-[450px] lg:w-[400px] 2xl:w-[450px]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PagesOverview;
