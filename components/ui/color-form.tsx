"use client";

import * as React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { contactFormAction } from "@/lib/actions";
import { Check } from "lucide-react";
import { Vortex } from "react-loader-spinner";

export function ContactForm({ className }: React.ComponentProps<typeof Card>) {
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

  return (
    <>
      <Card className={cn("w-[95%] max-w-md", className)}>
        <CardHeader>
          <CardTitle>Color Crafter</CardTitle>
          <CardDescription>
            Necesitas ayuda para mejorar tu formula de color? Nosotros te
            ayudaremos.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="flex flex-col gap-6">
            {state.success ? (
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="size-4" />
                Hemos mejorado tu formula de color. Espero te agrade.
              </p>
            ) : null}
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
          <CardFooter>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Mejorando..." : "Mejorar fórmula"}
            </Button>
          </CardFooter>
        </form>

        {state.success && (
          <Card
            className={cn(
              "mx-6 mt-2 mb-6 p-6 max-w-md bg-violet-500 shadow-lg"
            )}
          >
            <p className="px-6 text-white">
              La formula mejorada es:{" "}
              <span className="text-xl font-semibold">
                🧙🏻🪄✨ {state.defaultValues.color}
              </span>
            </p>
          </Card>
        )}
      </Card>
      {isPending && (
        <div className="absolute flex justify-center items-center h-dvh w-full bg-white/50 backdrop-blur-sm">
          <Vortex
            visible={true}
            height="120"
            width="120"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      )}
    </>
  );
}
