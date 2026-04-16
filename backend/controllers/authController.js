const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Faltan email o password' });
    }

    try {
        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
        { id_usuario: usuario.id_usuario, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
        );

    res.json({
        mensaje: 'Login exitoso',
        token,
        usuario: {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email
        }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

const register = async (req, res) => {
    const { nombre, email, password, telefono } = req.body;

    try {
        const usuarioExiste = await Usuario.findByEmail(email);
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const idNuevo = await Usuario.create(nombre, email, passwordHash, telefono);

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', id_usuario: idNuevo });
    } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};

module.exports = { login, register };