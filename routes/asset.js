const express = require('express');
const router = express.Router();
const Lable = require('../model/asset');

router.post('/addLable', async (req, res) => {
	try {
		const { lable, user } = req.body;
		const newLable = new Lable({
			user,
			lable
		});
		const existingLable = await Lable.find({ user });
		if (existingLable.length === 0) {
			const saved = await newLable.save();
			res.status(200).json(saved);
		} else {
			if (existingLable[0].user === user) {
				const updateLable = await Lable.updateOne({ user }, { user, lable });
				res.json(updateLable);
			} else {
				return res.status(405).send('Not Allowed');
			}
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
router.post('/fetchLable', async (req, res) => {
	try {
		const lable = await Lable.find({ user: req.body.user });
		res.json(lable);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
module.exports = router;
