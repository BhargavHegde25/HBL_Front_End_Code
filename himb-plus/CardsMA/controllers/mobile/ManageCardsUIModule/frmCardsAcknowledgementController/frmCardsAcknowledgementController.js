
define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    response:"",
    init: function () {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm = currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateToDashboard);
      this.view.onNavigate = this.onNavigate;
    },

    preShow: function () {
      this.view.postShow = this.postShow;
      this.setTitleBarVisibility();
      this.dataMapping();
    },

    onNavigate: function (uidata) {
      if (!kony.sdk.isNullOrUndefined(uidata)) {
        this.response = uidata;
        this.updateAcknowledgementData(uidata);
      }
    },
    postShow: function () {
      this.view.btnGoToDashboard.onClick = this.navigateToDashboard;
      this.view.btnGoToCards.onClick = this.navigateToCardsDashboard;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setTitleBarVisibility: function () {
      try {
      var navMan = applicationManager.getNavigationManager();
      var flow = navMan.getCustomInfo("cardSelectionType");
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        if (flow === "debitCard") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
        } else if (flow === "physicalPrepaidCard") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
        } else if (flow === "isConvertEmiFlow") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
          } else if (flow === "virtualPrepaidCard") {
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
        }
        this.view.flxHeader.isVisible = true;
      } else {
        if (flow === "debitCard") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
        } else if (flow === "physicalPrepaidCard") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
        } else if (flow === "isConvertEmiFlow") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
          } else if (flow === "virtualPrepaidCard") {
            this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
        }
          //this.view.flxHeader.isVisible = false;
        }
      } catch (err) {
        kony.print(err)
      }
    },

    dataMapping: function () {
         this.view.lblMainHeader.isVisible = false;
    },

    navigateToDashboard: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
    },
    
    navigateToCardsDashboard: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"}); 
    },

    updateAcknowledgementData: function (data) {
      if ((data !== null) && (data !== "") && (data !== undefined)) {
        var response = data;
        this.view.lblRequestIdValue.text = response.ReferenceNumber;
      }
      this.addDataIntoSegment();
    },

    addDataIntoSegment: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        this.view.segCardDetails.rowSkin = "sknSegffffff";
        this.view.segCardDetails.rowFocusSkin = "sknSegffffff";
        this.view.segCardDetails.widgetDataMap = {
          lblKey: "lblKey",
          lblValue: "lblValue"
        };
        this.createViewForDedit();
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    
    createViewForDedit: function () {
      var navManager = applicationManager.getNavigationManager();
      var cardData = navManager.getCustomInfo("formattedCardDetailsForacknowledgment");
      let flow = navManager.getCustomInfo("cardSelectionType");
      if (flow === "isConvertEmiFlow") {
        this.view.rtxSuccessMsg.text = kony.i18n.getLocalizedString("kony.i18n.convertToEmiAck1")
          + cardData.formattedAmount + " on "
          + cardData.formattedPostingDate + kony.i18n.getLocalizedString("kony.i18n.convertToEmiAck2");
      }
      var segmentData = [];
      for (var key in cardData) {
        if (cardData.hasOwnProperty(key)) {
          segmentData.push({
            "lblKey": key,
            "lblValue": cardData[key]
          });
        }
      }
      this.view.segCardDetails.setData(segmentData);
    },
  };
});

