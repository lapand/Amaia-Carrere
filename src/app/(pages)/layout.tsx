import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex-1 flex flex-col mx-4 my-16 sm:my-20">{children}</div>
  );
};

export default Layout;
