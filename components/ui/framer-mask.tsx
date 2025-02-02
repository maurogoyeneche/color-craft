"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import useMousePosition from "@/app/hooks/useMousePosition";

export default function FramerMask({ active = false }) {
  const { data: session } = useSession();

  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const x = mousePosition.x ?? 0;
  const y = mousePosition.y ?? 0;
  const size = isHovered ? 400 : 40;
  return (
    !session && (
      <motion.div
        className="mask flex justify-center items-center z-10"
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
          &ldquo;La peluquería <strong>es un arte</strong>.<br /> Un saber hacer
          que nunca podrá ser reemplazado por máquinas. <br />
          Para realizar este arte, siempre necesitaremos las manos y los gestos
          del artista: El peluquero.&rdquo;
          <br />
          <br />
          Eugène Schueller
        </p>
      </motion.div>
    )
  );
}
