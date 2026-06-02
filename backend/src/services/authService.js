const bcrypt = require('bcryptjs');
const db = require('../config/database');

async function registerUser(dados) {
    const { nome, email, password } = dados;

    const [userExists] = await db.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
    );

    if (userExists.length > 0) {
        throw new Error('Este email já está registado');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
        `
        INSERT INTO users (
            nome,
            email,
            password_hash,
            role
        ) VALUES (?, ?, ?, ?)
        `,
        [nome, email, passwordHash, 'candidato']
    );

    return {
        id: result.insertId,
        nome,
        email,
        role: 'candidato'
    };
}

async function loginUser(dados) {
    const { email, password } = dados;

    const [rows] = await db.execute(
        `
        SELECT id, nome, email, password_hash, role
        FROM users
        WHERE email = ?
        `,
        [email]
    );

    if (rows.length === 0) {
        throw new Error('Email ou password inválidos');
    }

    const user = rows[0];

    const passwordValida = await bcrypt.compare(password, user.password_hash);

    if (!passwordValida) {
        throw new Error('Email ou password inválidos');
    }

    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
    };
}

module.exports = {
    registerUser,
    loginUser
};