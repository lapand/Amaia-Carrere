import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { cartSchema } from '@/schemas/cartItemSchema';
import { StripeEmbeddedCheckoutLineItem } from '@stripe/stripe-js';
import {
  CANCEL_URL,
  STRAPI_API_BASE_URL,
  SUCCESS_URL,
  STRIPE_SECRET,
} from '@/config/config';

const stripe = new Stripe(STRIPE_SECRET as string);

export const POST = async (req: NextRequest) => {
  // Zod validation : vérification du type de données entrantes
  try {
    const cartData: unknown = await req.json();
    console.log(cartData);
    const result = cartSchema.safeParse(cartData);
    if (!result.success) {
      console.error('Erreur de validation : ', result.error.errors);
      return NextResponse.json(
        { msg: 'Données invalides', errors: result.error.errors },
        { status: 400 }
      );
    }

    // Validation avec Strapi : concordance données panier et source de vérité
    const errors: string[] = [];
    const validatedCart = await Promise.all(
      result.data.map(async (item) => {
        const res = await fetch(
          `${STRAPI_API_BASE_URL}/api/articles/${item.id}`
        );
        const product = await res.json();

        if (!product) {
          errors.push(`Le produit avec l'ID ${item.id} n'existe pas.`);
          return null;
        }

        if (product.price !== item.price) {
          errors.push(`Le prix du produit ${product.title} a changé.`);
          return null;
        }

        if (product.stock < item.quantity) {
          errors.push(`Stock insuffisant pour le produit ${product.title}.`);
          return null;
        }

        return {
          price_data: {
            currency: 'eur',
            product_data: { name: product.title },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: item.quantity,
        };
      })
    );

    if (errors.length > 0) {
      return NextResponse.json(
        { error: true, errorMessage: errors.join(' ') },
        { status: 400 }
      );
    }

    // Création d'une session Stripe Checkout
    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR'],
      },
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      line_items: validatedCart.filter(
        Boolean
      ) as NonNullable<StripeEmbeddedCheckoutLineItem>[],
    });
    console.log(checkOutSession.url);
    if (!checkOutSession || !checkOutSession.url) {
      return NextResponse.json(
        {
          error:
            "La session de paiement Stripe n'a pas pu être créée correctement.",
        },
        { status: 500 }
      );
    }
    return NextResponse.redirect(checkOutSession.url, { status: 303 });
  } catch (error: any) {
    console.error('Error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
