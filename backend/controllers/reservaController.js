const Reserva = require('../models/Reserva');

exports.horasOcupadas = async (req, res) => {
  const { espacioId, fecha } = req.params;

  try {
    const inicioDia = new Date(`${fecha}T00:00:00`);
    const finDia = new Date(`${fecha}T23:59:59`);

    const reservas = await Reserva.find({
      espacio: espacioId,
      fecha: { $gte: inicioDia, $lte: finDia },
      estado: { $in: ['pendiente', 'aceptada'] }
    });

    const horarios = reservas.map(r => ({
      inicio: r.horaInicio,
      fin: r.horaFin
    }));

    res.json(horarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.fechasOcupadas = async (req, res) => {
  try {
    const espacioId = req.params.espacioId;
    const reservas = await Reserva.find({
      espacio: espacioId,
      estado: { $in: ['pendiente', 'aceptada'] }
    });

    const fechas = reservas.map(r => r.fecha.toISOString().split('T')[0]);
    res.json(fechas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.crearSolicitud = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;

    const {
      espacio,
      fecha,
      horaInicio,
      horaFin,
      nombreEvento,
      telefono,
      descripcionEvento
    } = req.body;

    const yaExiste = await Reserva.findOne({
      espacio,
      fecha,
      estado: { $in: ['pendiente', 'aceptada'] }
    });

    if (yaExiste) {
      return res.status(400).json({ mensaje: 'Fecha no disponible' });
    }

    const reserva = await Reserva.create({
      espacio,
      usuario: usuarioId,
      fecha,
      horaInicio,
      horaFin,
      nombreEvento,
      telefono,
      descripcionEvento,
      estado: 'pendiente'
    });

    res.status(201).json(reserva);

  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// *** LISTAR TODAS LAS SOLICITUDES (ENCARGADO) ***
exports.listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Reserva.find()
      .populate('usuario')
      .populate('espacio')
      .sort({ fecha: 1 });

    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.tratarSolicitud = async (req, res) => {
  const id = req.params.id;
  const { accion } = req.body;

  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) return res.status(404).json({ mensaje: 'Solicitud no encontrada' });

    if (accion === 'aceptar') reserva.estado = 'aceptada';
    if (accion === 'rechazar') reserva.estado = 'rechazada';

    reserva.fechaTratamiento = new Date();
    await reserva.save();

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerReservasPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;

    const reservas = await Reserva.find({ usuario: usuarioId })
      .populate('espacio')
      .sort({ fecha: 1 });

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
