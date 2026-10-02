define(['CommonUtilities','OLBConstants'],function(CommonUtilities,OLBConstants){ 
    return {
        preShowResetInformation: function () {
            this.fetchAndSetUsername();
            this.resetUI();
            this.renderTitleBar();
            this.setFlowActions();
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("cantSignInFlowType");
            if(flow === "true"){
                this.view.flxResetPasswordORSignIn.setVisibility(true);
            }
        },
        fetchAndSetUsername: function () {
            const navManager = applicationManager.getNavigationManager();
            let user = navManager.getCustomInfo("userFullnameCantsignin");
            this.view.lblUsername.text = user;
            this.view.resetPassword.setVisibility(false);
        },
        resetUI: function () {
            const navManager = applicationManager.getNavigationManager();
            this.view.lblErrorMessageScreen1.setVisibility(false);
            this.view.lblErrorMessage.setVisibility(false);
            let user = navManager.getCustomInfo("selectedUser");
            this.view.lblUsername.text = navManager.getCustomInfo("userFullnameCantsignin");;
            var selectedUser = navManager.getCustomInfo("userMap");
            if (selectedUser != null && selectedUser != undefined && selectedUser != "") {
                if (user != null && user != undefined && user != "") {
                    let status = selectedUser.get(user).Status_id;
                    if (CommonUtilities.getSCAType() == 2) {
                        this.view.flxRegenerateActivationCode.setVisibility(true);
                    }
                    else {
                        if (status === 'SID_CUS_ACTIVE') {
                            this.view.flxResetPasswordORSignIn.setVisibility(true);
                        }
                        else {
                            this.view.flxRegenerateActivationCode.setVisibility(true);
                        }
                    }
                }
            }
            if (CommonUtilities.getSCAType() == 2) {
                        this.view.flxRegenerateActivationCode.setVisibility(true);
                    }

            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxMainContainer.top = "11%";
                this.view.flxMainContainer.skin = "sknHBLFlxffffffBr1ShadowPxebe6ebRadius16Px";
            }
            else {
                this.view.flxMainContainer.top = "5%";
                this.view.flxMainContainer.skin = "sknFlxHblBgffffffBorderebe6ebRadius8ShadowBB";
            }
        },
        
        setFlowActions: function () {
            const scopeObj = this;
            const navManager = applicationManager.getNavigationManager();
            this.view.customHeader.flxBack.onTouchEnd = function () {
      navManager.setCustomInfo("cantSignInFlowType", null);
                navManager.setCustomInfo("frmForgot", undefined);
                navManager.navigateTo("frmLogin");
            };
            this.view.onDeviceBack = function () {
                navManager.setCustomInfo("frmForgot", undefined);
                navManager.navigateTo("frmLogin");
            };
            this.view.customHeader.btnRight.onClick = function () {
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("cantSignInFlowType", null);
                scopeObj.removeSavedData();
        if (CommonUtilities.getSCAType() == 2) {
          new kony.mvc.Navigation({
            "appName": "AuthenticationMA",
            "friendlyName": "AuthUnikenUIModule/frmLoginUniken"
          }).navigate();
        }
        else {
          navManager.navigateTo("frmLogin");
          navManager.setCustomInfo("frmForgot", undefined);
        }
            };
            scopeObj.view.flxResetMyPassword.onTouchEnd = function () {
                applicationManager.getPresentationUtility().showLoadingScreen();
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
                let user = navManager.getCustomInfo("selectedUser");
                //let status = applicationManager.isValidUserForDevice(user);
                //if (status) {
                    authModule.presentationController.getPasswordRulesAndPolicynew();
                    scopeObj.view.resetPassword.setVisibility(true);
                    let serviceKey = navManager.getCustomInfo("serviceKey");
                    //scopeObj.view.resetPassword.displaypasswordScreen(user, serviceKey);
                    //scopeObj.view.resetPassword.navigateToMFA(user, serviceKey);
                    scopeObj.view.resetPassword.displaypasswordScreen(user, serviceKey);
                    //           scopeObj.view.resetPassword.NavigatetoPasswordResetScreen();
                //} else {
                    //scopeObj.unAuthorizedUserError();
                //}
            };
            this.view.flxSignInNow.onTouchEnd = function () {
                scopeObj.signInNow();
            };
            this.view.flxRegenerateActivationOption.onTouchEnd = function () {
                scopeObj.regenerateActivationCode();
            };
        },
        removeSavedData: function () {
            // Removing stored data incase user clicks on cancel
            const navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmForgot", undefined);
        },
        cancelResetPassword: function () {
            this.view.resetPassword.setVisibility(false);
            this.view.resetPassword.resetUI();
        },
        resetPasswordSuccessCallback: function (response) {
            const navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmLogin");
        },
        resetPasswordFailureCallback: function (response) {
            // TODO : add failure funtionality
        },
        signInNow: function () {
            const navManager = applicationManager.getNavigationManager();
            //       var data=navManager.getCustomInfo("frmLogin");
            //       data["usernameFromForgotUsername"]=this.view.lblUsername.text;
            //       navManager.setCustomInfo("frmLogin",data);
            navManager.setCustomInfo("frmForgot", undefined);
            navManager.navigateTo("frmLogin");
        },
        signInNowSuccess: function () {
            this.removeSavedData();
            // TODO
        },
        signInNowFailure: function () {
            // TODO
            this.view.lblErrorMessageScreen1.text = "Sign In Failed!";
            this.view.lblErrorMessageScreen1.setVisibility(true);
        },
        regenerateActivationCode: function () {
            // TODO: Call to Regenerate Activation Code
            applicationManager.getPresentationUtility().showLoadingScreen();
            const navManager = applicationManager.getNavigationManager();
            let user = navManager.getCustomInfo("selectedUser");
            var selectedUser = navManager.getCustomInfo("userMap");
            const serviceKey = navManager.getCustomInfo("serviceKey");
            let id = selectedUser.get(user).id;
            var params = {
                "serviceKey": serviceKey,
            };
          if(CommonUtilities.getSCAType() == 2 )
          params.id = user;
          else 
          params.id = id;
          const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
                authMode.presentationController.regenerateActivationCode(params);
            },
        regenerateActivationSuccess: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();  
            this.removeSavedData();
            this.view.ActivationCodeSuccess.setVisibility(true); // Enable Component
            // TODO
        },
        regenerateActivationFailure: function () {
            this.view.lblErrorMessage.setVisibility(true);
            // TODO
        },
        closeComponentAndActivateAccount: function () {
            // Method linked to closeComponent() Event of ActivationCodeSuccess Component
      if(CommonUtilities.getSCAType() == 2){
        let scopeObj = this;
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authMode.presentationController.navigateToMicroApp({
        "appName": "SelfServiceEnrolmentMA",
        "friendlyName": "EnrollUnikenUIModule/frmEnrollActivateProfileUniken"
      });
      }
      else{
            this.view.ActivationCodeSuccess.setVisibility(false);
            const navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmLogin");
      }
        },
        renderTitleBar: function () {
            var deviceUtilManager = applicationManager.getDeviceUtilManager();
            var isIphone = deviceUtilManager.isIPhone();
            if (!isIphone) {
                this.view.flxHeader.isVisible = true;
                //this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.flxHeader.isVisible = false;
                //this.view.flxMainContainer.top = "0dp";
            }
        },
        setPasswordPolicy: function (policydata) {
            if (policydata) {
                this.view.resetPassword.setPasswordPolicy(policydata);
            }
        }
    };
});