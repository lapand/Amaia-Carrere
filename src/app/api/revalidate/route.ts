import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { routes } from '@/config/config.global';
import { STRAPI_WEBHOOK_REVALIDATE_TOKEN } from '@/config/config.server';

interface WebhookRequest {
  event: string;
  model: string;
  entry: {
    documentId: string;
    titre: string;
  };
}

export async function POST(request: Request) {
  // Stocke les chemins revalidés
  const revalidatedPaths: string[] = [];
  // Stocke les chemins en échec de revalidation
  let revalidationErrors = '';

  try {
    // Récupération de l'en-tête Authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization header missing' },
        { status: 400 }
      );
    }

    // Extraction et vérification du token Bearer
    const token = authHeader.split(' ')[1];
    if (token !== STRAPI_WEBHOOK_REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Revalidation des chemins : invalidation des caches des segments correspondants et pré-génération de nouvelles pages statiques avec des données fetchées mises à jour
    const { model, entry }: WebhookRequest = await request.json();

    if (model === 'page-accueil') {
      const homePath = routes.home;
      revalidatePath(homePath);
      revalidatedPaths.push(homePath);
    }

    if (model === 'galerie-image') {
      const galleryPath = routes.gallery;
      revalidatePath(galleryPath);
      revalidatedPaths.push(galleryPath);
    }

    if (model === 'article') {
      if (!entry || !entry.titre || !entry.documentId) {
        revalidationErrors =
          'Update failed, impossible to revalidate shopPath & articlePath. Missing entry in article collection: titre or documentId.';
        console.error(revalidationErrors);
      } else {
        // Revalidation de la page shop
        const shopPath = routes.shop;
        revalidatePath(shopPath);
        revalidatedPaths.push(shopPath);

        // Revalidation de la page d'un article spécifique
        const { titre, documentId } = entry;
        const articlePath = routes.article(titre, documentId);
        revalidatePath(articlePath);
        revalidatedPaths.push(articlePath);
      }
    }

    if (model === 'a-propos-image') {
      const aboutPath = routes.about;
      revalidatePath(aboutPath);
      revalidatedPaths.push(aboutPath);
    }

    return NextResponse.json({
      message: `Revalidated paths: ${revalidatedPaths.join(', ')}${
        revalidationErrors ? `. Error: ${revalidationErrors}` : ''
      }`,
      paths: revalidatedPaths,
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { message: 'Error during revalidation', error },
      { status: 500 }
    );
  }
}
