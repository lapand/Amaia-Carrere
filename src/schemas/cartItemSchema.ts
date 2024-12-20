import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  available: z.boolean(),
});

export const cartSchema = z.array(cartItemSchema);
export type TcartSchema = z.infer<typeof cartSchema>;

export const validateCartSchema = z.object({
  shippingCost: z.number().positive(),
  cartData: cartSchema,
});
export type SchemaType = z.infer<typeof validateCartSchema>;

// Assure que :
// => le prix est positif
// => la quantité est un nombre entier positif
