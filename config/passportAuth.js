require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
			proxy:true,
			passReqToCallback: true,
			responseType: 'code',
			access_type: 'offline'
		},
		async function (request, accessToken, refreshToken, profile, done) {
			try {
				console.log(request);
				let existingUser = await User.findOne({ oauthId: profile.id });
				if (!existingUser) {
					const newUser = await User.create({
						oauthId: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						imageLink: profile.photos[0].value
					});
					return done(null, newUser);
				}
				done(null, existingUser);
			} catch (error) {
				console.log(error);
			}
		}
	)
);
