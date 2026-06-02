const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { nome, email, password } = req.body;

        if (!nome || !email || !password) {
            return res.status(400).json({
                message: 'Nome, email e password são obrigatórios'
            });
        }

        const user = await authService.registerUser({
            nome,
            email,
            password
        });

        res.status(201).json({
            message: 'Utilizador registado com sucesso',
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email e password são obrigatórios'
            });
        }

        const user = await authService.loginUser({
            email,
            password
        });

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            message: 'Login efetuado com sucesso',
            token,
            user
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = {
    register, 
    login
};