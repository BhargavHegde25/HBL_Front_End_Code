function AS_AppEvents_b8378835673248478bdd9315ee798f17(eventobject) {
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
}