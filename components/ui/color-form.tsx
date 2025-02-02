"use client";

import * as React from "react";
import { useSession } from "next-auth/react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { contactFormAction } from "@/lib/actions";
import { Check } from "lucide-react";
// import { Vortex } from "react-loader-spinner";

export function ContactForm({ className }: React.ComponentProps<typeof Card>) {
  const { data: session } = useSession();

  const [state, formAction, isPending] = React.useActionState(
    contactFormAction,
    {
      defaultValues: {
        color: "",
      },
      success: false,
      errors: null,
    }
  );
  const [formValues, setFormValues] = React.useState({
    color: "",
  });
  const isColorValue = formValues.color ?? true;

  return (
    <>
      <Card
        className={cn(
          `w-[95%] max-w-md h-[440px] ${!session && "color-form-blur"}`,
          className
        )}
      >
        <CardHeader>
          <CardTitle>Color Crafter</CardTitle>
          <CardDescription>
            Necesitas ayuda para mejorar tu formula de color? Nosotros te
            ayudaremos.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="flex flex-col gap-6">
            <div
              className="group/field grid gap-2 text-red"
              data-invalid={!!state.errors?.color}
            >
              <Label
                htmlFor="color"
                className="group-data-[invalid=true]/field:text-destructive"
              >
                Ingresa tu formula de color <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="color"
                name="color"
                placeholder="Ejemplo: 7 + 7.3 + 8.1"
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={isPending}
                aria-invalid={!!state.errors?.color}
                aria-errormessage="error-color"
                defaultValue={state.defaultValues.color}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, color: e.target.value }))
                }
              />
              {state.errors?.color && (
                <p
                  id="error-color"
                  className="text-destructive text-xs text-red-500"
                >
                  {state.errors.color}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 items-start">
            <Button
              className="z-0"
              type="submit"
              size="sm"
              disabled={isPending || !isColorValue}
            >
              {isPending ? "Mejorando..." : "Mejorar fórmula"}
            </Button>
            <p
              className={`text-muted-foreground flex items-center gap-2 text-sm ${
                !state.success && "hidden"
              }`}
            >
              <Check className="size-4" />
              Hemos mejorado tu formula de color. Espero te agrade.
            </p>
          </CardFooter>
        </form>
        {state.success ? (
          <Card
            className={cn("mx-6 mb-6 p-6 max-w-md bg-violet-500 shadow-lg")}
          >
            <p className="px-6 text-white text-center">
              <span className="mr-2">🧙🏻🪄✨</span>
              <span className="text-xl font-semibold">
                {state.defaultValues.color}
              </span>
            </p>
          </Card>
        ) : (
          <Skeleton
            className={cn(
              `w-[90%] mx-auto h-[120px] mt-2 mb-6 ${!isPending && "hidden"}`
            )}
          />
        )}
      </Card>
      {isPending && (
        <div className="absolute flex justify-center items-center h-dvh w-full bg-white/50 backdrop-blur-sm animate-pulse" />
      )}
    </>
  );
}
