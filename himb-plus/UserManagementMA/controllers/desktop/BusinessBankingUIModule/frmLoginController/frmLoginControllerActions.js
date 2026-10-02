define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** postShow defined for frmLogin **/
    AS_Form_b51ba3ff4c3241e8b0d3a3053b6fdd72: function AS_Form_b51ba3ff4c3241e8b0d3a3053b6fdd72(eventobject) {
        var self = this;
        kony.application.showLoadingScreen("", "Authenticating the user");
        var authParams = {
            "UserName": "7644257870",
            "Password": "Kony@1234",
            "loginOptions": {
                "isOfflineEnabled": false
            }
        };
        authClient = KNYMobileFabric.getIdentityService("DbxUserLogin");
        authClient.login(authParams, successCallback, errorCallback);

        function successCallback(resSuccess) {
            var userPrefManager = applicationManager.getUserPreferencesManager();
            var asyncManager = applicationManager.getAsyncManager();
            asyncManager.callAsync(
                [
                    asyncManager.asyncItem(userPrefManager, 'fetchUser')
                ],
                function() {});
            kony.application.dismissLoadingScreen();
            kony.print(resSuccess);
            var userAttributes, securityAttributes;
            var params = {};
            var authClient = KNYMobileFabric.getIdentityService(applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME);
            authClient.getUserAttributes(function(response) {
                params.userAttributes = response;
                authClient.getSecurityAttributes(function(data) {
                    params.securityAttributes = data;
                    var userAttributes = params.userAttributes;
                    var securityAttributes = params.securityAttributes;
                    var configurationManager = applicationManager.getConfigurationManager();
                    configurationManager.isSMEUser = "false";
                    configurationManager.isRBUser = "false";
                    configurationManager.isMBBUser = "false";
                    configurationManager.isCombinedUser = "false";
                    if (!kony.sdk.isNullOrUndefined(userAttributes.isCombinedUser)) {
                        configurationManager.isCombinedUser = userAttributes.isCombinedUser;
                    }
                    if (!kony.sdk.isNullOrUndefined(configurationManager.customerTypeId) && configurationManager.isCombinedUser !== "true") {
                        switch (userAttributes.CustomerType_id) {
                            case "TYPE_ID_BUSINESS":
                                configurationManager.isSMEUser = "true";
                                break;
                            case "TYPE_ID_RETAIL":
                                configurationManager.isRBUser = "true";
                                break;
                        }
                    }
                    //Converted string to permission array
                    var permissions = JSON.parse(securityAttributes.permissions);
                    var features = JSON.parse(securityAttributes.features);
                    var accounts = securityAttributes.accounts;
                    applicationManager.getConfigurationManager().setUserPermissions(permissions);
                    applicationManager.getConfigurationManager().setFeatures(features);
                    applicationManager.getConfigurationManager().setUserRole(userAttributes.customerTypeId);
                    var userModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
                    applicationManager.getUserPreferencesManager().isLoggedIn = true;
                    applicationManager.getConfigurationManager().fetchApplicationProperties(function(res) {
                        userModule.presentationController.showUserManagent({
                            show: 'showAllUsers'
                        });
                    }, function() {});
                }, function(err) {
                    kony.print("Error getting User attributes");
                });
            }, function(err) {
                kony.print("Error getting User attributes");
            });
        }

        function errorCallback(resError) {
            kony.application.dismissLoadingScreen();
            kony.print(resError);
            alert("login is not working...");
        }
    }
});