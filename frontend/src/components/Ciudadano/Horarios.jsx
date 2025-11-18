import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Horarios.css";

const Horarios = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const fecha = query.get("fecha");

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const horariosDisponibles = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00"
  ];

  const confirmarReserva = () => {
    if (!horarioSeleccionado) return alert("Selecciona un horario.");
    navigate(`/confirmacion/${id}?fecha=${fecha}&horario=${horarioSeleccionado}`);
  };

  return (
    <div className="horarios-container">
      <h2>🕒 Horarios disponibles para el {fecha}</h2>
      <div className="horarios-lista">
        {horariosDisponibles.map((h, i) => (
          <button
            key={i}
            className={`horario-btn ${horarioSeleccionado === h ? "seleccionado" : ""}`}
            onClick={() => setHorarioSeleccionado(h)}
          >
            {h}
          </button>
        ))}
      </div>

      <button className="boton-reserva" onClick={confirmarReserva}>
        Confirmar Reserva
      </button>
    </div>
  );
};

export default Horarios;
