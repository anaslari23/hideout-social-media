const pool = require('../config/db');

const threadController = {
    createTweet: async (req, res) => {
        try {
            const { content, parent_tweet_id } = req.body;
            const result = await pool.query(
                'INSERT INTO tweets (user_id, content, parent_tweet_id) VALUES ($1, $2, $3) RETURNING *',
                [req.user.id, content, parent_tweet_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getThread: async (req, res) => {
        try {
            const result = await pool.query(`
                WITH RECURSIVE thread_tree AS (
                    SELECT t.*, u.username, u.profile_pic, 1 as level
                    FROM tweets t
                    JOIN users u ON t.user_id = u.id
                    WHERE t.id = $1

                    UNION ALL

                    SELECT t.*, u.username, u.profile_pic, tt.level + 1
                    FROM tweets t
                    JOIN users u ON t.user_id = u.id
                    JOIN thread_tree tt ON t.parent_tweet_id = tt.id
                )
                SELECT * FROM thread_tree ORDER BY level, created_at
            `, [req.params.id]);

            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    replyToTweet: async (req, res) => {
        try {
            const { content } = req.body;
            const result = await pool.query(
                'INSERT INTO thread_replies (tweet_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
                [req.params.id, req.user.id, content]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = threadController;