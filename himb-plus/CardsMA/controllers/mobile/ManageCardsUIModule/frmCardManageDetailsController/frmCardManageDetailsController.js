define(['CommonUtilities'], function(CommonUtilities){
  return { 
  	preShow: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageDetailsController : preShow ####");
        this.hidePopUp();
        // 	this.resetVisibilityOfDetails();
        this.addDataIntoSegment(this.getCardData());
        this.view.customHeader.btnRight.onClick = this.flxRightOnClick;
        //this.view.btnAddNickname.onClick = this.btnAddNicknameOnClick;
        //this.view.btnEditBillingAddtess.onClick = this.btnEditBillingAddressOnClick;
        //this.view.btnEditNickName.onClick = this.btnAddNicknameOnClick;
        this.view.flxCardNoToggle.setVisibility(true);
        this.view.flxCardNoToggle.onClick = this.flxCardNoToggleOnClickNew; 
        this.view.flxCvvToggle.onClick = this.flxCvvToggleOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        var configManager =  applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
      var users = navManager.getCustomInfo("buisnessuser");
        var cardData = this.getCardData();
        var cardNo = cardData.cardId;
        var manageCardsPresenter = applicationManager.getModulesPresentationController({
          "appName": "CardsMA",
          "moduleName": "ManageCardsUIModule"
        });
        var param = {
          "cardNumber": cardNo
        }
        manageCardsPresenter.getCvv(param);
        /*
        if(configManager.isCombinedUser === "true"){
          //this.view.title = applicationManager.getUserPreferencesManager().getBankName();
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title=users.title;
          }else{
            this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.hamburger.cardmanagement")//users.title;
          }
        }else{
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title = applicationManager.getUserPreferencesManager().getBankName();
          }else{
            this.view.customHeader.lblLocateUs.text = applicationManager.getUserPreferencesManager().getBankName();
          }
        }
        */
        this.setTitleBarVisibility();     
        this.view.lblCvvValue.text = "XXX";
        this.view.imgCvvToggle.src = "viewactive.png";
        var cardData = this.getCardData();
        this.view.customHeader.lblLocateUs.text = cardData.Card_Label;
        var cardNo = cardData.cardId;
        var maskedCardNo = this.maskCardNumber(cardNo);
        this.view.lblCardNoValue.text = maskedCardNo;
        this.view.imgCardNoToggle.src = "viewactive.png";
        this.view.flxMainContainer.forceLayout();
        var navManager = applicationManager.getNavigationManager();
        var frmData = {
          "isMainScreen": false
        };
        navManager.setCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled", true);
        navManager.setCustomInfo("frmCardManageHome", frmData);

        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    resetVisibilityOfDetails: function(){
      try {
        this.view.flxAvailableBal.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
        this.view.flxValidThrough.setVisibility(true);
        this.view.flxSeperator4.setVisibility(true);
        this.view.flxBillingAddress.setVisibility(true);
        this.view.flxSeperator8.setVisibility(true);
        this.view.imgCardNoToggle.src = "view.png";
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    init : function(){
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    getCardData: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : getCardData ####");
        var navManager = applicationManager.getNavigationManager();
        var cardDetails = navManager.getCustomInfo("frmCardManageDetails");
        return cardDetails;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    addDataIntoSegment: function(cardDetails) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageDetailsController : addDataIntoSegment ####");
        var formatUtil = applicationManager.getFormatUtilManager();
        //this.view.lblCardNoValue.text =  formatUtil.formatCardNumber(cardDetails.maskedCardNumber);  //1234 5678 9123 XXXX
        this.view.lblCardNoValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(cardDetails.maskedCardNumber);
        this.view.imgCardNoToggle.src = "viewicon.png";
        var cardType = cardDetails.cardType;
        this.view.segCardDetails.rowSkin="sknSegffffff";
        this.view.segCardDetails.rowFocusSkin= "sknSegffffff";
        this.view.segCardDetails.widgetDataMap={
          lblKey:"key",
          lblValue:"value"
        };
        if (cardType === 'Credit') {
        this.createViewForCredit(cardDetails);
        }
        else if(cardType === 'Debit')
        {
          this.createViewForDedit(cardDetails);
        }else if(cardType === 'Prepaid'){
          this.createViewForPrepaid(cardDetails);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxRightOnClick: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
    },
    setTitleBarVisibility: function () {
      var cardData = this.getCardData();
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = cardData.Card_Label;
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
      } else {
        this.view.title = cardData.Card_Label;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
      }
    },
    createViewForCredit: function (cardDetails) {
      this.view.segCardDetails.removeAll();
      var formatUtil = applicationManager.getFormatUtilManager();
      var currency = this.getCurrencySymbolFromCode(cardDetails.currency);
      var creditLimit = cardDetails.creditLimit;
      var creditLimitModified = CommonUtilities.formatCurrencyWithCommas(creditLimit, true);
      var formattedCreditLimit = currency + " " + creditLimitModified;
      var outstanding = cardDetails.outstandingBalance;
      var outstandingModified = CommonUtilities.formatCurrencyWithCommas(outstanding, true);
      var formattedOutstanding = currency + " " + outstandingModified;
      var data =[
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.cardHolderName"),
          "value": cardDetails.accountName
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.achfiledetail.status"),
          "value": cardDetails.cardStatus
        },
        {
          "key":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Alerts.CreditLimitTitle"),
          "value": formattedCreditLimit
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.HBL.Cards.Outstanding"),
          "value": formattedOutstanding
        },
        /*
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.HBL.Cards.PaymentDueDate:"),
          "value": ""
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.HBL.Cards.RemainingLimit:"),
          "value": ""
        },
        */
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.ImportLC.ExpiryDate"),
          "value": cardDetails.formattedExpiryDate
        }
      ];
      if (cardDetails.secondaryCardHolder) {
        data.splice(data.length - 1, 0, {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.secCardHolder"),
          "value": cardDetails.secondaryCardHolder
        });
      }
      this.view.segCardDetails.setData(data);
    },
    createViewForDedit: function (cardDetails) {
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.segCardDetails.removeAll();
      var data =[
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.cardHolderName"),
          "value": cardDetails.accountName
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.achfiledetail.status"),
          "value": cardDetails.cardStatus
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.ImportLC.ExpiryDate"),
          "value": cardDetails.formattedExpiryDate
        },
      ];
      if (cardDetails.secondaryCardHolder) {
        data.push({
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.secCardHolder"),
          "value": cardDetails.secondaryCardHolder
        });
      }
      this.view.segCardDetails.setData(data);
        },
    createViewForPrepaid: function (cardDetails) {
      var formatUtil = applicationManager.getFormatUtilManager();
      this.view.segCardDetails.removeAll();
      var balance = cardDetails.availableBalance;
      var balanceModified = CommonUtilities.formatCurrencyWithCommas(balance, true);
      var currency = this.getCurrencySymbolFromCode(cardDetails.currency);
      var formattedBalance = currency + " " + balanceModified;
      var data = [
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.cardHolderName"),
          "value":cardDetails.accountName
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.achfiledetail.status"),
          "value": cardDetails.cardStatus
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.AccountsDetails.Balance"),
          "value": formattedBalance
        },
        {
          "key": applicationManager.getPresentationUtility().getStringFromi18n("i18n.ImportLC.ExpiryDate"),
          "value": cardDetails.formattedExpiryDate
        },
      ];
      if (cardDetails.secondaryCardHolder) {
        data.push({
          "key": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.secCardHolder"),
          "value": cardDetails.secondaryCardHolder
        });
      }
      this.view.segCardDetails.setData(data);
    },
    flxCardNoToggleOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : flxCardNoToggleOnClick ####");
        var cardData = this.getCardData();
        var navigationManager = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var IsMaskedNumberEnabled = navigationManager.getCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled");
        if (IsMaskedNumberEnabled === true) {
          this.view.imgCardNoToggle.src = "viewactive.png";
          this.view.lblCardNoValue.text = formatUtil.formatCardNumber(cardData["maskedCardNumber"]);
          navigationManager.setCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled", false);
          this.view.flxMainContainer.forceLayout();
        } else {
          this.view.imgCardNoToggle.src = "view.png";
          this.view.lblCardNoValue.text = formatUtil.formatCardNumber(cardData.maskedCardNumber);   //1234 5678 9123 XXXX
          navigationManager.setCustomInfo("frmCardManageDetailsController_IsMaskedNumberEnabled", true);
          this.view.flxMainContainer.forceLayout();
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxCvvToggleOnClick : function() {
      var scope = this;
      var navManager = applicationManager.getNavigationManager();
      var cvv = navManager.getCustomInfo("cvvDetails");
      if (scope.view.imgCvvToggle.src === "viewactive.png") {
        if (!kony.sdk.isNullOrUndefined(cvv)) {
        this.view.lblCvvValue.text = cvv;
        this.view.imgCvvToggle.src = "viewicon.png";
      } else {
          this.checkForToastMessageError();
        }
      } else {
        this.view.lblCvvValue.text = "XXX";
        this.view.imgCvvToggle.src = "viewactive.png";
      }
    },
    checkForToastMessageError: function () {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
    },
    flxCardNoToggleOnClickNew : function() {
      var scope = this;
      var cardData = this.getCardData();
      var cardNo = cardData.cardId;
      var maskedCardNo = this.maskCardNumber(cardNo);
      var formattedCardNo = this.formatCardNumber(cardNo);
      if (scope.view.imgCardNoToggle.src === "viewactive.png") {
        this.view.lblCardNoValue.text = formattedCardNo;
        this.view.imgCardNoToggle.src = "viewicon.png";
      } else {
        this.view.lblCardNoValue.text = maskedCardNo;
        this.view.imgCardNoToggle.src = "viewactive.png";
      }
    },
    maskCardNumber: function(number) {
			if (number.length == 16)
				return number.slice(0, 4) + " " + number.slice(4, 6) + "XX XXXX " + number.slice(-4);
			else if (number.length == 15)
				return number.slice(0, 5) + " " + number.slice(5, 6) + "XXXX X" + number.slice(-4);
			else if (number.length == 19)
				return number.slice(0, 5) + " " + number.slice(5, 6) + "XXXX XXXXX " + number.slice(-4);
		},
		formatCardNumber : function(number){
			if (number.length == 16)
				return number.slice(0, 4) + " " + number.slice(4, 8) + " " + number.slice(8, 12) + " " + number.slice(12, 16);
			else if (number.length == 15)
				return number.slice(0, 5) + " " + number.slice(5, 10) + " " + number.slice(10, 15);
			else if (number.length == 19)
				return number.slice(0, 5) + " " + number.slice(5, 10) + " " + number.slice(10, 15) + " " + number.slice(15, 19);
		},
     getCurrencySymbolFromCode: function(currencyCodeNumber) {
      var currencySymbols = {
          840: "USD", 
          524: "NPR", 
          356: "INR",
      };
      return currencySymbols[currencyCodeNumber]; 
  },
    renderTitleBar: function() {
      var configManager =  applicationManager.getConfigurationManager();
      var navManager = applicationManager.getNavigationManager();
      var users = navManager.getCustomInfo("buisnessuser");
      var isMirrorLayoutEnabled = CommonUtilities2.isMirrorLayoutEnabled();
      this.view.flxHeaderUsers.isVisible=false;
      if(configManager.isCombinedUser === "true"){
        this.view.flxAccountType.isVisible=true;
        (!isMirrorLayoutEnabled) ? this.view.lblCardNoValue.left="50dp" : this.view.lblCardNoValue.right="50dp";
         if(users.buisnessuser===1){
                 this.view.imgAccountType.src="businessaccount.png";
         }else{
            this.view.imgAccountType.src="personalaccount.png";
          }
      }else{
        this.view.flxAccountType.isVisible=false;
        (!isMirrorLayoutEnabled) ? this.view.lblCardNoValue.left="20dp" : this.view.lblCardNoValue.right="20dp";
      }
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.flxHeader.setVisibility(false);
        }else{
          this.view.flxHeader.setVisibility(true);
        }

    },
    btnRightOnClick: function() {
      if(applicationManager.getDeviceUtilManager().isIPhone()) {
        var actionSheetObject = new kony.ui.ActionSheet(
          {
            "title":null,
            "message":null,
            "showCompletionCallback": null
          }
        );
        applicationManager.actionSheetObject=actionSheetObject;
        var actionBillingAddress = new kony.ui.ActionItem(
          {
            "title":"Edit Billing Address",
            "style":constants.ACTION_STYLE_DEFAULT,
            "action": this.btnEditBillingAddressOnClick
          }
        );
        var actionEditNickName = new kony.ui.ActionItem(
          {
            "title":"Edit Card Nickname",
            "style":constants.ACTION_STYLE_DEFAULT,
            "action": this.btnAddNicknameOnClick
          }
        );
        var actionCancel = new kony.ui.ActionItem(
          {
            "title":"Cancel",
            "style":constants.ACTION_ITEM_STYLE_CANCEL,
            "action": null
          }
        );
        actionSheetObject.addAction(actionBillingAddress);
        actionSheetObject.addAction(actionEditNickName);
        actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
      }else{
        this.view.flxPopupNickName.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
        this.view.flxHeader.setEnabled(false);
      }
    },
    hidePopUp: function() {
      this.view.flxPopupNickName.setVisibility(false);
      this.view.flxMainContainer.setEnabled(true);
      this.view.flxHeader.setEnabled(true);
    },
    btnAddNicknameOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : btnAddNicknameOnClick ####");
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngNickName", this.getCardData());
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngNickName");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    btnEditBillingAddressOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.log("#### start frmExternalBankLoginController : btnEditBillingAddressOnClick ####");
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngBillAddress", this.getCardData());
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngBillAddress");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxBackOnClick: function() {
      var navManager = applicationManager.getNavigationManager();
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
      manageCardsModule.presentationController.showCardsHome();
    },
  };
});