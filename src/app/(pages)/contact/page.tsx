'use client';

import Image from 'next/image';
import ContactForm from '../../../components/Form';
import { useTranslation } from 'react-i18next';
import removeContextMenu from '../../../utils/removeContextMenu';

const Contact: React.FC = () => {
  useTranslation();

  return (
    <div className="lg:relative flex-1 flex flex-col gap-32 sm:gap-40">
      <div className="inline-block self-center underline-custom after:h-[0.28rem] after:bottom-0 text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl">
        <h1 className="relative z-10 inline-block">Me contacter</h1>
        <span className="absolute top-full -translate-y-[40%] right-0 xs:right-5 sm:right-20 lg:right-1/2 w-64 sm:w-80 lg:w-[22rem]">
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
      <div className="flex-1 flex max-lg:flex-col justify-center items-center gap-8 sm:gap-12 xl:gap-20">
        <p className="w-full sm:w-3/4 lg:w-[30rem] xl:w-[40rem] annie-use-your-telescope text-2xl xl:text-2.5xl font-bold">
          Si vous êtes intéressés par des projets d&apos;illustrations, vous pouvez
          m&apos;en faire part via le formulaire de contact.
          <br />
          <br />
          N&apos;hésitez pas à m&apos;écrire pour une précision sur les produits en vente
          dans la section boutique.
          <br />
          <br />
          Suite à un achat via la boutique en ligne, les produits ne sont ni
          échangés, ni remboursés.
          <br />
          Pour toute réclamation, je vous invite également à me contacter via le
          formulaire ci-joint.
        </p>
        <div className="w-full sm:w-[450px] lg:w-[400px] 2xl:w-[450px]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
