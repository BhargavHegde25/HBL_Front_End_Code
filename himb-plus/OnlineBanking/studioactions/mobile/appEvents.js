define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_adac6893b04a41f2ade141fc8c50bfc8: function AS_AppEvents_adac6893b04a41f2ade141fc8c50bfc8(eventobject) {
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
        _kony.mvc.initCompositeApp(true);
        if (SCAType === "UNIKEN") {
            RDNAAPI = require("RDNAAPI.js");
            RDNACallback = require("RDNACallback.js");
            RDNAUtility = require("RDNAUtility.js");
            Utility = require("Utility.js");
        }
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
        kony.application.setApplicationBehaviors({
            'rtlMirroringInWidgetPropertySetter': true
        });
        try {
            // require('objectSvcMeta.js');
            applicationManager.preappInitCalls();
            var sm = applicationManager.getStorageManager();
            var config = applicationManager.getConfigurationManager();
            config.configurations.setItem('CURRENCYCODE', 'USD');
            var langObjFromStorage = sm.getStoredItem("langObj");
            if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
                config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]);
            } else {
                config.configurations.setItem("LOCALE", "en_US");
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["en_US"]);
            }
            var theme = sm.getStoredItem("themeDetails")
            if (kony.sdk.isNullOrUndefined(theme)) theme = "default";
            kony.theme.setCurrentTheme(theme, function() {
                kony.print("Theme Change: Success")
            }, function() {
                kony.print("Theme Change: Failed")
            });
            kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {}, function() {});
            config.setStartupLocaleAndDateFormat();
        } catch (err) {
            alert(err);
        }
    },
    AS_AppEvents_d75a69bd5d6a4067b7e9432ce69aa637: function AS_AppEvents_d75a69bd5d6a4067b7e9432ce69aa637(eventobject) {
        var self = this;
        var scope = this;
        var params = eventobject;
        params = params ? params : {};
        params.launchparams = params.launchparams ? params.launchparams : {};
        params.launchmode = params.launchmode ? params.launchmode : 1;
        var data = {};
        var formname;
        if (params.launchmode == 1) {} else if (params.launchmode == 3) {
            var launchForm = params.launchparams.URL;
            //var splitURL = launchForm.split("?")[1];
            if (launchForm.includes("frmAccountActivation")) {
                applicationManager.getNavigationManager().setCustomInfo("appservice", true);
            } else if (launchForm.includes("resetTransactionPin")) {
                var userObj = applicationManager.getUserPreferencesManager();
                if (userObj.isUserLoggedin() === true) {
                    applicationManager.getNavigationManager().setCustomInfo("resetPinDeepLinkFlow", true);
                    var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "AuthenticationMA",
                        "moduleName": "AuthUIModule"
                    });
                    authMod.presentationController.onLogout();
                } else {
                    applicationManager.getNavigationManager().setCustomInfo("resetPinDeepLinkFlow", true);
                }
            }
        }
    },
    AS_AppEvents_j58ba9e21dad43ca9d4b99f2104e25bf: function AS_AppEvents_j58ba9e21dad43ca9d4b99f2104e25bf(eventobject) {
        var self = this;
        try {
            applicationManager.postAppInitiate();
            applicationManager.applicationMode = "Mobile";
            kony.application.setApplicationProperties({
                // "statusBarForegroundColor": "000000"
            });
            //   var registrationManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            //     "moduleName": "RegistrationManager",
            //     "appName": "AuthenticationMA"
            //   }).businessController;
            //   registrationManager.setEventTracking();
        } catch (err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    }
});