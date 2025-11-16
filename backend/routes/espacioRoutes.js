const express = require('express');
const router = express.Router();

const {
  listarEspacios,
  detalleEspacio
} = require('../controllers/espacioController');

// Listar todos los espacios
router.get('/', listarEspacios);

// Obtener detalle de un espacio por ID
router.get('/:id', detalleEspacio);

module.exports = router;