import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('usuario');
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUsuario(parsedUser);
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      } catch (error) {
        console.error("Error al parsear usuario de localStorage:", error);
        localStorage.removeItem('usuario');
      }
    }
  }, []);

  const login = async ({ correo, contraseña }) => {
  const resp = await api.post('/auth/login', { correo, contraseña });
  const { token: t, id, nombre, correo: c, rol } = resp.data;

  const userObj = { id, nombre, correo: c, rol };

  setToken(t);
  setUsuario(userObj);
  localStorage.setItem('token', t);
  localStorage.setItem('usuario', JSON.stringify(userObj));
  api.defaults.headers.common.Authorization = `Bearer ${t}`;
  return userObj;
};

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    delete api.defaults.headers.common.Authorization;
  };

  const register = async ({ nombre, correo, contraseña }) => {
    await api.post('/auth/register', { nombre, correo, contraseña });
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
