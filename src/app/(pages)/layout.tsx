'use client';

import ScrollProgressBtn from '@/components/ScrollProgressBtn';
import usePageScrolling from '@/hooks/usePageScrolling';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isPageScrolling = usePageScrolling(200);
  const pathname = usePathname();
  const hideScrollButton = pathname === '/shopping-cart';

  return (
    <div className="min-h-screen flex flex-col page-pt px-2 md:px-10 xl:px-24 md:pb-10 xl:pb-16 border-b-2 border-surface-300">
      <div className="flex-1 flex flex-col gap-24 mx-1 sm:mx-4 lg:mx-6 xl:mx-12 2xl:mx-24 3xl:mx-56 mt-10 3xl:mt-16 mb-32 sm:mb-24">
        {children}
      </div>
      <AnimatePresence>
        {isPageScrolling && !hideScrollButton && (
          <ScrollProgressBtn className="fixed z-50 bottom-24 right-3 md:right-5 lg:bottom-10 lg:right-10" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
