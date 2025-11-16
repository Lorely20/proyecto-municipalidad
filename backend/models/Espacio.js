const mongoose = require('mongoose');

const EspacioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  ubicacion: { type: String },
  imagenes: [{ type: String }], 
  celularEncargado: { type: String },
  precioAlquiler: { type: Number, default: 0 },
  deposito: { type: Number, default: 0 }
});

module.exports = mongoose.model('Espacio', EspacioSchema);
