const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { validateEmail, validatePassword } = require('../utils/validators');

const authController = {
    register: async (req, res) => {
        try {
            const { username, email, password, full_name } = req.body;

            if (!validateEmail(email) || !validatePassword(password)) {
                return res.status(400).json({ error: 'Invalid email or password format' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await pool.query(
                'INSERT INTO users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email',
                [username, email, hashedPassword, full_name]
            );

            const token = jwt.sign(
                { id: result.rows[0].user_id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                user: result.rows[0],
                token
            });
        } catch (err) {
            if (err.constraint === 'users_email_key') {
                return res.status(409).json({ error: 'Email already exists' });
            }
            if (err.constraint === 'users_username_key') {
                return res.status(409).json({ error: 'Username already taken' });
            }
            res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const result = await pool.query(
                'SELECT user_id, username, email, password_hash FROM users WHERE email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const validPassword = await bcrypt.compare(password, result.rows[0].password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            await pool.query(
                'UPDATE users SET last_login = NOW() WHERE user_id = $1',
                [result.rows[0].user_id]
            );

            const token = jwt.sign(
                { id: result.rows[0].user_id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                user: {
                    id: result.rows[0].user_id,
                    username: result.rows[0].username,
                    email: result.rows[0].email
                },
                token
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = authController;