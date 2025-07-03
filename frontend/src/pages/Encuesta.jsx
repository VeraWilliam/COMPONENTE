import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Encuesta({ token }) {
  const [respuestas, setRespuestas] = useState({
    pregunta1: '', pregunta2: '', pregunta3: '', pregunta4: '',
    pregunta5: '', pregunta6: '', pregunta7: '', pregunta8: '',
    pregunta9: '', pregunta10: '', pregunta11: '', pregunta12: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:5000/api/encuesta/mia', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data) {
        const datos = res.data;
        setRespuestas({
          pregunta1: datos.pregunta1 || '',
          pregunta2: datos.pregunta2 || '',
          pregunta3: datos.pregunta3 || '',
          pregunta4: datos.pregunta4 || '',
          pregunta5: datos.pregunta5 || '',
          pregunta6: datos.pregunta6 || '',
          pregunta7: datos.pregunta7 || '',
          pregunta8: datos.pregunta8 || '',
          pregunta9: datos.pregunta9 || '',
          pregunta10: datos.pregunta10 || '',
          pregunta11: datos.pregunta11 || '',
          pregunta12: datos.pregunta12 || ''
        });
      }
    })
    .catch(err => {
      console.error('Error al cargar encuesta previa:', err);
    });
  }, [token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setRespuestas({ ...respuestas, [name]: Number(value) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/encuesta/responder', respuestas, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('Encuesta enviada correctamente ');
      setTimeout(() => navigate('/resultados'), 2000);
    } catch (err) {
      console.error(' Error al enviar encuesta:', err);
      setError('Error al guardar encuesta');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Encuesta de Servicios Municipales</h1>

        <div className="notification is-info">
          <strong>Escala de valoración:</strong><br />
          1 = Muy insatisfecho | 2 = Insatisfecho | 3 = Neutral | 4 = Satisfecho | 5 = Muy satisfecho
        </div>

        {mensaje && <div className="notification is-success">{mensaje}</div>}
        {error && <div className="notification is-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h2 className="subtitle mt-4">🔹 Seguridad ciudadana</h2>
          <Pregunta num={1} texto="¿Se siente seguro en su colonia durante el día?" valor={respuestas.pregunta1} handleChange={handleChange} />
          <Pregunta num={2} texto="¿Se siente seguro en su colonia durante la noche?" valor={respuestas.pregunta2} handleChange={handleChange} />
          <Pregunta num={3} texto="¿Qué tan confiable considera a los agentes de seguridad pública?" valor={respuestas.pregunta3} handleChange={handleChange} />
          <Pregunta num={4} texto="¿Qué tan efectiva es la respuesta de las autoridades ante emergencias?" valor={respuestas.pregunta4} handleChange={handleChange} />

          <h2 className="subtitle mt-4">🔹 Alumbrado público</h2>
          <Pregunta num={5} texto="¿Es adecuado el nivel de iluminación en su calle?" valor={respuestas.pregunta5} handleChange={handleChange} />
          <Pregunta num={6} texto="¿Con qué frecuencia se presentan fallas en el alumbrado?" valor={respuestas.pregunta6} handleChange={handleChange} />
          <Pregunta num={7} texto="¿Qué tan rápido se atienden los reportes de fallas en el alumbrado?" valor={respuestas.pregunta7} handleChange={handleChange} />
          <Pregunta num={8} texto="¿Se siente más seguro en zonas con alumbrado público?" valor={respuestas.pregunta8} handleChange={handleChange} />

          <h2 className="subtitle mt-4">🔹 Parques y áreas verdes</h2>
          <Pregunta num={9} texto="¿Están limpios los parques y jardines de su comunidad?" valor={respuestas.pregunta9} handleChange={handleChange} />
          <Pregunta num={10} texto="¿Qué tan mantenido está el mobiliario de los parques (juegos, bancas)?" valor={respuestas.pregunta10} handleChange={handleChange} />
          <Pregunta num={11} texto="¿Existen suficientes áreas verdes accesibles en su colonia?" valor={respuestas.pregunta11} handleChange={handleChange} />
          <Pregunta num={12} texto="¿Qué tan satisfactorio es el estado general de los parques?" valor={respuestas.pregunta12} handleChange={handleChange} />

          <button className="button is-success mt-4">Guardar Encuesta</button>
        </form>
        <br/>
        {mensaje && <div className="notification is-success">{mensaje}</div>}
        {error && <div className="notification is-danger">{error}</div>}
        
      </div>
    </div>
  );
}

function Pregunta({ num, texto, valor, handleChange }) {
  return (
    <div className="field">
      <label className="label">{`${num}. ${texto}`}</label>
      <div className="select is-fullwidth">
        <select name={`pregunta${num}`} value={valor} onChange={handleChange} required>
          <option value="">Seleccione</option>
          {[1, 2, 3, 4, 5].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
