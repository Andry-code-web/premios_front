import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-2 gap-6 md:auto-rows-[26rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "group/bento shadow-lg shadow-red-500/70 row-span-1 flex flex-col justify-between space-y-4 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 transition duration-200 hover:shadow-xl ",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 text-xl font-sans font-bold text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-300">
          {description}
        </div>
        <button className="text-sm text-white font-sans font-bold bg-red-500 rounded-xl p-2 mt-2">Comprar boletos</button>
      </div>
    </a>
  );
};
