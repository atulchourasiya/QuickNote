import styles from '../Styles/CheckList.module.css';
import CheckBox from './CheckBox';
const CheckList = (props) => {
	return (
		<div className={`fs-400 ff fw-regular ${styles.CheckListContainer}`}>
			<div
				onInput={props.handleInput}
				className={'checkListItem'}
				contentEditable='plaintext-only'
				tabIndex={0}
				role='textbox'
				spellCheck='false'
				aria-multiline='true'></div>
			<p className={`fs-400 ff fw-regular`}>List item</p>
			<ul className={`d-flex align-center ${styles.CheckListSvgContainer}`}>
				<li className={`${styles.dragIcon} handle`}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						className='icon-size'
						fill='var(--list-icon-clr)'>
						<circle cy='5.5' cx='7.5' r='1.5' />
						<circle cy='5.5' cx='12.5' r='1.5' />
						<circle cy='10.5' cx='7.5' r='1.5' />
						<circle cy='10.5' cx='12.5' r='1.5' />
						<circle cy='15.5' cx='7.5' r='1.5' />
						<circle cy='15.5' cx='12.5' r='1.5' />
					</svg>
				</li>
				<li className={`${styles.plusIcon}`}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='small-icon-size'
						viewBox='0 0 48 48'
						fill='var(--list-icon-clr)'>
						<path d='m38 26h-12v12h-4v-12h-12v-4h12v-12h4v12h12v4z' />
						<path d='m0 0h48v48h-48z' fill='none' />
					</svg>
				</li>
				<li>
					<div className={`${styles.CheckBox}`}>
						<CheckBox isChecked={props.isChecked} setCheckBoxState={props.setCheckBoxState} />
					</div>
				</li>
				<li
					onClick={() => {
						props.removeCheckList(props.index);
					}}
					className={`svg-container small-icon-hover ${styles.cancleList}`}>
					<svg
						data-removechecklist
						xmlns='http://www.w3.org/2000/svg'
						className={`small-icon-size`}
						viewBox='0 0 24 24'
						fill='var(--list-icon-clr)'>
						<path
							data-removechecklist
							d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'
						/>
					</svg>
				</li>
			</ul>
		</div>
	);
};

export default CheckList;
