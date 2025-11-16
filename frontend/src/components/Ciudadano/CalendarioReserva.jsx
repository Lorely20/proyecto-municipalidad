import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarioReserva.css';

const CalendarioReserva = ({ fechasOcupadas, onFechaSeleccionada }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  // Convertir strings de fechas (por ejemplo "2025‑11‑15") a objetos Date para comparación
  const fechasBloqueadas = fechasOcupadas.map(f => new Date(f));

  const tileDisabled = ({ date, view }) => {
    // Deshabilitar si es día ya ocupado o en vista mes
    if (view === 'month') {
      return fechasBloqueadas.some(
        fecha => fecha.getFullYear() === date.getFullYear()
              && fecha.getMonth() === date.getMonth()
              && fecha.getDate() === date.getDate()
      );
    }
    return false;
  };

  const handleChange = date => {
    setFechaSeleccionada(date);
    if (onFechaSeleccionada) {
      onFechaSeleccionada(date);
    }
  };

  return (
    <div className="calendario‑reserva">
      <Calendar
        onChange={handleChange}
        value={fechaSeleccionada}
        tileDisabled={tileDisabled}
        minDate={new Date()}  // no permitir fechas pasadas
      />
      {fechaSeleccionada && (
        <div className="seleccion‑info">
          Fecha elegida: {fechaSeleccionada.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default CalendarioReserva;
