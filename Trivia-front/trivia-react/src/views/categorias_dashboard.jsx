import { useEffect, useState } from "react";

export default function Categorias_dashboard() {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategorias = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8000/api/categorias", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                console.log("RAW CATEGORIAS:", data);

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

                setCategorias(list);

            } catch (error) {
                console.error("Error cargando categorías:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg font-semibold text-gray-600 animate-pulse">
                    Cargando categorías...
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Categorías
            </h2>

            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="py-3 px-4 border-b">ID</th>
                            <th className="py-3 px-4 border-b">Nombre</th>
                            <th className="py-3 px-4 border-b">Descripción</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map(cat => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4 border-b">{cat.id}</td>
                                <td className="py-3 px-4 border-b">{cat.name}</td>
                                <td className="py-3 px-4 border-b">{cat.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
