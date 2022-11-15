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
		resave: false,
		saveUninitialized: false
	})
);
app.use(
	cors({
		origin: 'https://quicknote.onrender.com',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true
	})
);
app.set('trust proxy', 1);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());

app.use('/auth', auth);
app.use('/note', note);
app.use('/note', asset);
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Congrats! your server is listening on port ${PORT}`);
});
