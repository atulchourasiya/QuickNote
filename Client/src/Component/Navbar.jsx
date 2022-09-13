import React, { useEffect, useRef, useState } from 'react';
import logo from '../Assets/Image/logo.png';
import userDemo from '../Assets/Image/user.png';
import Spinner from './Spinner';
import styles from '../Styles/Navbar.module.css';
import { setTheme } from '../Redux/Slice/themeSlice.js';
import { getUser } from '../Redux/Slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../Redux/Slice/viewSlice';
import { setLoading } from '../Redux/Slice/loadingSlice';

const Navbar = () => {
	const inputFiled = useRef();
	const dropdownMenu = useRef();
	const accountMenu = useRef();
	const inputCancleIcon = useRef();
	const searchSection = useRef();
	const searchIcon = useRef();
	const arrowIcon = useRef();
	const driveLogo = useRef();
	const logoContainer = useRef();
	const searchBoxContainer = useRef();
	const accountContainer = useRef();
	const menuContainer = useRef();

	const [size, setSize] = useState(getComputedStyle(document.body).fontSize);
	let deviceType = null;

	const dispatch = useDispatch();
	let { listView } = useSelector((state) => state.view);
	let { loading } = useSelector((state) => state.loading);
	let { user } = useSelector((state) => state.user);
	let { theme } = useSelector((state) => state.theme);

	const handleSearch = () => {
		logoContainer.current.style.display = 'none';
		searchBoxContainer.current.style.display = 'flex';
		searchIcon.current.style.display = 'none';
		searchSection.current.classList.add(styles.searchContainerOnClick);
		inputFiled.current.focus();
	};

	const handleInput = () => {
		if (inputFiled.current.value !== '') {
			dispatch(setLoading(true));
			inputCancleIcon.current.classList.remove('d-none');
		} else {
			inputCancleIcon.current.classList.add('d-none');
			dispatch(setLoading(false));
		}
	};

	const handleSearchFocus = () => {
		inputFiled.current.focus();
	};

	const handleExitSearch = () => {
		logoContainer.current.style.display = 'flex';
		searchBoxContainer.current.style.display = 'none';
		searchIcon.current.style.display = 'flex';
		searchSection.current.classList.remove(styles.searchContainerOnClick);
		dispatch(setLoading(false));
	};

	const handleCancle = () => {
		inputFiled.current.value = '';
		inputFiled.current.focus();
		inputCancleIcon.current.classList.add('d-none');
		dispatch(setLoading(false));
	};

	const handleToggleTheme = () => {
		if (theme === 'dark') dispatch(setTheme('light'));
		else dispatch(setTheme('dark'));
	};

	const handleSpinnerSize = () => {
		setSize(getComputedStyle(document.body).fontSize);
	};

	const handleDriveIcon = async () => {
		driveLogo.current?.classList.remove('d-none');
		arrowIcon.current?.classList.add('d-none');
		await new Promise((resolve) =>
			setTimeout(() => {
				driveLogo.current?.classList.add('d-none');
				arrowIcon.current?.classList.remove('d-none');
				resolve();
			}, 1000)
		);
	};

	const handleMediaWidth = () => {
		let media768 = window.matchMedia('(min-width: 768px)');
		if (media768.matches && deviceType !== 'laptop') {
			deviceType = 'laptop';
			logoContainer.current.style.display = 'flex';
			searchBoxContainer.current.style.display = 'flex';
			searchIcon.current.style.display = 'none';
			searchSection.current.classList.remove(styles.searchContainerOnClick);
		} else if (!media768.matches && deviceType !== 'tablet') {
			deviceType = 'tablet';
			logoContainer.current.style.display = 'flex';
			searchBoxContainer.current.style.display = 'none';
			searchIcon.current.style.display = 'flex';
			searchSection.current.classList.remove(styles.searchContainerOnClick);
		}
	};

	const removeHover = () => {
		const svgContainer = document.getElementsByClassName('svg-container');
		Array.from(svgContainer).forEach((element) => {
			if(!element.classList.contains('active'))
			element.style.setProperty('--hover-size', '0');
		});
	};

	const handleHover = (element) => {
		const isCoarse = matchMedia('(pointer:coarse)').matches;
		removeHover();
		if (element && isCoarse) {
			if (element.classList.contains('small-icon-hover')) {
				element.style.setProperty('--hover-size', 'var(--size-700)');
			} else {
				element.style.setProperty('--hover-size', 'var(--size-800)');
			}
			if (!element.classList.contains('active')) {
				setTimeout(() => {
					element.style.setProperty('--hover-size', '0');
				}, 200);
			}
		}
	};

	const handleDropdownHover = (event) => {
		const isDropdownButton = event.target.hasAttribute('data-dropdown');
		const dropdownContainer = document.getElementsByClassName('dropdownContainer')[0];
		if (isDropdownButton) {
			dropdownMenu.current.classList.toggle(`${styles.dropdownShow}`);
			dropdownContainer.classList.toggle('active');
		} else if (!event.target.closest('.dropdownContainer')) {
			dropdownMenu.current.classList.remove(`${styles.dropdownShow}`);
			dropdownContainer.classList.remove('active');
		}
	};
	
	const handleMenuHover = (event) => {
		const isMenuButton = event.target.hasAttribute('data-menu');
		const sign = document.getElementById('sign');
		const section = document.getElementById('section');
		if (isMenuButton && window.getComputedStyle(sign, null).getPropertyValue('width') === '0px') {
			section.classList.add('sidebarOpen');
			menuContainer.current.classList.add('active');
		} else if (!event.target.closest('#sidebarContainer')) {
			section.classList.remove('sidebarOpen');
			menuContainer.current.classList.remove('active');
		}
	};

	const handleAccountHover = (event) => {
		const isAccountButton = event.target.hasAttribute('data-account');
		if (isAccountButton) {
			accountMenu.current.classList.toggle(`${styles.accountShow}`);
			accountContainer.current.classList.toggle('active');
		} else {
			accountMenu.current.classList.remove(`${styles.accountShow}`);
			accountContainer.current.classList.remove('active');
		}
	};

	const handleExitSearchHover = (event) => {
		if (
			searchBoxContainer.current &&
			!searchIcon.current.contains(event.target) &&
			!searchBoxContainer.current.contains(event.target)
		) {
			let media = window.matchMedia('(max-width: 767.98px)');
			if (media.matches) {
				handleExitSearch();
			}
		}
	};

	const checkIfClickedOutside = (event) => {
		handleExitSearchHover(event);
		handleDropdownHover(event);
		handleAccountHover(event);
		handleMenuHover(event);
		handleHover(event.target.closest('.svg-container'));
	};

	useEffect(() => {
		handleMediaWidth();
		dispatch(setTheme('dark'));
		dispatch(getUser());
		window.addEventListener('resize', handleSpinnerSize);
		window.addEventListener('resize', handleMediaWidth);
		document.addEventListener('click', checkIfClickedOutside);
		return () => {
			window.removeEventListener('resize', handleSpinnerSize);
			window.removeEventListener('resize', handleMediaWidth);
			document.removeEventListener('click', checkIfClickedOutside);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!loading) {
			handleDriveIcon();
		} else {
			driveLogo.current?.classList.add('d-none');
			arrowIcon.current?.classList.add('d-none');
		}
	}, [loading]);

	return (
		<header>
			<div className={`d-flex ${styles.headerContainer} `}>
				<div ref={logoContainer} className={`${styles.logoContainer} d-flex align-center`}>
					<div data-menu ref={menuContainer} className='svg-container'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='icon-size'
							fill='var(--icon-clr)'
							data-menu
							viewBox='0 0 24 24'>
							<path
								data-menu
								d='M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z'></path>
						</svg>
					</div>
					<img src={logo} alt='logo' className={styles.logoImg} />
					<h1 className='ff fs-500 w-max pointer spacing fw-regular'>Quick Note</h1>
				</div>
				<div ref={searchSection} className={`${styles.searchContainer} d-flex`}>
					<div ref={searchBoxContainer} className={`${styles.searchBox}`}>
						<input
							className={styles.searchInput}
							type='text'
							placeholder='Search'
							onChange={handleInput}
							ref={inputFiled}
						/>
						<div
							className='svg-container small-icon-hover'
							id={styles.inputSearchIcon}
							onClick={handleSearchFocus}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='var(--list-icon-clr)'
								className='icon-size'
								viewBox='0 0 16 16'>
								<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
							</svg>
						</div>
						<div
							className='svg-container small-icon-hover'
							id={styles.inputExitIcon}
							onClick={handleExitSearch}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='var(--list-icon-clr)'
								className='icon-size '
								viewBox='0 0 16 16'>
								<path
									fillRule='evenodd'
									d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
								/>
								<path
									fillRule='evenodd'
									d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
								/>
							</svg>
						</div>
						<div
							ref={inputCancleIcon}
							className='svg-container small-icon-hover d-none'
							onClick={handleCancle}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='var(--list-icon-clr)'
								className='icon-size'
								viewBox='0 0 16 16'>
								<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
								<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
							</svg>
						</div>
					</div>
					<ul className='d-flex'>
						<li
							ref={searchIcon}
							id={styles.searchIcon}
							className='svg-container'
							onClick={handleSearch}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='var(--list-icon-clr)'
								className='icon-size'
								viewBox='0 0 16 16'>
								<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
							</svg>
						</li>
						<li
							id={styles.loading}
							className='svg-container'
							onClick={() => {
								window.location.reload();
							}}>
							{loading ? (
								<div className='icon-size'>
									<Spinner size={size} />
								</div>
							) : (
								<svg
									stroke='var(--list-icon-clr)'
									fill='none'
									className='icon-size-arrow d-none'
									ref={arrowIcon}
									strokeWidth='1.6'
									viewBox='0 0 24 24'
									strokeLinecap='round'
									strokeLinejoin='round'
									xmlns='http://www.w3.org/2000/svg'>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<path d='M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5'></path>
									<line x1='5.63' y1='7.16' x2='5.63' y2='7.17'></line>
									<line x1='4.06' y1='11' x2='4.06' y2='11.01'></line>
									<line x1='4.63' y1='15.1' x2='4.63' y2='15.11'></line>
									<line x1='7.16' y1='18.37' x2='7.16' y2='18.38'></line>
									<line x1='11' y1='19.94' x2='11' y2='19.95'></line>
								</svg>
							)}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='var(--list-icon-clr)'
								className='icon-size d-none'
								ref={driveLogo}
								viewBox='0 0 16 16'>
								<path
									fillRule='evenodd'
									d='M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z'
								/>
								<path d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z' />
							</svg>
						</li>
						<li
							id={styles.viewIcon}
							className='svg-container'
							onClick={() => {
								dispatch(setView(!listView));
							}}>
							{listView ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='var(--list-icon-clr)'
									className='icon-size'
									viewBox='0 0 16 16'>
									<path d='M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z' />
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='var(--list-icon-clr)'
									className='icon-size'
									viewBox='0 0 16 16'>
									<path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z' />
								</svg>
							)}
						</li>
						<li className='svg-container dropdownContainer' data-dropdown>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='var(--list-icon-clr)'
								className='icon-size'
								data-dropdown
								viewBox='0 0 16 16'>
								<path
									data-dropdown
									d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z'
								/>
								<path
									data-dropdown
									d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z'
								/>
							</svg>
							<ul ref={dropdownMenu} className={`${styles.dropdownMenu} ff pointer fs-400 w-max`}>
								<li>Settings</li>
								<li onClick={handleToggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'} Theme</li>
								<li>Send Feedback</li>
								<li>About Developer</li>
								<li>
									<a href='http://localhost:5000/auth/logout'>Logout</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div ref={accountContainer} className='svg-container small-icon-hover' data-account>
					<img
						src={user ? user.imageLink : userDemo}
						alt='profile'
						className={`${styles.profileImg}`}
						data-account
						referrerPolicy='no-referrer'
					/>
					<div
						ref={accountMenu}
						className={`${styles.dropdownMenu} ${styles.account} d-flex fs-400 w-max`}>
						<p>{user?.name ?? 'Atul Chourasiya'}</p>
						<p>{user?.email ?? 'Example@gmail.com'}</p>
					</div>
				</div>
			</div>
			<hr />
		</header>
	);
};

export default Navbar;
