import { Metadata } from "next"
import Image from "next/image"
import { Input } from "@/components/ui/input" // Update import path
import { ContactForm } from "@/components/ui/contact-form"

export const metadata: Metadata = {
  title: "Color Craft",
  description: "Find your perfect hair color.",
}

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-center items-center w-full">
       <ContactForm />
      </main>
      
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
      </footer>
    </div>
  )
}