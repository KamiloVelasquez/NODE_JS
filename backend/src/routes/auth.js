const { Router } = require('express');
const { body } = require('express-validator');

const { register, login } = require('../controllers/authController');

const router = Router();

// Validaciones para registro
const registerValidation = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role').optional().isIn(['admin', 'user']).withMessage('Rol debe ser admin o user')
];

// Validaciones para login
const loginValidation = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
];

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;