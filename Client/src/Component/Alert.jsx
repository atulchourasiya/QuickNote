import styles from '../Styles/Alert.module.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../Redux/Slice/alertSlice';
const Alert = () => {
	const dispatch = useDispatch();
	const alertContainer = useRef();
	const { alert } = useSelector((state) => state.alert);
	const cancleAlert = () => {
		alertContainer.current.classList.add('d-none');
		dispatch(setAlert(null));
	};
	useEffect(() => {
		if (alert !== null) {
			alertContainer.current.classList.remove('d-none');
			setTimeout(() => {
				alertContainer.current.classList.add('d-none');
				dispatch(setAlert(null));
			}, 3000);
		}
		// eslint-disable-next-line
	},[alert]);
	return (
		<>
			{alert !== null ? (
				<div
					ref={alertContainer}
					className={`d-flex justify-center align-center ff fs-400 fw-bold ${styles.alertContainer}`}>
					<p>{alert}</p>
					<div className={`${styles.cancleAlert} pointer`} onClick={cancleAlert}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='var(--list-icon-clr)' viewBox='0 0 16 16'>
							<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
						</svg>
					</div>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default Alert;
