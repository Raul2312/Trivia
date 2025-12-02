import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/"); // Regresa al login
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold">Bienvenido a TriviaFun</h3>
                    <p className="text-muted">Diviertete agregando campos :)</p>
                </div>

                <div className="d-flex align-items-center gap-3">

                    {/* 🔥 BOTÓN AGREGADO (pequeño y estilizado) */}
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "#e63946",
                            color: "white",
                            border: "none",
                            padding: "6px 10px",
                            fontSize: "12px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Cerrar sesion
                    </button>

                    <i className="fa-regular fa-envelope fs-5"></i>
                    <i className="fa-regular fa-bell fs-5"></i>
                    <img src="https://i.pravatar.cc/100?img=47" className="avatar" />
                </div>
            </div>
        </>
    );
}
