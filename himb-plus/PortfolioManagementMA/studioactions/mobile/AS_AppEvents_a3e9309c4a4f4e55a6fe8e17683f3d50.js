function AS_AppEvents_a3e9309c4a4f4e55a6fe8e17683f3d50(eventobject) {
    var self = this;
    try {
        var MenuHandler = applicationManager.getMenuHandler();
        return MenuHandler.appForceTouchCallBack(eventobject);
    } catch (err) {
        // throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.App_Initialisation_Failed", GlobalExceptionHandler.ActionConstants.BLOCK, arguments.callee.name);
    }
}