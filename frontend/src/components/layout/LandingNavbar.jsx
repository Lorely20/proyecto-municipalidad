import React from "react";
import { Link } from "react-router-dom";
import "./LandingNavbar.css";
import logo from "../../assets/logo.png";

const LandingNavbar = () => (
  <nav className="landing-navbar">
    <div className="landing-logo">
      <img src={logo} alt="Logo" />
      <span>Reserva en línea</span>
    </div>
    <div className="landing-links">
      <Link to="/login">Iniciar sesión</Link>
      <Link to="/register">Registrarse</Link>
    </div>
  </nav>
);

export default LandingNavbar;
