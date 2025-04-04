import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { sendOTP as sendOTPService } from '../services/otp.service.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        const token = jwt.sign(
            { id: result.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            user: result.rows[0],
            token
        });
    } catch (err) {
        if (err.code === '23505') { // unique violation
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const sendOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        await sendOTPService(phoneNumber);
        res.json({ message: 'OTP sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const result = await pool.query(
            'SELECT * FROM otp_verification WHERE phone_number = $1 AND otp_code = $2 AND expires_at > NOW()',
            [phoneNumber, otp]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        await pool.query(
            'UPDATE otp_verification SET verified = true WHERE id = $1',
            [result.rows[0].id]
        );

        res.json({ message: 'OTP verified successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};