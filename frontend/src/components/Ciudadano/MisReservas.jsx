import React, { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import './MisReservas.css';

const MisReservas = () => {
  const { usuario } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const resp = await api.get(`/reservas/usuario/${usuario.id}`);
        setReservas(resp.data);
      } catch (err) {
        console.error('Error al obtener mis reservas:', err);
      }
    };

    if (usuario?.id) {
      cargar();
    }
  }, [usuario]);

  // 🔧 Formatear fecha sin desfasajes
  const formatearFechaLocal = (fecha) => {
    if (!fecha) return '';
    try {
      const f = typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)
        ? new Date(`${fecha}T00:00:00`)
        : new Date(fecha);

      if (isNaN(f.getTime())) return 'Fecha inválida';
      return f.toLocaleDateString('es-AR');
    } catch {
      return 'Fecha inválida';
    }
  };

  // 🕒 Mostrar hora formateada
  const formatearHora = (inicio, fin) => {
    if (inicio && fin) return `${inicio} – ${fin}`;
    if (inicio) return inicio;
    return '—';
  };

  return (
    <div className="mis‑reservas‑container">
      <h2>Mis Reservas</h2>
      <table className="tabla‑reservas">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Espacio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r._id}>
              <td>{formatearFechaLocal(r.fecha)}</td>
              <td>{formatearHora(r.horaInicio, r.horaFin)}</td>
              <td>{r.espacio?.nombre}</td>
              <td>{r.estado.charAt(0).toUpperCase() + r.estado.slice(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisReservas;
