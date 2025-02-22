'use client';

import { mobileBreakpoint } from '@/data/breakpoints';
import useViewportWidth from '@/hooks/useViewportWidth';
import Image from 'next/image';
import Link from 'next/link';
import { Trans } from 'react-i18next';

const Footer: React.FC = () => {

  const windowWidth = useViewportWidth();

  return (
    <footer className="absolute z-30 bottom-0 w-full flex flex-col justify-center items-center gap-3 p-2 sm:p-4 bg-slate-100 border-t border-black">
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
        {windowWidth < mobileBreakpoint ? (
          <Trans
            i18nKey="common:contact.copyright.mobile"
            components={{ strong: <strong /> }}
          />
        ) : (
          <Trans
            i18nKey="common:contact.copyright.desktop"
            components={{ strong: <strong /> }}
          />
        )}
      </p>
      <ul className="flex gap-5 text-sm">
        <li className="hover:scale-105 transition-transform duration-300">
          <Link href="/legal-notice">Mentions légales</Link>
        </li>
        <div className="w-[1px] h-5 bg-black"></div>
        <li className="hover:scale-105 transition-transform duration-300">
          <Link href="/privacy-policy">
            {windowWidth < mobileBreakpoint
              ? 'Confidentialité'
              : 'Politique de confidentialité'}
          </Link>
        </li>
        <div className="w-[1px] h-5 bg-black"></div>
        <li className="hover:scale-105 transition-transform duration-300">
          <Link href="/terms-and-conditions">
            {windowWidth < mobileBreakpoint
              ? 'CGV'
              : 'Conditions générales de vente'}
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
