define(["OLBConstants","CommonUtilities"], function (OLBConstants,CommonUtilities) {
  return {
    navigateToSetOrResetTransactionPin: function () {
      let navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmProfileSetTransactionPin" });
    },
    transactionPinStatus: function (param) {
      //applicationManager.getSettingsManager().getTransactionPin(param, this.transactionPinStatusSuccessCallBack, this.transactionPinStatusErrorCallback);
       applicationManager.getAccountManager().getTransactionPin(param, this.transactionPinStatusSuccessCallBack, this.transactionPinStatusErrorCallback);
    },

    transactionPinStatusSuccessCallBack: function (response) {
		var scope=this;
		var presentationUtility=applicationManager.getPresentationUtility();
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("pinStatus", response);
      navManager.setCustomInfo("transactionPinSetOrNot", response.isTransactionPinSet);
      kony.store.setItem("transactionPinSetOrNot", response.isTransactionPinSet);
      var flag = navManager.getCustomInfo("resetPinDeepLinkFlow");
      if(flag == true){
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmProfileResetTransactionPinEntry"});
      }
	  else if(response&&(response.isTransactionPinSet==false||response.isTransactionPinSet=="false")&&kony.application.getCurrentForm().id=="frmHBLUnifiedDashboard"){
		  var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("kony.mb.SupportInfo.Title"),
      "message": kony.i18n.getLocalizedString("18n.HBL.Cards.ResetPinError"),
      "alertHandler": scope.alertCallback.bind(scope),
      "yesLabel": kony.i18n.getLocalizedString("i18n.enrollNow.proceed"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
	presentationUtility.Alert(basicConfig, pspConfig, {});   
	  }
    },
alertCallback:function(res){
	if(res){
	  var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsUIModule",
                    "appName": "ManageProfileMA"
                });
                settingsMode.presentationController.navigateToSetOrResetTransactionPin();
	}
	else{}
},
    transactionPinStatusErrorCallback: function (err) {
      try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var flag = navManager.getCustomInfo("resetPinDeepLinkFlow");
        if (flag == true) {
          var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "AuthenticationMA",
            "moduleName": "AuthUIModule"
          });
          authMod.presentationController.onLogout();
        }
        if (err["isServerUnreachable"]) {
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
          var controller = applicationManager.getPresentationUtility().getController('frmProfileSetTransactionPin', true);
          var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.TransactionPinFailureMessage");
          controller.bindViewError(errorMsg);
        }
      } catch (err) {
      }
    },

    changeTransactionPin: function (param) {
      applicationManager.getSettingsManager().updateTransactionPin(param, this.changeTransactionPinStatusSuccessCallBack, this.changeTransactionPinStatusErrorCallback);
    },

    changeTransactionPinStatusSuccessCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("pinStatus", response);
      navManager.setCustomInfo("isTransactionPinSetupSuccess", response.isTransactionPinSetupSuccess);
      navManager.setCustomInfo("pinHistoryEntrySuccess", response.pinHistoryEntrySuccess);
      navManager.setCustomInfo("oldPinError", response.ErrMsg);
	  var transactionPinFlag = navManager.getCustomInfo("transactionPinSetOrNot");
      if (response.pinHistoryEntrySuccess == "true" && response.isTransactionPinSetupSuccess == "true" && transactionPinFlag == "false") {
        navManager.setCustomInfo("showSetTransactionSuccessMessage",true);
		navManager.setCustomInfo("showPopup", false);
       // navManager.navigateTo({"appName" :"ManageProfileMA","friendlyName":"SettingsUIModule/frmSettings"});  
       navManager.navigateTo({"appName" :"ManageProfileMA","friendlyName":"SettingsUIModule/frmProfileSetTransactionPin"});   
		kony.store.setItem("transactionPinSetOrNot","true");	 
		navManager.setCustomInfo("transactionPinSetOrNot","true");	 		
      } else if (response.pinHistoryEntrySuccess == "true" && response.isTransactionPinSetupSuccess == "true" && transactionPinFlag == "true") {
        navManager.setCustomInfo("showChangeTransactionSuccessMessage",true);
		navManager.setCustomInfo("showPopup", false);
        //navManager.navigateTo({"appName" :"ManageProfileMA","friendlyName":"SettingsUIModule/frmSettings"});  
        navManager.navigateTo({"appName" :"ManageProfileMA","friendlyName":"SettingsUIModule/frmProfileSetTransactionPin"}); 
		navManager.setCustomInfo("transactionPinSetOrNot","true");	 		
      } else {
      var formController = applicationManager.getPresentationUtility().getController('frmProfileSetTransactionPin', true);
      formController.checkForToastMessage(response);
      }
    },

    changeTransactionPinStatusErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else if(err["Current Transaction Pin not matching with the records"]){
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Profile.CurrentTransactionPinErrorMessage"));
      }else {
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinFailureMessage"));
      }
    },
    getDefaultAccountforDashboard: function () {
      var default_account_dashboard  = applicationManager.getDefaultDashboardObj();
      return default_account_dashboard.Accounts[0].account_id;
    },

   
    getFormattedAccountName: function (accountName, accountId) {
      if (accountName && accountId) {
        var accId = accountId;
        var lastFour = accId.slice(-4);
        return accountName + "...." + lastFour;
      } else {
        var flag = kony.i18n.getLocalizedString("i18n.common.NA");
        if (accountName === flag) {
          return flag;
        }
      }
    },
    
    updatePasswordSuccess : function(res){
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired == "true"){
      var mfaJSON = {
        "flowType" : "UPDATE_PASSWORD",
        "response" : res
      };
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    }
    else
    {
      var navManager = applicationManager.getNavigationManager();
      var loginData = navManager.getCustomInfo("frmLoginToast");
      if(loginData)
        loginData.postupdateusernameandpassword = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.profile.changePassword');
      else
        loginData = {"postupdateusernameandpassword": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changePassword')};
      navManager.setCustomInfo("frmLoginToast",loginData);
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
      authModule.presentationController.passwordUpdateLogout();
    }
  },
   updatePasswordFailure : function(err){
    if(CommonUtilities.getSCAType() == 1){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileChangeAndUpdatePasswordHID',err);
    navManager.navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "SettingsHIDUIModule/frmProfileChangeAndUpdatePasswordHID"});
    } else if(CommonUtilities.getSCAType() == 2){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileChangeAndUpdatePasswordUniken',err);
    navManager.navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "SettingsUnikenUIModule/frmProfileChangeAndUpdatePasswordUniken"});
    } else{
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileChangeAndUpdatePassword',err);
    navManager.navigateTo({"appName" : "ManageProfileMA", "friendlyName" : "SettingsUIModule/frmProfileChangeAndUpdatePassword"});
    }
  },

    getUserAllPhoneNumbersSuccess: function (data) {
      var result = [];
      if (kony.sdk.util.isNullOrUndefinedOrEmptyObject(data)) {
        var configManager = applicationManager.getConfigurationManager();
        var phoneNumber = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.Phone;
        if (!kony.sdk.isNullOrUndefined(phoneNumber)) {
          var temp = {};
          temp.lblDetail = kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Mobile");
          temp.lblDetailValue = phoneNumber;
          result.push(temp);
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          var temp = {};
          //var name = data[i].type;
          /*
          var name = data[i].Extension===undefined?kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Mobile"):this.PhoneTypes[data[i].Extension];
          if(data[i].isPrimary === "true"){
            name += ' ('+kony.i18n.getLocalizedString("kony.mb.common.MarkedPrimary")+')';
          }
          else if(data[i].countryType && data[i].countryType.toLowerCase() === 'international'){
            name += '('+kony.i18n.getLocalizedString("i18n.ProfileManagement.International") + ')';
          }
          temp.lblDetail = name;
           */
          temp.lblDetail = kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Mobile");
          //temp.lblDetailValue = data[i].phoneNumber;
          temp.lblDetailValue = (data[i].Value.includes("-")) ? data[i].Value : data[i].phoneCountryCode + "-" + data[i].Value;
          //temp.template = 'flxDetails';
          result.push(temp);
        }
      }
      var result1 = [];
      if (result.length > 0) {
        var temp1 = {};
        temp1.lblHeader = applicationManager.getPresentationUtility().getStringFromi18n("i18n.FastTransfers.RegisteredPhoneNumber");
        //temp1.template = 'flxDetailsHeader';
        result1.push(temp1);
        result1.push(result);
      }
      var dobssn = [];
      var userObj = applicationManager.getUserPreferencesManager();
      var dob = userObj.getUserDOB();
      dob = dob.substring(0, 10);
      var forUtility = applicationManager.getFormatUtilManager();
      var dateobj = forUtility.getDateObjectfromString(dob, "YYYY-MM-DD");
      dob = dob.substring(8, 10) + "/" + dob.substring(5, 7) + "/" + dob.substring(0, 4);
      var ssn = applicationManager.getDataProcessorUtility().maskAccountNumber(userObj.getSSN());
      var email = userObj.getEntitlementEmailIds();
      var temp2 = {};
      temp2.lblDetail = applicationManager.getPresentationUtility().getStringFromi18n("i18n.Enroll.DOB");
      temp2.lblDetailValue = dob;
      //temp2.template = "flxDetails";
      var temp3 = {
        "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profie.CitizenshipNumber"),
        "lblDetailValue": ssn,
        "flxSeparator": { "isVisible": false }
        //"template" : "flxDetails"
      };
      dobssn.push(temp2);
      dobssn.push(temp3);
      var answer = [];
      answer.push({});
      answer.push(dobssn);
      var segmentData = [];
      segmentData.push(answer);
      if (result1.length > 0)
        segmentData.push(result1);
      var emails = [];
      var header = {
        "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("i18n.FastTransfers.RegisteredEmailAddress")
        //"template" : "flxDetailsHeader"
      };
      emails.push(header);
      var emailData = [];
      var rowData = {};
      for (var i = 0; i < email.length; i++) {
        if (email[i].isPrimary === "true") {
          rowData = {
            "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("i18n.ProfileManagement.EmailId"),
            "lblDetailValue": email[i].Value
            //"template": "flxDetails"
          }
          emailData.push(rowData);
        }
        else {
          rowData = {
            "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.SecondaryEmailID"),
            "lblDetailValue": email[i].Value
            //"template": "flxDetails"
          }
          emailData.push(rowData);
        }
      }
      emails.push(emailData);
      if (emails.length > 1 && emailData.length > 0)
        segmentData.push(emails);
      scope_SettingsPresenter.segmentProfileData = segmentData;
      applicationManager.getPresentationUtility().dismissLoadingScreen();     //scope_SettingsPresenter.getUserAllAddresses();
      var userObj = applicationManager.getUserPreferencesManager();
      //      var data = userObj.getEntitlementAddresses();
      //      scope_SettingsPresenter.getUserAllAddressesSuccess(data);
    },
   uploadProfilePictureFailure : function(err) {
        var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails', true);
        formController.checkForToastMessage();
    },
    getLegalEntitiesSuccess: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmEBankingAccess", response);
      //scope_SettingsPresenter.commonFunctionForNavigation("frmEBankingAccess");
      scope_SettingsPresenter.commonFunctionForNavigation({
        "appName": "ManageProfileMA",
        "friendlyName": "SettingsUIModule/frmEBankingAccess"
      });
    },
    navigateToChangePassword : function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var userObj = applicationManager.getUserPreferencesManager();
      var userName = userObj.getUserName();
      var oldPassword = userObj.getPassword();
      if (CommonUtilities.getSCAType() == 1) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('frmProfileChangePasswordHID', userName);
        navManager.setCustomInfo('frmProfileChangeAndUpdatePasswordHID', userName);
        navManager.navigateTo({
          "appName": "ManageProfileMA",
          "friendlyName": "SettingsHIDUIModule/frmProfileChangeAndUpdatePasswordHID"
        });
      } else if (CommonUtilities.getSCAType() == 2) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('frmProfileChangePasswordUniken', userName);
        navManager.setCustomInfo('frmProfileChangeAndUpdatePasswordUniken', userName);
        navManager.navigateTo({
          "appName": "ManageProfileMA",
          "friendlyName": "SettingsUnikenUIModule/frmProfileChangeAndUpdatePasswordUniken"
        });
    }
      else {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('frmProfileChangePassword', userName);
        navManager.setCustomInfo('frmProfileChangeAndUpdatePassword', userName);
        //navManager.navigateTo('frmProfileChangeAndUpdatePassword');
        navManager.navigateTo({
          "appName": "ManageProfileMA",
          "friendlyName": "SettingsUIModule/frmProfileChangeAndUpdatePassword"
        });
      }
    },
    navigateToProfilePersonalDetails: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      //      var userObj = applicationManager.getUserPreferencesManager();
      //      var userDetails = userObj.getUserObj();
      //      scope_SettingsPresenter.getUserAllPhoneNumbers();
      //      var navigationManager = applicationManager.getNavigationManager();
      //      navigationManager.navigateTo('frmProfilePersonalDetails');
      var userObj = applicationManager.getUserPreferencesManager();
      var data = userObj.getEntitlementPhoneNumbers();
      scope_SettingsPresenter.getUserAllPhoneNumbersSuccess(data);
      var addData = userObj.getEntitlementAddresses();
      scope_SettingsPresenter.getUserAllAddressesSuccess(addData);
      var navigationManager = applicationManager.getNavigationManager();
      //navigationManager.navigateTo('frmProfilePersonalDetails');
      navigationManager.navigateTo({ "friendlyName": "SettingsUIModule/frmProfilePersonalDetails", "appName": "ManageProfileMA" });
    },
    navigateToProfileChangeLanguage: function () {
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmSettingsChangeLanguage" });
    },

    	updateBiometricMfaSuccess:function(){
		var navManager = applicationManager.getNavigationManager();
		var enrtypoint=navManager.getCustomInfo("MFAEnrtyPoint")
		var controller = applicationManager.getPresentationUtility().getController('frmSettings', true);
		var mfacontroller = applicationManager.getPresentationUtility().getController("MFAModule/frmMFAValidation", true,{"appName":"CommonsMA"});
		
			navManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "frmSettings" });
	  controller.showToastSuccess();
	  navManager.setCustomInfo("MFAEnrtyPoint","frmSettings");
	},

    transactionPINResetStatus: function (param) {
      var SettingManager = applicationManager.getTermsAndConditionManager();
      SettingManager.getResetTransactionpin(param, this.resetTransactionPinStatusSuccessCallBack.bind(this), this.resetTransactionPinStatusErrorCallback.bind(this));
    },

    resetTransactionPinStatusSuccessCallBack: function (response) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (!kony.sdk.isNullOrUndefined(response)) {
        if (response.pinStatus == "true") {
          if (response.isReqExists != undefined && response.isReqExists === "true") {
            var flag = response.isReqExists;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("requestExistsForResetPin", response);
            var formController = applicationManager.getPresentationUtility().getController("SettingsUIModule/frmSettings", true, { "appName": "ManageProfileMA" });
            formController.checkForToastMessageResetPinError();
          } else if (!kony.sdk.isNullOrUndefined(response.referenceId)) {
            var referenceId = response.referenceId;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("resetPinReferenceId", referenceId);
            navManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmProfileResetTransactionPinAcknowledgement" }, true, response);
          }
        } else if (response.pinStatus == "false") {
          var navManager = applicationManager.getNavigationManager();
          navManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmProfileResetTransactionPinInfo" });
        }
      }
    },

    resetTransactionPinStatusErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formController = applicationManager.getPresentationUtility().getController("SettingsUIModule/frmSettings", true, { "appName": "ManageProfileMA" });
      formController.checkForToastMessageResetCommonError();
    },

    transactionPinResetValidation: function (param) {
      var SettingManager = applicationManager.getTermsAndConditionManager();
      SettingManager.getTransactionpinValidation(param, this.transactionPinValidationSuccessCallBack.bind(this), this.transactionPinFailureErrorCallback.bind(this));
    },

    transactionPinValidationSuccessCallBack: function (response) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      if (response.code == "000" && response.httpStatusCode == "200") {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("resetPinSuccess", response);
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsUIModule", "appName": "ManageProfileMA" });
        settingsModule.presentationController.showSettings();
        //navManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmSettings" });
      } else {
        if (!kony.sdk.isNullOrUndefined(response.message)) {
          var formController = applicationManager.getPresentationUtility().getController("SettingsUIModule/frmProfileResetTransactionPinEntry", true, { "appName": "ManageProfileMA" });
          formController.checkForToastMessageResetError(response.message);
        }
      }
    },

    transactionPinFailureErrorCallback: function (error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formController = applicationManager.getPresentationUtility().getController("SettingsUIModule/frmProfileResetTransactionPinEntry", true, { "appName": "ManageProfileMA" });
      formController.checkForToastMessageResetCommonError();
    },

    disableEBankingAccessSuccess: function (selectedEntities, response) {
      try {
        if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired == "true") { 
          const mfaManager = applicationManager.getMFAManager();
          /*
          const mfaJSON = {
            flowType: "SUSPEND_USER",
            response: response,
            objectServiceDetails: {s
              serviceName: "RBObjects",
              dataModel: "DbxUser",
              operationName: "updateDBXUserStatus",
            },
            */
          const mfaJSON = {
            flowType: "SUSPEND_USER",
            response: response,
            objectServiceDetails: {
              serviceName: "ExternalUserManagement",
              dataModel: "ExternalUsers_2",
              operationName: "updateUserStatus",
            },
          };
          mfaManager.initMFAFlow(mfaJSON);

        } else {
          if (selectedEntities.flowType === "Default Entity NotEqualto Current Entity" || selectedEntities.flowType === "Neither Current Nor Default Entity") {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmEBankingAccessAck", selectedEntities);
            scope_SettingsPresenter.commonFunctionForNavigation("frmEBankingAccessAck");
          } else {
            var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
            authMod.presentationController.disableEBankingLogout();
          }
        }
      } catch (err) {

      }
    },
	showUserProfileImageSuccess :function(response) {
        kony.print(response);
        var userPreferencesManager = applicationManager.getUserPreferencesManager();
        userPreferencesManager.setUserImage(response.userImage);
        var controller = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails', true);
        controller.setDetailsData();
    },
	
  
    defaultAccounts: function () {
            var userObj = applicationManager.getUserPreferencesManager();
            var accountObj = applicationManager.getAccountManager();
            //1.Dashboard 
            var acctId = this.getDefaultAccountforDashboard();
            var defaultDashboardAcc = accountObj.getInternalAccountByID(acctId);
            //2.Transfers 
            var acctId = userObj.getDefaultAccountforTransfers();
            var defaultTransferAcc = accountObj.getInternalAccountByID(acctId);
            //3. Bill Pay 
            var acctId = userObj.getDefaultAccountforBillPay();
            var defaultBillPayAcc = accountObj.getInternalAccountByID(acctId);
            //4. Loan Payment 
            var acctId = userObj.getDefaultAccountforLoanPayment();
            var defaultLoanAcc = accountObj.getInternalAccountByID(acctId);
            //5. Card Payment 
            var acctId = userObj.getDefaultAccountforCardPayment();
            var defaultCardPaymentAcc = accountObj.getInternalAccountByID(acctId);
            //6. QR Payment  
            var acctId = userObj.getDefaultAccountforQRPayments();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultQRPaymentsAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultQRPaymentsAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
            //7. Open Fixed Deposit  
            var acctId = userObj.getDefaultAccountforDeposit();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultDepositAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultDepositAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
            //8. Check Management 
            var acctId = userObj.getDefaultAccountforCheckManagement();
            var defaultOpenCheckManagementAcc = accountObj.getInternalAccountByID(acctId);
            /*
            //9. Check Deposit 
            var acctId = userObj.getDefaultAccountforCheckDeposit();
            var defaultCheckDepositAcc = accountObj.getInternalAccountByID(acctId);
            */
            //10. Cash Withdrawal 
            var acctId = userObj.getDefaultAccountforCardlessPayments();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultCardlessAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultCardlessAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
			acctId = userObj.getDefaultAccountforesewa();
    var defaultesewaAcc  = accountObj.getInternalAccountByID(acctId);
            var data = [
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.MM.Dashboard"), "lblValue": this.getFormattedAccountName(defaultDashboardAcc.accountName, defaultDashboardAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultDashboardAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("i18n.TransfersEur.Tabs.Transfers"), "lblValue": this.getFormattedAccountName(defaultTransferAcc.accountName, defaultTransferAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultTransferAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.BillPay.BillPay"), "lblValue": this.getFormattedAccountName(defaultBillPayAcc.accountName, defaultBillPayAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultBillPayAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.transaction.loanPayment"), "lblValue": this.getFormattedAccountName(defaultLoanAcc.accountName, defaultLoanAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultLoanAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.Settings.Mb.CardPayment"), "lblValue": this.getFormattedAccountName(defaultCardPaymentAcc.accountName, defaultCardPaymentAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultCardPaymentAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("i18n.qrpayments.QRPayments"), "lblValue": this.getFormattedAccountName(defaultQRPaymentsAcc.accountName, defaultQRPaymentsAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultQRPaymentsAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.Settings.Mb.OpenFixedDeposit"), "lblValue": this.getFormattedAccountName(defaultDepositAcc.accountName, defaultDepositAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultDepositAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.CM.chequeManagement"), "lblValue": this.getFormattedAccountName(defaultOpenCheckManagementAcc.accountName, defaultOpenCheckManagementAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultOpenCheckManagementAcc.accountID },
                // { "lblTitle": kony.i18n.getLocalizedString("kony.mb.ChequeDeposit"), "lblValue": this.getFormattedAccountName(defaultCheckDepositAcc.accountName,defaultCheckDepositAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultCheckDepositAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.Hamburger.CardLessCash") + " " +kony.i18n.getLocalizedString("i18n.Transactions.backendWithdrawal"), "lblValue": this.getFormattedAccountName(defaultCardlessAcc.accountName, defaultCardlessAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultCardlessAcc.accountID },
				{"lblTitle": kony.i18n.getLocalizedString("i18n.payments.loadeSewa"),"lblValue":this.getFormattedAccountName(defaultesewaAcc.accountName,defaultesewaAcc.accountID),"imgArrow":"chevron.png","lblAccId":defaultesewaAcc.accountID}
            ];
            return (data);
        },

  };
});