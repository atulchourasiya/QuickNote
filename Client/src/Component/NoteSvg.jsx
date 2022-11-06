import styles from '../Styles/NoteSvg.module.css';
import { useDispatch } from 'react-redux';
import { setEmailFieldOpen } from '../Redux/Slice/viewSlice';
import { setIsUpdate } from '../Redux/Slice/sharedEmail';
import { setAlert } from '../Redux/Slice/alertSlice';
const NoteSvg = (props) => {
	const dispatch = useDispatch();

	return (
		<>
			<ul className='d-flex'>
				<li
					data-addreminderbtn
					onClick={() => {
						props.setShowReminder(!props.showReminder);
					}}
					className={`svg-container noteSvg-icon-hover`}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={`${styles.noteSvgIconHover} ${styles.noteSvgIconSize}`}
						viewBox='0 0 24 24'>
						<path d='M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z' />
						<path d='M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z' />
					</svg>
				</li>
				<a href={`#emailFiledContainer`}>
					<li
						className={`svg-container noteSvg-icon-hover`}
						onClick={() => {
							if (props.id !== undefined) {
								dispatch(setEmailFieldOpen(true));
								dispatch(setIsUpdate(props.id));
							} else {
								props.collectState();
								dispatch(setEmailFieldOpen(true));
							}
						}}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`${styles.noteSvgIconHover} ${styles.noteSvgIconSize}`}
							viewBox='0 0 24 24'>
							<path d='M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z' />
						</svg>
					</li>
				</a>
				<li
					className={`svg-container noteSvg-icon-hover`}
					onClick={async (event) => {
						if (props.id !== undefined) {
							props.UpdateNote({ archive: !props.archive });
						} else {
							await props.archive(true);
							props.addNote();
							props.hideInputField(event);
						}
					}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={`${styles.noteSvgIconHover} ${styles.noteSvgIconSize}`}
						style={props.archive === true ? { transform: 'scaleY(-1)' } : {}}
						viewBox='0 0 24 24'>
						<path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z' />
					</svg>
				</li>
				<li
					data-noteoption
					className={`svg-container noteSvg-icon-hover`}
					onClick={() => {
						props.showOptions();
					}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className={`${styles.noteSvgIconHover} ${styles.noteSvgIconSize}`}
						viewBox='0 0 18 18'>
						<path d='m9 5.5c1 0 1.8-0.8 1.8-1.8s-0.8-1.7-1.8-1.7-1.8 0.8-1.8 1.8 0.8 1.7 1.8 1.7zm0 1.7c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5.3c-1 0-1.8 0.8-1.8 1.8s0.8 1.7 1.8 1.7 1.8-0.8 1.8-1.8-0.8-1.7-1.8-1.7z' />
					</svg>
				</li>
				<li
					data-addlablebtn
					onClick={() => {
						props.toggleLableContainer();
					}}
					className={`svg-container noteSvg-icon-hover`}>
					<svg
						className={`${styles.noteSvgIconHover} ${styles.noteSvgIconSize}`}
						viewBox='0 0 1024 1024'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z'></path>
						<path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'></path>
					</svg>
				</li>
			</ul>
		</>
	);
};

export default NoteSvg;
