'use strict';
var applicationServerPublicKey = 'BOErkMmmR8zcenGQ22voGE4ueA2fiaGQ6B-2CM1iDjqM64JGcvrQhr-9HCWP1Tk9K1Kx3Rz9prsix8x6h4aldfk';
var pushButton = document.querySelector('.js-push-btn');
var isSubscribed = false;
var swRegistration = null;
//var hostdomain = 'https://webpush.mobo.vn';
var hostdomain = 'https://push-server.langgame.net';


function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length;
        ++i
    ) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


function getSubscription() {
    return navigator.serviceWorker.ready
        .then(function(registration) {
            return registration.pushManager.getSubscription();
        });
}


if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log(Notification.permission);
    Notification.requestPermission(function(permission) {});
    navigator.serviceWorker.register('/admin_tool/client_chrome/sw.js')
//    navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
            registration.update();
            console.log('service worker registered');
        });
    getSubscription()
        .then(function(subscription) {
            if (subscription) {
                console.log("unsubscription");
            } else {
                console.log("subscription");
                subscribe();
            }
        });
}

function subscribe() {
    if (Notification.permission !== 'denied' || Notification.permission === "default") {
        
        Notification.requestPermission(function() {

            navigator.serviceWorker.ready.then(function(registration) {
                var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                });
            }).then(function(subscription) {
                var data = JSON.parse(JSON.stringify(subscription));
                data.site = location.host;
                document.getElementById('endpoint-show').innerHTML = JSON.stringify(data);
                return fetch(hostdomain + '/api/register', {
                    crossOrigin: true,
                    method: 'post',
                    headers: {
                        accept: '*/*',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            });
        });
    }

}

function unsubscribe() {
    getSubscription().then(function(subscription) {
        return subscription.unsubscribe()
            .then(function() {
                var data = JSON.parse(JSON.stringify(subscription));
                data.site = location.host;
                return fetch(hostdomain + '/api/unregister', {
                    crossOrigin: true,
                    method: 'post',
                    headers: {
                        accept: '*/*',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            });
    });
}