import styles from '../Styles/Setting.module.css';
import { useEffect } from 'react';
const Setting = () => {
	const checkIfClickedOutside = (event) => {
		if (event.target.closest('#settingContainer') || event.target.closest('[data-setting]')) return;
		closeSetting();
	};
	const closeSetting = ()=>{
		document.getElementById('settingContainer').classList.add('d-none');
	}
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
						<input type='checkbox'></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Move ticked items to bottom</p>
						<input type='checkbox'></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Enable dark theme</p>
						<input type='checkbox'></input>
					</div>
				</div>
				<div className={`${styles.setting} d-flex`}>
					<p className='text-primary fs-400 ff'>Reminder defaults</p>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Morning</p>
						<input type='checkbox'></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Afternoon </p>
						<input type='checkbox'></input>
					</div>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Evening</p>
						<input type='checkbox'></input>
					</div>
				</div>
				<div className={`${styles.setting} d-flex`}>
					<p className='text-primary fs-400 ff'>Sharing</p>
					<div className={`d-flex align-center ${styles.settingList}`}>
						<p className={`ff`}>Enable Sharing</p>
						<input type='checkbox'></input>
					</div>
				</div>
			</div>
			<div className={`d-flex ${styles.settingButton}`}>
				<button onClick={closeSetting}>Cancle</button>
				<button className={` text-primary`}>Save</button>
			</div>
		</section>
	);
};

export default Setting;
