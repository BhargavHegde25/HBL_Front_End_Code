define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {

  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },

  preShow: function () {
    this.view.postShow = this.postShow;
    this.setTitleBarVisibility();
  },

  postShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
    }
    this.view.btnContinue.onClick = this.btnContinueOnClick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  flxBackOnClick: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({
      "appName": "ManageProfileMA",
      "friendlyName": "SettingsUIModule/frmSettings"
    });
  },

  btnContinueOnClick: function () {
    let navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({
      "appName": "ManageProfileMA",
      "friendlyName": "SettingsUIModule/frmProfileSetTransactionPin"
    });
  },

  flxCancelOnClick: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({
      "appName": "HomepageMA", 
      "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard"
    });
  },

   setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPIN");
        this.view.flxHeader.isVisible = true;
        //this.view.flxMainContainer.top = "7%";
        this.view.flxFooter.top = "0%";
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPIN");
        this.view.flxHeader.isVisible = false;
        //this.view.flxMainContainer.top = "0dp";
          this.view.flxFooter.top = "5%";
      }
    },

    }
});