-- Search posts by hashtag or caption content
SELECT 
    fp.*,
    u.username,
    u.profile_pic,
    COUNT(DISTINCT fl.user_id) as likes_count
FROM feed_posts fp
JOIN users u ON fp.user_id = u.id
LEFT JOIN film_likes fl ON fp.id = fl.film_id
WHERE 
    fp.content ILIKE '%' || $1 || '%'
    OR fp.id IN (
        SELECT post_id 
        FROM post_hashtags ph
        JOIN hashtags h ON ph.hashtag_id = h.id
        WHERE h.name ILIKE '%' || $1 || '%'
    )
GROUP BY fp.id, u.username, u.profile_pic
ORDER BY fp.created_at DESC
LIMIT 20;