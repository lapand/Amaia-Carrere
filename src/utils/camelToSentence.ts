export const camelToSentence = (str: string): string =>
  str
    // Ajoute un espace entre les lettres minuscules et majuscules
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Met tout en minuscules
    .toLowerCase()
    // Met la première lettre en majuscule
    .replace(/^./, (char) => char.toUpperCase());
