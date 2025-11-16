import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservas';

export const crearReserva = async (reservaData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(API_URL, reservaData, config);
  return response.data;
};

export const obtenerReservasUsuario = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${API_URL}/mis`, config);
  return response.data;
};

export const obtenerReservasAdmin = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${API_URL}/admin`, config);
  return response.data;
};

export const cambiarEstadoReserva = async (id, estado, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${API_URL}/${id}`, { estado }, config);
  return response.data;
};
