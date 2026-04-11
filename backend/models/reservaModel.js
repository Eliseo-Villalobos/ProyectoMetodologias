const db = require('../config/db');

const Reserva = {
    async getByUsuario(id_usuario) {
        const [rows] = await db.execute(
            `SELECT r.*, v.destino, v.pais, v.fecha_salida, v.fecha_regreso, v.precio
             FROM reservas r
             JOIN viajes v ON r.id_viaje = v.id_viaje
             WHERE r.id_usuario = ?`,
            [id_usuario]
        );
        return rows;
    },

    async create(id_usuario, id_viaje, cantidad_personas) {
        const [result] = await db.execute(
            'INSERT INTO reservas (id_usuario, id_viaje, cantidad_personas) VALUES (?, ?, ?)',
            [id_usuario, id_viaje, cantidad_personas]
        );
        return result.insertId;
    },

    async updateEstado(id_reserva, estado) {
        const [result] = await db.execute(
            'UPDATE reservas SET estado = ? WHERE id_reserva = ?',
            [estado, id_reserva]
        );
        return result.affectedRows;
    },

    async delete(id_reserva) {
        const [result] = await db.execute('DELETE FROM reservas WHERE id_reserva = ?', [id_reserva]);
        return result.affectedRows;
    }
};

module.exports = Reserva;