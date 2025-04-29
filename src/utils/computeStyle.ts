/**
 * Génère dynamiquement un objet `React.CSSProperties` à partir d'un objet de style partiel,
 * en supprimant toutes les propriétés dont la valeur est `undefined`.
 *
 * Cette fonction est utile pour appliquer des styles dynamiquement à des composants React
 * sans écraser les valeurs CSS par défaut ou héritées.
 *
 * @typeParam T - Un objet contenant un sous-ensemble des propriétés CSS possibles.
 *
 * @param style - Un objet partiel de styles CSS.
 *
 * @returns Un objet `React.CSSProperties` propre et directement utilisable dans un attribut `style`.
 *
 * @example
 * ```tsx
 * const style = computeStyle<{ width?: string; backgroundColor?: string }>({
 *   width: '4rem',
 *   backgroundColor: undefined, // sera ignoré
 * });
 *
 * // Résultat :
 * // { width: '4rem' }
 * ```
 */
export function computeStyle<T extends Partial<Record<string, string>>>(
  style?: T
): React.CSSProperties {
  const result: React.CSSProperties = {};

  if (!style) return result;

  for (const key in style) {
    const value = style[key];
    if (value !== undefined) {
      (result as any)[key] = value;
    }
  }

  return result;
}
