const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  espacio: { type: mongoose.Schema.Types.ObjectId, ref: 'Espacio', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },

  fecha: { type: Date, required: true },

  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },

  nombreEvento: { type: String, required: true },
  telefono: { type: String, required: true },
  descripcionEvento: { type: String, required: true },

  estado: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada'],
    default: 'pendiente'
  },

  revisadoPor: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserva', ReservaSchema);
