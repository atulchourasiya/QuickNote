/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import * as navigationPreload from 'workbox-navigation-preload';
import { NetworkOnly } from 'workbox-strategies';
import { registerRoute, NavigationRoute } from 'workbox-routing';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
navigationPreload.enable()

const navigationRoute = new NavigationRoute(
	new NetworkOnly({
		cacheName: 'navigations'
	})
);
self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
registerRoute(navigationRoute);
