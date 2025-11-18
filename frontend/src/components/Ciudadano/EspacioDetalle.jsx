import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './EspacioDetalle.css';
import GaleriaCarousel from './GaleriaCarousel';

const EspacioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [espacio, setEspacio] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resp = await api.get(`/espacios/${id}`);
        setEspacio(resp.data);
      } catch (err) {
        console.error('Error al cargar el espacio:', err);
      }
    };
    cargarDatos();
  }, [id]);

  if (!espacio) return <p>No se encontró el espacio solicitado.</p>;

  return (
    <div className="detalle-contenedor">
      <div className="galeria">
        <GaleriaCarousel imagenes={espacio.imagenes.map(img => `/assets/${img}`)} />
      </div>

      <div className="info">
        <h1 className="titulo">{espacio.nombre}</h1>
        <p className="ubicacion">📍 {espacio.ubicacion}</p>

        <div className="detalle-grid">
          <div className="detalle-item">
            <span>📝 Descripción:</span>
            <p>{espacio.descripcion}</p>
          </div>
          <div className="detalle-item">
            <span>💰 Precio de alquiler:</span>
            <p>Q{espacio.precioAlquiler}</p>
          </div>
          <div className="detalle-item">
            <span>🔒 Depósito:</span>
            <p>Q{espacio.deposito}</p>
          </div>
          <div className="detalle-item">
            <span>📞 Contacto:</span>
            <p>{espacio.celularEncargado}</p>
          </div>
        </div>

        <button className="btn-reservar" onClick={() => navigate(`/espacios/${id}/disponibilidad`)}>
          📅 Ver disponibilidad
        </button>
      </div>
    </div>
  );
};

export default EspacioDetalle;
