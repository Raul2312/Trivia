import { useEffect, useState } from "react";

export default function Preguntas_dashboard() {

    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPreguntas = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8000/api/preguntas", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                console.log("RAW PREGUNTAS:", data);

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

                setPreguntas(list);

            } catch (error) {
                console.error("Error cargando preguntas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreguntas();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg font-semibold text-gray-600 animate-pulse">
                    Cargando preguntas...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Preguntas
            </h2>

            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="py-3 px-4 border-b">ID</th>
                            <th className="py-3 px-4 border-b">Pregunta</th>
                            <th className="py-3 px-4 border-b">Categoría ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {preguntas.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4 border-b">{p.id}</td>
                                <td className="py-3 px-4 border-b">{p.pregunta}</td>
                                <td className="py-3 px-4 border-b">{p.categoria_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
