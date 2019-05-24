const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator/check');

// User Model
const User = require('../../models/Users');

// @route   POST api/users
// @desc    Register Users
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characterrs'
		).isLength({ min: 6, max: 18 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// Find if user exists
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}

			// Get user gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				avatar,
				password
			});

			// Encrypt Password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// Save user to database
			await user.save();

			// Return JWT
			res.send('User registered');
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}

		return;
	}
);

module.exports = router;
