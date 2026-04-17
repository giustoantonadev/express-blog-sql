require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from public/images at /images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Shared posts data
const posts = require('./data/posts');

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

app.get('/bacheca', (req, res) => {
    res.json({ posts });
});

// Register posts router under /posts
const postsRouter = require('./routers/posts');
const { testConnection } = require('./database/db');
app.use('/posts', postsRouter);

// Middleware per gestire endpoint non trovati
const notFound = require('./middlewares/notFound');
app.use(notFound);

// Middleware per gestire errori
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
    try {
        await testConnection();
        console.log('DB connection: OK');
    } catch (err) {
        console.error('DB connection failed:', err.message || err);
        process.exit(1);
    }
});
