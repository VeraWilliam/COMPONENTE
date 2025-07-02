import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RegistroGoogle() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const nombreGoogle = query.get('nombre');
  const correoGoogle = query.get('correo');

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    canton: '',
    celular: '',
    contraseña: ''
  });

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      nombre: nombreGoogle || '',
      correo: correoGoogle || ''
    }));
  }, [nombreGoogle, correoGoogle]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', form);
      alert('Registro completado con éxito');
      navigate('/');
    } catch (err) {
      console.error('❌ Error al registrar desde Google:', err);
      alert(err.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '500px' }}>
        <h1 className="title">Completar Registro con Google</h1>
        <form onSubmit={handleSubmit}>
          <input className="input" name="nombre" value={form.nombre} readOnly />
          <input className="input mt-2" name="correo" value={form.correo} readOnly />
          <input className="input mt-2" name="canton" placeholder="Cantón" onChange={handleChange} required />
          <input className="input mt-2" name="celular" placeholder="Celular" onChange={handleChange} required />
          <input className="input mt-2" name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} required />
          <button className="button is-primary mt-3" type="submit">Guardar Registro</button>
        </form>
      </div>
    </div>
  );
}
