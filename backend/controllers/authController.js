const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  try {
    const existente = await Usuario.findOne({ correo });
    if (existente) return res.status(400).json({ mensaje:'Correo ya registrado' });
    const hash = await bcrypt.hash(contraseña, 10);
    const usuario = await Usuario.create({ nombre, correo, contraseñaHash:hash, rol:'ciudadano' });
    res.status(201).json({ mensaje:'Usuario registrado' });
  } catch(error) {
    res.status(500).json({ mensaje: error.message });
  }
};
exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    const valido = await usuario.validarContraseña(contraseña);
    if (!valido) return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
