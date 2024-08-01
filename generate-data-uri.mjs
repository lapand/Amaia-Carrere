import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'public/gallery'; // Dossier contenant les images originales
const outputDir = 'public/gallery-low-res'; // Dossier où seront enregistrées les images basse résolution
const jsonOutputFile = 'public/dataUris.json';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Fonction pour générer une image basse résolution et encoder en Base64
const generateAndEncodeLowResImage = async (inputFilePath, outputFilePath) => {
  try {
    await sharp(inputFilePath)
      .resize({ width: 20 }) // Taille de l'image basse résolution
      .toFile(outputFilePath);

    // Lire le fichier basse résolution
    const imageBuffer = fs.readFileSync(outputFilePath);

    // Convertir en Base64
    const base64Image = imageBuffer.toString('base64');

    // Créer l'URI de données
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    // Supprimer le fichier basse résolution après encodage
    fs.unlinkSync(outputFilePath);

    return dataUri;
  } catch (err) {
    console.error(`Error processing image: ${inputFilePath}`, err);
    return null;
  }
};

// Objet pour stocker les URI de données
const dataUris = {};

// Fonction asynchrone pour traiter les fichiers
const processFiles = async () => {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, file);

    // Générer l'image basse résolution et encoder en Base64
    const dataUri = await generateAndEncodeLowResImage(
      inputFilePath,
      outputFilePath
    );

    if (dataUri) {
      dataUris[file] = dataUri;
    }
  }

  // Écrire les URI de données dans le fichier JSON
  fs.writeFileSync(jsonOutputFile, JSON.stringify(dataUris, null, 2));
  console.log(`Data URIs have been written to ${jsonOutputFile}`);

  // Supprimer le dossier gallery-low-res s'il est vide
  try {
    fs.rmdirSync(outputDir);
    console.log(`Directory ${outputDir} has been removed`);
  } catch (err) {
    console.error(`Error removing directory ${outputDir}:`, err);
  }
};

// Exécuter le traitement des fichiers
processFiles();
