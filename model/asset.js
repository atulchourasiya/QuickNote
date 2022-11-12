const mongoose = require('mongoose');

const userAssetSchema = mongoose.Schema({
	user: {
		type: String,
		require: true
	},
	lable: {
		type: Array,
		require: true
	}
});

const Asset = mongoose.model('userAsset', userAssetSchema);
module.exports = Asset;
