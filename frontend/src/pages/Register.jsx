import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ nombre: '', correo: '', cedula: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registrado correctamente");
      navigate("/");
    } catch {
      alert("Error al registrar");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 500 }}>
        <h1 className="title">Registro</h1>
        <form onSubmit={handleSubmit}>
          <input className="input mb-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input className="input mb-2" name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} required />
          <input className="input mb-2" name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} required />
          <input className="input mb-2" type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <button className="button is-primary">Registrar</button>
        </form>
      </div>
    </section>
  );
}

export default Register;
