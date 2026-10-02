define(["CommonUtilities","OLBConstants",'SCAConfiguration'],function(CommonUtilities,OLBConstants,SCAConfiguration){
    return{
        transactionPinStatus: function (param) {
            var SettingManager = applicationManager.getSettingsManager();
            SettingManager.getTransactionPin(param, this.transactionPinStatusSuccessCallBack, this.transactionPinStatusErrorCallback);
        },
        transactionPinStatusSuccessCallBack: function (response) {
            //var navManager = applicationManager.getNavigationManager();
            //navManager.setCustomInfo("pinStatus",response);
            if (response != undefined) {
                if (response.isTransactionPinSet == "true") {
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.showEditTransactionPin();
                } else {
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.showTransactionPin();
                }
            }
        },
              transactionPinStatusErrorCallback : function(err){
                 applicationManager.getPresentationUtility().dismissLoadingScreen();
                    if (err["isServerUnreachable"]) {
                    applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
                   }else{
                         var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
                       var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
                       controller.bindViewError(errorMsg);
                   }
              },
              showTransactionPin : function() {
                var viewProperties = {
                    phoneList: applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers(),
                    isLoading: false
                };
                if (kony.application.getCurrentForm().id !== "frmTransactionPin") {
                    applicationManager.getNavigationManager().navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "frmTransactionPin"});
                }
               applicationManager.getNavigationManager().updateForm(viewProperties, "frmTransactionPin");
            },
            showEditTransactionPin : function() {
                var viewProperties = {
                    phoneList: applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers(),
                    isLoading: false
                };
                if (kony.application.getCurrentForm().id !== "frmEditTransactionPin") {
                    applicationManager.getNavigationManager().navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "frmEditTransactionPin"});
                }
               applicationManager.getNavigationManager().updateForm(viewProperties, "frmEditTransactionPin");
            },
           showUserProfile : function() {
                this.showProgressBar("frmProfile");
                applicationManager.getUserPreferencesManager().fetchUserProfile(this.showUserProfileSuccess.bind(this), this.showUserProfileFailure.bind(this));
            },
            transactionPINResetStatus: function (param) {
              var SettingManager = applicationManager.getTermsAndConditionManager();
              SettingManager.getResetTransactionpin(param, this.resetTransactionPinStatusSuccessCallBack.bind(this), this.resetTransactionPinStatusErrorCallback.bind(this));
          },
          resetTransactionPinStatusSuccessCallBack: function (response) {
              if (response != undefined) {
                var navManager = applicationManager.getNavigationManager();
                var resetPin ={
                  "resetPin":response
                }
                navManager.setCustomInfo("contextResetPin",resetPin)
                      applicationManager.getNavigationManager().navigateTo({
                        "appName": "ManageProfileMA",
                        "friendlyName": "frmResetTransactionPin"
                      },true,{
                        "resetPin":response
                      });
                
                      applicationManager.getNavigationManager().updateForm({
                        "resetPin": response,
                      },"frmResetTransactionPin");
                  
              }
          },
          resetTransactionPinStatusErrorCallback :function(err){
              CommonUtilities.showServerDownScreen();
        },
      //   showResetTransactionPin: function(response) {
      //     // var viewProperties = {
      //     //     phoneList: applicationManager.getUserPreferencesManager().getEntitlementPhoneNumbers(),
      //     //     isLoading: false,
      //     //     pinStatus: response.pinStatus
      //     // };
      //     // if (kony.application.getCurrentForm().id !== "frmTransactionPin") {
      //         applicationManager.getNavigationManager().navigateTo({
      //             "appName": "ManageProfileMA",
      //             "friendlyName": "frmResetTransactionPin"
      //         });
      //     // }
      //     applicationManager.getNavigationManager().updateForm({
      //       "resetTransactionPin": response,
      //     },"frmResetTransactionPin");
      // },
     
            /**
             * Method used to fetch the profile
             */
            showUserProfileSuccess : function(response) {
                response[0].userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
                applicationManager.getNavigationManager().navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "frmProfile"});
                applicationManager.getNavigationManager().updateForm({
                    "userProfile": response[0],
                    "isLoading": false
                }, 'frmProfile');
            },
            /**
             * Method used to fetch the profile
             */
            showUserProfileFailure : function(response) {
                CommonUtilities.showServerDownScreen();
            },
            UpdateTransactionPin : function(params) {
                var SettingManager = applicationManager.getSettingsManager();
                SettingManager.fetchUpdateTransactionPin(params,this.UpdateTransactionPinSuccess.bind(this), this.UpdateTransactionPinFailure.bind(this));
            },
            /**
             * Method used to fetch the profile
             */
            UpdateTransactionPinSuccess : function(response) {
                //response[0].userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
                var navManager = applicationManager.getNavigationManager();
                    var flowtype=navManager.getCustomInfo("flag");
                if(flowtype!="editflow"){
                    applicationManager.getNavigationManager().navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "frmTransactionPin"});
                applicationManager.getNavigationManager().updateForm({
                    "updatePin": response,
                }, 'frmTransactionPin');
                }
                else{
                applicationManager.getNavigationManager().navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "frmEditTransactionflow"});
                applicationManager.getNavigationManager().updateForm({
                    "updatePin": response,
                }, 'frmEditTransactionflow');
            }
                //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.transactionPinStatus(param);
            },
            /**
             * Method used to fetch the profile
             */
            UpdateTransactionPinFailure : function(response) {
                CommonUtilities.showServerDownScreen();
            },
            disableEBankingAccessSuccess : function(type,response){
                if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired) {
                  var mfaJSON = {
                    "serviceName": applicationManager.getMFAManager().getServiceId(),
                    "flowType": "SUSPEND_USER",
                    "response": response,
                    /*"objectServiceDetails": {
                      "action": "SUSPEND_USER",
                      "serviceName": "ExternalUserManagement",
                      "dataModel": "ExternalUsers_2",
                      "verifyOTPOperationName": "updateUserStatus",
                      "requestOTPOperationName": "updateUserStatus",
                      "resendOTPOperationName": "updateUserStatus",
                    },*/
                  };
                  applicationManager.getMFAManager().initMFAFlow(mfaJSON);
                }
                else{
                  type="All Entities";
                  switch(type){
                    case "All Entities":
                      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AuthUIModule",
                        "appName": "AuthenticationMA"
                      });
                      authMod.presentationController.disableEBankingLogout(type);
                      break;
                    case "Default Entity Equalto Current Entity":
                      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AuthUIModule",
                        "appName": "AuthenticationMA"
                      });
                      authMod.presentationController.disableEBankingLogout(type);
                      break;
                    case "Default Entity NotEqualto Current Entity":
                      var controller = applicationManager.getPresentationUtility().getController('frmeBankingAccess', true);
                      controller.ackScreen(type,response);
                      break;
                    case "Current Entity":
                      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AuthUIModule",
                        "appName": "AuthenticationMA"
                      });
                      authMod.presentationController.disableEBankingLogout(type);
                      break;
                    case "Neither Current Nor Default Entity":
                      var controller = applicationManager.getPresentationUtility().getController('frmeBankingAccess', true);
                      controller.ackScreen(type,response);
                      break;
                  }
                }
              },
            
                disableEBankingAccessError : function(error){
                  CommonUtilities.showServerDownScreen();
               },
               transactionPinResetValidation: function (param) {
                kony.application.showLoadingScreen();
                var SettingManager = applicationManager.getTermsAndConditionManager();
                SettingManager.getTransactionpinValidation(param, this.transactionPinValidationSuccessCallBack.bind(this), this.transactionPinFailureErrorCallback.bind(this));
              },
                transactionPinValidationSuccessCallBack : function(response){
                  kony.application.dismissLoadingScreen();
                  if(response.code == "000" && response.httpStatusCode == "200" ){
                       applicationManager.getNavigationManager().updateForm({
                        "TransactionResetPinSuccess": response
                    });
                  }else{
                      applicationManager.getNavigationManager().updateForm({
                        "TransactionResetPinError": response
                    });
                  }  
                },
                transactionPinFailureErrorCallback : function(error){
                  kony.application.dismissLoadingScreen();  
                     applicationManager.getNavigationManager().updateForm({
                        "TransactionResetPinError": error
                    });
                }
          };  
});
