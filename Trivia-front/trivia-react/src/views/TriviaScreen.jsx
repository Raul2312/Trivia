import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/triviaScreen.css";

export default function TriviaScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
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

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch(`http://localhost:8000/api/categorias/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(json => {
        if (!mounted) return;
        const cat = json?.data ?? json;
        setCategoria(cat);

        const rawPregs = cat?.preguntas ?? cat?.trivias ?? [];
        const normalized = rawPregs.map(p => {
          const rawRes = p.respuestas ?? p.opciones ?? [];
          const res = rawRes.map((r, i) => {
            if (typeof r === "string") return { id: `${p.id}-${i}`, texto: r, es_correcto: false };
            return {
              id: r.id ?? `${p.id}-${i}`,
              texto: r.respuesta ?? r.texto ?? r.opcion ?? "",
              es_correcto: r.es_correcto ?? r.es_correcta ?? false,
            };
          });
          return { id: p.id, pregunta: p.pregunta, respuestas: res };
        });

        setPreguntas(normalized);
      })
      .catch(err => {
        if (err.message !== 'Unauthorized') {
          console.error("Error al obtener la categoría:", err);
          setCategoria(null);
          setPreguntas([]);
        }
      })
      .finally(() => setLoading(false));

    return () => (mounted = false);
  }, [id, navigate]);

  // Guardar resultado al finalizar
  useEffect(() => {
    if (!finalizado) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const body = {
      categoria_id: categoria.id,
      puntaje,
      fecha: new Date().toISOString().split("T")[0],
      tiempo_total: 1
    };

    fetch("http://localhost:8000/api/trivias", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => console.log("Trivia guardada:", json))
      .catch(err => console.error("Error guardando trivia:", err));

  }, [finalizado]);

  // Selección de respuesta
  const seleccionar = (respuesta) => {
    if (bloqueado) return;
    setSeleccionId(respuesta.id);
    setBloqueado(true);

    if (respuesta.es_correcto) setPuntaje(s => s + 1);

    setTimeout(() => {
      if (index + 1 < preguntas.length) {
        setIndex(i => i + 1);
        setSeleccionId(null);
        setBloqueado(false);
      } else setFinalizado(true);
    }, 1500);
  };

  // -------------------- PANTALLA DE CARGA --------------------
  if (loading) {
    return (
      <div className="body-trivia">
        <div className="trivia-container fade-in trivia-center">
          Cargando preguntas...
        </div>
      </div>
    );
  }

  // -------------------- SIN PREGUNTAS --------------------
  if (!categoria || preguntas.length === 0) {
    return (
      <div className="body-trivia">
        <div className="trivia-container fade-in trivia-center">
          No hay preguntas disponibles.
        </div>
      </div>
    );
  }

  // -------------------- PANTALLA FINAL --------------------
  if (finalizado) {
    return (
      <div className="body-trivia">
        <div className="trivia-container fade-in">
          <h1 className="title">{categoria.name}</h1>

          <div className="final-box">
            <h2>Resultado Final</h2>
            <p className="final-score">
              Puntaje: <strong>{puntaje}</strong> / {preguntas.length}
            </p>

            <div className="final-buttons">
              <button className="btn-next" onClick={() => window.location.reload()}>
                Volver a jugar
              </button>
              <button className="btn-next" onClick={() => navigate("/indexscreen")}>
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------- INTERFAZ PRINCIPAL --------------------
  const actual = preguntas[index];

  return (
    <div className="body-trivia">
      <div className="trivia-container fade-in">
        <h1 className="title">{categoria.name}</h1>

        <div className="question-box">
          <p className="question">{index + 1}. {actual.pregunta}</p>
          <div className="options-grid">
            {actual.respuestas.map(op => {
              const selected = seleccionId === op.id;
              const correct = op.es_correcto;
              let className = "option-btn";

              if (bloqueado) {
                if (selected && correct) className += " correct";
                else if (selected && !correct) className += " wrong";
                else if (!selected && correct) className += " reveal";
              } else if (selected) className += " selected";

              return (
                <button key={op.id} className={className} onClick={() => seleccionar(op)} disabled={bloqueado}>
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
    </div>
  );
}
