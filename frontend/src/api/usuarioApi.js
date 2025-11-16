import API from './api';

export const loginUsuario = (credenciales) => API.post('/auth/login', credenciales);
export const registrarUsuario = (datos) => API.post('/auth/register', datos);
export const obtenerUsuario = () => API.get('/usuarios/me');
