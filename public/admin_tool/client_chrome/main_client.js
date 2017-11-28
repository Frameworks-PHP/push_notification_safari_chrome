'use strict';
var applicationServerPublicKey = 'BOErkMmmR8zcenGQ22voGE4ueA2fiaGQ6B-2CM1iDjqM64JGcvrQhr-9HCWP1Tk9K1Kx3Rz9prsix8x6h4aldfk';
var pushButton = document.querySelector('.js-push-btn');
var isSubscribed = false;
var swRegistration = null;
var hostdomain = 'https://webpush.mobo.vn';
//var hostdomain = 'https://push-server.langgame.net';


function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUser() {
    var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
            .then(function (subscription) {
                var data = JSON.parse(JSON.stringify(subscription));
                data.site = location.host;
//                document.getElementById('endpoint-show').innerHTML = JSON.stringify(data);
                return fetch(hostdomain + '/api/register', {
                    crossOrigin: true,
                    method: 'post',
                    headers: {
                        accept: '*/*',
//                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            })
            .catch(function (err) {
                console.log('Failed to subscribe the user: ', err);
            });
}


function initialiseUI() {
    if (!isSubscribed) {
        subscribeUser();
    }
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                isSubscribed = !(subscription === null);
            });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
//    navigator.serviceWorker.register('/admin_tool/client_chrome/sw.js')
            .then(function (swReg) {
                swRegistration = swReg;
                initialiseUI();
            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
} else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}
