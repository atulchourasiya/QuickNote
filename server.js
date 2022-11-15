const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const auth = require('./routes/auth');
const note = require('./routes/note');
const asset = require('./routes/asset');
const path = require('path');
const connectToMongoose = require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 5000;
connectToMongoose();

app.use(express.static(path.join(__dirname, 'build')));

app.use(
	session({
		secret: `${process.env.SECRET}`,
		resave: true,
		saveUninitialized: true,
		// cookie: {
		// 	sameSite: 'none',
		// 	secure: true,
		// 	maxAge: 1000 * 60 * 60 * 24
		// }
	})
);
app.use(
	cors({
		origin: process.env.NODE_ENV==='production'?'https://quicknote.onrender.com':'http://localhost:3000',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true
	})
);
app.set('trust proxy', 1);
app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser());
app.use(express.json());

app.use('/auth', auth);
app.use('/note', note);
app.use('/note', asset);
if (process.env.NODE_ENV==='production'){
	app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Congrats! your server is listening on port ${PORT}`);
});
