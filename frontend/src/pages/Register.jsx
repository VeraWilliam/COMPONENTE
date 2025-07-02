import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    canton: '',
    celular: '',
    contraseña: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Enviando datos:', form); // Verifica en consola del navegador

      await axios.post('http://localhost:5000/api/auth/register', form);

      alert('Usuario registrado correctamente');
      navigate('/');
    } catch (err) {
      console.error('Error al registrar:', err.response?.data || err.message);
      alert(err.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '500px' }}>
        <h1 className="title">Registro de Usuario</h1>
        <form onSubmit={handleSubmit}>
          <input className="input" name="nombre" placeholder="Nombre" onChange={handleChange} required />
          <input className="input mt-2" name="correo" type="email" placeholder="Correo" onChange={handleChange} required />
          <input className="input mt-2" name="canton" placeholder="Cantón" onChange={handleChange} required />
          <input className="input mt-2" name="celular" placeholder="Celular" onChange={handleChange} required />
          <input className="input mt-2" name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} required />
          <button className="button is-primary mt-3" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}
