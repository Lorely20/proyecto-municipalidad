import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) return <div>Loading...</div>;
  if (!usuario) return <Navigate to="/login" />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
