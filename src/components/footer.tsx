"user client";
import React from "react";

export function Footer() {
    return (
        <footer className="w-full" style={{ borderRadius: "0.5rem" }}>
            <div className="flex min-h-full w-full items-center justify-center">
                <div
                    className="relative w-full overflow-hidden border-t border-neutral-100 bg-black px-8 py-20 dark:border-white/[0.1] dark:bg-neutral-950"
                >
                    <div
                        className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8"
                    >
                        <div>
                            <div className="mr-0 mb-4 md:mr-4 md:flex">
                                <a
                                    className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
                                    href="/"
                                >
                                    <img
                                        alt="logo"
                                        width="30"
                                        height="30"
                                        src="https://assets.aceternity.com/logo-dark.png"
                                    />
                                    <span className="font-medium text-black dark:text-white">
                                        DevStudio
                                    </span>
                                </a>
                            </div>
                            <div className="mt-2 ml-2">
                                © copyright Premios Cleosaki 2023.
                            </div>
                        </div>
                        <div
                            className="mt-10 grid grid-cols-2 items-start gap-10 sm:mt-0 md:mt-0 lg:grid-cols-4"
                        >
                            <div className="flex w-full flex-col justify-center space-y-4">
                                <p
                                    className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300"
                                >
                                    Paginas
                                </p>
                                <ul
                                    className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300"
                                >
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Inicio
                                        </a>
                                    </li>
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Premios
                                        </a>
                                    </li>
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Ganadores
                                        </a>
                                    </li>
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Mis tickets
                                        </a>
                                    </li>
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Comprar tickets
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <p
                                    className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300"
                                >
                                    Redes sociales
                                </p>
                                <ul
                                    className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300"
                                >
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <p
                                    className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300"
                                >
                                    Legal
                                </p>
                                <ul
                                    className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300"
                                >
                                    <li className="list-none">
                                        <a
                                            className="hover:text-text-neutral-800 transition-colors"
                                            href="#"
                                        >
                                            Terminos y condiciones
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p
                        className="inset-x-0 mt-20 bg-gradient-to-b from-neutral-500 to-neutral-900 bg-clip-text text-center text-5xl font-bold text-transparent md:text-9xl lg:text-[12rem] xl:text-[13rem] dark:from-neutral-950 dark:to-neutral-800"
                    >
                        Premios Cleosaki
                    </p>
                </div>
            </div>
        </footer>
    );
}