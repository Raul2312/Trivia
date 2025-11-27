import { useEffect, useState } from "react";

export default function Respuestas_dashboard() {

    const [respuestas, setRespuestas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRespuestas = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8000/api/respuestas", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                console.log("RAW RESPUESTAS:", data);

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

                setRespuestas(list);

            } catch (error) {
                console.error("Error cargando respuestas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRespuestas();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg font-semibold text-gray-600 animate-pulse">
                    Cargando respuestas...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Respuestas
            </h2>

            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="py-3 px-4 border-b">ID</th>
                            <th className="py-3 px-4 border-b">Respuesta</th>
                            <th className="py-3 px-4 border-b">Correcta</th>
                            <th className="py-3 px-4 border-b">Pregunta ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {respuestas.map(r => (
                            <tr key={r.id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4 border-b">{r.id}</td>
                                <td className="py-3 px-4 border-b">{r.respuesta}</td>
                                <td className="py-3 px-4 border-b">
                                    {r.es_correcto ? "✔️" : "❌"}
                                </td>
                                <td className="py-3 px-4 border-b">{r.pregunta_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
