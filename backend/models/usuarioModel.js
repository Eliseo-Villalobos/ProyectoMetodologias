const db = require('../config/db');

const Usuario = {
    async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },

    async create(nombre, email, password, telefono) {
        const [result] = await db.execute(
        'INSERT INTO usuarios (nombre, email, password, telefono) VALUES (?, ?, ?, ?)',
        [nombre, email, password, telefono]
        );
        return result.insertId;
    }
};

module.exports = Usuario;