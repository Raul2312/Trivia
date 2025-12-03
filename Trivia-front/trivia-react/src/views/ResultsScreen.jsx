import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/resultados.css";

export default function ResultsScreen() {
  const [resultados, setResultados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("todos"); // filtro por categoría
  const [busqueda, setBusqueda] = useState("");  // filtro por nombre

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchResultados = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/resultados-trivia", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });

        const data = await res.json();
        const resultadosArray = data.data || data;
        setResultados(resultadosArray);

        // Extrae categorías únicas
        const uniqueCategorias = [...new Set(resultadosArray.map(r => r.categoria?.name))];
        setCategorias(uniqueCategorias);

      } catch (error) {
        console.error("Error cargando resultados:", error);
      }
    };

    fetchResultados();
  }, [navigate]);

  // FILTRO COMBINADO: por categoría y por nombre de usuario
  const resultadosFiltrados = resultados
    .filter(r => filtro === "todos" ? true : r.categoria?.name === filtro)
    .filter(r => r.user?.name.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="resultados-container">

      <button className="btn-regresar" onClick={() => navigate("/indexscreen")}>
        Regresar
      </button>

      <h1 className="titulo">Resultados de los Usuarios</h1>

      {/* CONTENEDOR DE FILTROS */}
      <div className="filtro-container">
        {/* FILTRO POR CATEGORÍA */}
        <select
          className="select-filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todas las categorías</option>
          {categorias.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        {/* BUSCADOR POR NOMBRE */}
        <input
          type="text"
          className="select-filtro"
          placeholder="Buscar por usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* TABLA DE RESULTADOS */}
      <table className="tabla">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Categoría</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {resultadosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="3" className="sin-datos">No hay resultados</td>
            </tr>
          ) : (
            resultadosFiltrados.map((r) => {
              // Calcula porcentaje de puntaje
              const porcentaje = r.total_preguntas && r.total_preguntas > 0
                ? ((r.puntaje / r.total_preguntas) * 100).toFixed(0)
                : 0;

              return (
                <tr key={r.id}>
                  <td>{r.user?.name || "—"}</td>
                  <td>{r.categoria?.name || "—"}</td>
                  <td>{porcentaje}%</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

    </div>
  );
}
