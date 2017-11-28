module.exports = {

"web.langgame.casual.mmo.slg" : {
    "push.langgame.net": {
        path : "configs",
        signature : "signature",
        websiteName : "Safari Push Notification Demo",
        allowedDomains: [
            "http://hkgh.mobo.vn","http://push.langgame.net", "https://push.langgame.net","http://push.itracking.io","https://push.itracking.io"
        ],
        webServiceURL: "https://push-server.langgame.net",
        urlFormatString: "http://push.langgame.net/%@",
        certP12: "web_Certificates.p12",
        certPush:"apns_pfx.p12",
        certPasswd: "web" //p12 password
    },
    "hkgh.mobo.vn": {
        path : "configs",
        signature : "signature",
        websiteName : "Safari Push Notification",
        allowedDomains: [
            "http://hkgh.mobo.vn"
        ],
        webServiceURL: "https://webpush.mobo.vn",
        urlFormatString: "http://hkgh.mobo.vn/%@",
        certP12: "web_Certificates.p12",
        certPush:"apns_pfx.p12",
        certPasswd: "web" //p12 password
    },
    "vn.mecorp.xungdanhanhhung": {
        path : "configs",
        signature : "signature",
        websiteName : "Safari Push Notification Demo",
        allowedDomains: [
            "http://push.langgame.net", "https://push.langgame.net"
        ],
        webServiceURL: "https://push.langgame.net",
        urlFormatString: "http://push.langgame.net/%@",
        certP12: "web_Certificates.p12",
        certPush:"apns_pfx.p12",
        certPasswd: "web" //p12 password
    },
},

}