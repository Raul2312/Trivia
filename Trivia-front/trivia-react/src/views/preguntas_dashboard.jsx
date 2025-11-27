import { useEffect, useState } from "react";

export default function Preguntas() {

    const [preguntas, setPreguntas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        pregunta: "",
        categoria_id: ""
    });

    const token = localStorage.getItem("token");

    // ============================================================
    // Cargar preguntas y categorías
    // ============================================================
    const loadData = async () => {
        const r1 = await fetch("http://localhost:8000/api/preguntas", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const r2 = await fetch("http://localhost:8000/api/categorias", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        setPreguntas((await r1.json()).data);
        setCategorias((await r2.json()).data);
    };

    useEffect(() => { loadData(); }, []);

    // ============================================================
    // Guardar / Editar pregunta
    // ============================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEditing ? "PUT" : "POST";
        const url = isEditing
            ? `http://localhost:8000/api/preguntas/${editId}`
            : `http://localhost:8000/api/preguntas`;

        await fetch(url, {
            method,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        loadData();
        setShowForm(false);
        setIsEditing(false);
        setForm({ pregunta: "", categoria_id: "" });
    };

    // ============================================================
    // Editar
    // ============================================================
    const handleEdit = (p) => {
        setForm({
            pregunta: p.pregunta,
            categoria_id: p.categoria_id
        });
        setEditId(p.id);
        setIsEditing(true);
        setShowForm(true);
    };

    // ============================================================
    // Eliminar
    // ============================================================
    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar esta pregunta?")) return;

        await fetch(`http://localhost:8000/api/preguntas/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        loadData();
    };

    return (
        <div className="p-3">

            <button
                className="btn btn-sm btn-dark mb-3"
                onClick={() => {
                    setShowForm(!showForm);
                    setIsEditing(false);
                    setForm({ pregunta: "", categoria_id: "" });
                }}
            >
                +
            </button>

            {/* FORMULARIO */}
            {showForm && (
                <div className="card p-3 mb-4">
                    <h4>{isEditing ? "Editar Pregunta" : "Nueva Pregunta"}</h4>

                    <form onSubmit={handleSubmit}>

                        <label className="form-label">Pregunta</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={form.pregunta}
                            onChange={(e) =>
                                setForm({ ...form, pregunta: e.target.value })
                            }
                            required
                        />

                        <label className="form-label">Categoría</label>
                        <select
                            className="form-control mb-3"
                            value={form.categoria_id}
                            onChange={(e) =>
                                setForm({ ...form, categoria_id: e.target.value })
                            }
                            required
                        >
                            <option value="">Seleccione...</option>
                            {categorias.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <button className="btn btn-success w-100">
                            {isEditing ? "Actualizar" : "Guardar"}
                        </button>

                    </form>
                </div>
            )}

            {/* TABLA */}
            <table className="table table-striped text-center">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Pregunta</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {preguntas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.pregunta}</td>
                            <td>{p.categoria?.name ?? "Sin categoría"}</td>

                            <td>
                                <button
                                    className="btn btn-sm text-dark me-2"
                                    style={{ background: "transparent", border: "none" }}
                                    onClick={() => handleEdit(p)}
                                >
                                    ✏
                                </button>

                                <button
                                    className="btn btn-sm text-dark"
                                    style={{ background: "transparent", border: "none" }}
                                    onClick={() => handleDelete(p.id)}
                                >
                                    🗑
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
