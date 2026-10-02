function AS_AppEvents_d19ed209918c4802a14f4bc89c285707(eventobject) {
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
}