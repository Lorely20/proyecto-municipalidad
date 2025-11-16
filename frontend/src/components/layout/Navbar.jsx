// Navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-logo">🏛️ Municipalidad</div>
      <nav className="navbar-links">
        <Link to="/espacios">Espacios</Link>
        <Link to="/mis-reservas">Mis Reservas</Link>
      </nav>
      <div className="navbar-user">
        {usuario && <span>Hola, {usuario.nombre}</span>}
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Navbar;