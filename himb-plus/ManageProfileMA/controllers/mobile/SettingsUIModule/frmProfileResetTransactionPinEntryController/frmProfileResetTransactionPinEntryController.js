define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

    preShow: function () {
      this.view.postShow = this.postShow;
    },

    postShow: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    cancelOnClick: function () {
       var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
       settingsModule.presentationController.showSettings();
    },

    checkForToastMessageResetCommonError: function () {
       applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.pinFail"));
    },

     checkForToastMessageResetError: function (msg) {
       applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
       applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  }
});