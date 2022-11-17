import styles from '../Styles/Setting.module.css';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../Redux/Slice/themeSlice';
import {
	setAfternoonTime,
	setEveningTime,
	setMorningTime,
	setNewNoteBottom
} from '../Redux/Slice/settingSlice';
const Setting = () => {
	let { theme } = useSelector((state) => state.theme);
	let { newnotebottom ,morning , afternoon , evening} = useSelector((state) => state.setting);
	const morningref = useRef();
	const afternoonref = useRef();
	const eveningref = useRef();
	const dispatch = useDispatch();
	const checkIfClickedOutside = (event) => {
		if (event.target.closest('#settingContainer') || event.target.closest('[data-setting]')) return;
		closeSetting();
	};
	const closeSetting = () => {
		document.getElementById('settingContainer').classList.add('d-none');
	};
	const settingOnChange = (event) => {
		if (morningref.current === event.target) {
			dispatch(setMorningTime(event.target.value));
			localStorage.setItem('morning', event.target.value);
		}
		if (afternoonref.current === event.target) {
			dispatch(setAfternoonTime(event.target.value));
			localStorage.setItem('afternoon', event.target.value);
		}
		if (eveningref.current === event.target) {
			dispatch(setEveningTime(event.target.value));
			localStorage.setItem('evening', event.target.value);
		}
	};
	useEffect(() => {
		document.addEventListener('click', checkIfClickedOutside);
		return () => {
			document.removeEventListener('click', checkIfClickedOutside);
		};
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		closeSetting();
	}, []);
	return (
		<section
			id='settingContainer'
			className={`${styles.settingContainer} d-flex justify-center align-center d-none`}>
			<h2 className='ff fs-500 fw-semiBold'>Setting</h2>
			<div className={`${styles.settingChildContainer}`}>
				<div className={`${styles.setting} d-flex`}>
					<p className='text-primary fs-400 ff'>Notes and lists</p>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Add new items to the bottom</p>
						<input
							type='checkbox'
							readOnly={true}
							onClick={() => {
								if (localStorage.getItem('newnotebottom') === 'true') {
									dispatch(setNewNoteBottom('false'));
									localStorage.setItem('newnotebottom', 'false');
								} else {
									dispatch(setNewNoteBottom('true'));
									localStorage.setItem('newnotebottom', 'true');
								}
							}}
							checked={newnotebottom === 'true' ? true : false}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Enable dark theme</p>
						<input
							type='checkbox'
							readOnly={true}
							onClick={() => {
								if (theme === 'dark') {
									dispatch(setTheme('light'));
									localStorage.setItem('currentTheme', 'light');
								} else {
									dispatch(setTheme('dark'));
									localStorage.setItem('currentTheme', 'dark');
								}
							}}
							checked={theme === 'dark' ? true : false}></input>
					</div>
				</div>
				<div className={`${styles.setting} d-flex`}>
					<p className='text-primary fs-400 ff'>Reminder defaults</p>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Morning</p>
						<input
							ref={morningref}
							type='time'
							onChange={settingOnChange}
							defaultValue={morning}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Afternoon </p>
						<input
							ref={afternoonref}
							type='time'
							onChange={settingOnChange}
							defaultValue={afternoon}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Evening</p>
						<input
							ref={eveningref}
							type='time'
							onChange={settingOnChange}
							defaultValue={evening}></input>
					</div>
				</div>
			</div>
			<div className={`d-flex btn`}>
				<button onClick={closeSetting}>Cancel</button>
				{/* <button className={` text-primary`}>Save</button> */}
			</div>
		</section>
	);
};

export default Setting;
