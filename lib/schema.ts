import { z } from "zod";

export const contactFormSchema = z.object({
  color: z
    .string()
    .min(1, { message: "Debes agregar al menos un color" })
    .max(32, { message: "Tu fórmnula de color es muy commpleja" }),
  message: z
    .string()
    .min(2, { message: "El comentario debe tener al menos 2 caracteres" })
    .max(1000, {
      message: "El comentario debe tener menos de 1000 caracteres",
    }),
});
