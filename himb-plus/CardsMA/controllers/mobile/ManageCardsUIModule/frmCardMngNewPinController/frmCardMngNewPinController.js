define(["CommonUtilities"],function(CommonUtilities){
  return{
    scinstance:null,
    pinLength:4,
	init : function() {
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
        },
      addComponentforSCA : function()
      {
        if(this.scinstance!=null)
          return;
          var currform = kony.application.getCurrentForm();
        this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
          "height": "100%",
          "id": "SCAComponent",
          "isVisible": true,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "slFboxmb",
          "top": "0dp",
          "width": "100%",
          "appName": "ResourcesHIDMA",
          "viewType": "SCAComponent",
          "shouldGroup": false,
          "overrides": {
            "SCAComponent": {
              "right": "viz.val_cleared",
              "bottom": "viz.val_cleared",
              "minWidth": "viz.val_cleared",
              "minHeight": "viz.val_cleared",
              "maxWidth": "viz.val_cleared",
              "maxHeight": "viz.val_cleared",
              "centerX": "viz.val_cleared",
              "centerY": "viz.val_cleared"
            }
      }
        }, {
          "paddingInPixel": false,
          "overrides": {}
        }, {
          "overrides": {}
        });
        this.scinstance.flowType = "";
        this.scinstance.servicekey = "";
        currform.add(this.scinstance);

    },
    preShow : function(){
var loggerManager = applicationManager.getLoggerManager();
try {
loggerManager.log("#### start frmCardMngNewPinController : preShow ####");
var navManager = applicationManager.getNavigationManager();
var configManager=applicationManager.getConfigurationManager();
var frmData = navManager.getCustomInfo("frmCardMngReasons");
this.cardData = frmData;
this.renderTitleBar();
this.view.txtNewPin.text="";
this.clearConfirmPin();
//6 for the BINs listed in CARD_PIN_LENGTH_6_BINS, resolved on the cards home while the full card object was in scope
var resolvedPinLength = navManager.getCustomInfo("cardPinLength");
this.pinLength = resolvedPinLength ? resolvedPinLength : configManager.pinChangeLength;
//TEMP DIAGNOSTIC - remove. Uncomment to see which PIN length was resolved and which BIN list was in force.
//try {
//  applicationManager.getPresentationUtility().Alert({
//    "alertType": constants.ALERT_TYPE_INFO,
//    "alertTitle": "DIAG PIN length",
//    "message": "pinLength used = " + this.pinLength +
//      "\nfrom cardPinLength = " + resolvedPinLength +
//      "\nconfig pinChangeLength = " + configManager.pinChangeLength +
//      "\n\n" + (navManager.getCustomInfo("diagPinContext") || "no pin context") +
//      "\n--- client props ---\n" + (navManager.getCustomInfo("diagClientProps") || "loader never ran"),
//    "alertHandler": function () { return true; },
//    "yesLabel": "OK"
//  }, {});
//} catch (diagError) { kony.print("[DIAG] pin alert failed: " + diagError); }
this.view.txtNewPin.maxTextLength=this.pinLength;
this.view.txtConfirmPin.maxTextLength=this.pinLength;
 //this.view.txtCurrentPinValue.maxTextLength=configManager.pinChangeLength;
//this.view.txtCurrentPinValue.onTextChange = this.validatePins;
this.view.imgMaskUnmask.onTouchEnd = this.imgMaskUnmaskToggle;
this.view.imgMaskUnmask.src = "viewicon.png";
this.view.txtConfirmPin.onTextChange = this.validatePins;
this.view.txtNewPin.onTextChange = this.clearConfirmPin;
this.view.btnContinue.setEnabled(false);
this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";//sknHBLBtnf4f5f8Rounded8pxffffff100pr //"sknBtne9e9e9a0a0a0SSReg30px";
this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
this.view.customHeader.btnRight.onClick = this.cancelOnClick;
this.view.btnContinue.onClick = this.updateCurrentCard;
              //   if (1 === CommonUtilities.getSCAType()) {
              //       this.addComponentforSCA();
              //       this.view.SCAComponent.zIndex = 1;
              //   this.view.flxMain.zIndex = 5;
              //   this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
              //   this.view.SCAComponent.onFailureCallback = this.scaFailureCallback;
              // }
this.clearPin();
applicationManager.getPresentationUtility().dismissLoadingScreen();
var currentForm=navManager.getCurrentForm();
applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
	clearConfirmPin : function(){
      if(this.view.txtNewPin.text !== this.temp){
        this.view.txtConfirmPin.text = "";
        this.view.imgPinMatch.src="tickmark.png";
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
      }
    },
    clearPin: function () {
      this.view.txtNewPin.text = "";
      this.view.txtConfirmPin.text = "";
      // this.view.imgPinMatch.src = "tickmark.png";
      this.view.imgMaskUnmask.src = "viewicon.png";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
      this.view.txtNewPin.secureTextEntry = true;
    },
    updateCurrentCard : function(){
      var loggerManager = applicationManager.getLoggerManager();
     // try {
        loggerManager.log("#### start frmCardMngNewPinController : updateCurrentCard ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
         var frmData = {
                        "isMainScreen": undefined
                    };
        if(!this.isConsecutive(this.view.txtConfirmPin.text, this.pinLength)){
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          this.cardData.cardPin=this.view.txtConfirmPin.text;
         // this.cardData.pinNumber=this.view.txtCurrentPinValue.text;
          applicationManager.getNavigationManager().setCustomInfo("frmCardManageHome", frmData);
      	  manageCardsModule.presentationController.updateCardData(this.cardData);
        }
        else{
			applicationManager.getPresentationUtility().dismissLoadingScreen();
          applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.ErrorConsecutivePinNo"));
        }
   //   }
     // catch(err) {
   //     applicationManager.getPresentationUtility().dismissLoadingScreen();
     //   throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
     // }
    },
//     updateCardSuccess : function(response){
//       var loggerManager = applicationManager.getLoggerManager();
//       try {
//         loggerManager.log("#### start frmCardMngNewPinController : updateCardSuccess ####");
//         var navManager = applicationManager.getNavigationManager();
//         var nextfrmData = navManager.getCustomInfo("frmCardManageHome");
//         nextfrmData.cardData = this.cardData;
//         navManager.setCustomInfo("frmCardManageHome", nextfrmData);
//         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsModule");
//     	manageCardsModule.presentationController.showCardsHome();
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
//     updateCardFailure : function(response){
//       var loggerManager = applicationManager.getLoggerManager();
//       try {
//         loggerManager.log("#### start frmCardMngNewPinController : updateCardFailure ####");
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         if(response["isServerUnreachable"])
//           applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
//         else{
//           //alert("Something went wrong - card request");
//           applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
//         }
//       }
//       catch(err) {
//         applicationManager.getPresentationUtility().dismissLoadingScreen();
//         throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
//       }
//     },
    renderTitleBar: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngNewPinController : renderTitleBar ####");
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.flxHeader.setVisibility(false);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    imgMaskUnmaskToggle: function() {
      this.temp = this.view.txtNewPin.text;
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngNewPinController : imgMaskUnmaskToggle ####");
        if (this.view.imgMaskUnmask.src === "viewicon.png") {
          this.view.imgMaskUnmask.src = "viewactive.png";//eyeOpen
          this.view.txtNewPin.secureTextEntry = false;
          this.view.flxNewPin.forceLayout();
        } else {
          this.view.imgMaskUnmask.src = "viewicon.png";//eyeClosed
          this.view.txtNewPin.secureTextEntry = true;
          this.view.flxNewPin.forceLayout();
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
      }
    },
    validatePins:function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMngNewPinController : validatePins ####");
          		var newPin = this.view.txtNewPin.text;
        var confirmNewPin = this.view.txtConfirmPin.text;
       // var oldPin = this.view.txtCurrentPinValue.text;
        if(newPin === confirmNewPin && newPin.length === this.pinLength)
        {
          this.view.imgPinMatch.src="greentick.png";
          this.view.btnContinue.setEnabled(true);
          this.view.btnContinue.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";//"sknBtn0095e4RoundedffffffSSP26px";
        }
        else
        {
          this.view.imgPinMatch.src="tickmark.png";
          this.view.btnContinue.setEnabled(false);
          this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        }
        this.view.flxConfirmPin.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
      }
    },
  	isConsecutive: function(pin,length){
      for(var i = 0; i < length-1; i++){
        if(parseInt(pin[i])+1 === parseInt(pin[i+1])){
          continue;
        }else
          return false;
      }
      return true;
    },
  	flxBackOnClick: function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
  	},
  	cancelOnClick: function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var frmData = {
          "isMainScreen": false
        };
        navManager.setCustomInfo("frmCardManageHome",frmData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.showCardsHome();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
     SCAComponentChangePinCall : function(response){
      var scopeObj =this;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      response.userName = userName;
      response.userDetails={
        "data1": response.flowType,
        "data2": response.action
      };
      applicationManager.getMFAManager().setMFAFlowType(response.flowType);
      if (1===CommonUtilities.getSCAType()){
        try{
          scopeObj.view.SCAComponent.setVisibility(true);
          scopeObj.view.SCAComponent.setContext(response);
        }catch(e){
          kony.print(" Change PIN SCAComponent Call-->"+e);
          kony.print(e);
        }
      }
    },
    scaSuccessCallback: function(response){
      applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
    },
    scaFailureCallback : function(response){
      this.view.SCAComponent.zIndex = 0;
          this.view.flxMain.zIndex = 5;

      if(response.hasOwnProperty("isLogoutUser") && response.isLogoutUser ){
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
        loginData = loginData ? loginData : {};
        loginData.toastMessage = response.errorMessage;
        applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
        const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
        authMod.presentationController.onLogout();
      } else {
        applicationManager.getPresentationUtility().MFA.onMFAError(response);
      }
    }
  }
});