'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trans } from 'react-i18next';

const Footer: React.FC = () => {

  // Pages sans footer
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  return (
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
        <Trans
          i18nKey="common:contact.copyright"
          components={{ strong: <strong /> }}
        />
      </p>
    </footer>
  );
};

export default Footer;
