import React from 'react';
import { useParams } from 'react-router-dom';
import SolicitudForm from './SolicitudForm';

const SolicitudFormPage = () => {
  const { id, fecha } = useParams();

  const [year, month, day] = fecha.split("-");
  const fechaSeleccionada = new Date(year, month - 1, day);

  return (
    <div className="solicitud-form-page">
      <h2>Enviar solicitud para {fechaSeleccionada.toLocaleDateString("es")}</h2>
      <SolicitudForm 
        espacioId={id} 
        fechaSeleccionada={fechaSeleccionada} 
      />
    </div>
  );
};

export default SolicitudFormPage;
