const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { generateToken } = require('../utils/jwtUtils');

async function findUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email.toLowerCase().trim()]);
    return rows[0] || null;
}

async function findUserById(id) {
    const [rows] = await pool.query('SELECT id, full_name, email, created_at, updated_at FROM users WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
}

async function registerUser({ fullName, email, password }) {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        const error = new Error('An account with this email address already exists.');
        error.code = 'ER_DUP_ENTRY';
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
        'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
        [fullName.trim(), email.toLowerCase().trim(), passwordHash]
    );

    const user = {
        id: result.insertId,
        fullName: fullName.trim(),
        email: email.toLowerCase().trim()
    };

    const token = generateToken({ id: user.id, email: user.email, fullName: user.fullName });

    return { user, token };
}

async function loginUser({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email address or password.');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid email address or password.');
    }

    const userDto = {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        createdAt: user.created_at
    };

    const token = generateToken({ id: userDto.id, email: userDto.email, fullName: userDto.fullName });

    return { user: userDto, token };
}

module.exports = {
    findUserByEmail,
    findUserById,
    registerUser,
    loginUser
};
