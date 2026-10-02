define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init: function () {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm = currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
    },

    preShow: function () {
      this.setTitleBarVisibility();
      this.setPurposeData();
      this.view.postShow = this.postShow;
    },

    postShow: function () {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.segPurposeTypes.onRowClick = this.segPurposeTypeOnClick;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.InternationalTransfer.Purpose");
        this.view.flxHeader.isVisible = true;
        this.view.flxPurposeContainer.top = "7%";
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.InternationalTransfer.Purpose");
        this.view.flxHeader.isVisible = false;
        this.view.flxPurposeContainer.top ="2%";
      }
    },

    flxBackOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
      kony.application.destroyForm({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferInternational/frmChoosePurpose"
      });
    },

    setPurposeData: function () {
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("getPurposeData");
      this.view.segPurposeTypes.widgetDataMap = {
        "lblFrequency": "name"
      };
      this.view.segPurposeTypes.setData(data);
    },

    getWidgetDataMap: function () {
      return {
        lblFrequency: "name"
      }
    },

    segPurposeTypeOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      var data = this.view.segPurposeTypes.selectedRowItems[0];
      var purposeCode = data.code;
      var purposeName = data.name;
      navManager.setCustomInfo("getPurpose", purposeName);
      navManager.setCustomInfo("getPurposeCode", purposeCode);
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
    },

    checkForExchangeRateError: function () {

      applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));

    },
  };
});

