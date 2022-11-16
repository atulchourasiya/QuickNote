import styles from '../Styles/NoteItem.module.css';
import CheckBox from './CheckBox';
import { useEffect, useRef, useState } from 'react';
import NoteSvg from './NoteSvg';
import { addANote, updateNote } from '../Redux/Slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';
import store from '../Redux/store';
import { setIsUpdate, setSharedEmail } from '../Redux/Slice/sharedEmail';
import { setAlert } from '../Redux/Slice/alertSlice';
import Reminder from './Reminder';

const NoteItem = (props) => {
	const dispatch = useDispatch();
	const noteItemOptions = useRef();
	let { isUpdate } = useSelector((state) => state.sharedEmail);
	let { sharedEmail } = useSelector((state) => state.sharedEmail);
	let { lable } = useSelector((state) => state.lable);
	const [label, setLabel] = useState([]);
	const [isChecked, setIsChecked] = useState([]);
	const [showReminder, setShowReminder] = useState(false);
	const [reminderValue, setReminderValue] = useState(null);
	let currentIsChecked = useRef(isChecked);
	let lableContainer = useRef();
	const UpdateNote = (updateObj) => {
		const updatedNoteObj = {
			id: props.note._id,
			obj: {
				...updateObj,
				email: updateObj.email !== undefined ? updateObj.email : props.note.email
			},
			email: store.getState().user.user?.email
		};
		dispatch(updateNote(updatedNoteObj));
	};
	const showOptions = () => {
		let noteItemOptionsArray = document.getElementsByClassName(styles.noteItemOptions);
		Array.from(noteItemOptionsArray).forEach((item) => {
			if (noteItemOptions.current === item) return;
			item.classList.add('d-none');
		});
		noteItemOptions.current.classList.toggle('d-none');
	};

	const closeOtherLableContainer = () => {
		let lableContainerArray = document.getElementsByClassName(styles.lableContainer);
		Array.from(lableContainerArray).forEach((item) => {
			item.classList.add('d-none');
		});
		lableContainer.current.classList.remove('d-none');
	};
	const deleteDate = () => {
		let date = new Date();
		let newDate = new Date(date.getTime() + 60 * 60 * 1000);
		return newDate;
	};
	const setIsCheckedArray = () => {
		let tempArray = [];
		label.map((item, index) => {
			if (props.note.tag.includes(item)) {
				tempArray[index] = true;
			} else {
				tempArray[index] = false;
			}
		});
		setIsChecked(tempArray);
	};
	const setIsCheckedState = (index, value) => {
		let tempArray = [];
		currentIsChecked.current.map((item, isCheckedindex) => {
			if (isCheckedindex === index) {
				tempArray.push(value);
			} else {
				tempArray.push(item);
			}
		});
		setIsChecked(tempArray);
	};
	const refreshIsCheckedArray = () => {
		let tagField = document.getElementsByClassName('tagField');
		let tempArray = [];
		currentIsChecked.current.map((_, index) => {
			if (props.note.includes(tagField[index].innerText)) tempArray[index] = true;
			else tempArray[index] = false;
		});
		setIsChecked(tempArray);
	};
	const getTagList = () => {
		let tagTextArray = [];
		let tagField = document.getElementsByClassName('tagField');
		currentIsChecked.current.forEach((item, index) => {
			if (item === true) {
				tagTextArray.push(tagField[index].innerText);
			}
		});
		return tagTextArray;
	};
	useEffect(() => {
		if (isUpdate === props.note._id && sharedEmail !== null) {
			let userEmail = store.getState().user.user?.email;
			if (userEmail === sharedEmail) {
				dispatch(setIsUpdate(false));
				dispatch(setSharedEmail(null));
				dispatch(setAlert('Try another email!❌'));
				return;
			}
			let email = [...props.note.email, sharedEmail];
			UpdateNote({ email: email });
			dispatch(setAlert('Email Added SuccessFully!✅'));
			dispatch(setIsUpdate(false));
			dispatch(setSharedEmail(null));
		}
		// eslint-disable-next-line
	}, [sharedEmail]);
	useEffect(() => {
		currentIsChecked.current = [...isChecked];
	}, [isChecked]);
	useEffect(() => {
		if (lable.length !== 0) {
			setLabel(lable[0].lable);
		}
	}, [lable]);
	useEffect(() => {
		setIsCheckedArray();
	}, [label]);
	useEffect(() => {
		if (reminderValue !== null) {
			if (Notification.permission !== 'granted') {
				dispatch(setAlert('Notification permission is denied!❌'));
			} else {
				UpdateNote({ reminder: reminderValue });
				dispatch(setAlert('Reminder added successfully!✅'));
			}
		}
		setReminderValue(null);
	}, [reminderValue]);
	return (
		<>
			<div className={`d-flex ${styles.container} noteItemContentContainer`}>
				<div className={`${styles.noteItemContainer}`}>
					<div onClick={(_) => UpdateNote({ pin: !props.note.pin })} className={`pinSvgContainer`}>
						<div className='svg-container small-icon-hover'>
							{props.note.pin ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className={`icon-size`}
									viewBox='0 0 24 24'
									fill='var(--icon-clr)'>
									<path fill='none' d='M0 0h24v24H0z' />
									<path
										fill='var(--icon-clr)'
										d='M17 4a2 2 0 0 0-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className={`icon-size`}
									viewBox='0 0 24 24'
									fill='var(--icon-clr)'>
									<path fill='none' d='M0 0h24v24H0z' />
									<path
										fill='var(--icon-clr)'
										d='M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z'
									/>
								</svg>
							)}
						</div>
					</div>
					<div className='noteContent'>
						<p className={`ff ${styles.noteItemTitle}`}>{props.note.title}</p>
						{props.note.check ? (
							Array.from(props.note.note).map((note, index) => {
								return (
									<div
										key={'noteList' + index}
										className={`d-flex ff fs-400 ${styles.noteItemNote}`}>
										<CheckBox
											isChecked={props.note.isChecked}
											id={props.note._id}
											UpdateNote={UpdateNote}
											index={index}
										/>
										<div className={`${styles.spanContainer}`}>
											<span
												className={
													props.note.isChecked[index].isChecked
														? `${styles.noteItemNoteStrikeThrough}`
														: ''
												}>
												{note}
											</span>
										</div>
									</div>
								);
							})
						) : (
							<p className={`ff fs-400 ${styles.noteItemNote}`}>{props.note.note}</p>
						)}
					</div>
					<NoteSvg
						id={props.note._id}
						UpdateNote={UpdateNote}
						archive={props.note.archive}
						showOptions={showOptions}
						showReminder={showReminder}
						setShowReminder={setShowReminder}
					/>
				</div>
				<ul
					ref={noteItemOptions}
					onClick={showOptions}
					className={`${styles.noteItemOptions} ff fs-400 pointer w-max d-none`}>
					<li
						onClick={() => {
							UpdateNote({ bin: !props.note.bin, deleteDate: props.note.bin ? '' : deleteDate() });
							if (!props.note.bin) {
								dispatch(setAlert('Notes Will Be Deleted In One Hour!❌'));
							} else {
								dispatch(setAlert('Notes Deletion Is Cancelled !✅'));
							}
						}}>
						{props.note.bin ? 'Undo Delete' : 'Delete Note'}
					</li>
					<li
						onClick={() => {
							closeOtherLableContainer();
						}}>
						Add lables
					</li>
					<li
						onClick={() => {
							const { _id, __v, ...obj } = { ...props.note };
							dispatch(addANote(obj));
						}}>
						Make a copy
					</li>
				</ul>
				<div ref={lableContainer} className={`${styles.lableContainer} d-none`}>
					<h2 className={`ff fs-400 fw-semibold`}>Labels</h2>
					{label.map((item, index) => {
						return (
							<div
								key={'labelInputFieldId' + index}
								className={`${styles.lableItem} d-flex align-center ff fs-400`}>
								<CheckBox
									isChecked={isChecked}
									setIsCheckedState={setIsCheckedState}
									index={index}
								/>
								<span className={`tagField`}>{item}</span>
							</div>
						);
					})}
					<div className={`d-flex btn`}>
						<button
							onClick={() => {
								lableContainer.current.classList.add('d-none');
								refreshIsCheckedArray();
							}}>
							Cancel
						</button>
						<button
							className={` text-primary`}
							onClick={() => {
								UpdateNote({ tag: getTagList() });
								lableContainer.current.classList.add('d-none');
								refreshIsCheckedArray();
							}}>
							Save
						</button>
					</div>
				</div>
				<Reminder
					showReminder={showReminder}
					setShowReminder={setShowReminder}
					setReminderValue={setReminderValue}
				/>
			</div>
		</>
	);
};

export default NoteItem;
