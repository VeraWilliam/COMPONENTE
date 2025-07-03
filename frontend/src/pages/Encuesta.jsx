import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Encuesta({ token }) {
  const [respuestas, setRespuestas] = useState({
    pregunta1: 0,  pregunta2: 0,  pregunta3: 0,  pregunta4: 0,
    pregunta5: 0,  pregunta6: 0,  pregunta7: 0,  pregunta8: 0,
    pregunta9: 0,  pregunta10: 0, pregunta11: 0, pregunta12: 0
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({ ...respuestas, [name]: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/encuesta/responder', respuestas, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Encuesta enviada correctamente');
      navigate('/resultados');
    } catch (err) {
      console.error('❌ Error al enviar encuesta:', err);
      alert('Error al guardar encuesta');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Encuesta de Servicios Municipales</h1>

        <div className="notification is-info">
          <strong>Escala de valoración:</strong><br />
          1 = Muy insatisfecho<br />
          2 = Insatisfecho<br />
          3 = Neutral<br />
          4 = Satisfecho<br />
          5 = Muy satisfecho
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="subtitle mt-4">🔹 Seguridad ciudadana</h2>
          <Pregunta num={1} texto="¿Se siente seguro en su colonia durante el día?" handleChange={handleChange} />
          <Pregunta num={2} texto="¿Se siente seguro en su colonia durante la noche?" handleChange={handleChange} />
          <Pregunta num={3} texto="¿Qué tan confiable considera a los agentes de seguridad pública?" handleChange={handleChange} />
          <Pregunta num={4} texto="¿Qué tan efectiva es la respuesta de las autoridades ante emergencias?" handleChange={handleChange} />

          <h2 className="subtitle mt-4">🔹 Alumbrado público</h2>
          <Pregunta num={5} texto="¿Es adecuado el nivel de iluminación en su calle?" handleChange={handleChange} />
          <Pregunta num={6} texto="¿Con qué frecuencia se presentan fallas en el alumbrado?" handleChange={handleChange} />
          <Pregunta num={7} texto="¿Qué tan rápido se atienden los reportes de fallas en el alumbrado?" handleChange={handleChange} />
          <Pregunta num={8} texto="¿Se siente más seguro en zonas con alumbrado público?" handleChange={handleChange} />

          <h2 className="subtitle mt-4">🔹 Parques y áreas verdes</h2>
          <Pregunta num={9} texto="¿Están limpios los parques y jardines de su comunidad?" handleChange={handleChange} />
          <Pregunta num={10} texto="¿Qué tan mantenido está el mobiliario de los parques (juegos, bancas)?" handleChange={handleChange} />
          <Pregunta num={11} texto="¿Existen suficientes áreas verdes accesibles en su colonia?" handleChange={handleChange} />
          <Pregunta num={12} texto="¿Qué tan satisfactorio es el estado general de los parques?" handleChange={handleChange} />

          <button className="button is-success mt-4">Enviar Encuesta</button>
        </form>
      </div>
    </div>
  );
}

// Componente reutilizable para cada pregunta
function Pregunta({ num, texto, handleChange }) {
  return (
    <div className="field">
      <label className="label">{`${num}. ${texto}`}</label>
      <div className="select">
        <select name={`pregunta${num}`} onChange={handleChange} required>
          <option value="">Seleccione</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
