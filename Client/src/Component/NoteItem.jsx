import styles from '../Styles/NoteItem.module.css'
import NoteSvg from './NoteSvg';
import {useState} from 'react'

const NoteItem = (props) => {
	const [pin, setPin] = useState(false);
  return (
		<div className={`${styles.noteItemContainer} itemContainer`}>
			<div
				onClick={() => {
					setPin(!pin);
				}}
				className={`pinSvgContainer`}>
				<div className='svg-container small-icon-hover'>
					{pin ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`icon-size`}
							viewBox='0 0 24 24'
							fill='var(--icon-clr)'>
							<path fill='none' d='M0 0h24v24H0z' />
							<path
								fill='var(--icon-clr)'
								d='M17 4a2 2 0 0 0-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`icon-size`}
							viewBox='0 0 24 24'
							fill='var(--icon-clr)'>
							<path fill='none' d='M0 0h24v24H0z' />
							<path
								fill='var(--icon-clr)'
								d='M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z'
							/>
						</svg>
					)}
				</div>
			</div>
			<div>
				<p className={`ff ${styles.noteItemTitle}`}>{props.title}</p>
				<p className={`ff fs-400 ${styles.noteItemNote}`}>{props.note}</p>
			</div>
			<NoteSvg />
		</div>
	);
}

export default NoteItem
