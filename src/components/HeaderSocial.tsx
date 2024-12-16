import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SocialType } from '@/types/social';

const HeaderSocial: React.FC<SocialType> = ({ href, src, alt }) => {
  return (
    <li className="header-icon sm:black-to-color list-none">
      <Link href={href} target="_blank">
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="size-full"
          priority
        />
      </Link>
    </li>
  );
};

export default HeaderSocial;
