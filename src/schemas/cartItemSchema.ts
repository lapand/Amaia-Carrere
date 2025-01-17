import { z } from 'zod';

const LanguageTypeSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  selectedLanguage: LanguageTypeSchema.optional(),
});

export const cartSchema = z.array(cartItemSchema);
export type TcartSchema = z.infer<typeof cartSchema>;

export const validateCartSchema = z.object({
  shippingCost: z.number().nonnegative(),
  cartData: cartSchema,
});
export type SchemaType = z.infer<typeof validateCartSchema>;

// Assure que :
// => le prix est positif
// => la quantité est un nombre entier positif
