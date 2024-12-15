import Section from '@/components/Section';
import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Section className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col gap-24 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
        {children}
      </div>
    </Section>
  );
};

export default Layout;
