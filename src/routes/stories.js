const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get stories from followed users
router.get('/feed', auth, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                s.*,
                u.username,
                u.profile_pic,
                EXTRACT(EPOCH FROM (s.expires_at - NOW())) as seconds_remaining
            FROM snaps s
            JOIN users u ON s.sender_id = u.id
            WHERE s.sender_id IN (
                SELECT following_id 
                FROM follows 
                WHERE follower_id = $1 AND status = 'accepted'
            )
            AND s.expires_at > NOW()
            AND s.viewed = false
            ORDER BY s.created_at DESC
        `, [req.user.id]);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new story
router.post('/', auth, async (req, res) => {
    try {
        const { media_url, duration } = req.body;
        const result = await pool.query(
            'INSERT INTO snaps (sender_id, media_url, duration) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, media_url, duration]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mark story as viewed
router.put('/:id/view', auth, async (req, res) => {
    try {
        await pool.query(
            'UPDATE snaps SET viewed = true WHERE id = $1 AND recipient_id = $2',
            [req.params.id, req.user.id]
        );
        res.json({ message: 'Story marked as viewed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;