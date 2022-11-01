import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import '../Styles/App.css';
import Setting from './Setting';
import Feedback from './Feedback';
import UnderConstruction from './UnderConstruction';
import Alert from './Alert';
function App() {
	return (
		<BrowserRouter>
				<Alert/>
				<Navbar />
				<div className='d-flex'>
					<Sidebar />
					<Main />
				</div>
				<UnderConstruction/>
				<Setting />
				<Feedback/>
		</BrowserRouter>
	);
}

export default App;
