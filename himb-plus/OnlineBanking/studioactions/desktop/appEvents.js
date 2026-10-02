define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_eb971bc1c81f4fab8d6977c7e4be391a: function AS_AppEvents_eb971bc1c81f4fab8d6977c7e4be391a(eventobject) {
        var self = this;
        var self = this;
        kony.mvc.MDAApplication.getSharedInstance().appContext.deeplinkUrl = {
            deeplinkpath: eventobject.deeplinkpath,
            formID: eventobject.formID,
        };
        var form = eventobject.formID;
        if ((form !== undefined && form.indexOf("frmAccountActivation") !== -1) || (form !== undefined && form.includes("resetTransactionPin"))) {
            if (form.indexOf("frmAccountActivation") !== -1) {
                var query = form;
            } else if (form.includes("resetTransactionPin")) {
                var query = "resetTransactionPin";
            }
            var fallbackUrlAnd = "https://play.google.com/store/apps/details?id=com.himalayanbank.himbplus";
            var fallbackUrliOS = "https://apps.apple.com/in/app/hi-mb/id1425594561";
            var packageName = "com.himalayanbank.himbplus";
            var packageNameIOS = "com.bct.tmns.mb.r2310.dev";
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
    },
    AS_AppEvents_h75216c7ed0846a290c700a6c09aa524: function AS_AppEvents_h75216c7ed0846a290c700a6c09aa524(eventobject) {
        var self = this;
        var appSecurityKey = "{APP_SECURITY_KEY}";
        if (0) {
            var client = kony.sdk.getCurrentInstance();
            var response = client.setAppSecurityKey(appSecurityKey);
            if (response !== null && response === true) {
                kony.print("Custom security key is set successfully");
            } else {
                kony.print(response.errmsg + " and " + response.errcode);
            }
        }
        kony.print("Testing JS Load");
        document.body.removeAttribute("aria-live");
        document.body.removeAttribute("aria-relevant");
        document.body.removeAttribute("aria-atomic");
        _kony.mvc.initCompositeApp(true);
        var isIOS13 = (/(iPad|iPhone);.*CPU.*OS 13_\d/i).test(navigator.userAgent);
        if (isIOS13) {
            kony.application.setApplicationBehaviors({
                disableForceRepaint: true
            });
        }
        kony.application.setApplicationBehaviors({
            'rtlMirroringInWidgetPropertySetter': true,
            'fullWidgetHierarchy': true
        });
        var moduleName = 'ApplicationManager';
        require([moduleName, ], function(ApplicationManager) { 
            applicationManager = ApplicationManager.getApplicationManager();
            applicationManager.defineSCAConfig(); 
            var config = applicationManager.getConfigurationManager(); 
            if (performance.navigation.type === 1) {   
                config.setBrowserRefreshProperty("true"); 
            } 
            var sm = applicationManager.getStorageManager(); 
            var langObjFromStorage = sm.getStoredItem("langObj"); 
            if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {   
                config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);   
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]); 
            } else {   
                config.configurations.setItem("LOCALE", "en_US");   
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["en_US"]);
            }
            kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
            applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
                if (config.isAppPropertiesLoaded === "false") {
                    config.setAppProperties("true");
                    kony.application.dismissLoadingScreen();
                }
                // config.fetchClientSideConfigurations();
            }, function() {
                kony.application.dismissLoadingScreen();
            });
            document.body.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                alert(kony.i18n.getLocalizedString("i18n.general.rightclickdisabled"));
            });
        });
    }
});