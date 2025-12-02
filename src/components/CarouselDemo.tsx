"use client";

import { useState, useEffect } from "react";
import Carousel from "@/components/ui/carousel";

interface Premio {
  id: number;
  nombre: string;
  imagen_1: string;
  created_at: string;
}

export function CarouselDemo() {
  const [premios, setPremios] = useState<Premio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPremios = async () => {
      try {
        const response = await fetch("https://premios-back-b916cb780512.herokuapp.com/api/premios");

        if (!response.ok) {
          throw new Error("Error al cargar los premios");
        }

        const data = await response.json();
        setPremios(data);
      } catch (err) {
        console.error("Error fetching premios:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPremios();
  }, []);

  const slideData = premios.map((premio) => ({
    title: premio.nombre,
    button: "Comprar Ticket",
    src: `data:image/jpeg;base64,${premio.imagen_1}`,
  }));

  if (loading) {
    return (
      <div className="relative overflow-hidden w-full h-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="mt-4 text-white text-lg">Cargando premios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-hidden w-full h-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">⚠️ Error al cargar premios</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (premios.length === 0) {
    return (
      <div className="relative overflow-hidden w-full h-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg font-semibold">📦 No hay premios disponibles</p>
          <p className="mt-2">Pronto habrá premios increíbles para ti</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full py-8 sm:py-12 md:py-16 lg:py-20 px-4">
      <Carousel slides={slideData} />
    </div>
  );
}
