'use client';

import Image from 'next/image';
import ContactForm from '../../../components/Form';
import { useTranslation } from 'react-i18next';
import removeContextMenu from '../../../utils/removeContextMenu';

const Contact: React.FC = () => {
  useTranslation();

  return (
    <div className="lg:relative flex-1 flex flex-col justify-center gap-14 lg:gap-0">
      <h1 className="lg:absolute lg:top-0 lg:right-0 sm:text-right max-sm:ml-5 sm:mr-20 text-primary-600 annie-use-your-telescope thickening-1 text-6.5xl sm:text-7xl 2xl:text-8xl">
        <span className="underline-custom after:h-[0.375rem]">
          &nbsp;Contact
        </span>
      </h1>
      <div className="flex max-lg:flex-col justify-center items-center lg:items-end gap-12 xl:gap-20 3xl:gap-32">
        <div className="relative z-10 w-full sm:w-[450px] lg:w-[400px] 2xl:w-[450px]">
          <ContactForm />
        </div>
        <div className="max-lg:absolute max-sm:top-4 right-0 sm:bottom-20 w-[220px] sm:w-[400px] lg:w-[400px] xl:w-[450px]">
          <Image
            src="/contact/lezard.png"
            alt="lézards au téléphone"
            width={600}
            height={500}
            className="size-full object-cover"
            onContextMenu={removeContextMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
