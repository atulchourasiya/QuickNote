import InputField from './InputField';
import Notes from './Notes';
import styles from '../Styles/Main.module.css';
import EmailFiled from './EmailFiled';
import { useSelector } from 'react-redux';

const Main = () => {
	let { emailFieldOpen } = useSelector((state) => state.view);
	return (
		<div className={styles.mainContainer}>
			{emailFieldOpen ? <EmailFiled /> : <InputField />}
			<Notes />
		</div>
	);
};

export default Main;
