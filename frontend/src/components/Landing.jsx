import React from 'react';
import './Landing.css';
import fondo from '../assets/fondo.jpg';
import LandingNavbar from "./layout/LandingNavbar";
import reservaLogo from '../assets/reserva-logo.png';

const Landing = () => {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${fondo})` }}>
      <LandingNavbar />
      <div className="landing-overlay">
        <img
          src={reservaLogo}
          alt="Reserva de espacios públicos"
          className="landing-logo-main"
        />
      </div>
    </div>
  );
};

export default Landing;
