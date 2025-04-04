-- Get recent conversations with last message
SELECT 
    c.id as conversation_id,
    u.username,
    u.profile_pic,
    (
        SELECT json_build_object(
            'content', m.content,
            'sent_at', m.sent_at,
            'is_read', m.is_read
        )
        FROM messages m
        WHERE m.conversation_id = c.id
        ORDER BY m.sent_at DESC
        LIMIT 1
    ) as last_message
FROM conversations c
JOIN users u ON (
    CASE 
        WHEN c.participant1_id = $1 THEN c.participant2_id
        ELSE c.participant1_id
    END = u.id
)
WHERE c.participant1_id = $1 OR c.participant2_id = $1
ORDER BY (
    SELECT sent_at 
    FROM messages 
    WHERE conversation_id = c.id 
    ORDER BY sent_at DESC 
    LIMIT 1
) DESC;