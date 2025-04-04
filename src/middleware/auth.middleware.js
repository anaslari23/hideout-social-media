const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const result = await pool.query(
            'SELECT user_id, username, email FROM users WHERE user_id = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            throw new Error();
        }

        req.user = result.rows[0];
        req.token = token;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;