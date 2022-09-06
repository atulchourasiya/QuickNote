const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	oauthId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	imageLink: {
		type: String
	},
	Date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
