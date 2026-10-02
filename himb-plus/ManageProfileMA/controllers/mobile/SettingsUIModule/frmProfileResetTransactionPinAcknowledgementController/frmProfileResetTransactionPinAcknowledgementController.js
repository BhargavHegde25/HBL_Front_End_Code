define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {

    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
      this.view.onNavigate = this.onNavigate;
    },

    preShow: function () {
      this.view.postShow = this.postShow;
      this.setTitleBarVisibility();
    },

    postShow: function () {
      this.view.btnGoToAccountsDashboard.onClick = this.btnGoToAccountsDashboardOnClick;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    
    onNavigate : function (uidata) {
      if (!kony.sdk.isNullOrUndefined(uidata)) {
        this.response = uidata;
        this.updateAcknowledgementData(uidata);
      }
    },

    updateAcknowledgementData : function (data) {
      if ((data !== null) && (data !== "") && (data !== undefined)) {
        var response = data;
        if (!kony.sdk.isNullOrUndefined(response.referenceId)) {
          var referenceId = response.referenceId;
          /*
          var rchTextContent = kony.i18n.getLocalizedString("i18n.HBL.Profile.resetPinAcknowledgment").replace("XXXXXXXXXXX", referenceId);
          let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
          if (Object.keys(clientProperties).length > 0) {
            if (!kony.sdk.isNullOrUndefined(clientProperties)) {
              var restPinEstimatedTime = clientProperties.RESET_PIN_ESTIMATED_TIME;
              if (!kony.sdk.isNullOrUndefined(restPinEstimatedTime)) {
                var estimatedTime = restPinEstimatedTime;
              }
            }
          }
          this.view.rchTxtContent.text = rchTextContent.replace("X business days", estimatedTime);
          */
          var rchTextContent = kony.i18n.getLocalizedString("i18n.HBL.Profile.resetPinAcknowledgmentNew").replace("XXXXXXXXXXX", referenceId);
          this.view.rchTxtContent.text = rchTextContent;
        } 
      }
    },

    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.flxHeader.isVisible = true;
        this.view.flxFooter.top = "0%";
        //this.view.flxMainContainer.top = "7%";
      } else {
        this.view.title = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.flxHeader.isVisible = false;
        //this.view.flxMainContainer.top = "0dp";
        this.view.flxFooter.top = "5%";
      }
    },

    btnGoToAccountsDashboardOnClick: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var configurationManager = applicationManager.getConfigurationManager();
      const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
      if (isAccUIModulePresent) {
        var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
          appName: "HomepageMA",
          moduleName: "AccountsUIModule"
      });
        accMode.presentationController.dashboardService();
      }
    },
  }
});