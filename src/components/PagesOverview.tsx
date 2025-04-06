'use client';

import { routes } from '@/config/config.global';
import GalleryOverview from './GalleryOverview';
import Link from 'next/link';
import Button from './Button';
import ContactForm from './Form';
import Separator from './Separator';
import { PagesOverviewData } from '@/types';
import { camelToSentence } from '@/utils/camelToSentence';
import Image from 'next/image';
import removeContextMenu from '@/utils/removeContextMenu';

type PagesOverviewProps = {
  data: PagesOverviewData;
};

const PagesOverview: React.FC<PagesOverviewProps> = ({ data }) => {
  const entries = Object.entries(data);
  const galleryOverviewSections = entries.map((arr, i: number) => (
    <GalleryOverview
      key={i}
      title={camelToSentence(arr[0])}
      images={arr[1]}
      colorTheme={i % 2 !== 0 ? 'light' : 'dark'}
      isLast={i === entries.length - 1}
    />
  ));

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <Separator size="sm" />
      <section className="flex flex-col gap-16">
        <h2 className="text-center regards text-3.5xl sm:text-4xl lg:text-4.5xl">
          Qui suis-je ?
        </h2>
        <div className="flex flex-col justify-center items-center gap-8 sm:gap-12">
          <p className="relative w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] text-center text-pretty annie-use-your-telescope text-2xl xs:text-2.5xl sm:text-3xl font-bold px-2 xs:px-4 sm:px-0">
            Dessinatrice près de Bayonne et du pays basque.
            <br />
            Je crée des illustrations jeunesse, fantasy, ainsi que des bandes
            dessinées.
            <span className="absolute bottom-full md:bottom-0 right-[70%] sm:right-[85%] md:right-full w-28 sm:w-32 md:w-40">
              <Image
                src="/alien.webp"
                alt="Deux aliens en tenue d'astronaute"
                width={321}
                height={447}
                className="size-full object-contain"
                onContextMenu={removeContextMenu}
                quality={100}
              />
            </span>
          </p>
          <div className="flex justify-center">
            <Link
              href={routes.about}
              className="transition-transform duration-300 hover:rotate-1"
            >
              <Button
                className="px-6 py-3 luckiest-guy text-lg"
                aria-label={`to about page`}
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {galleryOverviewSections}
      <section className="flex flex-col gap-10 sm:gap-16 mt-8">
        <h2 className="text-center regards text-3.5xl sm:text-4xl lg:text-4.5xl">
          Ma boutique
        </h2>
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="w-full sm:w-96 lg:w-[30rem] xl:w-[45rem] text-center text-pretty annie-use-your-telescope text-2xl xs:text-2.5xl sm:text-3xl font-bold max-sm:px-4">
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
                className="px-6 py-3 luckiest-guy text-lg"
                aria-label={`to shop page`}
              >
                Voir les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Separator size="sm" />
      <section className="flex flex-col gap-32 sm:gap-40 pb-10 xl:pb-12 3xl:pb-16 max-md:px-4">
        <div className="relative self-center inline-block">
          <h2 className="relative z-10 inline-block regards text-3.5xl sm:text-4xl lg:text-4.5xl">
            Me contacter
          </h2>
          <span className="absolute top-full -translate-y-[40%] right-0 xs:right-4 sm:right-1/2 w-[16rem] sm:w-[19rem] lg:w-[22rem]">
            <Image
              src="/lezard.webp"
              alt="Deux lézards passe un coup de téléphone"
              width={594}
              height={488}
              className="size-full object-contain"
              onContextMenu={removeContextMenu}
              quality={100}
            />
          </span>
        </div>
        <div className="flex max-lg:flex-col justify-center items-center gap-8 sm:gap-12 xl:gap-20">
          <p className="w-full md:w-4/5 lg:w-[30rem] xl:w-[38rem] 2xl:w-[40rem] annie-use-your-telescope text-2xl sm:text-2.5xl font-bold">
            Si vous êtes intéressés par des projets d&apos;illustrations, vous pouvez
            m&apos;en faire part via le formulaire de contact.
            <br />
            <br />
            N&apos;hésitez pas à m&apos;écrire pour une précision sur les produits en
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
