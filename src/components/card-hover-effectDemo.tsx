import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react";

export function CardHoverEffectDemo() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Llamamos a tu API
    fetch("http://localhost:3000/api/ganadores")
      .then((res) => res.json())
      .then((data) => {
        // Adaptamos los datos al formato que tu componente espera
        const mapped = data.map((g) => ({
          title: g.nombres, // nombre del cliente
          description: `${g.premio} — ${new Date(g.fecha_ganador).toLocaleDateString()}`,
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error("❌ Error cargando ganadores:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
