import React, { useEffect, useState, useContext } from 'react';
import { obtenerReservasAdmin } from '../../api/reservaApi';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SolicitudesList.css';

const SolicitudesList = () => {
  const { token } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const data = await obtenerReservasAdmin(token);
      setSolicitudes(data);
    };
    fetchSolicitudes();
  }, [token]);

  const irADetalle = (id) => {
    navigate(`/admin/solicitudes/${id}`);
  };

  return (
    <div className="solicitudes-container">
      <h2>Solicitudes de Reserva</h2>
      <table className="solicitudes-table">
        <thead>
          <tr>
            <th>Espacio</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Ver Detalles</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(s => (
            <tr key={s._id}>
              <td>{s.espacio.nombre}</td>
              <td>{new Date(s.fecha).toLocaleDateString()}</td>
              <td>{s.estado}</td>
              <td>
                <button className="btn-detalle" onClick={() => irADetalle(s._id)}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudesList;
