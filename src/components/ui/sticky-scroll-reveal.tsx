"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  // Usamos este ref para definir la altura del scroll de la página
  const ref = useRef<any>(null);

  // El target es el ref, lo que hace que el scrollYProgress se calcule 
  // basándose en el desplazamiento del ref en la ventana.
  const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"], // este suele ir mejor dentro de contenedores
});



  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Esta lógica sigue siendo correcta para calcular la tarjeta activa.
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#0f172a",
    "#000000",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #9333ea, #c026d3)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);
  return (
    <div ref={ref} className={`h-[${content.length * 50}vh] relative`}>
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        className="sticky top-0 flex h-full justify-center space-x-10 p-10"
      >
        <div className="div relative flex items-start px-4">
          <div className="max-w-2xl">
            {content.map((item, index) => (
              <div key={item.title + index} className="my-[15vh]">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-kg mt-10 max-w-sm text-slate-300"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            {/* <div className="h-40" /> Esto ya no es tan necesario */}
          </div>
        </div>
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            // Lo hacemos pegajoso con 'sticky top-10' para que siga el scroll
            "sticky top-40 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
            contentClassName,
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </motion.div>
    </div>
  );
};

export default StickyScroll;