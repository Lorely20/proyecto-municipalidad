import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './SolicitudForm.css';

const SolicitudForm = ({ espacioId, fechaSeleccionada, onEnviado }) => {
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [nombreEvento, setNombreEvento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  useEffect(() => {
    const fetchHorarios = async () => {
      if (!fechaSeleccionada || !espacioId) return;

      try {
        const fechaFormato = fechaSeleccionada.toISOString().split('T')[0];
        const resp = await api.get(`/reservas/ocupadas/${espacioId}/${fechaFormato}`);
        setHorariosOcupados(resp.data);
      } catch (err) {
        console.error("Error al cargar horarios ocupados:", err);
      }
    };

    fetchHorarios();
  }, [fechaSeleccionada, espacioId]);

  const estaHorarioOcupado = (inicio, fin) => {
    return horariosOcupados.some(h => {
      return (
        (inicio >= h.inicio && inicio < h.fin) ||
        (fin > h.inicio && fin <= h.fin) ||
        (inicio <= h.inicio && fin >= h.fin)
      );
    });
  };

  const rangoOcupado = horaInicio && horaFin && estaHorarioOcupado(horaInicio, horaFin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rangoOcupado) {
      alert("Ese rango de horario ya está ocupado. Por favor elige otro.");
      return;
    }

    try {
      await api.post('/reservas', {
        espacio: espacioId,
        fecha: fechaSeleccionada.toISOString().split('T')[0],
        horaInicio,
        horaFin,
        nombreEvento,
        telefono,
        descripcionEvento,
        estado: 'pendiente'
      });

      alert('Solicitud enviada correctamente. Está en estado pendiente.');
      if (onEnviado) onEnviado();
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <div className="form-container">
      <form className="solicitud-form" onSubmit={handleSubmit}>
        <h2>Formulario de Reserva</h2>

        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="text"
            value={fechaSeleccionada.toLocaleDateString("es")}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Hora de inicio:</label>
          <input
            type="time"
            value={horaInicio}
            onChange={e => setHoraInicio(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Hora de fin:</label>
          <input
            type="time"
            value={horaFin}
            onChange={e => setHoraFin(e.target.value)}
            required
          />
        </div>

        {rangoOcupado && (
          <p className="error-text">⚠️ Ese rango de horario ya está ocupado. Por favor elige otro.</p>
        )}

        <div className="form-group">
          <label>Nombre del evento:</label>
          <input type="text" value={nombreEvento} onChange={e => setNombreEvento(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Teléfono de contacto:</label>
          <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Descripción del evento:</label>
          <textarea value={descripcionEvento} onChange={e => setDescripcionEvento(e.target.value)} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={rangoOcupado}>Enviar Solicitud</button>
        </div>

        {horariosOcupados.length > 0 && (
          <div className="horarios-ocupados">
            <p><strong>Horarios ya reservados para esta fecha:</strong></p>
            <ul>
              {horariosOcupados.map((h, index) => (
                <li key={index}>{`${h.inicio} – ${h.fin}`}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SolicitudForm;
