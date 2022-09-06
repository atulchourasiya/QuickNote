const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const auth = require('./routes/auth')
const connectToMongoose = require('./config/mongo');


const app = express();
const PORT = process.env.PORT || 5000;
connectToMongoose();

app.use(
	session({
		secret: `${process.env.SECRET}`,
		resave: false,
		saveUninitialized: false
	})
);
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: 'GET,POST,PUT,DELETE',
		credentials: true
	})
);

app.use(passport.initialize());
app.use(cookieParser());
app.use('/auth',auth)

app.listen(PORT, () => {
	console.log(`Congrats! your server is listening on port ${PORT}`);
});
