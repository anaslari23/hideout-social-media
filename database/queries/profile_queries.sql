-- Get user profile with posts and counts
WITH user_stats AS (
    SELECT 
        user_id,
        COUNT(DISTINCT f1.following_id) as following_count,
        COUNT(DISTINCT f2.follower_id) as followers_count
    FROM users u
    LEFT JOIN follows f1 ON u.id = f1.follower_id AND f1.status = 'accepted'
    LEFT JOIN follows f2 ON u.id = f2.following_id AND f2.status = 'accepted'
    WHERE u.id = $1
    GROUP BY user_id
)
SELECT 
    u.*,
    us.following_count,
    us.followers_count,
    (
        SELECT json_agg(
            json_build_object(
                'id', fp.id,
                'media_url', fp.media_url,
                'likes_count', fp.likes_count,
                'comments_count', fp.comments_count,
                'created_at', fp.created_at
            )
        )
        FROM feed_posts fp
        WHERE fp.user_id = u.id
        ORDER BY fp.created_at DESC
        LIMIT 12
    ) as recent_posts
FROM users u
JOIN user_stats us ON u.id = us.user_id
WHERE u.id = $1;