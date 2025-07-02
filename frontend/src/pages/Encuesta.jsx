import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Encuesta({ token }) {
  const [respuestas, setRespuestas] = useState({
    seguridad: 0,
    alumbrado: 0,
    parques: 0,
    basura: 0
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

          {/* Pregunta 1: Seguridad */}
          <div className="field">
            <label className="label">
              ¿Qué tan seguro(a) se siente en su colonia durante el día y la noche?
            </label>
            <div className="select">
              <select name="seguridad" onChange={handleChange} required>
                <option value="">Seleccione</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pregunta 2: Alumbrado */}
          <div className="field">
            <label className="label">
              ¿Qué tan adecuado considera el alumbrado público en su calle y alrededores?
            </label>
            <div className="select">
              <select name="alumbrado" onChange={handleChange} required>
                <option value="">Seleccione</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pregunta 3: Parques */}
          <div className="field">
            <label className="label">
              ¿Qué tan satisfecho está con el mantenimiento y limpieza de los parques y jardines públicos en su municipio?
            </label>
            <div className="select">
              <select name="parques" onChange={handleChange} required>
                <option value="">Seleccione</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pregunta 4: Recolección de basura */}
          <div className="field">
            <label className="label">
              ¿Cómo califica la frecuencia y eficiencia del servicio de recolección de basura en su zona?
            </label>
            <div className="select">
              <select name="basura" onChange={handleChange} required>
                <option value="">Seleccione</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="button is-success mt-3">Enviar Encuesta</button>
        </form>
      </div>
    </div>
  );
}
