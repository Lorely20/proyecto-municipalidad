import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { cambiarEstadoReserva, obtenerTodasReservas } from '../../api/reservaApi';
import './SolicitudDetalle.css';

const SolicitudDetalle = ({ solicitudId }) => {
  const { token } = useContext(AuthContext);
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const resp = await obtenerTodasReservas(token);
      const found = resp.find(r => r._id === solicitudId);
      setSolicitud(found);
    };
    cargar();
  }, [token, solicitudId]);

  if (!solicitud) return <p>Cargando solicitud…</p>;

  const aprobar = () => cambiarEstadoReserva(solicitudId, 'aprobado', token);
  const rechazar = () => cambiarEstadoReserva(solicitudId, 'rechazado', token);

  return (
    <div className="solicitud‑detalle-container">
      <h2>Solicitud: {solicitud._id}</h2>
      <p><strong>Usuario:</strong> {solicitud.usuario?.nombre} ({solicitud.usuario?.correo})</p>
      <p><strong>Espacio:</strong> {solicitud.espacio?.nombre}</p>
      <p><strong>Fecha:</strong> {new Date(solicitud.fechaEvento).toLocaleDateString()}</p>
      <p><strong>Hora Inicio:</strong> {solicitud.horaInicio}</p>
      <p><strong>Hora Fin:</strong> {solicitud.horaFin}</p>
      <p><strong>Estado:</strong> {solicitud.estado}</p>
      {solicitud.estado === 'pendiente' && (
        <div className="acciones‑detalle">
          <button onClick={aprobar} className="btn‑approve">Aprobar</button>
          <button onClick={rechazar} className="btn‑reject">Rechazar</button>
        </div>
      )}
    </div>
  );
};

export default SolicitudDetalle;
