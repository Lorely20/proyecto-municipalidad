const mongoose = require('mongoose');
require('dotenv').config();
const Espacio = require('../models/Espacio');

const espacios = [
  {
    nombre: 'SALON MUNICIPAL',
    descripcion: 'Espacio para eventos sociales.',
    ubicacion: 'Zona 1',
    imagenes: [
      '/assets/salon1.jpg',
      '/assets/salon1_2.jpg',
      '/assets/salon1_3.jpg'
    ],
    celularEncargado: '2222222',
    precioAlquiler: 500,
    deposito: 500
  },
  {
    nombre: 'SALON PARA CAPACITACIONES',
    descripcion: 'Ideal para talleres.',
    ubicacion: 'Zona 2',
    imagenes: [
      '/assets/salon2.jpg',
      '/assets/salon2_2.jpg'
    ],
    celularEncargado: '2222222',
    precioAlquiler: 0,
    deposito: 0
  },
  {
    nombre: 'ESTADIO MUNICIPAL',
    descripcion: 'Espacio deportivo amplio.',
    ubicacion: 'Zona 3',
    imagenes: [
      '/assets/estadio.jpg',
      '/assets/estadio2.jpg'
    ],
    celularEncargado: '2222222',
    precioAlquiler: 0,
    deposito: 0
  }
];

const insertarEspacios = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    const existentes = await Espacio.find();
    if (existentes.length > 0) {
      console.log('Espacios ya existen, omitiendo inserción.');
      return process.exit(0);
    }

    await Espacio.insertMany(espacios);
    console.log('Espacios insertados correctamente');
    process.exit(0);
  } catch (err) {
    console.error('Error al insertar espacios:', err);
    process.exit(1);
  }
};

insertarEspacios();
