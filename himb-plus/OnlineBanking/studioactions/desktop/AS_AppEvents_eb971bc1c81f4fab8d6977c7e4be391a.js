function AS_AppEvents_eb971bc1c81f4fab8d6977c7e4be391a(eventobject) {
    var self = this;
    var self = this;
    kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
        deeplinkpath: eventobject.deeplinkpath,
        formID: eventobject.formID,
    };
    var form = eventobject.formID;
    if ((form !== undefined && form.indexOf("frmAccountActivation") !== -1) || (form !== undefined && form.includes("resetTransactionPin")) || (form !== undefined && form.includes("frmResetPassword"))) {
        if (form.indexOf("frmAccountActivation") !== -1) {
            var query = form;
        } else if (form.includes("resetTransactionPin")) {
            var query = "resetTransactionPin";
        } else if (form.indexOf("frmResetPassword") !== -1) {
            var query = form;
        }
        var fallbackUrlAnd = "https://play.google.com/store/apps/details?id=com.himalayanbank.himbplus";
        var fallbackUrliOS = "https://apps.apple.com/in/app/hi-mb/id1425594561";
        var packageName = "com.himalayanbank.himbplus";
        var packageNameIOS = "com.himalayanbank.himbplus";
        var userAgent = kony.os.deviceInfo().userAgent;
        userAgent = userAgent.toLowerCase();
        kony.print("userAgent :" + userAgent);
        var urlToLoad;
        if (userAgent.includes("android") || userAgent.includes("iphone") || userAgent.includes("ipad")) {
            if (userAgent.includes("android")) {
                urlToLoad = "intent://?" + query + "#Intent;scheme=" + packageName + ";package=" + packageName + ";S.browser_fallback_url=?" + fallbackUrlAnd + ";end";;
            } else {
                urlToLoad = packageNameIOS + "://=" + query;
            }
            kony.print("urlToLoad : " + urlToLoad);
            kony.application.openURLAsync({
                url: urlToLoad,
                callback: callbackFunction
            });
        } else {
            kony.store.setItem("DeeplinkReset", "true", true);
        }

        function callbackFunction(response) {
            if (response != constants.OPEN_URL_SUCCESS) {
                redirectToFallback();
            }
        }

        function redirectToFallback() {
            kony.print("redirectToFallback");
            kony.application.openURLAsync({
                url: userAgent.includes("android") ? fallbackUrlAnd : fallbackUrliOS,
                isSameWindow: true
            });
        }
    } else {
        if (eventobject.formID != undefined) {
            var formID = eventobject.formID.split('?');
            if (formID[1] != undefined && formID[1] == 'data=thirdpartyauth') {
                if (formID[0] !== undefined && formID[0] == "frmActivateThirdParties") {
                    return "frmActivateThirdParties";
                }
            }
            if (formID[1] != undefined && formID[1] == 'data=resetTransactionPin') {
                kony.store.setItem("DeeplinkReset", "true", true);
            }
            if (formID[1] != undefined && formID[1] == 'qp=UNLOCK_ACCOUNT') {
                kony.store.setItem("DeeplinkUnlock", "true", true);
            }
        }
    }
}