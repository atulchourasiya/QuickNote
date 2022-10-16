import styles from '../Styles/CheckBox.module.css';
import {useState,useRef} from 'react'

const CheckBox = () => {
	const [checked ,setChecked]=useState(false);
	const CheckBoxContainer = useRef();
	const tick = `<svg
				stroke='var(--list-icon-clr)'
				fill='var(--list-icon-clr)'
				stroke-width='0'
				viewBox='2 -1 8 19'
				height='1rem'
				width='1rem'
				xmlns='http://www.w3.org/2000/svg'>
				<path fill-rule='evenodd' d='M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z'></path>
			</svg>`;
   const toggleCheckbox = ()=>{
      if(!checked)
      {
         CheckBoxContainer.current.innerHTML = tick;
			setChecked(true);
      }
      else{
         CheckBoxContainer.current.innerHTML = '';
			setChecked(false);
      }
   }
	return (
		<div
			ref={CheckBoxContainer}
			className={`${styles.CheckBoxContainer} d-flex align-center justify-center pointer`}
			onClick={toggleCheckbox}></div>
	);
};

export default CheckBox;
