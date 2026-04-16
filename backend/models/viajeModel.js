const db = require('../config/db');

const Viaje = {
    async getAll() {
        const [rows] = await db.execute(`
            SELECT v.*, a.nombre as aerolinea_nombre, a.logo_url as aerolinea_logo
            FROM viajes v
            LEFT JOIN aerolineas a ON v.id_aerolinea = a.id_aerolinea
        `);
        return rows;
    },

    async findById(id) {
        const [rows] = await db.execute(`
            SELECT v.*, a.nombre as aerolinea_nombre, a.logo_url as aerolinea_logo
            FROM viajes v
            LEFT JOIN aerolineas a ON v.id_aerolinea = a.id_aerolinea
            WHERE v.id_viaje = ?
        `, [id]);
        return rows[0];
    },

    async create(destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url, id_aerolinea, latitud, longitud) {
        const [result] = await db.execute(
            'INSERT INTO viajes (destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url, id_aerolinea, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url, id_aerolinea, latitud, longitud]
        );
        return result.insertId;
    },

    async update(id, campos) {
        const { destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url, id_aerolinea, latitud, longitud } = campos;
        const [result] = await db.execute(
            'UPDATE viajes SET destino=?, pais=?, fecha_salida=?, fecha_regreso=?, precio=?, cupo_disponible=?, descripcion=?, imagen_url=?, id_aerolinea=?, latitud=?, longitud=? WHERE id_viaje=?',
            [destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url, id_aerolinea, latitud, longitud, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.execute('DELETE FROM viajes WHERE id_viaje = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Viaje;