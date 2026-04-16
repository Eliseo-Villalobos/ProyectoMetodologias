const express = require('express');
const router = express.Router();
const { getMisReservas, create, updateEstado, remove } = require('../controllers/reservaController');

router.get('/usuario/:id_usuario', getMisReservas);
router.post('/', create);
router.put('/:id', updateEstado);
router.delete('/:id', remove);

module.exports = router;