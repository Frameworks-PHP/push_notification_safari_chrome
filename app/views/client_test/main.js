'use strict';
//document.body.onload = addcss;
//document.body.onload = addElement;

//function addcss () {
//    var head  = document.getElementsByTagName('head')[0];
//    var link  = document.createElement('link');
//    link.rel  = 'stylesheet';
//    link.href = 'http://localhost:3001/admin/OneSignalSDKStyles.css';
//    head.appendChild(link);
//    addElement();
//}
//
//function addElement () { 
//    var newDiv = document.createElement("div"); 
//    newDiv.className = 'onesignal-bell-container onesignal-reset onesignal-bell-container-bottom-left';
//    newDiv.innerHTML = '<div id="onesignal-bell-launcher" class="onesignal-bell-launcher onesignal-bell-launcher-md onesignal-bell-launcher-bottom-left onesignal-bell-launcher-theme-default onesignal-bell-launcher-active"><div class="onesignal-bell-launcher-button"><svg class="onesignal-bell-svg" xmlns="http://www.w3.org/2000/svg" width="99.7" height="99.7" viewBox="0 0 99.7 99.7" style="filter: drop-shadow(0 2px 4px rgba(34,36,38,0.35));; -webkit-filter: drop-shadow(0 2px 4px rgba(34,36,38,0.35));;"><circle class="background" cx="49.9" cy="49.9" r="49.9"></circle><path class="foreground" d="M50.1 66.2H27.7s-2-.2-2-2.1c0-1.9 1.7-2 1.7-2s6.7-3.2 6.7-5.5S33 52.7 33 43.3s6-16.6 13.2-16.6c0 0 1-2.4 3.9-2.4 2.8 0 3.8 2.4 3.8 2.4 7.2 0 13.2 7.2 13.2 16.6s-1 11-1 13.3c0 2.3 6.7 5.5 6.7 5.5s1.7.1 1.7 2c0 1.8-2.1 2.1-2.1 2.1H50.1zm-7.2 2.3h14.5s-1 6.3-7.2 6.3-7.3-6.3-7.3-6.3z"></path><ellipse class="stroke" cx="49.9" cy="49.9" rx="37.4" ry="36.9"></ellipse></svg><div class="pulse-ring"></div></div><div class="onesignal-bell-launcher-badge"></div><div class="onesignal-bell-launcher-message"><div class="onesignal-bell-launcher-message-body">Subscribe to notifications</div></div><div class="onesignal-bell-launcher-dialog onesignal-bell-launcher-dialog-opened" style="filter: drop-shadow(0px 2px 2px rgba(34,36,38,.15));; -webkit-filter: drop-shadow(0px 2px 2px rgba(34,36,38,.15));;"><div class="onesignal-bell-launcher-dialog-body"><h1>Manage Site Notifications</h1><div class="divider"></div><div class="push-notification"><div class="push-notification-icon"><img src="https://onesignal.com/images/notification_logo.png"></div><div class="push-notification-text-container"><div class="push-notification-text push-notification-text-short"></div><div class="push-notification-text"></div><div class="push-notification-text push-notification-text-medium"></div><div class="push-notification-text"></div><div class="push-notification-text push-notification-text-medium"></div></div></div><div class="action-container"><button type="button" class="action" id="subscribe-button">SUBSCRIBE</button></div></div></div></div>';
////    var xmlString = '<div id="onesignal-bell-launcher" class="onesignal-bell-launcher onesignal-bell-launcher-md onesignal-bell-launcher-bottom-left onesignal-bell-launcher-theme-default onesignal-bell-launcher-active"><div class="onesignal-bell-launcher-button"><svg class="onesignal-bell-svg" xmlns="http://www.w3.org/2000/svg" width="99.7" height="99.7" viewBox="0 0 99.7 99.7" style="filter: drop-shadow(0 2px 4px rgba(34,36,38,0.35));; -webkit-filter: drop-shadow(0 2px 4px rgba(34,36,38,0.35));;"><circle class="background" cx="49.9" cy="49.9" r="49.9"></circle><path class="foreground" d="M50.1 66.2H27.7s-2-.2-2-2.1c0-1.9 1.7-2 1.7-2s6.7-3.2 6.7-5.5S33 52.7 33 43.3s6-16.6 13.2-16.6c0 0 1-2.4 3.9-2.4 2.8 0 3.8 2.4 3.8 2.4 7.2 0 13.2 7.2 13.2 16.6s-1 11-1 13.3c0 2.3 6.7 5.5 6.7 5.5s1.7.1 1.7 2c0 1.8-2.1 2.1-2.1 2.1H50.1zm-7.2 2.3h14.5s-1 6.3-7.2 6.3-7.3-6.3-7.3-6.3z"></path><ellipse class="stroke" cx="49.9" cy="49.9" rx="37.4" ry="36.9"></ellipse></svg><div class="pulse-ring"></div></div><div class="onesignal-bell-launcher-badge"></div><div class="onesignal-bell-launcher-message"><div class="onesignal-bell-launcher-message-body">Subscribe to notifications</div></div><div class="onesignal-bell-launcher-dialog onesignal-bell-launcher-dialog-opened" style="filter: drop-shadow(0px 2px 2px rgba(34,36,38,.15));; -webkit-filter: drop-shadow(0px 2px 2px rgba(34,36,38,.15));;"><div class="onesignal-bell-launcher-dialog-body"><h1>Manage Site Notifications</h1><div class="divider"></div><div class="push-notification"><div class="push-notification-icon"><img src="https://onesignal.com/images/notification_logo.png"></div><div class="push-notification-text-container"><div class="push-notification-text push-notification-text-short"></div><div class="push-notification-text"></div><div class="push-notification-text push-notification-text-medium"></div><div class="push-notification-text"></div><div class="push-notification-text push-notification-text-medium"></div></div></div><div class="action-container"><button type="button" class="action" id="subscribe-button">SUBSCRIBE</button></div></div></div></div>'
////  , parser = new DOMParser()
////  , doc = parser.parseFromString(xmlString, "text/xml");
////    
//    var head = document.getElementsByTagName("head")[0];
////    head.appendChild(newDiv.innerHTML);
//    document.body.parentNode.insertBefore(newDiv, document.getElementsByTagName("body")[0]);
//    
//}
//
//function addElement () { 
//    var newDiv = document.createElement("div"); 
//    newDiv.className = "wrap-OneSignal-bell";
//    var e=document.getElementById("wrap-OneSignal-bell");
//    var content = e.innerHTML
//    var head = document.getElementsByTagName("head")[0];
//    head.appendChild(newDiv);
//
//}
//onesignal-bell-launcher-dialog-opened

const applicationServerPublicKey = 'BOErkMmmR8zcenGQ22voGE4ueA2fiaGQ6B-2CM1iDjqM64JGcvrQhr-9HCWP1Tk9K1Kx3Rz9prsix8x6h4aldfk';

//const pushButton = document.querySelector('#subscribe-button');

let isSubscribed = false;
let swRegistration = null;

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

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Bỏ Thông Báo';
  } else {
    pushButton.textContent = 'Nhận Thông Báo';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  // const subscriptionJson = document.querySelector('.js-subscription-json');
  // const subscriptionDetails =
  //   document.querySelector('.js-subscription-details');

    if (subscription) {
        var data = JSON.parse(JSON.stringify(subscription));
        data.site = location.host;
        fetch('http://203.162.56.180:8080/api/saveSubscription', {
            method: 'post',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }else{
        fetch('http://203.162.56.180:8080/api/unSaveSubscription', {
            method: 'post',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
  //   subscriptionJson.textContent = JSON.stringify(subscription);
  //   subscriptionDetails.classList.remove('is-invisible');
  // } else {
  //   subscriptionDetails.classList.add('is-invisible');
//  }
}

// document.getElementById('doIt').addEventListener('click', function() {
//   fetch('./sendNotification?endpoint=' + endpoint, {
//     method: 'post',
//   });
// });

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}

function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

//new function

var subscriptionButton = document.getElementById('subscribe-button');

function getSubscription() {
  return navigator.serviceWorker.ready
    .then(function(registration) {
      return registration.pushManager.getSubscription();
    });
}


    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('sw.js')
            .then(function() {
                console.log('service worker registered');
            });
        getSubscription()
            .then(function(subscription) {
                if (subscription) {
                    unsubscribe();
//                    setUnsubscribeButton();
                } else {
                    subscribe();
//                    setSubscribeButton();
                }
            });
    }
    
function subscribe() {
    navigator.serviceWorker.ready.then(function(registration) {
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        return registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: applicationServerKey });
    }).then(function(subscription) {
        var data = JSON.parse(JSON.stringify(subscription));
        data.site = location.host;
        document.getElementById('endpoint-show').innerHTML=JSON.stringify(data);
        return fetch('http://203.162.56.180:8080/api/register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
//    }).then(setUnsubscribeButton);
    });
}
    
    
function unsubscribe() {
    getSubscription().then(function(subscription) {
        return subscription.unsubscribe()
            .then(function() {
                var data = JSON.parse(JSON.stringify(subscription));
                data.site = location.host;
//                http://203.162.56.180:8080
                return fetch('http://203.162.56.180:8080/api/unregister', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
              });
          });
//    }).then(setSubscribeButton);
    });
}

function setSubscribeButton() {
    subscriptionButton.onclick = subscribe;
    subscriptionButton.textContent = 'Nhận thông báo';
}

function setUnsubscribeButton() {
    subscriptionButton.onclick = unsubscribe;
    subscriptionButton.textContent = 'Bỏ nhận thông báo';
}
    
//end new function

//    if ('serviceWorker' in navigator && 'PushManager' in window) {
//        console.log('Service Worker and Push is supported');
//
//        navigator.serviceWorker.register('sw.js')
//        .then(function(swReg) {
//
//          swRegistration = swReg;
//          initialiseUI();
//        })
//        .catch(function(error) {
//          console.error('Service Worker Error', error);
//        });
//    } else {
//        console.warn('Push messaging is not supported');
//        pushButton.textContent = 'Push Not Supported';
//    }


document.getElementById("onesignal-bell-launcher-button").addEventListener("mouseover", mouseOver);
document.getElementById("onesignal-bell-launcher-button").addEventListener("mouseout", mouseOut);

function mouseOver () {
    var isShowNotification = document.getElementById("onesignal-bell-launcher-dialog");
    var flag = hasClass(isShowNotification, 'onesignal-bell-launcher-dialog-opened');
    if(!flag){
        mouseOverNoNoti();
    }
}

function mouseOverNoNoti() {
    var smallHover = document.getElementById("onesignal-bell-launcher");
    var flag = hasClass(smallHover, 'onesignal-bell-launcher-inactive');
    if(flag){
         smallHover.classList.remove("onesignal-bell-launcher-inactive");
    }
    var flag = hasClass(smallHover, 'onesignal-bell-launcher-sm');
    if(flag){
         smallHover.classList.remove("onesignal-bell-launcher-sm");
         smallHover.className+= (" onesignal-bell-launcher-md");
    }
    
    var isShowHover = document.getElementById("onesignal-bell-launcher-message");
    var flag = hasClass(isShowHover, 'onesignal-bell-launcher-message-opened');
    if(!flag){
         isShowHover.className+= (" onesignal-bell-launcher-message-opened");
    }
}

function mouseOut () {
    
    var isShowNotification = document.getElementById("onesignal-bell-launcher-dialog");
    var flag = hasClass(isShowNotification, 'onesignal-bell-launcher-dialog-opened');
    if(!flag){
        mouseOutNoNoti();
    }
}

function mouseOutNoNoti () {
    var smallHover = document.getElementById("onesignal-bell-launcher");
    var flag = hasClass(smallHover, 'onesignal-bell-launcher-inactive');
    if(!flag){
         smallHover.className+=" onesignal-bell-launcher-inactive";
    }

    var flag = hasClass(smallHover, 'onesignal-bell-launcher-md');
    if(flag){
         smallHover.classList.remove("onesignal-bell-launcher-md");
         smallHover.className+= (" onesignal-bell-launcher-sm");
    }

    var isShowHover = document.getElementById("onesignal-bell-launcher-message");
    var flag = hasClass(isShowHover, 'onesignal-bell-launcher-message-opened');
    if(flag){
         isShowHover.className = ("onesignal-bell-launcher-message");
    }
}

function pushButtonNoti (){
    
    var isShowNotification = document.getElementById("onesignal-bell-launcher-dialog");
    var flag = hasClass(isShowNotification, 'onesignal-bell-launcher-dialog-opened');
    if(!flag){
        isShowNotification.className+= (" onesignal-bell-launcher-dialog-opened");
         
    }else{
        isShowNotification.className= ("onesignal-bell-launcher-dialog");
    }
    
    var isShowHover = document.getElementById("onesignal-bell-launcher-message");
    var flag = hasClass(isShowHover, 'onesignal-bell-launcher-message-opened');
    if(flag){
         isShowHover.className = ("onesignal-bell-launcher-message");
    }
    
}
    
function hasClass( elem, klass ) {
     return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
}






