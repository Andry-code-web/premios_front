import React from 'react';
import { clsx } from 'clsx';
import '../../styles/AnimatedHead.css'; // Importa el CSS para animaciones complejas si las usas
import '../../../public/mosaico.png';

// Define los posibles estados de interacción del personaje
export type FocusState = 'idle' | 'nombres' | 'apellidos' | 'dni' | 'celular' | 'email' | 'voucher' | 'password' | 'error'; // Agregamos 'password' para simular ojos cubiertos


interface AnimatedHeadProps {
    focusState: FocusState;
}

export const AnimatedHead: React.FC<AnimatedHeadProps> = ({ focusState }) => {

    // Define si el mono está en reposo (idle) para activar el parpadeo
    const isIdle = focusState === 'idle';

    // Clases dinámicas para la cabeza principal (rotación, inclinación)
    const headClasses = clsx(
        'transition-transform duration-300 ease-in-out',
        {
            'transform translate-x-0 rotate-0': isIdle,
            'transform translate-x-[-15px] rotate-[-5deg]': focusState === 'nombres',
            'transform translate-x-[15px] rotate-[5deg]': focusState === 'apellidos',
            'transform translate-y-[10px] scale-95': focusState === 'dni',
            'transform translate-x-[-10px] translate-y-[5px] rotate-[-3deg]': focusState === 'celular',
            'transform translate-x-[10px] translate-y-[5px] rotate-[3deg]': focusState === 'email',
            'transform translate-y-[15px] scale-105': focusState === 'voucher',
            'transform translate-y-[-5px]': focusState === 'password',
            'animate-shake': focusState === 'error',
        }
    );

    // Ocultar los ojos (círculos negros) cuando se enfoca 'password' O aplicar parpadeo
    const eyePupilsVisibility = clsx(
        'transition-opacity duration-150',
        {
            // Oculta completamente si es password (manos tapándose)
            'opacity-0': focusState === 'password',
            // Aplica el parpadeo si está en estado idle
            'monkey-blinking-eyes': isIdle,
        }
    );

    // Clases para los rectángulos de ojos cerrados
    const closedEyesClasses = clsx(
        'transition-opacity duration-150',
        {
            'opacity-100': focusState === 'password',
            'opacity-0': focusState !== 'password'
        }
    );

    return (
        <div className="py-6 h-48 w-48 flex justify-center mx-auto">

            {/* SVG del Mono (Cabeza) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                viewBox="0 0 64 64"
                id="monkey"
                className={headClasses}
            >
                {/* ... (Partes estáticas del mono: Orejas, contorno de la cara) ... */}
                <ellipse cx="53.7" cy="33" rx="8.3" ry="8.2" fill="#89664c"></ellipse>
                <ellipse cx="53.7" cy="33" rx="5.4" ry="5.4" fill="#ffc5d3"></ellipse>
                <ellipse cx="10.2" cy="33" rx="8.2" ry="8.2" fill="#89664c"></ellipse>
                <ellipse cx="10.2" cy="33" rx="5.4" ry="5.4" fill="#ffc5d3"></ellipse>
                <g fill="#89664c">
                    <path d="m43.4 10.8c1.1-.6 1.9-.9 1.9-.9-3.2-1.1-6-1.8-8.5-2.1 1.3-1 2.1-1.3 2.1-1.3-20.4-2.9-30.1 9-30.1 19.5h46.4c-.7-7.4-4.8-12.4-11.8-15.2"></path>
                    <path d="m55.3 27.6c0-9.7-10.4-17.6-23.3-17.6s-23.3 7.9-23.3 17.6c0 2.3.6 4.4 1.6 6.4-1 2-1.6 4.2-1.6 6.4 0 9.7 10.4 17.6 23.3 17.6s23.3-7.9 23.3-17.6c0-2.3-.6-4.4-1.6-6.4 1-2 1.6-4.2 1.6-6.4"></path>
                </g>
                <path d="m52 28.2c0-16.9-20-6.1-20-6.1s-20-10.8-20 6.1c0 4.7 2.9 9 7.5 11.7-1.3 1.7-2.1 3.6-2.1 5.7 0 6.1 6.6 11 14.7 11s14.7-4.9 14.7-11c0-2.1-.8-4-2.1-5.7 4.4-2.7 7.3-7 7.3-11.7" fill="#e0ac7e"></path>

                {/* NARIZ Y BOCA */}
                <g fill="#3b302a">
                    <path d="m35.1 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.6.1 1 1 1 2.1"></path>
                    <path d="m30.9 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.5.1 1 1 1 2.1"></path>
                </g>

                {/* OJOS ABIERTOS (APLICACIÓN DEL PARPADEO) */}
                <g fill="#3b302a" className={eyePupilsVisibility}>
                    <ellipse cx="40.7" cy="31.7" rx="3.5" ry="4.5" className="monkey-eye-r"></ellipse>
                    <ellipse cx="23.3" cy="31.7" rx="3.5" ry="4.5" className="monkey-eye-l"></ellipse>
                </g>

                {/* OJOS CERRADOS (SIMULACIÓN DE PASSWORD) */}
                <rect
                    x="20" y="28" width="8" height="2" fill="#89664C"
                    className={closedEyesClasses}
                />
                <rect
                    x="37" y="28" width="8" height="2" fill="#89664C"
                    className={closedEyesClasses}
                />
            </svg>
        </div>
    );
};