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
    contrasena: '',
    cedula: '',
    sexo: '',
    fechaNacimiento: ''
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      nombre: nombreGoogle || '',
      correo: correoGoogle || ''
    }));
  }, [nombreGoogle, correoGoogle]);

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio';
    if (!form.canton.trim()) err.canton = 'El cantón es obligatorio';
    if (!form.celular.match(/^\d{10}$/)) err.celular = 'El celular debe tener 10 dígitos numericos';
    if (!form.contrasena || form.contrasena.length < 6) err.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    if (!form.cedula.match(/^\d{10}$/)) err.cedula = 'La cédula debe tener exactamente 10 dígitos numericos';
    if (!form.sexo) err.sexo = 'Seleccione un sexo';
    if (!form.fechaNacimiento) {
      err.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    } else if (calcularEdad(form.fechaNacimiento) < 18) {
      err.fechaNacimiento = 'Debes tener al menos 18 años para registrarte';
    }
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError('');
    if (!validar()) return;

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMensaje('Usuario registrado con éxito');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(' Error al registrar usuario:', err);
      setError(err.response?.data?.mensaje || 'Error al registrar usuario');
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 className="title">Registro de Usuario con Google</h1>


        <form onSubmit={handleSubmit}>
          <Campo label="Nombre" name="nombre" value={form.nombre} readOnly />
          <Campo label="Correo" name="correo" value={form.correo} readOnly />
          <Campo label="Cantón" name="canton" value={form.canton} onChange={handleChange} error={errores.canton} />
          <Campo label="Celular" name="celular" value={form.celular} onChange={handleChange} error={errores.celular} />
          <Campo label="Contraseña" name="contrasena" type="password" value={form.contrasena} onChange={handleChange} error={errores.contrasena} />
          <Campo label="Cédula" name="cedula" value={form.cedula} onChange={handleChange} error={errores.cedula} />

          {/* Sexo */}
          <div className="field">
            <label className="label">Sexo</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="sexo" value={form.sexo} onChange={handleChange}>
                  <option value="">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>
            {errores.sexo && <p className="help is-danger">{errores.sexo}</p>}
          </div>

          {/* Fecha de nacimiento */}
          <div className="field">
            <label className="label">Fecha de nacimiento</label>
            <div className="control">
              <input
                type="date"
                className="input"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
            {errores.fechaNacimiento && <p className="help is-danger">{errores.fechaNacimiento}</p>}
          </div>

          <button className="button is-primary mt-4" type="submit">
            Registrarse
          </button>
        </form>
        <br />
        
        {/* Mensajes visuales */}
        {mensaje && <div className="notification is-success">{mensaje}</div>}
        {error && <div className="notification is-danger">{error}</div>}
      </div>
    </div>
  );
}

function Campo({ label, name, value, onChange, type = 'text', readOnly = false, error }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}
