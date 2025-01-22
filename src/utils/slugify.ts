// Formatage du titre de l'article afin qu'il soit valide dans l'URL
export function slugify(title: string): string {
  return encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));
}
