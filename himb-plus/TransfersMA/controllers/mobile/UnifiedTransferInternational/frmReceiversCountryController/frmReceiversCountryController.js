define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init: function () {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm = currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
    },

    preShow: function () {
      this.view.postShow = this.postShow;
      this.setTitleBarVisibility();
    },

    postShow: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
      this.view.btnContinue.onClick = this.btnContinue;
    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.InternationalTransfer.ReceiversCountryWithoutColon");
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.InternationalTransfer.ReceiversCountryWithoutColon");
        this.view.flxHeader.isVisible = false;
      }
    },

    flxBackOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" });
    },

    btnContinue : function () {
      var countryName = this.view.lblCountryName.text;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("defaultAccFlow",true);
      navManager.setCustomInfo("countryFT", countryName);
      navManager.setCustomInfo( "amountSelectedInternationalFT",null);
      navManager.setCustomInfo("getPurpose", null);
      navManager.setCustomInfo("getPurposeCode", null);
      navManager.setCustomInfo("getRelationship", null);
      navManager.setCustomInfo("getRelationshipCode", null);
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceieversVpa" });
    },
  };
});

