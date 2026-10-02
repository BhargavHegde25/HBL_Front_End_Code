define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  
    preShow : function () {
      this.formatCardsData();
      this.view.txtNewPassword.setFocus(true);
      var navManager = applicationManager.getNavigationManager();
      var flow = navManager.getCustomInfo("cardSelectionType");
      if (flow === "debitCard") {
        var data = navManager.getCustomInfo("selectedCardAccountDetails");
        var accountHolderName = data.accountName;
        if (!kony.sdk.isNullOrUndefined(accountHolderName)) {
          var truncatedName = this.truncateAccountHolderName(accountHolderName);
          var formattedName = truncatedName.toUpperCase();
          this.view.txtNewPassword.text = formattedName;
        }
      } else if (flow === "physicalPrepaidCard") {
        this.dashboardAccountData();
      }
      this.initActions();
      this.renderTitleBar();
      //  this.handleData();
      this.addDataIntoSegment();
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
      var flow = navManager.getCustomInfo("cardSelectionType");
      if (flow === "debitCard" || flow === "physicalPrepaidCard") {
        if (this.view.txtNewPassword.text === "") {
          this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
          this.view.btnUpdatePassword.setEnabled(false);
        } else {
          this.view.btnUpdatePassword.skin = "sknBtn055BAF26px";
          this.view.btnUpdatePassword.setEnabled(true);
        }
      } else if (flow === "virtualPrepaidCard") {
        this.view.btnUpdatePassword.skin = "sknBtn055BAF26px";
        this.view.btnUpdatePassword.setEnabled(true);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      this.checkForToastMessageError();
    },

    dashboardAccountData: function () {
      var data = applicationManager.getDefaultDashboardObj();
      if (!kony.sdk.isNullOrUndefined(data)) {
        var acctId = data.Accounts[0].account_id;
        var name = data.Accounts[0].accountName;
        var currency = data.Accounts[0].currencyCode;
        if (currency === "NPR") {
          var truncatedName = this.truncateAccountHolderName(name);
          var formattedName = truncatedName.toUpperCase();
          this.view.txtNewPassword.text = formattedName;
        } else {
          this.firstNprAccount();
        }
      }
    },
    firstNprAccount: function () {
      var accountObj = applicationManager.getAccountManager();
      var acctInfo = accountObj.getSavingsAndCheckingsAccounts();
      var filterList = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      var filterListBasedOnCurrency = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => ((["NPR"].includes(item["currencyCode"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      if (!kony.sdk.isNullOrUndefined(acctInfo)) {
        var acctInfoInp = filterList(acctInfo);
        var acctInfoBasedOnCurrency = filterListBasedOnCurrency(acctInfoInp);
        if (!kony.sdk.isNullOrUndefined(acctInfoBasedOnCurrency)) {
          var data = acctInfoBasedOnCurrency[0];
          var acctId = data.accountID;
          var name = data.accountName;
          var truncatedName = this.truncateAccountHolderName(name);
          var formattedName = truncatedName.toUpperCase();
          this.view.txtNewPassword.text = formattedName;
        } else {
          var data = applicationManager.getDefaultDashboardObj();
          if (!kony.sdk.isNullOrUndefined(data)) {
            var name = data.Accounts[0].accountName;
            var truncatedName = this.truncateAccountHolderName(name);
            var formattedName = truncatedName.toUpperCase();
            this.view.txtNewPassword.text = formattedName;
          }
        }
      }
    },
  truncateAccountHolderName : function (accountHolderName) {
    if (accountHolderName.length > 25) {
      return accountHolderName.substring(0, 25) + "...";
    }
    return accountHolderName;
  },
  formatCardsData : function () {
    var navManager = applicationManager.getNavigationManager();
    var cardDetails = navManager.getCustomInfo("cardDetailsFromSelectCard");
    var data = cardDetails;
    var navManager = applicationManager.getNavigationManager();
    var details = navManager.getCustomInfo("selectedCardAccountDetails");
    var flow = navManager.getCustomInfo("cardSelectionType");
      if (flow === "debitCard") {
        if (!kony.sdk.isNullOrUndefined(details)) {
          var nickName = details.nickName;
          var accountName = details.accountName;
          if (!kony.sdk.isNullOrUndefined(nickName)) {
            var name = nickName || "";
          }
          else if (!kony.sdk.isNullOrUndefined(accountName)) {
            var name = accountName || "";
          }
        var cardName = data.lblCardName.text;
          if (!kony.sdk.isNullOrUndefined(accountName)) {
            var cardHolderName = accountName;
          }
          navManager.setCustomInfo("cardHolderName", cardHolderName);
        var accId = details.accountID;
        navManager.setCustomInfo("accountDetailsForCards", {
          "nameOnTheCard": name,
          "debitAccount": accId
        });
        var formattedName = name + "...." + accId.slice(-4);
        navManager.getCustomInfo("selectedCardAccountDetails");
        let jsonData = {};
        var dataNew = {
          [kony.i18n.getLocalizedString("i18n.UnifiedTransfer.FromAccount")]: formattedName,
          [kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")]: cardName
        };
        for (let key in dataNew) {
          jsonData[key] = dataNew[key];
        }
        var limit1Visibility = data.lblDailyPurchaseLimit.isVisible;
        var limit2Visibility = data.lblDailyWithdrawleLimit.isVisible;
        var limit3Visibility = data.lblAnnualChanrges.isVisible;
        if (limit1Visibility === true) {
          var data1 = data.lblDailyPurchaseLimit.text;
          var parts = data1.split(':');
          key1 = parts[0].trim();
          var value1 = parts[1].trim();
          jsonData[key1] = value1;
        }
        if (limit2Visibility === true) {
          var data2 = data.lblDailyWithdrawleLimit.text;
          var parts = data2.split(':');
          key2 = parts[0].trim();
          var value2 = parts[1].trim();
          jsonData[key2] = value2;
        }
        if (limit3Visibility === true) {
          var data3 = data.lblAnnualChanrges.text;
          var parts = data3.split(':');
          key3 = parts[0].trim();
          var value3 = parts[1].trim();
          jsonData[key3] = value3;
        }
        navManager.setCustomInfo("formattedCardDetails", jsonData);
      } 
    }
    else if(flow === "physicalPrepaidCard"){
        var cardName = data.lblCardName.text;
        var navMan = applicationManager.getNavigationManager();
        var selectedCardSubType = navMan.getCustomInfo("selectedCardSubType");
        let jsonData = {};
        var dataNew = {
          [kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")]: selectedCardSubType,
          [kony.i18n.getLocalizedString("i18n.HBL.Cards.CardName")]: cardName
        };
        for (let key in dataNew) {
          jsonData[key] = dataNew[key];
        }
        var limit1Visibility = data.lblDailyPurchaseLimit.isVisible;
        var limit2Visibility = data.lblDailyWithdrawleLimit.isVisible;
        var limit3Visibility = data.lblAnnualChanrges.isVisible;
        if (limit1Visibility === true) {
          var data1 = data.lblDailyPurchaseLimit.text;
          var parts = data1.split(':');
          key1 = parts[0].trim();
          var value1 = parts[1].trim();
          jsonData[key1] = value1;
        }
        if (limit2Visibility === true) {
          var data2 = data.lblDailyWithdrawleLimit.text;
          var parts = data2.split(':');
          key2 = parts[0].trim();
          var value2 = parts[1].trim();
          jsonData[key2] = value2;
        }
        if (limit3Visibility === true) {
          var data3 = data.lblAnnualChanrges.text;
          var parts = data3.split(':');
          key3 = parts[0].trim();
          var value3 = parts[1].trim();
          jsonData[key3] = value3;
        }
        navManager.setCustomInfo("formattedCardDetails", jsonData);
      } else if (flow === "virtualPrepaidCard") {
        var navManager = applicationManager.getNavigationManager();
        var details = navManager.getCustomInfo("virtualPrepaidCardDetails");
        var convertedAmount = navManager.getCustomInfo("convertedAmountRate");
        var param = navManager.getCustomInfo("currencyConversionData");
        var amountInNPR = param.transactionAmount;
        var finalAmount = parseFloat(amountInNPR) * parseFloat(convertedAmount);
        var debitAmountFormatted = "NPR " + CommonUtilities.formatCurrencyWithCommas(finalAmount, true);
        let jsonData = {};
        var dataNew = {
          [kony.i18n.getLocalizedString("i18n.UnifiedTransfer.FromAccount")]: details.fromAccount,
          [kony.i18n.getLocalizedString("i18n.HBL.Cards.PANNumber")]: details.panNo,
          [kony.i18n.getLocalizedString("i18n.HBL.Cards.CardFee")]: details.cardFee,
          [kony.i18n.getLocalizedString("i18n.HBL.Cards.TopupAmount")]: details.topUpAmount,
          [kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt")]: debitAmountFormatted,
          [kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")]: details.virtualCardType,
        };
        for (let key in dataNew) {
          jsonData[key] = dataNew[key];
        }
        navManager.setCustomInfo("formattedCardDetails", jsonData);
      }
  },
  renderTitleBar :function(){
    var navManager = applicationManager.getNavigationManager();
    var flow = navManager.getCustomInfo("cardSelectionType");
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      if (flow === "debitCard") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
          this.view.lblName.isVisible = true;
          this.view.txtNewPassword.isVisible = true;
      } else if (flow === "physicalPrepaidCard") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
          this.view.lblName.isVisible = true;
          this.view.txtNewPassword.isVisible = true;
        } else if (flow === "virtualPrepaidCard") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
          this.view.lblName.isVisible = false;
          this.view.txtNewPassword.isVisible = false;
      }
      this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
    } else {
      if (flow === "debitCard") {
          this.view.lblName.isVisible = true;
          this.view.txtNewPassword.isVisible = true;
        this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
      } else if (flow === "physicalPrepaidCard") {
          this.view.lblName.isVisible = true;
          this.view.txtNewPassword.isVisible = true;
        this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
        } else if (flow === "virtualPrepaidCard") {
          this.view.lblName.isVisible = false;
          this.view.txtNewPassword.isVisible = false;
          this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
      }
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
    }
  },
  addDataIntoSegment : function () {
    var loggerManager = applicationManager.getLoggerManager();
    try {
      this.view.segCardDetails.rowSkin = "sknSegffffff";
      this.view.segCardDetails.rowFocusSkin = "sknSegffffff";
      this.view.segCardDetails.widgetDataMap = {
        lblKey: "lblKey",
        lblValue: "lblValue"
      };
      this.createViewForDedit();
      /*
      if (cardType === 'Credit') {
      this.createViewForCredit(cardDetails);
      }
      else if(cardType === 'Debit')
      {
        this.createViewForDedit(cardDetails);
      }else if(cardType === 'Prepaid'){
        this.createViewForPrepaid(cardDetails);
      }
      */
    }
    catch (err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  createViewForDedit: function () {
    // this.view.segCardDetails.removeAll();
    var navManager = applicationManager.getNavigationManager();
    //var cardData = navManager.getCustomInfo("cardDetails");
    var cardData = navManager.getCustomInfo("formattedCardDetails");
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
  handleData : function(){

    var cardobjIns = applicationManager.getCardsManager().getCardObject();
    if (!cardobjIns.cardDisplayName) {
      this.view.lblRemChars.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.newCardNameRemChar")+" "+25
      this.view.txtNewPassword.text = "";
      this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
      this.view.btnUpdatePassword.setEnabled(false);
    }
  },
  initActions: function () {
    this.view.btnUpdatePassword.onClick=this.validateUserName;
    this.view.customHeader.flxBack.onClick=this.goBack;
    this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
    this.view.txtNewPassword.onTextChange = this.onLastNameTextChange;
  },
  flxCancelOnClick : function () {
    var navManager = applicationManager.getNavigationManager(); 
    navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
},

    onLastNameTextChange: function () {
      var inputText = this.view.txtNewPassword.text;

      if (inputText === "") {
        this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnUpdatePassword.setEnabled(false);
      } else {
        var filteredText = inputText.replace(/[^a-zA-Z ]/g, '');
        var upperCaseName = filteredText.toUpperCase();
        if (upperCaseName !== inputText) {
          this.view.txtNewPassword.text = upperCaseName;
        } else {
          this.view.txtNewPassword.text = upperCaseName;
        }
        this.view.btnUpdatePassword.skin = "sknBtn055BAF26px";
        this.view.btnUpdatePassword.setEnabled(true);
      }
    },

    validateUserName: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    var navManager = applicationManager.getNavigationManager();
    var cardDetails = navManager.getCustomInfo("cardDetailsFromSelectCard");
    var data = cardDetails;
      if (!kony.sdk.isNullOrUndefined(data)) {
    var cardType = data.cardType;
      }
    var accountData = navManager.getCustomInfo("accountDetailsForCards");
    var cardData = navManager.getCustomInfo("formattedCardDetails");
    var selectedCardSubType = navManager.getCustomInfo("selectedCardSubType");
      var flow = navManager.getCustomInfo("cardSelectionType");
      if (flow === "debitCard" || flow === "physicalPrepaidCard") {
    let jsonData = {};
    var dataNew = {
      [kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2")]: this.view.txtNewPassword.text
    };
    for (let key in cardData) {
      jsonData[key] = cardData[key];
    }
    var keysToRemove = ["Card Type", "From Account"];
    var filteredCardData = Object.keys(jsonData).reduce(function (result, key) {
      if (keysToRemove.indexOf(key) === -1) {
          result[key] = jsonData[key];
      }
      return result;
  }, {});
  cardData [kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2")]= this.view.txtNewPassword.text;
  navManager.setCustomInfo("formattedCardDetailsForacknowledgment", cardData);
      } else if (flow === "virtualPrepaidCard") {
        navManager.setCustomInfo("formattedCardDetailsForacknowledgment", cardData);
      }
    var navManager = applicationManager.getNavigationManager();
    var flow=  navManager.getCustomInfo("cardSelectionType"); 
    if(flow === "debitCard"){
      var paramDebit =
  {
      "serviceProvider": data.cardCategory.toLowerCase(),
      "cardType": this.getCardType(cardType),
      "cardDescription": data.cardDescription,
      "nameOnTheCard": this.view.txtNewPassword.text,
      "cardCategory": "",
      "panNo": "",
      "topupAmount": "",
      "debitAccount": accountData.debitAccount
    }
    paramDebit = Object.assign(paramDebit, filteredCardData);
      manageCardsModule.presentationController.applyNewCard(paramDebit);
    }else if(flow === "physicalPrepaidCard"){
      var paramPrepaid =
      {
        "serviceProvider": data.cardCategory.toLowerCase(),
        "cardType": this.getCardType(cardType),
        "cardDescription": data.cardDescription,
        "nameOnTheCard": this.view.txtNewPassword.text,
        "cardCategory": selectedCardSubType,
        "panNo": "",
        "topupAmount": ""
      }
      paramPrepaid = Object.assign(paramPrepaid, filteredCardData);
      manageCardsModule.presentationController.applyNewCard(paramPrepaid);
      } else if (flow === "virtualPrepaidCard") {
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("virtualPrepaidCardDetails");
        var convertedDebitAmount = navManager.getCustomInfo("convertedAmount");
        if (!kony.sdk.isNullOrUndefined(convertedDebitAmount)) {
          var debitAmount = convertedDebitAmount;
        } else {
          var debitAmount = "";
    } 
        var paramVirtual =
        {
          "cardType": "virtualPrepaidCard",
          "debitAccount": data.accId,
          "serviceProvider": data.virtualCardType,
          "nameOnTheCard": "",
          "cardCategory": "",
          "panNo": data.panNo,
          "topupAmount": data.virtualAmount,
          "totalDebitAmount": debitAmount
        }
        manageCardsModule.presentationController.applyNewCard(paramVirtual);
      }
    //var nickname = this.view.txtNewPassword.text;
    //var patt = nickname.match(/[a-zA-Z\s]*/);
    /*
             if (patt[0] === nickname) {
               var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
                     manageCardsModule.presentationController.navigateToConfirm(this.view.txtNewPassword.text);
                 
             } else {
                 this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.manageCards.validName"));
             }
    */
  },
        
  getCardType: function (cardType) {
    if (cardType == "Debit Card") {
      return "debitcard"
    } else if (cardType == "Physical Prepaid Card") {
      return "physicalPrepaidCard"
    } else if (cardType == "Virtual Prepaid Card") {
      return "virtualPrepaidCard"
    }
  },
  bindViewError: function (msg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  cancelCommon: function () {
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
    },
    checkForToastMessageError: function () {
      var navManager = applicationManager.getNavigationManager();
      var flow = navManager.getCustomInfo("requestCardErrorFlow");
      var error = navManager.getCustomInfo("requestCardError");
      if (flow === "true") {
        if (!kony.sdk.isNullOrUndefined(error.errorMessage)) {
          var err = error.errorMessage;
          if (!kony.sdk.isNullOrUndefined(err)) {
            if (err === 'REQ_EXISTS' || err === "REQ_EXISTS") {
              applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.VirtualCardRequestExistError"));
              navManager.setCustomInfo("requestCardError", null);
              navManager.setCustomInfo("requestCardErrorFlow", null);
  }
          } else {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
            navManager.setCustomInfo("requestCardErrorFlow", null);
          }
        } else {
          applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
          navManager.setCustomInfo("requestCardErrorFlow", null);
        }
      }
    },
  }
});