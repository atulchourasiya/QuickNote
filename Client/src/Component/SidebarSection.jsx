import { useEffect } from 'react';
import styles from '../Styles/Sidebar.module.css';
import { NavLink } from 'react-router-dom';
const SidebarSection = (props) => {
	const parsePath = () => {
		const svg = document.getElementById(`${props.id}`);
		svg.innerHTML = props.path;
	};
	useEffect(() => {
		parsePath();
	});
	return (
		<>
			{props.link !== '/label' ? (
				<NavLink
					to={props.link}
					className={`d-flex pointer ${styles.sidebarSection}`}>
					<div className={`svg-container  ${styles.sidebarSectionContainer}`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							id={props.id}
							className='icon-size'
							fill='var(--icon-clr)'
							viewBox='0
					0 24 24'></svg>
					</div>
					<div className={`svg-container ${styles.sidebarText} sidebarText`}>
						<p className='fs-400 ff'>{props.text}</p>
					</div>
				</NavLink>
			) : (
				<div
					onClick={() => {
						document.getElementById('editlableContainer')?.classList.remove('d-none');
					}}
					data-lable='true'
					className={`d-flex pointer ${styles.sidebarSection}`}>
					<div className={`svg-container  ${styles.sidebarSectionContainer}`}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							id={props.id}
							className='icon-size'
							fill='var(--icon-clr)'
							viewBox='0
					0 24 24'></svg>
					</div>
					<div className={`svg-container ${styles.sidebarText} sidebarText`}>
						<p className='fs-400 ff'>{props.text}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default SidebarSection;
