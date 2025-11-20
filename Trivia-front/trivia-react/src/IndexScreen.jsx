import { useNavigate } from "react-router-dom";
import "./index.css";

export default function IndexScreen() {
  const navigate = useNavigate();

  const trivias = [
    { id: 1, name: "Geografía" },
    { id: 2, name: "Historia" },
    { id: 3, name: "Ciencia" },
    { id: 4, name: "Matemáticas" }
  ];

  return (
    <div className="index-container">
      <h1>Mis Trivias</h1>
      <div className="trivia-list">
        {trivias.map((trivia) => (
          <div
            key={trivia.id}
            className="trivia-card"
            onClick={() => navigate("/trivia")}
          >
            {trivia.name}
          </div>
        ))}
      </div>
    </div>
  );
}
