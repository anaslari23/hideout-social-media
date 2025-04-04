const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const setupWebSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        const { spaceId } = socket.handshake.query;
        
        socket.join(`space:${spaceId}`);

        socket.on('sendMessage', async (data) => {
            try {
                const result = await pool.query(
                    'INSERT INTO space_messages (space_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
                    [data.spaceId, socket.userId, data.content]
                );

                const userResult = await pool.query(
                    'SELECT username FROM users WHERE id = $1',
                    [socket.userId]
                );

                const message = {
                    ...result.rows[0],
                    username: userResult.rows[0].username
                };

                io.to(`space:${spaceId}`).emit('message', message);
            } catch (err) {
                console.error('Error sending message:', err);
            }
        });

        socket.on('disconnect', () => {
            socket.leave(`space:${spaceId}`);
        });
    });

    return io;
};

module.exports = setupWebSocket;