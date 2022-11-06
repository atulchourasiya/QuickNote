import { useRef } from 'react';
import styles from '../Styles/EmailField.module.css';
import userDemo from '../Assets/Image/user.png';
import { setEmailFieldOpen } from '../Redux/Slice/viewSlice';
import { setIsUpdate, setSharedEmail } from '../Redux/Slice/sharedEmail';
import { useDispatch, useSelector } from 'react-redux';
const EmailFiled = () => {
	let { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const inputSharedEmail = useRef();
	const emailFieldNotValid = useRef();
	function validateEmail(email) {
		var regex = /\S+@\S+\.\S+/;
		return regex.test(email);
	}
	const getSharedEmail = () => {
		const sharedEmail = inputSharedEmail.current.value;
		if (!validateEmail(sharedEmail)) {
			emailFieldNotValid.current.classList.remove('d-none');
			return;
		} else {
			emailFieldNotValid.current.classList.add('d-none');
		}
		dispatch(setSharedEmail(sharedEmail));
		dispatch(setEmailFieldOpen(false));
	};
	return (
		<div
			id='emailFiledContainer'
			className={`${styles.emailFiledContainer} d-flex justify-center align-center`}>
			<div className={`${styles.emailFiledChildContainer}`}>
				<h3 className={`${styles.emailFiledHeading} ff fs-500`}>Collaborator</h3>
				<div>
					<hr />
				</div>
				<div>
					<div className={`d-flex ${styles.emailFiledOwner}`}>
						<img
							src={user ? user.imageLink : userDemo}
							alt='Profile'
							referrerPolicy='no-referrer'
						/>
						<div>
							<p className={`ff fs-400`}>
								{user?.name ?? 'Atul Chourasiya'} {' {owner}'}
							</p>
							<p className={`ff fs-400`}>{user?.email ?? 'Example@gmail.com'}</p>
						</div>
					</div>
					<div className={`d-flex ${styles.emailFiledOwner}`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill={'var(--list-icon-clr)'}
							viewBox='-1 -1 26 26'>
							<path d='M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z' />
						</svg>

						<input ref={inputSharedEmail} placeholder={`Add email or person to share with`}></input>
					</div>
				</div>
				<p ref={emailFieldNotValid} className={`${styles.emailFiledNotValid} fs-400 ff d-none`}>
					This Email Is Not Valid
				</p>
				<div className={`d-flex btn`}>
					<button
						onClick={() => {
							dispatch(setEmailFieldOpen(false));
							dispatch(setIsUpdate(false));
						}}
						data-emailfieldbutton>
						Cancle
					</button>
					<button data-emailfieldbutton onClick={getSharedEmail}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EmailFiled;
