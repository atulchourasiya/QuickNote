import styles from '../Styles/EditLable.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLable } from '../Redux/Slice/lableSlice';
import { setAlert } from '../Redux/Slice/alertSlice';
const EditLable = () => {
	const dispatch = useDispatch();
	let { user } = useSelector((state) => state.user);
	let { lable } = useSelector((state) => state.lable);
	const [label, setLabel] = useState([]);
	const inputField = useRef();
	const addALable = () => {
		const regex = /^[a-zA-Z0-9]{0,16}$/;
		const labelText = inputField.current.value;
		if(!regex.test(labelText)){
			dispatch(setAlert('Lable Must Be A Single Word Less Than 15 Character! ❌'));
			return;
		}
		let isAlreadyExit = false;
		label.forEach((lable) => {
			if (lable.toLowerCase() === labelText.toLowerCase()) {
				isAlreadyExit = true;
			}
		});
		if (
			isAlreadyExit ||
			labelText.toLowerCase() === 'reminder' ||
			labelText.toLowerCase() === '' ||
			labelText.toLowerCase() === 'label' ||
			labelText.toLowerCase() === 'archive' ||
			labelText.toLowerCase() === 'bin'
		) {
			dispatch(setAlert('Try Something else! ❌'));
			return;
		}
		if (user === null) {
			dispatch(setAlert('Something Went Wrong! ❌'));
			return;
		}
		const newLable = {
			user: user.email,
			lable: [...label, labelText]
		};
		dispatch(addLable(newLable));
		inputField.current.value = '';
	};
	const checkIfClickedOutside = (event) => {
		if (event.target.closest('#editlableContainer') || event.target.closest('[data-lable=true]'))
			return;
		closeSetting();
	};
	const closeSetting = () => {
		document.getElementById('editlableContainer').classList.add('d-none');
	};
	useEffect(() => {
		document.addEventListener('click', checkIfClickedOutside);
		return () => {
			document.removeEventListener('click', checkIfClickedOutside);
		};
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (lable.length !== 0) {
			setLabel(lable[0].lable);
		}
	}, [lable]);
	return (
		<div id='editlableContainer' className={`${styles.editLableContainer} d-none`}>
			<h2 className='ff fs-400 fw-semiBold'>Edit Labels</h2>
			<input
				ref={inputField}
				type='text'
				className={`${styles.editLableInput} ff fs-400`}
				placeholder='Create New Labels'
			/>
			{label.map((item, index) => {
				return (
					<div key={'lableid' + index} className={`${styles.lables} d-flex ff fs-400 `}>
						{item}
					</div>
				);
			})}
			<div className={`d-flex btn`}>
				<button onClick={closeSetting}>Cancle</button>
				<button className={`text-primary`} onClick={addALable}>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditLable;
