import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { routes } from '@/config/config.global';

interface WebhookRequest {
  entry: {
    documentId: string;
    titre: string;
  };
}

export async function POST(request: Request) {
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
    if (token !== process.env.STRAPI_WEBHOOK_REVALIDATE_ARTICLES_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Récupération du corps de la requête
    const { entry }: WebhookRequest = await request.json();

    // Vérification que l'entry contient un titre et un documentId
    if (!entry || !entry.titre || !entry.documentId) {
      return NextResponse.json(
        { message: 'Missing entry data (titre or documentId)' },
        { status: 400 }
      );
    }

    const { titre, documentId } = entry;

    // Page boutique
    const shopPath = routes.shop;
    // Page article spécifique
    const articlePath = routes.article(titre, documentId);

    // Revalidation des chemins (invalidation des caches des segments correspondants et pré-génération de nouvelles pages statiques avec des données fetchées mises à jour)
    revalidatePath(shopPath);
    revalidatePath(articlePath);

    return NextResponse.json({
      message: `Revalidated paths: ${shopPath}, ${articlePath}`,
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { message: 'Error during revalidation', error },
      { status: 500 }
    );
  }
}
