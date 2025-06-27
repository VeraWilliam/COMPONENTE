import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function RegistroGoogle() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    cedula: '',
    password: '',
    token: ''
  });

  useEffect(() => {
    setForm({
      nombre: params.get('nombre') || '',
      correo: params.get('correo') || '',
      cedula: '',
      password: '',
      token: params.get('token') || ''
    });
  }, [location.search]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registro exitoso. Ahora puede iniciar sesión.");
      navigate('/');
    } catch (err) {
      console.error("❌ Error al registrar:", err);
      alert("Error al registrar: " + (err.response?.data?.error || "Error desconocido"));
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "500px" }}>
        <h1 className="title">Completa tu Registro</h1>
        <form onSubmit={handleSubmit} className="box">
          <input className="input mb-2" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre completo" />
          <input className="input mb-2" name="correo" value={form.correo} readOnly />
          <input className="input mb-2" name="cedula" value={form.cedula} onChange={handleChange} required placeholder="Cédula" />
          <input className="input mb-2" type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Contraseña" />
          <button className="button is-primary mt-3" type="submit">Registrar</button>
        </form>
      </div>
    </section>
  );
}

export default RegistroGoogle;
