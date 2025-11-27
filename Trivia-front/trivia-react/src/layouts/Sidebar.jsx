export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <h4 className="fw-bold mb-4"><i className="fa-solid fa-building-columns me-2"></i>Bankio</h4>

                <div className="menu-title">Main Menu</div>
                <a href="/admin"><i className="fa-solid fa-chart-line me-2"></i> Dashboard</a>
                <a href="/admin/users"><i className="fa-solid fa-users me-2"></i> Users</a>
                <a href="/admin/trivias"><i className="fa-solid fa-credit-card me-2"></i>Trivias</a>
                <a href="/admin/preguntas"><i className="fa-solid fa-credit-card me-2"></i> Preguntas</a>
                 <a href="/admin/categorias"><i className="fa-solid fa-credit-card me-2"></i>Categorias</a>
                   <a href="/admin/respuestas"><i className="fa-solid fa-credit-card me-2"></i>Respuestas</a>
                
            </div>

        </>
    )
}