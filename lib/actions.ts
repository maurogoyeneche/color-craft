"use server";

import { contactFormSchema } from "@/lib/schema";
import { z } from "zod";
import { useSession, signIn } from "next-auth/react";

export async function contactFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));
  console.log(formData.get("color"));
  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData));
    console.log(data);

    // This simulates a slow response like a form submission.
    // Replace this with your actual form submission logic.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    signIn("google", { callbackUrl: "/" });
    return {
      defaultValues: {
        color: formData.get("color") as string,
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(", "),
          ])
        ),
      };
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    };
  }
}
