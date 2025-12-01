import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/index.css';

export default function IndexScreen() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/indexscreen")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categorias:", data);
        setCategorias(data);
      })
      .catch((err) => {
        console.error("Error cargando categorías:", err);
      });
  }, []);

  return (
    <div className="index-container">
      <h1>Mis Trivias</h1>

      <div className="trivia-list">
        {categorias.length === 0 ? (
          <p>No hay categorías registradas.</p>
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
