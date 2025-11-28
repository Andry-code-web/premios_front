"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
  NavTitle,
} from "@/components/ui/resizable-navbar";
import { ColourfulText } from "@/components/ui/colourful-text";

const navItems = [
  { name: "Inicio", link: "/" },
  { name: "Premios", link: "/#premios" },
  { name: "Ganadores", link: "/#ganadores" },
  { name: "Mis Tickets", link: "/mis-tickets" },
];

export function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavTitle className="text-2xl md:text-xl lg:text-2xl font-bold text-center relative z-2 font-sans">
          <ColourfulText text="Premios Cleosaki" />
        </NavTitle>
        <NavItems items={navItems} />
        <div className="ml-auto flex items-center gap-2">
          <NavbarButton href="/buy-tickets" variant="gradient">
            Comprar Tickets
          </NavbarButton>
        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavTitle className="text-2xl md:text-xl lg:text-2xl font-bold text-center relative z-2 font-sans">
            <ColourfulText text="Premios Cleosaki" />
          </NavTitle>
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
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            href="/buy-tickets"
            variant="gradient"
            className="w-full mt-4"
          >
            Comprar Tickets
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
