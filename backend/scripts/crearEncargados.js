const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Usuario = require('../models/Usuario');

const encargados = [
  { nombre: 'Encargado 1', correo: 'encargado1@gmail.com', contraseña: 'pass1234' },
  { nombre: 'Encargado 2', correo: 'encargado2@gmail.com', contraseña: 'pass1234' },
  { nombre: 'Encargado 3', correo: 'encargado3@gmail.com', contraseña: 'pass1234' },
];

const crearEncargados = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    for (let enc of encargados) {
      const existe = await Usuario.findOne({ correo: enc.correo });
      if (existe) {
        console.log(`Ya existe: ${enc.correo}`);
        continue;
      }

      const hash = await bcrypt.hash(enc.contraseña, 10);
      await Usuario.create({
        nombre: enc.nombre,
        correo: enc.correo,
        contraseñaHash: hash,
        rol: 'encargado'
      });

      console.log(`Encargado creado: ${enc.correo}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

crearEncargados();
