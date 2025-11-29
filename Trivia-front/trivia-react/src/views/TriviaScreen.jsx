import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TriviaScreen() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/categoria/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoria(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando categoría:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Cargando...</h2>;
  if (!categoria) return <h2>No se encontró la categoría</h2>;

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Categoría: {categoria.nombre}
      </h1>

      {categoria.trivias.length === 0 ? (
        <p>No hay preguntas en esta categoría.</p>
      ) : (
        categoria.trivias.map((pregunta) => (
          <div
            key={pregunta.id}
            style={{
              background: "#1b1464",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "25px",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)"
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>{pregunta.pregunta}</h2>

            {/* Opciones */}
            {pregunta.opciones.map((op) => {
              const userAnswer = respuestaSeleccionada[pregunta.id];

              const isSelected = userAnswer === op.id;
              const isCorrect = op.es_correcta === 1;

              let bg = "#2a1f5c";

              if (userAnswer) {
                if (isSelected && isCorrect) bg = "#2ecc71"; // Verde
                else if (isSelected && !isCorrect) bg = "#e74c3c"; // Rojo
              }

              return (
                <button
                  key={op.id}
                  onClick={() =>
                    setRespuestaSeleccionada({
                      ...respuestaSeleccionada,
                      [pregunta.id]: op.id,
                    })
                  }
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 20px",
                    background: bg,
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    fontSize: "18px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                >
                  {op.texto}
                </button>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
