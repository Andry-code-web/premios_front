"use client";

import Carousel from "@/components/ui/carousel";

export function CarouselDemo() {
  const slideData = [
    {
      title: "Celular Magic Pro",
      button: "Comprar Ticket",
      src: "banner_celular.png",
    },
    {
      title: "Laptop Magic Pro",
      button: "Comprar Ticket",
      src: "banner_laptop.png",
    },
    {
      title: "Tablet Magic Pro",
      button: "Comprar Ticket",
      src: "banner_tablet.png",
    },
    {
      title: "Computadora Magic Pro",
      button: "Comprar Ticket",
      src: "banner_compu.png",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
