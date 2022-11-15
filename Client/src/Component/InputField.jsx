import { useRef, useEffect, useState } from 'react';
import styles from '../Styles/InputField.module.css';
import NoteSvg from './NoteSvg';
import CheckList from './CheckList';
import { useDispatch, useSelector } from 'react-redux';
import store from '../Redux/store';
import { ReactSortable } from 'react-sortablejs';
import { addANote } from '../Redux/Slice/notesSlice';
import { setBeforeState } from '../Redux/Slice/beforeState';
import { setSharedEmail } from '../Redux/Slice/sharedEmail';
import CheckBox from './CheckBox';
import Reminder from './Reminder';
import { setAlert } from '../Redux/Slice/alertSlice';

const InputField = () => {
	const [pin, setPin] = useState(false);
	const [showCheckList, toggleCheckList] = useState(false);
	const [checkListIndexArray, setCheckListIndexArray] = useState([{ isChecked: false, value: 0 }]);
	const [archive, setArchive] = useState(false);
	const [isChecked, setIsChecked] = useState([]);
	const [showReminder, setShowReminder] = useState(false);
	const [reminderValue, setReminderValue] = useState('');
	const { sharedEmail } = useSelector((state) => state.sharedEmail);
	const { isUpdate } = useSelector((state) => state.sharedEmail);
	let { lable } = useSelector((state) => state.lable);
	const [label, setLabel] = useState([]);
	const dispatch = useDispatch();
	let { emailFieldOpen } = useSelector((state) => state.view);
	let beforeState = useSelector((state) => {
		if (state.beforeState.beforeState === null) {
			return state.beforeState.beforeState;
		} else {
			return JSON.parse(state.beforeState.beforeState);
		}
	});
	let currentPin = useRef(pin);
	let currentArchive = useRef(archive);
	let currentIsChecked = useRef(isChecked);
	let currentCheckListIndexArray = useRef(checkListIndexArray);
	let currentshowCheckList = useRef(showCheckList);
	let currentReminderValue = useRef(reminderValue);
	let openClose = useRef(false);
	let isOpen = useRef(false);
	const arrayIndex = useRef(0);
	const titleDiv = useRef();
	const titleField = useRef();
	const noteField = useRef();
	const inputFieldSvg = useRef();
	const inputSvg = useRef();
	const pinSvgContainer = useRef();
	const lableContainer = useRef();

	const checkIfEmpty = (event) => {
		if (event.target.innerHTML === '<br>') {
			event.target.innerHTML = '';
		}
	};
	const showInputField = () => {
		titleDiv.current?.classList.remove('d-none');
		inputFieldSvg.current?.classList.remove('d-none');
		pinSvgContainer.current?.classList.remove('d-none');
		inputSvg.current?.classList.add('d-none');
		isOpen.current = true;
	};
	const hideInputField = (event) => {
		if (noteField.current !== null) {
			titleDiv.current?.classList.add('d-none');
			inputFieldSvg.current?.classList.add('d-none');
			inputSvg.current?.classList.remove('d-none');
			titleDiv.current.children[0].innerHTML = '';
			noteField.current.innerHTML = '';
			pinSvgContainer.current?.classList.add('d-none');
		} else if (!event.target.hasAttribute('data-checkboxicon')) {
			toggleCheckList(false);
			setCheckListIndexArray([{ isChecked: false, value: 0 }]);
			arrayIndex.current = 0;
			openClose.current = true;
		}
		isOpen.current = false;
		lableContainer.current?.classList.add('d-none');
		refreshIsCheckedArray();
		setArchive(false);
		setPin(false);
	};
	const showCheckBox = (event) => {
		event.stopPropagation();
		toggleCheckList(true);
		showInputField();
	};
	const handleInput = (event) => {
		checkIfEmpty(event);
		if (event.target.innerText !== '' && !event.target.classList.contains('replicationDone')) {
			arrayIndex.current += 1;
			setCheckListIndexArray([
				...checkListIndexArray,
				{ isChecked: false, value: arrayIndex.current }
			]);
		}
		event.target.classList.add('replicationDone');
	};
	const removeCheckList = (index) => {
		const newCheckListIndexArray = checkListIndexArray.filter((item) => {
			if (item.value !== index) return item;
		});
		setCheckListIndexArray(newCheckListIndexArray);
	};
	const handleInputFieldHover = (event) => {
		if (
			event.target.closest('#inputContainer') ||
			event.target.hasAttribute('data-removechecklist') ||
			event.target.hasAttribute('data-emailfieldbutton') ||
			event.target.hasAttribute('data-checkbox') ||
			event.target.closest('[data-lable]')
		)
			return;
		if (isOpen.current) {
			addNote();
		}
		hideInputField(event);
	};
	const addNote = () => {
		const email = [store.getState().user.user?.email];
		const isChecked = [];
		if (!email[0]) {
			dispatch(setAlert('Something Went Wrong!❌'));
			return;
		}
		if (sharedEmail !== null && isUpdate === false) {
			email.push(sharedEmail);
		}
		currentCheckListIndexArray.current.forEach((item) => {
			isChecked.push({ isChecked: item.isChecked });
		});
		const note = {
			title: titleField.current.innerText,
			note: noteField.current ? [noteField.current.innerText] : getCheckListInnertextArray(),
			email: email,
			tag: getTagList(),
			bin: false,
			isChecked: isChecked,
			pin: currentPin.current,
			check: currentshowCheckList.current,
			archive: currentArchive.current,
			deleteDate: '',
			reminder: currentReminderValue.current
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
			getCheckListInnertextArray().length === 0
		) {
			dispatch(setAlert('Cannot Save Empty Note!❌'));
		} else {
			dispatch(addANote(note));
		}
		dispatch(setSharedEmail(null));
	};
	const beforeNoteState = useRef({});
	const collectState = () => {
		beforeNoteState.current = {
			title: titleField.current.innerText,
			note: noteField.current ? [noteField.current.innerText] : getCheckListInnertextArray(),
			checkListIndexArray: currentCheckListIndexArray.current,
			pin: currentPin.current,
			check: currentshowCheckList.current
		};
		dispatch(setBeforeState(JSON.stringify(beforeNoteState.current)));
	};
	const getCheckListInnertextArray = () => {
		const checkListItem = document.getElementsByClassName('checkListItem');
		const checkListInnertextArray = [];
		Array.from(checkListItem).forEach((item) => {
			if (item.innerText !== '') checkListInnertextArray.push(item.innerText);
		});
		return checkListInnertextArray;
	};
	const setCheckListInnertextArray = () => {
		arrayIndex.current = beforeState.note.length;
		setCheckListIndexArray(beforeState.checkListIndexArray);
	};
	const setCheckBoxState = (isChecked, value) => {
		const newState = checkListIndexArray.map((obj) => {
			if (obj.value === value) {
				return { ...obj, isChecked };
			}
			return obj;
		});
		setCheckListIndexArray(newState);
	};
	const setIsCheckedArray = () => {
		let tempArray = [];
		label.map((_, index) => {
			tempArray[index] = false;
		});
		setIsChecked(tempArray);
	};
	const refreshIsCheckedArray = () => {
		let tempArray = [];
		currentIsChecked.current.map((_, index) => {
			tempArray[index] = false;
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
	const toggleLableContainer = () => {
		lableContainer.current?.classList.toggle('d-none');
	};
	useEffect(() => {
		const checkListItem = document.getElementsByClassName('checkListItem');
		if (beforeState !== null && checkListItem[0] !== undefined) {
			Array.from(beforeState.note).forEach((item, index) => {
				checkListItem[index].innerText = item;
				checkListItem[index].classList.add('replicationDone');
			});
			dispatch(setBeforeState(null));
		}
	}, [checkListIndexArray]);
	useEffect(() => {
		if (beforeState !== null) {
			if (emailFieldOpen !== null && emailFieldOpen === false) {
				showInputField();
				setPin(beforeState.pin);
				titleField.current.innerText = beforeState.title;
				if (beforeState.check === true) {
					toggleCheckList(true);
					setCheckListInnertextArray();
				} else {
					noteField.current.innerText = beforeState.note[0];
					dispatch(setBeforeState(null));
				}
			}
		}
	}, []);
	useEffect(() => {
		currentPin.current = pin;
		currentshowCheckList.current = showCheckList;
		currentArchive.current = archive;
		currentCheckListIndexArray.current = [...checkListIndexArray];
		currentIsChecked.current = [...isChecked];
		currentReminderValue.current = reminderValue;
	}, [pin, showCheckList, archive, checkListIndexArray, isChecked, reminderValue]);

	useEffect(() => {
		if (openClose.current) {
			hideInputField();
			openClose.current = false;
		}
		// eslint-disable-next-line
	}, [showCheckList]);

	useEffect(() => {
		document.addEventListener('click', handleInputFieldHover);
		return () => {
			document.removeEventListener('click', handleInputFieldHover);
		};
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (lable.length !== 0) {
			setLabel(lable[0].lable);
		}
	}, [lable]);
	useEffect(() => {
		setIsCheckedArray();
	}, [label]);
	return (
		<div className={`d-flex align-center justify-center ${styles.inputFieldContainer}`}>
			<div id='inputContainer' className={`${styles.inputContainer}`}>
				<div className={`${styles.inputChildContainer}`}>
					<div
						ref={pinSvgContainer}
						onClick={() => {
							setPin(!pin);
						}}
						className={`pinSvgContainer d-none`}>
						<div className='svg-container small-icon-hover'>
							{pin ? (
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
					<div ref={titleDiv} className={`ff fw-semibold ${styles.input} d-none`}>
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
					{showCheckList ? (
						<ReactSortable
							list={checkListIndexArray}
							setList={setCheckListIndexArray}
							animation={200}
							swap
							handle={'.handle'}>
							{checkListIndexArray.map((index) => {
								if (index.value !== undefined && index.value !== null) {
									return (
										<CheckList
											key={'listIndex' + index.value}
											handleInput={handleInput}
											removeCheckList={removeCheckList}
											isChecked={index}
											setCheckBoxState={setCheckBoxState}
											index={index.value}
										/>
									);
								}
							})}
						</ReactSortable>
					) : (
						<div className={` fs-400 ff fw-regular ${styles.input}`}>
							<div
								onInput={checkIfEmpty}
								onClick={showInputField}
								ref={noteField}
								contentEditable='plaintext-only'
								tabIndex={0}
								role='textbox'
								spellCheck='false'
								aria-multiline='true'></div>
							<p className={`fs-400 ff fw-regular`}>Take a note...</p>
							<ul ref={inputSvg} className={`d-flex ${styles.inputSvgContainer}`}>
								<li onClick={showCheckBox} data-checkboxicon>
									<div data-checkboxicon className='svg-container'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='icon-size'
											viewBox='0 0 24 24'
											fill='var(--list-icon-clr)'
											data-checkboxicon>
											<path
												data-checkboxicon
												d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z'
											/>
											<path data-checkboxicon d='M18 9l-1.4-1.4-6.6 6.6-2.6-2.6L6 13l4 4z' />
										</svg>
									</div>
								</li>
							</ul>
						</div>
					)}
				</div>
				<div
					ref={inputFieldSvg}
					className={`d-flex align-center ${styles.inputFieldSvgContainer} d-none `}>
					<NoteSvg
						archive={setArchive}
						addNote={addNote}
						hideInputField={hideInputField}
						collectState={collectState}
						toggleLableContainer={toggleLableContainer}
						showReminder={showReminder}
						setShowReminder={setShowReminder}
					/>
					<button
						onClick={(event) => {
							addNote();
							hideInputField(event);
						}}
						className='ff fs-400 fw-semibold'>
						Close
					</button>
				</div>
				<div data-lable ref={lableContainer} className={`${styles.lableContainer} d-none`}>
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
				</div>
				<Reminder
					showReminder={showReminder}
					setShowReminder={setShowReminder}
					setReminderValue={setReminderValue}
				/>
			</div>
		</div>
	);
};
export default InputField;
