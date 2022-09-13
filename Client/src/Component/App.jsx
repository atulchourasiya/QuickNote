import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { BrowserRouter } from 'react-router-dom';
import '../Styles/App.css';
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Sidebar/>
		</BrowserRouter>
	);
}

export default App;
