import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import '../Styles/App.css';
import Setting from './Setting';
import Feedback from './Feedback';
import Alert from './Alert';
import EditLables from './EditLable';

function App() {
	return (
		<BrowserRouter>
				<Alert/>
				<Navbar />
				<div className='d-flex'>
					<Sidebar />
					<Main />
				</div>
				<Setting />
				<Feedback/>
				<EditLables/>
		</BrowserRouter>
	);
}

export default App;
