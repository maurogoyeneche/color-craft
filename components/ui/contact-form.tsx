"use client"

import * as React from "react"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { contactFormAction } from "@/lib/actions"
import { Check } from "lucide-react"

export function ContactForm({ className }: React.ComponentProps<typeof Card>) {
  const [state, formAction, pending] = React.useActionState(contactFormAction, {
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    success: false,
    errors: null,
  })
  console.log(state.defaultValues.color)

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Color Crafter</CardTitle>
        <CardDescription>Necesitas ayuda para mejorar tu formula de color? Nosotros te ayudaremos.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="flex flex-col gap-6">
          {state.success ? (
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Check className="size-4" />
              Your message has been sent. Thank you.
            </p>
          ) : null}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.color}>
            <Label htmlFor="name" className="group-data-[invalid=true]/field:text-destructive">
              Ingresa tu formula de color <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="color"
              name="color"
              placeholder="Lee Robinson"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.color}
              aria-errormessage="error-name"
              defaultValue={state.defaultValues.color}
            />
            {state.errors?.color && (
              <p id="error-name" className="text-destructive text-sm">
                {state.errors.color}
              </p>
            )}
          </div>
         
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.message}>
            <Label htmlFor="message" className="group-data-[invalid=true]/field:text-destructive">
              Comentarios <span aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.message}
              aria-errormessage="error-message"
              defaultValue={state.defaultValues.message}
            />
            {state.errors?.message && (
              <p id="error-message" className="text-destructive text-sm">
                {state.errors.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

