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
      this.view.postShow = this.postShow;

      var previousForm = kony.application.getPreviousForm().id;
      if (previousForm === "frmReceieversVpa") {
        this.view.txtReceiversName.text = "";
        this.disableContinueButton();
      } else if (previousForm === "frmFTAmount") {
        if ((this.view.txtReceiversName.text !== '') && (this.view.txtReceiversName.text !== null) && (this.view.txtReceiversName.text !== undefined)) {
          this.enableContinueButton();
        }
      }
      this.view.txtReceiversName.onTextChange = this.navigateToReceiversName;
    },

    postShow: function () {
      //applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.onClickCancel;
      this.view.btnContinue.onClick = this.btnContinue;
    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.InternationalTransfer.ReceiversNameWithoutColon");
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.InternationalTransfer.ReceiversNameWithoutColon");
        this.view.flxHeader.isVisible = false;
      }
    },

    flxBackOnClick: function () {

      var navMan = applicationManager.getNavigationManager();
      var flag = navMan.getCustomInfo("editFlowName");
      if (flag) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
      } else {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceieversVpa" });
      }

    },

    onClickCancel: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" }); //frmReceiversCountry   frmSelectTransferTypeNew
      kony.application.destroyForm({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferInternational/frmReceieversName"
      });
    },

    btnContinue: function () {
      var navManager = applicationManager.getNavigationManager();
      var receiversName = this.view.txtReceiversName.text;
      navManager.setCustomInfo("receiversNameFT", receiversName);
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
    },

    navigateToReceiversName: function () {
      var receiversName = this.view.txtReceiversName.text;
      if (receiversName.length > 0) {
        this.enableContinueButton();
      }
      else {
        this.disableContinueButton();
      }
    },

    enableContinueButton: function () {
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn055BAF26px";
    },
    disableContinueButton: function () {
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    },


  };
});

