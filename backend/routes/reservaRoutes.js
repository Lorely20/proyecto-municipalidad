const express = require('express');
const router = express.Router();
const { autenticar } = require('../middleware/authMiddleware');
const { permitirRoles } = require('../middleware/roleMiddleware');

const {
  fechasOcupadas,
  horasOcupadas,
  crearSolicitud,
  listarSolicitudes,
  tratarSolicitud,
  obtenerReservasPorUsuario
} = require('../controllers/reservaController');

// FECHAS OCUPADAS
router.get('/espacio/:espacioId', fechasOcupadas);

// HORAS OCUPADAS
router.get('/ocupadas/:espacioId/:fecha', horasOcupadas);

// CREAR SOLICITUD (solo usuarios logueados)
router.post('/', autenticar, crearSolicitud);

// RESERVAS DEL USUARIO
router.get('/usuario/:usuarioId', autenticar, obtenerReservasPorUsuario);

// *** RUTA DE ADMIN/ENCARGADO ***
router.get('/admin', autenticar, permitirRoles('encargado'), listarSolicitudes);

// TRATAR SOLICITUD (solo encargados)
router.put('/:id', autenticar, permitirRoles('encargado'), tratarSolicitud);

module.exports = router;
