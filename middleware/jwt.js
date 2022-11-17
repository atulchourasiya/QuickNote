const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (token) => {
	try {
		const jwToken = jwt.verify(token, process.env.JWT_SECRET);
		return jwToken.userId;
	} catch (err) {
		 throw err
	}
};

exports.signToken = (req) => {
	try {
		const token = jwt.sign({ userId: req.user._id.toHexString() }, process.env.JWT_SECRET, {
			expiresIn: '12h'
		});
		return token;
	} catch (err) {
		throw err;
	}
};
