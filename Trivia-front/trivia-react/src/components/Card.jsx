import { useEffect, useState } from "react";
import Card from "../components/Card";
import CreditCard from "../components/CreditCard";

function Home() {

    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalTrivias, setTotalTrivias] = useState(0);
    const [categoriaMasJugada, setCategoriaMasJugada] = useState("Cargando...");
    const [ganancias, setGanancias] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // =============== USUARIOS REGISTRADOS =================
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/usuarios", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();

                const array = data.data || data; // Laravel usa { data: [] }

                setTotalUsuarios(Array.isArray(array) ? array.length : 0);

            } catch (e) {
                console.error("Error usuarios:", e);
            }
        };

        // =============== TRIVIAS COMPLETADAS ==================
        const fetchResultados = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/resultados-trivia", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();

                const resultados = data.data || data;

                setTotalTrivias(resultados.length);
                setGanancias(resultados.length * 1000);

                // Contar categoría más jugada
                const contador = {};
                resultados.forEach(r => {
                    const cat = r.categoria?.name;
                    if (cat) contador[cat] = (contador[cat] || 0) + 1;
                });

                const masJugada = Object.entries(contador).sort((a, b) => b[1] - a[1])[0];
                setCategoriaMasJugada(masJugada ? masJugada[0] : "Sin datos");

            } catch (e) {
                console.error("Error trivias:", e);
            }
        };

        fetchUsuarios();
        fetchResultados();

    }, []);

    return (
        <div className="content-area flex-grow-1">

            <div className="row g-4">

                {/* Usuarios Registrados */}
                <div className="col-md-4">
                    <Card
                        ammount={totalUsuarios}
                        title="Usuarios Registrados"
                        percent={0}
                    />
                </div>

                {/* Trivias Completadas */}
                <div className="col-md-4">
                    <Card
                        ammount={totalTrivias}
                        title="Trivias Completadas"
                        percent={0}
                    />
                </div>

                {/* Ganancias */}
                <div className="col-md-4">
                    <Card
                        ammount={`$${ganancias}`}
                        title="Ganancias Totales"
                        percent={0}
                    />
                </div>

                {/* Categoría más jugada (usamos también Card para mantener estilo) */}
                <div className="col-md-4">
                    <Card
                        ammount={categoriaMasJugada}
                        title="Categoría Más Jugada"
                        percent={0}
                    />
                </div>

            </div>

        </div>
    );
}

export default Home;
