import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/index.css';

export default function IndexScreen() {

  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:8000/api/indexscreen", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
          console.error("Token expirado o inválido. Redirigiendo al login.");
          localStorage.removeItem("token");
          navigate("/");
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Categorias cargadas:", data);
        setCategorias(data);
      })
      .catch((err) => {
        if (err.message !== 'Unauthorized') {
          console.error("Error cargando categorías:", err);
        }
      });
  }, [navigate]);

  return (
    <div className="index-container">

      {/* --- BOTÓN SUPERIOR IZQUIERDA 50x10 --- */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        style={{
          background: "linear-gradient(180deg,#061223 0%, #071827 60%)",
          border: "none",
          color: "white",
          width: "200px",
          height: "30px",
          fontSize: "20px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "10px",
          left: "10px",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        Cerrar sesion
      </button>
  <button
  onClick={() => navigate("/resultados")}
  style={{
    background: "linear-gradient(180deg,#061223 0%, #071827 60%)",
    color: "white",
    border: "none",
    width: "200px",
    height: "35px",
    fontSize: "18px",
    borderRadius: "5px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1000,

    /* CENTRAR TEXTO TOTALMENTE */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "35px", // 🔥 Hace que quede EXACTO en el centro
    textAlign: "center"
  }}
>
  Ver Resultados
</button>

      <h1>Mis Trivias</h1>

      <div className="trivia-list">
        {categorias.length === 0 ? (
          <p>Cargando categorías...</p>
        ) : (
          categorias.map((cat) => (
            <div
              key={cat.id}
              className="trivia-card"
              onClick={() => navigate(`/categorias/${cat.id}`)}
            >
              <span className="trivia-text">{cat.name}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
