define({

    preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxBody.top = "5dp";
        } else {
            this.view.flxBody.top = "58dp";
        }
    
            this.view.onDeviceBack = this.goBack;
            this.view.customHeader.flxBack.onClick = this.goBack;
            this.view.customHeader.btnRight.onClick = this.onCancelClick;
        
        this.setData();
        this.view.btnTransfer.onClick = this.topUpServiceCall;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setData: function () {
/*

{
    "amount": amount,
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
    "cardNumber": "4101020000013563",//selectedCardData.cardNumber,
    //s2m payload
    "cCardNumber": "4101020000013563",//selectedCardData.cardNumber,
    "mxpAccountNumber": "62770700000057554",
    "topupCurrency": "USD",
    "accountNumber": this.view.lblAccountNumberValue.text,
    "debtorName": this.view.lblAccountNameValue.text,
    "convertedAmount": amount,
    "referenceId": "",
    "transactionId": "",
//data for review screen
    "cardHolderName": this.view.lblCardHolderName.text,
    "exchagevalue": this.convertedPerRate.convertedAmount,
    "flow": "Virtual Prepaid Intl"
}
         */
        var formatUtil = applicationManager.getFormatUtilManager();
        var navManager = applicationManager.getNavigationManager();
        var reviewData = applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
        this.view.lblTransferAmountTitle.text = formatUtil.formatAmountandAppendCurrencySymbol(reviewData.enterdAmountInUSD, reviewData.topupCurrency);
        this.view.flxReviewFromAccDetails.lblFromAccHolderName.text = reviewData.debtorName;//from acc holder name
        this.view.flxReviewFromAccDetails.lblFromAccNumber.text = reviewData.fromAccountNumber;//from acc number
        this.view.flxReviewCardDetailsC.lblFromAccHolderName.text = reviewData.cardHolderName;//card holder name
        this.view.flxReviewCardDetailsC.lblFromAccNumber.text = reviewData.cardNumber;//card number
        this.view.lblAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(reviewData.amount, reviewData.toAccountCurrency); //amount
        this.view.lblExchagevalue.text = reviewData.exchagevalue;//exchange value
        this.view.lblDebitValue.text = reviewData.amount;//debit value
        this.view.lblCardTypevalues.text = reviewData.transactionsNotes;//limit
    },

    makeDollorTopup: function () {

        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var params = applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.intraBankTransferMB(params);
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

    topUpServiceCall: function (response) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var param = navManager.getCustomInfo("topUpVirtualDollorCardData");
        var ackData = navManager.getCustomInfo("topUpCardAckData");
        // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        // manageCardsModule.presentationController.topUpCardMB(params);
        var ManageCardsUIModulePresenter = applicationManager.getModulesPresentationController({
                    "appName": "CardsMA",
                    "moduleName": "ManageCardsUIModule"
                });

                if ( response.hasOwnProperty("referenceId") && response.hasOwnProperty("status")&& !(kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.referenceId)) && response.status === "success") {
                    delete param.validate;
                    param.transactionId = response.referenceId;
                    //CR changes
                    param.beneficiaryAddressLine1 = param.transactionsNotes,
                    param.beneficiaryAddressLine2 = param.cCardNumber,
                    param.beneficiaryPhone = scope_configManager.getCardTopUpPayableAccName(),
                    param.beneficiaryCity = "card topup",
                    ManageCardsUIModulePresenter.cardVirtualDollarTopupPrepaid(param);//updated param second hit
                } else {
                    ManageCardsUIModulePresenter.cardVirtualDollarTopupPrepaid(param);//first hit
                }
    },
    // onNavigate: function(uidata){

    // if(uidata.transferSuccess){
    // this.topUpServiceCall();
    // }
    // if(uidata.mfaEnable){
    // this.mfaValidation(uidata.mfaEnable);
    // }
    // if(uidata.serverError){
    // this.toastMsg(uidata.serverError);
    // }
    // },
    postShow: function () {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
        /*var navMan = applicationManager.getNavigationManager();
        var consentDetails = navMan.getCustomInfo("consentDetailss");
            this.view.lblAmountValue.text=consentDetails.panNum;
            this.view.lblDebitValue.text=consentDetails.amountVal;
            this.view.lblCardTypevalues.text=consentDetails.notes;*/
    },




    // flxOnClick: function () {
    // var navManager = applicationManager.getNavigationManager();
    // var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    // var bankDate = navManager.getCustomInfo("bankDates");
    // var data= navManager.getCustomInfo("topUpVirtualDollorCardData");
    // var cardPay = navManager.getCustomInfo("topUpCardPayload");
    // var intrares =applicationManager.getNavigationManager().getCustomInfo("intraResponse");
    // var currentBankDate = "";
    // if (bankDate) {
    //             currentBankDate = bankDate.currentWorkingDate;
    //             if (currentBankDate) currentBankDate = currentBankDate + "T00:00:00.000Z";
    //         }   
    //    var enteredAmount = kony.sdk.isNullOrUndefined(data.topUpAmount)?0.00:Number(data.topUpAmount)  
    // if(!kony.sdk.isNullOrUndefined(enteredAmount)){
    // var roundeAmount = enteredAmount.toFixed(2);
    // }
    // var amount = roundeAmount;
    // // var params ={
    // //             "amount": amount,
    // //             "beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
    // //             "frequencyType": "Once",
    // //             "fromAccountCurrency": "NPR",
    // //             "fromAccountNumber": data.fromAccNumber,
    // //             "scheduledDate": currentBankDate,
    // //             "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
    // //             "toAccountCurrency": "NPR",
    // //             "toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
    // //             "transactionCurrency": "NPR",
    // //             "transactionsNotes": data.notes,
    // //             "frequencyEndDate":currentBankDate,
    // //             "frequencyStartDate":currentBankDate,
    // //             "transactionType":"InternalTransfer",
    // //             "validate":"",
    // //             "isScheduled":"0",
    // //             "createWithPaymentId":"true",
    // //             "cardNumber":cardPay.cardNumber,
    // //             "transactionId": intrares.referenceId
    // // };
    // applicationManager.getPresentationUtility().showLoadingScreen();
    //         manageCardsModule.presentationController.intraBankTransferMB(params);
    //         // var navManager = applicationManager.getNavigationManager();
    //         //navManager.navigateTo("frmTopUpVirtualDollerCardAckScreen");
    //     },


    // setFormFields: function(cardData){
    //     var navManager = applicationManager.getNavigationManager();
    //     var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpVirtualDollorCardData");
    //     ackData.transfer ="";
    // var cardDetails =navManager.getCustomInfo("cardsDetails");

    // },



    // toastMsg: function(errorMsg){
    // var err =errorMsg;
    // if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
    // applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errorMessage.errorMessage);
    // }
    // else if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
    // applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errorMessage);
    // }else if(!kony.sdk.isNullOrUndefined(err.errmsg)){
    // applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errmsg);
    // }else{
    // applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("kony.mb.10539"));   
    // }
    // },
});