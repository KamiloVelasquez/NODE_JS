const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerService = async ({ email, password, role }) => {
    const userExistente = await User.findOne({ email });
    if (userExistente) {
        const error = new Error('El email ya está registrado.');
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    return { id: user._id, email: user.email, role: user.role };
};

const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Credenciales inválidas.');
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Credenciales inválidas.');
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token, user: { id: user._id, email: user.email, role: user.role } };
};

module.exports = {
    registerService,
    loginService
};