import RingLoader from 'react-spinners/RingLoader';
import styles from '../Styles/Loader.module.css'
const Loader = () => {
	return (
		<div className={`${styles.loaderContainer} d-flex align-center justify-center`}>
			<RingLoader color={'var(--bg-cyan)'} loading={true} size={50} speedMultiplier='1'/>
			<h1 className={`${styles.LoaderText} ff fs-500`}>Quick Note</h1>
		</div>
	);
};

export default Loader;
