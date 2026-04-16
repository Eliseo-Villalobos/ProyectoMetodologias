const Reserva = require('../models/reservaModel');

const getMisReservas = async (req, res) => {
    try {
        const reservas = await Reserva.getByUsuario(req.params.id_usuario);
        res.json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener reservas' });
    }
};

const create = async (req, res) => {
    const { id_usuario, id_viaje, cantidad_personas } = req.body;
    try {
        const id = await Reserva.create(id_usuario, id_viaje, cantidad_personas);
        res.status(201).json({ mensaje: 'Reserva creada', id_reserva: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear reserva' });
    }
};

const updateEstado = async (req, res) => {
    const { estado } = req.body;
    try {
        const filas = await Reserva.updateEstado(req.params.id, estado);
        if (!filas) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        res.json({ mensaje: 'Estado actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar reserva' });
    }
};

const remove = async (req, res) => {
    try {
        const filas = await Reserva.delete(req.params.id);
        if (!filas) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        res.json({ mensaje: 'Reserva cancelada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar reserva' });
    }
};

module.exports = { getMisReservas, create, updateEstado, remove };