define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_AppEvents_b8378835673248478bdd9315ee798f17: function AS_AppEvents_b8378835673248478bdd9315ee798f17(eventobject) {
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
            //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    },
    AS_AppEvents_bbe03cb51d5546f494a09e289fc58e60: function AS_AppEvents_bbe03cb51d5546f494a09e289fc58e60(eventobject) {
        var self = this;
        //kony.lang.setUncaughtExceptionHandler();
        try {
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            //applicationManager.init();
            //   applicationManager.preappInitCalls();
            //   registerWatchCallback();
        } catch (err) {
            //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    },
    AS_AppEvents_f04fdbc5440e4141a1d5cda882f82ab1: function AS_AppEvents_f04fdbc5440e4141a1d5cda882f82ab1(eventobject) {
        var self = this;
        try {
            var MenuHandler = applicationManager.getMenuHandler();
            return MenuHandler.appForceTouchCallBack(eventobject);
        } catch (err) {
            //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
        }
    }
});