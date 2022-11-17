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
	const noteContainer = useRef();
	const [isEmpty, setEmpty] = useState(true);

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
						navigator.serviceWorker.register('/service-worker.js');
						navigator.serviceWorker.ready.then(function (registration) {
							registration.showNotification(note.title === '' ? `QuickNote Reminder` : note.title, {
								tag: note._id,
								body: `${note.note[0]}`,
								icon: logo
							});
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
		if (newnotebottom === 'false') {
			let newNote = [...Note].reverse();
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
	useEffect(() => {
		if (noteContainer.current.innerHTML === '') {
			setEmpty(true);
		} else {
			setEmpty(false);
		}
	});
	setPinNoteFirst();

	return (
		<>
			<div ref={noteContainer} className={`d-flex justify-center ${styles.noteContainer}`}>
				{Note.map((note, index) => {
					return (
						<Routes key={'noteid' + index}>
							<Route path='/' element={note.archive || note.bin ? '' : <NoteItem note={note} />} />
							<Route
								path='/reminder'
								element={note.reminder !== '' && !note.bin ? <NoteItem note={note} /> : ''}
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
			{isEmpty ? (
				<div className={`${styles.emptyText} fs-500 ff d-flex align-center justify-center`}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='100'
						height='100'
						fill='var(--icon-clr)'
						viewBox='0 0 16 16'>
						<path d='M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z' />
					</svg>
					Nothing to show
				</div>
			) : (
				''
			)}
		</>
	);
};

export default Notes;
