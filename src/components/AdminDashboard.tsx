"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface Cliente {
    id: number;
    nombres: string;
    apellidos: string;
    dni: string;
    celular: string;
    email: string;
    fecha_registro: string;
    voucher: string;
}

interface Sorteo {
    id: number;
    nombre: string;
    descripcion: string;
    metodo_pago: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
}

interface Ticket {
    id: number;
    codigo_ticket: string;
    cliente_id: number;
    sorteo_id: number;
    monto: number;
    metodo_pago: string;
    fecha_compra: string;
    nombres: string;
    apellidos: string;
    dni: string;
    sorteo_nombre: string;
}

interface Premio {
    id: number;
    nombre: string;
    imagen_1: string;
    created_at: string;
    monto?: number; // opcional, evita errores si no existe
    fecha?: string; // opcional
}

const API_URL = "https://premios-back-b916cb780512.herokuapp.com/api";

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<"overview" | "participants" | "assign" | "premios" | "tickets">("overview");
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [sorteos, setSorteos] = useState<Sorteo[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [premios, setPremios] = useState<Premio[]>([]);
    const [loading, setLoading] = useState(false);
    const [creatingPremio, setCreatingPremio] = useState(false);
    const [premioMessage, setPremioMessage] = useState<string | null>(null);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const [showVoucher, setShowVoucher] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        loadClientes();
        loadSorteos();
        loadTickets();
        loadPremios();
    }, []);

    const loadPremios = async () => {
        try {
            const response = await fetch(`${API_URL}/premios`);
            const data = await response.json();
            setPremios(data);
        } catch (error) {
            console.error("Error al cargar premios:", error);
        }
    };

    const loadClientes = async () => {
        try {
            const response = await fetch(`${API_URL}/clientes`);
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
        }
    };

    const loadSorteos = async () => {
        try {
            const response = await fetch(`${API_URL}/sorteos`);
            const data = await response.json();
            setSorteos(data);
        } catch (error) {
            console.error("Error al cargar sorteos:", error);
        }
    };

    const loadTickets = async () => {
        try {
            const response = await fetch(`${API_URL}/tickets`);
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error("Error al cargar tickets:", error);
        }
    };

    const stats = {
        totalParticipants: clientes.length,
        totalTickets: tickets.length,
        activeDraws: sorteos.filter(s => s.estado === 'activo').length,
        totalRevenue: tickets.reduce((sum, t) => sum + parseFloat(t.monto.toString()), 0),
    };

    // Nueva función para crear premio usando multipart/form-data
    const createPremio = async (formData: FormData) => {
        setCreatingPremio(true);
        setPremioMessage(null);
        try {
            const res = await fetch(`${API_URL}/premios`, {
                method: "POST",
                // NO setear Content-Type; el navegador lo añade por FormData
                body: formData,
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) {
                const err = json.error || json.message || res.statusText;
                setPremioMessage(`❌ ${err}`);
                throw new Error(err);
            }
            setPremioMessage(`✅ Premio creado (id: ${json.id ?? "desconocido"})`);
            // recargar lista de premios
            await loadPremios();
            return json;
        } catch (err: any) {
            console.error("Error creando premio:", err);
            if (!premioMessage) setPremioMessage("❌ Error al crear premio");
            throw err;
        } finally {
            setCreatingPremio(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Dashboard Administrativo
                </h1>
                <p className="text-gray-400">Gestiona sorteos, participantes y tickets</p>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex gap-4 border-b border-gray-700 overflow-x-auto">
                <TabButton
                    active={activeTab === "overview"}
                    onClick={() => setActiveTab("overview")}
                >
                    📊 Resumen
                </TabButton>
                <TabButton
                    active={activeTab === "participants"}
                    onClick={() => setActiveTab("participants")}
                >
                    👥 Participantes
                </TabButton>
                <TabButton
                    active={activeTab === "assign"}
                    onClick={() => setActiveTab("assign")}
                >
                    🎫 Asignar Tickets
                </TabButton>
                <TabButton
                    active={activeTab === "tickets"}
                    onClick={() => setActiveTab("tickets")}
                >
                    📋 Tickets Asignados
                </TabButton>

                {/* NUEVA pestaña Premios */}
                <TabButton
                    active={activeTab === "premios"}
                    onClick={() => setActiveTab("premios")}
                >
                    🏆 Premios
                </TabButton>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {activeTab === "overview" && (
                    <OverviewTab stats={stats} clientes={clientes} />
                )}

                {activeTab === "participants" && (
                    <ParticipantsTab
                        clientes={clientes}
                        onViewVoucher={(cliente) => {
                            setSelectedCliente(cliente);
                            setShowVoucher(true);
                        }}
                    />
                )}

                {activeTab === "assign" && (
                    <AssignTicketsTab
                        clientes={clientes}
                        sorteos={sorteos}
                        onTicketAssigned={() => {
                            loadTickets();
                            setActiveTab("tickets");
                        }}
                    />
                )}

                {activeTab === "tickets" && (
                    <TicketsTab tickets={tickets} />
                )}

                {activeTab === "premios" && (
                    <PremiosTab premios={premios} onCreatePremio={createPremio} creating={creatingPremio} message={premioMessage} />
                )}
            </div>

            {/* Modal para ver voucher */}
            <AnimatePresence>
                {showVoucher && selectedCliente && (
                    <VoucherModal
                        cliente={selectedCliente}
                        onClose={() => {
                            setShowVoucher(false);
                            setSelectedCliente(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Tab Overview
const OverviewTab = ({ stats, clientes }: { stats: any; clientes: Cliente[] }) => (
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
                title="Tickets Asignados"
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
                value={stats.totalRevenue.toFixed(2)}
                icon="💰"
                color="from-red-500 to-red-600"
            />
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Registros Recientes</h2>
            <div className="space-y-3">
                {clientes.slice(0, 5).map((c) => (
                    <div
                        key={c.id}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                    >
                        <div>
                            <p className="text-white font-medium">
                                {c.nombres} {c.apellidos}
                            </p>
                            <p className="text-sm text-gray-400">{c.email}</p>
                        </div>
                        <span className="text-xs text-gray-500">
                            {new Date(c.fecha_registro).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
);

// Tab Participantes
const ParticipantsTab = ({
    clientes,
    onViewVoucher
}: {
    clientes: Cliente[];
    onViewVoucher: (cliente: Cliente) => void;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
    >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Lista de Participantes</h2>
            <span className="text-gray-400">{clientes.length} registrados</span>
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
                    {clientes.map((c) => (
                        <tr key={c.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                            <td className="py-3 px-4 text-white">{c.id}</td>
                            <td className="py-3 px-4 text-white">
                                {c.nombres} {c.apellidos}
                            </td>
                            <td className="py-3 px-4 text-gray-300">{c.dni}</td>
                            <td className="py-3 px-4 text-gray-300">{c.celular}</td>
                            <td className="py-3 px-4 text-gray-300">{c.email}</td>
                            <td className="py-3 px-4 text-gray-400 text-sm">
                                {new Date(c.fecha_registro).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() => onViewVoucher(c)}
                                    className="text-blue-400 hover:text-blue-300 mr-3"
                                >
                                    Ver Voucher
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </motion.div>
);

// Tab Asignar Tickets
const AssignTicketsTab = ({
    clientes,
    sorteos,
    onTicketAssigned
}: {
    clientes: Cliente[];
    sorteos: Sorteo[];
    onTicketAssigned: () => void;
}) => {
    const [selectedClienteId, setSelectedClienteId] = useState("");
    const [selectedSorteoId, setSelectedSorteoId] = useState("");
    const [monto, setMonto] = useState("");
    const [metodoPago, setMetodoPago] = useState<"yape" | "plin" | "otros">("yape");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [codigoTicket, setCodigoTicket] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setCodigoTicket("");

        try {
            const response = await fetch(`${API_URL}/tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cliente_id: parseInt(selectedClienteId),
                    sorteo_id: parseInt(selectedSorteoId),
                    monto: parseFloat(monto),
                    metodo_pago: metodoPago,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setCodigoTicket(data.codigo_ticket);
                setMessage(`✅ ${data.message}`);
                // Reset form
                setSelectedClienteId("");
                setSelectedSorteoId("");
                setMonto("");
                setMetodoPago("yape");
                // Notify parent
                setTimeout(() => {
                    onTicketAssigned();
                }, 2000);
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage("❌ Error al asignar ticket");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 max-w-2xl mx-auto"
        >
            <h2 className="text-xl font-bold text-white mb-6">Asignar Ticket a Cliente</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Seleccionar Cliente */}
                <div>
                    <label className="block text-gray-300 mb-2">Cliente</label>
                    <select
                        value={selectedClienteId}
                        onChange={(e) => setSelectedClienteId(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    >
                        <option value="">Seleccionar cliente...</option>
                        {clientes.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.nombres} {c.apellidos} - DNI: {c.dni}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Seleccionar Sorteo */}
                <div>
                    <label className="block text-gray-300 mb-2">Sorteo</label>
                    <select
                        value={selectedSorteoId}
                        onChange={(e) => setSelectedSorteoId(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    >
                        <option value="">Seleccionar sorteo...</option>
                        {sorteos.filter(s => s.estado === 'activo').map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.nombre} - {s.estado}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Monto */}
                <div>
                    <label className="block text-gray-300 mb-2">Monto (S/)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        required
                        placeholder="10.00"
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                    />
                </div>

                {/* Método de Pago */}
                <div>
                    <label className="block text-gray-300 mb-2">Método de Pago</label>
                    <div className="flex gap-4">
                        {["yape", "plin", "otros"].map((metodo) => (
                            <label key={metodo} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="metodo_pago"
                                    value={metodo}
                                    checked={metodoPago === metodo}
                                    onChange={(e) => setMetodoPago(e.target.value as any)}
                                    className="text-red-600"
                                />
                                <span className="text-white capitalize">{metodo}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Código de Ticket Generado */}
                {codigoTicket && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <label className="block text-green-300 mb-2 font-semibold">✅ Código de Ticket Generado</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={codigoTicket}
                                readOnly
                                className="flex-1 px-4 py-3 bg-gray-900 text-green-400 font-mono text-lg rounded-lg border border-green-500/50 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(codigoTicket);
                                    alert("Código copiado al portapapeles");
                                }}
                                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                                📋 Copiar
                            </button>
                        </div>
                    </div>
                )}

                {/* Message */}
                {message && (
                    <div className={cn(
                        "p-4 rounded-lg",
                        message.includes("✅") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                    )}>
                        {message}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Asignando..." : "Asignar Ticket"}
                </button>
            </form>
        </motion.div>
    );
};

// Tab Tickets
const TicketsTab = ({ tickets }: { tickets: Ticket[] }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
    >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Tickets Asignados</h2>
            <span className="text-gray-400">{tickets.length} tickets</span>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Código</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Cliente</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">DNI</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Sorteo</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Monto</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Método</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((t) => (
                        <tr key={t.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                            <td className="py-3 px-4 text-white font-mono text-sm">{t.codigo_ticket}</td>
                            <td className="py-3 px-4 text-white">
                                {t.nombres} {t.apellidos}
                            </td>
                            <td className="py-3 px-4 text-gray-300">{t.dni}</td>
                            <td className="py-3 px-4 text-gray-300">{t.sorteo_nombre}</td>
                            <td className="py-3 px-4 text-green-400">S/ {parseFloat(t.monto.toString()).toFixed(2)}</td>
                            <td className="py-3 px-4 text-gray-300 capitalize">{t.metodo_pago}</td>
                            <td className="py-3 px-4 text-gray-400 text-sm">
                                {new Date(t.fecha_compra).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </motion.div>
);

// Reemplazo del componente PremiosTab para incluir formulario de subida
const PremiosTab = ({
    premios,
    onCreatePremio,
    creating,
    message
}: {
    premios: Premio[];
    onCreatePremio: (fd: FormData) => Promise<any>;
    creating?: boolean;
    message?: string | null;
}) => {
    const [nombre, setNombre] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loadingLocal, setLoadingLocal] = useState(false);
    const [localMsg, setLocalMsg] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalMsg(null);

        if (!nombre) return setLocalMsg("El nombre es obligatorio");
        if (!file) return setLocalMsg("La imagen es obligatoria");

        const fd = new FormData();
        fd.append("nombre", nombre);
        // Ajusta el nombre del campo 'file' si tu backend espera otro (e.g., 'imagen')
        fd.append("imagen_1", file);

        try {
            setLoadingLocal(true);
            await onCreatePremio(fd);
            setNombre("");
            setFile(null);
            setPreview(null);
            setLocalMsg("✅ Premio creado correctamente");
        } catch (err) {
            setLocalMsg("❌ Error al crear premio");
        } finally {
            setLoadingLocal(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Premios</h2>
                <span className="text-gray-400">{premios.length} premios</span>
            </div>

            {/* Formulario para crear premio */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-2xl">
                <div>
                    <label className="block text-gray-300 mb-2">Nombre del premio</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                        placeholder="Nombre del premio"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Imagen</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="w-full text-sm text-gray-300"
                    />
                </div>

                {preview && (
                    <div>
                        <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                )}

                {(localMsg || message) && (
                    <div className={cn(
                        "p-3 rounded",
                        (localMsg || message || "").includes("✅") ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"
                    )}>
                        {localMsg || message}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loadingLocal || creating}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        {loadingLocal || creating ? "Subiendo..." : "Crear Premio"}
                    </button>
                </div>
            </form>

            {/* Tabla de premios (contenido existente adaptado a campos opcionales) */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Nombre</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Imagen</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Monto</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {premios.map((p) => (
                            <tr key={p.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                                <td className="py-3 px-4 text-white font-mono text-sm">{p.nombre}</td>
                                <td className="py-3 px-4 text-white">
                                    <img
                                        src={`data:image/jpeg;base64,${p.imagen_1}`}
                                        alt="Premio"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-4 text-green-400">
                                    {typeof p.monto !== "undefined" ? `S/ ${parseFloat(p.monto.toString()).toFixed(2)}` : "—"}
                                </td>
                                <td className="py-3 px-4 text-gray-400 text-sm">
                                    {p.created_at ? new Date(p.created_at).toLocaleString() : (p.fecha ? new Date(p.fecha).toLocaleString() : "—")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

// Modal Voucher
const VoucherModal = ({ cliente, onClose }: { cliente: Cliente; onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                    Voucher de {cliente.nombres} {cliente.apellidos}
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white text-2xl"
                >
                    ×
                </button>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
                {cliente.voucher ? (
                    <img
                        src={`data:image/jpeg;base64,${cliente.voucher}`}
                        alt="Voucher"
                        className="w-full h-auto rounded"
                    />
                ) : (
                    <p className="text-gray-400 text-center py-8">No hay voucher disponible</p>
                )}
            </div>
            <div className="mt-4 text-sm text-gray-400">
                <p><strong>DNI:</strong> {cliente.dni}</p>
                <p><strong>Email:</strong> {cliente.email}</p>
                <p><strong>Celular:</strong> {cliente.celular}</p>
            </div>
        </motion.div>
    </motion.div>
);

// Components auxiliares
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
                "px-4 py-2 font-medium transition-colors relative whitespace-nowrap",
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
    value: number | string;
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
