'use strict';
//asdfasdf
/* eslint-disable max-len */

const applicationServerPublicKey = 'BOErkMmmR8zcenGQ22voGE4ueA2fiaGQ6B-2CM1iDjqM64JGcvrQhr-9HCWP1Tk9K1Kx3Rz9prsix8x6h4aldfk';

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

var url = [];
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  const notificationOptions = event.data ? JSON.parse(event.data.text()) : {
        title: 'ME IT',
        body: 'MECORP : Author : Phunld',
        icon: 'https://www.mecorp.vn/assets/templates/mecorp/master/nzMgQR/images/logo.png',
        url: 'https://mecorp.vn/'
      };

//  const options = {
//    body: payload.body,
//    icon: payload.icon,
//
//    tag: payload.url + payload.body + payload.icon + payload.title,
//  };

    url.push(payload.url);  
    event.waitUntil(self.registration.showNotification(notificationOptions.title, notificationOptions));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );
});
