const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  espacio: { type: mongoose.Schema.Types.ObjectId, ref: 'Espacio', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, required: true },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada'],
    default: 'pendiente'
  },
  motivo: { type: String },
  detallesAdicionales: { type: String },
  revisadoPor: { type: String } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserva', ReservaSchema);
