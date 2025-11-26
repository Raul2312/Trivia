export default function Card({ ammount, title, percent }) {
    return (
        <>
            <div className="card-main">
                <small className="text-muted">{title}</small>
                <h3 className="fw-bold mt-2">{ammount}</h3>
                { percent > 0 && (  <span className="badge bg-success">+{percent}%</span>) }
                { percent < 0 && (  <span className="badge bg-danger">-{percent}%</span>) }

              
            </div>

        </>
    )
}