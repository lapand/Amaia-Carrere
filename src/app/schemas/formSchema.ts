import { z } from 'zod';

export const contactSchema = z.object({
    email: z.string().email('Email invalide'),
    subject: z
      .string()
      .min(1, "L'objet est requis")
      .max(50, "L'objet ne peut pas dépasser 50 caractères"),
    content: z
      .string()
      .min(1, 'Un message est requis')
      .max(500, 'Le message ne peut pas dépasser 500 caractères'),
  });
  
  export type TcontactSchema = z.infer<typeof contactSchema>;