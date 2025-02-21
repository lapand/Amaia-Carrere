'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type RouteWrapperProps = {
  paths: string | string[];
  children: ReactNode;
};

const RouteWrapper: React.FC<RouteWrapperProps> = ({ paths, children }) => {
  const pathname = usePathname();

  // Si `paths` est une chaîne de caractères, le convertit en tableau
  const pathsArray = Array.isArray(paths) ? paths : [paths];

  // Vérifie si la route actuelle correspond à un des chemins dans le tableau
  const isMatchingPath = pathsArray.some(
    (path) => pathname === path || pathname.startsWith(path)
  );

  // Ne rien rendre si aucun des chemins ne correspond
  if (!isMatchingPath) {
    return null;
  }

  return <>{children}</>;
};

export default RouteWrapper;
