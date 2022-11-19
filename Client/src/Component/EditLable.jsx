import styles from '../Styles/EditLable.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLable, deleteLable } from '../Redux/Slice/lableSlice';
import { setAlert } from '../Redux/Slice/alertSlice';
import { setUpdated } from '../Redux/Slice/notesSlice';
import { setTitle } from '../Redux/Slice/viewSlice';

const EditLable = () => {
	const dispatch = useDispatch();
	let { user } = useSelector((state) => state.user);
	let { notes } = useSelector((state) => state.notes);
	let { updated } = useSelector((state) => state.notes);
	let { lable } = useSelector((state) => state.lable);
	let deleteTag = useRef('');
	const [label, setLabel] = useState([]);
	const inputField = useRef();
	const addALable = () => {
		const regex = /^[a-zA-Z0-9]{3,10}$/;
		const labelText = inputField.current.value;
		if (!regex.test(labelText)) {
			dispatch(setAlert('Lable Must Be A Single Word Between 3-10 Character! ❌'));
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
	const deleteALable = (event) => {
		if (window.confirm('Confirm Delete?!') !== true) return;
		let lableDelete = event.target.closest('.label')?.innerText;
		deleteTag.current = lableDelete.toLowerCase();
		let lables;
		lables = lable[0].lable.filter((item) => {
			return item !== lableDelete;
		});
		dispatch(
			deleteLable({
				user: user.email,
				lable: lables,
				notes: notes,
				lableDelete
			})
		);
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
	useEffect(()=>{
		if(updated){
		const path = window.location.hash;
		if(deleteTag.current === path.slice(2)){
			window.location.href = '#/'
			dispatch(setTitle('Quick Note'));
		}
		deleteTag.current = ''
		dispatch(setUpdated(false));
		}
	},[updated])
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
					<div key={'lableid' + index} className={`${styles.lables} d-flex ff fs-400 label`}>
						{item}
						<div onClick={deleteALable}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon-size'
								fill='var(--icon-clr)'
								viewBox='0 0 16 16'>
								<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
								<path
									fillRule='evenodd'
									d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
								/>
							</svg>
						</div>
					</div>
				);
			})}
			<div className={`d-flex btn`}>
				<button onClick={closeSetting}>Cancel</button>
				<button className={`text-primary`} onClick={addALable}>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditLable;
