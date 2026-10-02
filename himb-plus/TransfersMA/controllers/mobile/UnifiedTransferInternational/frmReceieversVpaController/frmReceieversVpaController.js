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
      if (previousForm === "frmReceiversCountry") {
        this.view.txtReceiversVpa.text = "";
        this.disableContinueButton();
      }else if(previousForm === "frmReceiversName" || previousForm === "frmVerifyDetails"){
        if ((this.view.txtReceiversVpa.text !== '') && (this.view.txtReceiversVpa.text !== null) && (this.view.txtReceiversVpa.text !== undefined)) {
          this.enableContinueButton();
        } 
      }
    
      this.view.txtReceiversVpa.onTextChange = this.navigateToReceiversVpa;
    },

    postShow: function () {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.onClickCancel;
      this.view.btnContinue.onClick = this.btnContinue;

    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.InternationalTransfer.ReceiversVpaWithoutColon");
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.InternationalTransfer.ReceiversVpaWithoutColon");
        this.view.flxHeader.isVisible = false;
      }
    },

    flxBackOnClick: function () {
    

      var navMan = applicationManager.getNavigationManager();
      var flag = navMan.getCustomInfo("editFlowVpa");
      if (flag) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
      }else{
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceiversCountry" });
      }
    },

    onClickCancel: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" }); //frmReceiversCountry   frmSelectTransferTypeNew
      kony.application.destroyForm({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferInternational/frmReceieversVpa"
    });
    },

    btnContinue: function () {
      var navManager = applicationManager.getNavigationManager();
      var receiversVpa = this.view.txtReceiversVpa.text;
      navManager.setCustomInfo("receiversVpaFT", receiversVpa);
      var previousForm = kony.application.getPreviousForm().id;
      if (previousForm === "frmReceiversCountry") {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceiversName" });
      }else if(previousForm === "frmFTAmount"){
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" });
      }else if(previousForm === "frmReceiversName"){
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceiversName"});
      }
    },

    navigateToReceiversVpa: function () {
      var receiversVpa = this.view.txtReceiversVpa.text;
      if (receiversVpa.length > 0) {
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

