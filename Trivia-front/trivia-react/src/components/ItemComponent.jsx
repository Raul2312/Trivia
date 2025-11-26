import { useState } from "react"

export default function ItemComponent(){
    let [valor,setValor]= useState(1)
return(
<>
    <h2>Item {valor}</h2>
    <input type="number" min={1} onChange={(event)=>{
        setValor(event.target.value)  }}/>
</>
)
}