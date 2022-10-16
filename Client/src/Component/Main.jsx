import InputField from './InputField';
import Notes from './Notes';
import styles from '../Styles/Main.module.css'

const Main = () => {
	return (
		<div className={styles.mainContainer}>
			<InputField />
			<Notes />
		</div>
	);
};

export default Main;
