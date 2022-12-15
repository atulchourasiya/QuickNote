import logo from '../Assets/Image/logo.png';
import styles from '../Styles/Welcome.module.css';
import Typed from 'react-typed';
import login from '../Assets/Image/login.png';
import GoogleButton from 'react-google-button';

const Welcome = () => {
	return (
		<div className={`${styles.welcomeContainer} d-flex`}>
			<div className={'d-flex align-center'}>
				<img src={logo} alt='logo' className={styles.logoImg} />
				<h1 className='ff fs-500 w-max pointer spacing fw-regular'>QuickNote</h1>
			</div>
			<h2 className={`d-flex justify-center fw-bold ff fs-600 ${styles.welcomeHeading}`}>
				Welcome to &nbsp;<mark>Quick Note</mark>
			</h2>
			<Typed
				className={`${styles.welcomeTyped} ff fs-400 d-flex justify-center`}
				strings={[
					'Share note through email',
					'Add Reminder to note',
					'Send feedback to developer',
					'Change theme go fullscreen toggle viewmode',
					'Create task-list sort by dragging',
					'Create lable and classify note',
					'Add update search delete & copy note'
				]}
				typeSpeed={50}
				backSpeed={50}
				showCursor={true}
				loop={true}
				loopCount={Infinity}
			/>
			<div className={`${styles.welcomeIllustration} d-flex justify-center align-center`}>
				<li>
					<img src={login} className={`${styles.welcomeImage}`} alt='' />
				</li>
				<li>
					<GoogleButton
						onClick={() => {
							window.open(`${process.env.REACT_APP_API_HOST}/auth/google`, '_self');
						}}
					/>
				</li>
			</div>
		</div>
	);
};

export default Welcome;
