const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

async function verificarTablas() {
  try {
    const tablas = ['administrador', 'proyecto', 'empresa', 'servicio', 'contacto', 'visita', 'imagen_proyecto'];
    for (const tabla of tablas) {
      const [rows] = await db.query(`SELECT COUNT(*) as count FROM ${tabla}`);
      console.log(`Tabla "${tabla}": ${rows[0].count} registros`);
    }
  } catch (err) {
    console.error('Error verificando tablas:', err.message);
  }
}

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/proyectos', require('./routes/proyectoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  await verificarTablas();
});