/**
 * Copyright (c) 2017-present, NghiaPQ, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by NghiaPQ.
 *
 * As with any software that integrates with the NghiaPQ platform, your use of
 * this software is subject to the NghiaPQ Platform Policy
 * [http://developers.itracking.io/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
try {

    var IT = function () {
        // your sdk init function
        var pushID;
        var token = "";
        var mPermision = {
            permission: 'default',
            deviceToken: ''
        };
        var domaintool = "https://push-server.langgame.net/";
//        var domaintool = "https://webpush.mobo.vn/";

        var init = function (options) {
            // ...
            console.log(options);
            pushID = options.webId || "";

        };

        var setCookie = function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        var getCookie = function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        var randomIntFromInterval = function (min, max)
        {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        var load = function () {
            if (window.safari.pushNotification) {                
                var result = window.safari.pushNotification.permission(pushID);
                setCookie("hostname", document.location.hostname, 360);
                mPermision = result;
                if (result.permission === 'default') {
                    //request permission
                    window.safari.pushNotification.requestPermission(domaintool +  document.location.hostname, pushID, {"token": token, 'hostname': document.location.hostname}, function (c) {
                        //console.log(c);
                        mPermision = c;
                        if (c.permission === 'granted') {
                            token = c.deviceToken;
                            setCookie("token", token, 360);
                        }
                    });
                } else if (result.permission === 'granted') {
                    //token = permission.deviceToken;
                } else if (result.permission === 'denied') {
                    //
                }
            }
            return mPermision;
        }
        var test = function () {

        }

        var requestPermissions = function () {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', load, false);
                window.addEventListener('load', load, false)
            } else if (document.attachEvent) {
                document.attachEvent('onreadystatechange', load);
                window.attachEvent('onload', load)
            }
        }

        return {
            init: init,
            requestPermissions: requestPermissions,
            test: test,
            permission: load

        };
    }();


    if (window.itAsyncInit && !window.itAsyncInit.hasRun) {
        window.itAsyncInit.hasRun = true;
        window.itAsyncInit();
    }

} catch (exception) {
    console.log(exception);
}

