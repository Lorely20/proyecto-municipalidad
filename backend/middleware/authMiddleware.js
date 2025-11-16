const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const autenticar = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensaje: 'No autorizado' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(payload.id);
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no existe' });
    req.usuario = usuario;
    next();
  } catch(err) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = { autenticar };
