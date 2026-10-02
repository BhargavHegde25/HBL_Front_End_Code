define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnLogin **/
    AS_Button_a9e9d668e3a04579a6c5a0d1e47378bf: function AS_Button_a9e9d668e3a04579a6c5a0d1e47378bf(eventobject) {
        var self = this;
        kony.application.showLoadingScreen("", "Authenticating the user");
        var authParams = {
            "UserName": "testeu01",
            "Password": "Kony@1234",
            "loginOptions": {
                "isOfflineEnabled": false
            }
        };
        var ApplicationManager = require('ApplicationManager');
        applicationManager = ApplicationManager.getApplicationManager();
        try {
            authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
            authClient.login(authParams, successCallback, errorCallback);
        } catch (e) {
            kony.print("error" + e);
        }

        function successCallback(resSuccess) {
            kony.application.dismissLoadingScreen();
            kony.print(resSuccess);
            var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
            var permissions = JSON.parse(tokenParams.permissions);
            var features = JSON.parse(tokenParams.features);
            var accounts = tokenParams.accounts;
            applicationManager.getConfigurationManager().setUserPermissions(permissions);
            applicationManager.getConfigurationManager().setFeatures(features);
            var userPreferences = applicationManager.getUserPreferencesManager();
            userPreferences.fetchUser();
            var ntf = new kony.mvc.Navigation("frmProfile");
            ntf.navigate();
        }

        function errorCallback(resError) {
            kony.application.dismissLoadingScreen();
            alert("failed");
            kony.print(resError);
            alert("login is not working..." + JSON.stringify(resError))
        }
    }
});