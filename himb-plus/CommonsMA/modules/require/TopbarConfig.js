/*eslint require-jsdoc:0
          complexity:0
*/
define([], function () {
    var orientationHandler = new OrientationHandler();
    var checkUserFeature = function (feature) {
        return applicationManager.getConfigurationManager().checkUserFeature(feature);
    }
    
    var checkAtLeastOneFeaturePresent = function (features) {
        return features.some(checkUserFeature);
    }

    var checkUserPermission = function (permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
    }

    var checkAtLeastOnePermission = function (permissions) {
        return permissions.some(checkUserPermission);
    }
    var TRANSFERS_CONTEXTUAL_MENU = [
        {
            isVisible: function () {
               var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                return  checkUserFeature("BILL_PAY");
               } else
                 return false;
            },
            id: "Transfers",
            widget: "flxTransferMoney",
            onClick: function () {               
                applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"}).showTransferGatewayScreen({ gateway: "true" });
            }
        },
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.BILLPAY) === true)  
                return checkAtLeastOnePermission([
                    "TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW",
                    "INTRA_BANK_FUND_TRANSFER_VIEW",
                    "INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW",
                    "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW",
                    "P2P_VIEW"
                ])	
              else
                return false;
            },
            id: "Bill Pay",
            widget: "flxPayBills",
            onClick: function () {               
                    var navMan = applicationManager.getNavigationManager();
				navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmBillPayNew"
            });
                /*var payBillsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "BillPayMA", "moduleName" : "BillPaymentUIModule"});
                payBillsModule.presentationController.showBillPaymentScreen({ context: "BulkPayees", loadBills: true });*/
            }
        },
        {
            isVisible: function () {              
               return checkUserFeature("P2P"); 
            },
            id: "Pay A Person",
            widget: "flxSendMoney",
            onClick: function () {              
                    var PayAPersonModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
                    PayAPersonModule.presentationController.showPayAPerson();
            }
        },
        {
            isVisible: function () {
                  var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.WIRETRANSFER) === true) { 
                var wireTransferEligible = applicationManager.getUserPreferencesManager().getWireTransferEligibleForUser();
                return (wireTransferEligible === "true" || wireTransferEligible === true) 
                &&  checkAtLeastOneFeaturePresent([
                    "DOMESTIC_WIRE_TRANSFER",
                    "INTERNATIONAL_WIRE_TRANSFER"
                ]);
               } else
                 return false;
            },
            id: "Wire Transfers",
            widget: "flxWireMoney",
            onClick: function () {               
                    var WireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("WireTransferModule");
                    WireTransferModule.presentationController.showWireTransfer();
            }
        },
    ];
    
    var FAST_TRANFERS_CONTEXTUAL_MENU = [
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {                
                return checkUserFeature("BILL_PAY");
               } else
                 return false;
            },
            id: "Transfers",
            widget: "flxTransferMoney",
            onClick: function () {
                  //applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : 
					var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "frmUTFLanding"
            }, false, data);
            }
        },
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                return checkAtLeastOnePermission([
                    "TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW",
                    "INTRA_BANK_FUND_TRANSFER_VIEW",
                    "INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW",
                    "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW",
                    "P2P_VIEW"
                ])	
                 } else
          return false;
            },
            id: "Bill Pay",
            widget: "flxPayBills",
            onClick: function () {
                applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"}).getPastPayments();
            }
        },
        {
            isVisible: function () {     
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                return checkAtLeastOnePermission([
                    "INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT",
                    "INTRA_BANK_FUND_TRANSFER_VIEW_RECEPIENT",
                    "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW_RECEPIENT",
                    "P2P_VIEW_RECEPIENT"
                ])            
               } else
                 return false;
            },
            id: "Pay A Person",
            widget: "flxSendMoney",
            onClick: function () {
              kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"}).presentationController.showTransferScreen({showManageRecipients:true}); 
            }
        },
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) { 
               return checkAtLeastOnePermission([
                "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE_RECEPIENT",
                "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT",
                "INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT",
                "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT",
                "P2P_CREATE_RECEPIENT"
            ]);
               } else
                 return false;
            },
            id: "Wire Transfers",
            widget: "flxWireMoney",
            onClick: function () {
                var addRecipientTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"});
                addRecipientTransferModule.presentationController.showTransferScreen({showRecipientGateway:true});
            }
        }
    ];

    var EUROPE_CONTEXTUAL_MENU =[
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {                               
                return checkUserFeature("BILL_PAY");		
               } else
                 return false;
            },
            id: "Transfers",
            widget: "flxTransferMoney",
            onClick: function () {
                    // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"}).showTransferScreen({ context: "MakePayment" });
                    /*var navMan = applicationManager.getNavigationManager();
                    var configManager = applicationManager.getConfigurationManager();
                    var data = applicationManager.getUserPreferencesManager().getUserObj();
                    navMan.navigateTo({
                       "appName": "BillPayMA",
                      "friendlyName": "frmBillPayNew"
                    }, false, data);
                    */
                 kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({appName: "BillPayMA",moduleName: "BillPaymentUIModule"}).presentationController.showBillPaymentScreen({context: "PayABill",payload:{"code":"ALL"}});   
                }
        },
        {
            isVisible: function() {
                var configurationManager = applicationManager.getConfigurationManager();
                if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                    return checkAtLeastOnePermission(["INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE", "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE", "INTRA_BANK_FUND_TRANSFER_CREATE", ])
                } else return false;
            },
            id: "Transfers",
            widget: "flxTransferBwAcc",
            onClick: function() {
                // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"}).showTransferScreen({ context: "MakePayment" });
                var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "frmUTFLanding"
                }, false, data);
            }
        },
        // {
        //     isVisible: function() {
        //         var configurationManager = applicationManager.getConfigurationManager();
        //         if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
        //             return checkUserFeature("BILL_PAY");
        //         } else return false;
        //     },
        //     id: "Bill Pay",
        //     widget: "flxPayMultipleBeneficiaries",
        //     onClick: function() {
        //         // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"}).showTransferScreen({ context: "MakePayment" });
        //         var navMan = applicationManager.getNavigationManager();
        //         var configManager = applicationManager.getConfigurationManager();
        //         var data = applicationManager.getUserPreferencesManager().getUserObj();
        //         navMan.navigateTo({
        //             "appName": "BillPayMA",
        //             "friendlyName": "frmBillPayHistory"
        //         }, false, data);
        //     }
        // },
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) 
                return checkAtLeastOnePermission([
                    "TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW",
                    "INTRA_BANK_FUND_TRANSFER_VIEW",
                    "INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW",
                    "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW",
                    "P2P_VIEW"
                ])	
              else
                return false;
            },
            id: "Bill Pay",
            widget: "flxPayBills",
            onClick: function () {
                    // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"}).showTransferScreen({ context: "MakePaymentOwnAccounts" });
                    applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"}).getPastPayments();
            }
        },
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.UNIFIEDTRANSFER) === true)
                 return true;
              else
                return false;
            },
            id: "Pay A Person",
            widget: "flxSendMoney",
            onClick: function () {
                    // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"}).showTransferScreen({ context: "ManageBeneficiaries" });
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"}).presentationController.showTransferScreen({showManageRecipients:true}); 
            }
        },
        {
            isVisible: function () {
              var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.UNIFIEDTRANSFER) === true) { 
                return checkAtLeastOnePermission([
                    "TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW",
                    "INTRA_BANK_FUND_TRANSFER_VIEW",
                    "INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW",
                    "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_VIEW",
                ])	
               } else
                 return false;
            },
            id: "Wire Transfers",
            widget: "flxWireMoney",
            onClick: function () {
                    // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"}).showTransferScreen({ context: "PastPayments" });
                    var addRecipientTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "TransfersMA", "moduleName" : "TransferFastUIModule"});
                    addRecipientTransferModule.presentationController.showTransferScreen({showRecipientGateway:true});
                }
        },
        // {
        //     isVisible: function () {
        //         var configurationManager = applicationManager.getConfigurationManager();
        //        if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) 
        //         // if (configurationManager.getDeploymentGeography() === "EUROPE") {
        //         //     return checkUserFeature("PAY_MULTIPLE_BENEFICIARIES");
        //         // }
        //         return true;
        //       else
        //         return false;
        //     },
        //     id: "Pay Multiple Beneficiaries",
        //     widget: "flxPayMultipleBeneficiaries",
        //     onClick: function () {
        //         applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "PayMultipleBeneficiariesUIModule"}).showPayMultipleBeneficiaries({"showManageBeneficiaries": true});
        //     }
        // }
        {
            isVisible: function() {
                var configurationManager = applicationManager.getConfigurationManager();
                if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.REGIONALTRANSFER) === true) {
                    return checkUserFeature("BILL_PAY");
                } else return false;
            },
            id: "Bill Pay",
            widget: "flxPayMultipleBeneficiaries",
            onClick: function() {
                // applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"}).showTransferScreen({ context: "MakePayment" });
                /*var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName": "BillPayMA",
                    "friendlyName": "frmBillPayHistory"
                }, false, data);
                */
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            appName: "BillPayMA",
                            moduleName: "BillPaymentUIModule"
                        }).presentationController.showBillPaymentScreen({
                            context: "History",
                            loadBills: !0
                        });
            }
        },
    ];

    var config = {
        getContextualMenu: function () {
            if (applicationManager.getConfigurationManager().getDeploymentGeography() === "EUROPE") {
                return EUROPE_CONTEXTUAL_MENU;
            }
          if (applicationManager.getConfigurationManager().isFastTransferEnabled == "false") {
            return TRANSFERS_CONTEXTUAL_MENU;
          }
            else {
             return FAST_TRANFERS_CONTEXTUAL_MENU;
            }
        },
        USER_ACTIONS: 
        [
            {   
                id: "Profile Settings",
                text: "i18n.ProfileManagement.profilesettings",
                isVisible: function () {
                  var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.MANAGEPROFILE) === true)
                    return checkUserPermission('PROFILE_SETTINGS_VIEW');
                  else
                    return false;
                },
                onClick: function () {
                    var profileModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"});
                    profileModule.presentationController.enterProfileSettings("profileSettings");
                }
            },
            {
                id: "Security Settings",
                text: "i18n.ProfileManagement.SecuritySettings",
                isVisible: function () {
                  var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.MANAGEPROFILE) === true)
                        return false;
                  else
                    return false;
                 },
                onClick: function() {
                    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"});
                    alertsModule.presentationController.enterProfileSettings("securityQuestions");                  
                }
            },
            {   
                id: "Account Settings",
                text: "i18n.Accounts.ContextualActions.updateSettingAndPreferences",
              
                isVisible: function () {
                  var configurationManager = applicationManager.getConfigurationManager();
                  if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.MANAGEARRANGEMENTS) === true)
                    return checkUserPermission("ACCOUNT_SETTINGS_VIEW");
                  else
                    return false;
                },
                onClick: function () {
                    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "ManageArrangementsUIModule",
                    "appName": "ManageArrangementsMA"});
                    settingsModule.presentationController.enterProfileSettings("accountSettings");                  
                }
            },
            {
              id: "Approval Matrix",
              text: "i18n.Settings.ApprovalMatrix.approvalMatrix",
              onClick: function() {
                    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SettingsNewApprovalUIModule", "appName": "ApprovalMatrixMA"});
                    settingsModule.presentationController.enterProfileSettings("approvalMatrix");                      
             },
              isVisible : function() {
                var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.APPROVALMATRIX) === true)
                return kony.application.getCurrentBreakpoint()!==640 && !orientationHandler.isMobile && checkUserPermission('APPROVAL_MATRIX_VIEW');
                else
                  return false;
              }
            },          
            {   
                id: "Alert Settings",
                text: "i18n.ProfileManagement.Alerts",
                isVisible: function () {
                  var configurationManager = applicationManager.getConfigurationManager();
                  if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.ALERTSETTINGS) === true){
                    var alertsdata = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SettingsNewAlertsUIModule", "appName": "AlertSettingsMA" });
					if(alertsdata.presentationController.getAlertsCategoryResponse()===undefined)
						alertsdata.presentationController.fetchAlertsCategoryNew("alertSettings");
                    return (checkUserPermission("ALERT_MANAGEMENT"));
                  }
                  else
                    return false;
                },
                onClick: function () {
                    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SettingsNewAlertsUIModule", "appName": "AlertSettingsMA" });
                    alertsModule.presentationController.enterProfileSettings("alertSettings");
                  
                }
            },
            {   
                id: "Consent Management",
                text: "i18n.ProfileManagement.Consent",
                isVisible: function () {
                  var configurationManager = applicationManager.getConfigurationManager();
               if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.CONSENTMANAGEMENT) === true)
                    return (applicationManager.getConfigurationManager().checkUserPermission("CDP_CONSENT_VIEW")); 
                  else
                    return false;
                 },
                onClick: function (){
                    var consentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "CDPConsentUIModule", "appName" : "ConsentMgmtMA"});
                    consentModule.presentationController.showConsentManagement();                  
                  
                }
            },
            {
                id: "Manage Account Access",
            text: "i18n.ProfileManagement.ManageAccountAccess",
            isVisible: function (){
              var configurationManager = applicationManager.getConfigurationManager();
              if (configurationManager.isMicroAppPresent(configurationManager.microappConstants.CONSENTMANAGEMENT) === true)
                 return (applicationManager.getConfigurationManager().checkUserPermission("PSD2_TPP_CONSENT_VIEW"));
                   //&& (applicationManager.getConfigurationManager().newSettings==="true");
              else
                return false;
            },
              onClick: function () {

                var manageAccountAccessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "PSD2ConsentUIModule", "appName" : "ConsentMgmtMA"});
                manageAccountAccessModule.presentationController.showManageAccountAccess();                  

              }
            }
        ],
        ACCOUNTS: {
            onClick: function () {
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
                accountsModule.presentationController.showAccountsDashboard();
            }
        },
        BILLS: {
            onClick: function() {
                 var navMan = applicationManager.getNavigationManager();
				navMan.navigateTo({
                "appName": "BillPayMA",
                "friendlyName": "frmBillPayNew"
            });
                /*var payBillsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "BillPayMA", "moduleName" : "BillPaymentUIModule"});
                payBillsModule.presentationController.showBillPaymentScreen({ context: "BulkPayees", loadBills: true });*/
            }
        },
        NOTIFICATIONS: {
            onClick: function () {
                var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AlertsMsgsUIModule", "appName" : "SecureMessageMA"});
                 alertsModule.presentationController.showAlertsPage();
            }
        },
        MESSAGES: {
            onClick: function () {
                var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AlertsMsgsUIModule", "appName" : "SecureMessageMA"});
                alertsModule.presentationController.showAlertsPage('',{show:"Messages"});
            }
        },
        HELP: {
            onClick: function () {
                var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
                var formId = kony.application.getCurrentForm().id;
                informationContentModule.presentationController.showOnlineHelp(formId);
            }
        },
        HOME: {
            onClick: function () {
              var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
                applicationManager.getPresentationUtility().showLoadingScreen();
            }
        },
        LOGOUT: {
            excludedForms: ['frmContactUsPrivacyTandC', 
                            'frmOnlineHelp', 
                            'frmLocateUs', 
                            'frmNewUserOnboarding'
                        ],
            onClick: function () {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
                var context = {
                    "action": "Logout"
                };
                authModule.presentationController.doLogout(context);
            }
        },
        FEEDBACK: {
            onClick: function () {
                if (kony.application.getCurrentForm() !== "frmCustomerFeedback") {
                    var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeedbackModule");
                    feedbackModule.presentationController.showFeedback();
                }
                
            }
        }
    }
    return {
        config: config
    }
});