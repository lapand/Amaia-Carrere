'use client';

import Image from 'next/image';
import ContactForm from '../../components/Form';
import { useTranslation } from 'react-i18next';
import removeContextMenu from '../../utils/removeContextMenu';
import Section from '../../components/Section';

const Contact: React.FC = () => {
  useTranslation();

  return (
    <Section
      className="min-h-screen flex flex-col"
      style={{ paddingBottom: 0 }}
      id="contact"
    >
      <div className="flex-1 flex flex-col mt-4 lg:mt-12 xl:mt-16">
        <div className="flex-1 w-4/5 mx-auto flex flex-col gap-5">
          <div className="flex-1 flex max-lg:flex-col justify-center items-center">
            <div className="lg:w-1/2 lg:self-end flex lg:justify-end">
              <div className="lg:w-full max-w-[500px]">
                <Image
                  src="/contact/lezard.png"
                  alt="lézards au téléphone"
                  width={630}
                  height={520}
                  className="size-full object-contain"
                  onContextMenu={removeContextMenu}
                />
              </div>
            </div>
            <div className="md:w-5/6 lg:w-1/2">
              <div className="min-w-80 lg:w-[4/5] max-w-[500px] mx-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
