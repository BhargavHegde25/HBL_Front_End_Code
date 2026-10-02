function AS_AppEvents_f04fdbc5440e4141a1d5cda882f82ab1(eventobject) {
    var self = this;
    try {
        var MenuHandler = applicationManager.getMenuHandler();
        return MenuHandler.appForceTouchCallBack(eventobject);
    } catch (err) {
        //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}