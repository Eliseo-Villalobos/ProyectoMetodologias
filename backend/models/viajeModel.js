const db = require('../config/db');

const Viaje = {
    async getAll() {
        const [rows] = await db.execute('SELECT * FROM viajes');
        return rows;
    },

    async findById(id) {
        const [rows] = await db.execute('SELECT * FROM viajes WHERE id_viaje = ?', [id]);
        return rows[0];
    },

    async create(destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url) {
        const [result] = await db.execute(
            'INSERT INTO viajes (destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url]
        );
        return result.insertId;
    },

    async update(id, campos) {
        const { destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url } = campos;
        const [result] = await db.execute(
            'UPDATE viajes SET destino=?, pais=?, fecha_salida=?, fecha_regreso=?, precio=?, cupo_disponible=?, descripcion=?, imagen_url=? WHERE id_viaje=?',
            [destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.execute('DELETE FROM viajes WHERE id_viaje = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Viaje;