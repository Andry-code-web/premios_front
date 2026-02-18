"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconGift } from "@tabler/icons-react";

interface Premio {
    id: number;
    nombre: string;
    descripcion?: string;
    imagen_1: string;
    created_at: string;
}

const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
    <div className="flex w-full h-full min-h-[12rem] rounded-xl overflow-hidden">
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
        />
    </div>
);

const SkeletonHeader = () => (
    <div className="flex w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse" />
);

export function BentoGridDemo() {
    const [premios, setPremios] = useState<Premio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPremios = async () => {
            try {
                const response = await fetch(
                    "https://premios-back-b916cb780512.herokuapp.com/api/premios"
                );

                if (!response.ok) {
                    throw new Error("Error al cargar los premios");
                }

                const data = await response.json();
                setPremios(data);
            } catch (err) {
                console.error("Error fetching premios:", err);
                setError(
                    err instanceof Error ? err.message : "Error desconocido"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPremios();
    }, []);

    if (loading) {
        return (
            <BentoGrid className="max-w-4xl mx-auto">
                {Array.from({ length: 6 }).map((_, i) => (
                    <BentoGridItem
                        key={i}
                        title=""
                        description=""
                        header={<SkeletonHeader />}
                        icon={
                            <IconGift className="h-4 w-4 text-neutral-500" />
                        }
                        className={i === 3 || i === 5 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full py-12">
                <div className="text-center text-red-500">
                    <p className="text-lg font-semibold">
                        ⚠️ Error al cargar premios
                    </p>
                    <p className="mt-2 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (premios.length === 0) {
        return (
            <div className="flex items-center justify-center w-full py-12">
                <div className="text-center text-neutral-500 dark:text-neutral-400">
                    <p className="text-lg font-semibold">
                        📦 No hay premios disponibles
                    </p>
                    <p className="mt-2 text-sm">
                        Pronto habrá premios increíbles para ti
                    </p>
                </div>
            </div>
        );
    }

    return (
        <BentoGrid className="max-w-4xl mx-auto">
            {premios.map((premio, i) => (
                <BentoGridItem
                    key={premio.id}
                    title={premio.nombre}
                    description={premio.descripcion ?? ""}
                    href={`/buy-tickets`}
                    header={
                        <ImageHeader
                            src={`data:image/jpeg;base64,${premio.imagen_1}`}
                            alt={premio.nombre}
                        />
                    }
                    icon={
                        <IconGift className="h-4 w-4 text-neutral-500" />
                    }
                    className={i === 3 || i === 5 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}
