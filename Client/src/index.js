import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Component/App';
import { Provider } from 'react-redux';
import store from './Redux/store';
import './Styles/Global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<Provider store={store}>
			<App />
		</Provider>
);
