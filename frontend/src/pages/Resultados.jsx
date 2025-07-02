import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Resultados() {
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/encuesta/resultados')
      .then(res => setResultados(res.data))
      .catch(err => {
        console.error('Error al obtener resultados:', err);
        alert('No se pudieron cargar los resultados.');
      });
  }, []);

  return (
    <div className="section">
      <div className="container">

        <h1 className="title">Resultados de la Encuesta Ciudadana</h1>

        {/* Leyenda de escala */}
        <div className="notification is-info">
          <strong>Escala de valores:</strong><br />
          1 = Muy insatisfecho | 2 = Insatisfecho | 3 = Neutral | 4 = Satisfecho | 5 = Muy satisfecho
        </div>

        {/* Preguntas de referencia */}
        <div className="notification is-warning">
          <strong>Preguntas originales utilizadas como base de la encuesta:</strong>
          <ul className="mt-2">
            <li><strong>Seguridad:</strong> ¿Se siente usted seguro en su colonia durante el día y la noche?</li>
            <li><strong>Alumbrado:</strong> ¿Qué tan adecuado considera el alumbrado público en su calle y alrededores?</li>
            <li><strong>Parques:</strong> ¿Está satisfecho con el mantenimiento y limpieza de parques y jardines?</li>
            <li><strong>Basura:</strong> ¿Cómo califica la frecuencia y eficiencia del servicio de recolección de basura?</li>
          </ul>
        </div>

        {/* Tabla de resultados */}
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Nombre del ciudadano</th>
              <th>Correo electrónico</th>
              <th>Percepción de seguridad pública</th>
              <th>Calidad del alumbrado público</th>
              <th>Mantenimiento de parques y jardines</th>
              <th>Recolección de basura</th>
              <th>Fecha de respuesta</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r, i) => (
              <tr key={i}>
                <td>{r.nombre}</td>
                <td>{r.correo}</td>
                <td>{r.seguridad}</td>
                <td>{r.alumbrado}</td>
                <td>{r.parques}</td>
                <td>{r.basura}</td>
                <td>{new Date(r.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botón de regreso */}
        <div className="has-text-centered mt-4">
          <button className="button is-info" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
