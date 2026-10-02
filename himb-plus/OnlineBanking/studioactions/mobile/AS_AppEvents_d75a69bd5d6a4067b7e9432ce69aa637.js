function AS_AppEvents_d75a69bd5d6a4067b7e9432ce69aa637(eventobject) {
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
}