import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { validateCartSchema } from '@/schemas/cartItemSchema';
import { StripeEmbeddedCheckoutLineItem } from '@stripe/stripe-js';
import {
  CANCEL_URL,
  STRAPI_API_BASE_URL,
  SUCCESS_URL,
  STRIPE_SECRET,
} from '@/config/config';
import { NewDataType } from '@/types/bddValidation';
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
    const newData: NewDataType = {
      updatedArticles: [],
      deletedArticles: [],
      alertMsg: [],
    };

    const validatedCart = await Promise.all(
      result.data.cartData.map(async (item) => {
        const res = await fetch(
          `${STRAPI_API_BASE_URL}/api/articles/${item.id}?populate=galerie`
        );
        const product = await res.json();
        const { data } = product;

        if (!data) {
          newData.deletedArticles.push({ id: item.id, title: item.title });
          newData.alertMsg.push(
            `Le produit ${item.title} a été retiré de la vente récemment.`
          );
          return null;
        }

        const { prix, disponibilite, titre } = data;

        if (!disponibilite) {
          newData.updatedArticles.push(formatArticle(data));
          newData.alertMsg.push(
            `Le produit ${item.title} n'est actuellement plus disponible.`
          );
          return null;
        }
        if (prix !== item.price) {
          newData.updatedArticles.push(formatArticle(data));
          newData.alertMsg.push(
            `Le prix du produit ${item.title} a changé, veillez à revérifier votre panier avant de valider à nouveau la commande.`
          );
          return null;
        }

        return {
          price_data: {
            currency: 'eur',
            product_data: { name: titre },
            unit_amount: Math.round(prix * 100),
          },
          quantity: item.quantity,
        };
      })
    );

    if (
      newData.deletedArticles.length > 0 ||
      newData.updatedArticles.length > 0
    ) {
      return NextResponse.json(
        { error: 'discordance', newData },
        { status: 400 }
      );
    }

    const shippingRate = await stripe.shippingRates.create({
      display_name: 'Ground shipping',
      type: 'fixed_amount',
      fixed_amount: {
        amount: result.data.shippingCost * 100,
        currency: 'eur',
      },
      delivery_estimate: {
        minimum: {
          unit: 'business_day',
          value: 5, // Délai de livraison à modifier
        },
        maximum: {
          unit: 'business_day',
          value: 7, // Délai de livraison à modifier
        },
      },
    });

    // Création d'une session Stripe Checkout
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card',],
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'ES', 'BE', 'GB'],
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
