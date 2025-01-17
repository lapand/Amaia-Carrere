import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateCartSchema } from '@/schemas/cartItemSchema';
import { StripeEmbeddedCheckoutLineItem } from '@stripe/stripe-js';
import {
  STRIPE_SECRET,
  generateArticleUrl,
  CANCEL_URL,
  SUCCESS_URL,
  ALLOWED_COUNTRIES,
  DEFAULT_CURRENCY,
} from '@/config/config.server';
import { RefreshedDataType } from '@/types/bddValidation';
import { formatArticle } from '@/utils/formatters';

const stripe = new Stripe(STRIPE_SECRET as string);

export const POST = async (req: NextRequest) => {
  // Zod validation : vérification du type de données entrantes
  try {
    const cartData: unknown = await req.json();
    const result = validateCartSchema.safeParse(cartData);
    if (!result.success) {
      console.error('Erreur de validation : ', result.error.errors);
      return NextResponse.json(
        { error: 'Données entrantes invalides' },
        { status: 400 }
      );
    }

    // Validation avec Strapi : concordance données panier et source de vérité
    const refreshedData: RefreshedDataType = {
      updatedArticles: [],
      deletedArticles: [],
      alertMsg: [],
    };

    const validatedCart = await Promise.all(
      result.data.cartData.map(async (item) => {
        const res = await fetch(generateArticleUrl(item.id));
        const product = await res.json();
        const { data } = product;

        if (!data) {
          refreshedData.deletedArticles.push({
            id: item.id,
            title: item.title,
          });
          refreshedData.alertMsg.push(
            `Le produit ${item.title} a été retiré de la vente récemment.`
          );
          return null;
        }

        const { prix, disponibilite, titre } = data;

        if (!disponibilite) {
          refreshedData.updatedArticles.push(formatArticle(data));
          refreshedData.alertMsg.push(
            `Le produit ${item.title} n'est actuellement plus disponible.`
          );
          return null;
        }
        if (prix !== item.price) {
          refreshedData.updatedArticles.push(formatArticle(data));
          refreshedData.alertMsg.push(
            `Le prix du produit ${item.title} a changé, veillez à revérifier votre panier avant de valider à nouveau la commande.`
          );
          return null;
        }

        const productData: {
          name: any;
          description?: string;
        } = {
          name: titre,
        };

        if (item.selectedLanguage) {
          productData.description = `Language: ${item.selectedLanguage.name} (${item.selectedLanguage.code})`;
        }

        return {
          price_data: {
            currency: 'eur',
            product_data: productData,
            unit_amount: Math.round(prix * 100),
          },
          quantity: item.quantity,
        };
      })
    );

    if (
      refreshedData.deletedArticles.length > 0 ||
      refreshedData.updatedArticles.length > 0
    ) {
      return NextResponse.json(
        { error: 'discordance', refreshedData },
        { status: 400 }
      );
    }

    const shippingRate = await stripe.shippingRates.create({
      display_name: 'Ground shipping',
      type: 'fixed_amount',
      fixed_amount: {
        amount: result.data.shippingCost * 100,
        currency: DEFAULT_CURRENCY,
      },
      // Délai de livraison
      // delivery_estimate: {
      //   minimum: {
      //     unit: 'business_day',
      //     value: 5,
      //   },
      //   maximum: {
      //     unit: 'business_day',
      //     value: 7,
      //   },
      // },
    });

    // Création d'une session Stripe Checkout
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ALLOWED_COUNTRIES,
      },
      shipping_options: [
        {
          shipping_rate: shippingRate.id,
        },
      ],
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      line_items: validatedCart.filter(
        Boolean
      ) as NonNullable<StripeEmbeddedCheckoutLineItem>[],
    });

    if (!checkOutSession || !checkOutSession.url) {
      return NextResponse.json(
        {
          error:
            "La session de paiement Stripe n'a pas pu être créée correctement.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: checkOutSession.url }, { status: 200 });
  } catch (error: any) {
    console.error('Error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
