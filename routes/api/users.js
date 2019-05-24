const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		return res.send('Users');
	}
);

module.exports = router;
