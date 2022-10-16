import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import '../Styles/App.css';
import Setting from './Setting';
import Feedback from './Feedback';
function App() {
	return (
		<BrowserRouter>
				<Navbar />
				<div className='d-flex'>
					<Sidebar />
					<Main />
				</div>
				<Setting />
				<Feedback/>
		</BrowserRouter>
	);
}

export default App;
