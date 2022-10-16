import { useRef, useEffect, useState } from 'react';
import styles from '../Styles/InputField.module.css';
import NoteSvg from './NoteSvg';
import CheckList from './CheckList';
import { ReactSortable } from 'react-sortablejs';

const InputField = () => {
	const [pin, setPin] = useState(false);
	const [showCheckList, toggleCheckList] = useState(false);
	const [checkListIndexArray, setCheckListIndexArray] = useState([0]);
	let openClose = useRef(false);
	const arrayIndex = useRef(0);
	const titleDiv = useRef();
	const titleField = useRef();
	const noteField = useRef();
	const inputFieldSvg = useRef();
	const inputSvg = useRef();
	const pinSvgContainer = useRef();

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
			setCheckListIndexArray([0]);
			arrayIndex.current = 0;
			openClose.current = true;
		}
		setPin(false);
	};
	const showCheckBox = () => {
		toggleCheckList(true);
		showInputField();
	};
	const handleInput = (event) => {
		checkIfEmpty(event);
		if (event.target.innerText !== '' && !event.target.classList.contains('replicationDone')) {
			arrayIndex.current += 1;
			setCheckListIndexArray([...checkListIndexArray, arrayIndex.current]);
		}
		event.target.classList.add('replicationDone');
	};
	const removeCheckList = (index) => {
		const newCheckListIndexArray = checkListIndexArray.filter((item) => {
			return item !== index;
		});
		setCheckListIndexArray(newCheckListIndexArray);
	};
	const handleInputFieldHover = (event) => {
		if (
			event.target.closest('#inputContainer') ||
			event.target.hasAttribute('data-removechecklist')
		)
			return;
		hideInputField(event);
	};
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
								return (
									<CheckList
										key={'listIndex' + index}
										handleInput={handleInput}
										removeCheckList={removeCheckList}
										index={index}
									/>
								);
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
								<li>
									<div className='svg-container'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='icon-size'
											viewBox='0 0 24 24'
											fill='var(--list-icon-clr)'>
											<path
												xmlns='http://www.w3.org/2000/svg'
												d='M18.64 4.75L20 6.11l-7.79 7.79-1.36-1.36 7.79-7.79m0-2c-.51 0-1.02.2-1.41.59l-7.79 7.79c-.78.78-.78 2.05 0 2.83l1.36 1.36c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.79-7.79c.78-.78.78-2.05 0-2.83l-1.35-1.35c-.39-.4-.9-.6-1.42-.6zM7 14.25c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z'
											/>
										</svg>
									</div>
								</li>
								<li>
									<div className='svg-container'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='icon-size'
											viewBox='0 0 24 24'
											fill='var(--list-icon-clr)'>
											<path
												xmlns='http://www.w3.org/2000/svg'
												d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z'
											/>
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
					<NoteSvg />
					<button onClick={hideInputField} className='ff fs-400 fw-semibold'>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
export default InputField;
