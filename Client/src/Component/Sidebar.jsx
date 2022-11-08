import styles from '../Styles/Sidebar.module.css';
import SidebarSection from './SidebarSection';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTitle } from '../Redux/Slice/viewSlice';

const Sidebar = () => {
	const dispatch = useDispatch();
	const { lable } = useSelector((state) => state.lable);
	const [label, setLabel] = useState([]);
	const [fetchArray, setFetchArray] = useState([]);
	
	const setFetchArrayFunc = () => {
		const tempArray = [];
		label.forEach((item) => {
			tempArray.push({
				text: item,
				link: item.toLowerCase(),
				path: `<path d='M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z'></path>`
			});
		});
		setFetchArray(tempArray);
	};

	const sectionArray = [
		{
			text: 'Notes',
			link: '/',
			path: `<path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z'></path>`
		},
		{
			text: 'Reminders',
			link: '/reminder',
			path: `<path d='M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z'></path>`
		},
		...fetchArray,
		{
			text: 'Edit labels',
			link: '/label',
			path: `<path d='M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z'></path>`
		},
		{
			text: 'Archive',
			link: '/archive',
			path: `<path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z'></path>`
		},
		{
			text: 'Bin',
			link: '/bin',
			path: `<path d='M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z'></path>
			<path d='M9 8h2v9H9zm4 0h2v9h-2z'></path>`
		}
	];

	useEffect(() => {
		if (lable.length !== 0) {
			setLabel(lable[0].lable);
		}
	}, [lable]);

	useEffect(() => {
		setFetchArrayFunc();
		// eslint-disable-next-line
	}, [label]);

	return (
		<aside id='sidebarContainer' className={`d-flex ${styles.sidebarContainer}`}>
			<nav id='section' className={`${styles.section}`}>
				<ul>
					{sectionArray.map((section, index) => {
						return (
							<li
								key={'sectionlist' + index}
								onClick={_=>dispatch(
									setTitle(section.text.charAt(0).toUpperCase() + section.text.slice(1).toLowerCase())
								)}>
								<SidebarSection
									id={'sectionid' + index}
									link={section.link}
									text={section.text}
									path={section.path}
								/>
							</li>
						);
					})}
				</ul>
			</nav>
			<a
				href='https://github.com/atulchourasiya'
				id='sign'
				className={`d-flex align-center fs-400 ff ${styles.sign}`}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 16 16'
					width='4rem'
					height='16'
					fill={'var(--text-clr)'}>
					<path
						fillRule='evenodd'
						d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
				</svg>
				<p>Atul Chourasiya</p>
			</a>
		</aside>
	);
};

export default Sidebar;
