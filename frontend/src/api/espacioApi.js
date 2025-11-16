import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerEspacio = async (id, token) => {
  const resp = await axios.get(`${API_URL}/espacios/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return resp.data;
};

export const obtenerFechasOcupadas = async (espacioId, token) => {
  const resp = await axios.get(`${API_URL}/reservas/ocupadas/${espacioId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resp.data;  
};

export const crearReserva = async (datos, token) => {
  const resp = await axios.post(`${API_URL}/reservas`, datos, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resp.data;
};
