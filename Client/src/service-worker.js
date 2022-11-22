/* eslint-disable no-restricted-globals */ 
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install',()=>{
  	self.skipWaiting();
})

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
