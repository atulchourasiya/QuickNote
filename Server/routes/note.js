const express = require('express');
const router = express.Router();
const Note = require('../model/note');

router.get('/fetchAllNotes', async (req, res) => {
	try {
		const notes = await Note.find({ email: req.body.email });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/addnote', async (req, res) => {
	try {
		const { title, note, email, check, pin, archive } = req.body;
		const newNote = new Note({
			title,
			note,
			email,
			check,
			pin,
			archive
		});
		const savedNote = await newNote.save();
		res.json(savedNote);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

router.put('/updateNote/:id', async (req, res) => {
	try {
		const { title, note, email, check, pin, archive } = req.body;

		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (note) {
			newNote.note = note;
		}
		if (email) {
			newNote.email = email;
		}
		if (check) {
			newNote.check = check;
		}
		if (pin) {
			newNote.pin = pin;
		}
		if (archive) {
			newNote.archive = archive;
		}

		const existingNote = await Note.findById(req.params.id);

		if (!existingNote) {
			return res.status(404).send('Not Found');
		}
		if (!existingNote.email.includes(req.body.email)) {
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
module.exports = router;
