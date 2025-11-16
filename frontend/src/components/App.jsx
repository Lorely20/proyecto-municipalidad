import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import Navbar from './layout/Navbar';
import PrivateRoute from './layout/PrivateRoute';

import Login from './auth/Login';
import Register from './auth/Register';

import EspacioList from './Ciudadano/EspacioList';
import EspacioDetalle from './Ciudadano/EspacioDetalle';
import MisReservas from './Ciudadano/MisReservas';

import SolicitudesList from './admin/SolicitudesList';
import Landing from './Landing';

const AppContent = () => {
  const location = useLocation();
  const hideNavbarOn = ['/', '/login', '/register'];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
        <Route path="/mis-reservas" element={
          <PrivateRoute roles={['ciudadano']}>
            <MisReservas />
          </PrivateRoute>
        } />
        <Route path="/admin/solicitudes" element={
          <PrivateRoute roles={['encargado']}>
            <SolicitudesList />
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
