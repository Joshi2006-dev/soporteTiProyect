import { useEffect, useState } from "react"; 

function Inicio() { 

  const [servicios, setServicios] = useState([]); 

  

  useEffect(() => { 

    fetch("http://localhost:3000/api/services") 

      .then(res => res.json()) 

      .then(data => setServicios(data)); 

  }, []); 

  

  return ( 

    <div> 
      <h2>Servicios TI</h2> 
      <ul> 
        {servicios.map(s => ( 

          <li key={s.id}> 

            <strong>{s.nombre}</strong> – {s.descripcion} 

          </li> 

        ))} 

      </ul> 

    </div> 

  ); 

} 

export default Inicio;