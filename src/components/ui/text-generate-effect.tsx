"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

type VariantType = "title" | "subtitle" | "highlight" | "default";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  variant = "default",
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  variant?: VariantType;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(0.2) }
    );
  }, [scope.current]);

  // 🎨 Define tus variantes aquí
  const variantStyles: Record<VariantType, string> = {
    default:
      "text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white",
    title:
      "text-3xl sm:text-2xl md:text-5xl lg:text-3xl font-extrabold text-black dark:text-white",
    subtitle:
      "text-sm sm:text-base md:text-lg lg:text-md text-zinc-600 dark:text-zinc-400 font-normal",
    highlight:
      "text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-500 font-semibold italic",
  };

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
          style={{ filter: filter ? "blur(10px)" : "none" }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className={cn(variantStyles[variant], "leading-snug tracking-wide")}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
