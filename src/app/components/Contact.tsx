import Image from 'next/image';
import ContactForm from './Form';

const Contact: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex-1 flex max-lg:flex-col justify-center items-center lg:gap-4 2xl:gap-24">
        <div className="w-3/4 md:w-2/5 lg:w-1/3 2xl:w-1/4 lg:self-end">
          <div className="">
            <Image
              src="/contact/lezard.png"
              alt="lézards au téléphone"
              width={650}
              height={650}
              className="size-full object-contain"
            />
          </div>
        </div>
        <div className="w-5/6 md:w-3/5 lg:w-2/5 xl:w-[35%] 2xl:w-1/4">
          <ContactForm />
        </div>
      </div>
      <footer className="flex justify-center p-4">
        <div className="flex items-center gap-3">
          <div className="size-9 md:size-6">
            <Image
              src="/contact/copyright.png"
              alt="copyright"
              width={50}
              height={50}
              className="size-full object-contain"
            />
          </div>
          <p className="text-center text-sm 2xl:text-base">
            2024 - Amaia Carrere - Auteur illustratrice - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
