import { Metadata } from "next";

import { ContactForm } from "@/components/ui/color-form";
import Login from "@/components/ui/login";
import FramerMask from "@/components/ui/framer-mask";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="main flex  flex-col justify-center items-center w-full">
        <FramerMask />
        <Login />
        <ContactForm />
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center"></footer>
    </div>
  );
}
