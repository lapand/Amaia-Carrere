import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'public/gallery'; // Dossier contenant les images originales
const outputDir = 'public/gallery-low-res'; // Dossier où seront enregistrées les images basse résolution

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Fonction pour générer une image basse résolution
const generateLowResImage = async (inputFilePath, outputFilePath) => {
  try {
    await sharp(inputFilePath)
      .resize({ width: 20 }) // Taille de l'image basse résolution (ajustez selon vos besoins)
      .toFile(outputFilePath);
    console.log(`Generated low-res image: ${outputFilePath}`);
  } catch (err) {
    console.error(`Error generating low-res image: ${inputFilePath}`, err);
  }
};

// Parcourir les fichiers dans le dossier d'entrée
fs.readdirSync(inputDir).forEach(file => {
  const inputFilePath = path.join(inputDir, file);
  const outputFilePath = path.join(outputDir, file);

  // Générer l'image basse résolution
  generateLowResImage(inputFilePath, outputFilePath);
});