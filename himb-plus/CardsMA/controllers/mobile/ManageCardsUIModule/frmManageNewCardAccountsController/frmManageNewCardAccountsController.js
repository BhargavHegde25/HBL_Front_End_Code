define({
  segmentData: null,
  savingAccounts: [],
  checkingAccounts: [],
  savingDataShown: [],
  checkingDataShown: [],
  init: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },
  preShow: function() {
    this.view.flxDescription.isVisible = true;
    this.setSegmentData();
    this.setTitleBarVisibility();
    this.view.segTransactions.onRowClick = this.navigateToNewCardList;
    this.view.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
    this.view.tbxSearch.text="";
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.cancelCommon;
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setTitleBarVisibility : function () {
    var navManager = applicationManager.getNavigationManager();
    var flow = navManager.getCustomInfo("cardSelectionType");
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
      if (flow === "debitCard") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
      }  else if (flow === "virtualPrepaidCard") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
      }else if(flow == "TopUpCards"){
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.common.SelectFromAccount");
      }
    } else {
      //this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "0dp";
      if (flow === "debitCard") {
        this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
      }  else if (flow === "virtualPrepaidCard") {
        this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
      }else if(flow == "TopUpCards"){
         this.view.title = kony.i18n.getLocalizedString("kony.mb.common.SelectFromAccount");
      }
    }
  },
  postShow: function() {},
  setSegmentData: function() {
    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("frmManageNewCardAccounts");
    var formattedData = [];
    for (var i = 0; i < data.length; i++) {
      var accountArray = data[i];
      for (var j = 0; j < accountArray.length; j++) {
        var account = accountArray[j];
        var nickName = account.nickName;
        var accountName =  account.accountName;
        if(!kony.sdk.isNullOrUndefined(nickName)) {
          var name = nickName || "";
        }
        else if(!kony.sdk.isNullOrUndefined(accountName)) {
          var name = accountName || "";
        }
        var acctId = account.accountID || "";
        var formattedAccountName = name + "...." + acctId.slice(-4);
        account.formattedAccountName = formattedAccountName;
      }
      formattedData.push(accountArray);
    }
    this.savingAccounts = data[1];
    this.checkingAccounts = data[0];
    this.checkingDataShown = data[0];
    this.savingDataShown = data[1];
    this.view.segTransactions.widgetDataMap = {
      lblAccountName: "formattedAccountName",//nickName
      lblBankName: "bankName",
      lblAccountBalValue: "availableBalance",
      lblAccountBal: "accountBalanceType",
      lblHeader: "lblHeader",
      flxMain: "flxMain",
      imgUpArrow: "imgUpArrow",
      imgBankIcon:"imgBankIcon"
    };
    this.view.flxNoTransactions.isVisible = false;
    var self = this;
    this.view.segTransactions.isVisible = true;
    if (this.savingAccounts.length > 0 && this.checkingAccounts.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + this.checkingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, this.checkingAccounts],
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + this.savingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, this.savingAccounts]
      ]
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else if (this.savingAccounts.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + this.savingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, this.savingAccounts]
      ];
      this.segmentData = data;
      this.checkingAccounts = [];
      this.view.segTransactions.setData(data);
    } else if (this.checkingAccounts.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + this.checkingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, this.checkingAccounts]
      ];
      this.savingAccounts = [];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else {
      this.segmentData = [];
      this.view.flxNoTransactions.isVisible = true;
      this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.BillPay.NoAccountsAvailable");
      this.view.segTransactions.isVisible = false;
      this.view.flxDescription.isVisible = false;
    }
    this.view.flxMainContainer.forceLayout();
  },

    navigateToNewCardList: function () {
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
    //  var accountType= this.view.segTransactions.selectedRowIndex[0]==0?"Checking":"Savings";
    //  var accountType=this.view.segTransactions.selectedItems[0].accountType;
    var accountType = this.view.segTransactions.selectedItems[0];
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("selectedCardAccountDetails", accountType);
    var availableBalance = accountType.availableBalance;
    for(var i=0;i<scope_configManager.userAccounts.length;i++){
    if(scope_configManager.userAccounts[i].accountID ==accountType.accountID){
       presenter.presentationController.currentBalance =scope_configManager.userAccounts[i].currentBalance;
    }}
    if (availableBalance.slice(0, 1) == "-") {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.negativeBalance"));
    }
    else {
      applicationManager.getPresentationUtility().showLoadingScreen();
      /*
      applicationManager.getPresentationUtility().showLoadingScreen();
  var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
  manageCardsModule.presentationController.getSelectCardProducts(accountType);
  */  var param = {
                "fromAccountCurrency": "USD",
                "transactionCurrency": "NPR",
                "transactionAmount": "1"
            }
       var flag = navManager.getCustomInfo("fromAccFlag");
      var flow = navManager.getCustomInfo("cardSelectionType");
      if (!kony.sdk.isNullOrUndefined(flag)) {
        if (flag == "frmTopUpVirtualCardConsentScreen") {
          navManager.setCustomInfo("flowtype", null);
          presenter.presentationController.availableBalance = kony.sdk.isNullOrUndefined(accountType.availableBalance)?"":accountType.availableBalance;
          presenter.presentationController.accountID = kony.sdk.isNullOrUndefined(accountType.accountID)?"":accountType.accountID;
          presenter.presentationController.formattedAccountName =kony.sdk.isNullOrUndefined(accountType.formattedAccountName)?"":accountType.formattedAccountName;
          navManager.setCustomInfo("availableBalance", accountType.availableBalance);
          presenter.presentationController.getCurrecyExchangeRateMB(param);
        } if (flag == "frmTopUpDomesticCardConsentScreen") {
          navManager.setCustomInfo("flowtype", null);
          presenter.presentationController.availableBalance = kony.sdk.isNullOrUndefined(accountType.availableBalance)?"":accountType.availableBalance;
          presenter.presentationController.accountID = kony.sdk.isNullOrUndefined(accountType.accountID)?"":accountType.accountID;
          presenter.presentationController.formattedAccountName =kony.sdk.isNullOrUndefined(accountType.formattedAccountName)?"":accountType.formattedAccountName;
          navManager.setCustomInfo("availableBalance", accountType.availableBalance);
          presenter.presentationController.getCurrecyExchangeRateMB(param);;
        }
      } else if (flow === "debitCard") {
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        var param = {};
        manageCardsModule.presentationController.getCardLimits(param);
      } else if (flow === "virtualPrepaidCard") {
        var navManager = applicationManager.getNavigationManager();
        var flow = navManager.setCustomInfo("virtualCardAccountSelectionFlow", "true");
        navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCard" });
      }
    }
  },
  
  tbxSearchOnTextChange: function() {
    var self = this;
    var searchtext = this.view.tbxSearch.text.toLowerCase();
    //  var searchSegmentData = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("nickName", searchtext, data, headers);
    var searchSegmentCheckingData = [];
    var searchSegmentSavingData = [];
    //searchSegmentCheckingData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName", searchtext, this.checkingAccounts);
    //searchSegmentSavingData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName", searchtext, this.savingAccounts);
    searchSegmentCheckingData = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["accountName", "accountID", "nickName"], searchtext, this.checkingAccounts);
    searchSegmentSavingData = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["accountName", "accountID", "nickName"], searchtext, this.savingAccounts);
    this.checkingDataShown = searchSegmentCheckingData;
    this.savingDataShown = searchSegmentSavingData;
    this.view.segTransactions.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
    if (searchSegmentCheckingData.length > 0 && searchSegmentSavingData.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + searchSegmentCheckingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentCheckingData],
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + searchSegmentSavingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentSavingData]
      ]
      this.segmentData = data;
      this.view.segTransactions.setData(this.segmentData);
    } else if (searchSegmentCheckingData.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + searchSegmentCheckingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentCheckingData]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else if (searchSegmentSavingData.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + searchSegmentSavingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentSavingData]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else {
      this.view.flxNoTransactions.isVisible = true;
      //this.view.flxHeaderNT.isVisible=false;
      //this.view.flxSeperator3.isVisible=false;
      //  this.view.flxNoTransactions.top = "0dp";
      this.view.lblNoTransaction.isVisible = true;
      this.view.segTransactions.isVisible = false;
    }
    this.view.flxMainContainer.forceLayout();
  },
  arrowCheckingCollapseOnClick: function(widgetreg) {
    if (widgetreg.src == "arrowup.png") {
      this.segmentData[0][0]["imgUpArrow"]["src"] = "arrowdown.png"
      this.segmentData[0][1] = [];
      this.view.segTransactions.setData(this.segmentData);
    } else {
      this.segmentData[0][0]["imgUpArrow"]["src"] = "arrowup.png"
      this.segmentData[0][1] = this.checkingDataShown;
      this.view.segTransactions.setData(this.segmentData);
    }
    this.view.flxMainContainer.forceLayout();
  },
  arrowSavingCollapseOnClick: function(widgetreg) {
    var sectionindex = this.segmentData.length - 1;
    if (widgetreg.src == "arrowup.png") {
      this.segmentData[sectionindex][0]["imgUpArrow"]["src"] = "arrowdown.png"
      this.segmentData[sectionindex][1] = [];
      this.view.segTransactions.setData(this.segmentData);
    } else {
      this.segmentData[sectionindex][0]["imgUpArrow"]["src"] = "arrowup.png"
      this.segmentData[sectionindex][1] = this.savingDataShown;
      this.view.segTransactions.setData(this.segmentData);
    }
    this.view.flxMainContainer.forceLayout();
  },
  flxBackOnClick: function() {
    applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  cancelCommon:function()
  {
    applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
  }

});