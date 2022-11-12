const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@quicknote.jhrijhg.mongodb.net/QuickNote?retryWrites=true&w=majority`;

async function connectToMongoose() {
	try {
		await mongoose.connect(mongoURI);
		console.log('Connected to mongo successfully!');
	} catch (error) {
		console.log(error);
	}
}

module.exports = connectToMongoose;
