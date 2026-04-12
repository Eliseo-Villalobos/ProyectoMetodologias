const db = require('../config/db');

const Aerolinea = {
    async getAll() {
        const [rows] = await db.execute('SELECT * FROM aerolineas');
        return rows;
    },

    async findById(id) {
        const [rows] = await db.execute('SELECT * FROM aerolineas WHERE id_aerolinea = ?', [id]);
        return rows[0];
    }
};

module.exports = Aerolinea;