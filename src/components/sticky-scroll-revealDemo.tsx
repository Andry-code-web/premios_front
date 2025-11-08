"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
{
  title: "Yapea S/.40 y gana",
  description:
    "Participa en sorteos exclusivos al realizar pagos con Yape. Cada transacción es una oportunidad para ganar premios increíbles. ¡Cuantas más veces uses Yape, más chances tienes de ganar!",
  content: (
    <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/public/yape_qr_1.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
  ),
},

  {
    title: "Plin S/.40 y gana",
    description:
      "Participa en sorteos exclusivos al realizar pagos con Plin. Cada transacción es una oportunidad para ganar premios increíbles. ¡Cuantas más veces uses Plin, más chances tienes de ganar!",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/public/Diseño sin título (1) (1).png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  }
 
];
export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
