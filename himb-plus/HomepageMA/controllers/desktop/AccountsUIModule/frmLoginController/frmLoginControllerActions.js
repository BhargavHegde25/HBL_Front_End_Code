define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLogin **/
    AS_Button_c3e9a587f8634b41a933956bad8e5a6b: function AS_Button_c3e9a587f8634b41a933956bad8e5a6b(eventobject) {
        var self = this;
        kony.application.showLoadingScreen("", "Authenticating the user");
        var authParams = {
            "UserName": this.view.txtUserName.text,
            "Password": this.view.txtPassword.text,
            "loginOptions": {
                "isOfflineEnabled": false
            }
        };
        authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
        authClient.login(authParams, onLoginSuccess, errorCallback);

        function successCallback(resSuccess) {
            kony.application.dismissLoadingScreen();
            kony.print(resSuccess);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule").presentationController.showAccountsDashboard();
        }

        function onLoginSuccess(response) {
            let self = this;
            let params = kony.sdk.getCurrentInstance().tokens['DbxUserLogin'].provider_token.params;
            if (params && params.is_mfa_enabled) {
                //self.MFANavigation(params.mfa_meta);
            } else {
                response = {
                    "username": self.username,
                    "rememberMe": kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus
                };
                //self.onSuccessCallback(response);
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule").presentationController.onLoginSuccess(response);
            }
        }

        function errorCallback(resError) {
            kony.application.dismissLoadingScreen();
            kony.print(resError);
            alert("login is not working...");
        }
    }
});