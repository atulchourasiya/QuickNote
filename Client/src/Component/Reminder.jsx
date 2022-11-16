import styles from '../Styles/Reminder.module.css';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../Redux/Slice/alertSlice';

const Reminder = (props) => {
	const dateRef = useRef();
	const timeRef = useRef();
	const reminderContainer = useRef();
	const dispatch = useDispatch();
	const { morning, afternoon, evening } = useSelector((state) => state.setting);

	const currentDate = () => {
		var todayDate = new Date();
		var month = todayDate.getMonth() + 1;
		var year = todayDate.getUTCFullYear() - 0;
		var tdate = todayDate.getDate();
		if (month < 10) {
			month = '0' + month;
		}
		if (tdate < 10) {
			tdate = '0' + tdate;
		}
		var current = year + '-' + month + '-' + tdate;
		dateRef.current?.setAttribute('value', current);
		dateRef.current?.setAttribute('min', current);
	};

	const currentTime = () => {
		var todayTime = new Date();
		var hours = todayTime.getHours();
		var min = todayTime.getMinutes();
		var time;
		if (hours < 10) {
			hours = '0' + hours;
		}
		if (min < 10) {
			min = '0' + min;
		}
		time = hours + ':' + min;
		timeRef.current?.setAttribute('value', time);
		timeRef.current?.setAttribute('min', time);
	};

	const setReminder = async (event) => {
		try {
			if (Notification.permission !== 'granted') await Notification.requestPermission();
			if (Notification.permission === 'granted') {
				const Current = new Date();
				let reminder;
				if (event.target.closest('#Morning')) {
					reminder = new Date(`${dateRef.current.value} ${morning}:00`);
				}
				if (event.target.closest('#AfterNoon')) {
					reminder = new Date(`${dateRef.current.value} ${afternoon}:00`);
				}
				if (event.target.closest('#Evening')) {
					reminder = new Date(`${dateRef.current.value} ${evening}:00`);
				}
				if (event.target.closest('#Button')) {
					reminder = new Date(`${dateRef.current.value} ${timeRef.current.value}:00`);
				}
				if (Current >= reminder) {
					dispatch(setAlert('Time is Expired!❌'));
					return;
				} else {
					props.setShowReminder(false);
					props.setReminderValue(reminder);
					dispatch(setAlert('Remainder Added Successfully!✅'));
				}
			} else {
				dispatch(setAlert('Notification Permission is denied!❌'));
			}
		} catch (error) {
			dispatch(setAlert('Something went wrong!❌'));
			return;
		}
	};

	useEffect(() => {
		currentTime();
		setInterval(() => {
			currentTime();
		}, 1000);
		currentDate();
	}, []);

	useEffect(() => {
		const container = document.getElementsByClassName('reminderContainer');
		Array.from(container).forEach((item) => {
			item.classList.add('d-none');
		});
		if (props.showReminder) {
			reminderContainer.current.classList.remove('d-none');
		}
	}, [props.showReminder]);

	return (
		<div
			data-remindercontainer
			ref={reminderContainer}
			className={`${styles.reminderContainer} reminderContainer`}>
			<h2 className={`ff fs-400 fw-semibold`}>Reminder</h2>
			
			<div
				id='Morning'
				onClick={setReminder}
				className={`${styles.reminderContainerField} d-flex pointer`}>
				<p className={`ff fs-400`}>This Morning:</p>
				<input type='Time' value={morning} disabled />
			</div>
			<div
				id='AfterNoon'
				onClick={setReminder}
				className={`${styles.reminderContainerField} d-flex pointer`}>
				<p className={`ff fs-400`}>This AfterNoon:</p>
				<input type='Time' value={afternoon} disabled />
			</div>
			<div
				id='Evening'
				onClick={setReminder}
				className={`${styles.reminderContainerField} d-flex pointer`}>
				<p className={`ff fs-400`}>This Evening:</p>
				<input type='Time' value={evening} disabled />
			</div>
			<div className={`${styles.reminderContainerField} d-flex`}>
				<p className={`ff fs-400`}>Date:</p>
				<input ref={dateRef} type='Date' />
			</div>
			<div className={`${styles.reminderContainerField} d-flex`}>
				<p className={`ff fs-400`}>Time:</p>
				<input ref={timeRef} type='Time' />
			</div>
			<div className={`d-flex btn`}>
				<button
					onClick={() => {
						props.setShowReminder(false);
					}}>
					Cancel
				</button>
				<button id='Button' onClick={setReminder} className={`text-primary`}>
					Save
				</button>
			</div>
		</div>
	);
};

export default Reminder;
