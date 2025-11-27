import { useEffect, useState } from "react";

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        descripcion: ""
    });

    const token = localStorage.getItem("token");

    // Cargar categorias
    const loadCategorias = async () => {
        const res = await fetch("http://localhost:8000/api/categorias", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setCategorias(data.data || data); // Ajusta según si tu API devuelve { data: [...] } o directo el array
    };

    useEffect(() => {
        loadCategorias();
    }, []);

    // Guardar o Editar
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing
            ? `http://localhost:8000/api/categorias/${editId}`
            : `http://localhost:8000/api/categorias`;

        try {
            await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            loadCategorias();
            setShowForm(false);
            setIsEditing(false);
            setForm({ name: "", descripcion: "" });
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleEdit = (cat) => {
        setForm({ name: cat.name, descripcion: cat.descripcion });
        setEditId(cat.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar esta categoría?")) return;
        await fetch(`http://localhost:8000/api/categorias/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        loadCategorias();
    };

    return (
        <div className="p-3">
            <button className="btn btn-sm btn-dark mb-3" onClick={() => {
                setShowForm(!showForm); setIsEditing(false); setForm({ name: "", descripcion: "" });
            }}>+</button>

            {showForm && (
                <div className="card p-3 mb-4">
                    <h4>{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h4>
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control mb-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        
                        <label className="form-label">Descripción</label>
                        <input type="text" className="form-control mb-3" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} required />
                        
                        <button className="btn btn-success w-100">{isEditing ? "Actualizar" : "Guardar"}</button>
                    </form>
                </div>
            )}

            <table className="table table-striped table-hover text-center">
                <thead className="table-dark">
                    <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {categorias.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.descripcion}</td>
                            <td>
                                <button className="btn btn-sm text-dark me-2" style={{ background: "transparent", border: "none" }} onClick={() => handleEdit(c)}>✏</button>
                                <button className="btn btn-sm text-dark" style={{ background: "transparent", border: "none" }} onClick={() => handleDelete(c.id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}