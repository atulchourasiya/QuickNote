const express = require('express');
const router = express.Router();
const passport = require('passport');
const { auth } = require('../middleware/reqAuth');
require('../config/passportAuth');
const { signToken } = require('../middleware/jwt');

router.get('/failed', (req, res) => {
	res.status(401).json({
		success: false,
		message: 'failure'
	});
});

router.post('/success', auth, (req, res) => {
	res.status(200).json({
		success: true,
		message: 'successful',
		user: req.user
	});
});

router.get(
	'/google',
	passport.authenticate('google', {
		prompt: 'consent',
		scope: ['email', 'profile'],
		session: false
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failed'
	}),
	function (req, res) {
		try {
			const token = signToken(req);
			res
				.cookie('jwt_auth', token, {
					maxAge: 60 * 60 * 1000,
					sameSite: 'strict',
					secure: true,
					httpOnly: true
				})
				.redirect(process.env.CLIENT_URL);
		} catch (err) {
			throw err;
		}
	}
);

router.get('/logout', (req, res) => {
	res.clearCookie('jwt_auth');
	req.session = null;
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
