const express = require('express');
const router = express.Router();
const Note = require('../model/note');

router.post('/fetchAllNotes', async (req, res) => {
	try {
		const notes = await Note.find({ email: req.body.email });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/addNote', async (req, res) => {
	try {
		const { title, note, tag, email, check, bin, isChecked, pin, archive, deleteDate, reminder } =
			req.body;
		const newNote = new Note({
			title,
			note,
			email,
			tag,
			check,
			isChecked,
			bin,
			pin,
			archive,
			deleteDate,
			reminder
		});
		const savedNote = await newNote.save();
		res.status(200).json(savedNote);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.put('/updateNote/:id', async (req, res) => {
	try {
		const { title, note, email, tag, check, isChecked, bin, pin, archive, deleteDate, reminder } =
			req.body;
		let isVerified = false;
		const newNote = {};
		if (title !== undefined) {
			newNote.title = title;
		}
		if (note !== undefined) {
			newNote.note = note;
		}
		if (email !== undefined) {
			newNote.email = email;
		}
		if (tag !== undefined) {
			newNote.tag = tag;
		}
		if (check !== undefined) {
			newNote.check = check;
		}
		if (isChecked !== undefined) {
			newNote.isChecked = isChecked;
		}
		if (bin !== undefined) {
			newNote.bin = bin;
		}
		if (pin !== undefined) {
			newNote.pin = pin;
		}
		if (archive !== undefined) {
			newNote.archive = archive;
		}
		if (deleteDate !== undefined) {
			newNote.deleteDate = deleteDate;
		}
		if (reminder !== undefined) {
			newNote.reminder = reminder;
		}
		const existingNote = await Note.findById(req.params.id);

		if (!existingNote) {
			return res.status(404).send('Not Found');
		}

		req.body.email.forEach((email) => {
			if (existingNote.email.includes(email)) {
				isVerified = true;
			}
		});

		if (!isVerified) {
			return res.status(404).send('Not Found');
		}
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json(updatedNote);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
router.delete('/deleteNote/:id', async (req, res) => {
	try {
		let existingNote = await Note.findById(req.params.id);
		let isVerified = false;

		if (!existingNote) {
			return res.status(404).send('Not Found');
		}

		req.body.email.forEach((email) => {
			if (existingNote.email.includes(email)) {
				isVerified = true;
			}
		});

		if (!isVerified) {
			return res.status(404).send('Not Found');
		}

		existingNote = await Note.findByIdAndDelete(req.params.id);
		res.json(existingNote);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
router.put('/updateManyNote', async (req, res) => {
	try {
		let response = await Note.bulkWrite(
			req.body.notes.map((item) => ({
				updateOne: {
					filter: { _id: item._id },
					update: { $set: item }
				}
			}))
		);
		res.send(response);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});
module.exports = router;
