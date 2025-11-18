import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { cambiarEstadoReserva, obtenerReservasAdmin } from '../../api/reservaApi';
import './SolicitudDetalle.css';

const SolicitudDetalle = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerReservasAdmin(token);
      const encontrada = data.find(s => s._id === id);
      setSolicitud(encontrada);
    };
    cargar();
  }, [id, token]);

  const cambiarEstado = async (accion) => {
    await cambiarEstadoReserva(id, accion, token);

    setSolicitud(prev => ({
      ...prev,
      estado: accion === 'aceptar' ? 'aceptada' : 'rechazada'
    }));
  };

  if (!solicitud) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <h2>Detalles de la Solicitud</h2>

      <p><strong>Usuario:</strong> {solicitud.usuario?.nombre} ({solicitud.usuario?.correo})</p>
      <p><strong>Espacio:</strong> {solicitud.espacio?.nombre}</p>
      <p><strong>Fecha:</strong> {new Date(solicitud.fecha).toLocaleDateString()}</p>
      <p><strong>Hora Inicio:</strong> {solicitud.horaInicio}</p>
      <p><strong>Hora Fin:</strong> {solicitud.horaFin}</p>
      <p><strong>Evento:</strong> {solicitud.nombreEvento}</p>
      <p><strong>Teléfono:</strong> {solicitud.telefono}</p>
      <p><strong>Descripción:</strong> {solicitud.descripcionEvento}</p>
      <p><strong>Estado:</strong> {solicitud.estado}</p>

      {solicitud.estado === 'pendiente' && (
        <div className="acciones-detalle">
          <button className="btn-approve" onClick={() => cambiarEstado('aceptar')}>Aceptar</button>
          <button className="btn-reject" onClick={() => cambiarEstado('rechazar')}>Rechazar</button>
        </div>
      )}
    </div>
  );
};

export default SolicitudDetalle;
