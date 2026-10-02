function AS_AppEvents_d27a1c8f991945f08d6db042ca619c97(eventobject) {
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