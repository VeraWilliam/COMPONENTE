import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { correo, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/encuesta");
    } catch {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 400 }}>
        <h1 className="title">Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <input className="input mb-2" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} required />
          <input className="input mb-2" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="button is-link mt-2" type="submit">Entrar</button>
        </form>

        <a href="http://localhost:5000/api/oauth/google" className="button is-danger mt-4">Iniciar sesión con Google</a>
        <br /><br />
        <a href="/register">¿No tienes cuenta? Regístrate</a><br />
        <a href="/resultados">Ver resultados</a>
      </div>
    </section>
  );
}

export default Login;
