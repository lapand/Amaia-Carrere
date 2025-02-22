import { usePathname } from 'next/navigation';

/**
 * Hook vérifiant si le chemin de la route actuelle est restreint par rapport à une liste donnée de chemins restreints.
 *
 * @param {string | string[]} restrictedPaths - Un chemin ou une liste de chemins restreints.
 * @returns {{ isCurrentPathRestricted: boolean }} Un objet contenant une propriété `isCurrentPathRestricted`, 
 * qui indique si la route actuelle fait partie des chemins restreints.
 * @example
 * // Exemple d'utilisation dans un composant
 * const { isCurrentPathRestricted } = useRestrictedPaths(['/dashboard', '/admin']);
 * if (isCurrentPathRestricted) return null;
 * return <MyComponent />;
 */
const useRestrictedPaths = (
  restrictedPaths: string | string[] = []
): { isCurrentPathRestricted: boolean } => {
  const pathname = usePathname();

  // Si `restrictedPaths` est une chaîne de caractères, le convertit en tableau
  const restrictedPathsArray = Array.isArray(restrictedPaths)
    ? restrictedPaths
    : [restrictedPaths];

  // Vérifie si la route actuelle correspond à un des chemins dans le tableau
  const isCurrentPathRestricted = restrictedPathsArray.some(
    (path) => pathname === path || pathname.startsWith(path)
  );

  return { isCurrentPathRestricted };
};

export default useRestrictedPaths;
