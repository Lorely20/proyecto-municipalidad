const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const espacioRoutes = require('./routes/espacioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/espacios', espacioRoutes);
app.use('/api/reservas', reservaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
