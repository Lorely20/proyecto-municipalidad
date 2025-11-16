import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login({ correo, contraseña });
      navigate('/espacios');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={contraseña}
          onChange={e => setContraseña(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
