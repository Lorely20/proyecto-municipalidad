import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import SolicitudForm from './SolicitudForm';
import CalendarioReserva from './CalendarioReserva';
import './EspacioDetalle.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const imagenesLocales = import.meta.glob('../assets/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default'
});

const EspacioDetalle = () => {
  const { id } = useParams();
  const [espacio, setEspacio] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resp = await api.get(`/espacios/${id}`);
        setEspacio(resp.data);
      } catch (err) {
        console.error('Error al cargar el espacio:', err);
      }
    };

    const cargarFechasOcupadas = async () => {
      try {
        const resp = await api.get(`/reservas/espacio/${id}`);
        setFechasOcupadas(resp.data);
      } catch (err) {
        console.error('Error al cargar fechas ocupadas:', err);
      }
    };

    cargarDatos();
    cargarFechasOcupadas();
  }, [id]);

  if (!espacio) return <p>No se encontró el espacio solicitado.</p>;

  const handleVerDisponibilidad = () => {
    setMostrarCalendario(true);
    setMostrarFormulario(false);
  };

  const handleSeleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarFormulario(true);
  };

  return (
    <div className="espacio-detalle">
      <h1>{espacio.nombre}</h1>
      <p><strong>Descripción:</strong> {espacio.descripcion}</p>
      <p><strong>Ubicación:</strong> {espacio.ubicacion}</p>
      <p><strong>Precio:</strong> Q{espacio.precioAlquiler}</p>
      <p><strong>Depósito:</strong> Q{espacio.deposito}</p>
      <p><strong>Contacto:</strong> {espacio.celularEncargado}</p>

      {espacio.imagenes && espacio.imagenes.length > 0 && (
        <div className="galeria">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {espacio.imagenes.map((img, i) => {
              const ruta = `../assets/${img}`;
              const srcImg = imagenesLocales[ruta];
              if (!srcImg) return null;
              return (
                <SwiperSlide key={i}>
                  <img src={srcImg} alt={`Imagen ${i + 1} de ${espacio.nombre}`} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}

      <div className="botones‑seccion">
        <button onClick={handleVerDisponibilidad}>Ver disponibilidad</button>
      </div>

      {mostrarCalendario && (
        <div className="calendario‑section">
          <h2>Seleccione una fecha disponible</h2>
          <CalendarioReserva
            fechasOcupadas={fechasOcupadas}
            onFechaSeleccionada={handleSeleccionarFecha}
          />
        </div>
      )}

      {mostrarFormulario && (
        <div className="formulario‑reserva">
          <h2>Enviar solicitud para {fechaSeleccionada.toLocaleDateString()}</h2>
          <SolicitudForm
            espacioId={id}
            fechaSeleccionada={fechaSeleccionada}
          />
        </div>
      )}
    </div>
  );
};

export default EspacioDetalle;