import React, { useState } from 'react';
import api from '../../api/api';
import './SolicitudForm.css';

const SolicitudForm = ({ espacioId, fechaSeleccionada, onEnviado }) => {
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [nombreEvento, setNombreEvento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fechaSeleccionada) {
      alert('Seleccione primero una fecha.');
      return;
    }

    try {
      await api.post('/reservas', {
        espacio: espacioId,
        fecha: fechaSeleccionada,
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
    <div className="solicitud‑form‑container">
      <form className="solicitud‑form" onSubmit={handleSubmit}>
        <h3>Formulario de Reserva</h3>

        <label>Fecha:</label>
        <input type="text" value={fechaSeleccionada.toLocaleDateString()} readOnly />

        <label>Hora inicio:</label>
        <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} required />

        <label>Hora fin:</label>
        <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} required />

        <label>Nombre del evento:</label>
        <input type="text" value={nombreEvento} onChange={e => setNombreEvento(e.target.value)} required />

        <label>Teléfono de contacto:</label>
        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} required />

        <label>Descripción del evento:</label>
        <textarea value={descripcionEvento} onChange={e => setDescripcionEvento(e.target.value)} required />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default SolicitudForm;
