import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setToken }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/oauth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        correo,
        contraseña
      });

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      alert('Inicio de sesión exitoso');
      navigate('/Encuesta');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert(err.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '400px' }}>
        <h1 className="title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <input className="input" type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <input className="input mt-2" type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
          <button className="button is-link is-fullwidth mt-3" type="submit">Entrar</button>
        </form>
        <hr />
        <button className="button is-danger is-fullwidth" onClick={handleGoogleLogin}>Iniciar con Google</button>
        <Link to="/resultados" className="button is-light is-fullwidth mt-2">Ver Resultados</Link>
      </div>
    </div>
  );
}
