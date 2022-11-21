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

navigator.serviceWorker
	.register('/service-worker.js')
	.then((registration) => {
		registration.onupdatefound = () => {
			const newWorker = registration.installing;

			newWorker.onstatechange = function () {
				if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
					if(window.confirm('New Version Available!Try Reload')){
						window.location.reload(true);
					}
				}
			};
		};
		registration.update();
	})
	.catch((error) => console.error('Service worker not registered'));
