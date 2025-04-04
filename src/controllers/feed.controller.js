const pool = require('../config/db');

const feedController = {
    createPost: async (req, res) => {
        try {
            const { content, media_url } = req.body;
            const result = await pool.query(
                'INSERT INTO feed_posts (user_id, content, media_url) VALUES ($1, $2, $3) RETURNING *',
                [req.user.id, content, media_url]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getFeed: async (req, res) => {
        try {
            const result = await pool.query(`
                SELECT fp.*, u.username, u.profile_pic
                FROM feed_posts fp
                JOIN users u ON fp.user_id = u.id
                ORDER BY fp.created_at DESC
                LIMIT 20 OFFSET $1
            `, [(req.query.page || 0) * 20]);
            
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    likePost: async (req, res) => {
        try {
            await pool.query(
                'UPDATE feed_posts SET likes_count = likes_count + 1 WHERE id = $1',
                [req.params.id]
            );
            res.json({ message: 'Post liked successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = feedController;