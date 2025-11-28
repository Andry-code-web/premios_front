"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnimatedHead } from "@/components/ui/AnimatedHead";
import { cn } from "@/lib/utils";

import type { FocusState } from "@/components/ui/AnimatedHead";

const InputWithFocus = ({ id, onFocus, onBlur, ...props }: any) => {
  return (
    <Input
      id={id}
      onFocus={() => onFocus(id)}
      onBlur={onBlur}
      {...props}
    />
  );
};

export const SignUpForm = ({ handleSubmit }: any) => {
  const [focusState, setFocusState] = useState<FocusState>("idle");

  const handleFocus = (fieldId: string) => {
    // Si el campo existe en FocusState → úsalo
    const validFields: FocusState[] = [
      "idle",
      "nombres",
      "apellidos",
      "dni",
      "celular",
      "email",
      "voucher",
      "password",
      "error"
    ];

    if (validFields.includes(fieldId as FocusState)) {
      setFocusState(fieldId as FocusState);
    } else {
      setFocusState("idle");
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const next = e.relatedTarget as HTMLElement | null;
    if (next && next.tagName === "INPUT") {
      return;
    }
    setFocusState("idle");
  };

  return (
    <div className="shadow-input w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Registra tu Voucher
      </h2>

      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Ingresa tus datos para comunicarnos en caso salgas ganador.
      </p>

      <AnimatedHead focusState={focusState} />

      <form className="my-4" onSubmit={handleSubmit}>

        {/* Nombres - Apellidos */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="nombres">Nombres*</Label>
            <InputWithFocus id="nombres" name="nombres" placeholder="Carlos" type="text" onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="apellidos">Apellidos*</Label>
            <InputWithFocus id="apellidos" name="apellidos" placeholder="Perez" type="text" onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>
        </div>

        {/* DNI - Celular */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="dni">DNI*</Label>
            <InputWithFocus id="dni" name="dni" placeholder="45874345" type="number" onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="celular">Celular*</Label>
            <InputWithFocus id="celular" name="celular" placeholder="924836878" type="tel" onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>
        </div>

        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Correo*</Label>
          <InputWithFocus id="email" name="email" placeholder="correo@gmail.com" type="email" onFocus={handleFocus} onBlur={handleBlur} />
        </LabelInputContainer>

        {/* Voucher */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="voucher">Subir Voucher*</Label>
          <InputWithFocus id="voucher" name="voucher" type="file" onFocus={handleFocus} onBlur={handleBlur} />
        </LabelInputContainer>

        <button type="submit" className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white">
          Registrar →
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const LabelInputContainer = ({ children, className }: any) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition group-hover/btn:opacity-100" />
  </>
);
