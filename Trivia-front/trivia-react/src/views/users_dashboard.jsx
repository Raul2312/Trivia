import { useEffect, useState } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const token = localStorage.getItem("token");

    // ============================================================
    // Cargar usuarios
    // ============================================================
    const loadUsers = async () => {
        const res = await fetch("http://localhost:8000/api/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        setUsers(data.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // ============================================================
    // Guardar nuevo o editar usuario
    // ============================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEditing ? "PUT" : "POST";
        const url = isEditing
            ? `http://localhost:8000/api/users/${editId}`
            : `http://localhost:8000/api/users`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            await res.json();
            loadUsers();

            // Reset
            setShowForm(false);
            setIsEditing(false);
            setForm({ name: "", email: "", password: "" });

        } catch (err) {
            console.error("Error:", err);
        }
    };

    // ============================================================
    // Editar usuario
    // ============================================================
    const handleEdit = (user) => {
        setForm({
            name: user.name,
            email: user.email,
            password: ""
        });
        setEditId(user.id);
        setIsEditing(true);
        setShowForm(true);
    };

    // ============================================================
    // Eliminar usuario
    // ============================================================
    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro que quieres eliminar este usuario?")) return;

        await fetch(`http://localhost:8000/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        loadUsers();
    };

    return (
        <>
            <div className="p-3">

                {/* Botón pequeño negro para agregar */}
                <button
                    className="btn btn-sm btn-dark mb-3"
                    onClick={() => {
                        setShowForm(!showForm);
                        setIsEditing(false);
                        setForm({ name: "", email: "", password: "" });
                    }}
                >
                    +
                </button>

                {/* FORMULARIO */}
                {showForm && (
                    <div className="card p-3 mb-4">
                        <h4>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h4>

                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />

                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control mb-2"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />

                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="(opcional al editar)"
                            />

                            <button className="btn btn-success w-100">
                                {isEditing ? "Actualizar" : "Guardar"}
                            </button>
                        </form>
                    </div>
                )}

                {/* TABLA DE USUARIOS */}
                <table className="table table-striped table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>

                                    {/* Botón icono Editar */}
                                    <button
                                        className="btn btn-sm text-dark me-2"
                                        style={{ background: "transparent", border: "none" }}
                                        onClick={() => handleEdit(u)}
                                    >
                                        ✏
                                    </button>

                                    {/* Botón icono Eliminar */}
                                    <button
                                        className="btn btn-sm text-dark"
                                        style={{ background: "transparent", border: "none" }}
                                        onClick={() => handleDelete(u.id)}
                                    >
                                        🗑
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
}
