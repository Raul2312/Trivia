import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/resultados.css";

export default function ResultsScreen() {

  const [resultados, setResultados] = useState([]);
  const [categorias, setCategorias] = useState([]);     // ← categorías para el filtro
  const [filtro, setFiltro] = useState("todos");        // ← valor seleccionado

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
        setResultados(data);

        // Sacamos categorías únicas para el select
        const uniqueCategorias = [...new Set(data.map(r => r.categoria?.name))];
        setCategorias(uniqueCategorias);

      } catch (error) {
        console.error("Error cargando resultados:", error);
      }
    };

    fetchResultados();
  }, []);

  // Filtrar sin borrar el select
  const resultadosFiltrados =
    filtro === "todos"
      ? resultados
      : resultados.filter(r => r.categoria?.name === filtro);

  return (
    <div className="resultados-container">

      {/* Botón regresar */}
      <button className="btn-regresar" onClick={() => navigate("/indexscreen")}>
        Regresar
      </button>

      <h1 className="titulo">Resultados de los Usuarios</h1>

      {/* FILTRO (no mueve nada) */}
      <div className="filtro-container">
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
      </div>

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
              const porcentaje =
                r.total_preguntas && r.total_preguntas > 0
                  ? ((r.puntaje / r.total_preguntas) * 100).toFixed(0)
                  : 0;

              return (
                <tr key={r.id}>
                  <td>{r.user?.name}</td>
                  <td>{r.categoria?.name}</td>
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

