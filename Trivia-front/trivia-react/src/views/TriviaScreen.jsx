import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../css/triviaScreen.css";

export default function TriviaScreen() {
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializamos navigate
  const [categoria, setCategoria] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [index, setIndex] = useState(0);
  const [seleccionId, setSeleccionId] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // 1. RECUPERAR EL TOKEN DEL LOCAL STORAGE
    const token = localStorage.getItem("token");

    // Si no hay token, redirigir inmediatamente al login (asumo que tu login es "/")
    if (!token) {
      navigate("/");
      return;
    }

    // 2. AÑADIR LAS CABECERAS CON EL TOKEN A LA PETICIÓN
    fetch(`http://localhost:8000/api/categorias/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // CLAVE: ADJUNTAR EL TOKEN EN FORMATO BEARER
        'Authorization': `Bearer ${token}` 
      }
    })
      .then((res) => {
        // MANEJAR LA REDIRECCIÓN SI EL TOKEN ES INVÁLIDO O EXPIRÓ (401)
        if (res.status === 401) {
          console.error("Token expirado o inválido. Redirigiendo al login.");
          localStorage.removeItem("token");
          navigate("/");
          // Lanzamos un error para detener la cadena .then()
          throw new Error('Unauthorized'); 
        }
        return res.json();
      })
      .then((json) => {
        const cat = json?.data ?? json;
        if (!mounted) return;

        setCategoria(cat);

        // ... (El resto de tu lógica de normalización de preguntas se mantiene igual)
        const rawPregs = cat?.preguntas ?? cat?.trivias ?? [];
        const normalized = rawPregs.map((p) => {
          const rawRes = p.respuestas ?? p.opciones ?? [];
          const res = rawRes.map((r, i) => {
            if (typeof r === "string") {
              return { id: `${p.id}-${i}`, texto: r, es_correcto: false };
            }
            return {
              id: r.id ?? `${p.id}-${i}`,
              texto: r.respuesta ?? r.texto ?? r.opcion ?? "",
              es_correcto: r.es_correcto ?? r.es_correcta ?? false,
            };
          });
          return {
            id: p.id,
            pregunta: p.pregunta,
            respuestas: res,
          };
        });

        setPreguntas(normalized);
      })
      .catch((err) => {
         // Solo mostramos errores si no es la redirección por falta de autorización
         if (err.message !== 'Unauthorized') {
             console.error("Error al obtener la categoría:", err);
             setCategoria(null);
             setPreguntas([]);
         }
      })
      .finally(() => setLoading(false));

    return () => (mounted = false);
  }, [id, navigate]); // Añadimos 'navigate' a las dependencias

  // ... (El resto del componente, funciones seleccionar, if loading/finalizado, y return JSX se mantienen igual)
  
  const seleccionar = (respuesta) => {
    // ... (Tu función seleccionar no cambia)
    if (bloqueado) return;
    setSeleccionId(respuesta.id);
    setBloqueado(true);

    if (respuesta.es_correcto) {
      setPuntaje((s) => s + 1);
    }

    setTimeout(() => {
      if (index + 1 < preguntas.length) {
        setIndex((i) => i + 1);
        setSeleccionId(null);
        setBloqueado(false);
      } else {
        setFinalizado(true);
      }
    }, 900);
  };

  if (loading) return <div className="loading">Cargando preguntas...</div>;

  if (!categoria || preguntas.length === 0)
    return <div className="loading">No hay preguntas disponibles.</div>;

  if (finalizado) {
    return (
      <div className="trivia-container fade-in">
        <h1 className="title">{categoria.name}</h1>
        <div className="final-box">
          <h2>Resultado Final</h2>
          <p className="final-score">
            Puntaje: <strong>{puntaje}</strong> / {preguntas.length}
          </p>
          <button className="btn-next" onClick={() => window.location.reload()}>
            Volver a jugar
          </button>
        </div>
      </div>
    );
  }

  const actual = preguntas[index];

  return (
    <div className="trivia-container fade-in">
      <h1 className="title">{categoria.name}</h1>

      <div className="question-box">
        <p className="question">
          {index + 1}. {actual.pregunta}
        </p>

        <div className="options-grid">
          {actual.respuestas.map((op) => {
            const selected = seleccionId === op.id;
            const correct = op.es_correcto;

            let className = "option-btn";

            if (bloqueado) {
              if (selected && correct) className += " correct";
              else if (selected && !correct) className += " wrong";
              else if (!selected && correct) className += " reveal";
            } else if (selected) {
              className += " selected";
            }

            return (
              <button
                key={op.id}
                className={className}
                onClick={() => seleccionar(op)}
                disabled={bloqueado}
              >
                {op.texto}
              </button>
            );
          })}
        </div>
      </div>

      <div className="footer-row">
        <span className="progress">{index + 1} / {preguntas.length}</span>
        <span className="score">Puntaje: {puntaje}</span>
      </div>
    </div>
  );
}