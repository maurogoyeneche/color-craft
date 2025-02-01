import { z } from "zod";

export const contactFormSchema = z.object({
  color: z
    .string()
    .min(1, { message: "Debes agregar al menos un color" })
    .max(32, { message: "Tu fórmnula de color es muy commpleja" }),
});
