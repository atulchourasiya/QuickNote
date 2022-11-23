/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { NetworkOnly } from 'workbox-strategies';
import { registerRoute, NavigationRoute } from 'workbox-routing';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  })());
});

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
