define(["CommonUtilities","OLBConstants"],function(CommonUtilities,OLBConstants){
    return {
		count : 0,
        userAttributesSuccessCallback: function (res) {
            kony.print("PERF|UA_OK|" + Date.now()); // PERF-TEMP
            scope_AuthPresenter.lastDashboardNavigationTime = null;
            if (res !== (undefined || null)) {
                var authParams = res.UserName;
                var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("UserAttributesData", res);
                navManager.setCustomInfo("authCred", authParams);
				if(kony.sdk.isNullOrUndefined(res.Pin)){
				navManager.setCustomInfo("showPopup", true);
				navManager.setCustomInfo("transactionPinSetOrNot","false");	
				kony.store.setItem("transactionPinSetOrNot","false");				
				}else{
				navManager.setCustomInfo("showPopup", false);
				navManager.setCustomInfo("transactionPinSetOrNot","true");
				kony.store.setItem("transactionPinSetOrNot","true");	
				}
            }
            scope_AuthPresenter.isMFARequired = false;
            // PERF (phase 2): in the parallel wave a device-registration callback may already have set the flag;
            // today that callback always runs after this one and wins, so do not overwrite its value.
            var parallelWave = scope_AuthPresenter.parallelWave;
            var keepDeviceFlag = !!parallelWave && (scope_AuthPresenter.deviceFlagSetCount || 0) !== parallelWave.deviceFlagSetCount;
            if (res.isDeviceRegistered == "true") {
                if (!keepDeviceFlag) { scope_AuthPresenter.setDeviceRegisterflag(true); }
                scope_AuthPresenter.rememberdeviceregflag = true;
            } else {
                if (!keepDeviceFlag) { scope_AuthPresenter.setDeviceRegisterflag(false); }
                scope_AuthPresenter.rememberdeviceregflag = false;
            }
            if (res.backendIdentifiers) {
                let jsonRes = JSON.parse(res.backendIdentifiers);
                if (jsonRes.T24 && jsonRes.T24[0]) {
                    applicationManager.getUserPreferencesManager().setBackendIdentifier(jsonRes.T24[0].BackendId);
                } else if (jsonRes.CORE && jsonRes.CORE[0]) {
                    applicationManager.getUserPreferencesManager().setBackendIdentifier(jsonRes.CORE[0].BackendId);
                }
            }
            applicationManager.getUserPreferencesManager().saveDefaultLegalEntity(res.defaultLegalEntity ? res.defaultLegalEntity : "");
            applicationManager.getUserPreferencesManager().saveCurrentLegalEntity(res.defaultLegalEntity ? res.defaultLegalEntity : (res.homeLegalEntity ? res.homeLegalEntity : ""));
            let singleEntityValue = "true";
            if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
                singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
            }
            if (singleEntityValue === "false") {
                let asyncManager = applicationManager.getAsyncManager();
                asyncManager.callAsync([
                    asyncManager.asyncItem(applicationManager.getMultiEntityManager(), 'getUserLegalEntities')
                ], scope_AuthPresenter.onCompletionOfGetUserLegalEntities.bind(this));
            } else if (parallelWave) {
                // Post-login calls were already started by startParallelPostLoginWave; open the gate.
                parallelWave.attributesReady = true;
                kony.print("PERF|WAVE_ATTRIBUTES_READY|" + Date.now()); // PERF-TEMP
                if (parallelWave.pendingSuccess === true) {
                    parallelWave.pendingSuccess = false;
                    scope_AuthPresenter.postLoginServicesSuccess();
                }
            } else {
                scope_AuthPresenter.prefetchDashboardAccounts();
                scope_AuthPresenter.postLoginServices();
            }
        },
        /**
         * PERF (phase 2, LOGIN_PARALLEL_WAVE, default off): starts the post-login calls (and the Dashboard
         * accounts prefetch) straight after DbxUserLogin, in parallel with getUserAttributes, instead of after it.
         * Only for single-entity users whose login response carries backendIdentifiers. The backend identifier
         * and legal entities are taken from the login response (the same values getUserAttributes returns); the
         * device-registration flag, PIN status and UserAttributesData still come from getUserAttributes, and the
         * Dashboard / T&C navigation waits for it (gate in postLoginServicesSuccess).
         * Returns true when it has started the login; false when it has started nothing.
         */
        startParallelPostLoginWave: function () {
            var userAttributes;
            try {
                scope_AuthPresenter.parallelWave = null;
                if (CommonUtilities.getBooleanConfig("LOGIN_PARALLEL_WAVE", false) !== true) {
                    return false;
                }
                var configManager = applicationManager.getConfigurationManager();
                var singleEntityValue = "true";
                if (configManager.configurations.getItem("isSingleEntity") !== undefined) {
                    singleEntityValue = configManager.configurations.getItem("isSingleEntity");
                }
                if (singleEntityValue === "false") {
                    return false;
                }
                userAttributes = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
                if (!userAttributes || !userAttributes.backendIdentifiers) {
                    return false;
                }
                JSON.parse(userAttributes.backendIdentifiers);   // must be readable, otherwise keep today's sequence
            } catch (checkError) {
                kony.print("startParallelPostLoginWave not used: " + checkError);
                return false;
            }
            // Committed from here on: always return true so isLoginSuccess does not start a second login sequence.
            var wave = {
                "attributesReady": false,
                "failed": false,
                "pendingSuccess": false,
                "deviceFlagSetCount": scope_AuthPresenter.deviceFlagSetCount || 0
            };
            scope_AuthPresenter.parallelWave = wave;
            kony.print("PERF|WAVE_START|" + Date.now()); // PERF-TEMP
            try {
                scope_AuthPresenter.lastDashboardNavigationTime = null;
                scope_AuthPresenter.isMFARequired = false;
                var jsonRes = JSON.parse(userAttributes.backendIdentifiers);
                if (jsonRes.T24 && jsonRes.T24[0]) {
                    applicationManager.getUserPreferencesManager().setBackendIdentifier(jsonRes.T24[0].BackendId);
                } else if (jsonRes.CORE && jsonRes.CORE[0]) {
                    applicationManager.getUserPreferencesManager().setBackendIdentifier(jsonRes.CORE[0].BackendId);
                }
                applicationManager.getUserPreferencesManager().saveDefaultLegalEntity(userAttributes.defaultLegalEntity ? userAttributes.defaultLegalEntity : "");
                applicationManager.getUserPreferencesManager().saveCurrentLegalEntity(userAttributes.defaultLegalEntity ? userAttributes.defaultLegalEntity : (userAttributes.homeLegalEntity ? userAttributes.homeLegalEntity : ""));
            } catch (applyError) {
                kony.print("startParallelPostLoginWave apply: " + applyError);
            }
            applicationManager.getAuthManager().getUserAttributes(scope_AuthPresenter.userAttributesSuccessCallback, scope_AuthPresenter.parallelWaveAttributesError);
            scope_AuthPresenter.prefetchDashboardAccounts();
            scope_AuthPresenter.postLoginServices();
            return true;
        },
        parallelWaveAttributesError: function (error) {
            // Same handling as today (userAttributesErrorCallback); the gate stays closed so no Dashboard opens.
            if (scope_AuthPresenter.parallelWave) {
                scope_AuthPresenter.parallelWave.failed = true;
            }
            scope_AuthPresenter.userAttributesErrorCallback(error);
        },
        // Same as the base setDeviceRegisterflag, plus a counter the parallel wave uses to keep today's final value.
        setDeviceRegisterflag: function (value) {
            var userManager = applicationManager.getUserPreferencesManager();
            userManager.updateDeviceRegisterFlag(value);
            scope_AuthPresenter.deviceFlagSetCount = (scope_AuthPresenter.deviceFlagSetCount || 0) + 1;
        },
        // PERF: start the Dashboard account list (getList) in parallel with the post-login services.
        // The response is only used by HomepageMA showDashboard, at the same point in the flow as before.
        prefetchDashboardAccounts: function () {
            try {
                // When the AccountManager login prefetch (LOGIN_PREFETCH_ACCOUNTS) is switched on it already
                // sends getList early; do not send a second one.
                if (CommonUtilities.getBooleanConfig("LOGIN_PREFETCH_ACCOUNTS", false) === true) {
                    return;
                }
                if (applicationManager.getConfigurationManager().isMicroAppPresent('HomepageMA')) {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
                    if (typeof accountsModule.presentationController.prefetchAccountList === "function") {
                        accountsModule.presentationController.prefetchAccountList();
                    }
                }
            } catch (err) {
                kony.print("prefetchDashboardAccounts" + err);
            }
        },
        clearDashboardAccountsPrefetch: function () {
            try {
                if (applicationManager.getConfigurationManager().isMicroAppPresent('HomepageMA')) {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
                    if (typeof accountsModule.presentationController.clearAccountListPrefetch === "function") {
                        accountsModule.presentationController.clearAccountListPrefetch();
                    }
                }
            } catch (err) {
                kony.print("clearDashboardAccountsPrefetch" + err);
            }
        },
        /*navigationAfterLogin: function(){
            var navManager = applicationManager.getNavigationManager();
                  var inputParam = navManager.getCustomInfo("authCred")
                  var authParams={
                      "username": inputParam,
                      "rememberMe": true
                  }
                if(kony.application.getCurrentForm().id === "frmLogin"){
                   applicationManager.getAccountManager().defaultAccount(authParams,this.defaultAccountSC.bind(this), this.defaultAccountEC.bind(this));
                /*  var navManager = applicationManager.getNavigationManager();
                   navManager.navigateTo({   
                     "appName": "HomepageMA",
                       "friendlyName": "frmHBLUnifiedDashboard",
                            },true,"Navigation");*/
        /*        }else{
                const configManager = applicationManager.getConfigurationManager();
                const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
               
                
               if(isHomepageMAPresent ){
                  const dashboard = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                  });
                  dashboard.presentationController.showDashboard();
                  if(applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.CAMPAIGN)){
                    scope_AuthPresenter.fetchPostloginAds();
                  }
                } else {
            //       scope_AuthPresenter.navigateToMicroApp({ 
            //         appName:"DummyMA", 
            //         friendlyName:"DummyModule/frmDummy" 
            //       });
                }
                const initiateMonolithicAppFlow = false;
                if(initiateMonolithicAppFlow){
                  const userPrefManager = applicationManager.getUserPreferencesManager();
                  const navManager = applicationManager.getNavigationManager();
                  if(scope_AuthPresenter.isMFARequired === false){
                    scope_AuthPresenter.goToAccounts();
                  } else {
                    if (userPrefManager.isRememberMeOn() === false){
                      scope_AuthPresenter.goToAccounts();
                    } else {
                      if (scope_AuthPresenter.rememberdeviceregflag === false) {
                        scope_AuthPresenter.goToAccounts();
                      } else {
                        scope_AuthPresenter.setDeviceRegisterflag(true);          
                        let keys = scope_AuthPresenter.getAuthFlags();
                        keys.popUpMsg = "";
                        navManager.setCustomInfo("frmDevRegLoginType", keys);
                        let controller = applicationManager.getPresentationUtility().getController('frmDevRegLoginType', true);
                        controller.tempLoginMode = "password";
                        navManager.navigateTo("frmDevRegLoginType");          
                      }
                    }
                  }
                }
              }
          },*/
        defaultAccountSC: function (response) {
            var resData = response;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("defaultAcc", resData);
            applicationManager.setDefaultDashboardObj(resData);
            var resData = {
                "defaultAccount": response
            }
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "frmHBLUnifiedDashboard",
            }, true, resData);
        },
        defaultAccountEC: function (err) {
            //alert("error" + err)
			  applicationManager.getPresentationUtility().Alert("error" + err)
        },
        forgotNavigationNew: function (enteredUserName) {
            const navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("userFlow", "cantSignIn");
            navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmResetPasswordNew"}, false);
        }, 
        fetchCaptchaSuccess: function (res) {
            const controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
            controller.fetchCaptchaSuccess(res);
        },
        presentationCaptchaVerifySuccess: function (res) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            const controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
            controller.verifyCaptchaSuccess();
        },
        presentationCaptchaVerifyError :function(err) {
    scope_AuthPresenter.logger.log("####Error while Fetching user : Forgot username flow");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", err);
    } else {
      const controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
      controller.verifyCaptchaFailure(err);
    }
  },
        navigateToPhone: function (lastName) {
            scope_AuthPresenter.authManger.setForgotAttribute("Name", lastName);
            scope_AuthPresenter.commonFunctionForNavigation("frmForgotEnterPhoneNumber");
        },
        verifyDOB: function (verifyData) {
            const validationManager = applicationManager.getValidationUtilManager();
            const forUtility = applicationManager.getFormatUtilManager();
            let phone = "";
            if (verifyData.code) {
                phone = verifyData.code + "-" + verifyData.phone;
            } else {
                phone = verifyData.phone;
            }
            let fetchUserNameJSON = {
                "AccountNumber": verifyData.AccNo,
                "Phone": phone,
                "Email": verifyData.email,
                "serviceKey": verifyData.serviceKey,
                "captchaValue": verifyData.captcha,
				"Name":verifyData.Name
            };
            scope_AuthPresenter.authManger.verifyUserName(fetchUserNameJSON, scope_AuthPresenter.presentationUserVerifySuccess, scope_AuthPresenter.presentationUserVerifyError);
        },
        presentationUserVerifySuccess: function (res) {
			var scope=this;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var fullName;
            if (res !== null && res.isUserExists !== "false") {
				navManager.setCustomInfo("CantLoginData",res);
				var params = {
            "UserName" : res.user_attributes[0].UserName
          };
		  scope_AuthPresenter.authManger.validateLogin(params,scope.validateLoginsuccessCallback,scope.validateLoginErrorCallback);
            } else {
                var controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);// frmForgotEnterAccNum
                controller.accNum = {
                    "email": null,
                    "code": null,
                    "phone": null,
                    "dob": null,
                    "serviceKey": null,
                    "captcha": null
                };
                   navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmResetPasswordNew" }, false);
                //scope_AuthPresenter.commonFunctionForNavigation("frmResetPasswordNew");//  frmForgotEnterAccNum
                controller.verifyError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.usernameUnavailableMsg"));
            }
        },
		presentationUserVerifyError : function(err) {
    scope_AuthPresenter.logger.log("####Error while Fetching user : Forgot username flow");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", err);
    } else {
		const controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
		 controller.accNum = {
                    "email": null,
                    "code": null,
                    "phone": null,
                    "dob": null,
                    "serviceKey": null,
                    "captcha": null
                };
                   var navManager = applicationManager.getNavigationManager();
                   navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmResetPasswordNew" }, false);
                //scope_AuthPresenter.commonFunctionForNavigation("frmResetPasswordNew");//frmForgotEnterAccNum
      
      controller.verifyError(err.errorMessage);
      /*const controller2 = applicationManager.getPresentationUtility().getController('frmForgotEnterEmailID', true);
      controller2.verifyCaptchaFailure(err);*/
    }
  },
        validateLoginsuccessCallback:function(response){
			try{
				if(response&&response.statusCd === "0" ){
					if(response&&(response.loginStatus=="Username, DeviceID Matched" || response.loginStatus=="Mock Response New Customer or Device Login")){
				var navManager=applicationManager.getNavigationManager();
				var res=navManager.getCustomInfo("CantLoginData");
                const username = res.user_attributes[0].UserName;
                const securitykey = res.user_attributes[0].securityKey;
                const serviceKey = res.serviceKey;
                var FirstName = res.user_attributes[0].FirstName ? res.user_attributes[0].FirstName:"";
                var Lastname = res.user_attributes[0].LastName ? res.user_attributes[0].LastName:"";
                //scope_AuthPresenter.getPasswordRulesAndPolicynew();
                //const Fullname = res.user_attributes[0].FirstName ? res.user_attributes[0].FirstName : "" + res.user_attributes[0].LastName ? res.user_attributes[0].LastName : '';
                
                if ( FirstName && Lastname) {
                    fullName = FirstName + " " + Lastname;
                }
                else if(FirstName){
                    fullName = FirstName;
                }
                else if(Lastname){
                    fullName = Lastname;
                }
                else {
                    fullName = username ? username : "";
                }
                let userlist = [];
                for (let i = 0; i < res.user_attributes.length; i++) {
                    userlist[i] = [res.user_attributes[i].UserName, res.user_attributes[i].UserName];
                }
                let userMap = new Map();
                for (let i = 0; i < res.user_attributes.length; i++) {
                    userMap.set(res.user_attributes[i].UserName, res.user_attributes[i]);
                }
                let data = {
                    "UserNameList": userlist
                };
                scope_AuthPresenter.userList = userlist;
                scope_AuthPresenter.authManger.setPrimarykeyAttribute(data);
                scope_AuthPresenter.authManger.setUserName(userlist);
                scope_AuthPresenter.authManger.setServicekey(serviceKey);
                scope_AuthPresenter.authManger.setSecurityKey(securitykey);
                if (CommonUtilities.getSCAType() === 1) {
                    var controller = applicationManager.getPresentationUtility().getController('frmSCACantSignIn', true);
                    navManager.setCustomInfo("frmSCACantSignIn", userMap);
                    scope_AuthPresenter.commonFunctionForNavigation("frmSCACantSignIn");
                } else {
                            navManager.setCustomInfo("frmForgot", undefined);
                            navManager.setCustomInfo("selectedUser", username);
                            navManager.setCustomInfo("userMap", userMap);
                            navManager.setCustomInfo("serviceKey", serviceKey);
                            navManager.setCustomInfo("userFullnameCantsignin", fullName);
                            scope_AuthPresenter.commonFunctionForNavigation("frmForgotResetInformation");
                            
                        }
                    }
                    else {
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("cantSignInFlowType", "true");

                        var res = navManager.getCustomInfo("CantLoginData");
                        const username = res.user_attributes[0].UserName;
                        const securitykey = res.user_attributes[0].securityKey;
                        const serviceKey = res.serviceKey;
                        var FirstName = res.user_attributes[0].FirstName ? res.user_attributes[0].FirstName : "";
                        var Lastname = res.user_attributes[0].LastName ? res.user_attributes[0].LastName : "";
                        //scope_AuthPresenter.getPasswordRulesAndPolicynew();
                        //const Fullname = res.user_attributes[0].FirstName ? res.user_attributes[0].FirstName : "" + res.user_attributes[0].LastName ? res.user_attributes[0].LastName : '';

                        if (FirstName && Lastname) {
                            fullName = FirstName + " " + Lastname;
                        }
                        else if (FirstName) {
                            fullName = FirstName;
                        }
                        else if (Lastname) {
                            fullName = Lastname;
                        }
                        else {
                            fullName = username ? username : "";
                        }
                        let userlist = [];
                        for (let i = 0; i < res.user_attributes.length; i++) {
                            userlist[i] = [res.user_attributes[i].UserName, res.user_attributes[i].UserName];
                        }
                        let userMap = new Map();
                        for (let i = 0; i < res.user_attributes.length; i++) {
                            userMap.set(res.user_attributes[i].UserName, res.user_attributes[i]);
                        }
                        let data = {
                            "UserNameList": userlist
                        };
                        scope_AuthPresenter.userList = userlist;
                        scope_AuthPresenter.authManger.setPrimarykeyAttribute(data);
                        scope_AuthPresenter.authManger.setUserName(userlist);
                        scope_AuthPresenter.authManger.setServicekey(serviceKey);
                        scope_AuthPresenter.authManger.setSecurityKey(securitykey);
                        navManager.setCustomInfo("frmForgot", undefined);
                        navManager.setCustomInfo("selectedUser", username);
                        navManager.setCustomInfo("userMap", userMap);
                        navManager.setCustomInfo("serviceKey", serviceKey);
                        navManager.setCustomInfo("userFullnameCantsignin", fullName);
                        scope_AuthPresenter.commonFunctionForNavigation("frmForgotResetInformation");
                        /*
                        var errObj = {
             "errmsg": {
                "errorMessage": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Unauthorized.Username"),
             }
          };
                var controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
                controller.accNum = {
                    "email": null,
                    "code": null,
                    "phone": null,
                    "dob": null,
                    "serviceKey": null,
                    "captcha": null
                };
                scope_AuthPresenter.commonFunctionForNavigation("frmResetPasswordNew");
                controller.verifyError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cantsingn.newdevregerror"));
                */
                    }
                }
                else if (response.statusCd === "1") {

                    var errObj = {
                        "errmsg": {
                            "errorMessage": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Unauthorized.Username"),
                        }
                    };
                    var controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
                    controller.accNum = {
                        "email": null,
                        "code": null,
                        "phone": null,
                        "dob": null,
                        "serviceKey": null,
                        "captcha": null
                    };
                    scope_AuthPresenter.commonFunctionForNavigation("frmResetPasswordNew");
                    controller.verifyError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Unauthorized.Username"));
                }
                else {
                    var errObj = {
                        "errmsg": {
                            "errorMessage": response.loginStatus,
                        }
                    };
          var controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
                controller.accNum = {
                    "email": null,
                    "code": null,
                    "phone": null,
                    "dob": null,
                    "serviceKey": null,
                    "captcha": null
                };
                scope_AuthPresenter.commonFunctionForNavigation("frmResetPasswordNew");
                controller.verifyError(response.loginStatus);
       }
			}catch(e){
				kony.print("********Error in validateLoginsuccessCallback Function *********"+e);
			}
		},
		validateLoginErrorCallback:function(err){
			try{
				var controller = applicationManager.getPresentationUtility().getController('frmResetPasswordNew', true);
                controller.accNum = {
                    "email": null,
                    "code": null,
                    "phone": null,
                    "dob": null,
                    "serviceKey": null,
                    "captcha": null
                };
                scope_AuthPresenter.commonFunctionForNavigation("frmResetPasswordNew");
                controller.verifyError(err);
			}catch(e){
				kony.print("********Error in validateLoginErrorCallback Function *********"+e);
            }
        },
        getPasswordRulesAndPolicynew : function () {
            const userPrefManager = applicationManager.getUserPreferencesManager();
            userPrefManager.fetchPasswordRulesAndPolicyNew(scope_AuthPresenter.getPasswordRulesAndPolicynewSuccessCallback, scope_AuthPresenter.getPasswordRulesAndPolicyErrorCallback);
        },
        getPasswordRulesAndPolicynewSuccessCallback : function (res) {
            //scope_AuthPresenter.asyncManager.setSuccessStatus(1, res);
            const navManager = applicationManager.getNavigationManager();
            var data;
            if (res) {
                 data = navManager.getCustomInfo("frmForgotCreatePassword");
                if (data && data !== null) {
                    data.passwordPolicy = res.passwordpolicy.content;
                } else {
                    data = { "passwordPolicy": res.passwordpolicy.content };
                }
                navManager.setCustomInfo("frmForgotCreatePassword", data);
                const validationUtility = applicationManager.getValidationUtilManager();
                validationUtility.createRegexForPasswordValidation(res.passwordrules);
                const controller = applicationManager.getPresentationUtility().getController('frmForgotResetInformation', true);
                controller.setPasswordPolicy(data);
               // scope_AuthPresenter.commonFunctionForNavigation("frmForgotCreatePassword");
            }
        },
		 presentationLogoutSuccess : function(resSuccess) {
			 
    var callbacksToBeRemoved = {
        "onforeground": ["TeminAppForeGroundCallBack"],
        "onbackground": ["TeminAppBackGroundCallBack"]
        };
		try{
				var sm = applicationManager.getStorageManager();
		// sm.removeStoredItem("userFirstName");
		// sm.removeStoredItem("userLastName"); 
		sm.setStoredItem('updateInternalAccounts', false);
		scope_AuthPresenter.clearDashboardAccountsPrefetch();
		scope_AuthPresenter.lastDashboardNavigationTime = null;
		scope_AuthPresenter.parallelWave = null;
			 }catch(e){
				kony.print("**********Error while remove username*********"+e); 
			 }
    kony.application.removeApplicationCallbacks(callbacksToBeRemoved);	  
    scope_AuthPresenter.logger.log("resSuccess");
    scope_AuthPresenter.logoutNavigation.call(scope_AuthPresenter, true);
  },
  doLogout: function(context){
	  //alert(context);
	  //applicationManager.getPresentationUtility().Alert(context);
	  this.performLogout(context);
  },
  postLoginServicesSuccess :function(){
	  kony.print("PERF|PLS_DONE|" + Date.now()); // PERF-TEMP
	  // PERF (phase 2): in the parallel wave, T&C / Dashboard navigation waits until getUserAttributes has been
	  // applied (PIN popup, device flag, UserAttributesData). It is re-run from userAttributesSuccessCallback.
	  var parallelWave = scope_AuthPresenter.parallelWave;
	  if (parallelWave && (parallelWave.failed === true || parallelWave.attributesReady !== true)) {
		  parallelWave.pendingSuccess = true;
		  return;
	  }
	  /* Splits the login window into post login services vs the accounts call.
	     One shot - this method is reachable more than once per login. */
	  try {
	    if (scope_AuthPresenter.perfBarrierMarked !== true) {
	      scope_AuthPresenter.perfBarrierMarked = true;
	      CommonUtilities.perfMark("post login services done");
	    }
	  } catch (perfError) { }
	  var scope=this;
	  var configManager = applicationManager.getConfigurationManager();
	  var userPreferencesManager = applicationManager.getUserPreferencesManager();
    if(scope_AuthPresenter.isTnCRequire === true) {
      const navManager = applicationManager.getNavigationManager();
      let response = scope_AuthPresenter.tncResponse;
      navManager.setCustomInfo("frmTermsAndCondition", {
        content: response.termsAndConditionsContent,
        serviceKey: response.serviceKey,
        flowType: "Login",
        contentTypeID: response.contentTypeId,
      });
     // navManager.navigateTo("TermsAndConditionsUIModule/frmTermsAndCondition");
	// termsAndConditionsContent,enrollMod.presentationController.commonFunctionForNavigation.bind(this,"frmEnroll"));
			 applicationManager.getDataProcessorUtility().ShowTandC("<font face='SourceSansPro-Regular' >" + response.termsAndConditionsContent,scope.btnContinueFunction.bind(scope));
             applicationManager.getPresentationUtility().dismissLoadingScreen();
    } else { 
	var getFeatures =configManager.getUserFeatures();
	var getPermission=configManager.getUserPermissions();
      if((kony.sdk.util.isNullOrUndefinedOrEmptyObject(getFeatures)) && (kony.sdk.util.isNullOrUndefinedOrEmptyObject(getPermission)) && (!configManager.checkUserFeature.hasOwnProperty("VIEW_ONLY_ROLE"))){
		  if(this.count ==0){
			  this.count =1;
		   userPreferencesManager.getUserFeaturesAndPermissions(scope_AuthPresenter.presentationUserFeaturesAndPermissionsSuccess, scope_AuthPresenter.presentationUserFeaturesAndPermissionsError);
		  }else{
			  applicationManager.getPresentationUtility().Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("kony.mb.10515mb"),
        "alertHandler": scope.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      }, {});
	  return;
		  }
	  }else{
	  scope_AuthPresenter.navigationAfterLogin();
    }
	
      //scope_AuthPresenter.showCustomers({});
    }
  },
  btnContinueFunction:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    const configManager = applicationManager.getConfigurationManager();
    const isAboutUsMAPresent = configManager.isMicroAppPresent('AboutUsMA');
    if(isAboutUsMAPresent){
      const informationModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AboutUsMA", moduleName: "InformationUIModule" });
      informationModule.presentationController.acceptTermsAndCondition();
    } else {
      kony.print("Please Add AboutUsMA MicroApp to proceed");
    }
  },
  legacyUserHandler:function(data){
	  try{
		  var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
		  if(data&&data.errorMessage&&data.errorMessage.serverErrorRes.errcode!="10090"){
			  authMod.presentationController.commonFunctionForNavigation({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"});
			  var controller = applicationManager.getPresentationUtility().getController("AuthUIModule/frmLogin", true, { "appName": "AuthenticationMA" });
			  controller.bindGenericError(data.errorMessage.serverErrorRes.errmsg)
	  }
	  else{
		  var detailJSON=JSON.parse(data.errorMessage.serverErrorRes.errmsg);
		   var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
		   enrollMod.presentationController.enrollRetailUserSuccessCallback(detailJSON,"",detailJSON);
	  }
	  }catch(e){
		  kony.print("error in legacyUserHandler"+e);
	  }
  },
  alertCallback: function(){
	  try{
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		 applicationManager.getPresentationFormUtility().logoutUser(true);
	  }catch(err){
		 kony.print("err:"+err);
	  }
  },
  /*presentationUserFeaturesAndPermissionsSuccess: function(resSuccess){
	  try{
		if(resSuccess.responses[0].isSuccess){
      applicationManager.getConfigurationManager().features = resSuccess["features"];
    applicationManager.getConfigurationManager().userPermissions = resSuccess["permissions"];
      let features = JSON.parse(applicationManager.getConfigurationManager().features);
      applicationManager.getConfigurationManager().setEntitlements(features);
      scope_AuthPresenter.initializePermissions();

      applicationManager.getConfigurationManager().rearrangeHamburgerAccordingToEntitements();
      scope_AuthPresenter.fetchEntitlementsForUserSuccess(); 
	  scope_AuthPresenter.navigationAfterLogin();
	}else{
		applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	}
	  }catch(err){
		 kony.print("presentationUserFeaturesAndPermissionsSuccess:"+ err);
	  }
  },*/
    };
});