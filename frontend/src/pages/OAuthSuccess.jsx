import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/encuesta");
    }
  }, [params, navigate]);

  return <p>Iniciando sesión con Google...</p>;
}

export default OAuthSuccess;
