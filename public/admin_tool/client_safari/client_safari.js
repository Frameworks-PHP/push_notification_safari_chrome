window.itAsyncInit = function () {
    IT.init({
        webId: 'web.langgame.casual.mmo.slg',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v1.0'
    });
    IT.requestPermissions();
};

(function (d, s, id) {
//    var domainserver = 'push-server.langgame.net';
    var domainserver = 'webpush.mobo.vn';
    var js, ijs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    if(isSafari){
        js.src = "//"+domainserver+"/en_US/push-sdk.js";
    }else{
        js.src = "//"+domainserver+"/admin_tool/client_chrome/main_client.js";
    }
    
    //console.log(js);
    ijs.parentNode.insertBefore(js, ijs);
}(document, 'script', 'it-jssdk'));
