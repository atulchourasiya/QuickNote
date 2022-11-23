import { useRef, useEffect, useState } from 'react';
import styles from '../Styles/Edit.module.css';
import CheckList from './CheckList';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { setAlert } from '../Redux/Slice/alertSlice';
import { setEditState } from '../Redux/Slice/editSlice';
import store from '../Redux/store';
import { fetchAllNotes, updateNote } from '../Redux/Slice/notesSlice';

const Edit = () => {
	const { note } = useSelector((state) => state.edit);
	const [checkListIndexArray, setCheckListIndexArray] = useState([{ isChecked: false, value: 0 }]);
	const Note = useRef(null);
	const dispatch = useDispatch();
	let arrayIndex = useRef(0);
	let isEmpty = useRef(true);
	const currentCheckListIndexArray = useRef(checkListIndexArray);
	const titleField = useRef();
	const noteField = useRef();
	const editContainer = useRef();

	const checkIfEmpty = (event) => {
		if (event.target.innerHTML === '<br>') {
			event.target.innerHTML = '';
		}
	};
	const handleInput = (event) => {
		checkIfEmpty(event);
		if (event.target.innerText !== '' && !event.target.classList.contains('replicationDone')) {
			arrayIndex.current += 1;
			setCheckListIndexArray([
				...currentCheckListIndexArray.current,
				{ isChecked: false, value: arrayIndex.current }
			]);
		}
		event.target.classList.add('replicationDone');
	};
	const setCheckBoxState = (isChecked, value) => {
		const newState = currentCheckListIndexArray.current.map((obj) => {
			if (obj.value === value) {
				return { ...obj, isChecked };
			}
			return obj;
		});
		setCheckListIndexArray(newState);
	};

	const removeCheckList = (index) => {
		const newCheckListIndexArray = currentCheckListIndexArray.current.filter((item) => {
			if (item.value !== index) return item;
		});
		setCheckListIndexArray(newCheckListIndexArray);
	};
	const handleInputFieldHover = (event) => {
		event.stopPropagation();
		if (
			event.target.closest('#inputContainer') ||
			event.target.hasAttribute('data-removechecklist') ||
			event.target.hasAttribute('data-checkbox') ||
			event.target.hasAttribute('data-editnote')
		)
			return;
		updateANote();
	};
	const getCheckListInnertextArray = () => {
		const checkListItem = document.getElementsByClassName('checkListItem');
		const checkListInnertextArray = [];
		Array.from(checkListItem).forEach((item) => {
			checkListInnertextArray.push(item.innerText);
		});
		return checkListInnertextArray;
	};
	const updateANote = () => {
		if (Note.current !== null) {
			if (titleField.current === null || titleField.current === undefined) {
				return;
			}
			const email = store.getState().user.user?.email;
			const tempNoteArray = getCheckListInnertextArray();
			const noteArray = [];
			const isChecked = [];
			if (!email) {
				dispatch(setAlert('Something Went Wrong!❌'));
				return;
			}
			if (Note.current.check) {
				currentCheckListIndexArray.current.forEach((item, index) => {
					if (tempNoteArray[index] !== '') {
						isChecked.push({ isChecked: item.isChecked });
						noteArray.push(tempNoteArray[index]);
					}
				});
				isChecked.push({ isChecked: false });
			} else {
				isChecked.push({ isChecked: false });
			}
			const noteObj = {
				title: titleField.current.innerText,
				note: Note.current.check ? noteArray : [noteField.current.innerText],
				isChecked: [...isChecked]
			};
			if (
				titleField.current.innerText === '' &&
				noteField.current !== null &&
				noteField.current.innerText === ''
			) {
				dispatch(setAlert('Cannot Save Empty Note!❌'));
			} else if (
				noteField.current === null &&
				titleField.current.innerText === '' &&
				noteArray.length === 0
			) {
				dispatch(setAlert('Cannot Save Empty Note!❌'));
			} else {
				console.log(noteObj);
				dispatch(
					updateNote({
						id: Note.current?._id,
						obj: {
							...noteObj,
							email: Note.current?.email
						},
						email
					})
				);
				dispatch(setAlert('Note Updated Sucessfully!✅'));
				dispatch(fetchAllNotes());
				setCheckListIndexArray([]);
				arrayIndex.current = 0;
				Note.current = null;
				editContainer.current.classList.add('d-none');
				dispatch(setEditState(null));
			}
		}
	};
	useEffect(() => {
		currentCheckListIndexArray.current = checkListIndexArray;
		const checkListItem = document.querySelectorAll('.checkListItem');
		if (Note.current !== null && isEmpty.current) {
			Array.from(Note.current.note).every((item, index) => {
				if (checkListItem[index] !== undefined) {
					checkListItem[index].innerText = item;
					checkListItem[index].classList.add('replicationDone');
					isEmpty.current = false;
					return true;
				}else{
					isEmpty.current = true;
					return false;
				}
			});
		}
	});
	useEffect(() => {
		if (note !== null) {
			isEmpty.current = true;
			editContainer.current.classList.remove('d-none');
			titleField.current.innerText = note.title;
			if (note.check === true) {
				let checkedListArray = note.isChecked.map((item, index) => {
					return {
						isChecked: item.isChecked,
						value: index
					};
				});
				arrayIndex.current = note.isChecked.length;
				setCheckListIndexArray(checkedListArray);
			} else {
				noteField.current.innerText = note.note[0];
			}
			Note.current = note;
		}
	}, [note]);
	useEffect(() => {
		document.addEventListener('click', handleInputFieldHover);
		return () => {
			document.removeEventListener('click', handleInputFieldHover);
		};
		// eslint-disable-next-line
	}, []);
	return (
		<div ref={editContainer} className={`${styles.editContainer} d-flex d-none`}>
			<div className={`d-flex align-center justify-center ${styles.inputFieldContainer}`}>
				<div id='inputContainer' className={`${styles.inputContainer}`}>
					<div className={`${styles.inputChildContainer}`}>
						<div className={`ff fw-semibold ${styles.input}`}>
							<div
								ref={titleField}
								onInput={checkIfEmpty}
								contentEditable='plaintext-only'
								tabIndex={0}
								role='textbox'
								spellCheck='false'
								aria-multiline='true'></div>
							<p className={`ff fw-regular`}>Title</p>
						</div>
						{note?.check ? (
							<ReactSortable
								list={checkListIndexArray}
								setList={setCheckListIndexArray}
								animation={200}
								swap
								handle={'.handle'}>
								{checkListIndexArray.map((index) => {
									return (
										<CheckList
											key={'listIndex' + index.value}
											removeCheckList={removeCheckList}
											handleInput={handleInput}
											setCheckBoxState={setCheckBoxState}
											isChecked={index}
											index={index.value}
										/>
									);
								})}
							</ReactSortable>
						) : (
							<div className={` fs-400 ff fw-regular ${styles.input}`}>
								<div
									onInput={checkIfEmpty}
									ref={noteField}
									contentEditable='plaintext-only'
									tabIndex={0}
									role='textbox'
									spellCheck='false'
									aria-multiline='true'></div>
								<p className={`fs-400 ff fw-regular`}>Take a note...</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Edit;
