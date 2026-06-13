const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
  addImagen,
  deleteImagen
} = require('../controllers/proyectoController');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/imagenes', addImagen);
router.delete('/:id/imagenes/:id_imagen', deleteImagen);

module.exports = router;