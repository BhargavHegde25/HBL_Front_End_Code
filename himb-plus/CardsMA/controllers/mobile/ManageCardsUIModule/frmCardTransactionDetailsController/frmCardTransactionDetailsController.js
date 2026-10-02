define({ 
//check
init : function(){
    var FormValidator = require("FormValidatorManager");
    this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  preShow : function(){
    this.init();
    this.setPreshowData();
   // this.setFlowActions();
   this.view.btnDownloadTransaction.setVisibility(false);
   this.view.btnDownloadTransaction.onClick = this.onclickdownload;
   this.view.customHeader.flxBack.onClick = this.goBack;
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  setPreshowData : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxCardTransactionDetails.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxCardTransactionDetails.top = "0dp";
    }
    this.view.btnDispute.isVisible = false;
    this.view.btnDispute.onClick = function(){
      // var navManager = applicationManager.getNavigationManager();
      // var disputeModule = applicationManager.getModulesPresentationController("DisputeTransactions");
      // navManager.setCustomInfo("frmDisputeTransactionDetails", navManager.getCustomInfo("frmCardTransactionDetails"));
      // navManager.setEntryPoint("DisputeEntry", "frmCardTransactionDetails");
      // disputeModule.navigateToDisputeReason("frmDisputeReason");
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmCardTransactionDetails");
      var disputeParam = {
        "cardNumber": data.pan ? data.pan : "",
        "amount": data.transactionAmount ? data.transactionAmount : "",
        "description": data.reserved6 ? data.reserved6 : "",
        "disputeDescription": "",
        "disputeReason": "",
        "fromAccountName": "",
        "fromAccountNumber": "",
        "transactionDate": data.formattedPostingDate ? data.formattedPostingDate : "",
        "transactionId": data.referenceNumber ? data.referenceNumber : "",
        "transactionType": "Cards Transaction",
        "accountId": "",
        "curntView": 1,
        "customerId": "",
        "fromAccountType": "",
        "merchantAddressName": "",
        "merchantCity": "",
        "secureMessageId": "",
        "toAccountName": "",
        "toAccountNumber": "",
        "toAccountType": "",
        "transactionsNotes": data.reserved6 ? data.reserved6 : "",
        "types": "Cards Transaction",
        "notes": "",
        "date": data.formattedPostingDate ? data.formattedPostingDate : "",
        "referenceNumber": data.referenceNumber ? data.referenceNumber : "",
        "id": "cardDispute",
        "transactionAmount": data.transactionAmount ? data.transactionAmount : "",
        "transactionMerchantCity": "",
        "transactionMerchantAddressName": "",
        "payeeCurrency": data.transactionCurrency ? data.transactionCurrency : "",
        "postedDate": data.formattedPostingDate ? data.formattedPostingDate : "",
        "scheduledDate": "",
        "statusDescription": "",
        "transactionCurrency": data.transactionCurrency ? data.transactionCurrency : "",
        "valueDateTime": data.transactionDate ? data.transactionDate : "",
        "Id": data.authCode ? data.authCode : "",
        "isCardTrDisputeFlow": true,
      };
      navManager.setCustomInfo("frmDisputeTransactionDetails", disputeParam);
      navManager.setEntryPoint("DisputeEntry", "frmCardTransactionDetails");
      navManager.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "DisputeTransactionUIModule/frmDisputeReason"
      });
    };
    this.setCardTransactionDetailsData();
  },

  mappingCodes: function()
  {
    var code = {
      "C" : "Posted",
      "P" : "Pending",
      "T" : "Transaction",
      "F" : "Fee/Charges",
      "B" : "Billed",
      "U" : "UnBilled"
    };
    return code;
  },
  
  setFlowActions : function(){
    this.view.customHeader.flxBack.onClick = this.goBack;
    // this.view.btnDispute.setVisibility(false);
    var navMan = applicationManager.getNavigationManager();
    var formatUtil = applicationManager.getFormatUtilManager();
    var configManager = applicationManager.getConfigurationManager();
    var transactionData = navMan.getCustomInfo("frmCardTransactionDetails");
    var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(transactionData.transactionDate), new Date());
    if(transactionData.transactionType === "T") transactionData.transactionType = "CardPayment";
    if (configManager.getDisputeConfig(transactionData.transactionType) === "true") {
      if (transactionData.transactionStatus !== "P" && configManager.getDisputeConfig(transactionData.transactionType) === "true" && dateDiff <= configManager.getDisputeDuration() && (configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === true || configManager.checkUserFeature("DISPUTE_TRANSACTIONS") === "true")) {
        if (configManager.getDisputeCDConfig("both") || (configManager.getDisputeCDConfig("debit") && formatUtil.isDebitTransaction(transactionData.amount)) || (configManager.getDisputeCDConfig("credit") && formatUtil.isCreditTransaction(transactionData.amount))) {
          if (transactionData.isDisputed && transactionData.isDisputed === "true") {
            this.view.btnDispute.setVisibility(false);
          }
          else {
            this.view.btnDispute.setVisibility(true);
          }
        }
        else {
          this.view.btnDispute.setVisibility(false);
        }
      }
      else {
        this.view.btnDispute.setVisibility(false);
      }
    } else {
      this.view.btnDispute.setVisibility(false);
    }
  },
   setCardTransactionDetailsData : function(){
    try{
    var formatUtil = applicationManager.getFormatUtilManager();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmCardTransactionDetails");
    this.view.lblTransactionAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(data.transactionAmount, data.transactionCurrency);
    this.view.lblTransactionDescriptionValue.text = data.reserved6;
    data.merchantNameLocation = data.hasOwnProperty("merchantNameLocation") && !kony.sdk.util.isNullOrUndefinedOrEmptyObject(data.merchantNameLocation) ? data.merchantNameLocation.replace(/\s+/g, ' ').trim() : "NA";
    this.view.lblTransactionDateValue.text = data.merchantNameLocation;
    this.view.lblTransactionTimeValue.text = data.transactionDate;
    this.view.btnDispute.isVisible = false;
    let today = new Date();
    let setDateOfMinusThirtyDays = today.setDate(today.getDate() - 30);
    var minusThirtyDaysFromToday = new Date(setDateOfMinusThirtyDays);

var currentBankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
      var currentBankDateObj = !kony.sdk.util.isNullOrUndefinedOrEmptyObject(currentBankDate) ? new Date(currentBankDate.currentWorkingDate).getTime() : new Date().getTime();
      var eligibleDaysForCardDisputeTransaction = parseInt(scope_configManager.setEligibleDaysForCardDisputeTransaction());

           var formattedCardTraDate = new Date(data.transactionDate);
            var diffInMs = currentBankDateObj - formattedCardTraDate;
            var diffInDays = (currentBankDateObj - formattedCardTraDate) / (1000 * 60 * 60 * 24);
            //eligible dispute transaction
      if (formattedCardTraDate < currentBankDateObj && 
        diffInDays < eligibleDaysForCardDisputeTransaction && 
        data.reserved5 === "00" && 
        data.reserved4 === "Matched") {
        this.view.btnDispute.isVisible = true;
      } else {
        this.view.btnDispute.isVisible = false;
      }
    // this.view.btnDispute.isVisible  = (data.isDisputed === "true" || data.isDisputed === true) ? false : true;// === "true" && minusThirtyDaysFromToday < new Date(data.formattedPostingDate) ? true : false;
    // isEligebleDisupte ? this.view.btnDispute.isVisible = true : this.view.btnDispute.isVisible = false;
    this.view.lblTransactionStatusValue.text = (data.reserved5 == "00" ? "Success" : "Failed") +
      ((data.reserved5 == "00" && data.reserved1 == "Full") ?
        "  |  Reversed" : ((data.reserved5 == "00" && data.reserved4 == "Matched") ?
          "  |  Settled" : (data.reserved5 == "00" && data.reserved4 == "In Instance") ?
            "" : data.reserved6)) + (data.isDisputed === "true" ? "  |  Disputed" : "");
    this.view.lblTransactionReferenceNumberValue.text = data.referenceNumber;
     if (data.hasOwnProperty("transactionExchangeRate") && !kony.sdk.util.isNullOrUndefinedOrEmptyObject(data.transactionExchangeRate)) {
       this.updateTaxField(data);
     }
     this.view.flxTransactionAmount.isVisible = true;
     this.view.flxTransactionDescription.isVisible = true;
     this.view.flxTransactionDate.isVisible = true;
     this.view.flxTransactionTime.isVisible = true;

     this.view.flxTransactionMerchantAddressName.isVisible = false;
     this.view.flxTransactionMerchantCity.isVisible = false;
     this.view.flxMerchantCategory.isVisible = false;
     this.view.flxTransactionStatus.isVisible = true;

     this.view.flxTransactionCategory.isVisible = false;
     this.view.flxTransactionType.isVisible = false;
     this.view.flxTransactionReferenceNumber.isVisible = true;
     this.view.flxTransactionExchangeRate.isVisible = false;

     this.view.flxExchangeCurrency.isVisible = false;
     this.view.flxExchangeAmount.isVisible = false;
     this.view.flxTaxPercentage.isVisible = false;
     this.view.flxTransactionTaxAmount.isVisible = false;
    } catch (err) {
      kony.print("Cards Transaction" + err);
      applicationManager.getDataProcessorUtility().showToastMessageError(controller, kony.i18n.getLocalizedString("i18n.common.errorCodes.10118"));
    }
  },

  updateTaxField: function(data){
     if(data.transactionStatus === "C")
    {
      this.view.lblTransactionSuccess.text = "Successful";
      this.view.lblTransactionSuccess.skin = "sknlblSSPR22px";
    }
    if(data.transactionStatus === "P")
    {
      this.view.lblTransactionSuccess.text = "Pending";
      this.view.lblTransactionSuccess.skin = "sknlblSSPR22px";
    }
    if(!kony.sdk.isNullOrUndefined(data.transactionExchangeRate)){
    this.view.lblTransactionExchangeRateValue.text = data.transactionExchangeRate;
    this.view.flxTransactionExchangeRate.setVisibility(true);
    }
    else{
      this.view.flxTransactionExchangeRate.setVisibility(false);
    }
    if(!kony.sdk.isNullOrUndefined(data.exchangeCurrency)){
        this.view.lblExchangeCurrencyValue.text = data.exchangeCurrency;
        this.view.flxExchangeCurrency.setVisibility(true);
    }
    else{
        this.view.flxExchangeCurrency.setVisibility(false);
    }
    if(!kony.sdk.isNullOrUndefined(data.exchangeAmount)){
      this.view.lblExchangeAmountValue.text = data.exchangeAmount;
      this.view.flxExchangeAmount.setVisibility(true);
    }
    else{
      this.view.flxExchangeAmount.setVisibility(false);
    }
    if(data.cardType == "Credit")
    {
      this.view.lblTransactionCategoryValue.text = mapper[data.transactionCategory];
      if(!kony.sdk.isNullOrUndefined(data.transactionTaxIndicator) && data.transactionTaxIndicator === "Y"){
        if(!kony.sdk.isNullOrUndefined(data.taxPercentage)){
          this.view.lblTaxPercentageValue.text = data.taxPercentage;
          this.view.flxTaxPercentage.setVisibility(true);
        }
        else{
          this.view.flxTaxPercentage.setVisibility(false);
        }
        if(!kony.sdk.isNullOrUndefined(data.transactionTaxAmount)){
          this.view.lblTransactionTaxAmountValue.text = data.transactionTaxAmount;
          this.view.flxTransactionTaxAmount.setVisibility(true);
        }
        else{
          this.view.flxTransactionTaxAmount.setVisibility(false);
        }
      }
      else{
        this.view.flxTaxPercentage.setVisibility(false);
        this.view.flxTransactionTaxAmount.setVisibility(false);
      }
    }
    else
    {
      this.view.flxTransactionCategory.setVisibility(false);
      this.view.flxTaxPercentage.setVisibility(false);
      this.view.flxTransactionTaxAmount.setVisibility(false);
    }

  },
  onclickdownload: function () {
    var navMan = applicationManager.getNavigationManager();
    var userFeatures = applicationManager.getConfigurationManager().getUserFeatures();
    var userPermission = applicationManager.getConfigurationManager().getUserPermissions();
    var cardTransactionDetails = navMan.getCustomInfo("frmCardTransactionDetails");
    let userName = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
    var data = {
      "Id": cardTransactionDetails.authCode ? cardTransactionDetails.authCode : "",
      "accountId": "",//cardTransactionDetails.bankActNum ? cardTransactionDetails.bankActNum : "",
      "accountName": "",//cardTransactionDetails.bankActNum ? cardTransactionDetails.bankActNum : "",
      "accountNumber": cardTransactionDetails.mpxActNum ? cardTransactionDetails.mpxActNum : "",
      "amount": cardTransactionDetails.transactionAmount ? cardTransactionDetails.transactionAmount : "",
      "curntView": 1,
      "dateFormat": "m/d/Y",
      "customerId": cardTransactionDetails.authCode ? cardTransactionDetails.authCode : "101602",
      "description": cardTransactionDetails.reserved6 ? cardTransactionDetails.reserved6 : "",
      "fileType": "pdf",
      "fromAccountBalance": "",//cardTransactionDetails.fromAccountBalance ? cardTransactionDetails.fromAccountBalance : "",
      "fromAccountName": "",//cardTransactionDetails.fromAccountName ? cardTransactionDetails.fromAccountName : "",
      "fromAccountNumber": "",//cardTransactionDetails.bankActNum ? cardTransactionDetails.bankActNum : "",
      "generatedBy": !kony.sdk.isNullOrUndefined(userName) ? userName : "5722319540",
      "payeeCurrency": "",//cardTransactionDetails.payeeCurrency ? cardTransactionDetails.payeeCurrency : "",
      "postedDate": cardTransactionDetails.formattedPostingDate ? cardTransactionDetails.formattedPostingDate : "",
      "scheduledDate": "",//cardTransactionDetails.scheduledDate ? cardTransactionDetails.scheduledDate : "",
      "searchTransactionType": "Transfers",
      "statusDescription": "",//cardTransactionDetails.statusDescription ? cardTransactionDetails.statusDescription : "",
      "transactionCurrency": cardTransactionDetails.transactionCurrency ? cardTransactionDetails.transactionCurrency : "",
      "transactionDate": cardTransactionDetails.transactionDate ? cardTransactionDetails.transactionDate : "",
      //"transactionDetails": "{\"Id\":\"208491343067491.000002\",\"amount\":\"-10\",\"checkNumber\":\"\",\"description\":\"Transfer Out To Acc.No.- 11001016010028\",\"fromAccountBalance\":\"19990\",\"fromAccountNumber\":\"25127\",\"isScheduled\":\"\",\"payeeCurrency\":\"NPR\",\"postedDate\":\"2024-12-12\",\"scheduledDate\":\"2024-12-12\",\"statusDescription\":\"Successful\",\"transactionCurrency\":\"NPR\",\"transactionDate\":\"2024-12-12\",\"transactionId\":\"FT2434768BMZ\",\"transactionType\":\"Transfers\",\"transactionsNotes\":\"To Acc.No.- 11001016010028\"}",
      "transactionId": cardTransactionDetails.referenceNumber ? cardTransactionDetails.referenceNumber : "",
      "transactionType": "Transfers",
      "transactionsNotes": cardTransactionDetails.transactionsNotes ? cardTransactionDetails.transactionsNotes : "",
      "valueDateTime": cardTransactionDetails.transactionDate ? cardTransactionDetails.transactionDate : "",
    };
    navMan.setEntryPoint("frmCardTransactionDetails", "Transfers");
    // var transactionDetails = {
    //   data.amount
    //   checkNumber - can be empty
    //   description
    //   fromAccountBalance
    //   fromAccountNumber
    //   isScheduled - can be empty
    //   payeeCurrency
    //   postedDate
    //   scheduledDate
    //   statusDescription
    //   transactionCurrency
    //   transactionDate
    //   transactionId
    //   transactionType
    //   transactionsNotes
    // };
    data["transactionDetails"] = JSON.stringify(data);
    data["userFeatures"] = userFeatures;
    data["userPermissions"] = userPermission;
    applicationManager.getPresentationUtility().showLoadingScreen();
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.downloadCardStatement(data);
  },

 goBack : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },

  showPopUp: function (res) {
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
  },
 });