const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO;

async function connectToMongoose() {
	try {
		await mongoose.connect(mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser:true
		});
		console.log('Connected to mongo successfully!');
	} catch (error) {
		console.log(error);
	}
}

module.exports = connectToMongoose;
