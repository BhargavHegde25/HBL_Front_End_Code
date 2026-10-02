function AS_AppEvents_bbe03cb51d5546f494a09e289fc58e60(eventobject) {
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
}