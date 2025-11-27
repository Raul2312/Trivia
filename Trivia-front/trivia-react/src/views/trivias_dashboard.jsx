import { useEffect, useState } from "react";

export default function Trivias_dashboard() {
  const [trivias, setTrivias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    fecha: "",
    puntaje: "",
    tiempo_total: "",
    categoria_id: ""
  });

  const token = localStorage.getItem("token");

  // Cargar datos
  const loadData = async () => {
    const t = await fetch("http://localhost:8000/api/trivias", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const c = await fetch("http://localhost:8000/api/categorias", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    setTrivias((await t.json()).data);
    setCategorias((await c.json()).data);
  };

  useEffect(() => { loadData(); }, []);

  // Guardar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:8000/api/trivias/${editId}`
      : `http://localhost:8000/api/trivias`;

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
    setForm({ fecha: "", puntaje: "", tiempo_total: "", categoria_id: "" });
  };

  // Editar trivia
  const handleEdit = (t) => {
    setForm({
      fecha: t.fecha,
      puntaje: t.puntaje,
      tiempo_total: t.tiempo_total,
      categoria_id: t.categoria_id
    });
    setEditId(t.id);
    setIsEditing(true);
    setShowForm(true);
  };

  // Eliminar trivia
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta trivia?")) return;

    await fetch(`http://localhost:8000/api/trivias/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    loadData();
  };

  return (
    <div className="p-3">
      <button className="btn btn-sm btn-dark mb-3"
        onClick={() => {
          setShowForm(!showForm);
          setIsEditing(false);
          setForm({ fecha: "", puntaje: "", tiempo_total: "", categoria_id: "" });
        }}
      >
        +
      </button>

      {showForm && (
        <div className="card p-3 mb-4">
          <h4>{isEditing ? "Editar Trivia" : "Nueva Trivia"}</h4>
          <form onSubmit={handleSubmit}>
            <label>Fecha</label>
            <input type="date" className="form-control mb-2"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              required />

            <label>Puntaje</label>
            <input type="number" step="0.01" className="form-control mb-2"
              value={form.puntaje}
              onChange={(e) => setForm({ ...form, puntaje: e.target.value })}
              required />

            <label>Tiempo Total (segundos)</label>
            <input type="number" className="form-control mb-2"
              value={form.tiempo_total}
              onChange={(e) => setForm({ ...form, tiempo_total: e.target.value })}
              required />

            <label>Categoría</label>
            <select className="form-control mb-3"
              value={form.categoria_id}
              onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
              required>
              <option value="">Seleccione...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button className="btn btn-success w-100">
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </form>
        </div>
      )}

      <table className="table table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Puntaje</th>
            <th>Tiempo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {trivias.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.fecha}</td>
              <td>{t.puntaje}</td>
              <td>{t.tiempo_total}s</td>
              <td>{t.categoria?.name}</td>
              <td>
                <button className="btn btn-sm me-2" onClick={() => handleEdit(t)}>✏</button>
                <button className="btn btn-sm" onClick={() => handleDelete(t.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
