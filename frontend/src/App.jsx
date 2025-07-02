import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RegistroGoogle from './pages/RegistroGoogle';
import Encuesta from './pages/Encuesta';
import Resultados from './pages/Resultados';
import Logout from './pages/Logout';
import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route path="/RegistroGoogle" element={<RegistroGoogle />} />
      <Route path="/Encuesta" element={token ? <Encuesta token={token} /> : <Navigate to="/" />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="/logout" element={<Logout setToken={setToken} />} />
    </Routes>
  );
}
