const jwt = require('jsonwebtoken');
const db = require('../config/db');

const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan usuario o contraseña' });
  }

  try {
    // Buscar administrador por usuario
    const [rows] = await db.execute(
      'SELECT * FROM administrador WHERE usuario = ?',
      [usuario]
    );

    const admin = rows[0];

    if (!admin) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Comparar contraseña en texto plano
    if (contrasena !== admin.contrasena) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id_admin: admin.id_admin, usuario: admin.usuario, rol: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      admin: {
        id_admin: admin.id_admin,
        usuario: admin.usuario,
        rol: 'admin'
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };