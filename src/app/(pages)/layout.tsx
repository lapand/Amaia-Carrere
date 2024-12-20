'use client';

import ScrollProgressBtn from '@/components/ScrollProgressBtn';
import Section from '@/components/Section';
import usePageScrolling from '@/hooks/usePageScrolling';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isPageScrolling = usePageScrolling(200);

  return (
    <Section className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-24 mx-1 sm:mx-4 lg:mx-6 xl:mx-12 2xl:mx-24 3xl:mx-56 mt-10 3xl:mt-16 mb-32 sm:mb-24">
        {children}
      </div>
      <AnimatePresence>
        {isPageScrolling && (
          <ScrollProgressBtn className="fixed z-50 bottom-36 right-3 md:right-5 lg:bottom-10 lg:right-10" />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Layout;
