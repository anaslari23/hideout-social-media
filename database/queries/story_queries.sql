-- Get active stories from followed users
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
ORDER BY s.created_at DESC;