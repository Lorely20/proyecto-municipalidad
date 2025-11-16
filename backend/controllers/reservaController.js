const Reserva = require('../models/Reserva');

exports.fechasOcupadas = async (req, res) => {
  const espacioId = req.params.espacioId;
  try {
    const reservas = await Reserva.find({ espacio:espacioId, estado:{ $in:['pendiente','aceptada'] } });
    const fechas = reservas.map(r => r.fecha.toISOString().split('T')[0]);
    res.json(fechas);
  } catch(error) {
    res.status(500).json({ mensaje:error.message });
  }
};

exports.crearSolicitud = async (req, res) => {
  const { espacio, fecha, hora, motivo } = req.body;
  const usuarioId = req.usuario._id;
  try {
    const yaExiste = await Reserva.findOne({ espacio, fecha, estado:{ $in:['pendiente','aceptada'] } });
    if (yaExiste) return res.status(400).json({ mensaje:'Fecha no disponible' });
    const reserva = await Reserva.create({ espacio, usuario:usuarioId, fecha, hora, motivo, estado:'pendiente' });
    res.status(201).json(reserva);
  } catch(error) {
    res.status(500).json({ mensaje:error.message });
  }
};

exports.listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Reserva.find().populate('usuario').populate('espacio');
    res.json(solicitudes);
  } catch(error) {
    res.status(500).json({ mensaje:error.message });
  }
};

exports.tratarSolicitud = async (req, res) => {
  const id = req.params.id;
  const { accion } = req.body; // 'aceptar' o 'rechazar'
  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) return res.status(404).json({ mensaje:'Solicitud no encontrada' });
    if (accion === 'aceptar') reserva.estado = 'aceptada';
    else if (accion === 'rechazar') reserva.estado = 'rechazada';
    reserva.fechaTratamiento = new Date();
    await reserva.save();
    res.json(reserva);
  } catch(error) {
    res.status(500).json({ mensaje:error.message });
  }
};

// Obtener reservas de un usuario específico
exports.obtenerReservasPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;

    const reservas = await Reserva.find({ usuario: usuarioId })
                                  .populate('espacio')
                                  .sort({ fecha: 1 });

    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas por usuario:', error);
    res.status(500).json({ mensaje: error.message });
  }
};
