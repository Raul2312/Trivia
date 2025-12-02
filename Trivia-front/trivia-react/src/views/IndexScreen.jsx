import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../css/index.css';

export default function IndexScreen() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  
  useEffect(() => {
    // 1. OBTENER EL TOKEN DEL LOCAL STORAGE
    const token = localStorage.getItem("token");

    // Si no hay token, redirigir inmediatamente al login (asumo que tu login es "/")
    if (!token) {
      navigate("/");
      return;
    }

    // 2. HACER LA PETICIÓN CON EL TOKEN EN EL HEADER
    fetch("http://localhost:8000/api/indexscreen", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // CLAVE: ADJUNTAR EL TOKEN EN FORMATO BEARER
        'Authorization': `Bearer ${token}` 
      }
    })
      .then((res) => {
        // 3. MANEJAR LA REDIRECCIÓN SI EL TOKEN ES INVÁLIDO O EXPIRÓ (401)
        if (res.status === 401) {
          console.error("Token expirado o inválido. Redirigiendo al login.");
          localStorage.removeItem("token"); // Opcional: limpiar el token inválido
          navigate("/"); // Redirige al login (ajusta la ruta si es necesario)
          // Lanzamos un error para detener la cadena .then()
          throw new Error('Unauthorized'); 
        }
        return res.json();
      })
      .then((data) => {
        console.log("Categorias cargadas:", data);
        setCategorias(data);
      })
      .catch((err) => {
        // Ignoramos el error 'Unauthorized' que lanzamos, pero manejamos otros errores de red
        if (err.message !== 'Unauthorized') {
             console.error("Error cargando categorías:", err);
        }
      });
  }, [navigate]); // Añadimos 'navigate' a las dependencias del useEffect

  return (
    <div className="index-container">
      <h1>Mis Trivias</h1>

      <div className="trivia-list">
        {categorias.length === 0 ? (
          <p>Cargando categorías...</p> // Cambié el mensaje mientras carga
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