import Section from '@/components/Section';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Section className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-24 mx-2 sm:mx-10 lg:mx-20 xl:mx-36 3xl:mx-72 mt-10 sm:mt-16 3xl:mt-24 mb-32 sm:mb-24">
        {children}
      </div>
    </Section>
  );
};

export default Layout;
