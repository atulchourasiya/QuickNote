import styles from '../Styles/CheckBox.module.css';
import { useRef, useEffect } from 'react';

const CheckBox = (props) => {
	const CheckBoxContainer = useRef();
	const tick = `<svg
	 			xmlns='http://www.w3.org/2000/svg'
				stroke='var(--list-icon-clr)'
				fill='var(--list-icon-clr)'
				stroke-width='0'
				viewBox='2 -1 8 19'
				height='1rem'
				width='1rem'
				data-checkbox>
				<path data-checkbox fill-rule='evenodd' d='M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z'></path>
			</svg>`;
   const setCheckBoxState =()=>{
		const newState = props.isChecked.map((obj) => {
			if (obj === props.isChecked[props.index]) {
				return { isChecked: !obj.isChecked };
			}
			return obj;
		});
		return newState
	}
	const toggleCheckbox = () => {
		if (props.id !== undefined) {
			props.UpdateNote({
				isChecked: setCheckBoxState()
			});
		} else if (props.isChecked !== undefined && props.isChecked.value !== undefined) {
			if (props.isChecked.isChecked === false) {
				CheckBoxContainer.current.innerHTML = tick;
				props.setCheckBoxState(true, props.isChecked.value);
			} else if (props.isChecked.isChecked === true) {
				CheckBoxContainer.current.innerHTML = '';
				props.setCheckBoxState(false, props.isChecked.value);
			}
		}
	};
	const initializeCheckBox = () => {
		if (props.id !== undefined && props.isChecked[props.index] !== undefined) {
			if (props.isChecked[props.index].isChecked === true) {
				CheckBoxContainer.current.innerHTML = tick;
			} else if (props.isChecked[props.index].isChecked === false) {
				CheckBoxContainer.current.innerHTML = '';
			}
		}
	};
	useEffect(() => {
		initializeCheckBox();
	});
	return (
		<div
			data-checkbox
			ref={CheckBoxContainer}
			className={`${styles.CheckBoxContainer} d-flex align-center justify-center pointer`}
			onClick={toggleCheckbox}></div>
	);
};

export default CheckBox;
