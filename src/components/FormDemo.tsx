"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";

export function SignupFormDemo() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="shadow-input w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Registra tu Voucher
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Ingresa tus datos para comunicarnos en caso salgas ganador.
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="nombres">Nombres*</Label>
                        <Input id="nombres" name="nombres" placeholder="Carlos" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="apellidos">Apellidos*</Label>
                        <Input id="apellidos" name="apellidos" placeholder="Perez" type="text" />
                    </LabelInputContainer>
                </div>

                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="dni">DNI*</Label>
                        <Input id="dni" name="dni" placeholder="45874345" type="number" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="celular">Celular*</Label>
                        <Input id="celular" name="celular" placeholder="924836878" type="tel" />
                    </LabelInputContainer>
                </div>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Correo*</Label>
                    <Input id="email" name="email" placeholder="projectmayhem@gmail.com" type="email" />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="voucher">Subir Voucher*</Label>
                    <Input id="voucher" name="voucher" type="file" />
                </LabelInputContainer>

                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                >
                    Registrar &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
}


const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
