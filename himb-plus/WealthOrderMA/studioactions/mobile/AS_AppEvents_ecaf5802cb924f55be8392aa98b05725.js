function AS_AppEvents_ecaf5802cb924f55be8392aa98b05725(eventobject) {
    var self = this;
    try {
        var MenuHandler = applicationManager.getMenuHandler();
        return MenuHandler.appForceTouchCallBack(eventobject);
    } catch (err) {
        //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}