define({ 

preShow: function () {
     if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
       this.view.flxMain.top ="10dp";
       }else{
         this.view.flxMain.top ="58dp";
         this.view.customHeader.btnRight.onClick = this.onCancelClick;
         this.view.customHeader.flxBack.onClick = this.navBack;
       }
        this.view.btnContinue.onClick = this.flxOnClick;
        this.view.txtBoxAmountValue.onTextChange = this.btnsetEnable;
        this.view.txtArea.onTextChange = this.btnsetEnable;
        this.view.flxSelectedFromAccount.onClick = this.fromAccountSelection;
        this.view.lblToAccountValue.text = this.maskCardNumber();
        
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.getBankDateMB();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
     },
  onNavigate: function(uidata){
    try{
    if(uidata.exchangeConversion){
        this.setFromAccountData(uidata.exchangeConversion);
    }if(uidata.serverError){
    this.toastMsg(uidata.serverError);
    }
    }catch(err){
        kony.print("onNavigate"+ err);
    }
},
 navBack: function(){
     var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
        },
flxOnClick: function () {
         var panNo = this.view.txtBoxPanValue.text;
         var amount = this.view.txtBoxAmountValue.text;
		var note =this.view.txtArea.text;
		var navManager = applicationManager.getNavigationManager();
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
        var fromAcc = presenter.presentationController.accountID;
      var cardDetails =navManager.getCustomInfo("cardsDetails");
       var bankDate = navManager.getCustomInfo("bankDates");
         if (bankDate) {
                currentBankDate = bankDate.currentWorkingDate;
                if (currentBankDate) currentBankDate = currentBankDate + "T00:00:00.000Z";
            } 
        var data = {
              "amountValue" : this.view.txtBoxAmountValue.text,
			  "note" : this.view.txtArea.text,
              "fromAcc":fromAcc,
              "toAcc": this.view.lblToAccountValue.text
        };
        navManager.setCustomInfo("consentDetail", data);
       var enteredAmount = kony.sdk.isNullOrUndefined(data.amountValue)?0.00:Number(data.amountValue)  
    if(!kony.sdk.isNullOrUndefined(enteredAmount)){
    var roundeAmount = enteredAmount.toFixed(2);
    }
        var payload ={
                "amount": roundeAmount,
                "beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "fromAccountNumber": fromAcc,
                "scheduledDate": currentBankDate,
                "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                "toAccountCurrency": "NPR",
                "toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
                "transactionCurrency": "NPR",
                "transactionsNotes": data.note,
                "frequencyEndDate":currentBankDate,
                "frequencyStartDate":currentBankDate,
                "transactionType":"InternalTransfer",
                "validate":"true",
                "isScheduled":"0",
                "createWithPaymentId":"true",
                "cardNumber":cardDetails.cardId
                };
     var topUpPrepaid = {
        "flow": cardDetails.Card_Category,
        "transfer":"prepaid"
        };
        navManager.setCustomInfo("topUpCardAckData", topUpPrepaid);
    presenter.presentationController.intraBankTransferMB(payload);
    // navManager.navigateTo({"appName": "CardsMA","friendlyName": "frmTopUpDomesticCardVerifyScreen"},false,{"cardData":consentDetails});     
    },
     setFromAccountData: function(accounts){
        this.resetUI();
        }, 
        resetUI: function(){
            var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
             this.view.lblAccountValue.text =presenter.presentationController.formattedAccountName;
        this.view.txtBoxAmountValue.text="";
        this.view.txtBoxPanValue.text="";
        this.view.txtArea.text="";
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin ="sknBtnOnBoardingInactive";
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
    this.view.lblToAccountValue.text =number;
    }, 

        btnsetEnable: function(){
      if((!kony.sdk.util.isNullOrUndefinedOrEmptyObject(this.view.txtBoxAmountValue.text)) && (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(this.view.txtArea.text))){
        this.fromAccountValidation();
       }else{
      this.view.btnContinue.setEnabled(false);
       this.view.btnContinue.skin ="sknBtnOnBoardingInactive";
  }

  },
  fromAccountValidation: function(){
    try{
          var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
         var availableBalance = presenter.presentationController.currentBalance;
             if(Number(availableBalance)> Number(this.view.txtBoxAmountValue.text)){
                if(Number(this.view.txtBoxAmountValue.text)>1){
                this.view.btnContinue.setEnabled(true);
                this.view.btnContinue.skin ="sknBtn004B9526pxFocus";
                }else{
                    applicationManager.getDataProcessorUtility().showToastMessageError(this,"Minimum Transaction amount is 1.00");
                }
            }else{
              applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("i18n.BillPay.InsufficientBalance"));
             }
        }catch(err){
                kony.print("fromAccountValidation"+err);
            }
  },
   fromAccountSelection: function(){
            var navManager = applicationManager.getNavigationManager();
            applicationManager.getPresentationUtility().showLoadingScreen();
           navManager.setCustomInfo("fromAccFlag","frmTopUpDomesticCardConsentScreen");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.navigateToNewCardFlow();
          //var navManager = applicationManager.getNavigationManager();
            //navManager.navigateTo("frmManageNewCardAccounts");  
        },
        onCancelClick: function(){
            applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
     var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.onCancelClick();
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
 });