import { useEffect, useState } from 'react';

function Home() {

    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalTrivias, setTotalTrivias] = useState(0);
    const [categoriaMasJugada, setCategoriaMasJugada] = useState("Cargando...");
    const [ganancias, setGanancias] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // ============================================================
        // Obtener total de usuarios
        // ============================================================
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();

                // data.data contiene los usuarios, igual que en Users.jsx
                setTotalUsuarios((data.data?.length) || 0);

            } catch (e) {
                console.error(e);
            }
        };

        // ============================================================
        // Obtener resultados de las trivias
        // ============================================================
        const fetchResultados = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/resultados-trivia", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                const resultados = data.data || data;

                setTotalTrivias(resultados.length);
                setGanancias(resultados.length * 1000);

                // Calcular categoría más jugada
                const contador = {};
                resultados.forEach(r => {
                    const cat = r.categoria?.name;
                    if (cat) contador[cat] = (contador[cat] || 0) + 1;
                });

                const catOrdenada = Object.entries(contador).sort((a, b) => b[1] - a[1])[0];
                setCategoriaMasJugada(catOrdenada ? catOrdenada[0] : "Sin datos");

            } catch (e) {
                console.error(e);
            }
        };

        fetchUsuarios();
        fetchResultados();

    }, []);

    return (
        <div className="content-area flex-grow-1 p-4">

            <h2 className="fw-bold mb-4">Dashboard General</h2>

            <div className="row g-4">

                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold">Usuarios Registrados</h6>
                        <p className="fs-3">{totalUsuarios}</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold">Trivias Completadas</h6>
                        <p className="fs-3">{totalTrivias}</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold">Categoría Más Jugada</h6>
                        <p className="fs-5">{categoriaMasJugada}</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold">Ganancias Totales</h6>
                        <p className="fs-3">${ganancias}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
