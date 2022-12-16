import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import { HashRouter } from 'react-router-dom';
import '../Styles/App.css';
import Setting from './Setting';
import Feedback from './Feedback';
import Alert from './Alert';
import EditLables from './EditLable';
import Edit from './Edit';
import Welcome from './Welcome';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { useEffect } from 'react';
function App() {
	let { login } = useSelector((state) => state.view);
	let { intialLoading } = useSelector((state) => state.loading);
	useEffect(() => {
		window.open('https://quicknote.onrender.com' , '_self');
	},[]);
	return (
		<HashRouter>
			{login ? (
				<Welcome />
			) : (
				<div>
					<Alert />
					<Navbar />
					<div className='d-flex'>
						<Sidebar />
						<Main />
					</div>
					{intialLoading && <Loader />}
					<Edit />
					<Setting />
					<Feedback />
					<EditLables />
				</div>
			)}
		</HashRouter>
	);
}

export default App;
