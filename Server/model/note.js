const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
	title: {
		type: String
	},
	note: {
		type: Array,
		required: true
	},
	email: {
		type: Array,
		required: true
	},
	tag: {
		type: Array
	},
	check: {
		type: Boolean,
		required: true
	},
	pin: {
		type: Boolean,
		required: true
	},
	archive: {
		type: Boolean,
		required: true
	}
});

const Note = mongoose.model('notes', NotesSchema);
module.exports = Note;
