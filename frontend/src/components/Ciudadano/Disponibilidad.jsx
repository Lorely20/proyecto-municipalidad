import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import './Disponibilidad.css';

registerLocale("es", es);

const Disponibilidad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  // 🔥 Conversión segura sin desfase UTC (NO usar toISOString)
  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString("sv-SE"); // → yyyy-mm-dd
  };

  const handleSubmit = () => {
    if (fechaSeleccionada) {
      const fechaFormato = formatearFecha(fechaSeleccionada);
      navigate(`/espacios/${id}/solicitar/${fechaFormato}`);
    }
  };

  return (
    <div className="disponibilidad-wrapper">
      <div className="disponibilidad-card">
        <h2 className="titulo">
          Seleccione una fecha disponible
        </h2>

        <DatePicker
          selected={fechaSeleccionada}
          onChange={setFechaSeleccionada}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          locale="es"
          inline
        />

        {fechaSeleccionada && (
          <p className="fecha-seleccionada">
            Has seleccionado: <strong>{fechaSeleccionada.toLocaleDateString("es")}</strong>
          </p>
        )}

        <button
          className="btn-continuar"
          onClick={handleSubmit}
          disabled={!fechaSeleccionada}
        >
          Continuar con la reserva
        </button>
      </div>
    </div>
  );
};

export default Disponibilidad;
