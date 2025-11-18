import React from 'react';
import { Link } from 'react-router-dom';
import './EspacioCard.css';

const EspacioCard = ({ espacio }) => {
  const imagenPrincipal = espacio.imagenes && espacio.imagenes.length > 0 
    ? espacio.imagenes[0].replace('/assets/', '') 
    : 'default.jpg';

  return (
    <div className="espacio-card">
      <img 
        src={`/assets/${imagenPrincipal}`} 
        alt={espacio.nombre} 
        className="espacio-card-img" 
      />
      <div className="espacio-card-info">
        <h3>{espacio.nombre}</h3>
        <p>{espacio.descripcion}</p>
        <p><strong>Ubicación:</strong> {espacio.ubicacion}</p>
        <p><strong>Precio:</strong> Q{espacio.precioAlquiler} • Depósito: Q{espacio.deposito}</p>
        <Link to={`/espacios/${espacio._id}`} className="ver-mas-btn">Ver detalle / Reservar</Link>
      </div>
    </div>
  );
};

export default EspacioCard;
