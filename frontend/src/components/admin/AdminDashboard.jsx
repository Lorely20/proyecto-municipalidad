import React, { useEffect, useState, useContext } from 'react';
import './AdminDashboard.css';
import { obtenerTodasReservas, cambiarEstado } from '../../api/reservaApi';
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);

  const cargarReservas = async () => {
    const datos = await obtenerTodasReservas(token);
    if (Array.isArray(datos)) setReservas(datos);
  };

  useEffect(() => {
    if (token) cargarReservas();
  }, [token]);

  const handleCambio = async (id, nuevoEstado) => {
    await cambiarEstado(id, nuevoEstado, token);
    cargarReservas();
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Panel de Administración</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Espacio</th>
            <th>Fecha</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r._id}>
              <td>{r.usuario?.nombre} ({r.usuario?.correo})</td>
              <td>{r.espacio?.nombre}</td>
              <td>{new Date(r.fechaEvento).toLocaleDateString()}</td>
              <td>{r.horaInicio}</td>
              <td>{r.horaFin}</td>
              <td>{r.estado}</td>
              <td>
                {r.estado === 'pendiente' && (
                  <>
                    <button className="btn btn-success btn-sm me-1" onClick={() => handleCambio(r._id, 'aprobado')}>
                      Aprobar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleCambio(r._id, 'rechazado')}>
                      Rechazar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
