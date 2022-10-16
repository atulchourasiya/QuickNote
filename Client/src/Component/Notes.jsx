import NoteItem from './NoteItem';
import styles from '../Styles/Note.module.css';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
const Notes = () => {
	let { listView } = useSelector((state) => state.view);
	const noteContainer = useRef();
	const itemContainer = document.getElementsByClassName('itemContainer');
	useEffect(() => {
		if (listView) {
			noteContainer.current.style.flexDirection = 'column';
			Array.from(itemContainer).map((item) => {
				item.style.width = '100%';
			});
		} else {
			noteContainer.current.style.flexDirection = 'row';
			Array.from(itemContainer).map((item) => {
				item.style.width = 'min-content';
			});
		}
	}, [listView]);

	const Note =[];
	return (
		<div
			ref={noteContainer}
			className={`d-flex justify-center align-center ${styles.noteContainer}`}>
			{Note.map((note, index) => {
				return <NoteItem key={'noteid' + index} title={note.title} note={note.note} />;
			})}
		</div>
	);
};

export default Notes;
