const express = require('express');
const router = express.Router();

const { autenticar } = require('../middleware/authMiddleware');
const {
  fechasOcupadas,
  crearSolicitud,
  listarSolicitudes,
  tratarSolicitud,
  obtenerReservasPorUsuario
} = require('../controllers/reservaController');

// Rutas
router.get('/espacio/:espacioId', fechasOcupadas);
router.post('/', autenticar, crearSolicitud);
router.get('/usuario/:usuarioId', autenticar, obtenerReservasPorUsuario);
router.get('/', listarSolicitudes);
router.put('/:id', autenticar, tratarSolicitud);

module.exports = router;