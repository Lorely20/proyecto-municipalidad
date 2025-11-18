import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import './Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo Municipalidad" className="logo-img" />
        <span>Municipalidad</span>
      </div>
      <nav className="navbar-links">
        {usuario?.rol === 'ciudadano' && (
          <>
            <Link to="/espacios">Espacios</Link>
            <Link to="/mis-reservas">Mis Reservas</Link>
          </>
        )}
        {usuario?.rol === 'encargado' && (
          <>
            <Link to="/admin/solicitudes">Solicitudes</Link>
          </>
        )}
      </nav>
      <div className="navbar-user">
        {usuario && <span>Hola, {usuario.nombre}</span>}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Navbar;
