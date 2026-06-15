const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
  addImagen,
  deleteImagen,
  registrarVisita,
  getEstadisticas
} = require('../controllers/proyectoController');

router.get('/estadisticas', getEstadisticas);  // ← primero esto
router.get('/', getAll);
router.get('/:id', getById);                   // ← luego esto
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/imagenes', addImagen);
router.delete('/:id/imagenes/:id_imagen', deleteImagen);
router.post('/:id/visita', registrarVisita);

module.exports = router;