const Aerolinea = require('../models/aerolineaModel');

const getAll = async (req, res) => {
    try {
        const aerolineas = await Aerolinea.getAll();
        res.json(aerolineas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener aerolíneas' });
    }
};

const getById = async (req, res) => {
    try {
        const aerolinea = await Aerolinea.findById(req.params.id);
        if (!aerolinea) return res.status(404).json({ mensaje: 'Aerolínea no encontrada' });
        res.json(aerolinea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener aerolínea' });
    }
};

module.exports = { getAll, getById };