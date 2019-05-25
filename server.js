const express = require('express');
const connectDB = require('./config/db');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const app = express();

// Connect Database

connectDB();

// Init MiddleWare
app.use(express.json({ extended: false })); // body parser

app.get('/', (req, res) => res.send('API Running'));

// Define Routes

// API/USERS
app.use('/api/users', usersRouter);

// API/AUTH
app.use('/api/auth', authRouter);

// API/PROFILE
app.use('/api/profile', profileRouter);

// API/POSTS
app.use('/api/posts', postsRouter);

// SERVER SETUP
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`
    ************
    Server Started on port ${PORT}
    ************`);
});
