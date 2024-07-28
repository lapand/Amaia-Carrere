import Image from 'next/image';
import ContactForm from './Form';
import { Trans, useTranslation } from 'react-i18next';

const Contact: React.FC = () => {

  useTranslation();

  return (
    <div className="flex-1 flex flex-col mt-4 lg:mt-12 xl:mt-16">
      <div className="flex-1 w-4/5 mx-auto flex flex-col gap-5">
        <div className="flex-1 flex max-lg:flex-col justify-center items-center lg:gap-4 2xl:gap-24">
          <div className="lg:w-1/2 lg:self-end flex lg:justify-end">
            <div className="lg:w-full max-w-[550px]">
              <Image
                src="/contact/lezard.png"
                alt="lézards au téléphone"
                width={650}
                height={650}
                className="size-full object-contain"
              />
            </div>
          </div>
          <div className="md:w-5/6 lg:w-1/2">
            <div className="min-w-80 lg:w-[4/5] max-w-[500px] mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
        <footer className="flex justify-center items-center p-4">
          <p className="text-center text-sm 2xl:text-base">
            <span className="inline-block size-[18px] mr-1">
              <Image
                src="/contact/copyright.png"
                alt="copyright"
                width={50}
                height={50}
                className="inline-block size-full object-contain"
                style={{ verticalAlign: 'sub' }}
              />
            </span>
            <Trans i18nKey="common:contact.copyright" components={{ strong: <strong /> }} />
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
