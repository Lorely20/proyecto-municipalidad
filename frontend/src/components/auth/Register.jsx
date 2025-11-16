import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register({ nombre, correo, contraseña });
      navigate('/login');
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />

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

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
