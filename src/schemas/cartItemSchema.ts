import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const cartSchema = z.array(cartItemSchema);
export type TcartSchema = z.infer<typeof cartSchema>;

// Assure que :
// => le prix est positif
// => la quantité est un nombre entier positif