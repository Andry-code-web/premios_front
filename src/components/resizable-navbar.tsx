"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

import { LayoutGridDemo } from "@/components/layout-gridDemo";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ColourfulTextDemo } from "@/components/colourful-textDemo";
import ColourfulText from "@/components/ui/colourful-text";


export function NavbarDemo() {
  const navItems = [
    {
      name: "Inicio",
      link: "/",
    },
    {
      name: "Ver premios",
      link: "/#premios",
    },
    {
      name: "Mis tickets",
      link: "/mis-tickets",
    },
    {
      name: "Ganadores",
      link: "/#ganadores",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <h1 className="text-2xl md:text-xl lg:text-2xl font-bold text-center text-white relative z-2 font-sans">
            <ColourfulText text="Premios Cleosaki" />
          </h1>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="gradient">Chat con Cami</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <DummyContent />

      {/* Navbar */}
    </div>
  );
}

const words = `Los mejores sorteos y premios estan a tu alcance.`;
const words2 = `Inscríbete para ser ganador de grandes premios semana a semana, con tan solo S/ 10 al mes. Recibe la Revista REMATES PERU todos los Martes`;

const DummyContent = () => {
  return (
    <div className="w-[90%] mx-auto p-8 pt-5 flex justify-center items-center">
      <div className="w-1/4">

        <h1 className="text-center">
          <TextGenerateEffect words={words} variant="title" />
        </h1>

        <TextGenerateEffect words={words2} variant="subtitle" />

      </div>
      <div className="w-3/5">
        <LayoutGridDemo />
      </div>
    </div>
  );
};