define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_a3e9309c4a4f4e55a6fe8e17683f3d50: function AS_AppEvents_a3e9309c4a4f4e55a6fe8e17683f3d50(eventobject) {
        var self = this;
        try {
            var MenuHandler = applicationManager.getMenuHandler();
            return MenuHandler.appForceTouchCallBack(eventobject);
        } catch (err) {
            // throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    },
    AS_AppEvents_d19ed209918c4802a14f4bc89c285707: function AS_AppEvents_d19ed209918c4802a14f4bc89c285707(eventobject) {
        var self = this;
        //kony.lang.setUncaughtExceptionHandler(GlobalExceptionHandler.exceptionHandler);
        try {
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            //applicationManager.init();
            //applicationManager.preappInitCalls();
            //registerWatchCallback();
            if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
                config.configurations.setItem("LOCALE", config.locale[langObjFromStorage.language]);
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat[config.getLocale()]);
            } else {
                config.configurations.setItem("LOCALE", "en_US");
                config.configurations.setItem('DATEFORMAT', config.frontendDateFormat["en_US"]);
            }
        } catch (err) {
            //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    },
    AS_AppEvents_g2b47ffff8054003a38ec5ff82c49380: function AS_AppEvents_g2b47ffff8054003a38ec5ff82c49380(eventobject) {
        var self = this;
        //var appManager = ApplicationManager.getApplicationManager();
        try {
            applicationManager.postAppInitiate();
            applicationManager.applicationMode = "Mobile";
            kony.application.setApplicationProperties({
                // "statusBarForegroundColor": "000000"
            });
            var registrationManager = applicationManager.getRegistrationManager();
            registrationManager.setEventTracking();
        } catch (err) {
            // throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    }
});