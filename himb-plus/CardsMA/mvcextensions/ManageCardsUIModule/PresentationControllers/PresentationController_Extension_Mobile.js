define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    apiCallError:"",
    isCardActivateFlow:false,
    availableBalance:"",
    accountID:"",
    currentBalance:"",
    formattedAccountName:"",
    exchangeRateResponse:"",
    //getTransactionsDetails
    getTransactionsForCard: function (params) {
     var manageCards = applicationManager.getCardsManager();
      manageCards.getCardTransactionsDetails(params, this.getTransactionsForCardSuccess, this.getTransactionsForCardError);
    },

    navigateToCardstatements: function (carddetails) {
     var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardStatements", carddetails);
      navManager.navigateTo("frmCardStatements");
    },

    downloadCardStatement: function (params) {
      applicationManager.getCardsManager().downloadpdfCardStatement(params, this.cardStatementSuccess, this.cardStatementError);
    },

    cardStatementSuccess: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController("frmCardTransactionDetails", true);
      if (response.hasOwnProperty("fileId") && !kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.fileId)) {
        response.fileType = "pdf";
        var transactionDownloadFile = applicationManager.getAccountManager().getDownloadTransctionURL(response);
        kony.application.openURL(transactionDownloadFile);
      } else controller.showPopUp();
    },

    cardStatementError: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController("frmCardTransactionDetails", true);
      controller.showPopUp(response.errorMessage);
    },


    /**
     * processedCardDetails - modifying the ListOfCards details
     * @param {response from service}  
     * @returns [Modified response]
     */
    processedCardDetails: function (response) {
      var res = response;
      var scope = this;
      var configurationManager = applicationManager.getConfigurationManager();
      var formatUtil = applicationManager.getFormatUtilManager();
      for (var i in res) {
        if (res[i].cardStatus === scope_configManager.getActivateCardStatus() || 
          res[i].cardStatus === scope_configManager.getCardStatusInActive() || 
          res[i].cardStatus === scope_configManager.getLockCardStatus() || 
          res[i].cardStatus === scope_configManager.getReportLostCardStatus() || 
          res[i].cardStatus === scope_configManager.getExpiredCardStatus()) {
            res[i].cardId = res[i].pan;
            res[i].cardIssuedDate = res[i].cardIssueDate;
            res[i].cardExpireDate = !kony.sdk.isNullOrUndefined(res[i].cardExpDate) ?
              formatUtil.getFormatedDateString(new Date(res[i].cardExpDate), "m/y") : "XX/XX";
            res[i].cardIssueDate = !kony.sdk.isNullOrUndefined(res[i].cardIssueDate) ?
              formatUtil.getFormatedDateString(new Date(res[i].cardIssueDate), "m/y") : "XX/XX";
            res[i].maskedCardNumber = res[i].pan;
            res[i].maskedAccountNumber = res[i].bankAccNum;
            res[i].cardStatus = this.getCardStatus(res[i].cardStatus);
            res[i].cardProductName = res[i].Card_Category;//card name
            res[i].currencyCode = res[i].currCode;//formatUtil.getCurrencySymbol();
            res[i].availableCredit = res[i].balance;
            res[i].rewardsPoint = res[i].balance;
            res[i].currentBalance = res[i].balance;
            res[i].availableBalance = res[i].balance;
            res[i].withdrawlLimit = res[i].balance;
            res[i].accountName = res[i].chName;
            res[i].currency = res[i].accCurr;
            res[i].outstandingBalance = res[i].outstdBalance;
            res[i].formattedExpiryDate = !kony.sdk.isNullOrUndefined(res[i].cardExpDate) ?
              formatUtil.getFormatedDateString(new Date(res[i].cardExpDate), "d/m/Y") : "";
            res[i].isCardExpired = (new Date(res[i].cardExpDate).getTime() < new Date().getTime()) ? true : false;
        }
      }
      return res;
    },

    /**
     * getCardStatus - modify the numeric card status to respective string values
     * @param {numeric value of card status}  
     * @returns "String"
     */
    getCardStatus: function (status) {
      switch (status) {
        case "1":
          return "In Instance";
        case scope_configManager.getActivateCardStatus():
          return "Active";
        case scope_configManager.getExpiredCardStatus():
          return "Expired";
        case "4":
          return "Hold";
        case scope_configManager.getCardStatusInActive():
          return "Inactive";
        case "6":
          return "Cancelled";
        case "7":
          return "Replaced";
        case "8":
          return "Ready For Personalization";
        case "9":
          return "KYC Pending";
        case scope_configManager.getLockCardStatus():
          return "Locked";
        case scope_configManager.getReportLostCardStatus():
          return "Reported Lost";
      }
      /*
"STATUS_EXPIRED_CARD": "3",r
"STATUS_REPORT_LOST_CARD": "11",r
"STATUS_CARD_INACTIVE": "5",r
 "NO_OF_DAYS_CARD_DISPUTE": "7",
"STATUS_LOCK_CARD": "10",r
"EXPIRED_CARDS_VALIDITY_DISPLAY": "30",
"STATUS_ACTIVATE_CARD": "2",r

      if (status == scope_configManager.getActivateCardStatus()) {
        return "Active";//2
      }else if (status == scope_configManager.getReportLostCardStatus()) {
        return "Reported Lost";//11
      }else if (status == scope_configManager.getLockCardStatus()) {
        return "Locked";//10 //Self Inactive
      }else if (status == "5") {
        return "Inactive";//Issued // Card not collected //5
      }else if (status == "1") {
        return "In Instance";
      }else if (status == "3") {
        return "Blocked";
      }else if (status == "4") {
        return "Hold";
      }else if (status == "6") {
        return "Cancelled";
      }else if (status == "7") {
        return "Replaced";
      }else if (status == "8") {
        return "Ready For Personalization";
      }else if (status == "9") {
        return "KYC Pending";
      }
        */
/*
1 In Instance
2 Active
3 Blocked
4 Hold
5 Inactive / Card not collected
6 Cancelled
7 Replaced
8 Ready For Personalization
9 KYC Pending
10 Self Inactive
*/
    },
    constructCardsViewModel: function (cards) {
      var self = this;
      var cardsViewModel = [];
      var filterCards=[];
      var sortedCards=[];
      var navManager = applicationManager.getNavigationManager();
      var mySet = new Set();
      if (!kony.sdk.isNullOrUndefined(cards)) {
        for (var i in cards) {
          if (cards[i].customerId[0] === "D") {
            cards[i].cardType = "Debit";
          } else if (cards[i].customerId[0] === "C") {
            cards[i].cardType = "Credit";
          } else if (cards[i].customerId[0] === "P") {
            cards[i].cardType = "Prepaid";
          } 
          mySet.add(cards[i].cardType);
        }
        cardsViewModel.push(cards);
        for (var elem of mySet) {
          filterCards.push(elem);
        }
        // this.manageCards.setFilterAccounts(this.filterCards);
      }
      var obj = {
        "Debit":1,
        "Credit":2,
        "Prepaid":3
      }
      sortedCards = cards.sort((a,b)=>obj[a.cardType]-obj[b.cardType]);
      navManager.setCustomInfo("frmFilteredCards", filterCards);
      return sortedCards;
    },

    cardsFetchSuccess: function (res) {
      var manageCards = applicationManager.getCardsManager();
      var navManager = applicationManager.getNavigationManager();
      var issuedCards = [];
      var flag = false;
      var actresponse = [];
      var currentBankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
      var currentBankDateObj = !kony.sdk.util.isNullOrUndefinedOrEmptyObject(currentBankDate) ? new Date(currentBankDate.currentWorkingDate).getTime() : new Date().getTime();
      res = res.cardDataInfo_out;
      // var bankDetails = applicationManager.getNavigationManager().getCustomInfo("bankDates");
      var expiredValidityCardDisplayDays = parseInt(scope_configManager.getExpiredCardsValidityDisplay());
      // var currentBankDate = bankDetails.currentWorkingDate;
      // var currentBankDateObj = new Date(currentBankDate);//Converting bank date into date obj
      var isEligibleDateToDisplayCard = "";
      var formattedCardExpDate = "";
      for (var i in res) {
        if (!(kony.sdk.util.isNullOrUndefinedOrEmptyObject(res[i]))) {
          if (res[i].cardStatus === scope_configManager.getActivateCardStatus() ||
            res[i].cardStatus === scope_configManager.getCardStatusInActive() ||
            res[i].cardStatus === scope_configManager.getLockCardStatus() ||
            res[i].cardStatus === scope_configManager.getReportLostCardStatus() ||
            res[i].cardStatus === scope_configManager.getExpiredCardStatus()) {
            isEligibleDateToDisplayCard="";
            formattedCardExpDate = "";
            formattedCardExpDate = new Date(res[i].cardExpDate);
            // isEligibleDateToDisplayCard = new Date(formattedCardExpDate.setDate(formattedCardExpDate.getDate() + expiredValidityCardDisplayDays));// Adding 30 days to expiredDate
            var diffInMs = currentBankDateObj - formattedCardExpDate;
            var diffInDays = (currentBankDateObj - formattedCardExpDate) / (1000 * 60 * 60 * 24);
            //eligible expired card push
            if ((formattedCardExpDate < currentBankDateObj) && (diffInDays <= expiredValidityCardDisplayDays)) {
              actresponse.push(res[i]);
            }
            //non-expired card push
            if (currentBankDateObj < new Date(res[i].cardExpDate).getTime()) {
              actresponse.push(res[i]);
            }
          }
        }
      }
      if (!(kony.sdk.util.isNullOrUndefinedOrEmptyObject(actresponse[0]))) {
      var cardParamValidation = this.cardParamValidation(actresponse);
      var processedCardDetails = this.processedCardDetails(cardParamValidation);
      var response = this.constructCardsViewModel(processedCardDetails);
      var filterFlag = navManager.getCustomInfo("filterFlag");
        if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(filterFlag)) {
          actresponse = filterFlag.filteredFlag && filterFlag.selectedCard != "ALL"  ? this.fliteredCards(response, filterFlag.selectedCard) : response;
        } else if(kony.application.getCurrentForm().id != "frmManageFilterCards"){
          navManager.setCustomInfo("filterFlag",null);
          actresponse = response;
        }
      var frmData = navManager.getCustomInfo("frmCardManageHome");
      /*
      for (var i = 0; i < response.length; i++) {
        flag = false;
        if (response[i]["cardStatus"]==="Expired" || response[i]["cardStatus"] === "Issued" || response[i]["cardStatus"] === "Inactive" ) {
          if (response[i]["cardStatus"] === "Issued" || response[i]["cardStatus"] === "Inactive" ) {
            for (var j = 0; j < response.length; j++) {
              if (i !== j && (response[i]["maskedCardNumber"] === response[j]["maskedCardNumber"])) {
                var cardId = response[j]["cardId"];
                if (response[j]["isExpiring"] == "1") {
                  scope_ManageCards_Pres.expiryCardId.push(cardId);
                }
                var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
                actresponse.splice(id, 1);
                flag = true;
                break;
              }
            }
            if (flag === false) {
              issuedCards.push(response[i]);
              var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
              actresponse.splice(id, 1);
            }
          }
          else {
            var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
            actresponse.splice(id, 1);
          }
        }
      }
      if (issuedCards.length > 0) {
        response = issuedCards.concat(actresponse);
      }
      else {
        response = actresponse;
      }
      */
      }
      var newFrmData = {
        "isMainScreen": true,
        "response": actresponse
      };
      manageCards.setCards(actresponse);
      if (scope_ManageCards_Pres.cardView === "PinChange") {
        newFrmData.pinChange = "pinChange";
        scope_ManageCards_Pres.cardView = "";
      }
      if (!kony.sdk.isNullOrUndefined(frmData) && !kony.sdk.isNullOrUndefined(frmData.isMainScreen)) {
        newFrmData.isMainScreen = frmData.isMainScreen;
      }
      if (!kony.sdk.isNullOrUndefined(frmData)) {
        newFrmData.reqID = frmData.reqID;
      }
      navManager.setCustomInfo("frmCardManageHome", newFrmData);
      if (kony.application.getCurrentForm().id != "frmCardManageHome") {
        navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardManageHome" });
      }
      else {
        var controller = _kony.mvc.GetController('frmCardManageHome', true);
        controller.postShow();
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    cardParamValidation: function (actresponse) {
      var cardData = actresponse;
      const requiredParams = ["Card_Label", "Card_Type", "Card_Category", "cardimage"];
      const validObjects = cardData.filter(obj =>
        requiredParams.every(param => obj.hasOwnProperty(param))
      );
      return validObjects;
    },

    getTransactionsForCardError: function(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(error["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
      else{
        var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
        var isCovertEMIFlow = applicationManager.getNavigationManager().getCustomInfo("isCovertEMIFlow");
        isCovertEMIFlow?applicationManager.getDataProcessorUtility().showToastMessageError(controller, error.errorMessage)
        :(controller.showTransactions(error, true), applicationManager.getDataProcessorUtility().showToastMessageError(controller, error.errorMessage));
      }
    },

    fliteredCards:function(cards,selectedCard){
      let filteredCards = [];
      for(var i in cards){
        if(cards[i].cardType === selectedCard){
          filteredCards.push(cards[i]);
        }
      }
      return filteredCards;
    },

    updateCardData: function (inputParams) {
      scope_ManageCards_Pres.mfaerrflag = false;
      scope_ManageCards_Pres.cardView = inputParams.Action;
      scope_ManageCards_Pres.cardType = inputParams.cardType;
      var manageCards = applicationManager.getCardsManager();
      switch (scope_ManageCards_Pres.cardView) {
        case "PinChange":
          if (scope_ManageCards_Pres.cardType == "Debit") {
            scope_ManageCards_Pres.flowType = "CHANGE_PIN_DEBIT";
            manageCards.changePin(inputParams, scope_ManageCards_Pres.updateCardDataSuccessCallback, scope_ManageCards_Pres.updateCardDataFailureCallback);
          }
          else {
            inputParams.Channel = "Mobile Native";
            scope_ManageCards_Pres.flowType = "CHANGE_PIN_CREDIT";
            manageCards.changePin(inputParams, scope_ManageCards_Pres.updateCardDataSuccessCallback, scope_ManageCards_Pres.updateCardDataFailureCallback);
          }
          break;
        case "Replace": scope_ManageCards_Pres.flowType = "REPLACE_CARD";
          manageCards.reportLost(inputParams, scope_ManageCards_Pres.updateCardDataSuccessCallback, scope_ManageCards_Pres.updateCardDataFailureCallback);
          break;
        case "Report Lost": scope_ManageCards_Pres.flowType = "REPORT_LOST";
          manageCards.reportLost(inputParams, scope_ManageCards_Pres.updateCardDataSuccessCallback, scope_ManageCards_Pres.updateCardDataFailureCallback);
          break;
        case "Cancel": scope_ManageCards_Pres.flowType = "CANCEL_CARD";
          scope_ManageCards_Pres.inputParams = inputParams;
          scope_ManageCards_Pres.getTermsandConditions();
          break;
        case "Lock": scope_ManageCards_Pres.flowType = "LOCK_CARD";
          //scope_ManageCards_Pres.inputParams = inputParams;
          //scope_ManageCards_Pres.getTermsandConditions();
          manageCards.lockCard(inputParams, scope_ManageCards_Pres.updateCardDataSuccessCallback, scope_ManageCards_Pres.updateCardDataFailureCallback);
          break;

        case "Unlock": scope_ManageCards_Pres.flowType = "UNLOCK_CARD";
          manageCards.unLockCard(inputParams, scope_ManageCards_Pres.updateCardDataSuccessCallback, scope_ManageCards_Pres.updateCardDataFailureCallback);
          break;
        // case "Activate":   scope_ManageCards_Pres.flowType="UNLOCK_CARD";
        //   delete inputParams.Reason
        //   delete inputParams.view
        //   manageCards.unLockCard(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
        //   break;
      }
      // manageCards.updateCardStatus(inputParams,scope_ManageCards_Pres.updateCardDataSuccessCallback,scope_ManageCards_Pres.updateCardDataFailureCallback);
    },

    updateCardDataSuccessCallback: function (res) {
      if (res.MFAAttributes && res.MFAAttributes.isMFARequired === "true") {
        scope_ManageCards_Pres.mfaerrflag = true;
        var mfaJSON = {
          "flowType": scope_ManageCards_Pres.flowType,
          "response": res
        };
        switch (scope_ManageCards_Pres.cardView) {
          case "PinChange":
            mfaJSON.objectServiceDetails = {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "cardChangeClearPIN"
            };
            mfaJSON.action = (scope_ManageCards_Pres.cardType === "Debit") ? "PinChange" : "";
            break;
          case "Replace":
            mfaJSON.objectServiceDetails = {
              "serviceName": "CardManagementServices",
              "dataModel": "ReplaceCard",
              "operationName": "createRequest"
            };
            mfaJSON.action = "Replace Request";
            break;
          case "Report Lost":
            mfaJSON.objectServiceDetails = {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "ReportLostCard"
            };
            mfaJSON.action = "Report Lost";
            break;
          case "Cancel":
            mfaJSON.objectServiceDetails = {
              "serviceName": "CardManagementServices",
              "dataModel": "CancelCard",
              "operationName": "createRequest"
            };
            mfaJSON.action = "Cancel";
            break;
          case "Lock":
            mfaJSON.objectServiceDetails = {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "LockCard"
            };
            mfaJSON.action = "Lock";
            break;
          case "Unlock":
            mfaJSON.objectServiceDetails = {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "UnlockCard"
            };
            mfaJSON.action = "Unlock";
            break;
          default:
            break;
        }
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
      else {
        if (scope_ManageCards_Pres.cardView === "PinChange") {
          var loggerManager = applicationManager.getLoggerManager();
          try {
            loggerManager.log("#### start cardpresentationcontroller : updateCardSuccess ####");
            var navManager = applicationManager.getNavigationManager();
            var nextfrmData = navManager.getCustomInfo("frmCardManageHome");
            nextfrmData.cardData = this.cardData;
            nextfrmData.reqID = res.orderId;
            navManager.setCustomInfo("frmCardManageHome", nextfrmData);
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
            manageCardsModule.presentationController.showCardsHome();
          }
          catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
        }
        else {
          try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var nextfrmData = navManager.getCustomInfo("frmCardManageHome");
            nextfrmData.reqID = res.id || res.orderId;
            navManager.setCustomInfo("frmCardManageHome", nextfrmData);
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
            manageCardsModule.presentationController.showCardsHome();
          }
          catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
        }
      }
    },

    updateCardDataFailureCallback: function (response) {
      try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
        else {
          var navMan = applicationManager.getNavigationManager();
          switch (scope_ManageCards_Pres.cardView) {
            case "PinChange":
              if (scope_ManageCards_Pres.cardType === "Debit") {
                if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardMngNewPin" }); }
                var controller = applicationManager.getPresentationUtility().getController('frmCardMngNewPin', true);
                applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("i18n.common.errorCodes.10118"));
              }
              else {
                if (scope_ManageCards_Pres.mfaerrflag === true) {
                  navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardMngNewPin" });
                }
                var controller = applicationManager.getPresentationUtility().getController('frmCardMngNewPin', true);
                if (response.serverErrorRes.errcode === "011" && response.serverErrorRes.errmsg === "Green PIN deactivated") {
                  applicationManager.getDataProcessorUtility().showToastMessageError(controller, response.errorMessage);
                  controller.clearPin();
                } else {
                  //kony.ui.Alert("Something went wrong - card request");
				  applicationManager.getPresentationUtility().Alert("Something went wrong - card request");
                  applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("i18n.common.errorCodes.10118"));
                }
              }
              break;
            case "Replace":
              if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardMngReplaceCardConfirm" }); }
              var controller = applicationManager.getPresentationUtility().getController('frmCardMngReplaceCardConfirm', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
              break;
            case "Report Lost":
              if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardMngReplaceCardConfirm" }); }
              var controller = applicationManager.getPresentationUtility().getController('frmCardMngConfirmDetails', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
              break;
            case "Cancel":
              if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardMngConfirmDetails" }); }
              var controller = applicationManager.getPresentationUtility().getController('frmCardMngConfirmDetails', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failUpdateCard"));
              break;
            case "Lock":
              if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardManageHome" }); }
              var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
              break;
            case "Activate":
              if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardManageHome" }); }
              var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
              break;
            case "Unlock":
              if (scope_ManageCards_Pres.mfaerrflag === true) { navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "frmCardManageHome" }); }
              var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.cardManage.failLockUnlock"));
              break;
          }
        }
      }
      catch (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },

    getCvv : function (param) {
      scope_ManageCards_Pres.isCardActivateFlow = param.isCardActivateFlow;
      var cards = applicationManager.getCardsManager();
      cards.generateCvv(param, this.getCvvSuccessCallBack, this.getCvvErrorCallback);
    },

    getCvvSuccessCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      var frmCardManageNewCVVController = applicationManager.getPresentationUtility().getController("frmCardManageNewCVV", true);
      if (response.httpStatusCode == "200" && response.respCode_out == "00") {
      var data = response;
      var cvv = data.cvv2_out;
      navManager.setCustomInfo("cvvDetails", cvv);
      if(scope_ManageCards_Pres.isCardActivateFlow){
        frmCardManageNewCVVController.activateCards(response);
      }
      }else{
        if(scope_ManageCards_Pres.isCardActivateFlow){
          frmCardManageNewCVVController.activateCards(response);
        }else{
          var currentForm = kony.application.getCurrentForm().id;
          var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
         // controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        }

      }
    },

    getCvvErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        if(scope_ManageCards_Pres.isCardActivateFlow){
          var controller = applicationManager.getPresentationUtility().getController("frmCardManageNewCVV", true);
          controller.failureCallback(err);
        }else{
          var currentForm = kony.application.getCurrentForm().id;
          var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
          controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        }

      }
    },

    activateCardsSuccess: function (res) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var mfaManager = applicationManager.getMFAManager();
      if (res.MFAAttributes && res.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "flowType": "ACTIVATE_CARD",
          "response": res,
          "objectServiceDetails": {
            "serviceName": "CardManagementServices",
            "dataModel": "S2MCardServices",
            "operationName": "ActivateCard"
          }
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        if (res.respCode_out === "000" && res.result === "000" && res.respLabel_out === "SUCCESS") {
          scope_ManageCards_Pres.ackFlag = true;
          scope_ManageCards_Pres.reqID = res.orderId;
        } else {
          scope_ManageCards_Pres.apiCallError = res.respLabel_out;
        }
        navManager.setCustomInfo("frmCardManageAck", res);
        scope_ManageCards_Pres.commonFunctionForNavigation({
          "appName": "CardsMA",
          "friendlyName": "frmCardManageAck"
        });
      }
    },

    getConvertEMIRequest: function (params) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getCardsManager().getConvertEMIRequestDetails(params, this.getEmiRequestDetailsSuccess, this.getEmiRequestDetailsError);
    },

    getEmiRequestDetailsSuccess: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var mfaManager = applicationManager.getMFAManager();
      if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "flowType": "EMI_TRANSACTION",
          "response": response,
          "objectServiceDetails": {
            "serviceName": "CardManagementServices",
            "dataModel": "S2MCardServices",
            "operationName": "cardEMIRequest"
          }
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        var navManager = applicationManager.getNavigationManager();
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        if (response.httpStatusCode === "200" && response.respLabel === "000") {
          navManager.setCustomInfo("cardSelectionType", "isConvertEmiFlow")
          navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardsAcknowledgementScreen" }, true, {"emiSuccess":response});
        } else {
          // manageCardsModule.presentationController.commonFunctionForNavigation("frmConvertEMISelectTransaction");
          navManager.goBack();
          var controller = applicationManager.getPresentationUtility().getController("frmConvertEMISelectTransaction", true);
          controller.showPopUp(kony.i18n.getLocalizedString("i18n.common.OoopsServerError"));
        }
      }
    },

    getEmiRequestDetailsError: function (err) {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.commonFunctionForNavigation("frmConvertEMISelectTransaction");
      var controller = applicationManager.getPresentationUtility().getController("frmConvertEMISelectTransaction", true);
      controller.showPopUp(err.hasOwnProperty("errorMessage") && err.errorMessage ? err.errorMessage : kony.i18n.getLocalizedString("i18n.common.OoopsServerError"));
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },


    getCardLimits: function (param) {
      var cards = applicationManager.getCardsManager();
      cards.getCardLimitsNew(param, this.getCardLimitsSuccessCallBack, this.getCardLimitsErrorCallback);
    },

    getCardLimitsSuccessCallBack: function (response) {
      var data = response;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("cardSpecifications", data);
      navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmManageSelectNewCards" });
    },

    filterCardsByType: function (cardType, json) {
      var data = json;
      var filteredCards = data.cardConfigLimit.filter(function (card) {
        return card.cardType === cardType;
      });
      return filteredCards;
    },

    filterCardsByTypePrepaidCard: function (cardType, json) {
      var data = json;
      var filteredCards = data.filter(function (card) {
        return card.cardType === cardType;
      });
      return filteredCards;
    },
    
    getCardLimitsErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
      }
    },

     applyNewCard: function (cardsObj) {
      var navManager = applicationManager.getNavigationManager();
      var flow = navManager.getCustomInfo("cardSelectionType");
      var cardsManager = applicationManager.getCardsManager();
      if (flow === "debitCard") {
        cardsManager.applyNewDebitCard(cardsObj, this.applyNewCardSuccess.bind(this), this.applyNewCardError.bind(this));
      } else if (flow === "physicalPrepaidCard") {
        cardsManager.applyNewPrepaidCard(cardsObj, this.applyNewCardSuccess.bind(this), this.applyNewCardError.bind(this));
      }else if (flow === "virtualPrepaidCard") {
        cardsManager.applyNewVirtualDollarCard(cardsObj, this.applyNewCardSuccess.bind(this), this.applyNewCardError.bind(this));
      }
    },

    applyNewCardSuccess: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      var cardType = navMan.getCustomInfo("cardSelectionType");
      var mfaManager = applicationManager.getMFAManager();
      if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        if (cardType == "debitCard") {
          var mfaJSON = {
            "flowType": "APPLY_FOR_DEBIT_CARD",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "requestDebitCard"
            }
          };
        } else if (cardType == "physicalPrepaidCard") {
          var mfaJSON = {
            "flowType": "APPLY_FOR_DEBIT_CARD",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "requestPrepaidCard"
            }
          };
        } else if (cardType == "virtualPrepaidCard") {
          var mfaJSON = {
            "flowType": "APPLY_FOR_DEBIT_CARD",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "requestVirtualDollarCard"
            }
          };
        }
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        if (response.ReferenceNumber != null && response.ReferenceNumber != undefined) {
          var navManager = applicationManager.getNavigationManager();
          navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardsAcknowledgementScreen" }, true, {"applyCards":response});
        } else {

        }
      }
    },

    applyNewCardError: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("requestCardError", err);
        navManager.setCustomInfo("requestCardErrorFlow", "true");
         var navManager = applicationManager.getNavigationManager();
         navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmManageNewCardName"});
        //controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        //controller.checkForToastMessageError();
    },

    applyNewHBLCard: function (cardsObj) {
      var navManager = applicationManager.getNavigationManager();
      var flow = navManager.getCustomInfo("requestCardFlowType");
      var cardsManager = applicationManager.getCardsManager();
      if (flow === "debitCard") {
        cardsManager.applyNewDebitCard(cardsObj, this.applyNewHBLCardSuccess.bind(this), this.applyNewHBLCardError.bind(this));
      } else if (flow === "domesticPrepaidCard" || flow === "internationalPrepaidCard") {
        cardsManager.applyNewPrepaidCard(cardsObj, this.applyNewHBLCardSuccess.bind(this), this.applyNewHBLCardError.bind(this));
      }else if (flow === "virtualCard") {
        cardsManager.applyNewVirtualDollarCard(cardsObj, this.applyNewHBLCardSuccess.bind(this), this.applyNewHBLCardError.bind(this));
      }
    },

    applyNewHBLCardSuccess : function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      var cardType = navMan.getCustomInfo("requestCardFlowType"); 
      var mfaManager = applicationManager.getMFAManager();
      if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        if (cardType == "debitCard") {
          var mfaJSON = {
            "flowType": "APPLY_FOR_DEBIT_CARD",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "requestDebitCard"
            }
          };
        } else if (cardType == "internationalPrepaidCard" || cardType == "domesticPrepaidCard" ) { // "domesticPrepaidCard" || flow === "internationalPrepaidCard"
          var mfaJSON = {
            "flowType": "APPLY_FOR_DEBIT_CARD",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "requestPrepaidCard"
            }
          };
        } else if (cardType == "virtualCard") {
          var mfaJSON = {
            "flowType": "APPLY_FOR_DEBIT_CARD",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "CardManagementServices",
              "dataModel": "S2MCardServices",
              "operationName": "requestVirtualDollarCard"
            }
          };
        }
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        if (response.ReferenceNumber != null && response.ReferenceNumber != undefined) {
          var navManager = applicationManager.getNavigationManager();
          navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardRequestSuccess" }, true, {"applyCards":response});
        } else {

        }
      }
    },

    applyNewHBLCardError : function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var currentForm = kony.application.getCurrentForm().id;
      var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("requestCardError", err);
      navManager.setCustomInfo("requestCardErrorFlow", "true");
     // var navManager = applicationManager.getNavigationManager();
     // navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardRequestConfirmation" });
      controller.checkForToastMessageError();
    },
    
  fetchAccountsSuccess: function(){
      var filterList = function(input) {
            try {
            //let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
            
            let accountData = JSON.parse(JSON.stringify(input));
            let filteredAccountData = accountData.filter(item =>
                item.accountStatus &&
                item.accountStatus.toUpperCase() !== "CLOSED" &&
                item.currencyCode === "NPR" &&
                item.supportTransferFrom === "1"
            );
                return filteredAccountData;
            } catch (err) {
                return input;
            }
        };
        //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        var cardsMan = applicationManager.getCardsManager();
        var accounts = cardsMan.fetchAccountsForNewcard();
        var savingAcc = scope_ManageCards_Pres.processAccountsData(filterList(accounts[1]));
        var checkingAcc = scope_ManageCards_Pres.processAccountsData(filterList(accounts[0]));
        var processedAcc = [];
        processedAcc.push(checkingAcc);
        processedAcc.push(savingAcc);
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmManageNewCardAccounts", processedAcc);
        var flowType =navMan.getCustomInfo("flowtype");
        if(!kony.sdk.isNullOrUndefined(flowType)){
            if(processedAcc.length<2){
            navMan.setCustomInfo("fromAccFlag",flowType);  
            this.availableBalance =processedAcc[0][0].availableBalance;
            this.accountID =processedAcc[0][0].accountID;
            navManager.setCustomInfo("availableBalance",processedAcc[0][0].availableBalance);
             navMan.setCustomInfo("flowtype",null);
              navMan.navigateTo({
            "appName": "CardsMA",
            "friendlyName": flowType
        },false,{"singleAcc":processedAcc[0][0]});   
            }else{
                navMan.setCustomInfo("fromAccFlag",flowType);
                 navMan.navigateTo({
            "appName": "CardsMA",
            "friendlyName": "frmManageNewCardAccounts"
        });
            }
        }else{
        navMan.navigateTo({
            "appName": "CardsMA",
            "friendlyName": "frmManageNewCardAccounts"
        });
        }
  },
intraBankTransferMB : function(params){
		applicationManager.getPresentationUtility().showLoadingScreen();
        var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
     if(ackData.flow == "Prepaid Intl")
    applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.intraBankTransferSuccessMB.bind(this), this.intraBankTransferErrorMB.bind(this));
     else if(ackData.flow == "Virtual Prepaid Intl")
	applicationManager.getCardsManager().intraBankTransferDollar(params, this.intraBankTransferSuccessMB.bind(this), this.intraBankTransferErrorMB.bind(this));		
		},
		intraBankTransferSuccessMB: function(response) {
            var navManager = applicationManager.getNavigationManager();
            var intraResponse = {
            "referenceId":!kony.sdk.isNullOrUndefined(response.referenceId)?response.referenceId:"",
            "status":!kony.sdk.isNullOrUndefined(response.status)?response.status:"",
            "debitAmount":!kony.sdk.isNullOrUndefined(response.totalAmount)?response.totalAmount:""
            };
     applicationManager.getNavigationManager().setCustomInfo("intraResponse",intraResponse);
     var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
     if(ackData.transfer ==""){
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired){
        if(ackData.flow == "Prepaid Intl") {
        var params = navManager.getCustomInfo("topUpCardPayload");
        var mfaJSON = {
                        "flowType": "TOPUP_DOMESTIC_CARDMB",
                        "response": response,
                        "objectServiceDetails": {
                        "serviceName": "TransactionObjects",
                        "dataModel": "Transaction",
                        "operationName": "IntraBankAccFundTxrPrepaidTopup"
                    }
                    };
                    applicationManager.getMFAManager().initMFAFlow(mfaJSON);
     }else{
     var mfaJSON = {
                    "flowType":"TOPUP_VIRTUAL_CARDMB",
                    "response": response,
                    "objectServiceDetails": {
                        "serviceName": "TransactionObjects",
                        "dataModel": "Transaction",
                        "operationName": "IntraBankAccFundTxrDollarCardTopup"
                    }
                };
               applicationManager.getMFAManager().initMFAFlow(mfaJSON);
     }
     }else{
         applicationManager.getPresentationUtility().showLoadingScreen();
          var params = navManager.getCustomInfo("topUpCardPayload");
          this.topUpCardMB(params);
     }
      }else{
         if(ackData.flow == "Prepaid Intl")
         applicationManager.getNavigationManager().navigateTo({"appName": "CardsMA","friendlyName": "frmTopUpDomesticCardVerifyScreen"},false,{"cardData":"consentDetails"});
     else if(ackData.flow == "Virtual Prepaid Intl")
        applicationManager.getNavigationManager().navigateTo({"appName": "CardsMA","friendlyName": "frmTopUpVirtualDollarCardReviewScreen"},false,{"cardData":"topUpCardData"});
     }
     
		},
		intraBankTransferErrorMB: function(err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
             var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
             if(ackData.transfer == ""){
			 if (ackData.flow == "Prepaid Intl") {
             applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmTopUpDomesticCardVerifyScreen"},false,{"serverError":err});   
            }else{
            applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmTopUpVirtualDollarCardReviewScreen"},false,{"serverError":err});
            }
             }else{
                 if (ackData.flow == "Prepaid Intl") {
             applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmTopUpDomesticCardConsentScreen"},false,{"serverError":err});   
            }else{
            applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmTopUpVirtualCardConsentScreen"},false,{"serverError":err});
             }
		}
        },
  topUpCardMB: function(params) {
    var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
            if (ackData.flow == "Prepaid Intl") applicationManager.getCardsManager().topUpPrepaidCard(params, this.topUpCardSuccessMB.bind(this), this.topUpCardFailureMB.bind(this));
            else if (ackData.flow == "Virtual Prepaid Intl") applicationManager.getCardsManager().topUpDollarCard(params, this.topUpCardSuccessMB.bind(this), this.topUpCardFailureMB.bind(this));
         },
        topUpCardSuccessMB: function(response){
          var mfaManager = applicationManager.getMFAManager();
            var ackData = applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
            if (!kony.sdk.isNullOrUndefined(response.respCode_out)) {
                    if(response.respCode_out== "000"){
                    var viewProperties = {};
                    viewProperties.topUpCardRes = response;
                    viewProperties.topUpCardAckData = ackData;
                    applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmCardsAcknowledgementScreen"},false,{"transferSuccess":response});
                    }
                }else{
          var viewProperties = {};
                    viewProperties.topUpCardRes = response;
                    viewProperties.topUpCardAckData = ackData;
                    applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmCardsAcknowledgementScreen"},false,{"transferSuccess":response});
                }
                
            },
        topUpCardFailureMB: function(err){
             var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (ackData.flow == "Prepaid Intl") {
             applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmTopUpDomesticCardVerifyScreen"},false,{"serverError":err});   
            }else{
            applicationManager.getNavigationManager().navigateTo({"appName":"CardsMA","friendlyName":"frmTopUpVirtualDollarCardReviewScreen"},false,{"serverError":err});
            }
        },
        onCancelClick: function(){
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
    getExchangePerRateTopUp: function (params) {
                  var param = { "fromAccountCurrency": "NPR", "transactionCurrency": "USD", "transactionAmount": "1" };
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getCardsManager().getConvertedAmount(param, this.setConvertedAmountExchangePerRateTopUpSuccess.bind(this), this.convertedAmountExchangePerRateTopUpError.bind(this));
    },

    setConvertedAmountExchangePerRateTopUpSuccess: function (response) {
      this.exchangeRateResponse = response;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("setConvertedAmountExchangePerRateTopUpSuccess", response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    getConvertedAmountExchangePerRateTopUpSuccess: function () {
      return this.exchangeRateResponse;
    },
    convertedAmountExchangePerRateTopUpError: function(error){
      var controller = applicationManager.getPresentationUtility().getController('frmCardManageHome', true);
      applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    getCurrencyExchangeRate : function (params) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getCardsManager().getConvertedAmount(params, this.convertedAmountSuccess.bind(this), this.convertedAmountError.bind(this));
    },

    convertedAmountSuccess : function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var data = response;
      var param = navManager.getCustomInfo("currencyConversionData");
      var transactionCurrency = param.transactionCurrency;
      var exchangeRate = transactionCurrency == "NPR" ? data.convertedAmount : data.midRevalRate;
      navManager.setCustomInfo("convertedAmountRate", exchangeRate);

      var convertedAmount = data.convertedAmount;
      var flag = navManager.getCustomInfo("fromAccFlag")
      if (!kony.sdk.isNullOrUndefined(flag)) {
        navManager.setCustomInfo("convertedAmount", convertedAmount);
        navManager.navigateTo({
          "appName": "CardsMA",
          "friendlyName": flag
        }, false, {
          "convertedAmount": convertedAmount
        });
      } else {
        var navManager = applicationManager.getNavigationManager();
        var flow = navManager.getCustomInfo("requestCardFlowType");
        if (flow === "virtualCard") {
          navManager.setCustomInfo("convertedAmount", convertedAmount);
          var convertedAmount = navManager.getCustomInfo("convertedAmountRate");
          var data = navManager.getCustomInfo("setHblConfirmDetails");
          var param = navManager.getCustomInfo("currencyConversionData");
          var amountInNPR = param.transactionAmount;
          var finalAmount = parseFloat(amountInNPR) * parseFloat(convertedAmount);
          var debitAmountFormatted = "NPR " + CommonUtilities.formatCurrencyWithCommas(finalAmount, true);

          var data1 = navManager.getCustomInfo("virtualPrepaidCardDetails");

          var dataNew = {
            [kony.i18n.getLocalizedString("i18n.HBL.Cards.CardFee")]: data1.cardFee,
            [kony.i18n.getLocalizedString("i18n.HBL.Cards.TopupAmount")]: data1.topUpAmount,
            [kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt")]: debitAmountFormatted
          };
          data = Object.assign(data, dataNew);
          var data = navManager.setCustomInfo("setHblConfirmDetails", data);

          this.getTermsandConditionsForVirtualCard();
          //navManager.navigateTo({"appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmManageNewCardName"});
          //navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardRequestConfirmation" });
        }
      }
    },

    convertedAmountError : function (errorMessage) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      /*
      var currentForm = kony.application.getCurrentForm().id;
      var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
      controller.checkForToastMessageCommonError();
      */
      if (errorMessage["isServerUnreachable"]) {
         applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(errorMessage));
      } else {
          applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },
    getBankDateMB: function() {
            applicationManager.getBillManager().fetchBankDate({}, this.getBankDateSuccessMB.bind(this), this.getBankDateFailureMB.bind(this));
        },
        getBankDateSuccessMB: function(response) {
			try{
			if(kony.sdk.isNullOrUndefined(response.date[0])){
			applicationManager.setBankDate("");	
			}else{
            var bankDates = response.date[0];
			applicationManager.setBankDate(bankDates);
            applicationManager.getNavigationManager().setCustomInfo("bankDates", bankDates);
			}
			}catch(err){
			kony.print("err"+err)
			}
        },
        getBankDateFailureMB: function(err){
			applicationManager.setBankDate("");	
            applicationManager.getNavigationManager().setCustomInfo("bankDates", undefined);
        },
         getCurrecyExchangeRateMB: function(params) {
            applicationManager.getCardsManager().getConvertedAmount(params, this.convertedAmountSuccessMB.bind(this), this.convertedAmountErrorMB.bind(this));
        },
        convertedAmountSuccessMB: function(response) {
            var viewProperties = {};
            var navManager = applicationManager.getNavigationManager();
            applicationManager.getNavigationManager().setCustomInfo("ConvertedNPRPrice", response.buyRate);
            var param1 = {
                "fromAccountCurrency": "NPR",
                "transactionCurrency": "USD",
                "transactionAmount": "1"
            }
            var flag = navManager.getCustomInfo("fromAccFlag");
             navManager.navigateTo({
                        "appName": "CardsMA",
                        "friendlyName": flag
                    }, false, {
                        "exchangeConversion": "value"
                    });  
            //this.getCurrecyExchangeRateMB1(param1);
        },
        convertedAmountErrorMB: function(errorMessage) {
            kony.print("getExchangeRate service failure");
        },
        getCurrecyExchangeRateMB1: function(params) {
            applicationManager.getCardsManager().getConvertedAmount(params, this.convertedAmountSuccessMB1.bind(this), this.convertedAmountErrorMB1.bind(this));
        },
        convertedAmountSuccessMB1: function(response) {
            var viewProperties = {};
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("ConvertedUSDPrice", response.convertedAmount);
             var flag = navManager.getCustomInfo("fromAccFlag");
         navManager.navigateTo({
                        "appName": "CardsMA",
                        "friendlyName": flag
                    }, false, {
                        "exchangeConversion": "value"
                    });   
        },
        convertedAmountErrorMB1: function(errorMessage) {
            kony.print("getExchangeRate service failure");
        },


    navigateToHBLNewCardFlow: function () {
      var accountManager = applicationManager.getAccountManager();
      accountManager.fetchInternalAccounts(scope_ManageCards_Pres.fetchAllAccountsSuccess, scope_ManageCards_Pres.fetchAllAccountsError);
    },

    fetchAllAccountsSuccess: function () {
      var filterList = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item =>
            item.accountStatus &&
            item.accountStatus.toUpperCase() !== "CLOSED" &&
            item.currencyCode === "NPR" &&
            item.supportTransferFrom === "1"
          );
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };

      var cardsMan = applicationManager.getCardsManager();
      var accounts = cardsMan.fetchAccountsForNewcard();

      var savingAcc = scope_ManageCards_Pres.processAccountsData(filterList(accounts[1]));
      var checkingAcc = scope_ManageCards_Pres.processAccountsData(filterList(accounts[0]));
      var processedAcc = [];
      processedAcc = checkingAcc.concat(savingAcc);

      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmManageNewCardAccounts", processedAcc);

      this.getBranchList();

    },

    fetchAllAccountsError: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
         applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
      } else {
          applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },

    getBranchList: function () {
      applicationManager.getCardsManager().fetchBranchList({}, this.getBranchListSuccess.bind(this), this.getBranchListFailure.bind(this));
    },

    getBranchListSuccess: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("branchDetails", response);
      navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmConfirmCardRequest" });
    },

    getBranchListFailure : function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
         applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
      } else {
          applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },

    getHBLCardLimitsNew : function (param) {
      var cards = applicationManager.getCardsManager();
      cards.getCardLimitsNew(param, this.getCardLimitsNewSuccessCallBack, this.getCardLimitsNewErrorCallback);
    },

    getCardLimitsNewSuccessCallBack : function (response) {
      var data = response;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("cardSpecifications", data); 
      navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmHblCards"});
    },

    getCardLimitsNewErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
         applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
      } else {
          applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },

    checkCardRequestExists : function (param) {
      var cards = applicationManager.getCardsManager();
      cards.checkCardRequestExists(param, this.checkCardRequestExistsCallBack, this.checkCardRequestExistsErrorCallback);
    },

    checkCardRequestExistsCallBack: function (response) {
      var data = response;
      var navManager = applicationManager.getNavigationManager();
      var flow = navManager.getCustomInfo("requestCardFlowType");
      navManager.setCustomInfo("cardRequestExists", data);
      if (data.isCardReqExists === "true") {
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.checkForRequestExistsError(data.status);
      } else if (data.isCardReqExists === "false") {
        var navManager = applicationManager.getNavigationManager();
        if (flow === "virtualCard") {
          var data = navManager.getCustomInfo("virtualPrepaidCardDetails");
          totalDebitAmountInNpr = data.totalDebitAmountInNpr;
          var params =
          {
            "fromAccountCurrency": "USD",
            "transactionCurrency": "NPR",
            "transactionAmount": totalDebitAmountInNpr
          }
          navManager.setCustomInfo("currencyConversionData", params);
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          manageCardsModule.presentationController.getCurrencyExchangeRate(params);
        } else {
          navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardRequestConfirmation" });
        }
      }
    },

    checkCardRequestExistsErrorCallback : function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
          applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
      } else {
         applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },
    //*****start prepaid dollar topup virtual*****
    cardVirtualDollarTopupPrepaid: function (params) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getCardsManager().intraBankTransferDollar(params, this.cardPrepaidDollarTopupVirtualSuccessCallBack, this.cardPrepaidDollarTopupVirtualErrorCallBack);
    },
    //******PrepaidTopupVirtualDollar******
    cardPrepaidDollarTopupVirtualSuccessCallBack: function (response) {
      var mfaManager = applicationManager.getMFAManager();
      var navManager = applicationManager.getNavigationManager();
      if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "flowType": "TOPUP_VIRTUAL_CARDMB",
          "response": response,
          "objectServiceDetails": {
            "serviceName": "TransactionObjects",
            "dataModel": "Transaction",
            "operationName": "IntraBankAccFundTxrDollarCardTopup"
          }

        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else if (!(kony.sdk.isNullOrUndefined(response.status)) && response.status === "success") {
        scope_ManageActivitiesPresentationController.isCardPrepaidDollorTopupFirstHit = false;
        var formController = applicationManager.getPresentationUtility().getController("frmTopUpVirtualDollarCardReviewScreen", true);
        formController.topUpServiceCall(response);
      } else if (!(kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.message)) && response.status === "Sent") {
        var cardVirtualDollarTopupParam = applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
        var param = {
          "topupAmou": response.amount,
          "cCardNumber": cardVirtualDollarTopupParam.cCardNumber,//"4101020000013563",
          "mxpAccountNumber": cardVirtualDollarTopupParam.mxpAccountNumber,//"11002825000024",
          "topupCurrency": "USD",
          "accountNumber": response.fromAccountNumber,//"11002825000024",
          "debtorName": cardVirtualDollarTopupParam.debtorName,//"MANISH KHANAL",
          "convertedAmount": response.convertedAmount,//"138.89",
          "referenceId": response.referenceId,//"PI251980H42CTVVC",
          "transactionId": response.transactionId,//"1058"
          "cardProduct":response.cardProduct,
          "cardType":response.cardType,
          "cardHolderName":response.cardHolderName,
        }
        this.sTwoMPrepaidDollarPopupVirtual(param);
      } else {
        this.cardPrepaidDollarTopupVirtualErrorCallBack({ "errorMessage": kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong") });
      }
    },
    //******PrepaidTopupVirtualDollar******
    cardPrepaidDollarTopupVirtualErrorCallBack: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var formController = applicationManager.getPresentationUtility().getController("frmTopUpVirtualCardConsentScreen", true);
      navManager.navigateTo({
        "appName": "CardsMA",
        "friendlyName": "ManageCardsUIModule/frmTopUpVirtualCardConsentScreen"
      });
      formController.showPopup(!kony.sdk.isNullOrUndefined(response.errorMessage) ?
        response.errorMessage : kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
    },

    //******PrepaidTopupVirtualDollar******
    sTwoMPrepaidDollarPopupVirtual: function (params) {
      applicationManager.getCardsManager().topUpDollarCard(params, this.sTwoMPrepaidDollarPopupVirtualSuccessCallBack.bind(this), this.sTwoMPrepaidDollarPopupVirtualErrorCallBack.bind(this));
    },
    //******PrepaidTopupVirtualDollar******
    sTwoMPrepaidDollarPopupVirtualSuccessCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardsAcknowledgementScreen", response);
      navManager.navigateTo({
        "appName": "CardsMA",
        "friendlyName": "ManageCardsUIModule/frmCardsAcknowledgementScreen"
      }, true, { "prepaidTopUpVirtualDollarResponse": response });
    },
    //******PrepaidTopupVirtualDollar******
    sTwoMPrepaidDollarPopupVirtualErrorCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardsAcknowledgementScreen", "");
      // navManager.setCustomInfo("frmCardManageHome", "");
      // manageCardsModule.presentationController.isFirstTime = true;
      // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
      // manageCardsModule.presentationController.showCardsHome();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formController = applicationManager.getPresentationUtility().getController("frmTopUpVirtualCardConsentScreen", true);
      navManager.navigateTo({
        "appName": "CardsMA",
        "friendlyName": "ManageCardsUIModule/frmTopUpVirtualCardConsentScreen"
      });
      formController.showPopup(!kony.sdk.isNullOrUndefined(response.errorMessage) ?
        response.errorMessage : kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));

    },
    //******end prepaid dollar topup virtual******

    // -----start PrepaidTopupDomestic-----
    cardPrepaidTopupDomestic: function (params) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      applicationManager.getCardsManager().intraBankTransferDollar(params, this.cardPrepaidTopupDomesticSuccessCallBack, this.cardPrepaidTopupDomesticErrorCallBack);
    },
    //-----PrepaidTopupDomestic-----
    cardPrepaidTopupDomesticSuccessCallBack: function (response) {
      var mfaManager = applicationManager.getMFAManager();
      var navManager = applicationManager.getNavigationManager();
      if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "flowType": "TOPUP_DOMESTIC_CARDMB",
          "response": response,
          "objectServiceDetails": {
            "serviceName": "TransactionObjects",
            "dataModel": "Transaction",
            "operationName": "IntraBankAccFundTxrPrepaidTopup"
          }

        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else if (!(kony.sdk.isNullOrUndefined(response.status)) && response.status === "success") {
        scope_ManageActivitiesPresentationController.isCardPrepaidDollorTopupFirstHit = false;
        var formController = applicationManager.getPresentationUtility().getController("frmPrepaidTopupDomesticReviewScreen", true);
        formController.topUpPrepaidDomesticServiceCall(response);
      } else if (!(kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.message)) && response.status === "Sent") {
        var topUpPrepaidDomesticCardData = applicationManager.getNavigationManager().getCustomInfo("topUpPrepaidDomesticCardData");
        var param = {
          "topupAmou": response.amount,
          "cCardNumber": topUpPrepaidDomesticCardData.cCardNumber,//"4101020000013563",
          "mxpAccountNumber": topUpPrepaidDomesticCardData.mxpAccountNumber,//"11002825000024",
          "topupCurrency": "NPR",
          "accountNumber": response.fromAccountNumber,//"11002825000024",
          "debtorName": topUpPrepaidDomesticCardData.debtorName,//"MANISH KHANAL",
          "convertedAmount": response.amount,//"138.89",
          "referenceId": response.referenceId,//"PI251980H42CTVVC",
          "transactionId": response.transactionId,//"1058"
          "cardProduct":response.cardProduct,
          "cardType":response.cardType,
          "cardHolderName":response.cardHolderName,
        }
        this.sTwoMPrepaidTopupDomestic(param);
      } else {
        this.cardPrepaidTopupDomesticErrorCallBack({ "errorMessage": kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong") });
      }
    },
    //-----PrepaidTopupDomestic-----
    cardPrepaidTopupDomesticErrorCallBack: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var formController = applicationManager.getPresentationUtility().getController("frmPrepaidTopupDomesticInputScreen", true);
      navManager.navigateTo({
        "appName": "CardsMA",
        "friendlyName": "ManageCardsUIModule/frmPrepaidTopupDomesticInputScreen"
      });
      formController.showPopup(!kony.sdk.isNullOrUndefined(response.errorMessage) ?
        response.errorMessage : kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
    },

    //-----PrepaidTopupDomestic-----
    sTwoMPrepaidTopupDomestic: function (params) {
      applicationManager.getCardsManager().topUpPrepaidCard(params, this.sTwoMPrepaidTopupDomesticCallBack.bind(this), this.sTwoMPrepaidTopupDomesticErrorCallBack.bind(this));
    },
    //-----PrepaidTopupDomestic-----
    sTwoMPrepaidTopupDomesticCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardsAcknowledgementScreen", response);
      navManager.navigateTo({
        "appName": "CardsMA",
        "friendlyName": "ManageCardsUIModule/frmCardsAcknowledgementScreen"
      }, true, { "prepaidTopUpVirtualDollarResponse": response });
    },
    //-----PrepaidTopupDomestic-----
    sTwoMPrepaidTopupDomesticErrorCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardsAcknowledgementScreen", "");
      // navManager.setCustomInfo("frmCardManageHome", "");
      // manageCardsModule.presentationController.isFirstTime = true;
      // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
      // manageCardsModule.presentationController.showCardsHome();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formController = applicationManager.getPresentationUtility().getController("frmPrepaidTopupDomesticInputScreen", true);
      navManager.navigateTo({
        "appName": "CardsMA",
        "friendlyName": "ManageCardsUIModule/frmPrepaidTopupDomesticInputScreen"
      });
      formController.showPopup(!kony.sdk.isNullOrUndefined(response.errorMessage) ?
        response.errorMessage : kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));

    },
    // -----end prepaid topup domestic-----
      
      //     cardPrepaidTopupDomestic: function (params) {
      //   applicationManager.getPresentationUtility().showLoadingScreen();
      //   var transactionManager = applicationManager.getTransactionManager();
      //   transactionManager.createIntraBankAccFundTransferCards(params, this.cardPrepaidTopUpDomesticSuccessCallBack, this.creditCardPayBillErrorCallback);
      // },

    getTermsandConditionsForVirtualCard: function () {
      var config = applicationManager.getConfigurationManager();
      var locale = config.getLocale();
      var termsAndConditions = config.getTermsAndConditions();
      var param = {
        "languageCode": termsAndConditions[locale],
        "termsAndConditionsCode": "VirtualCard_TnC"
      };
      var currentLocale = kony.i18n.getCurrentLocale();
      var params = {
        "languageCode": 'en-US',
        "termsAndConditionsCode": "VirtualCard_TnC"
      };
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.fetchTermsAndConditionsPostLogin(params, this.getTermsandConditionsSuccessCallBack, this.getTermsandConditionsErrorCallback);
    },

    getTermsandConditionsSuccessCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      var data = response;
      navManager.setCustomInfo("TermsAndConditionsData", data);
      var navManager = applicationManager.getNavigationManager();
      var navigation = function () {
        navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardRequestConfirmation" });
      }
      applicationManager.getDataProcessorUtility().ShowTandC("<font face='SourceSansPro-Regular'>" + response.termsAndConditionsContent, navigation);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    getTermsandConditionsErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
      } else {
        applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },
      getTermsandConditionsForEmiConvertion: function () {
      var config = applicationManager.getConfigurationManager();
      var termsAndConditions = config.getTermsAndConditions();
      var params = {
        "languageCode": 'en-US',
        "termsAndConditionsCode": "CardEMI_TnC"
      };
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.fetchTermsAndConditionsPostLogin(params, this.getTermsandConditionsEmiConvertionSuccessCallBack, this.getTermsandConditionsEmiConvertionErrorCallback);
    },

    getTermsandConditionsEmiConvertionSuccessCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      var data = response;
      navManager.setCustomInfo("TermsAndConditionsData", data);
      var navManager = applicationManager.getNavigationManager();
      var fromController = applicationManager.getPresentationUtility().getController("frmUnBilledTranConvertEMIReviewScreen", true);
      var emiAckNavigation = function () {
        fromController.convertToEmi();
      };
      applicationManager.getDataProcessorUtility().ShowTandC("<font face='SourceSansPro-Regular'>" + response.termsAndConditionsContent, emiAckNavigation);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    getTermsandConditionsEmiConvertionErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
      } else {
        applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
      }
    },

  };
});