import styles from '../Styles/Feedback.module.css';
import { useSelector } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Feedback = () => {
	const form = useRef();
	const message = useRef();
	let { user } = useSelector((state) => state.user);

	const checkIfClickedOutside = (event) => {
		if (event.target.closest('#feedbackContainer') || event.target.closest('[data-feedback]'))
			return;
		closeFeedback(null);
	};

	const closeFeedback = (event) => {
		if (event) event.preventDefault();
		document.getElementById('feedbackContainer').classList.add('d-none');
		message.current.value = '';
	};

	const sendEmail = (e) => {
		e.preventDefault();
		emailjs.sendForm('service_ob8v73g', 'template_w04jzi8', form.current, 'xG1ig44JSUUr3h1jZ').then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);

		closeFeedback(null)
		message.current.value = '';
	};
	useEffect(() => {
		document.addEventListener('click', checkIfClickedOutside);
		return () => {
			document.removeEventListener('click', checkIfClickedOutside);
		};
		// eslint-disable-next-line
	}, []);
	return (
		<section id='feedbackContainer' className={`${styles.feedbackContainer} d-none`}>
			<h2 className={`ff fs-500 fw-semiBold ${styles.feedbackHeading}`}>Send Feedback</h2>
			<form ref={form} action='post' className={`d-flex ${styles.feedbackForm}`}>
				<input
					className={`d-none`}
					type='name'
					name='from_name'
					readOnly
					value={user?.name ?? 'Atul Chourasiya'}
				/>
				<input
					className={`ff fs-400 ${styles.feedbackEmail}`}
					type='email'
					name='from_email'
					readOnly
					value={user?.email ?? 'Example@gmail.com'}
				/>
				<textarea
					ref={message}
					className={`ff fs-400 ${styles.feedbackMessage}`}
					type='text'
					name='message'
					placeholder='Message'
				/>
				<div className={`d-flex ${styles.feedbackButton}`}>
					<button onClick={closeFeedback}>Cancle</button>
					<button onClick={sendEmail} className={`text-primary`}>
						Send
					</button>
				</div>
			</form>
		</section>
	);
};

export default Feedback;
