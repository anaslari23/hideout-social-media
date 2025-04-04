-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    profile_pic TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    auth_provider VARCHAR(20) -- Keeping this for social auth support
);

-- Feed Posts
CREATE TABLE feed_posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    media_url TEXT[],
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Threads (Twitter-like)
CREATE TABLE tweets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    parent_tweet_id INT REFERENCES tweets(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE thread_replies (
    id SERIAL PRIMARY KEY,
    tweet_id INT REFERENCES tweets(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Connect (Messaging)
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    participant1_id INT REFERENCES users(id) ON DELETE CASCADE,
    participant2_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    sent_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- QuickPic (Snapchat-like)
CREATE TABLE snaps (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    recipient_id INT REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    duration INT DEFAULT 10,
    viewed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '24 hours') STORED
);

-- Films (Reels)
CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    description TEXT,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE film_likes (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    film_id INT REFERENCES films(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, film_id)
);

-- Spaces (Discord-like)
CREATE TABLE spaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE space_members (
    space_id INT REFERENCES spaces(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (space_id, user_id)
);

CREATE TABLE space_messages (
    id SERIAL PRIMARY KEY,
    space_id INT REFERENCES spaces(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    sent_at TIMESTAMP DEFAULT NOW()
);

-- Keep the social auth and OTP tables for authentication
CREATE TABLE social_auth (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(20),
    provider_user_id VARCHAR(255),
    access_token TEXT,
    UNIQUE(provider, provider_user_id)
);

CREATE TABLE otp_verification (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(15),
    otp_code VARCHAR(6),
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE
);