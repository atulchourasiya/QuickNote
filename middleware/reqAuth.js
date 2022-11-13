const { verifyToken } = require('./jwt');
const User = require('../model/user');

const auth = async (req, res, next) => {
	const token = req.cookies.jwt_auth;
	try {
		if(!token)
		{
			return res.status(401).send({
				error: 'Please authenticate using a valid token'
			});
		}
		const signedUserId = verifyToken(token);
		const { name, email, imageLink } = await User.findById({ _id: signedUserId });
		req.user = {name , email ,imageLink};
		next();
	} catch (err) {
		res.status(401).send({
			error: 'Please authenticate using a valid token'
		});
	}
};

const requestdecode = (req,res,next)=>{
	req.query.code = decodeURI(req.query.code);
	next();
}

module.exports ={auth ,requestdecode};
