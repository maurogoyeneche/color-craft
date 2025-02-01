"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "./hooks/useMousePosition";

import { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ui/color-form";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const x = mousePosition.x ?? 0;
  const y = mousePosition.y ?? 0;
  const size = isHovered ? 400 : 40;
  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="main flex justify-center items-center w-full">
        {false && (
          <motion.div
            className="mask flex justify-center items-center"
            animate={{
              WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
              WebkitMaskSize: `${size}px`,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          >
            <p
              className="mx-auto select-none w-[90%] sm:w-[60%]"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              &ldquo;La peluquería <strong>es un arte</strong>.<br /> Un saber
              hacer que nunca podrá ser reemplazado por máquinas. <br />
              Para realizar este arte, siempre necesitaremos las manos y los
              gestos del artista: El peluquero.&rdquo;
              <br />
              <br />
              Eugène Schueller
            </p>
          </motion.div>
        )}
        <ContactForm />
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center"></footer>
    </div>
  );
}
