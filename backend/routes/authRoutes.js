const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Solo login, el admin se crea directo en BD
router.post('/login', login);

module.exports = router;