"use client";
import { useEffect, useRef } from "react";
import { IconGavel } from "@tabler/icons-react";
import { renderToStaticMarkup } from "react-dom/server";

interface GavelParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    rotation: number;
    life: number;
    scale: number;
    hitPhase: number;
    hitSpeed: number;
}

export const GoldenParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gavelImgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        // Convertimos el componente SVG a string
        const svgString = renderToStaticMarkup(
            <IconGavel size={64} stroke={2} color="#FFD700" />
        );

        const img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(svgString);
        gavelImgRef.current = img;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const img = gavelImgRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const count = 40;

        const gavels: GavelParticle[] = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            size: Math.random() * 20 + 30,
            opacity: Math.random() * 0.3 + 0.2,
            rotation: Math.random() * Math.PI * 2,
            life: Math.random() * 400,
            scale: 1,
            hitPhase: Math.random() * Math.PI * 2,
            hitSpeed: Math.random() * 0.025 + 0.015,
        }));

        let raf: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            gavels.forEach((g) => {
                g.x += g.vx;
                g.y += g.vy;
                g.life++;
                g.hitPhase += g.hitSpeed;

                if (g.x < 0 || g.x > canvas.width) g.vx *= -1;
                if (g.y < 0 || g.y > canvas.height) g.vy *= -1;

                const swing = Math.sin(g.hitPhase) * 0.35;
                const currentRot = g.rotation + swing;

                g.scale = 1 + 0.06 * Math.sin(g.life * 0.03);
                const alpha = g.opacity * (0.8 + 0.25 * Math.sin(g.life * 0.04));

                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate(g.x, g.y);
                ctx.rotate(currentRot);
                ctx.scale(g.scale, g.scale);

                ctx.shadowBlur = 25;
                ctx.shadowColor = "rgba(212, 175, 55, 0.6)";

                if (img.complete) {
                    ctx.drawImage(img, -g.size / 2, -g.size / 2, g.size, g.size);
                }

                ctx.restore();
            });

            raf = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
        />
    );
};
