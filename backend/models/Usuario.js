const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseñaHash: { type: String, required: true },
  rol: {
    type: String,
    enum: ['ciudadano','encargado'],
    default: 'ciudadano'
  }
});

UsuarioSchema.methods.validarContraseña = function(password) {
  return bcrypt.compare(password, this.contraseñaHash);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
