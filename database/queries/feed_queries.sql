-- Get feed posts with likes, comments count, and latest comments
SELECT 
    fp.*,
    u.username,
    u.profile_pic,
    COUNT(DISTINCT fl.user_id) as likes_count,
    COUNT(DISTINCT c.id) as comments_count,
    (
        SELECT json_agg(json_build_object(
            'username', cu.username,
            'content', c.content,
            'created_at', c.created_at
        ))
        FROM thread_replies c
        JOIN users cu ON c.user_id = cu.id
        WHERE c.tweet_id = fp.id
        ORDER BY c.created_at DESC
        LIMIT 3
    ) as recent_comments
FROM feed_posts fp
JOIN users u ON fp.user_id = u.id
LEFT JOIN film_likes fl ON fp.id = fl.film_id
WHERE fp.user_id IN (
    SELECT following_id 
    FROM follows 
    WHERE follower_id = $1 AND status = 'accepted'
)
GROUP BY fp.id, u.username, u.profile_pic
ORDER BY fp.created_at DESC
LIMIT 10 OFFSET $2;