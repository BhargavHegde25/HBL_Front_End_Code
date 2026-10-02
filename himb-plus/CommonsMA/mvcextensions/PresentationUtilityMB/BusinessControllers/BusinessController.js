/**
*@module PresentationUtility
*/
define([], function () {
  /**
   * PresentationUtility consists of all utilities anf wrapper functions related to Presentation
   *@alias module:PresentationUtility
   *@class
*/
  function PresentationUtility() {
    /*
  A variable maintained to store row index globally on swipe
  Note:It is maintained to delete on swipe till platform fix issue related to segment
*/
    /**@member {integer}  number to maintain index for swipe*/
    this.rowIndexforSwipe=-1;
    /**@member {integer}  number to maintain tap gesture enabled or not*/
    this.tapgestureEnabled= true;
  }
  inheritsFrom(PresentationUtility, kony.mvc.Business.Delegator);
  PresentationUtility.prototype.initializeBusinessController = function() {
  };
  /**
  * A wrapper on kony alert message for further use
  * @param {JSON} basicConfig - same as basicConfig in kony.ui.Alert
  * @param {JSON} pspConfig - same as pspConfig in kony.ui.Alert
*/
	/*
	PresentationUtility.prototype.showAlertMessage = function (basicConfig, pspConfig) {
		if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
			basicConfig.alertIcon = "transparentbox.png";
		}
		//kony.ui.Alert(basicConfig, pspConfig);
	}*/
	
    PresentationUtility.prototype.showAlertMessage = function(basicConfig, pspConfig) {
       try {
           if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
               basicConfig.alertIcon = "transparentbox.png";
           }
           var parentForm = kony.application.getCurrentForm();
           if (!parentForm.ShowCommonPopup) {
               var commonPopup = new com.hbl.mb.common.ShowCommonPopup({
                   "id": "ShowCommonPopup",
                   "appName": "ResourcesMA"
               }, {}, {});
               parentForm.add(commonPopup);
           }
           parentForm.ShowCommonPopup.showConfirmationPopup(
               basicConfig.alertTitle,
               basicConfig.message,
               basicConfig.alertHandler,
               basicConfig.yesLabel,
               basicConfig.alertHandler,
               basicConfig.noLabel,
           );
       } catch (e) {
            //kony.ui.Alert(basicConfig, pspConfig);
			applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig);
       }
    },
    PresentationUtility.prototype.Alert = function (message, alertHandler, alertType, yesLabel, noLabel, alertTitle, pspConf) {
       try {
		  if (typeof message === 'object') {
				 if(message.alertTitle){
					alertTitle = message.alertTitle;
				 }
				 if(message.alertHandler){
					alertHandler = message.alertHandler;
				 }
				 if(message.yesLabel){
					yesLabel = message.yesLabel;
				 }
				 if(message.noLabel){
					noLabel = message.noLabel;
				 }
				 if(message.alertType){
					alertType = message.alertType;
				 }
				 if(message.message){
					message = message.message;
				 }
              }
              var parentForm = kony.application.getCurrentForm();
              if (!parentForm.ShowCommonPopup) {
                     var commonPopup = new com.hbl.mb.common.ShowCommonPopup({
                            "id": "ShowCommonPopup",
                            "appName": "ResourcesMA"
                     }, {}, {});
                     parentForm.add(commonPopup);
              }
              if (alertType === constants.ALERT_TYPE_CONFIRMATION) {
                     parentForm.ShowCommonPopup.showConfirmationPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel);
              } else if (alertType === constants.ALERT_TYPE_ERROR) {
                     parentForm.ShowCommonPopup.showConfirmationPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel);
              } else if (alertType === constants.ALERT_TYPE_INFO) {
                     parentForm.ShowCommonPopup.showInfoPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel);
              } else {
                     parentForm.ShowCommonPopup.showInfoPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel);
              }
       } catch (e) {
            //kony.ui.Alert(message, alertHandler, alertType, yesLabel, noLabel, alertTitle, pspConf);
			applicationManager.getPresentationUtility().Alert(message, alertHandler, alertType, yesLabel, noLabel, alertTitle, pspConf);
       }
    },
	PresentationUtility.prototype.CustomAlert = function (message, alertHandler, alertType, yesLabel, noLabel, alertTitle, pspConf, customConfig) {
       try {

        if(typeof alertType === 'object'){
            customConfig = alertType;
          }

		    if (typeof message === 'object') {
				 if(message.alertTitle){
					alertTitle = message.alertTitle;
				 }
				 if(message.alertHandler){
					alertHandler = message.alertHandler;
				 }
				 if(message.yesLabel){
					yesLabel = message.yesLabel;
				 }
				 if(message.noLabel){
					noLabel = message.noLabel;
				 }
				 if(message.alertType){
					alertType = message.alertType;
				 }
				 if(message.message){
					message = message.message;
				 }
              }
              
              var parentForm = kony.application.getCurrentForm();
              if (!parentForm.ShowCommonPopup) {
                     var commonPopup = new com.hbl.mb.common.ShowCommonPopup({
                            "id": "ShowCommonPopup",
                            "appName": "ResourcesMA"
                     }, {}, {});
                     parentForm.add(commonPopup);
              }
			   kony.timer.schedule("popupDelay_" + new Date().getTime(), function () {
              if (alertType === constants.ALERT_TYPE_CONFIRMATION) {
                     parentForm.ShowCommonPopup.showConfirmationPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel, customConfig);
              } else if (alertType === constants.ALERT_TYPE_ERROR) {
                     parentForm.ShowCommonPopup.showConfirmationPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel, customConfig);
              } else if (alertType === constants.ALERT_TYPE_INFO) {
                     parentForm.ShowCommonPopup.showInfoPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel, customConfig);
              } else {
                     parentForm.ShowCommonPopup.showInfoPopup(alertTitle, message, alertHandler, yesLabel, alertHandler, noLabel, customConfig);
              }
			   },0.2,false);
       } catch (e) {
            //kony.ui.Alert(message, alertHandler, alertType, yesLabel, noLabel, alertTitle, pspConf);
			//applicationManager.getPresentationUtility().Alert(message, alertHandler, alertType, yesLabel, noLabel, alertTitle, pspConf);
       }
    },
  
  /**
  * Returns value of given i18n key in device's locale
  * @param {String} i18n Key - an i18n key to look out for
  * @param {String} noKeyValue(optonal) - returns this when lookout failed
  * @returns {String} - value associated to that key if its not there noKeyValue is returned
  */
  PresentationUtility.prototype.getStringFromi18n = function (stringValue,noKeyValue)
  {
    return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue):noKeyValue;
  }
  /**
  * A UI function to show loading indicator
*/
  PresentationUtility.prototype.showLoadingScreen = function(){
    kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
  }
  /**
  * A UI function to dismiss loading indicator
*/
  PresentationUtility.prototype.dismissLoadingScreen = function(){
    kony.application.dismissLoadingScreen();
  }
  /**
  * Returns the controller of the requested form
  * @param {String} formname - Name of the form for which the controller is required
  * @param {Boolean} isForm - expects true if the requested controller is of a form
  * @param {Object} metaObj - expects JSON object for get getting appName
  * @returns {object} - returns the requested controller(kony.mvc.MDAFormController)
  */
  PresentationUtility.prototype.getController = function(formname,isForm,metaObj){
    var controller = _kony.mvc.GetController(formname, isForm,metaObj);
    return controller;
  };
  PresentationUtility.prototype.MFA = {
    phoneAndEmail : {
      "phone": "",
      "email": ""},
    setPhoneAndEmail : function(phoneAndEmail){
      this.phoneAndEmail = phoneAndEmail;
    },
    getPhoneAndEmail : function(){
      return this.phoneAndEmail;
    },
    navigateBasedOnMFAType : function() {
      var mfaManager = applicationManager.getMFAManager();
      switch(mfaManager.getMFAType()){
        case "SECURE_ACCESS_CODE" :
          this.navigateToOtpScreen();
          break;
        case "SECURITY_QUESTIONS" :
          this.navigateAndSetSecurityQuestions();
          break;
      }
    },
    navigateToOtpScreen : function() {
      var mfaManager = applicationManager.getMFAManager();
      switch(mfaManager.getCommunicationType()){
        case "DISPLAY_ALL" :
          this.navigateToPhoneEmailScreen();
          break;
        case "DISPLAY_NO_VALUE" :
          this.navigateToSecureCodeScreen();
          break;
        case "DISPLAY_PRIMARY" :
          this.navigateToSecureCodeScreen();
          break;
      }
    },
    navigateToPhoneEmailScreen : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navigationManager = applicationManager.getNavigationManager();
      var mfaManager = applicationManager.getMFAManager();
      var flowType = mfaManager.getMFAFlowType();
      var operationType = mfaManager.operationType;
      if(operationType === "MONEYMOVEMENT" || operationType === "EUROPETRANSFER"){
        navigationManager.navigateTo("frmMFAOption3",true);
      }
      else{
        navigationManager.navigateTo("frmMFAOption3");
      }
      var mfaResponse = mfaManager.getMFAResponse();
      var controller = applicationManager.getPresentationUtility().getController('frmMFAOption3', true);
      controller.setFormUI(mfaResponse,flowType);
    },
    navigateToSecureCodeScreen : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navigationManager = applicationManager.getNavigationManager();
      var mfaManager = applicationManager.getMFAManager();
      var operationType = mfaManager.operationType;
      if(operationType === "MONEYMOVEMENT" || operationType === "EUROPETRANSFER"){
        navigationManager.navigateTo("frmMFASecurityCode",true);
      }
      else{
        navigationManager.navigateTo("frmMFASecurityCode");
      }
      var mfaResponse = mfaManager.getMFAResponse();
      var controller = applicationManager.getPresentationUtility().getController('frmMFASecurityCode', true);
      controller.setFormUI(mfaResponse);
    },
    setSecureCodeScreen : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var mfaManager = applicationManager.getMFAManager();
      var mfaResponse = mfaManager.getMFAResponse();
      var controller = applicationManager.getPresentationUtility().getController('frmMFASecurityCode', true);
      controller.setFormUI(mfaResponse);
    },
    showMFAOTPScreen : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navigationManager = applicationManager.getNavigationManager();
      var mfaManager = applicationManager.getMFAManager();
      var operationType = mfaManager.operationType;
      if(operationType === "MONEYMOVEMENT" || operationType === "EUROPETRANSFER"){
        navigationManager.navigateTo("frmMFASecurityCode",true);
      }
      else{
        navigationManager.navigateTo("frmMFASecurityCode");
      }
      var mfaResponse = mfaManager.getMFAResponse();
      var controller = applicationManager.getPresentationUtility().getController('frmMFASecurityCode', true);
      controller.setFormUI(mfaResponse);
    },
    navigateAndSetSecurityQuestions : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var mfaManager = applicationManager.getMFAManager();
      var operationType = mfaManager. operationType;
      if(operationType === "MONEYMOVEMENT" || operationType === "EUROPETRANSFER"){
        navManager.navigateTo("frmSecurityQuestions",true);
      }
      else{
        navManager.navigateTo("frmSecurityQuestions");
      }
      var controller = applicationManager.getPresentationUtility().getController('frmSecurityQuestions', true);
      var mfaAttributes = mfaManager.getMFAResponse().MFAAttributes;
      controller.setFormUI(mfaAttributes);
    },
    navigateToSecurityQuestion : function(){
      var controller = applicationManager.getPresentationUtility().getController('frmSecurityQuestions', true);
      var mfaManager = applicationManager.getMFAManager();
      var mfaAttributes = mfaManager.getMFAResponse().MFAAttributes;
      controller.setFormUI(mfaAttributes);
    },
    setSecurityQuestions : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmSecurityQuestions', true);
      var mfaManager = applicationManager.getMFAManager();
      var mfaAttributes = mfaManager.getMFAResponse().MFAAttributes;
      controller.setFormUI(mfaAttributes);
    },
    cancelMFAFlow : function(){
      var mfaManager = applicationManager.getMFAManager();
       var flowType = mfaManager.getMFAFlowType();
      var operationType=mfaManager.operationType;
      if(flowType == "INTRA_BANK_FUND_TRANSFER_CREATE" || flowType == "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"){
        flowType ="WITHINSAMEBANK";
        operationType ="";
      }
      if(operationType==="Transfers")
      {
         mfaManager.setMFAOperationType("");
        var transferModule = applicationManager.getModulesPresentationController("TransferModule");
        transferModule.cancelCommon();
     
      }
      /*else if(operationType==="MONEYMOVEMENT")
      {
         mfaManager.setMFAOperationType("");
        var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementModule");
        moneyMovementPresentationController.cancelCommon();
      }*/
      else if(operationType==="EUROPETRANSFER")
      {
         mfaManager.setMFAOperationType("");
        var transMod = applicationManager.getModulesPresentationController("TransferModule");
        transMod.cancelCommon();
      }
      else if(operationType==="BILLPAY")
        {
           mfaManager.setMFAOperationType("");
          var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
            billPayMod.presentationController.cancelCommon(); 
          
        }
      else if(operationType==="PAYAPERSON")
      {
        mfaManager.setMFAOperationType("");
        var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
        p2pMod.presentationController.cancelCommon();

      }
      else if(operationType === "LOANPAYOFF") {
        mfaManager.setMFAOperationType("");
        var loansMod = applicationManager.getModulesPresentationController("LoansPayoffModule");
        loansMod.cancelCommon();
      }
      else
      {
        switch(flowType){

         
          case "LoginMFA":
            var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
            authMod.presentationController.onLogout();
            break;
          case "UPDATE_USERNAME":
            var navigationManager=applicationManager.getNavigationManager();
            navigationManager.navigateTo({
              "appName": "ManageProfileMA",
              "friendlyName": 'frmSettings'
          });
            break;
          case "UPDATE_PASSWORD":
            var navigationManager=applicationManager.getNavigationManager();
            navigationManager.navigateTo({
              "appName": "ManageProfileMA",
              "friendlyName": 'frmSettings'
          });
            break;
          case "LOCK_CARD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case "UNLOCK_CARD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case "CHANGE_PIN_DEBIT":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case "REPORT_LOST":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case   "CANCEL_CARD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case  "REPLACE_CARD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case "CHANGE_PIN_CREDIT":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
           case "ACTIVATE_CARD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
           case "APPLY_FOR_DEBIT_CARD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
          case "EMI_TRANSACTION":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
            cardsMod.presentationController.cancelCommon();
            break;
          case "INTRA_BANK_FUNDTRANSFER_CREDIT_CARD_PAYMENT":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
            cardsMod.presentationController.cancelCommon();
            break;
			case "ESEWA_LOAD":
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
            cardsMod.presentationController.navigateToEsewaLoad();
            break
            case "FIXEDDEPOSITWITHNONSTP":
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            break;
            case "FIXEDDEPOSITWITHSTP":
            /*
            var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
            cardsMod.presentationController.cancelCommon();
            */
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            break;
             case "PSD2_TPP_CONSENT_REVOKED":
           var navigationManager=applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "ADD_PHONE_NUMBER":
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "UPDATE_PHONE_NUMBER":
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "REMOVE_PHONE_NUMBER":
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "ADD_EMAIL":
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "UPDATE_EMAIL":
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "REMOVE_EMAIL":
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            break;
          case "SUSPEND_USER":
            /*
            var navigationManager = applicationManager.getNavigationManager();
            navigationManager.navigateTo('frmSettings');
            */
            var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
            settingsModule.presentationController.showSettings();
            break;
          case "CBC_Fetch":
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            break;
          case "CBC_Create":
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            break;
          case "WITHINSAMEBANK":
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" });
            break;
        case "BILL_PAY":
        applicationManager.getPresentationUtility().showLoadingScreen();
        var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
        applicationManager.setBillPayFlow ="onCancel";
         bPayModule.onCancelClick();
        break;
         case "BILL_PAYNCHL":
         applicationManager.getPresentationUtility().showLoadingScreen();
         var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         applicationManager.setBillPayFlow ="onCancel";
         bPayModule.onCancelClick();
         break;
      case "TOPUP_VIRTUAL_CARDMB":
        var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
        cardsMod.presentationController.cancelCommon();
        break;
      case "TOPUP_DOMESTIC_CARDMB":
        var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
        cardsMod.presentationController.cancelCommon();
        break;
		 case "QR_PAYMENT":
         var navManager = applicationManager.getNavigationManager();
         navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		 break;
		 case "Legacy_User":
		  var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
            authMod.presentationController.commonFunctionForNavigation({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"});
		 break;
          case "DomesticFundTransfer":
          var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" });
          break;
           case "DomesticTransferRepeat":
           var moneyMovementModule = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "MoneyMovementUIModule"});
        moneyMovementModule.cancelCommon();
        break;
        case "INTRABANK":
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" });
           break;
        case "RepeatSameBank":
        var moneyMovementModule = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "MoneyMovementUIModule"});
        moneyMovementModule.deletePayeesListSuccess();
		break;
        case "BILL_PAY_KUKL":
        applicationManager.getPresentationUtility().showLoadingScreen();
        var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
        applicationManager.setBillPayFlow ="onCancel";
         bPayModule.onCancelClick();
         break;
      case "CARDLESS_CASH_TRANSACTION":
            var cardLessUiModule = applicationManager.getModulesPresentationController({ "moduleName": "CardLessUIModule", "appName": "ArrangementsMA" });
          cardLessUiModule.cancelCommon();
        }
      }
    },
    resendOTP:function(data)
    {
        var mfaManager = applicationManager.getMFAManager();
      var data = {
        "MFAAttributes" : {
          "serviceName" : mfaManager.getServiceId(),
          "serviceKey" : mfaManager.getServicekey(),
          "OTP" : data
        }
      };
       mfaManager.resendOTP(data);
    },
    verifyOTP : function(data){
      var mfaManager = applicationManager.getMFAManager();
      var data = {
        "MFAAttributes" : {
          "serviceName" : mfaManager.getServiceId(),
          "serviceKey" : mfaManager.getServicekey(),
          "OTP" : data
        }
      };
      mfaManager.verifyOTP(data);
    },
    enteredIncorrectOTP : function(error){
      var controller = applicationManager.getPresentationUtility().getController('frmMFASecurityCode', true);
      controller.showIncorrectOTPError(error);
    },
    navigateToAckScreen : function(response){
      var mfaManager = applicationManager.getMFAManager();
       var flowType = mfaManager.getMFAFlowType();
      var operationType=mfaManager.operationType;
      if(flowType == "INTRA_BANK_FUND_TRANSFER_CREATE" || flowType == "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"){
        flowType ="WITHINSAMEBANK";
        operationType ="";
      }
       if(operationType==="Transfers")
          {
             mfaManager.setMFAOperationType("");
            var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
            transferModule.presentationMakeATransferSuccess(response);
           
          }
          /*else if(operationType==="MONEYMOVEMENT")
          {
             mfaManager.setMFAOperationType("");
            var moneyMovementPresentationController = applicationManager.getModulesPresentationController({"moduleName":"MoneyMovementModule","appName":"TransfersMA"});
            moneyMovementPresentationController.presentationMakeATransferSuccess(response); 
          }*/
      else if(operationType==="EUROPETRANSFER")
      {
        mfaManager.setMFAOperationType("");
        var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        transMod.presentationMakeATransferSuccess(response);
      }
      else if(operationType==="BILLPAY")
        {
           mfaManager.setMFAOperationType("");
         var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
          billPayMod.presentationController.presentationMakeATransferSuccess(response);
         
        }
      else if(operationType==="PAYAPERSON")
        {
           mfaManager.setMFAOperationType("");
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
          p2pMod.presentationController.createP2pSuccCallback(response);
         
        }
      else if(operationType === "LOANPAYOFF") {
        mfaManager.setMFAOperationType("");
        var loansMod = applicationManager.getModulesPresentationController("LoansPayoffModule");
        loansMod.presentationMakeATransferSuccess(response);
      }
      else
        {
         switch (flowType) {
           case "CBC_Create":
             /*
             var navManager = applicationManager.getNavigationManager();
             navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderAcknowledgement"},true,response.responseData);
             */
             var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
               "appName": "TransfersMA",
               "moduleName": "ManageActivitiesUIModule"
             });
             ManageActivitiesPresenter.createConsentsDetailsSuccessCallBack(response);
             break;
           case "CBC_Fetch":
             /*
             var navManager = applicationManager.getNavigationManager();
             navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderAcknowledgement"},true,response.responseData);
             */
             var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
               "appName": "TransfersMA",
               "moduleName": "ManageActivitiesUIModule"
             });
             ManageActivitiesPresenter.getCrossConsentsDetailsSuccessCallBack(response);
             break;
		case "LoginMFA":
          var authMod= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
          authMod.presentationController.mfaLoginFlow(response);
          break;
        case "UPDATE_USERNAME":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.updateUserNameSuccess(response);
          break;
        case "UPDATE_PASSWORD":
          var settingModule =  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"}).presentationController;
          settingModule.updatePasswordSuccess(response);
          break;
           case "LOCK_CARD":
         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
        case "UNLOCK_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
        case "CHANGE_PIN_DEBIT":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
        case "REPORT_LOST":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
        case   "CANCEL_CARD":
           var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
        case  "REPLACE_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
		   case "ESEWA_LOAD":
				var ManageUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
				"appName": "TransfersMA",
				"moduleName": "ManageActivitiesUIModule"
				});
				ManageUIModule.presentationController.eSewaIntraBankTransfersSucc(response);
				break;
        case "CHANGE_PIN_CREDIT":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataSuccessCallback(response);
          break;
         case "ACTIVATE_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.activateCardsSuccess(response);
          break;
         case "APPLY_FOR_DEBIT_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.applyNewHBLCardSuccess(response);
          break;
        case "EMI_TRANSACTION":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
          manageCardsModule.presentationController.getEmiRequestDetailsSuccess(response);
          break;
        case "INTRA_BANK_FUNDTRANSFER_CREDIT_CARD_PAYMENT":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
          manageCardsModule.presentationController.creditCardPayBillSuccessCallback(response);
          break;
          case "FIXEDDEPOSITWITHNONSTP":
          /*
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
          manageCardsModule.presentationController.applyNewCardSuccess(response);
          break;
          */
          var ManageUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
          });
          ManageUIModule.presentationController.createFixedDepositWithNonSTPSuccessCallBack(response);
          break;
        case "FIXEDDEPOSITWITHSTP":
          /*
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
          manageCardsModule.presentationController.applyNewCardSuccess(response);
          */
          var ManageUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
          });
          ManageUIModule.presentationController.createFixedDepositWithSTPSuccessCallBack(response);
          break;
           case "PSD2_TPP_CONSENT_REVOKED":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.updatePSDConsentSuccess(response);
          break;
        case "ADD_PHONE_NUMBER":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.addUserPhoneNumberSuccess(response);
          break;
        case "UPDATE_PHONE_NUMBER":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.updateUserPhoneNumberSuccess(response);
          break;
        case "REMOVE_PHONE_NUMBER":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.deleteUserPhoneNumberSuccess(response);
          break;
        case "ADD_EMAIL":
          var settingModule = applicationManager.getModulesPresentationController({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
          settingModule.addEmailSuccessCallBack(response);
          break;
        case "UPDATE_EMAIL":
          var settingModule = applicationManager.getModulesPresentationController({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
          settingModule.updateEmailPresentationSuccessCallback(response);
          break;
        case "REMOVE_EMAIL":
          var settingModule = applicationManager.getModulesPresentationController({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
          settingModule.deleteEmailPresentationSuccessCallback(response);
          break;
        case "SUSPEND_USER":
              var settingModule = applicationManager.getModulesPresentationController({
                            "moduleName": "SettingsUIModule",
                            "appName": "ManageProfileMA"
          });
          //var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.disableEBankingAccessSuccess(response);
          break;
          case "WITHINSAMEBANK":
          var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "ManageActivitiesUIModule" });
          ManageActivitiesPresenter.getownAccTransferSuccess(response);
          break;
          case "BILL_PAY":
          var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         bPayModule.confirmBillPayCallNEAMBSuccessCallback(response);
         break;
         case "BILL_PAYNCHL":
         var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         bPayModule.getconfirmBillpaySuccessCallbackMB(response);
        break;
        case "TOPUP_VIRTUAL_CARDMB":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
           manageCardsModule.presentationController.cardPrepaidDollarTopupVirtualSuccessCallBack(response);   
         break;
         case "TOPUP_DOMESTIC_CARDMB":
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
           manageCardsModule.presentationController.cardPrepaidTopupDomesticSuccessCallBack(response);   
               break;
			    case "QR_PAYMENT":
            var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
            qrPresentationController.presentationMakeATransferSuccess(response);   
               break;
               case "DomesticFundTransfer":
               var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "ManageActivitiesUIModule" });
          ManageActivitiesPresenter.domesticTransferPaymentSuccess(response);
          break;
          case "DomesticTransferRepeat":
          var MoneyMovementPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "MoneyMovementUIModule"});
          MoneyMovementPresenter.presentationMakeATransferSuccess(response);
          break;
          case "INTRABANK":
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "ManageActivitiesUIModule" });
            ManageActivitiesPresenter.getintraBankTransferSuccess(response);
            break;
            case "RepeatSameBank":
        var moneyMovementModule = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "MoneyMovementUIModule"});
        moneyMovementModule.presentationMakeATransferSuccess(response);
		break;
		case "BILL_PAY_KUKL":
          var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         bPayModule.confirmBillPayCallKUKLSuccessCallback(response);
         break;
        case "CARDLESS_CASH_TRANSACTION":
          var cardLessUiModule =  applicationManager.getModulesPresentationController({ "moduleName": "CardLessUIModule", "appName": "ArrangementsMA" });
          cardLessUiModule.presentationMakeACardlessTransferSuccess(response);
               }
         }   
    },
	navigateToTransactionScreen: function(response) {
		this.onMFAError(response);
	},
    onMFAError : function(error){
      var mfaManager = applicationManager.getMFAManager();
       var flowType = mfaManager.getMFAFlowType();
      var operationType=mfaManager.operationType;
      if(flowType == "INTRA_BANK_FUND_TRANSFER_CREATE" || flowType == "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"){
        flowType ="WITHINSAMEBANK";
        operationType ="";
      }
       if(operationType==="Transfers")
          {
             mfaManager.setMFAOperationType("");
              var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
          transferModule.presentationMakeATransferError(error);
          }
          /*else if(operationType==="MONEYMOVEMENT")
          {
             mfaManager.setMFAOperationType("");
            var moneyMovementPresentationController = applicationManager.getModulesPresentationController({"moduleName":"MoneyMovementModule","appName":"TransfersMA"});
            moneyMovementPresentationController.presentationMakeATransferError(error);
          }*/
      else if(operationType==="EUROPETRANSFER")
      {
        mfaManager.setMFAOperationType("");
        var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
        transMod.presentationMakeATransferError(error);
      }
          else if(operationType==="BILLPAY")
        {
           mfaManager.setMFAOperationType("");
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
          billPayMod.presentationController.presentationMakeATransferError(error);
        }
      else if(operationType==="PAYAPERSON")
        {
           mfaManager.setMFAOperationType("");
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonModule");
          p2pMod.presentationController.createP2pErrCallback(error);
        }
      else if(operationType === "LOANPAYOFF") {
        mfaManager.setMFAOperationType("");
        var loansMod = applicationManager.getModulesPresentationController("LoansPayoffModule");
        loansMod.presentationMakeATransferError(response);
      }
      else
        {
      switch(flowType){
    
        case "LoginMFA":
            var controller = applicationManager.getPresentationUtility().getController('frmMFASecurityCode', true);
            controller.setErrorMessageAndLogout(error);
          break;
           case "UPDATE_USERNAME":
          var settingModule =  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"}).presentationController;
          settingModule.updateUserNameFailure(error);
          break;
        case "UPDATE_PASSWORD":
          var settingModule =  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"}).presentationController;
          settingModule.updatePasswordFailure(error);
          break;
        case "LOCK_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
        case "UNLOCK_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
        case "CHANGE_PIN_DEBIT":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
        case "REPORT_LOST":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
        case   "CANCEL_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
        case  "REPLACE_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
           case "CHANGE_PIN_CREDIT":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.updateCardDataFailureCallback(error);
          break;
           case "ACTIVATE_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.activateCardsFailure(error);
          break;
         case "APPLY_FOR_DEBIT_CARD":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
          manageCardsModule.presentationController.applyNewHBLCardError(error);
          break;
        case "EMI_TRANSACTION":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
          manageCardsModule.presentationController.getEmiRequestDetailsError(error);
          break;
        case "INTRA_BANK_FUNDTRANSFER_CREDIT_CARD_PAYMENT":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
          manageCardsModule.presentationController.creditCardPayBillErrorCallback(error);
          break;
          case "FIXEDDEPOSITWITHNONSTP":
          /*
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
          manageCardsModule.presentationController.applyNewCardError(error);
          */
          var ManageUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
          });
          ManageUIModule.presentationController.createFixedDepositWithNonSTPErrorCallback(error);
          break;
        case "FIXEDDEPOSITWITHSTP":
          /*
         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageActivitiesUIModule", "appName":"TransfersMA"});
         manageCardsModule.presentationController.applyNewCardError(error);
         */
          var ManageUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
          });
          ManageUIModule.presentationController.createFixedDepositWithSTPErrorCallback(error);
          break;
           case "PSD2_TPP_CONSENT_REVOKED":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.updatePSDConsentFailure(error);
          break;
        case "ADD_PHONE_NUMBER":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.addUserPhoneNumberFailure(error);
          break;
        case "UPDATE_PHONE_NUMBER":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.updateUserPhoneNumberFailure(error);
          break;
        case "REMOVE_PHONE_NUMBER":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.deleteUserPhoneNumberFailure(error);
          break;
        case "ADD_EMAIL":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.addEmailFailureCallBack(error);
          break;
        case "UPDATE_EMAIL":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.updateEmailPresentationErrorCallback(error);
          break;
        case "REMOVE_EMAIL":
          var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.deleteEmailPresentationErrorCallback(error);
          break;
        case "SUSPEND_USER":
          var settingModule = applicationManager.getModulesPresentationController({
                            "moduleName": "SettingsUIModule",
                            "appName": "ManageProfileMA"
          });
          //var settingModule = applicationManager.getModulesPresentationController("SettingsModule");
          settingModule.disableEBankingAccessError(error);
          break;
          case "WITHINSAMEBANK":
          var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "ManageActivitiesUIModule" });
          ManageActivitiesPresenter.getownAccTransferError(error);
        break;
         case "BILL_PAY":
         var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         bPayModule.confirmBillPayCallNEAMBFailureCallback(error);
         break;
         case "BILL_PAYNCHL":
         var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         bPayModule.getconfirmBillpayFailureCallbackMB(error)
            break;
         case "TOPUP_VIRTUAL_CARDMB":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ManageCardsUIModule", "appName":"CardsMA"});
           manageCardsModule.presentationController.cardPrepaidDollarTopupVirtualErrorCallBack(error);
         break;
         case "TOPUP_DOMESTIC_CARDMB":
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
          manageCardsModule.presentationController.cardPrepaidTopupDomesticErrorCallBack(error);
          break;
          case "CBC_Create":
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
              "appName": "TransfersMA",
              "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.createConsentsDetailsErrorCallback(error);
            break;
          case "CBC_Fetch":
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
              "appName": "TransfersMA",
              "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getConsentsdetailsErrorCallback(error);
            break;
			case "ESEWA_LOAD":
		  var ManageUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
		  "appName": "TransfersMA",
		  "moduleName": "ManageActivitiesUIModule"
		  });
		  ManageUIModule.presentationController.eSewaIntraBankTransfersfail(error);
		  break;
			case "QR_PAYMENT":
            var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
            qrPresentationController.presentationMakeATransferError(error);
            break;
			case "Legacy_User":
           var authMod =kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
            authMod.presentationController.legacyUserHandler(error);
            break;
             case "DomesticFundTransfer":
         var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "ManageActivitiesUIModule" });
          ManageActivitiesPresenter.domesticTransferPaymentFailure(error);
          break;
           case "DomesticTransferRepeat":
          var MoneyMovementPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "MoneyMovementUIModule"});
          MoneyMovementPresenter.presentationMakeATransferError(error);
          break;
          case "INTRABANK":
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "ManageActivitiesUIModule" });
            ManageActivitiesPresenter.getintraBankTransferError(error);
        break;
        case "RepeatSameBank":
        var moneyMovementModule = applicationManager.getModulesPresentationController({"appName": "TransfersMA","moduleName": "MoneyMovementUIModule"});
        moneyMovementModule.presentationMakeATransferError(error);
		break;
		case "BILL_PAY_KUKL":
		var bPayModule = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
         bPayModule.confirmBillPayCallKUKLFailureCallback(error);
         break;
        case "CARDLESS_CASH_TRANSACTION":
          var cardLessUiModule = applicationManager.getModulesPresentationController({ "moduleName": "CardLessUIModule", "appName": "ArrangementsMA" });
          cardLessUiModule.presentationMakeACardlessTransferError(error);
        }
      }
    },
    requestOTP : function(params){
      var mfaManager = applicationManager.getMFAManager();
      var data = {
        "MFAAttributes" : {
          "serviceName" : mfaManager.getServiceId(),
          "serviceKey" : mfaManager.getServicekey(),
          "OTP" : params
        }
      };
      mfaManager.requestOTP(data);
    },
    mfaOTPError : function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      }
      else{
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.bindError(err.errorMessage);
      }
    },
    verifySecurityQuestions:function(data){
      var mfaManager = applicationManager.getMFAManager();
      var inputparams = {
        "MFAAttributes" : {
          "serviceName" : mfaManager.getServiceId(),
          "serviceKey" : mfaManager.getServicekey(),
          "securityQuestions" : data
        }
      };
      mfaManager.verifySecurityQuestions(inputparams);
    },
    getMFAResponse : function(){
      var mfaManager = applicationManager.getMFAManager();
      return mfaManager.getMFAResponse();
    },
    enteredIncorrectAnswer : function(err){
      var controller = applicationManager.getPresentationUtility().getController('frmSecurityQuestions', true);
      controller.showIncorrectSecurityAnswerError(err);
    },
    getMFAFlowType : function(){
      var mfaManager = applicationManager.getMFAManager();
      return mfaManager.getMFAFlowType();
    },
    getServiceIdBasedOnDisplayName : function(displayName){
      var configManager = applicationManager.getConfigurationManager();
      var mfaManager = applicationManager.getMFAManager();
      var services = configManager.getServicesListForUser();
      for (var i = 0; i < services.length; i++) {
        if(services[i].displayName === displayName){
          mfaManager.setServiceId(services[i].serviceId);
        }
      }
    },
    getDisplayNameBasedOnTransactionMode : function(moduleName){
      var transferModulePresentationController
      if(moduleName)
        transferModulePresentationController = applicationManager.getModulesPresentationController(moduleName);
      else
        transferModulePresentationController = applicationManager.getModulesPresentationController("TransferEuropeUIModule");
      var mfaManager = applicationManager.getMFAManager();
      var displayName = "";
      switch(transferModulePresentationController.transactionMode){
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.MyKonyAccounts") :
          displayName = "KonyBankAccountsTransfer";
          break;
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers") :
          displayName = "OtherKonyAccountsTransfer";
          break;
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts") :
          displayName = "OtherBankAccountsTransfer";
          break;
        case applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer") :
          displayName = "InternationalAccountsTransfer";
          break;
        default :
          displayName = transferModulePresentationController.transactionMode;
          break;
      }
      return displayName;
    },
    navigateToMFAComponent : function(response){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navigationManager = applicationManager.getNavigationManager();
      var mfaManager = applicationManager.getMFAManager();
      var operationType = mfaManager.operationType;
      navigationManager.setCustomInfo("frmMFAValidation",response);
      if(operationType === "MONEYMOVEMENT" || operationType === "EUROPETRANSFER"){
        //navigationManager.navigateTo("frmMFAValidation",true);
        new kony.mvc.Navigation({"appName" : "CommonsMA", "friendlyName" : "frmMFAValidation"}).navigate();
      }/*
      else if (response.flowType === "LOCK_CARD") {
        //navigationManager.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardMngConfirmDetails"});
        var viewController = applicationManager.getPresentationUtility().getController('frmCardMngConfirmDetails', true);
        viewController.SCAComponentLockCall(response);
      } else if (response.flowType === "UNLOCK_CARD") {
        navigationManager.navigateTo({"appName" : "CardsMA", "friendlyName" : "frmCardManageHome"});
        var viewController = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
        viewController.SCAComponentUnLockCall(response);
      }
      else if (response.flowType === "CHANGE_PIN_CREDIT") {
        //var viewController = applicationManager.getPresentationUtility().getController('frmCardMngPinChgOptions', true);
        var viewController = applicationManager.getPresentationUtility().getController('frmCardMngPinChgOptions', true);
        viewController.SCAComponentChangePinCall(response);
      } else if (response.flowType === "CHANGE_PIN_DEBIT") {
        var viewController = applicationManager.getPresentationUtility().getController('frmCardMngNewPin', true);
        viewController.SCAComponentChangePinCall(response);
      } else if (response.flowType === "ACTIVATE_CARD") {
        //var viewController = applicationManager.getPresentationUtility().getController('frmCardManageNewCVV', true);
        var viewController = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
        viewController.SCAComponentActivationCall(response);
      }*/
      else{
        new kony.mvc.Navigation({"appName" : "CommonsMA", "friendlyName" : "frmMFAValidation"}).navigate(); 
      }
    },
  };
  PresentationUtility.prototype.formatText=function(accountName,noOfChars,accountNumber,beginIndex){
    var truncatedAccName = "";
    var truncatedAccNum="";
    var formattedAccName ="";
    if (accountName && accountNumber && accountName.length > noOfChars) {
      truncatedAccName = accountName.substring(0, noOfChars - 1);
    } else {
      truncatedAccName = accountName;
    }
    if (accountNumber && accountNumber.length > beginIndex) {
      truncatedAccNum = accountNumber.substr(accountNumber.length - beginIndex);
    } else {
      if(accountNumber){
        truncatedAccNum = accountNumber;
      }
    }
    if(truncatedAccNum){
      formattedAccName = truncatedAccName + "..." + truncatedAccNum;
    }
    else{
      formattedAccName = truncatedAccName ;
    }
    return formattedAccName;
  };
  return PresentationUtility;
});