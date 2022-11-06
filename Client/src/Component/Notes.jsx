import styles from '../Styles/Note.module.css';
import { useSelector, useDispatch } from 'react-redux';
import store from '../Redux/store';
import { useRef, useEffect, useState } from 'react';
import { deleteNote, updateNote } from '../Redux/Slice/notesSlice';
import NoteItem from './NoteItem';
import { Route, Routes } from 'react-router-dom';
import { setAlert } from '../Redux/Slice/alertSlice';
import logo from '../Assets/Image/logo.png';

const Notes = () => {
	let { lable } = useSelector((state) => state.lable);
	const [label, setLabel] = useState([]);
	const dispatch = useDispatch();
	let { listView } = useSelector((state) => state.view);
	let { notes } = useSelector((state) => state.notes);
	let { newnotebottom } = useSelector((state) => state.setting);
	let { tickednotebottom } = useSelector((state) => state.setting);
	const noteContainer = useRef();

	const DeleteNote = async () => {
		const Notes = await store.getState().notes.notes;
		if (Notes === null || Notes === []) return;
		Notes.forEach((note) => {
			if (note.deleteDate !== undefined && note.deleteDate !== '') {
				if (new Date(note.deleteDate) <= new Date()) {
					const deleteNoteObj = {
						id: note._id,
						obj: {
							email: note.email
						},
						email: store.getState().user.user?.email
					};
					dispatch(deleteNote(deleteNoteObj));
				}
			}
		});
	};

	const ReminderNote = async () => {
		const Notes = await store.getState().notes.notes;
		if (Notes === null || Notes === []) return;
		Notes.forEach((note) => {
			if (note.reminder !== undefined && note.reminder !== '') {
				if (new Date(note.reminder) <= new Date()) {
					if (Notification.permission !== 'granted') {
						dispatch(setAlert('Notification Permission is denied!❌'));
					} else {
						new Notification(`QuickNote Reminder`, {
							tag: note._id,
							title: note.title,
							body: `${note.note[0]}`,
							icon: logo
						});
					}
					const updatedNoteObj = {
						id: note._id,
						obj: {
							reminder: '',
							email: note.email
						},
						email: store.getState().user.user?.email
					};
					dispatch(updateNote(updatedNoteObj));
				}
			}
		});
	};
	let Note = notes !== null ? notes : [];

	const setNewNoteBottom = () => {
		if (newnotebottom === false) {
			let newNote = [...Note].reverse();
			Note = [...newNote];
		}
	};

	const tickedNoteBottom = () => {
		if (tickednotebottom === true) {
			const newNote = [];
			Note.forEach((item) => {
				let NoteCheckListTrue = [];
				let NoteCheckListFalse = [];
				let IsCheckedTrue = [];
				let IsCheckedFalse = [];
				item.note.forEach((list, index) => {
					if (item.isChecked[index].isChecked) {
						IsCheckedTrue.push(item.isChecked[index]);
						NoteCheckListTrue.push(list);
					} else {
						IsCheckedFalse.push(item.isChecked[index]);
						NoteCheckListFalse.push(list);
					}
				});
				const { note, isChecked, ...rest } = { ...item };
				newNote.push({
					note: [...NoteCheckListFalse, ...NoteCheckListTrue],
					isChecked: [...IsCheckedFalse, ...IsCheckedTrue],
					...rest
				});
			});
			Note = [...newNote];
		}
	};

	const setPinNoteFirst = () => {
		setNewNoteBottom();
		const pinnedNote = [];
		const restNote = [];
		Note.map((note) => {
			if (note.pin === true) {
				pinnedNote.push(note);
			} else {
				restNote.push(note);
			}
		});
		Note = [...pinnedNote, ...restNote];
		tickedNoteBottom();
	};

	useEffect(() => {
		if (listView === true || listView === 'true') {
			noteContainer.current.style.flexDirection = 'column';
			noteContainer.current.style.alignItems = 'center';
		} else {
			noteContainer.current.style.flexDirection = 'row';
			noteContainer.current.style.alignItems = 'flex-start';
		}
	}, [listView]);

	useEffect(() => {
		setInterval(() => {
			DeleteNote();
		}, 5000);
	}, []);

	useEffect(() => {
		if (lable.length !== 0) {
			setLabel(lable[0].lable);
		}
	}, [lable]);

	useEffect(() => {
		setInterval(() => {
			ReminderNote();
		}, 1000);
	}, []);

	setPinNoteFirst();

	return (
		<div ref={noteContainer} className={`d-flex justify-center ${styles.noteContainer}`}>
			{Note.map((note, index) => {
				return (
					<Routes key={'noteid' + index}>
						<Route path='/' element={note.archive || note.bin ? '' : <NoteItem note={note} />} />
						<Route
							path='/reminder'
							element={note.reminder === '' ? '' : <NoteItem note={note} />}
						/>
						<Route
							path='/archive'
							element={note.archive && !note.bin ? <NoteItem note={note} /> : ''}
						/>
						<Route path='/bin' element={note.bin ? <NoteItem note={note} /> : ''} />
						{label.map((item, index) => {
							return (
								<Route
									key={'lableindex' + index}
									path={'/' + item.toLowerCase()}
									element={
										note.tag.includes(item) && !note.archive && !note.bin ? (
											<NoteItem note={note} />
										) : (
											''
										)
									}
								/>
							);
						})}
					</Routes>
				);
			})}
		</div>
	);
};

export default Notes;
