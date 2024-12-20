// Fonction pour encoder une chaîne en entités HTML
export function encodeToHtmlEntities(str: string): string {
  return str
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('');
}

export function concatObjectValues(o: { [key: string]: string }): string {
  return Object.values(o).join('');
}
