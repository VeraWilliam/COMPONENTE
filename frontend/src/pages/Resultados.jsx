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
      });
  }, []);

  const preguntasTexto = [
    "¿Se siente seguro en su colonia durante el día?",
    "¿Se siente seguro en su colonia durante la noche?",
    "¿Qué tan confiable considera a los agentes de seguridad pública?",
    "¿Qué tan efectiva es la respuesta de las autoridades ante emergencias?",
    "¿Es adecuado el nivel de iluminación en su calle?",
    "¿Con qué frecuencia se presentan fallas en el alumbrado?",
    "¿Qué tan rápido se atienden los reportes de fallas en el alumbrado?",
    "¿Se siente más seguro en zonas con alumbrado público?",
    "¿Están limpios los parques y jardines de su comunidad?",
    "¿Qué tan mantenido está el mobiliario de los parques (juegos, bancas)?",
    "¿Existen suficientes áreas verdes accesibles en su colonia?",
    "¿Qué tan satisfactorio es el estado general de los parques?"
  ];

  const promedios = Array(12).fill(0);
  resultados.forEach((r) => {
    for (let i = 0; i < 12; i++) {
      promedios[i] += r[`pregunta${i + 1}`] || 0;
    }
  });
  const totalRespuestas = resultados.length;
  const promediosFinales = promedios.map(p =>
    totalRespuestas ? (p / totalRespuestas).toFixed(1) : "-"
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Resultados de la Encuesta</h1>

        <div className="notification is-info">
          <strong>Escala de valores:</strong><br />
          1 = Muy insatisfecho | 2 = Insatisfecho | 3 = Neutral | 4 = Satisfecho | 5 = Muy satisfecho
        </div>

        <div className="notification is-warning">
          <strong>Significado de cada pregunta:</strong>
          <ul className="mt-2">
            {preguntasTexto.map((texto, index) => (
              <li key={index}><strong>Preg {index + 1}:</strong> {texto}</li>
            ))}
          </ul>
        </div>

        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              {[...Array(12)].map((_, i) => (
                <th key={i}>Preg {i + 1}</th>
              ))}
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r, i) => (
              <tr key={i}>
                <td>{r.nombre}</td>
                <td>{r.correo}</td>
                {[...Array(12)].map((_, j) => (
                  <td key={j}>{r[`pregunta${j + 1}`]}</td>
                ))}
                <td>{new Date(r.fecha).toLocaleDateString()}</td>
              </tr>
            ))}

            {totalRespuestas > 0 && (
              <tr>
                <td><strong>Promedio</strong></td>
                <td></td>
                {promediosFinales.map((p, i) => (
                  <td key={i}><strong>{p}</strong></td>
                ))}
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="has-text-centered mt-4">
          <button className="button is-info" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
