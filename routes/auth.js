const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../middleware/reqAuth');
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
		scope: ['email', 'profile'],
		session: false,
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		session: false,
		failureRedirect: '/failed',
	}),
	function (req, res) {
		try {
			console.log('yaha tak aya');
			const token = signToken(req);
			res
				.cookie('jwt_auth', token, {
					maxAge: 11 * 60 * 60 * 1000,
					httpOnly: true,
					sameSite: true,
					secure: true
				})
				.redirect(process.env.CLIENT_URL);
		} catch (err) {
			console.log('yahi hai error')
			throw err;
		}
	}
);

router.get('/logout', (req, res) => {
	req.session = null;
	req.logout();
	res.redirect('/auth/google');
});

module.exports = router;
