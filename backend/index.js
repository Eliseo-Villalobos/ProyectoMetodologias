const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// VERIFICAR CONEXION A TABLAS AL INICIAR
async function verificarTablas() {
  try {
    const tablas = ['usuarios', 'viajes', 'reservas', 'aerolineas'];

    for (const tabla of tablas) {
      const [rows] = await db.query(`SELECT COUNT(*) as count FROM ${tabla}`);
      console.log(`Tabla "${tabla}": ${rows[0].count} registros`);
    }
  } catch (err) {
    console.error(' Error verificando tablas:', err.message);
  }
}

// MENSAJE PARA CUANDO SE RECIBA ALGO DE CONTACTO
app.post('/contacto', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.send({ mensaje: 'Recibido correctamente' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/viajes', require('./routes/viajeRoutes'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/aerolineas', require('./routes/aerolineaRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  await verificarTablas();
});
