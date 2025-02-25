import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SocialType } from '@/types/social';
import { motion } from 'framer-motion';

const HeaderSocial: React.FC<SocialType> = ({ href, src, alt }) => {
  return (
    <motion.li
      className="size-12 p-3 cursor-pointer list-none black-to-color invert"
      whileHover={{
        scale: 1.2,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 10,
        },
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
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
    </motion.li>
  );
};

export default HeaderSocial;
