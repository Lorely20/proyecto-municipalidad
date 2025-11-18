import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Confirmacion.css";

const Confirmacion = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const fecha = query.get("fecha");
  const horario = query.get("horario");
  const navigate = useNavigate();

  const finalizar = () => {
    alert("¡Reserva confirmada!");
    navigate("/espacios");
  };

  return (
    <div className="confirmacion-container">
      <h2>🎉 ¡Reserva Lista!</h2>

      <div className="confirmacion-detalles">
        <p><strong>Espacio ID:</strong> {id}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Horario:</strong> {horario}</p>
      </div>

      <button className="boton-confirmar" onClick={finalizar}>
        Finalizar
      </button>
    </div>
  );
};

export default Confirmacion;
