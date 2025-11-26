import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- importar useNavigate
import "./../css/trivia.css";

export default function TriviaScreen() {
  const navigate = useNavigate(); // <-- inicializar navigate

  const questions = [
    {
      question: "¿Cuál es el río más largo del mundo?",
      options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
      correct: 0
    },
    {
      question: "¿Cuál es la capital de Francia?",
      options: ["Berlín", "Madrid", "París", "Roma"],
      correct: 2
    },
    {
      question: "¿Qué planeta es conocido como el planeta rojo?",
      options: ["Venus", "Marte", "Júpiter", "Saturno"],
      correct: 1
    }
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(10);

  // Temporizador
  useEffect(() => {
    if (finished) return;

    if (timer === 0) {
      handleOptionClick(-1); // tiempo agotado, respuesta incorrecta
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, finished]);

  const handleOptionClick = (index) => {
    if (selected !== null) return; // evitar doble click

    setSelected(index);

    // Cada respuesta correcta suma 10 puntos
    if (index === questions[current].correct) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      setSelected(null);
      setTimer(10);
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setTimer(10);
  };

  const progressPercent = ((current + 1) / questions.length) * 100;

  return (
    <div className="d-flex justify-content-center">
    <div className="trivia-container">
      {!finished ? (
        <>
          {/* Top Bar */}
          <div className="top-bar">
            <div className="menu-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Temporizador en el círculo */}
            <div className="question-count">{timer}</div>
          </div>

          {/* Pregunta */}
          <div className="question-box fade-in">{questions[current].question}</div>

          {/* Opciones */}
          {questions[current].options.map((option, i) => (
            <div
              key={i}
              className={`option fade-in ${
                selected !== null
                  ? i === questions[current].correct
                    ? "correct"
                    : i === selected || selected === -1
                    ? "wrong"
                    : ""
                  : ""
              }`}
              onClick={() => handleOptionClick(i)}
            >
              {option}
            </div>
          ))}
        </>
      ) : (
        <div className="finished-screen fade-in">
          <h2>¡Trivia terminada!</h2>
          <p>
            Tu puntuación: {score} / {questions.length * 10}
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Volver a jugar
          </button>
          {/* Botón para regresar al Index */}
          <button
            className="index-button"
            onClick={() => navigate("/")} // <-- aquí va la ruta del IndexScreen
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              fontSize: "18px",
              borderRadius: "15px",
              background: "#3a2a73",
              color: "white",
              cursor: "pointer",
              border: "none",
              transition: "0.3s",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#31d480"}
            onMouseOut={(e) => e.currentTarget.style.background = "#3a2a73"}
          >
            Mas Trivias
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
