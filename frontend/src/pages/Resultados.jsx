import { useEffect, useState } from 'react';
import axios from 'axios';

function Resultados() {
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/encuesta/resultados")
      .then(res => setRespuestas(res.data))
      .catch(() => alert("Error al cargar resultados"));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Resultados de Encuestas</h1>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Seguridad</th>
              <th>Alumbrado</th>
              <th>Parques</th>
            </tr>
          </thead>
          <tbody>
            {respuestas.map((r, i) => (
              <tr key={i}>
                <td>{r.usuario}</td>
                <td>{r.correo}</td>
                <td>{r.seguridad}</td>
                <td>{r.alumbrado}</td>
                <td>{r.parques}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Resultados;
