const express = require('express');
const connectDB = require('./config/db');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const app = express();
const path = require('path');

// Connect Database

connectDB();

// Init MiddleWare
app.use(express.json({ extended: false })); // body parser

// Define Routes

// API/USERS
app.use('/api/users', usersRouter);

// API/AUTH
app.use('/api/auth', authRouter);

// API/PROFILE
app.use('/api/profile', profileRouter);

// API/POSTS
app.use('/api/posts', postsRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set Static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// SERVER SETUP
const PORT = process.env.PORT || 5000;

app.listen(PORT);
