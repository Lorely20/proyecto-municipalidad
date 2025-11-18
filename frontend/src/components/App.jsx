import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import Navbar from './layout/Navbar';
import PrivateRoute from './layout/PrivateRoute';

// Auth
import Login from './auth/Login';
import Register from './auth/Register';

// Ciudadano
import EspacioList from './Ciudadano/EspacioList';
import EspacioDetalle from './Ciudadano/EspacioDetalle';
import Disponibilidad from './Ciudadano/Disponibilidad';
import SolicitudFormPage from './Ciudadano/SolicitudFormPage';
import MisReservas from './Ciudadano/MisReservas';
import Confirmacion from './Ciudadano/Confirmacion';

// Encargado
import SolicitudesList from './admin/SolicitudesList';
import SolicitudDetalle from './admin/SolicitudDetalle';

import Landing from './Landing';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarOn = ['/', '/login', '/register'];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>

        {/* Público */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ciudadano */}
        <Route path="/espacios" element={
          <PrivateRoute roles={['ciudadano']}>
            <EspacioList />
          </PrivateRoute>
        } />

        <Route path="/espacios/:id" element={
          <PrivateRoute roles={['ciudadano']}>
            <EspacioDetalle />
          </PrivateRoute>
        } />

        <Route path="/espacios/:id/disponibilidad" element={
          <PrivateRoute roles={['ciudadano']}>
            <Disponibilidad />
          </PrivateRoute>
        } />

        <Route path="/espacios/:id/solicitar/:fecha" element={
          <PrivateRoute roles={['ciudadano']}>
            <SolicitudFormPage />
          </PrivateRoute>
        } />

        <Route path="/mis-reservas" element={
          <PrivateRoute roles={['ciudadano']}>
            <MisReservas />
          </PrivateRoute>
        } />

        <Route path="/confirmacion/:id" element={
          <PrivateRoute roles={['ciudadano']}>
            <Confirmacion />
          </PrivateRoute>
        } />

        {/* Encargado */}
        <Route path="/admin/solicitudes" element={
          <PrivateRoute roles={['encargado']}>
            <SolicitudesList />
          </PrivateRoute>
        } />

        {/* Ruta de DETALLE de solicitud */}
        <Route path="/admin/solicitudes/:id" element={
          <PrivateRoute roles={['encargado']}>
            <SolicitudDetalle />
          </PrivateRoute>
        } />

      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
