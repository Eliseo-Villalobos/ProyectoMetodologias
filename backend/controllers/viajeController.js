const Viaje = require('../models/viajeModel');

const getAll = async (req, res) => {
    try {
        const viajes = await Viaje.getAll();
        res.json(viajes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener viajes' });
    }
};

const getById = async (req, res) => {
    try {
        const viaje = await Viaje.findById(req.params.id);
        if (!viaje) return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        res.json(viaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener viaje' });
    }
};

const create = async (req, res) => {
    const { destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url } = req.body;
    try {
        const id = await Viaje.create(destino, pais, fecha_salida, fecha_regreso, precio, cupo_disponible, descripcion, imagen_url);
        res.status(201).json({ mensaje: 'Viaje creado', id_viaje: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear viaje' });
    }
};

const update = async (req, res) => {
    try {
        const filas = await Viaje.update(req.params.id, req.body);
        if (!filas) return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        res.json({ mensaje: 'Viaje actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar viaje' });
    }
};

const remove = async (req, res) => {
    try {
        const filas = await Viaje.delete(req.params.id);
        if (!filas) return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        res.json({ mensaje: 'Viaje eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar viaje' });
    }
};

module.exports = { getAll, getById, create, update, remove };