import { useEffect, useState } from "react";

export default function Trivias_dashboard() {

    const [trivias, setTrivias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTrivias = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8000/api/trivia", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                console.log("RAW TRIVIAS:", data);

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

                setTrivias(list);

            } catch (error) {
                console.error("Error cargando trivias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrivias();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg font-semibold text-gray-600 animate-pulse">
                    Cargando trivias...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Trivias Jugadas
            </h2>

            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="py-3 px-4 border-b">ID</th>
                            <th className="py-3 px-4 border-b">Fecha</th>
                            <th className="py-3 px-4 border-b">Puntaje</th>
                            <th className="py-3 px-4 border-b">Tiempo Total</th>
                            <th className="py-3 px-4 border-b">User ID</th>
                            <th className="py-3 px-4 border-b">Categoria ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trivias.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4 border-b">{t.id}</td>
                                <td className="py-3 px-4 border-b">{t.fecha}</td>
                                <td className="py-3 px-4 border-b">{t.puntaje}</td>
                                <td className="py-3 px-4 border-b">{t.tiempo_total} seg</td>
                                <td className="py-3 px-4 border-b">{t.user_id}</td>
                                <td className="py-3 px-4 border-b">{t.categoria_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
