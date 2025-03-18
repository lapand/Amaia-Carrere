// Fonction pour ajuster les tableaux pour qu'ils contiennent exactement 3 éléments
export const adjustArray = <T>(arr: T[], fillValues: [T, T, T]): T[] => {
  // Si l'array a plus de 3 éléments, on garde les 3 premiers
  if (arr.length > 3) {
    return arr.slice(0, 3);
  }
  // Si l'array a moins de 3 éléments, on ajoute des éléments par défaut
  while (arr.length < 3) {
    arr.push(fillValues[arr.length]);
  }
  return arr;
};
