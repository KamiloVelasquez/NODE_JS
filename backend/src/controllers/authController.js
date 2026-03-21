const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { registerService, loginService } = require('../services/authService');

const register = async (req = request, res = response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await registerService(req.body);
        res.status(201).json({ msg: 'Usuario registrado exitosamente', user });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ msg: error.message });
        }
        console.error('❌ Error al registrar usuario:', error);
        res.status(500).json({ msg: 'Ocurrió un error al registrar el usuario' });
    }
};

const login = async (req = request, res = response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { token, user } = await loginService(req.body);
        res.status(200).json({ msg: 'Login exitoso', token, user });
    } catch (error) {
        if (error.status === 401) {
            return res.status(401).json({ msg: error.message });
        }
        console.error('❌ Error al iniciar sesión:', error);
        res.status(500).json({ msg: 'Ocurrió un error al iniciar sesión' });
    }
};

module.exports = {
    register,
    login
};