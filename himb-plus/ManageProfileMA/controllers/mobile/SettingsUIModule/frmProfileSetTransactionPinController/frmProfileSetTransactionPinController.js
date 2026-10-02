define({
  timerCounter: 0,
  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },

  preShow: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getDeviceUtilManager().detectDynamicInstrumentation();
    this.setTitleForTransactionPin();
    this.setSuccessTransactionPin();
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  navToSettings: function () {
    this.goBack();
  },
  
  navToSettingsAfterPin : function(){
   kony.timer.cancel("starttime");
	 var navManager = applicationManager.getNavigationManager(); 
	 navManager.navigateTo({ 
      "appName": "ManageProfileMA",
      "friendlyName": "SettingsUIModule/frmSettings"});
  },
  goBack: function () {
    var navManager = applicationManager.getNavigationManager();
    //navManager.navigateTo("frmSettings");
	var prevForm=kony.application.getPreviousForm();
	if(prevForm&&prevForm.id=="frmSettings"){
    navManager.navigateTo({ 
      "appName": "ManageProfileMA",
      "friendlyName": "SettingsUIModule/frmSettings"});
	}
	else{
		navManager.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
	}
  },
  setTitleForTransactionPin: function () {
    var navManager = applicationManager.getNavigationManager();
    var transactionPinFlag = navManager.getCustomInfo("transactionPinSetOrNot");
    if (transactionPinFlag === "true") {
      this.view.title = kony.i18n.getLocalizedString("kony.mb.Profile.ChangeTransactionPIN");
    } else {
      this.view.title = kony.i18n.getLocalizedString("kony.mb.Profile.setTransactionPIN");
    }
  },
 
  checkForToastMessage: function (response) {
    var navManager = applicationManager.getNavigationManager();
    var oldPinMismatchError = navManager.getCustomInfo("oldPinError");
    this.view.setTransactionPin.resetUI();
    if (response && response.ErrMsg && response.ErrMsg.trim() !== "") {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, response.ErrMsg);
    } else if (oldPinMismatchError === "Current Transaction Pin not matching with the records") {
      applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("kony.mb.Profile.CurrentTransactionPinErrorMessage"));
    } else {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinFailureMessage"));
    }
  },

  setSuccessTransactionPin: function(){
    try{
      var scope =this;
	  applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var showSetTransactionSuccessMessage =navManager.getCustomInfo("showSetTransactionSuccessMessage");
      var showChangeTransactionSuccessMessage = navManager.getCustomInfo("showChangeTransactionSuccessMessage");
      if(!kony.sdk.isNullOrUndefined(showSetTransactionSuccessMessage)){
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinSetSuccessMessage"));
        navManager.setCustomInfo('showSetTransactionSuccessMessage', null);
        kony.timer.schedule("starttime", function() {
          scope.navToSettingsAfterPin();
      }, 4, false);
      }else if(!kony.sdk.isNullOrUndefined(showChangeTransactionSuccessMessage)){
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinResetSuccessMessage"));
        navManager.setCustomInfo('showChangeTransactionSuccessMessage', null);
        kony.timer.schedule("starttime", function() {
          scope.navToSettingsAfterPin();
      }, 4, false);
      }else{}
    }catch(err){
      kony.print("err"+err);
    }
  },
});