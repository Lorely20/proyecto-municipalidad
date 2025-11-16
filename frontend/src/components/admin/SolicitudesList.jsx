import React, { useEffect, useState, useContext } from 'react';
import { obtenerReservasAdmin, cambiarEstadoReserva } from '../../api/reservaApi';
import { AuthContext } from '../../contexts/AuthContext';
import './SolicitudesList.css';

const SolicitudesList = () => {
  const { token } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const data = await obtenerReservasAdmin(token);
      setSolicitudes(data);
    };
    fetchSolicitudes();
  }, [token]);

  const actualizarEstado = async (id, estado) => {
    await cambiarEstadoReserva(id, estado, token);
    setSolicitudes(solicitudes.map(s => s._id === id ? { ...s, estado } : s));
  };

  return (
    <div className="solicitudes-container">
      <h2>Solicitudes de Reserva</h2>
      <ul>
        {solicitudes.map(s => (
          <li key={s._id} className="solicitud-item">
            <p><strong>Espacio:</strong> {s.espacio.nombre}</p>
            <p><strong>Fecha:</strong> {s.fecha}</p>
            <p><strong>Estado:</strong> {s.estado}</p>
            <button onClick={() => actualizarEstado(s._id, 'aceptada')}>Aceptar</button>
            <button onClick={() => actualizarEstado(s._id, 'rechazada')}>Rechazar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudesList;
