"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Participant {
    id: number;
    nombres: string;
    apellidos: string;
    dni: string;
    celular: string;
    email: string;
    fecha: string;
    voucher: string;
}

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<"overview" | "participants" | "winners">("overview");

    // Datos de ejemplo - en producción vendrían de una API
    const stats = {
        totalParticipants: 156,
        totalTickets: 234,
        activeDraws: 3,
        totalRevenue: 2340,
    };

    const participants: Participant[] = [
        {
            id: 1,
            nombres: "Carlos",
            apellidos: "Pérez",
            dni: "45874345",
            celular: "924836878",
            email: "carlos@gmail.com",
            fecha: "2025-11-28",
            voucher: "voucher001.jpg",
        },
        {
            id: 2,
            nombres: "María",
            apellidos: "González",
            dni: "45874346",
            celular: "924836879",
            email: "maria@gmail.com",
            fecha: "2025-11-27",
            voucher: "voucher002.jpg",
        },
        {
            id: 3,
            nombres: "José",
            apellidos: "Rodríguez",
            dni: "45874347",
            celular: "924836880",
            email: "jose@gmail.com",
            fecha: "2025-11-26",
            voucher: "voucher003.jpg",
        },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Dashboard Administrativo
                </h1>
                <p className="text-gray-400">Gestiona sorteos, participantes y ganadores</p>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex gap-4 border-b border-gray-700">
                <TabButton
                    active={activeTab === "overview"}
                    onClick={() => setActiveTab("overview")}
                >
                    Resumen
                </TabButton>
                <TabButton
                    active={activeTab === "participants"}
                    onClick={() => setActiveTab("participants")}
                >
                    Participantes
                </TabButton>
                <TabButton
                    active={activeTab === "winners"}
                    onClick={() => setActiveTab("winners")}
                >
                    Ganadores
                </TabButton>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {activeTab === "overview" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Participantes"
                                value={stats.totalParticipants}
                                icon="👥"
                                color="from-blue-500 to-blue-600"
                            />
                            <StatCard
                                title="Tickets Vendidos"
                                value={stats.totalTickets}
                                icon="🎫"
                                color="from-purple-500 to-purple-600"
                            />
                            <StatCard
                                title="Sorteos Activos"
                                value={stats.activeDraws}
                                icon="🎰"
                                color="from-green-500 to-green-600"
                            />
                            <StatCard
                                title="Ingresos (S/)"
                                value={stats.totalRevenue}
                                icon="💰"
                                color="from-red-500 to-red-600"
                            />
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                            <h2 className="text-xl font-bold text-white mb-4">Actividad Reciente</h2>
                            <div className="space-y-3">
                                {participants.slice(0, 3).map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-white font-medium">
                                                {p.nombres} {p.apellidos}
                                            </p>
                                            <p className="text-sm text-gray-400">{p.email}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{p.fecha}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === "participants" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Lista de Participantes</h2>
                            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                                Exportar CSV
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Nombre</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">DNI</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Celular</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map((p) => (
                                        <tr key={p.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                                            <td className="py-3 px-4 text-white">{p.id}</td>
                                            <td className="py-3 px-4 text-white">
                                                {p.nombres} {p.apellidos}
                                            </td>
                                            <td className="py-3 px-4 text-gray-300">{p.dni}</td>
                                            <td className="py-3 px-4 text-gray-300">{p.celular}</td>
                                            <td className="py-3 px-4 text-gray-300">{p.email}</td>
                                            <td className="py-3 px-4 text-gray-400 text-sm">{p.fecha}</td>
                                            <td className="py-3 px-4">
                                                <button className="text-blue-400 hover:text-blue-300 mr-3">
                                                    Ver
                                                </button>
                                                <button className="text-red-400 hover:text-red-300">
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {activeTab === "winners" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Seleccionar Ganador</h2>
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🎉</div>
                            <p className="text-gray-400 mb-6">
                                Haz clic en el botón para seleccionar un ganador aleatorio
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105">
                                Sortear Ganador
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const TabButton = ({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-2 font-medium transition-colors relative",
                active
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
            )}
        >
            {children}
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                />
            )}
        </button>
    );
};

const StatCard = ({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: number;
    icon: string;
    color: string;
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "bg-gradient-to-br p-6 rounded-lg shadow-lg",
                color
            )}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-4xl">{icon}</span>
                <div className="text-right">
                    <p className="text-white/80 text-sm">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
            </div>
        </motion.div>
    );
};
