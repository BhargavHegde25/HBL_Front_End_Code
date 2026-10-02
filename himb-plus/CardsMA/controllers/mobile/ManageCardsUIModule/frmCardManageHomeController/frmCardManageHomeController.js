define(['CommonUtilities', 'CampaignUtility'], function (CommonUtilities, CampaignUtility) {
  return {
    timerCounter: 0,
    dialPadNo: "",
    lengthOfDialNo: 0,
    cardList: [],
    cardListImages: [],
    cardListIndex: 0,
    cardListLastIndex: 0,
    cardListTotalCards: 0,
    cardListWidth: 0,
    cardListCards: [],
    cardListStartScale: 0.83,
    cardListScaleGrowth: 0.2,
    cardListNumbers: [],
    cardsWidgets: [],
    isAppendData: false,
    currCardNumber: "",
    cardId: "",
    popUpMsg: '',
    cardTypeFlag: null,
    objToSend: {},
    expiryFlag: false,
    isManageTabShown: false,
    buisnessuser: 0,
    users: {},
    scinstance: null,
    isCovertEMIFlow: false,
    isViewTransactionFlow: false,
    isCreditCardPaymentFlow: false,
    previousForm:"",
    init: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : init ####");
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    addComponentforSCA: function () {
      if (this.scinstance != null)
        return;
      var currform = kony.application.getCurrentForm();
      this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
        "height": "100%",
        "id": "SCAComponent",
        "isVisible": true,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": false,
        "skin": "slFboxmb",
        "top": "0dp",
        "width": "100%",
        "appName": "ResourcesHIDMA",
        "viewType": "SCAComponent",
        "shouldGroup": false,
        "overrides": {
          "SCAComponent": {
            "right": "viz.val_cleared",
            "bottom": "viz.val_cleared",
            "minWidth": "viz.val_cleared",
            "minHeight": "viz.val_cleared",
            "maxWidth": "viz.val_cleared",
            "maxHeight": "viz.val_cleared",
            "centerX": "viz.val_cleared",
            "centerY": "viz.val_cleared"
          }
        }
      }, {
        "paddingInPixel": false,
        "overrides": {}
      }, {
        "overrides": {}
      });
      this.scinstance.flowType = "";
      this.scinstance.servicekey = "";
      currform.add(this.scinstance);

    },
    setFlowActions: function () {
      var scope = this;
      try{
      var scopeObj = this;
      this.view.flxNoCards.onClick = function () { kony.print("Clicked on Flx No Crads"); };
      var configManager = applicationManager.getConfigurationManager();
      if (configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS)) {
        this.view.flxCallCusCare.setVisibility(true);
        this.view.btnCallCustomerCare.onClick = this.callCustomerCare;
      }
      else {
        this.view.flxCallCusCare.setVisibility(false);
      }
      this.view.flxReplaceCard.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
      this.view.flxCancelCard.isVisible = false;
      this.view.flxCancelCardSeparator.setVisibility(false);
      this.view.switchActiveorInactive.onSlide = this.flxActiveOrInactiveOnClick;
      //this.view.flxReplaceCard.onClick = this.flxReplaceCardOnClick;
      this.view.flxReportStolenOrLost.onClick = this.flxReportStolenOrLostOnClick;
      //this.view.flxCancelCard.onClick = this.flxCancelCardOnClick;
      this.view.flxChangePin.onClick = this.flxChangePinOnClick;
      this.view.customHeader.flxBack.onClick = this.navigateToMenu;
      this.view.customHeader.flxSearch.onClick = this.navigateToFilterOrApplyCard.bind(this);
      // this.view.flxSetPurchaseLimit.onClick = this.flxSetPurchaseLimitOnClick;
      // this.view.flxSetATMWithdrawalLimit.onClick = this.flxSetATMWithdrawalLimitOnClick;
      //this.view.btnManageTravelPlans.onClick = this.navigateToTravelManageHome;
      this.view.flxViewStatements.onClick = this.viewStatements;
      this.view.flxCardDetails.onClick = this.navigateToCardMngDetails;
      this.view.flxTopUpCards.onClick = this.navigateToTopUpCardFlow;
      this.view.flxConvertEMI.onClick = this.convertEmiGetTransaction;
      this.view.flxPayBill.onClick = this.navigateToCreditCardPayment;
      this.view.btnActivateCard.onClick = this.activateCards;
      this.view.btnActivateBlockedLostCard.onClick = this.activateCards;
      this.view.btnTransactionTab.onClick = function () {
        scopeObj.isViewTransactionFlow = true;
        scopeObj.getTransactions();
      };
      this.view.btnManageTab.onClick = this.hideTransactions;
      this.view.segTransactionsScreen.onRowClick = this.onSegmentRowClick;
      this.view.btnAboutExpire.onClick = this.activateExpiryCards;
      // this.view.flxMainContainer.onScrollEnd = this.checkForReachEnd;
      this.view.btnFilterCards.onClick = this.navigateToFilterCards;
      this.view.btnViewCardDetails.onClick = this.navigateToCardMngDetails;
      this.view.btnApplyForCard.onClick = this.applyForNewCard;
      this.view.btnCancelMngCards.onClick = this.cancelFlex;
      this.view.btnApplyCard.onClick = this.applyForNewCard;
      this.view.flxApplePay.onClick = this.applePay;
      this.view.flxSamsungPay.onClick = this.samsumgPay;
      this.view.flxGooglePay.onClick = this.googlePay;
      this.view.lblCardActivateText.text = kony.i18n.getLocalizedString("i18n.cards.activateCardMsg");
      if (1 === CommonUtilities.getSCAType()) {
        this.addComponentforSCA();
        this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
        this.view.SCAComponent.onFailureCallback = this.scaFailureCallback;
        this.view.SCAComponent.zIndex = 1;
        this.view.flxMainContainer.zIndex = 5;
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("setFlowActions: " + e);
      }
    },

    convertEmiGetTransaction: function () {
      this.isCovertEMIFlow = true;
      applicationManager.getNavigationManager().setCustomInfo("isCovertEMIFlow", this.isCovertEMIFlow);
      this.getTransactions();
    },

    navigateToTopUpCardFlow: function () {
      var cardDetails;
      var loggerManager = applicationManager.getLoggerManager();
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "ManageActivitiesUIModule"
      });
      ManageActivitiesPresenter.selectedCardCcy = "NPR";
              navManager.setCustomInfo("topUpVirtualDollorCardData", "");
        if (this.getCurrentCardDetails().Card_Category.split(" ")[0] == "Virtual") {
          var navManager = applicationManager.getNavigationManager();

          navManager.setCustomInfo("cardsDetails", this.getCurrentCardDetails());
          navManager.setCustomInfo("flowtype", "frmTopUpVirtualCardConsentScreen");
          navManager.setCustomInfo("cardSelectionType", "TopUpCards");
          ManageActivitiesPresenter.fromAccSelectionFlow = "frmTopUpVirtualCardConsentScreen";
          ManageActivitiesPresenter.getFromAccountsCardTopUp();

          // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          // manageCardsModule.presentationController.navigateToNewCardFlow();
          //  navManager.navigateTo({"appName": "CardsMA","friendlyName": "frmTopUpVirtualCardConsentScreen"});
          //navManager.navigateTo("frmTopUpVirtualDollarCardConsentScreen");
        } else {
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("cardsDetails", this.getCurrentCardDetails());
          navManager.setCustomInfo("flowtype", "frmPrepaidTopupDomesticInputScreen");
          navManager.setCustomInfo("cardSelectionType", "TopUpCards");
          ManageActivitiesPresenter.fromAccSelectionFlow = "frmPrepaidTopupDomesticInputScreen";
          // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          // manageCardsModule.presentationController.navigateToNewCardFlow();
      ManageActivitiesPresenter.getFromAccountsCardTopUp();
        }
        ManageActivitiesPresenter.selectedCardCcy = "";
        ManageActivitiesPresenter.fromAccSelectionFlow = "";

        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      } catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("navigateToTopUpCardFlow" + err);
      }
    },

    navigateToCreditCardPayment: function () {
      var scope = this;
      try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.isCreditCardBillPaymentFlow = true;
      let currentForm = kony.application.getCurrentForm().id;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("selectedCreditCardDetails", this.cardList[this.cardListIndex]);
      var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
        "appName": "TransfersMA",
        "moduleName": "ManageActivitiesUIModule"
      });
      // scope_ManageActivitiesPresentationController.selectedCardCcy = this.getCurrentCardDetails().currCode;
      ManageActivitiesPresenter.selectedCardCcy = this.getCurrentCardDetails().currCode;
      ManageActivitiesPresenter.fromAccSelectionFlow = currentForm;
      ManageActivitiesPresenter.getFromAccountsCardPayment();
      // navManager.navigateTo({
      //   "appName": "TransfersMA",
      //   "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment"
      // });
       } catch (e) {
        scope.alertCallback();
        kony.print("setSegmentData: " + e);
      }
    },

    checkForReachEnd: function () {
      try {
        var offsetY = this.view.flxMainContainer.contentOffsetMeasured.y;
        var contentHeight = this.view.flxMainContainer.contentSizeMeasured.height;
        var viewPortHeight = this.view.flxMainContainer.frame.height;
        if (Number(contentHeight) === Number(offsetY) + Number(viewPortHeight)) {
          this.onReachingEnd();
        }
      }
      catch (e) {
        kony.print("checkForReachEnd: " + e)
      }
    },
    setPreShowData: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : preShowData ####");
        //    var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.title = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Hamburger.CardManagement");
          var leftBarButtonItem = new kony.ui.BarButtonItem({
                type: constants.BAR_BUTTON_IMAGE,
                style: constants.BAR_ITEM_STYLE_PLAIN,
                enabled: true,
               // tintColor: "FFFFFF00",
                metaData: {
                  image: "backbutton.png"
                },
                action: this.navigateToMenu,
              });
              this.view.setLeftBarButtonItems({
                items: [leftBarButtonItem],
                animated: false
              });
              var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.navigateToFilterOrApplyCard.bind(this),
                    metaData: {
                        image: "more_header.png"
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
        } else {
          this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Hamburger.CardManagement");
        }

        if (configManager.isRBUser === "true" || configManager.isSMEUser === "true") {
          var MenuHandler = applicationManager.getMenuHandler();
          MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUCARDMANAGEMENT);
        }
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      } finally {
        let scopeObj = this;
        let campaignPopUpSuccess = function (response) {
          CampaignUtility.showCampaign(response, scopeObj.view);
        };
        let campaignPopUpError = function (response) {
          kony.print(response, "Campaign Not Found!");
        };
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      }
      this.view.customHeader.flxBack.onClick = this.navigateToMenu;
    },
    resetPayFlexs: function () {
      this.view.flxApplePay.setVisibility(false);
      this.view.flxSeperatorPay4.setVisibility(false);
      this.view.flxSamsungPay.setVisibility(false);
      this.view.flxSeperatorPay5.setVisibility(false);
      this.view.flxGooglePay.setVisibility(false);
      this.view.flxSeperatorPay6.setVisibility(false);
    },
    samsungPayCallBack: function (isSupported) {
      if (isSupported.toString() === "true") {
        this.view.flxSamsungPay.setVisibility(true);
        this.view.flxSeperatorPay5.setVisibility(false);
      }
    },
    getDeviceOS: function () {
      try {
        return kony.os.deviceInfo();
      }
      catch (exception) {
        try {
          return kony.crypto.createHMacHash("SHA512", this.getDeviceOS().deviceid, "KonyAnalytics");
        }
        catch (ex) {
          kony.print(JSON.stringify(ex));
        }
      }
    },
    onNavigate: function () {
      if (
        applicationManager.getPresentationFormUtility().getDeviceName() !==
        "iPhone"
      ) {
        var footerMenuUtility = require("FooterMenuUtility");
        this.footerMenuUtility =
          footerMenuUtility.getFooterMenuUtilityInstance();
        var cm = applicationManager.getConfigurationManager();
        this.footerMenuUtility.entitlements = {
          features: cm.getUserFeatures(),
          permissions: cm.getUserPermissions(),
        };
        this.footerMenuUtility.scope = this;
      }
    },
    preShow: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        if (
          applicationManager.getPresentationFormUtility().getDeviceName() !==
          "iPhone"
        ) {
          this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
          this.view.customHeader.flxBack.isVisible = true;
        }
        // this.view.customHeader.flxBack.isVisible = true;
        loggerManager.log("#### start frmCardManageHomeController : preShow ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.flxMainContainer.showFadingEdges = false;
        this.view.flxscrmain.isVisible = true;
        this.view.flxOptionMain.isVisible = true;
        this.view.flxCardsHomeTabs.setVisibility(true);
        this.view.flxPopupApplyForCard.setVisibility(false);
        this.view.flxHeader.setEnabled(true);
        this.view.flxMainContainer.setEnabled(true);
        this.view.flxHamburger.setEnabled(true);
        this.view.flxNoCards.setEnabled(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.view.flxManageTravelPlanButton.setEnabled(true);
        this.view.flxFooter.setEnabled(true);
        this.view.lblNoCards.text = kony.i18n.getLocalizedString("kony.mb.cardManage.FetchingCards");
        this.view.flxNoCards.isVisible = true;
        this.view.customHeader.flxSearch.isVisible = true;
        this.view.flxAboutExpire.setVisibility(false);
        this.view.customHeader.imgSearch.src = "circledots.png";
        this.view.customHeader.imgBack.src = "backbutton.png";
        var manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        var cardReset = manageCardModule.presentationController.getCardIndexStatus();
        if (cardReset) {
          this.cardListIndex = 0;
          manageCardModule.presentationController.setCardIndexStatus(false);
        }
        this.setFlowActions();
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
          this.view.flxHeader.isVisible = true;
          this.view.flxFooter.isVisible = false;
        } else {
          this.view.flxHeader.isVisible = false;
          this.view.flxFooter.isVisible = true;
        }

        this.setPreShowData();
        applicationManager.getNavigationManager().setCustomInfo("isSendOnDateModified", null);
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.setTransactionAttribute("scheduledDate", null);
        transactionManager.setTransactionAttribute("scheduledCalendarDate", null);
      } catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      } finally {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    callCustomerCare: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getNavigationManager().setCustomInfo("callCustomerSupport","CARD_REPORT_LOST_SUPPORT");
      var infModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationUIModule" });
      infModule.presentationController.onClickCallUs();
    },
    showDial: function (phoneNumber) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.phone.dial(phoneNumber);
    },
    setCardView: function (cardStatus, cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      //   kony.ui.Alert(this.expiryFlag);
      loggerManager.log("EXPIRYFLAG" + this.expiryFlag);
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCardView ####");
        // this.view.flxMainTabs.setVisibility(false);
        if (kony.sdk.isNullOrUndefined(cardStatus)) {
          applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.errorFetchCards"));
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        cardType === "Debit" ?this.view.flxViewStatements.setVisibility(false):this.view.flxViewStatements.setVisibility(true);
        if (!kony.sdk.isNullOrUndefined(frmData.isMainScreen) && !kony.sdk.isNullOrUndefined(frmData.cardData) && frmData.isMainScreen === true) {
          if (frmData.cardData.view === "pinChange") {
            if (kony.sdk.isNullOrUndefined(frmData.cardData.type)) {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            }
            else if (frmData.cardData.type === "email") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgEmail");
            }
            else if (frmData.cardData.type === "phoneNo") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgPhone");
            }
            else if (frmData.cardData.type === "postalAddress") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgAddress");
            }
          }
          frmData.cardData = null;
          navManager.setCustomInfo("frmCardManageHome", frmData);
          this.setViewForPinChange(cardType);
        }
        else if (!kony.sdk.isNullOrUndefined(frmData.isMainScreen) && frmData.isMainScreen === true){
          if (!kony.sdk.isNullOrUndefined(frmData.pinChange) && frmData.pinChange === "pinChange") {
            frmData.pinChange = "";
            navManager.setCustomInfo("frmCardManageHome", frmData);
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            this.setViewForPinChange(cardType);
          }
          else {
            if (cardStatus === "Locked") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
              this.setCardLocked(cardType);
            }
            // else if (cardStatus === "Inactive") {
            //   this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
            //   this.setCardInactive(cardType);
            // }
            else if (cardStatus === "Active") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setActiveMsg");
              this.setCardActive(cardType);
            }
            else if (cardStatus === "pinChange") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
              this.setViewForPinChange(cardType);
            }
            else if (cardStatus === "Replace Request Sent") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.replaceMsg");
              this.setViewForReplacedCard(cardType);
            }
            else if (cardStatus === "Reported Lost") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.reportMsg");
              this.setViewForStolenCard(cardType);
            }
            // else if (cardStatus === "Cancelled") {
            //   this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMsg");
            //   this.setViewForCancelCard(cardType);
            // }
            else if (cardStatus === "Issued" || cardStatus === "Inactive") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMsg");
              this.setViewForIssuedCard(cardType);
            }
          }
        }
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    postShow: function () {
      var scope = this;
      try{
      var deviceManager = applicationManager.getDeviceUtilManager();
      this.previousForm = kony.sdk.isNullOrUndefined(kony.application.getPreviousForm()) ? "" :kony.application.getPreviousForm().id;
      deviceManager.detectDynamicInstrumentation();
      var navManager = applicationManager.getNavigationManager();
      var frmData = navManager.getCustomInfo("frmCardManageHome");
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.getBankDateMB();
      if (!kony.sdk.isNullOrUndefined(frmData)) {
        var response = frmData.response;
        if (kony.sdk.isNullOrUndefined(response) || response.length === 0) {
          var cardsManager = applicationManager.getCardsManager();
          response = cardsManager.getCards();
        }
        if (!scope_ManageCards_Pres.isBillingAddressAvailable) {
          this.showEmptyBillingAddressError();
        }
        if (!kony.sdk.isNullOrUndefined(response) && response.length > 0) {
          this.cardList = response;
          this.cardListTotalCards = response.length;
          this.carouselAnimationPreShow();
          this.getAndSetCards();
          this.view.flxNoCards.setVisibility(false);
          this.view.flxMainContainer.setVisibility(true);
          // this.view.flxManageTravelPlanButton.setVisibility(true);
        }
        else {
          this.cardListTotalCards = 0;
          this.view.lblNoCards.text = kony.i18n.getLocalizedString("kony.mb.cards.noCardsApply");
          this.view.flxNoCards.setVisibility(true);
          this.view.flxMainContainer.setVisibility(false);
          this.view.customHeader.flxSearch.isVisible = false;
          this.view.flxManageTravelPlanButton.setVisibility(false);
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("postShow: " + e);
      } finally {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    getAndSetCards: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : getAndSetCards ####");
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        var isMainScreen = false;
        if (!kony.sdk.isNullOrUndefined(frmData)) {
          isMainScreen = frmData.isMainScreen;
        }
        this.cardListGetCards();
        this.cardListScrollIndex();
        if (!isMainScreen) {
          this.popupMsg = "";
          navManager.setCustomInfo("frmCardManageHome", { "isMainScreen": undefined });
          if (isMainScreen === true) {
            this.cardListIndex = 0;
          }
        }
        if (this.popupMsg !== '' && scope_ManageCards_Pres.activeCardsScenario === false) {
          this.showPopupSuccess();
        }
        scope_ManageCards_Pres.activeCardsScenario = false;

        this.view.flxNoCards.isVisible = false;
        this.view.forceLayout();
        applicationManager.getPresentationUtility().dismissLoadingScreen();

      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setDataForCards: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setDataForCards ####");
        this.cardListImages = [
          'amexcredit.png',
          'amexprepaid.png',
          'mastercardcredit.png',
          'mastercard.png',
          'mastercarddebit.png',
          'nepalpaydebit.png',
          'sctupi.png',
          'visaprepaid.png',
          'visacredit.png',
          'unionpay.png',
        ];
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    carouselAnimationPreShow: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : carouselAnimationPreShow ####");
        this.previousForm = kony.sdk.isNullOrUndefined(kony.application.getPreviousForm()) ? "" :kony.application.getPreviousForm().id;
        var no_of_cards = this.cardListTotalCards;
        var no_of_widgets = this.view.flxCardList.widgets().length;
        if (no_of_cards !== no_of_widgets) {
          this.cardListIndex = 0;
          this.removeExtraClonedCards();
          this.cardListCloneCards();
        }
        this.view.flxCardList.showFadingEdges = false;
        // if(applicationManager.getPresentationFormUtility().getDeviceName() != "iPhone")
        this.view.flxCardList.scrollToWidget(this.view.flxCardList.widgets()[this.cardListIndex]);
        //         kony.runOnMainThread(mainthreadFun, []);
        //         function mainthreadFun () { 
        //          this.view.flxCardList.scrollToWidget(this.view.flxCardList.widgets()[this.cardListIndex]);
        //         }
        this.setDataForCards();
        this.setCarouselAnimationActions();
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    removeExtraClonedCards: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : removeExtraClonedCards ####");
        var totalCards = this.view.flxCardList.widgets().length;
        for (var i = totalCards - 1; i > 0; i--) {
          this.view.flxCardList.removeAt(i);
        }
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListCloneCards: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListCloneCards ####");
        for (var i = 1; i < this.cardListTotalCards; i++) {
          var newPage = this.view.flxCard.clone("newPage" + i);
          this.view.flxCardList.add(newPage);
        }
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCarouselAnimationActions: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCarouselAnimationActions ####");
        var scopeObj = this;
        this.view.flxCardList.onScrollStart = function () {
          try {
            scopeObj.cardListScrollStart();
          }
          catch (e) {
            try {
              var scope;

              if (!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if (!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter) + 1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId = "timerPopupError_frmCardManageHome_CarouselAnimationActions" + scope.timerCounter;
              scope.view.customPopup.imgPopup.src = "errormessage.png";
              scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function () {
                var timerScope;
                if (!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);
            } catch (error) {
              kony.print("frmCardManageHome CarouselAnimationActions-->" + JSON.stringify(error));
            }
          }
        };
        this.view.flxCardList.onScrolling = function () {
          try {
            scopeObj.cardListScroll();
          }
          catch (e) {
            try {
              var scope;

              if (!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if (!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter) + 1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId = "timerPopupError_frmCardManageHome_CarouselAnimationActions" + scope.timerCounter;
              scope.view.customPopup.imgPopup.src = "errormessage.png";
              scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function () {
                var timerScope;
                if (!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);
            } catch (error) {
              kony.print("frmCardManageHome CarouselAnimationActions-->" + JSON.stringify(error));
            }
          }
        };
        this.view.flxCardList.onScrollEnd = function () {
          try {
            scopeObj.cardListScrollStop();
          }
          catch (e) {
            try {
              var scope;

              if (!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if (!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter) + 1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId = "timerPopupError_frmCardManageHome_CarouselAnimationActions" + scope.timerCounter;
              scope.view.customPopup.imgPopup.src = "errormessage.png";
              scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function () {
                var timerScope;
                if (!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);
            } catch (error) {
              kony.print("frmCardManageHome CarouselAnimationActions-->" + JSON.stringify(error));
            }
          }
        };
        this.view.postShow = function () {
          try {
            scopeObj.postShow();
          }
          catch (e) {
            try {
              var scope;

              if (!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if (!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter) + 1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId = "timerPopupError_frmCardManageHome_CarouselAnimationActions" + scope.timerCounter;
              scope.view.customPopup.imgPopup = "errormessage.png";
              scope.view.customPopup.lblPopup = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function () {
                var timerScope;
                if (!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);
            } catch (error) {
              kony.print("frmCardManageHome CarouselAnimationActions-->" + JSON.stringify(error));
            }
          }
        };
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListGetCards: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListGetCards ####");
        kony.print("-- cardListGetCards Start --");
        if (!kony.sdk.isNullOrUndefined(this.view) &&
          !kony.sdk.isNullOrUndefined(this.view.flxCardList) &&
          !kony.sdk.isNullOrUndefined(this.view.flxCardList.widgets()) &&
          !kony.sdk.isNullOrUndefined(this.view.flxCard.frame)) {
          this.cardListCards = this.view.flxCardList.widgets();
          this.cardsWidgets = this.view.flxCard.widgets();
          this.cardListWidth = this.view.flxCard.frame.width;
          kony.print("-- cardListWidth = " + this.cardListWidth);
          kony.print("-- cardListGetCards End --");
          this.cardListSetCards();
        }
        else {
          this.cardListCards = [];
          this.cardListWidth = 0;
        }
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListSetCards: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListSetCards ####");
        this.lastSetIndex = this.clone(this.cardListIndex);
        var cardListStartTransform = kony.ui.makeAffineTransform();
        cardListStartTransform.scale(this.cardListStartScale, this.cardListStartScale);
        var growEnd = this.cardListStartScale + this.cardListScaleGrowth;
        var cardListEndTransform = kony.ui.makeAffineTransform();
        cardListEndTransform.scale(growEnd, growEnd);
        for (i = 0; i < this.cardListCards.length; i++) {
          this.cardListCards[i].transform = cardListStartTransform;
          var cardListChildWidgets = this.cardListCards[i].widgets();
          var cardNumbers = cardListChildWidgets[1].widgets();
          var cardNumber1 = cardNumbers[0].widgets();
          var cardNumber2 = cardNumbers[1].widgets();
          var cardNumber3 = cardNumbers[2].widgets();
          var cardNumber4 = cardNumbers[3].widgets();
          if (this.cardList[i]['maskedCardNumber'].length === 15) {
            //amex card which have 15 digits
            cardNumbers[3].isVisible = false;
            cardNumbers[0].width = "30%";
            cardNumbers[1].width = "30%";
            cardNumbers[2].width = "30%";
            cardNumber1[0].text = this.cardList[i]['maskedCardNumber'].slice(0, 5);
            cardNumber2[0].text = this.cardList[i]['maskedCardNumber'].slice(0, 6).slice(-1) + "XXXX";
            cardNumber3[0].text = this.cardList[i]['maskedCardNumber'].slice(-5);
          } else {
            //other cards which have 16 digits
            cardNumbers[0].width = "25%";
            cardNumbers[1].width = "25%";
            cardNumbers[2].width = "25%";
            cardNumbers[3].isVisible = true;
            cardNumber1[0].text = this.cardList[i]['maskedCardNumber'].slice(0, 4);
            cardNumber2[0].text = this.cardList[i]['maskedCardNumber'].slice(0, 6).slice(-2) + "XX";
            cardNumber3[0].text = "XXXX";
            cardNumber4[0].text = this.cardList[i]['maskedCardNumber'].slice(-4);
          }
          this.cardListCards[i].opacity = 0.5;

          // this.cardsWidgets[2].text = this.cardList[i].cardIssueDate;
          // this.cardsWidgets[3].text = this.cardList[i].cardExpireDate; 

          var prdName = this.cardList[i].cardProductName;
          var cardImage = this.cardList[i].cardimage;
          cardListChildWidgets[0].src = cardImage;
          cardListChildWidgets[2].text = this.cardList[i].cardIssueDate;
          cardListChildWidgets[3].text = this.cardList[i].cardExpireDate;
          cardListChildWidgets[4].text = this.cardList[i].chName;
          /* if(this.cardList[i]['cardType'].trim() === "Debit")
          {
            cardListChildWidgets[0].src = "atmcardblack.png";
          }
          else if(this.cardList[i]['cardType'].trim() === "Credit")
          {
            cardListChildWidgets[0].src = "atmcardgold.png";
          }
          else
          {
            cardListChildWidgets[0].src = "atmcardpetrol.png";
          }*/
        }
        this.cardListCards[this.cardListIndex].opacity = 1;
        this.cardListCards[this.cardListIndex].transform = cardListEndTransform;
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListScrollStart: function () {
      this.cardListLastIndex = this.cardListIndex;
      this.previousForm = "";
    },
    getCardImage: function (cardImage) {
      var cards = {
        "amexcredit": 'amexcredit.png',
        "amexprepaid": 'amexprepaid.png',
        "mastercardcredit": 'mastercardcredit.png',
        "mastercard": 'mastercard.png',
        "mastercarddebit": 'mastercarddebit.png',
        "nepalpaydebit": 'nepalpaydebit.png',
        "sctupi": 'sctupi.png',
        "visaprepaid": 'visaprepaid.png',
        "visadebit": 'visadebit.png',
        "visaprepaid": 'visaprepaid.png',
        "visagray": 'visagray.png',
        "visacredit": 'visacredit.png',
        "upi": 'upi.png'
      };
      if (!kony.sdk.isNullOrUndefined(cards[cardImage]))
        return cards[cardImage];
      else
        return 'visared.png';
    },
    cardListScroll: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListScroll ####");
        if (kony.sdk.isNullOrUndefined(this.view) ||
          kony.sdk.isNullOrUndefined(this.view.flxCardList) ||
          kony.sdk.isNullOrUndefined(this.view.flxCardList.widgets())
        ) {
          return;
        }
        var scrollPosX = this.view.flxCardList.contentOffsetMeasured.x;
        var cardListFactor = [];
        var cardListScaleFactor = [];
        var cardListScale = [];
        var cardListScrollTransform = [];
        var cardListOpacity = [];
        for (i = 0; i < this.cardListCards.length; i++) {
          if (this.cardListWidth !== 0) {
            cardListFactor[i] = this.roundNum(Math.min(2, (Math.max(0, (scrollPosX - (this.cardListWidth * (i - 1)))) / (this.cardListWidth))), 3);
          }
          else {
            cardListFactor[i] = 0;
          }
          kony.print("-- cardListFactor " + i + " " + cardListFactor[i]);
          if (cardListFactor[i] < 1) {
            cardListScaleFactor[i] = cardListFactor[i];
          } else {
            cardListScaleFactor[i] = this.roundNum((2 - cardListFactor[i]), 3);
          }
          kony.print("-- cardListScaleFactor " + i + " " + cardListScaleFactor[i]);
          cardListScale[i] = (this.cardListStartScale + (cardListScaleFactor[i] * (this.cardListScaleGrowth)));
          cardListScrollTransform[i] = kony.ui.makeAffineTransform();
          cardListScrollTransform[i].scale(cardListScale[i], cardListScale[i]);
          this.cardListCards[i].transform = cardListScrollTransform[i];
          cardListOpacity[i] = Math.max(0.5, (cardListScaleFactor[i]));
          this.cardListCards[i].opacity = cardListOpacity[i];
          kony.print("-- cardListIndex = " + this.cardListIndex);
          kony.print("-- cardListFactor " + i + " = " + cardListFactor[i] + " cardListScale " + i + " = " + this.roundNum(cardListScale[i], 3) + " cardListOpacity = " + cardListOpacity[i]);
        }
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListScrollStop: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListScrollStop ####");
        var scrollPosX = parseInt(this.view.flxCardList.contentOffsetMeasured.x);
        var cardFrameWidth = parseInt(this.view.flxCardList.frame.width);
        var cardPos = Math.abs((scrollPosX + 1) / cardFrameWidth);
        var cVal = cardPos - Math.floor(cardPos);
        this.cardListIndex = cVal > 0.5 ? parseInt(((scrollPosX + 2) / cardFrameWidth)) : parseInt((scrollPosX + 1) / cardFrameWidth);
        this.isAppendData = false;
        this.cardListScrollIndex();
        if(this.previousForm === "frmCardTransactionDetails"){
          this.showTransactions();
        }else this.hideTransactions();
        kony.print("-- cardListLastIndex = " + this.cardListLastIndex);
        kony.print("-- cardListIndex = " + this.cardListIndex);
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCurrentCardDetails: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCurrentCardDetails ####");
        var formatUtil = applicationManager.getFormatUtilManager();
        var configurationManager = applicationManager.getConfigurationManager();
        // this.view.lblCrntBalText.text = kony.i18n.getLocalizedString("kony.mb.accounts.CurrentBalance");
        // this.view.lblBalanceAmount.text = formatUtil.formatAmountandAppendCurrencySymbol(this.cardList[this.cardListIndex].currentBalance,this.cardList[this.cardListIndex].currencyCode);
        // this.view.lblBalGraphicTxt.text = this.view.lblBalanceAmount.text;
        // this.view.lblValidFrom.text = this.cardList[this.cardListIndex].cardIssueDate;
        // this.view.lblValidThru.text = this.cardList[this.cardListIndex].cardExpireDate;
        // this.view.lblCardHolderName.text = this.cardList[this.cardListIndex].chName;
        // if (kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].currencyCode)) {
        //   this.cardList[this.cardListIndex].currencyCode = this.cardList[this.cardListIndex].currencyCode;//configurationManager.getCurrencyCode();
        // }
        var screenWidth = kony.os.deviceInfo().screenWidth;
        screenWidth = screenWidth - 64;
        this.cardList[this.cardListIndex]['cardType'] !== "Debit" && (this.cardList[this.cardListIndex]['cardStatus'] === "Locked" ||
          this.cardList[this.cardListIndex]['cardStatus'] === "Active") ? this.view.flxMainTabs.setVisibility(true) : this.view.flxMainTabs.setVisibility(false);
        if (this.cardList[this.cardListIndex].cardType === "Debit") {
          this.view.btnTransactionTab.isVisible = false;
          this.view.btnManageTab.width = "98.8%";
          this.hideTransactions();
          /*this.view.lblBalanceAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].currentBalance, false, this.cardList[this.cardListIndex].currencyCode);
          this.view.lblBalGraphicTxt.text = this.view.lblBalanceAmount.text;
          this.view.lblPaymentDueText.setVisibility(false);
          this.view.lblCreditLimitTxt.text = kony.i18n.getLocalizedString("kony.mb.cardManagement.purchaseLimit") + ": " + CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].withdrawlLimit, false, this.cardList[this.cardListIndex].currencyCode);
          this.view.lblAvialCreditText.text = kony.i18n.getLocalizedString("kony.mb.accounts.AvailableBalance");
          this.view.lblCreditAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].availableBalance, false, this.cardList[this.cardListIndex].currencyCode);
          var currentBalance = Number(this.cardList[this.cardListIndex].currentBalance);
          var availableBalance = Number(this.cardList[this.cardListIndex].availableBalance);
          var total = currentBalance + availableBalance;
          if (currentBalance !== 0 && availableBalance !== 0) {
            var currentBalanceWidth = (currentBalance / total) * screenWidth;
            this.view.flxCurntBalBarNTxt.width = currentBalanceWidth + "dp";
            this.view.flxCredLimitBarNTxt.width = (screenWidth - currentBalanceWidth) + "dp";
            this.view.lblBalGraphicTxt.setVisibility(true);
            this.view.flxCurntBalBarNTxt.setVisibility(true);
            this.view.flxCredLimitBarNTxt.setVisibility(true);
          }
          else {
            this.view.lblBalGraphicTxt.setVisibility(false);
            this.view.flxCurntBalBarNTxt.setVisibility(false);
            this.view.flxCredLimitBarNTxt.setVisibility(false);
          }*/
        }
        else if(this.cardList[this.cardListIndex].cardType === "Credit") {
          //credit balance section
          this.view.flxBalNCreditGraphic.setVisibility(true);
          this.view.btnManageTab.width = "50%";
          this.view.btnTransactionTab.isVisible = true;
          var creditLimit = Number(this.cardList[this.cardListIndex].creditLimit);
          var currentBalance = creditLimit - Number(this.cardList[this.cardListIndex].balance);
          //min due
          this.view.lblBalanceAmount.setVisibility(true);
          this.view.lblCrntBalText.setVisibility(true);
          this.view.lblCrntBalText.text = kony.i18n.getLocalizedString("i18n.TransfersEur.MinimumDue");
          this.view.lblBalanceAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].terMiniDue, false, this.cardList[this.cardListIndex].currencyCode);//CommonUtilities.formatCurrencyWithCommas(currentBalance, false, this.cardList[this.cardListIndex].currencyCode);
         
          //credit limit
          this.view.lblCreditAmount.setVisibility(true);
          this.view.lblAvialCreditText.setVisibility(true);
           this.view.lblAvialCreditText.text = kony.i18n.getLocalizedString("kony.mb.Alerts.CreditLimitTitle");
          this.view.lblCreditAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].creditLimit, false, this.cardList[this.cardListIndex].currencyCode);
         
          //outstanding in right botton section //kony.i18n.getLocalizedString("i18n.TransfersEur.OutstandingBalance") + ": "
          this.view.lblBalGraphicTxt.setVisibility(true);
          this.view.lblBalGraphicTxt.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.OutstandingBalance");
          this.view.lblOutStdBalanceValue.setVisibility(true);
          this.view.lblOutStdBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].outstdBalance, false, this.cardList[this.cardListIndex].currencyCode);//this.view.lblBalanceAmount.text;
          //available balance in left botton section
          this.view.lblCreditLimitTxt.setVisibility(true);
          this.view.lblCreditLimitTxt.text = kony.i18n.getLocalizedString("i18n.accounts.availableBalance");
          this.view.lblAvaBalanceValue.setVisibility(true);
          this.view.lblAvaBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].balance, false, this.cardList[this.cardListIndex].currencyCode);
          if (this.cardList[this.cardListIndex].hasOwnProperty("paymentDueDate") && (!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].paymentDueDate))) {
            /*var paymentDueDate = this.cardList[this.cardListIndex].paymentDueDate;
            paymentDueDate = paymentDueDate.replace(' ', 'T');
            var date = new Date(paymentDueDate);  // 2009-11-10
            // var monthName = date.toLocaleString('default', { month: 'short' });
            var options = { month: 'short' };
            var monthName = new Intl.DateTimeFormat('en-US', options).format(date);
            this.view.lblPaymentDueText.text = "Payment due " + date.getDate() + " " + monthName + ".";
            this.view.lblPaymentDueText.setVisibility(true);*/
            this.view.lblPaymentDueText.setVisibility(false);
          }else {this.view.lblPaymentDueText.setVisibility(false);}
          if (creditLimit !== 0) {
            var currentBalanceWidth = (currentBalance / creditLimit) * screenWidth;
            this.view.flxCurntBalBarNTxt.width = currentBalanceWidth + "dp";
            this.view.flxCredLimitBarNTxt.width = (screenWidth - currentBalanceWidth) + "dp";
            this.view.lblBalGraphicTxt.setVisibility(true);
            this.view.lblOutStdBalanceValue.setVisibility(true);
            this.view.flxCurntBalBarNTxt.setVisibility(true);
            this.view.flxCredLimitBarNTxt.setVisibility(true);
          }
          else {
            this.view.lblBalGraphicTxt.setVisibility(false);
            this.view.lblOutStdBalanceValue.setVisibility(false);
            this.view.flxCurntBalBarNTxt.setVisibility(false);
            this.view.flxCredLimitBarNTxt.setVisibility(false);
          }
        }else if(this.cardList[this.cardListIndex].cardType === "Prepaid"){
          this.view.btnManageTab.width = "50%";
          this.view.btnTransactionTab.isVisible = true;
          var creditLimit = Number(this.cardList[this.cardListIndex].creditLimit);
          var currentBalance = creditLimit - Number(this.cardList[this.cardListIndex].balance);
          //min due
          //credit limit
          this.view.lblCrntBalText.setVisibility(true);
           this.view.lblCrntBalText.text = kony.i18n.getLocalizedString("i18n.accounts.availableBalance");
          this.view.lblBalanceAmount.setVisibility(true);
           this.view.lblBalanceAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].balance, false, this.cardList[this.cardListIndex].currencyCode);
         this.view.lblAvialCreditText.setVisibility(true);
          this.view.lblAvialCreditText.text = kony.i18n.getLocalizedString("i18n.TransfersEur.OutstandingBalance");
          this.view.lblCreditAmount.setVisibility(true);
          this.view.lblCreditAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].outstdBalance, false, this.cardList[this.cardListIndex].currencyCode);
          //available balance in left botton section
          this.view.flxBalNCreditGraphic.setVisibility(false);
           this.view.lblCreditLimitTxt.setVisibility(false);
           this.view.lblBalGraphicTxt.setVisibility(false);
           this.view.lblOutStdBalanceValue.setVisibility(false);
           this.view.lblAvaBalanceValue.setVisibility(false);

          if (this.cardList[this.cardListIndex].hasOwnProperty("paymentDueDate") && (!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].paymentDueDate))) {
          /*  var paymentDueDate = this.cardList[this.cardListIndex].paymentDueDate;
            paymentDueDate = paymentDueDate.replace(' ', 'T');
            var date = new Date(paymentDueDate);  // 2009-11-10
            // var monthName = date.toLocaleString('default', { month: 'short' });
            var options = { month: 'short' };
            var monthName = new Intl.DateTimeFormat('en-US', options).format(date);
            this.view.lblPaymentDueText.text = "Payment due " + date.getDate() + " " + monthName + ".";
            this.view.lblPaymentDueText.setVisibility(true);*/
            this.view.lblPaymentDueText.setVisibility(false);
          }else {this.view.lblPaymentDueText.setVisibility(false);}

          if (creditLimit !== 0) {
            var currentBalanceWidth = (currentBalance / creditLimit) * screenWidth;
            this.view.flxCurntBalBarNTxt.width = currentBalanceWidth + "dp";
            this.view.flxCredLimitBarNTxt.width = (screenWidth - currentBalanceWidth) + "dp";
            this.view.lblBalGraphicTxt.setVisibility(true);
            this.view.lblOutStdBalanceValue.setVisibility(true);
            this.view.flxCurntBalBarNTxt.setVisibility(true);
            this.view.flxCredLimitBarNTxt.setVisibility(true);
          }
          else {
            // this.view.lblBalGraphicTxt.setVisibility(false);
            this.view.flxCurntBalBarNTxt.setVisibility(false);
            this.view.flxCredLimitBarNTxt.setVisibility(false);
        }
      }
        if (!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].rewardsPoint)) {
          this.view.lblRewardPoints.text = this.cardList[this.cardListIndex].rewardsPoint + " pts";
          this.view.flxRewardPoints.setVisibility(false);
        }
        else {
          this.view.flxRewardPoints.setVisibility(false);
        }
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    onSegmentRowClick: function () {
      var scope = this;
      try{
      var selectedSectionIndex = Math.floor(this.view.segTransactionsScreen.selectedRowIndex[0]);
      var selectedRowIndex = Math.floor(this.view.segTransactionsScreen.selectedRowIndex[1]);
      var transactionData = this.view.segTransactionsScreen.data[selectedSectionIndex][1][selectedRowIndex];
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardTransactionDetails", transactionData);
      var config = applicationManager.getConfigurationManager();
      if (!config.isDisputeConfigurationAdded) {
        var disputePresentationController = applicationManager.getModulesPresentationController("DisputeTransactions")
        disputePresentationController.fetchDisputeConfiguration();
      } else {
        if (!(transactionData.reserved6 === "No Transaction")) {
          navManager.navigateTo("frmCardTransactionDetails");
        }
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("onSegmentRowClick: " + e);
      }
    },

    showTransactions: function (showOnlyCardDetails) {
      var scope = this;
      try{
      this.isManageTabShown = false;
      var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
      this.view.btnTransactionTab.skin = "ICSknBtnFFFFFFRounded003E7528PxBB";
      this.view.btnManageTab.skin = "sknbtnfffffNrmlSemiBold15px";
      this.view.btnManageTab.right = "2dp";
      var navManager = applicationManager.getNavigationManager();
      var cardTransactionDetails = navManager.getCustomInfo("frmCardManageHomeTransactions");
      this.view.flxActivateCardMsg.setVisibility(false);
      this.view.flxCustomerCare.setVisibility(false);
      var transactions;
      if (!kony.sdk.isNullOrUndefined(cardTransactionDetails))
        transactions = cardTransactionDetails.pendingAuthInfo_out;
      if (!kony.sdk.isNullOrUndefined(showOnlyCardDetails) && showOnlyCardDetails === true) {
        this.view.flxCardsHomeTabs.setVisibility(true);
        this.view.flxCardBalNCreditStatus.setVisibility(true);
        this.view.flxBalNCreditGraphic.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxTransactionsList.setVisibility(false);
        this.view.flxNoTransactionsList.setVisibility(false);
      }
      else if (cardStatus == "Cancelled" || cardStatus == "Issued" || cardStatus == "Inactive") {
        this.view.flxCardsHomeTabs.setVisibility(false);
        this.view.flxTransactionsList.setVisibility(false);
        this.view.flxNoTransactionsList.setVisibility(false);
      }
      else {
        this.view.flxCardsHomeTabs.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxCardBalNCreditStatus.setVisibility(true);
        this.view.flxBalNCreditGraphic.setVisibility(true);
        if ((!kony.sdk.isNullOrUndefined(transactions) && transactions.length > 0) || this.isAppendData) {
          this.view.flxTransactionsList.setVisibility(true);
          this.view.flxNoTransactionsList.setVisibility(false);
        } else {
          this.view.flxTransactionsList.setVisibility(false);
          this.view.flxNoTransactionsList.setVisibility(true);
        }
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("showTransactions: " + e);
      }
    },
    hideTransactions: function () {
      var scope = this;
      try{
      this.isManageTabShown = true;
      this.view.flxCardsHomeTabs.setVisibility(true);
      var currCardDetails = this.cardList[this.cardListIndex];
      var cardStatus = currCardDetails.cardStatus;
      var cardType = currCardDetails.cardType;
      this.view.flxNoTransactionsList.setVisibility(false);
      var replaceCdrdPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_REPLACE_CARD");
      var lockCard = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_LOCK_CARD");
      var unLockCard = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_UNLOCK_CARD");
      var reportCardStolen = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_REPORT_CARD_STOLEN");
      var changePin = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_CHANGE_PIN");
      var cancelCard = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_CANCEL_CARD");

      this.view.flxActiveOrInactive.setVisibility(true);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
      this.view.flxChangePin.setVisibility(false);
      this.view.flxReplaceCard.setVisibility(false);
      this.view.flxReportStolenOrLost.setVisibility(true);
      this.view.flxCancelCard.setVisibility(false);
      this.view.flxApplePay.setVisibility(false);
      this.view.flxSamsungPay.setVisibility(false);
      this.view.flxGooglePay.setVisibility(false);
      this.view.flxViewStatements.setVisibility(true);
      this.view.flxCardDetails.setVisibility(true);
      this.view.flxTopUpCards.setVisibility(false);
      this.view.flxConvertEMI.setVisibility(false);
      this.view.flxPayBill.setVisibility(false);


      var cardCategoryToLWC = currCardDetails.Card_Category.toLowerCase();
      if (cardType === "Prepaid" && cardStatus === "Active") {
        if (!(currCardDetails.cardProgLabel.includes("I")) || (cardCategoryToLWC.includes("virtual"))) {
          if((cardCategoryToLWC.includes("virtual")) && (cardCategoryToLWC.includes("prepaid"))){
          this.view.flxTopUpCards.isVisible = scope_configManager.getPrepaidDollarCardsTopupVisibilityMB() === "TRUE" ? true : false;
          }else if((cardCategoryToLWC.includes("domestic")) && (cardCategoryToLWC.includes("prepaid"))){
          this.view.flxTopUpCards.isVisible = scope_configManager.getPrepaidDomesticCardsTopupVisibilityMB() === "TRUE" ? true : false;
          }else{
           this.view.flxTopUpCards.isVisible = false;
          }
          this.view.flxTopUpCardSeperator.setVisibility(false);
          this.view.flxCardDetailsSeperator.setVisibility(false);
        } else {
          this.view.flxTopUpCards.isVisible = false;
          this.view.flxTopUpCardSeperator.setVisibility(false);
          this.view.flxCardDetailsSeperator.setVisibility(false);
        }
       
      } else {
        this.view.flxTopUpCards.isVisible = false;
        this.view.flxTopUpCardSeperator.setVisibility(false);
        this.view.flxCardDetailsSeperator.setVisibility(false);
      }

      var splittedCardCategory = currCardDetails.Card_Category.split(" ");
      var hasVirtual = false;
      for (var i in splittedCardCategory) {
        if (splittedCardCategory[i].toLowerCase() === "virtual") {
          hasVirtual = true;
          break;
        }
      }

      if (cardType === "Prepaid" && hasVirtual === true) {
        this.view.flxReportStolenOrLost.isVisible = false;
        this.view.flxSeperator5.setVisibility(false);
      } else if (cardType === "Prepaid" && hasVirtual === false) {
        this.view.flxReportStolenOrLost.isVisible = true;
        this.view.flxSeperator5.setVisibility(false);
      }

      if (this.cardList[this.cardListIndex].cardType === "Debit") {
        this.view.flxViewStatements.setVisibility(false);
      } else this.view.flxViewStatements.setVisibility(true);

      if (cardType === "Credit" && (cardStatus === "Active" || cardStatus === "Locked")) {
        this.view.flxViewStatements.setVisibility(true);
        this.view.flxConvertEMI.setVisibility(true);
        this.view.flxConvertEMISeperator.setVisibility(false);
        this.view.flxCardDetailsSeperator.setVisibility(false);
        var creditCardPaymentVisibilityMB = scope_configManager.getCreditCardPaymentVisibilityMB();
        if(creditCardPaymentVisibilityMB === "TRUE" || creditCardPaymentVisibilityMB.toLowerCase() === "true"){
          this.view.flxPayBill.setVisibility(true);
        }else this.view.flxPayBill.setVisibility(false);
        this.view.flxPayBillSeperator.setVisibility(false);
      } else {
        this.view.flxConvertEMI.setVisibility(false);
        this.view.flxConvertEMISeperator.setVisibility(false);
        this.view.flxCardDetailsSeperator.setVisibility(false);
        this.view.flxPayBill.setVisibility(false);
        this.view.flxPayBillSeperator.setVisibility(false);
      }

      if (cardStatus === "Cancelled") {
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxCardsHomeTabs.setVisibility(false);
        this.view.flxManageTravelPlanButton.setVisibility(false);
      }
      else if (cardStatus === "Issued" || cardStatus === "Inactive") {
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.setViewForIssuedCard(cardType);
      }
      else if (cardStatus === "Reported Lost") {
        this.setViewForStolenCard(cardType);
      }
      else if (cardStatus === "Replace Request Sent") {
        this.setViewForReplacedCard(cardType);
      }
      else {
        this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
      }
      if (cardStatus === "Locked") {
        this.view.flxChangePin.setVisibility(false);
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard");
        this.view.switchActiveorInactive.selectedIndex = 0;
         if (cardCategoryToLWC.includes("virtual")) {
          this.view.flxChangePin.setVisibility(false);
        }
      } else if (cardStatus === "Active") {
        this.view.flxChangePin.setVisibility(true);
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockCard");
        this.view.switchActiveorInactive.selectedIndex = 1;
        if (cardCategoryToLWC.includes("virtual")) {
          this.view.flxChangePin.setVisibility(false);
        }
      }
      if(cardStatus === "Expired"){
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(true);
        this.view.lblMsg.text = kony.i18n.getLocalizedString("konymb.cards.expiredcardmsg");
        this.view.flxCallCusCare.setVisibility(false);
      }
      
      this.view.flxCardBalNCreditStatus.setVisibility(false);
      this.view.flxBalNCreditGraphic.setVisibility(false);
      this.view.flxTransactionsList.setVisibility(false);
      this.view.btnTransactionTab.skin = "sknbtnfffffNrmlSemiBold15px";
      this.view.btnManageTab.skin = "ICSknBtnFFFFFFRounded003E7528PxBB";
      this.view.flxscrmain.forceLayout();
      this.view.flxOptionMain.forceLayout();
      this.view.flxOptionsContainer.forceLayout();
      this.view.flxMainContainer.forceLayout();
      } catch (e) {
        scope.alertCallback();
        kony.print("hideTransactions: " + e);
      }

    },
    onReachingEnd: function () {
      try{
      if (this.isManageTabShown == false) {
        var length = 0;
        for (var i = 0; i < this.view.segTransactionsScreen.data.length; i++) {
          length += this.view.segTransactionsScreen.data[i][1].length;
        }
        var manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        this.isAppendData = true;
        manageCardModule.presentationController.getTransactionsForCard(this.cardId, length);
      }
      }
      catch (e) {
        kony.print("onReachingEnd: " + e)
      }
    },
    setSegmentData: function () {
      var scope = this;
      try{
      var formatUtil = applicationManager.getFormatUtilManager();
      var navManager = applicationManager.getNavigationManager();
      var cardTransactionDetails = navManager.getCustomInfo("frmCardManageHomeTransactions");
      this.view.segTransactionsScreen.setData([]);
      var transactionsList = cardTransactionDetails.pendingAuthInfo_out;
     
      if (!kony.sdk.isNullOrUndefined(transactionsList) && transactionsList.length > 0 && cardTransactionDetails.respCode_out === "000") {
        // for (var i in transactionsList) {
        //   if (!kony.sdk.isNullOrUndefined(transactionsList[i].transactionDate) && !kony.sdk.isNullOrUndefined(transactionsList[i].transactionDate.split(" ")[0])) {
        //     transactionsList[i].transactionDateOnly = transactionsList[i].transactionDate.split(" ")[0];
        //   }
        // }
        // // const requiredParams = ["transactionDate"];
        // // transactionsList.filter(obj => requiredParams.every(param => obj.hasOwnProperty(param)));
        // transactionsList.sort((a, b) => new Date(b.transactionDateOnly) - new Date(a.transactionDateOnly));
        var unbilled = [];
        var billed = [];
        var data22 = [];
        var data1 = [];
        this.view.segTransactionsScreen.widgetDataMap = {
          "lblHeader": "lblHeader",
          "lblTitle": "reserved6",
          "lblDate": "formattedPostingDate",
          "lblTransactionAmount": "formattedAmount"
        };

        var cardType = this.cardList[this.cardListIndex].cardType;

        var TranList = cardTransactionDetails.pendingAuthInfo_out;
        /**
          "date": [
        {
            "companyId": "NP0010001",
            "lastWorkingDate": "2025-07-16",
            "nextWorkingDate": "2025-07-18",
            "currentWorkingDate": "2025-07-17"
        }
         */
         var bankDetails =applicationManager.getNavigationManager().getCustomInfo("bankDates");
        var cardHolderName = this.cardList[this.cardListIndex].accountName;
        var currentBankDate = bankDetails.currentWorkingDate;//yy-mm-dd
        const currentDate = new Date(currentBankDate);
        const y = currentDate.getFullYear();
        const m = currentDate.getMonth();
        const d = currentDate.getDate();
        const firstDayOfCurrentMonth = new Date(y, m, 1);
        const secondDayOfLastMonth = new Date(y, m - 1, 2);
        // if today is 1st of current month -> Cycle is not closed yet -> so billing cycle is month before last 2nd to last month 1st
        // if today is not 1st -> Cycle is closed -> billing cycle, last month 2nd to current month 1st
        const billedStart = new Date(y, m - (d === 1 ? 2 : 1), 2);
        const billedEnd = new Date(y, m - (d === 1 ? 1 : 0), 1, 23, 59, 59);
        let formattedPostingDateObj;
        transactionsList.forEach(function (transaction) {
          //date formatting
          transaction.formattedPostingDate = applicationManager.getFormatUtilManager().getFormatedDateString(new Date(transaction.postingDate), "d/m/Y");
          /*
          transaction.transactionDate = transaction.transactionDate.replace(' ', 'T');
          var currentDate = new Date(transaction.transactionDate);
          var month = (currentDate.getMonth() + 1) >= 10 ? (currentDate.getMonth() + 1) : "0" + (currentDate.getMonth() + 1);
          var date = currentDate.getDate() >= 10 ? (currentDate.getDate()) : ("0" + currentDate.getDate());
          transaction.date = month + "/" + date + "/" + currentDate.getFullYear();
          */
          //amount formatting
          transaction.formattedAmount = transaction.transactionCurrency + " " + CommonUtilities.formatCurrencyWithCommas(transaction.transactionAmount, transaction.transactionCurrency);
          formattedPostingDateObj = new Date(transaction.postingDate);//yy-mm-dd
          transaction.isEligibleTransactionEmi =  ((!kony.sdk.isNullOrUndefined(transaction.transactionAmount) && Number(transaction.transactionAmount) > Number(scope_configManager.getMaxAmountForEmiEligible()))) 
                                                  && transaction.reserved5 === "00"   
                                                  && transaction.reserved4 === "Matched"
                                                  && formattedPostingDateObj <= currentDate 
                                                  && formattedPostingDateObj >= billedStart? true : false;
          transaction.cardHolderName = cardHolderName;
          
/*          formattedPostingDateObj <= firstDayOfCurrentMonth && formattedPostingDateObj >= secondDayOfLastMonth ?
            unbilled.push(transaction) : billed.push(transaction);
  enable after dispute tested*/
      /* formattedPostingDateObj <= firstDayOfCurrentMonth && formattedPostingDateObj >= secondDayOfLastMonth ?
       unbilled.push(transaction) : billed.push(transaction); */
            formattedPostingDateObj > billedEnd ? unbilled.push(transaction) : billed.push(transaction);//from 2nd of current month to today transactions are unbilled, before 2nd of current month transactions are billed.



          //previous start
          // if (cardType === "Credit") {
          //   if (transaction.reserved5 === "00") {
          //     billed.push(transaction);
          //   }
          //   else {
          //     unbilled.push(transaction);
          //   }
          // }
          // else {
          //   if (transaction.reserved5 === "00") {
          //     billed.push(transaction);
          //   }
          //   else {
          //     unbilled.push(transaction);
          //   }
          // }
          //previous end
        });
        var data = [];
        if (this.cardTypeFlag === applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit) {
          if (unbilled.length > 0) {
            // unbilled.push({ "formattedTransactionType": "Unbilled Transaction" })
            data.push([{ "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.UnBilledTransactions") }, unbilled]);
          } else {
            unbilled.push({ "reserved6": "No Transaction" })
            data.push([{ "lblHeader": "UnBilled Transactions" }, unbilled]);
          }
          if (billed.length > 0) {
            // billed.push({ "formattedTransactionType": "Billed Transaction" })
            data.push([{ "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.BilledTransactions") }, billed]);
          } else {
            billed.push({ "reserved6": "No Transaction" })
            data.push([{ "lblHeader": "Billed Transactions" }, billed]);
          }
        }
        else {
          if (unbilled.length > 0) {
            // unbilled.push({ "formattedTransactionType": "Unbilled Transaction" })
            data.push([{ "lblHeader": "UnBilled Transactions" }, unbilled]);
          } else {
            unbilled.push({ "reserved6": "No Transaction" })
            data.push([{ "lblHeader": "UnBilled Transactions" }, unbilled]);
          }
          if (billed.length > 0) {
            // billed.push({ "formattedTransactionType": "Billed Transaction" })
            data.push([{ "lblHeader": "Billed Transactions" }, billed]);
          } else {
            billed.push({ "reserved6": "No Transaction" })
            data.push([{ "lblHeader": "Billed Transactions" }, billed]);
          }
        }
        if (!this.isAppendData) {
          this.view.segTransactionsScreen.removeAll();
          
          this.view.segTransactionsScreen.setData(data);
          if (transactionsList.length !== 0)
            this.isAppendData = true;
        }
        else {
          for (var i = 0; i < this.view.segTransactionsScreen.data.length; i++) {
            for (var j = 0; j < data.length; j++) {
              if (this.view.segTransactionsScreen.data[i][0].lblHeader === data[j][0].lblHeader) {
                for (var k = 0; k < data[j][1].length; k++) {
                  this.view.segTransactionsScreen.addDataAt(data[j][1][k], 1, i);
                }
              }
            }
          }
        }
        var emiData = [];
        if (this.isViewTransactionFlow) {
          this.isViewTransactionFlow = false;
          this.isCovertEMIFlow = false;
          this.showTransactions();
        } else if (this.isCovertEMIFlow) {
          this.isViewTransactionFlow = false;
          this.isCovertEMIFlow = false;
          if (kony.sdk.util.isNullOrUndefinedOrEmptyObject(data[1][1][0].reserved6) || data[1][1][0].reserved6 === "No Transaction") {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.accdetails.noTransactionMsg"));
          } else if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(data[1][1])) {
            for (var i in data[1][1]) {
              if (!(kony.sdk.isNullOrUndefined(data[1][1][i].isEligibleTransactionEmi)) && data[1][1][i].isEligibleTransactionEmi) {
                emiData.push(data[1][1][i]);
              }
            }
            if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(emiData)) {
              this.navigateToCovertEMI(emiData);
            } else applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.accdetails.noTransactionMsg"));
          }
        }
      } else {
        if (!this.isAppendData) {
          if (this.isViewTransactionFlow) {
            this.isCovertEMIFlow = false;
            this.isViewTransactionFlow = false;
            this.showTransactions();
          } else if (this.isCovertEMIFlow) {
            this.isCovertEMIFlow = false;
            this.isViewTransactionFlow = false;
            if (kony.sdk.util.isNullOrUndefinedOrEmptyObject(data[0][1][0].reserved6) || data[0][1][0].reserved6 === "No Transaction") {
              applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.accdetails.noTransactionMsg"));
            } else if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(data[0][1])) {
              for (var i in data[0][1]) {
                if (!(kony.sdk.isNullOrUndefined(data[0][1][i].isEligibleTransactionEmi)) && data[0][1][i].isEligibleTransactionEmi) {
                  emiData.push(data[0][1][i]);
                }
              }
              if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(emiData)) {
                this.navigateToCovertEMI(emiData);
              } else applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.accdetails.noTransactionMsg"));
            }
          }
        }
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("setSegmentData: " + e);
      }
    },
    cardListScrollIndex: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListScrollIndex ####");
        kony.print("-- cardListScrollIndex Start --");
        this.currCardNumber = this.cardList[this.cardListIndex]['maskedCardNumber'];
        var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
        var cardType = this.cardList[this.cardListIndex]['cardType'];
        this.cardId = this.cardList[this.cardListIndex]['cardId'];
        var index = scope_ManageCards_Pres.expiryCardId.indexOf(this.cardId);
        scope_ManageCards_Pres.currentCardDetails = this.cardList[this.cardListIndex];
        var configManager = applicationManager.getConfigurationManager();
        if (configManager.isCombinedUser === "true") {
          //var str = this.currCardNumber;
          //var lastNo = str.replace(/.(?=.{4})/g, '');
          //this.view.customCardHeader.lblCardLastNo.text="Card Ending - "+lastNo;
          //this.view.customCardHeader.lblLocateUs.text=this.cardList[this.cardListIndex]['cardProductName'];
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.title = this.cardList[this.cardListIndex]['cardProductName'];
          } else {
            this.view.customHeader.lblLocateUs.text = this.cardList[this.cardListIndex]['cardProductName'];
          }
          if (!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex]['isTypeBusiness'])) {
            this.view.customCardHeader.imgIcon.src = "businessaccount.png";
            this.buisnessuser = 1;
            this.users = {
              "buisnessuser": this.buisnessuser,
              "title": this.cardList[this.cardListIndex]['cardProductName']
            }
          } else {
            this.view.customCardHeader.imgIcon.src = "personalaccount.png";
            this.buisnessuser = 0;
            this.users = {
              "buisnessuser": this.buisnessuser,
              "title": this.cardList[this.cardListIndex]['cardProductName']
            }
          }
        } else {
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.title = this.cardList[this.cardListIndex]['cardProductName'];
          } else {
            this.view.customHeader.lblLocateUs.text = this.cardList[this.cardListIndex]['cardProductName'];
          }
        }
        this.view.flxAboutExpire.setVisibility(false);
        this.cardTypeFlag = cardType;
        this.expiryFlag = (index !== -1) ? true : false;
        this.setCurrentCardDetails();
        this.isManageTabShown = true;
        var manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        if (manageCardModule.presentationController.isFirstTime) {
          this.isAppendData = false;
          if(this.previousForm === "frmCardTransactionDetails"){
          this.showTransactions();
        }else this.hideTransactions();          
        //  this.getTransactions();
        }
        else if (this.isManageTabShown === true) {
          if(this.previousForm === "frmCardTransactionDetails"){
          this.showTransactions();
        }else this.hideTransactions();
        }
        else if (this.isManageTabShown === false) {
          this.getTransactions();
        }
        this.setCardView(cardStatus, cardType);
        manageCardModule.presentationController.isFirstTime = false;
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    getTransactions: function () {
      var scope = this;
      try{
      var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
      var cardId = this.cardList[this.cardListIndex]['cardId'];
      var manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      var currentBankDate =applicationManager.getNavigationManager().getCustomInfo("bankDates").currentWorkingDate;//yy-mm-dd
      var currentDate = applicationManager.getFormatUtilManager().getFormatedDateString(new Date(currentBankDate), "d/m/y");
      var fromDate = new Date(currentBankDate);
      fromDate.setMonth(fromDate.getMonth() - 2);//to get last 3 month transactions to filter it out billed and unbilled
      fromDate.setDate(2);
      fromDate.toISOString().split("T")[0];
      let transactionStartDate = applicationManager.getFormatUtilManager().getFormatedDateString(fromDate, "d/m/y");
      
      var transactionParams = {
        "cardNumber": cardId,
        "cardRefNbr": "N",
        "dateFrom": transactionStartDate,
        "dateTo": currentDate,
      };
      this.view.flxActivateCardMsg.setVisibility(false);
      if (cardStatus !== "Cancelled" && (cardStatus !== "Issued" || cardStatus !== "Inactive"|| cardStatus !== "Expired")) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.segTransactionsScreen.removeAll();
        this.isAppendData = false;
        manageCardModule.presentationController.getTransactionsForCard(transactionParams);
      }
      else {
        this.hideTransactions();
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("getTransaction: " + e);
      }
    },
    navigateToCovertEMI: function (data) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmConvertEMISelectTransaction", data);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.commonFunctionForNavigation("frmConvertEMISelectTransaction");
    },
    roundNum: function (num, decimals) {
      var t = Math.pow(10, decimals);
      return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
    },
    flxActiveOrInactiveOnClick: function () {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        frmData.isMainScreen = undefined;
        navManager.setCustomInfo("frmCardManageHome", frmData);
        var cardDetails = {
          "cardNumber": this.getCurrentCardDetails().cardId,
          "cardType": this.getCurrentCardDetails().cardType,
          // "currentCardData" : this.getCurrentCardDetails(),

        };
        if (1 == CommonUtilities.getSCAType())
          cardDetails.currentCardData = this.getCurrentCardDetails()


        if (this.view.switchActiveorInactive.selectedIndex === 1) {
          cardDetails.view = "unlockCard";
        } else {
          cardDetails.view = "lockCard";
        }
        if (1 == CommonUtilities.getSCAType()) {
          navManager.setCustomInfo("frmCardMngConfirmDetails", cardDetails);
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngConfirmDetails");
        }
        else {
          navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
          this.navigateToCardsEachflow();
        }
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCardLocked: function (cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCardInactive ####");
        // this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxActivateCardMsg.setVisibility(false);
        // this.view.flxAvailableBal.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        if (this.expiryFlag === true) {
          this.expiryCardsProcess();
        }
        this.view.flxChangePin.setVisibility(false);
        this.view.flxSeperator3.setVisibility(false);
        // this.view.flxReplaceCard.setVisibility(true);
        // this.view.flxSeperator4.setVisibility(true);
        this.view.flxReportStolenOrLost.setVisibility(true);
        this.view.flxSeperator5.setVisibility(false);
        this.view.flxActiveOrInactive.setVisibility(true);
        this.view.flxSeperator2.setVisibility(false);
        // if (this.cardList[this.cardListIndex].cardType === "Debit") {
        //   this.view.flxViewStatements.setVisibility(false);
        // } else this.view.flxViewStatements.setVisibility(true);
        this.view.flxCardDetails.setVisibility(true);
        //  this.view.flxCancelCard.setVisibility(true);
        // if (cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        //   this.view.flxCancelCard.setVisibility(true);
        // else
        //   this.view.flxCancelCard.setVisibility(false);
        this.view.flxSeperator6.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.flxSetPurchaseLimit.setVisibility(false);
        this.view.flxSetATMWithdrawalLimit.setVisibility(false);
        this.view.switchActiveorInactive.selectedIndex = 0;
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard");
        this.view.flxActiveOrInactive.forceLayout();
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCardActive: function (cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCardActive ####");
        // this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxActivateCardMsg.setVisibility(false);
        // this.view.flxAvailableBal.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        //this.view.flxSetPurchaseLimit.setVisibility(true);
        //this.view.flxSetATMWithdrawalLimit.setVisibility(true);
        if (this.expiryFlag === true) {
          this.expiryCardsProcess();
        }
        // this.view.flxChangePin.setVisibility(true);
        this.view.flxSeperator3.setVisibility(false);
        // this.view.flxReplaceCard.setVisibility(true);
        this.view.flxSeperator4.setVisibility(false);
        this.view.flxReportStolenOrLost.setVisibility(true);
        if (this.cardList[this.cardListIndex].cardType === "Debit") {
          this.view.flxViewStatements.setVisibility(false);
        } else this.view.flxViewStatements.setVisibility(true);
        this.view.flxSeperator5.setVisibility(false);
        this.view.flxActiveOrInactive.setVisibility(true);
        this.view.flxSeperator2.setVisibility(false);
        // this.view.flxCancelCard.setVisibility(true);
        // if (cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        //   this.view.flxCancelCard.setVisibility(true);
        // else
        //   this.view.flxCancelCard.setVisibility(false);
        this.view.flxSeperator6.setVisibility(false);
        this.view.flxCardDetails.setVisibility(true);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockCard");
        this.view.switchActiveorInactive.selectedIndex = 1;
        this.view.flxActiveOrInactive.forceLayout();
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    showPopupSuccess: function () {
      var scope = this;
      try{
      var requestId = null;
      var navManager = applicationManager.getNavigationManager();
      var navData = navManager.getCustomInfo("frmCardManageHome");
      if (!kony.sdk.isNullOrUndefined(navData) && !kony.sdk.isNullOrUndefined(navData.isMainScreen)) {
        if (!kony.sdk.isNullOrUndefined(navData.reqID)) {
          requestId = navData.reqID;
        }
        navData.isMainScreen = false;
        navManager.setCustomInfo("frmCardManageHome", navData);
      }
      else {
        navManager.setCustomInfo("frmCardManageHome", { "isMainScreen": false });
      }
      if (requestId != null) {
        this.popupMsg = (requestId != "") ? kony.i18n.getLocalizedString("i18n.CardManagement.RequestInitiatedSuccessfully") + " " + requestId : kony.i18n.getLocalizedString("i18n.CardManagement.SucessfulRequestAckMessage")
      }
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, this.popupMsg);
      this.popupMsg = "";
      } catch (e) {
        scope.alertCallback();
        kony.print("showPopupSuccess: " + e);
      }
    },
    flxChangePinOnClick: function () {
      var cardDetails;
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : flxChangePinOnClick ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        if (this.getCurrentCardDetails().cardType == "Credit") {
          cardDetails = {
            "cardNumber": this.getCurrentCardDetails().cardId,
            "view": "pinChange",
            "cardType": this.getCurrentCardDetails().cardType,
            "CardAccountNumber": this.getCurrentCardDetails().maskedCardNumber,
            "CardAccountName": this.getCurrentCardDetails().cardProductName,
            "AccountType": 'CARD',
            "RequestCode": "NEW_PIN",
            "Channel": "Online"
          };
        }
        else {
          cardDetails = {
            "cardNumber": this.getCurrentCardDetails().cardId,
            "view": "pinChange",
            "cardType": this.getCurrentCardDetails().cardType,
            "Reason": "lb"
          };
        }
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxSetPurchaseLimitOnClick: function () {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        var currentCardDetails = this.getCurrentCardDetails();
        var cardLimitDetails = {
          "cardId": currentCardDetails.cardId,
          "currencyCode": currentCardDetails.currencyCode,
          "purchaseLimit": currentCardDetails.purchaseLimit,
          "purchaseMinLimit": currentCardDetails.purchaseMinLimit,
          "purchaseMaxLimit": currentCardDetails.purchaseMaxLimit,
          "purchaseStepLimit": currentCardDetails.purchaseStepLimit
        };
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.navigateToSetPurchaseCardLimit(cardLimitDetails);
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    flxSetATMWithdrawalLimitOnClick: function () {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        var currentCardDetails = this.getCurrentCardDetails();
        var cardLimitDetails = {
          "cardId": currentCardDetails.cardId,
          "currencyCode": currentCardDetails.currencyCode,
          "withdrawalLimit": currentCardDetails.withdrawlLimit,
          "withdrawalMinLimit": currentCardDetails.withdrawalMinLimit,
          "withdrawalMaxLimit": currentCardDetails.withdrawalMaxLimit,
          "withdrawalStepLimit": currentCardDetails.withdrawalStepLimit
        };
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.navigateToSetWithdrawalCardLimit(cardLimitDetails);
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxReplaceCardOnClick: function () {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
          "cardId": this.getCurrentCardDetails().cardId,
          "view": "replaceCard",
          "cardNumber": currentCardDetails.maskedCardNumber,
          "cardHolderName": currentCardDetails.cardHolderName,
          "expiryDate": currentCardDetails.expiryDate,
          "issuerName": bankName,
          "cardType": currentCardDetails.cardType
        };
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxReportStolenOrLostOnClick: function () {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
          "cardId": this.getCurrentCardDetails().cardId,
          "view": "lostCard",
          "cardNumber": currentCardDetails.maskedCardNumber,
          "cardHolderName": currentCardDetails.chName,
          "Reason": kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard"),
          "expiryDate": currentCardDetails.cardExpDate,
          "issuerName": bankName,
          "cardType": currentCardDetails.cardType
        };
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxCancelCardOnClick: function () {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
          "cardId": currentCardDetails.cardId,
          "view": "cancelCard",
          "cardNumber": currentCardDetails.maskedCardNumber,
          "cardHolderName": currentCardDetails.cardHolderName,
          "expiryDate": currentCardDetails.expiryDate,
          "issuerName": bankName,
          "cardType": currentCardDetails.cardType
        };
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setViewForPinChange: function (cardType) {
      // this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxManageTravelPlanButton.setVisibility(false);
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      // if (cardType === applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
      //   this.view.flxCancelCard.setVisibility(true);
      // else
      //   this.view.flxCancelCard.setVisibility(false);
      // this.view.flxSetPurchaseLimit.setVisibility(true);
      // this.view.flxSetATMWithdrawalLimit.setVisibility(true);
      this.view.flxCustomerCare.setVisibility(false);
      // if (this.cardList[this.cardListIndex].cardType === "Debit") {
      //   this.view.flxViewStatements.setVisibility(false);
      // } else this.view.flxViewStatements.setVisibility(true);
      this.view.flxCardDetails.setVisibility(true);
    },
    setViewForReplaceCard: function (cardType) {
      // this.view.switchActiveorInactive.selectedIndex = 1;
      this.view.flxReportStolenOrLost.setVisibility(true);
      this.view.flxSeperator5.setVisibility(false);
      // this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      // this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      this.view.flxManageTravelPlanButton.setVisibility(false);
      // if (cardType === applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
      //   this.view.flxCancelCard.setVisibility(true);
      // else
      //   this.view.flxCancelCard.setVisibility(false);
      this.view.flxCustomerCare.setVisibility(false);
    },
    setViewForStolenCard: function (cardType) {
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      this.view.flxManageTravelPlanButton.setVisibility(false);
      this.view.flxOptionsContainer.setVisibility(false);
      this.view.flxActivateCardMsg.setVisibility(false);

      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.LostOrStolenMsg");
       this.view.flxCallCusCare.setVisibility(true);
      this.view.flxCustomerCare.setVisibility(true);

      // this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
      // this.view.switchActiveorInactive.selectedIndex = 0;
      // this.view.flxActiveOrInactive.forceLayout();
    },
    setCardInactive: function () {
      // this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxManageTravelPlanButton.setVisibility(false);
      // if (this.cardList[this.cardListIndex].cardType === "Debit") {
      //   this.view.flxViewStatements.setVisibility(false);
      // } else this.view.flxViewStatements.setVisibility(true);
      this.view.flxCardDetails.setVisibility(true);
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
      this.view.flxCustomerCare.forceLayout();
      // this.view.flxCustomerCare.setVisibility(true);
    },
    setViewForCancelCard: function () {
      // this.view.flxOptionsContainer.setVisibility(false);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      // this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
      this.view.flxManageTravelPlanButton.setVisibility(false);
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMessage");
      this.view.flxCustomerCare.forceLayout();
      // this.view.flxCustomerCare.setVisibility(true);
    },
    setViewForIssuedCard: function () {
      this.view.flxOptionsContainer.setVisibility(false);
      this.view.flxCancelCard.setVisibility(false);
      this.view.flxCustomerCare.setVisibility(false);
      this.view.flxActivateCardMsg.setVisibility(true);
      // this.view.flxMainTabs.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(false);
      this.view.flxManageTravelPlanButton.setVisibility(false);
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      //  this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMessage");
      // this.view.flxCustomerCare.forceLayout();
    },
    setViewForReplacedCard: function (cardType) {
      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replaceMessage");
      this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxManageTravelPlanButton.setVisibility(false);
      if (this.expiryFlag === true) {
        this.expiryCardsProcess();
      }
      //       else
      //         {
      //           this.view.btnExpiry.setVisibility(false);
      //         }
      this.view.flxActiveOrInactive.setVisibility(true);
      this.view.flxSeperator2.setVisibility(false);
      this.view.flxChangePin.setVisibility(false);
      this.view.flxSeperator3.setVisibility(false);
      this.view.flxReplaceCard.setVisibility(false);
      this.view.flxSeperator4.setVisibility(false);
      this.view.flxReportStolenOrLost.setVisibility(true);
      this.view.flxSeperator5.setVisibility(false);
      // this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
      // if (cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
      //   this.view.flxCancelCard.setVisibility(true);
      // else
      //   this.view.flxCancelCard.setVisibility(false);
      // this.view.flxCancelCard.setVisibility(true);
      //  this.view.flxSeperator6.setVisibility(true);
      this.view.flxCustomerCare.setVisibility(false);
      // this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
      // this.view.switchActiveorInactive.selectedIndex = 0;
      this.view.flxActiveOrInactive.forceLayout();
    },
    getCurrentCardDetails: function () {
      return this.cardList[this.cardListIndex];
    },
    navigateToCardMngDetails: function () {
      var scope = this;
      try{
      if ((this.cardListTotalCards > 0) && (!(this.getCurrentCardDetails().cardStatus === "Issued") || !(this.getCurrentCardDetails().cardStatus === "Inactive"))) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardManageDetails", this.cardList[this.cardListIndex]);
        navManager.setCustomInfo("buisnessuser", this.users);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardManageDetails");
      }
      } catch (e) {
        scope.alertCallback();
        kony.print("navigateToCardMngDetails: " + e);
      }
    },
    clone: function (obj) {
      if (null === obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    },
    navigateToMenu: function () {
      //var navManager = applicationManager.getNavigationManager();
      //navManager.goBack();
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
    navigateToCardsEachflow: function () {
      try {
        var scope = this;
        this.view.customHeader.btnRight.onClick = this.goBackToHome;
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardMgtSecurityCode");
        if (frmData === undefined) {
          var newObj = {
            "view": "none"
          };
          frmData = newObj;
        }
        if (frmData.view === "lockCard") {
          this.setFunctionalityForLockCard(frmData);
        }
        if (frmData.view === "unlockCard") {
          this.setFunctionalityForUnlockCard(frmData);
        }
        if (frmData.view === "pinChange") {
          this.setFunctionalityForPinChange(frmData);
        }
        if (frmData.view === "replaceCard") {
          this.setFunctionalityForReplaceCard(frmData);
        }
        if (frmData.view === "lostCard") {
          this.setFunctionalityForLostCard(frmData);
        }
        if (frmData.view === "cancelCard") {
          this.setFunctionalityForCancelCard(frmData);
        }
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForLockCard: function (cardData) {
      var scope = this;
      cardData.Action = "Lock";
      cardData.Reason = "Lock";
      cardData.status = scope_configManager.getLockCardStatus();

      //  this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
      //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
      //   this.view.btnProceed.onClick = function() {
      scope.lockUnlockCard(cardData);
      // };
    },
    setFunctionalityForUnlockCard: function (cardData) {
      var scope = this;
      cardData.Action = "Unlock";
      cardData.Reason = "Unlock";
      cardData.status = scope_configManager.getActivateCardStatus();
      //  this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");
      //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");
      //this.view.btnProceed.onClick = function() {
      scope.lockUnlockCard(cardData);
      // };
    },
    showEmptyBillingAddressError: function () {
      var scope = this;
      if (!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
        scope.timerCounter = parseInt(scope.timerCounter) + 1;
      }
      else {
        scope.timerCounter = 1;
      }

      var timerId = "timerPopupError_frmCardManageHome_BillingAddress" + scope.timerCounter;
      scope.view.customPopup.imgPopup.src = "errormessage.png";
      scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardManage.AddAddress");
      scope.view.flxPopup.skin = "sknflxff5d6e";
      scope.view.flxPopup.setVisibility(true);

      kony.timer.schedule(timerId, function () {
        var timerScope;
        if (!kony.sdk.isNullOrUndefined(scope)) {
          timerScope = scope;
        }
        else {
          timerScope = this;
        }
        timerScope.view.flxPopup.setVisibility(false);
      }, 1.5, false);
      scope_ManageCards_Pres.isBillingAddressAvailable = true;
    },
    lockUnlockCard: function (cardData) {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.updateCardData(cardData);
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForPinChange: function (cardDetails) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMgtSecurityCodeController : setFunctionalityForPinChange ####");
        cardDetails.Action = "PinChange";
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons", cardDetails);
        // if (cardDetails.cardType === "Credit") {
        //   var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //   manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        // }
        // else {
        // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        // manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngNewPin");
        navManager.navigateTo({"appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardMngNewPin"});

        // }
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForReplaceCard: function (cardData) {
      try {
        var scope = this;
        cardData.Action = "Replace";
        // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.view.btnProceed.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons", cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        //};
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForLostCard: function (cardData) {
      try {
        var scope = this;
        cardData.Action = "Report Lost";
        // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        // this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        //this.view.btnProceed.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("frmCardMngReasons", cardData);
        navManager.setCustomInfo("frmCardMngConfirmDetails", cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        // manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngConfirmDetails");
        //   };
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForCancelCard: function (cardData) {
      try {
        var scope = this;
        cardData.Action = "Cancel";
        // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        // this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        //this.view.btnProceed.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons", cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        //  };
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    activateCards: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmCardManageNewCVV");
    },
    activateExpiryCards: function (response) {
      //if(response===true)
      //{
      scope_ManageCards_Pres.isReplaceCardScenario = true;
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmCardManageOldCVV");
      //}
    },
    expiryCardsProcess: function () {
      //       var basicConfig={
      //             "alertType": constants.ALERT_TYPE_CONFIRMATION,
      //             "message": "Card is About to Expire. Please Activate Card",
      //             "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      //             "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      //           //  "message": "Do you wish to continue?",
      //             "alertHandler": this.activateExpiryCards
      //           };
      //     applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
      this.view.flxAboutExpire.setVisibility(true);
    },
    /**
   * @function
   * Entry to Travel Notification Management Home
   * form: frmManageTravelPlans
   */
    navigateToTravelManageHome: function () {

      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.fetchTravelPlans();

    },

    viewStatements: function () {
       var scope = this;
      try {
      var param = {
        'accountNumber': this.getCurrentCardDetails().pan,
        'accountName': this.getCurrentCardDetails().chName,
        'searchTransactionType': "Cards",
        'searchStartDate': applicationManager.getFormatUtilManager().getFormatedDateString(new Date(this.getCurrentCardDetails().cardIssuedDate), "Y"),
        'searchEndDate': applicationManager.getFormatUtilManager().getFormatedDateString(new Date(), "Y"),
        'dateFormat': 'm/d/Y',
        'fileType': 'pdf',
        'title': 'Transactions',
        'generatedBy': kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName,
        "card_id": this.cardId,
        "maskedCardNumber": this.currCardNumber
      }
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.navigateToCardstatements(param);//this.cardId,this.currCardNumber
      } catch (e) {
        scope.alertCallback();
        kony.print("viewStatements: " + e);
      }
    },
    navigateToFilterOrApplyCard: function () {
       var scope = this;
      try {
      this.view.flxHeader.setEnabled(false);
      this.view.flxMainContainer.setEnabled(false);
      this.view.flxHamburger.setEnabled(false);
      this.view.flxNoCards.setEnabled(false);
      this.view.flxManageTravelPlanButton.setEnabled(false);
      this.view.flxFooter.setEnabled(false);
      if (applicationManager.getDeviceUtilManager().isIPhone()) {
        this.view.flxPopupApplyForCard.setVisibility(false);

        var actionSheetObject = new kony.ui.ActionSheet({
          "title": null,
          "message": null,
          "showCompletionCallback": null
        });
        applicationManager.actionSheetObject = actionSheetObject;


        //"View Card Details"
        // var viewCardDetails = new kony.ui.ActionItem({
        //   "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.ViewCardDetails", "View Card Details"),
        //   "style": constants.ACTION_STYLE_DEFAULT,
        //   "action": this.navigateToCardMngDetails
        // });
        //"Filter Cards"
        var filterCardsAI = new kony.ui.ActionItem({
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.filterCards", "Filter Cards"),
          "style": constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnFilterCards.onClick
        });
        //"Change Profile Picture"
        var applyNewCardAI = new kony.ui.ActionItem({
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.applyNewCard", "Change Profile Picture"),
          "style": constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnApplyForCard.onClick
        });
        //"Cancel"
        var actionCancel = new kony.ui.ActionItem({
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel", "Cancel"),
          "style": constants.ACTION_ITEM_STYLE_CANCEL,
          "action": this.enableBackgroundonClose
        });
        // actionSheetObject.addAction(viewCardDetails);
        actionSheetObject.addAction(filterCardsAI);
        actionSheetObject.addAction(applyNewCardAI);
        actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
      }
      else
        this.view.flxPopupApplyForCard.setVisibility(true);
      } catch (e) {
        scope.alertCallback();
        kony.print("navigateToFilterOrApplyCard: " + e);
      }
    },
    enableBackgroundonClose: function () {
      var scope = this;
      scope.view.flxMainContainer.setEnabled(true);
    },
    cancelFlex: function () {
      this.view.flxPopupApplyForCard.setVisibility(false);
      this.view.flxHeader.setEnabled(true);
      this.view.flxMainContainer.setEnabled(true);
      this.view.flxHamburger.setEnabled(true);
      this.view.flxNoCards.setEnabled(true);
      this.view.flxManageTravelPlanButton.setEnabled(false);
      this.view.flxFooter.setEnabled(true);
    },
    navigateToFilterCards: function () {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageFilterCards");
    },
    applyForNewCard: function () {
       var scope = this;
      try {
      /*
      applicationManager.getPresentationUtility().showLoadingScreen();
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.navigateToNewCardFlow();
     
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmApplyForCardsNew" });
      */
        applicationManager.getPresentationUtility().showLoadingScreen();
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "ManageCardsUIModule",
          "appName": "CardsMA"
        });
        var param = "";
        manageCardsModule.presentationController.getHBLCardLimitsNew(param);  
        } catch (e) {
        scope.alertCallback();
        kony.print("applyForNewCard: " + e);
      }
    },
    setPayMethods: function (cardStatus) {
      var wallet = new WalletsIntegration();
      let applePayPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_ADD_CARD_APPLE_WALLET");
      let samsungPayPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_ADD_CARD_SAMSUNG_PAY");
      let googlePayPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_ADD_CARD_GOOGLE_PAY");
      this.resetPayFlexs();
      if (applePayPermission.toString() === "true" && wallet.isApplePaySupported().toString() === "true") {
        this.view.flxApplePay.setVisibility(true);
        this.view.flxSeperatorPay4.setVisibility(false);
      }
      if (samsungPayPermission.toString() === "true") {
        wallet.isSamsungPaySupported(this.samsungPayCallBack);
      }

      if (googlePayPermission.toString() === "true" && wallet.isGooglePaySupported().toString() === "true") {
        this.view.flxGooglePay.setVisibility(true);
        this.view.flxSeperatorPay6.setVisibility(false);
      }
    },
    applePay: function () {
      this.navToAddCards("ApplePay");
    },
    samsumgPay: function () {
      this.navToAddCards("SamsungPay");
    },
    googlePay: function () {
      this.navToAddCards("GooglePay");
    },
    navToAddCards: function (param) {
      var scope = this;
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardManagePay", param);
        navManager.setCustomInfo("frmCardManagePay_cardDetails", currentCardDetails);
        navManager.navigateTo("frmCardManagePay");
      } catch (e) {
        scope.alertCallback();
        kony.print("navToCards: " + e);
      }
    },
    SCAComponentUnLockCall: function (response) {
      var scopeObj = this;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      response.userName = userName;
      response.userDetails = {
        "data1": response.flowType,
        "data2": response.action
      };
      applicationManager.getMFAManager().setMFAFlowType(response.flowType);
      if (1 === CommonUtilities.getSCAType()) {
        try {
          scopeObj.view.SCAComponent.setVisibility(true);
          scopeObj.view.SCAComponent.setContext(response);
        } catch (e) {
          kony.print(" Unlock SCAComponent Call-->" + e);
          kony.print(e);
        }
      }
    },
    scaSuccessCallback: function (response) {
      applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
    },
    scaFailureCallback: function (response) {
      if (response.hasOwnProperty("isLogoutUser") && response.isLogoutUser) {
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
        loginData = loginData ? loginData : {};
        loginData.toastMessage = response.errorMessage;
        applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
        const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        authMod.presentationController.onLogout();
      } else {
        applicationManager.getPresentationUtility().MFA.onMFAError(response);
      }
    },

    SCAComponentActivationCall: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scopeObj = this;
      this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
      this.view.SCAComponent.onFailureCallback = this.scaFailureCallback;
      this.view.SCAComponent.zIndex = 300;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      response.userName = userName;
      this.view.flxActivateCardMsg.setVisibility(false);
      response.userDetails = {
        //  "data1": this.keypadString,
        //"data2": scope_ManageCards_Pres.currentCardDetails["cardId"]
        "data1": response.flowType,
        "data2": "ACTIVATE"
      };
      if (1 === CommonUtilities.getSCAType()) {
        try {
          scopeObj.view.SCAComponent.setVisibility(true);

          scopeObj.view.SCAComponent.setContext(response);
        } catch (e) {
          kony.print("Card activation SCAComponent Call-->" + e);
          kony.print(e);
        }
      }
    },
    showPopup: function (message, isSuccess) {
      if (isSuccess) {
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, message);
      } else if (!isSuccess) { applicationManager.getDataProcessorUtility().showToastMessageError(this, message) };
    },
    noEligibleAccountsNative: function () {
     // kony.ui.Alert({
       // "alertType": constants.ALERT_TYPE_INFO,
      //  "alertTitle": "",
      //  "message": kony.i18n.getLocalizedString("i18n.cardPayment.inEligibleAcc"),
      //  "alertHandler": this.alertCallback,
      //  "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      //}, 
	   applicationManager.getPresentationUtility().Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.cardPayment.inEligibleAcc"),
        "alertHandler": this.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      }, {});
    },

    noEligibleAccounts: function () {
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": kony.i18n.getLocalizedString("konymb.hbl.cards.NoEligibleAccounts"),
        "message": kony.i18n.getLocalizedString("i18n.cardPayment.inEligibleAcc"),
        "alertHandler": this.alertCallback.bind(this),
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      };
      applicationManager.getPresentationUtility().Alert(basicConfig, {});
      return;
    },
    showCustomOkPopup: function (title, message) {
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": kony.i18n.getLocalizedString(title),
        "message": kony.i18n.getLocalizedString(message),
        "alertHandler": this.alertCallback.bind(this),
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      };
      applicationManager.getPresentationUtility().Alert(basicConfig, {});
      return;
    },
    alertCallback: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  };
});