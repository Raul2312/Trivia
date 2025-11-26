export default function CreditCard({banco,number,person,fecha}){
    return(
        <>
         <div className="credit-card">
                    <h5>{banco}</h5>
                    <div className="credit-card-number">{number}</div>
                    <div className="d-flex justify-content-between">
                        <span>{person}</span>
                        <span>{fecha}</span>
                    </div>
                </div>
        
        </>
    )
}