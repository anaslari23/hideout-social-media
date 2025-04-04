import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import threadRoutes from './routes/thread.routes.js';
import messageRoutes from './routes/message.routes.js';
import filmRoutes from './routes/film.routes.js';
import spaceRoutes from './routes/space.routes.js';
import setupWebSocket from './websocket/socket.js';

const app = express();
const server = createServer(app);
const io = setupWebSocket(server);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/spaces', spaceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});