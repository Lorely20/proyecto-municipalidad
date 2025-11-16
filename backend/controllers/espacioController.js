const Espacio = require('../models/Espacio');

exports.listarEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.find();
    res.json(espacios);
  } catch(error) {
    res.status(500).json({ mensaje:error.message });
  }
};

exports.detalleEspacio = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) return res.status(404).json({ mensaje:'Espacio no encontrado' });
    res.json(espacio);
  } catch(error) {
    res.status(500).json({ mensaje:error.message });
  }
};
