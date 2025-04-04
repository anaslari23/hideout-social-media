const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const twilio = require('twilio');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const authController = {
    register: async (req, res) => {
        try {
            const { username, email, phone_number, first_name, last_name, password } = req.body;
            
            // Check if username exists
            const userExists = await pool.query(
                'SELECT * FROM users WHERE username = $1 OR email = $2',
                [username, email]
            );

            if (userExists.rows.length > 0) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const newUser = await pool.query(
                'INSERT INTO users (username, email, phone_number, first_name, last_name, password_hash, auth_provider) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [username, email, phone_number, first_name, last_name, hashedPassword, 'local']
            );

            // Generate JWT
            const token = jwt.sign(
                { id: newUser.rows[0].id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );

            if (user.rows.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign(
                { id: user.rows[0].id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    sendOTP: async (req, res) => {
        try {
            const { phone_number } = req.body;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // Save OTP to database
            await pool.query(
                'INSERT INTO otp_verification (phone_number, otp_code, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'5 minutes\')',
                [phone_number, otp]
            );

            // Send OTP via Twilio
            await twilioClient.messages.create({
                body: `Your verification code is: ${otp}`,
                to: phone_number,
                from: process.env.TWILIO_PHONE_NUMBER
            });

            res.json({ message: 'OTP sent successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    verifyOTP: async (req, res) => {
        try {
            const { phone_number, otp } = req.body;

            const result = await pool.query(
                'SELECT * FROM otp_verification WHERE phone_number = $1 AND otp_code = $2 AND expires_at > NOW() AND NOT is_verified',
                [phone_number, otp]
            );

            if (result.rows.length === 0) {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            }

            // Mark OTP as verified
            await pool.query(
                'UPDATE otp_verification SET is_verified = true WHERE phone_number = $1 AND otp_code = $2',
                [phone_number, otp]
            );

            res.json({ message: 'OTP verified successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = authController;