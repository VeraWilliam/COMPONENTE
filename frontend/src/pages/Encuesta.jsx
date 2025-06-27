import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Encuesta() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [respuestas, setRespuestas] = useState({ seguridad: 0, alumbrado: 0, parques: 0 });
  const navigate = useNavigate();

  const handleChange = e => setRespuestas({ ...respuestas, [e.target.name]: Number(e.target.value) });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/encuesta", {
        usuario: user.nombre,
        correo: user.correo,
        ...respuestas
      });
      alert("Encuesta enviada correctamente");
      localStorage.removeItem("user");
      navigate("/");
    } catch {
      alert("Error al enviar la encuesta");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 500 }}>
        <h1 className="title">Encuesta de Servicios Públicos</h1>
        <form onSubmit={handleSubmit}>
          <label>Seguridad:</label>
          <input type="number" className="input mb-2" name="seguridad" onChange={handleChange} min={1} max={5} required />
          <label>Alumbrado:</label>
          <input type="number" className="input mb-2" name="alumbrado" onChange={handleChange} min={1} max={5} required />
          <label>Parques:</label>
          <input type="number" className="input mb-2" name="parques" onChange={handleChange} min={1} max={5} required />
          <button className="button is-success mt-2">Enviar encuesta</button>
        </form>
      </div>
    </section>
  );
}

export default Encuesta;
