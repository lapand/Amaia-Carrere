import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col section-pt px-2 md:px-10 xl:px-24 md:pb-10 border-b-2 border-surface-300">
      <div className="flex-1 flex flex-col gap-24 mx-1 sm:mx-4 lg:mx-6 xl:mx-12 2xl:mx-24 3xl:mx-56 mt-5 sm:mt-10 3xl:mt-16 mb-32 sm:mb-24">
        {children}
      </div>
    </div>
  );
};

export default Layout;
