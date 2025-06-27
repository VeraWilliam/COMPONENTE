import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RegistroGoogle from './pages/RegistroGoogle';
import Encuesta from './pages/Encuesta';
import Resultados from './pages/Resultados';
import Logout from './pages/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/RegistroGoogle" element={<RegistroGoogle />} />
      <Route path="/encuesta" element={<Encuesta />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
