// Fonction récursive pour extraire les chemins d'un objet de routes
export const extractStaticRoutes = (obj: any): string[] => {
  let paths: string[] = [];

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      paths.push(value);
    } else if (typeof value === 'object') {
      paths = [...paths, ...extractStaticRoutes(value)];
    }
  }

  return paths;
};
