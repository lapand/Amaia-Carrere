// Force au moins une propriété spécifique (choisie)
export type AtLeastOneOf<T, Keys extends keyof T = keyof T> = Partial<T> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>> }[Keys];

// Force au moins une parmi toutes les propriétés
export type AtLeastOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];
