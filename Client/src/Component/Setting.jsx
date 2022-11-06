import styles from '../Styles/Setting.module.css';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../Redux/Slice/themeSlice';
import {
	setAfternoonTime,
	setEveningTime,
	setMorningTime,
	setNewNoteBottom,
	setTickedNoteBottom
} from '../Redux/Slice/settingSlice';

const Setting = () => {
	let { theme } = useSelector((state) => state.theme);
	let { newnotebottom } = useSelector((state) => state.setting);
	let { tickednotebottom } = useSelector((state) => state.setting);
	const morning = useRef();
	const afternoon = useRef();
	const evening = useRef();
	const dispatch = useDispatch();
	const checkIfClickedOutside = (event) => {
		if (event.target.closest('#settingContainer') || event.target.closest('[data-setting]')) return;
		closeSetting();
	};
	const closeSetting = () => {
		document.getElementById('settingContainer').classList.add('d-none');
	};
	const settingOnChange = (event) => {
		if (morning.current === event.target) {
			dispatch(setMorningTime(event.target.value));
		}
		if (afternoon.current === event.target) {
			dispatch(setAfternoonTime(event.target.value));
		}
		if (evening.current === event.target) {
			dispatch(setEveningTime(event.target.value));
		}
	};
	useEffect(() => {
		document.addEventListener('click', checkIfClickedOutside);
		return () => {
			document.removeEventListener('click', checkIfClickedOutside);
		};
		// eslint-disable-next-line
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
							onClick={() => {
								newnotebottom === true
									? dispatch(setNewNoteBottom(false))
									: dispatch(setNewNoteBottom(true));
							}}
							defaultChecked={newnotebottom ? true : false}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Move ticked items to bottom</p>
						<input
							type='checkbox'
							onClick={() => {
								tickednotebottom === true
									? dispatch(setTickedNoteBottom(false))
									: dispatch(setTickedNoteBottom(true));
							}}
							defaultChecked={tickednotebottom ? true : false}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Enable dark theme</p>
						<input
							type='checkbox'
							onClick={() => {
								theme === 'dark' ? dispatch(setTheme('light')) : dispatch(setTheme('dark'));
							}}
							defaultChecked={theme === 'dark' ? true : false}></input>
					</div>
				</div>
				<div className={`${styles.setting} d-flex`}>
					<p className='text-primary fs-400 ff'>Reminder defaults</p>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Morning</p>
						<input
							ref={morning}
							type='time'
							onChange={settingOnChange}
							defaultValue={'06:00'}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Afternoon </p>
						<input
							ref={afternoon}
							type='time'
							onChange={settingOnChange}
							defaultValue={'12:00'}></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Evening</p>
						<input
							ref={evening}
							type='time'
							onChange={settingOnChange}
							defaultValue={'17:00'}></input>
					</div>
				</div>
			</div>
			<div className={`d-flex btn`}>
				<button onClick={closeSetting}>Cancle</button>
				{/* <button className={` text-primary`}>Save</button> */}
			</div>
		</section>
	);
};

export default Setting;
