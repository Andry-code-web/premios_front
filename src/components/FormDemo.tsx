"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnimatedHead } from "@/components/ui/AnimatedHead";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

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

export const SignUpForm = () => {
  const [focusState, setFocusState] = useState<FocusState>("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("https://premios-back-b916cb780512.herokuapp.com/api/clientes", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // Éxito
    if (res.status === 201) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Registro completado 🎉",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    // DNI duplicado
    if (res.status === 409) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Este DNI ya está registrado ⚠️",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    // Error genérico
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Ocurrió un error inesperado ❌",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };


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
            <InputWithFocus id="nombres" name="nombres" placeholder="Carlos" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="apellidos">Apellidos*</Label>
            <InputWithFocus id="apellidos" name="apellidos" placeholder="Perez" type="text" required onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>
        </div>

        {/* DNI - Celular */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="dni">DNI*</Label>
            <InputWithFocus id="dni" name="dni" placeholder="45874345" type="number" required onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="celular">Celular*</Label>
            <InputWithFocus id="celular" name="celular" placeholder="924836878" type="tel" required onFocus={handleFocus} onBlur={handleBlur} />
          </LabelInputContainer>
        </div>

        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Correo*</Label>
          <InputWithFocus id="email" name="email" placeholder="correo@gmail.com" type="email" required onFocus={handleFocus} onBlur={handleBlur} />
        </LabelInputContainer>

        {/* Voucher */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="voucher">Subir Voucher*</Label>
          <InputWithFocus id="voucher" name="voucher" type="file" required accept="image/*,.pdf" onFocus={handleFocus} onBlur={handleBlur} />
        </LabelInputContainer>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={cn(
              "mb-4 rounded-md p-3 text-sm",
              submitStatus.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            )}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white transition-opacity",
            isLoading && "cursor-not-allowed opacity-50"
          )}
        >
          {isLoading ? "Enviando..." : "Registrar →"}
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
