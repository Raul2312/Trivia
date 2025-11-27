import { useEffect, useState } from "react";

export default function Respuestas() {

    const [respuestas, setRespuestas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        respuesta: "",
        es_correcto: 0,
        pregunta_id: ""
    });

    const token = localStorage.getItem("token");

    // ============================================================
    // Cargar respuestas y preguntas
    // ============================================================
    const loadData = async () => {
        const r1 = await fetch("http://localhost:8000/api/respuestas", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const r2 = await fetch("http://localhost:8000/api/preguntas", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        setRespuestas((await r1.json()).data);
        setPreguntas((await r2.json()).data);
    };

    useEffect(() => { loadData(); }, []);

    // ============================================================
    // Guardar / Editar respuesta
    // ============================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEditing ? "PUT" : "POST";
        const url = isEditing
            ? `http://localhost:8000/api/respuestas/${editId}`
            : `http://localhost:8000/api/respuestas`;

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
        setForm({ respuesta: "", es_correcto: 0, pregunta_id: "" });
    };

    // ============================================================
    // Editar
    // ============================================================
    const handleEdit = (r) => {
        setForm({
            respuesta: r.respuesta,
            es_correcto: r.es_correcto,
            pregunta_id: r.pregunta_id
        });
        setEditId(r.id);
        setIsEditing(true);
        setShowForm(true);
    };

    // ============================================================
    // Eliminar
    // ============================================================
    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar esta respuesta?")) return;

        await fetch(`http://localhost:8000/api/respuestas/${id}`, {
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
                    setForm({ respuesta: "", es_correcto: 0, pregunta_id: "" });
                }}
            >
                +
            </button>

            {/* FORMULARIO */}
            {showForm && (
                <div className="card p-3 mb-4">
                    <h4>{isEditing ? "Editar Respuesta" : "Nueva Respuesta"}</h4>

                    <form onSubmit={handleSubmit}>

                        <label className="form-label">Respuesta</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={form.respuesta}
                            onChange={(e) =>
                                setForm({ ...form, respuesta: e.target.value })
                            }
                            required
                        />

                        <label className="form-label">Correcta</label> <br />
                        <input
                            type="checkbox"
                            className="form-check-input mb-3"
                            checked={form.es_correcto == 1}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    es_correcto: e.target.checked ? 1 : 0
                                })
                            }
                        />
                        <br />

                        <label className="form-label">Pregunta</label>
                        <select
                            className="form-control mb-3"
                            value={form.pregunta_id}
                            onChange={(e) =>
                                setForm({ ...form, pregunta_id: e.target.value })
                            }
                            required
                        >
                            <option value="">Seleccione...</option>
                            {preguntas.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.pregunta}
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
                        <th>Respuesta</th>
                        <th>Correcta</th>
                        <th>Pregunta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {respuestas.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.respuesta}</td>
                            <td>{r.es_correcto ? "✔" : "✖"}</td>
                            <td>{r.pregunta?.pregunta ?? "Sin pregunta"}</td>

                            <td>
                                <button
                                    className="btn btn-sm text-dark me-2"
                                    style={{ background: "transparent", border: "none" }}
                                    onClick={() => handleEdit(r)}
                                >
                                    ✏
                                </button>

                                <button
                                    className="btn btn-sm text-dark"
                                    style={{ background: "transparent", border: "none" }}
                                    onClick={() => handleDelete(r.id)}
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
