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
      this.setRelationshipData();
      this.view.postShow = this.postShow;
    },

    postShow: function () {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.segRelationshipTypes.onRowClick = this.segRelationshipTypeOnClick;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.InternationalTransfer.RelationShip");
        this.view.flxHeader.isVisible = true;
        this.view.flxRelationshipContainer.top ="7%";
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.InternationalTransfer.RelationShip");
        this.view.flxHeader.isVisible = false;
        this.view.flxRelationshipContainer.top ="2%";
      }
    },

    flxBackOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
      kony.application.destroyForm({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferInternational/frmChooseRelationship"
      });
    },

    setRelationshipData: function () {
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("getRelationshipData");
      this.view.segRelationshipTypes.widgetDataMap = {
        "lblFrequency": "name"
      };
      this.view.segRelationshipTypes.setData(data);
    },

    segRelationshipTypeOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      var data = this.view.segRelationshipTypes.selectedRowItems[0];

      var relationshipName = data.name;
      var relationshipCode = data.code;
      navManager.setCustomInfo("getRelationship", relationshipName);
      navManager.setCustomInfo("getRelationshipCode", relationshipCode);
      navManager.setCustomInfo("relationshipFlow", true);

      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });

    },

    checkForExchangeRateError: function () {

    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));

    },
  };
});

