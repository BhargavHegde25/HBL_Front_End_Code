define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {

    return {
        convertedPerRate: "",
        convertedAmountInNpr:"",
        selectedAccBalance:"",
        isEnteredAmntIsLessThanAccBalance:false,
        preShow: function () {
            try {
                var scope = this;
                if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                    this.view.flxBody.top = "10dp";
                } else {
                    this.view.flxBody.top = "60dp";
                }
                this.view.txtBoxAmountValue.onTextChange = this.validateAmount;
                this.view.txtBoxAmountValue.onTextChange = function () {
                     applicationManager.getPresentationUtility().showLoadingScreen();
                    scope.validateAmount();
                    scope.setDebitAmount();
                     applicationManager.getPresentationUtility().dismissLoadingScreen();
                };
                this.convertEnteredAmount();
                this.view.txtArea.onTextChange = scope.validateAmount;
                this.view.customHeader.flxBack.onClick = this.goBack;
                this.view.customHeader.btnRight.onClick = this.onCancelClick;
                this.view.btnTransfer.onClick = this.navigateToDollorTopUpReview;
                this.view.flxSelectedFromAccount.onClick = this.selectFromAccNew;
                this.view.btnTransfer.setEnabled(false);
                this.view.btnTransfer.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                this.setData();
                 applicationManager.getPresentationUtility().dismissLoadingScreen();
            } catch (err) {
                kony.print("onCancel" + err);
            }
        },

        setDebitAmount: function () {
            var navManager = applicationManager.getNavigationManager();
            /*
            {
            buyRate: "138.90"
convertedAmount: "0.0072"
currenceCode: "NPR"
currenceName: "US Dollar"
httpStatusCode: 200
httpresponse: {headers: {…}, url: 'https://infinity.himalayanbank.com:443/services/da…reignExchange/operations/Forex/getConvertedAmoun…, responsecode: 200}
market: "TT"
midRevalRate: "139.35"
opstatus: 0
sellRate: "139.80"
success: "true"
            }
            */
             this.convertedPerRate = navManager.getCustomInfo("setConvertedAmountExchangePerRateTopUpSuccess");
            var param = { "fromAccountCurrency": "NPR", "transactionCurrency": "USD", "transactionAmount": this.view.txtBoxAmountValue.text };
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            // this.convertedPerRate = manageCardsModule.presentationController.getConvertedAmountExchangePerRateTopUpSuccess();
            if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(this.convertedPerRate)) {
                this.view.lblAmountInstru.text = "Exchange Rate: 1 NPR = " + this.convertedPerRate.convertedAmount + " USD";
                var debitValueInNPR =Number(this.view.txtBoxAmountValue.text) / Number(this.convertedPerRate.convertedAmount);
                this.view.lblDebitAmount.text = "NPR "+ Number(debitValueInNPR).toFixed(2);
                this.convertedAmountInNpr = Number(debitValueInNPR).toFixed(2);
            } else {
                this.view.lblAmountInstru.text = "Exchange Rate: 1 NPR = 0.0071 USD";//Exchange Rate: 1 NPR = 0.0074 USD
                this.view.lblDebitAmount.text = "0.00";
                this.convertedAmountInNpr = "0.00";
            }
            


        },

        convertEnteredAmount: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var param = { "fromAccountCurrency": "NPR", "transactionCurrency": "USD", "transactionAmount": this.view.txtBoxAmountValue.text };
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.getExchangePerRateTopUp(param);
        },
        validateAmount: function () {
            try {
                var scope = this;
                var onlyNumericRegex = /^\d+$/;
                if (!this.view.txtBoxAmountValue.text.match(onlyNumericRegex)) {
                    this.view.txtBoxAmountValue.text = "";
                }
                var amountValue = this.view.txtBoxAmountValue.text;
                var notesValue = this.view.txtArea.text;
                var formattedAccountBalance = this.view.lblAccountbalanceValue.text
                var accBalance = !kony.sdk.util.isNullOrUndefinedOrEmptyObject(formattedAccountBalance)?formattedAccountBalance.split(" ")[1].replace(/,/g,""):"0.00";
                
                if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(amountValue)) {
                    // scope.isEnteredAmntIsLessThanAccBalance = Number(amountValue)>=Number(accBalance) ? true:false;
                    if((scope.convertedPerRate.success === "true" || scope.convertedPerRate.success === true) && !kony.sdk.util.isNullOrUndefinedOrEmptyObject(scope.convertedPerRate.convertedAmount)){
                    if(Number(amountValue)<=Number(accBalance)){
                         if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(notesValue)) {
                        this.enableBtnAndErrorMessage("");
                    }else{
                        this.disableBtnAndErrorMessage(kony.i18n.getLocalizedString("i18n.HBL.NotesMandatory"));
                    }
                    }else{
                        this.disableBtnAndErrorMessage(kony.i18n.getLocalizedString("i18n.Accounts.AvailableBalanceError"));
                    }
                }else{
                   this.disableBtnAndErrorMessage(kony.i18n.getLocalizedString("i18n.Accounts.AvailableBalanceError"));
                }
                } else {
                    this.disableBtnAndErrorMessage(kony.i18n.getLocalizedString("i18n.StopPayments.errormessages.InvalidAmount"));
                }
            } catch (err) {
                kony.print("navigateToDollorTopUpReview" + err);
            }
        },
        enableBtnAndErrorMessage: function(msg){
 this.view.lblLimitNumber.isVisible = false;
                        this.view.lblLimitNumber.text = msg;
                        this.view.btnTransfer.setEnabled(true);
                        this.view.btnTransfer.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
                        this.view.btnTransfer.focusSkin = "sknHBLBtn851a1cRounded8pxffffff100pr";
        },

        disableBtnAndErrorMessage: function(msg){
            this.view.lblLimitNumber.isVisible = true;
                    this.view.lblLimitNumber.text = msg;
                    this.view.btnTransfer.setEnabled(false);
                    this.view.btnTransfer.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                    this.view.btnTransfer.focusSkin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        },


        navigateToDollorTopUpReview: function (data) {
            try {
                applicationManager.getPresentationUtility().showLoadingScreen();
                var scope = this;
                var navManager = applicationManager.getNavigationManager();
                var prePopulateTopUpFromAccount = navManager.getCustomInfo("prePopulateTopUpFromAccount");
                var selectedCardData = navManager.getCustomInfo("cardsDetails");
                var bankDate = navManager.getCustomInfo("bankDates");
                var currentBankDate = "";
                var selectedCardNumber = selectedCardData.maskedCardNumber
                if (bankDate) {
                    currentBankDate = bankDate.currentWorkingDate;
                    if (currentBankDate) currentBankDate = currentBankDate + "T00:00:00.000Z";
                }
                // var enteredAmount = kony.sdk.isNullOrUndefined(this.view.txtBoxAmountValue.text) ? 0.00 : Number(this.view.txtBoxAmountValue.text)
                // if (!kony.sdk.isNullOrUndefined(enteredAmount)) {
                //     var roundeAmount = enteredAmount.toFixed(2);
                // }
                // var amount = roundeAmount;

                 var topUpVirtualDollorCardData ={
    "amount": scope.convertedAmountInNpr,
    "beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
    "frequencyType": "Once",
    "fromAccountCurrency": "NPR",
    "fromAccountNumber": this.view.lblAccountNumberValue.text,
    "scheduledDate": currentBankDate,
    "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
    "toAccountCurrency": "NPR",
    "toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
    "transactionCurrency": "NPR",
    "transactionsNotes": this.view.txtArea.text,
    "frequencyEndDate": currentBankDate,
    "frequencyStartDate": currentBankDate,
    "transactionType": "InternalTransfer",
    "validate": "true",
    "isScheduled": "0",
    "createWithPaymentId": "true",
    "cardNumber": selectedCardData.pan,
    //s2m payload
    "cCardNumber": selectedCardData.pan,//selectedCardData.cardNumber,
    "mxpAccountNumber": selectedCardData.mxpAccNum,//"62770700000057554",
    "topupCurrency": "USD",
    "accountNumber": this.view.lblAccountNumberValue.text,
    "debtorName": this.view.lblAccountNameValue.text,
    "convertedAmount": scope.convertedAmountInNpr,
    "referenceId": "",
    "transactionId": "",
    //for email trigger
    "cardProduct":selectedCardData.cardType,
    "cardType":selectedCardData.Card_Label,
    "cardHolderName":selectedCardData.chName,
//data for review screen
    "cardHolderName": this.view.lblCardHolderName.text,
    "exchagevalue": "1 NPR = " + this.convertedPerRate.convertedAmount + " USD",
    "flow": "Virtual Prepaid Intl",
    "enterdAmountInUSD":this.view.txtBoxAmountValue.text,
//validation flag
"transfer":"",
}
/*
{
    "amount": "6944.44",
    "beneficiaryName": "Card TopUp Payable Account",
    "frequencyType": "Once",
    "fromAccountCurrency": "NPR",
    "fromAccountNumber": "11002825000024",
    "scheduledDate": "2025-07-17T00:00:00.000Z",
    "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
    "toAccountCurrency": "NPR",
    "toAccountNumber": "12008433710017",
    "transactionCurrency": "NPR",
    "transactionsNotes": "test",
    "frequencyEndDate": "2025-07-17T00:00:00.000Z",
    "frequencyStartDate": "2025-07-17T00:00:00.000Z",
    "transactionType": "InternalTransfer",
    "validate": "true",
    "isScheduled": "0",
    "createWithPaymentId": "true",
    "cardNumber": "4101020000013563"
}
    
  "topupAmou": "1",
    "cCardNumber": "4101020000013563",
    "mxpAccountNumber": "11002825000024",
    "topupCurrency": "USD",
    "accountNumber": "11002825000024",
    "debtorName": "MANISH KHANAL",
    "convertedAmount": "138.89",
    "referenceId": "PI251980H42CTVVC",
    "transactionId": "1058"
*/

                navManager.setCustomInfo("topUpVirtualDollorCardData", topUpVirtualDollorCardData);
                navManager.setCustomInfo("topUpCardAckData", { "flow": "Virtual Prepaid Intl" });
                //flow == "Prepaid Intl"
                navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "frmTopUpVirtualDollarCardReviewScreen" }, false);
            } catch (err) {
                kony.print("navigateToDollorTopUpReview" + err);
            }
        },

        setData: function () {
            try {
                var scope = this;
                scope.resetUi();
                var formatUtil = applicationManager.getFormatUtilManager();
                var navManager = applicationManager.getNavigationManager();
                var prePopulateTopUpFromAccount = navManager.getCustomInfo("prePopulateTopUpFromAccount");
                this.view.lblSelctCard.text = kony.i18n.getLocalizedString("i18n.fundsTransfer.notesMandatory");
                this.view.lblAmount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount") + " *";
                var selectedCardData = navManager.getCustomInfo("cardsDetails");
                this.view.lblAccountNameValue.text = prePopulateTopUpFromAccount.accountName;
                this.view.lblAccountbalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(prePopulateTopUpFromAccount.availableBalance, prePopulateTopUpFromAccount.currencyCode);
                // this.selectedAccBalance = this.view.lblAccountbalanceValue.text;
                this.view.lblAccountNumberValue.text = prePopulateTopUpFromAccount.Account_id;
                this.view.lblAccountTypeValue.text = prePopulateTopUpFromAccount.accountType;
                this.view.lblCardNumberValue.text = selectedCardData.pan;
                this.view.lblCardHolderName.text = selectedCardData.chName;
                this.view.lblCurrencyValue.text = "USD"//prePopulateTopUpFromAccount.currencyCode; // ccy value
                this.view.lblCurrentInstru.text = ""; //exchange rate details info
                this.view.lblAmountInstru.text = ""; //min and max amount info
                this.view.txtBoxAmountValue.text = "";
                this.view.txtBoxAmountValue.placeHolder = "0.00";
                this.view.lblLimitNumber.isVisible = false;//limit error info red
                this.view.lblDebitAmount.text = "0.00"//this.debitAmountValue();//amount that debit from acc
                this.view.txtArea.text = "";
            } catch (err) {
                kony.print("setData" + err);
            }
        },
        /*
        from acc response
        AccountName: "MANISH KHANAL"
        Account_id: "11002825000024"
        IBAN: "NA"
        MembershipName: "MANISH KHANAL11002825000024"
        Membership_id: "282500"
        accountHolder: "{\"username\":\"MANISH KHANAL\",\"fullname\":\"MANISH KHANAL\"}"
        accountID: "11002825000024"
        accountName: "MANISH KHANAL"
        accountStatus: "ACTIVE"
        accountType: "Savings"
        account_id: "11002825000024"
        arrangementId: "AA2518355M38"
        availableBalance: "1199908190"
        bankName: "Head Office"
        categoryId: "6051"
        companyId: "NP0010001"
        coreCustomerId: "282500"
        coreCustomerName: "MANISH KHANAL11002825000024"
        currencyCode: "NPR"
        currentBalance: "1199908190"
        customerRole: "OWNER"
        description: "Special Payroll Account"
        displayName: "MANISH KHANAL"
        eStatementEnable: "false"
        favouriteStatus: "1"
        intermediaryBankName: "Head Office"
        isBusinessAccount: "false"
        isNew: "false"
        isPortFolioAccount: "false"
        isSweepCreated: false
        nickName: "MANISH KHANAL"
        openingDate: "2025-07-02"
        principalBalance: "1199908190"
        productGroup: "SPECIAL.PAYROLL"
        productId: "SPECIAL.PAYROLL"
        roleDisplayName: "Beneficial Owner"
        supportBillPay: "1"
        supportChecks: "1"
        supportDeposit: "1"
        supportTransferFrom: "1"
        supportTransferTo: "1"
        */
        resetUi: function () {
            try {
                this.view.lblAccountNameValue.text = "";
                this.view.lblAccountbalanceValue.text = "";
                this.view.lblAccountNumberValue.text = "";
                this.view.lblAccountTypeValue.text = "";
                this.view.txtBoxAmountValue.text = "";
                this.view.txtArea.text = "";
            } catch (err) {
                kony.print("onCancel" + err);
            }
        },

        goBack: function () {
            try {
                var navManager = applicationManager.getNavigationManager();
                navManager.goBack();
            } catch (err) {
                kony.print("goBack" + err);
            }
        },

        onCancelClick: function () {
            try {
                applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
                var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
                manageCardsModule.presentationController.onCancelClick();
            } catch (err) {
                kony.print("onCancel" + err);
            }
        },

        postShow: function () {
             applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        debitAmountValue: function () {
            var value = this.view.txtBoxAmountValue.text;
            if (!kony.sdk.isNullOrUndefined(value)) {
                this.view.lblDebitAmount.text = 0.0072 * parseInt(value);
            } else {
                this.view.lblDebitAmount.text = "-";
            }
        },


        selectFromAccNew: function () {
            try {
                var scope = this;
                var navManager = applicationManager.getNavigationManager();
                var qrPresentationController = applicationManager.getModulesPresentationController({
                    "moduleName": "QRPaymentsUIModule",
                    "appName": "TransfersMA"
                });
                applicationManager.getPresentationUtility().showLoadingScreen();

                var fromAccount = navManager.getCustomInfo("proccessedFromAccForTopUp");
                var accounts = qrPresentationController.processAccountsData(fromAccount.fromaccounts);
                var PopupObj = {
                    "accounts": accounts,
                    "flowType": "CARD_PAYMENT",
                    "rowClickCallback": scope.onRowSelection.bind(this)
                };
                applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope, PopupObj);
            } catch (err) {
                kony.print("onCancel" + err);
            }
        },

        onRowSelection: function (row) {
            try {
                var formatUtil = applicationManager.getFormatUtilManager();
                this.resetUi();
                this.view.lblAccountNameValue.text = row[0].lblAccname.text;//accName
                this.view.lblAccountbalanceValue.text = row[0].lblBalance.text;//formatUtil.formatAmountandAppendCurrencySymbol(row[0].lblBalance.text, "NPR"); //accBalance
                //this.selectedAccBalance = row[0].lblBalance.text;
                this.view.lblAccountNumberValue.text = row[0].lblAccNumber; //accNumber
                this.view.lblAccountTypeValue.text = row[0].lblAccType.text; //accType

                this.view.flxPopupfrombottom.setVisibility(false);
            } catch (err) {
                kony.print("onCancel" + err);
            }
        },

        showPopup: function(response){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, response);
        },

    };
});
/* old code
    return{
    enableBtn:"",
preShow: function () {
    try{
     if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxBody.top ="10dp";
    } else {
      this.view.flxBody.top ="58dp";
      this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.customHeader.btnRight.onClick = this.onCancelClick;
    }
       // this.view.btnTransfer.onClick = this.flxOnClick;
        this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        // this.view.flxSelectedFromAccount.onClick = this.fromAccountSelection;
       this.view.txtBoxAmountValue.onTextChange = this.amountWithExchangeRate;
       this.view.txtArea.onTextChange= this.checkBtn;
       this.view.flxSelectedFromAccount.onClick = this.selectFromAccNew;
        var param = {
                "fromAccountCurrency": "USD",
                "transactionCurrency": "NPR",
                "transactionAmount": "1"
            }
       var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
       presenter.presentationController.getCurrecyExchangeRateMB(param);

var fromAccount = navManager.getCustomInfo("proccessedCardPaymentFromAcc");

        //New code
        //this.view.btnTransfer.setEnabled(true);
        //this.view.btnTransfer.skin ="sknBtn004B9526pxFocus";
        //New code
        this.view.btnTransfer.onClick =this.formTopUpData;
        // this.view.btnTransfer.onClick =this.amountWithExchangeRate;
         if(applicationManager.getPresentationFormUtility().getDeviceName() != "iPhone"){
            this.view.onDeviceBack = this.goBack;
        }
        //this.maskCardNumber();
        this.view.lblCardNumbValue.text = this.maskCardNumber();
        var ConvertedNPRPrice = applicationManager.getNavigationManager().getCustomInfo("ConvertedNPRPrice");
        if(!kony.sdk.isNullOrUndefined(ConvertedNPRPrice)){
            this.view.lblCurrentInstru.text = "1 NPR = " + ConvertedNPRPrice + " USD";
        }
       var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
       manageCardsModule.presentationController.getBankDateMB();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
        kony.print("preshow"+ err);
    }
                },
onNavigate: function(uidata){
    try{
    if(uidata.exchangeConversion){
        this.setFromAccountData(uidata.exchangeConversion);
    }if(uidata.convertedAmount){
        this.lblDebitAmountText(uidata.convertedAmount);
    }if(uidata.serverError){
    this.toastMsg(uidata.serverError);
    }
    if(uidata.fromAccFlow){
        this.resetUI();
    }
    }catch(err){
        kony.print("onNavigate"+ err);
    }
},
debitAmountValue: function(){
    var value = this.view.txtBoxAmountValue.text;
    if(!kony.sdk.isNullOrUndefined(value)){
      this.view.lblDebitAmount.text = 0.0072 * parseInt(value);   
    }else{
         this.view.lblDebitAmount.text ="-";
    }
},
flxOnClick: function () {
          var panNo =this.view.txtBoxPanValue.text;
          var amount =this.view.txtBoxAmountValue.text;
		  var note = this.view.txtArea.text;
     var navManager = applicationManager.getNavigationManager();
        var consentDetails = {
              "panNum" : this.view.txtBoxPanValue.text,
              "amountVal" : this.view.txtBoxAmountValue.text,
			  "notes": this.view.txtArea.text,
        };
        navManager.setCustomInfo("consentDetailss", consentDetails);
        if (panNo == "" || amount == "" || note =="") {
            this.view.txtBoxAmountValue.skin = "sknLbl115000000";
            this.view.txtBoxPanValue.skin = "sknLbl115000000";
            this.view.txtArea.skin = "sknLbl115000000";
        } else {
            this.view.txtBoxAmountValue.skin = "ICSknTxtE3E3E31px34px";
            this.view.txtBoxPanValue.skin = "ICSknTxtE3E3E31px34px";
             this.view.txtArea.skin = "CopybbSknTArea";
             var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmCardsReviewDetailsScreen");
        }
        }, 
        setFromAccountData: function(accounts){
        this.resetUI();
        }, 
        resetUI: function(){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
                       
        // this.view.txtBoxAmountValue.skin = "ICSknTxtE3E3E31px34px";
        // this.view.txtBoxPanValue.skin = "ICSknTxtE3E3E31px34px";
        // this.view.txtArea.skin = "CopybbSknTArea";
        this.view.txtBoxAmountValue.text="";
        this.view.txtBoxPanValue.text="";
        this.view.txtArea.text="";
        },
        goBack: function(){
            try{
              var navManager = applicationManager.getNavigationManager();
              navManager.goBack();  
            }catch(err){
                kony.print("goBack"+err);
            }
        },
        onCancelClick: function(){
            try{
           applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.onCancelClick();
        }catch(err){
            kony.print("onCancel"+ err);
            }
        },
        fromAccountSelection: function(){
            var navManager = applicationManager.getNavigationManager();
            applicationManager.getPresentationUtility().showLoadingScreen();
           navManager.setCustomInfo("fromAccFlag","frmTopUpVirtualCardConsentScreen");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.navigateToNewCardFlow();
          //var navManager = applicationManager.getNavigationManager();
            //navManager.navigateTo("frmManageNewCardAccounts");  
        },  
        amountWithExchangeRate: function(){
            var navManager = applicationManager.getNavigationManager();
            var ConvertedUSDPrice = navManager.getCustomInfo("ConvertedNPRPrice")//navManager.getCustomInfo("ConvertedUSDPrice");
            var cardDetails =navManager.getCustomInfo("cardsDetails");
            var availableBalance =navManager.getCustomInfo("availableBalance");
            availableBalance =availableBalance.slice(4);
            var toacc =this.view.lblToAccount.text;
            var notes =this.view.txtArea.text;
            var amount =this.view.txtBoxAmountValue.text;
            this.view.lblDebitAmount.text = this.lblDebitAmountText((amount / ConvertedUSDPrice).toFixed(2));
        // this.view.lblDebitAmount.text ="NPR "+((amount*ConvertedUSDPrice).toFixed(2));
         var minAmount =50 * ConvertedUSDPrice;
          var maxAmount =500 *ConvertedUSDPrice;
      if (parseInt(amount) < minAmount) {
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.MinTopUpAmount"));
         this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
      }else if (parseInt(amount) > maxAmount || maxAmount == "NA"){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, "Maximum Top up amount allowed is USD 500");
         this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
      }else{
         if (amount < availableBalance) {
      if(!kony.sdk.isNullOrUndefined(toacc)&& !kony.sdk.util.isNullOrUndefinedOrEmptyObject(notes)&& !kony.sdk.util.isNullOrUndefinedOrEmptyObject(amount)&& !kony.sdk.util.isNullOrUndefinedOrEmptyObject(amount.length>2)){
        this.view.btnTransfer.setEnabled(true);
        this.view.btnTransfer.skin ="sknHBLBtn851a1cRounded8pxffffff100pr ";
        this.enableBtn = true;
      }else{
          this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
      }
      }else{
         applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.funds.InsufficientBalance"));
      }
    
     
      }
     }, 
     checkBtn: function(){
       var debitAmount = Number(this.view.lblDebitAmount.text.slice(4));
       var notes =this.view.txtArea.text;
        if((debitAmount>50) && !kony.sdk.util.isNullOrUndefinedOrEmptyObject(notes)){
         this.view.btnTransfer.setEnabled(true);
        this.view.btnTransfer.skin ="sknHBLBtn851a1cRounded8pxffffff100pr";
        }else{
        this.view.btnTransfer.setEnabled(false);
        this.view.btnTransfer.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        }
     },

     lblDebitAmountText: function(convertedAmount){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        return "USD " + CommonUtilities.formatCurrencyWithCommas(convertedAmount, true);
     },
    maskCardNumber: function(){
        var navManager = applicationManager.getNavigationManager();
      var cardDetails =navManager.getCustomInfo("cardsDetails");
     var number = cardDetails.cardId;
     if (number.length == 16)
    return number.slice(0, 4) + " " + number.slice(4, 6) + "XX XXXX " + number.slice(-4);
    else if (number.length == 15)
    return number.slice(0, 5) + " " + number.slice(5, 6) + "XXXX X" + number.slice(-4);
    else if (number.length == 19)
    return number.slice(0, 5) + " " + number.slice(5, 6) + "XXXX XXXXX " + number.slice(-4);
    this.view.lblCardNumberValue.text =number;
    },

formTopUpData: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
     var cardDetails =navManager.getCustomInfo("cardsDetails");
     var bankDate = navManager.getCustomInfo("bankDates");
    var fromAcc = presenter.presentationController.accountID;
    var amount = this.view.lblDebitAmount.text.slice(4);
    var currentBankDate = "";
    if (bankDate) {
                currentBankDate = bankDate.currentWorkingDate;
                if (currentBankDate) currentBankDate = currentBankDate + "T00:00:00.000Z";
            }   
    var topUpCardData ={
        "topupAmou":amount,
        "topUpAmount":this.view.txtBoxAmountValue.text,
        "cCardNumber":cardDetails.pan,
        "mxpAccountNumber":cardDetails.cardId,
        "topupCurrency": "NPR",
        "notes":this.view.txtArea.text,
         "fromAcc": fromAcc,
          "exchangeRate":this.view.lblCurrentInstru.text,
           "debitAmount":this.view.lblDebitAmount.text,
            "remainingLimit": "",
            "flow":cardDetails.Card_Category,
            "fromAccount":this.view.lblAccountNumberValue.text,
            "toAccount":this.view.lblCardNumberValue.text,
            "transfer":"firstTime"
    };
    var params ={
        "topupAmou":this.view.txtBoxAmountValue.text,
        "cCardNumber":cardDetails.pan,
        "mxpAccountNumber":cardDetails.cardId,
        "topupCurrency": "NPR"
    };
     var enteredAmount = kony.sdk.isNullOrUndefined(topUpCardData.topUpAmount)?0.00:Number(topUpCardData.topUpAmount)  
    if(!kony.sdk.isNullOrUndefined(enteredAmount)){
    var roundeAmount = enteredAmount.toFixed(2);
    }
     var payload ={
                "amount": roundeAmount,
                "beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "fromAccountNumber": topUpCardData.fromAcc,
                "scheduledDate": currentBankDate,
                "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                "toAccountCurrency": "NPR",
                "toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
                "transactionCurrency": "NPR",
                "transactionsNotes": topUpCardData.notes,
                "frequencyEndDate":currentBankDate,
                "frequencyStartDate":currentBankDate,
                "transactionType":"InternalTransfer",
                "validate":"true",
                "isScheduled":"0",
                "createWithPaymentId":"true",
                "cardNumber":params.cCardNumber
    };
     navManager.setCustomInfo("topUpCardPayload", params);
      navManager.setCustomInfo("topUpCardAckData",topUpCardData);
      presenter.presentationController.intraBankTransferMB(payload);
    //navManager.navigateTo({"appName": "CardsMA","friendlyName": "frmTopUpVirtualDollarCardReviewScreen"},false,{"cardData":topUpCardData});

},
toastMsg: function(errorMsg){
    var err =errorMsg;
    if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errorMessage.errorMessage);
    }
    else if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errorMessage);
    }else if(!kony.sdk.isNullOrUndefined(err.errmsg)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errmsg);
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("kony.mb.10539"));   
    }
    },

    selectFromAccNew: function () {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var qrPresentationController = applicationManager.getModulesPresentationController({
            "moduleName": "QRPaymentsUIModule",
            "appName": "TransfersMA"
        });
        // navManager.setEntryPoint("frmQRFromAccount", "frmQRActivation");
        // navManager.setCustomInfo("QRNavigationData", "frmQRfromAcc")
        // qrPresentationController.getFromAccounts();
        applicationManager.getPresentationUtility().showLoadingScreen();
        
        var fromAccount = navManager.getCustomInfo("proccessedCardPaymentFromAcc");
        var accounts = qrPresentationController.processAccountsData(fromAccount.fromaccounts);
        var PopupObj = {
            "accounts": accounts,//should br Array of object[{},{},{}...]
            "flowType": "CARD_PAYMENT",
            "rowClickCallback": scope.onRowSelection.bind(this)
        };
        applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope, PopupObj);
    },

    onRowSelection: function (row) {
        this.view.lblAccountNameValue.text = "";
        this.view.lblAccountbalanceValue.text = "";
        this.view.lblAccountNumberValue.text = "";
        this.view.lblAccountTypeValue.text = "";

        this.view.lblAccountNameValue.text = row[0].lblAccname.text;//accName
        this.view.lblAccountbalanceValue.text = row[0].lblBalance.text; //accBalance
        this.view.lblAccountNumberValue.text = row[0].lblAccNumber; //accNumber
        this.view.lblAccountTypeValue.text = row[0].lblAccType.text; //accType
        this.resetUI();
        this.view.flxPopupfrombottom.setVisibility(false);
    },

};
 });
 */