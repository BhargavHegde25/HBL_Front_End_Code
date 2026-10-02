define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    preShow: function () {
        this.view.postShow = this.postShow;
        //this.setCardTypeData();
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("virtualPrepaidCardDetails");
        var status = navManager.getCustomInfo("selectedVirtualCardType");
        var flow = navManager.getCustomInfo("flowTypeVirtual");
        var details = navManager.getCustomInfo("cardDetailsVirtualType");
        var previousForm = kony.application.getPreviousForm().id;
        if (previousForm === "frmManageNewCardName") {
            this.view.txtBoxPanValue.text = data.panNo;
            this.view.txtBoxAmountValue.text = data.virtualAmount;
            this.view.lblCardTypeValue.text = data.virtualCardType;
        } else if (previousForm === "frmReqVirtualDollerCard") {
            this.view.txtBoxAmountValue.text = "";
            this.view.txtBoxPanValue.text = "";
            this.view.lblCardTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectCard");
        } else if (flow === "virtualCardTypeFlow") {
            if (!kony.sdk.isNullOrUndefined(details)) {
                this.view.txtBoxAmountValue.text = details.virtualAmount;
                this.view.txtBoxPanValue.text = details.panNo;
                this.view.lblCardTypeValue.text = status;
            } else {
                this.view.lblCardTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectCard");
            }
        }
        this.disableContinueButton();
        this.enableOrDisableBtnContinue();
        //this.verifyPan();
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("defaultAccIdVirtualCard");
        this.view.lblAccountValue.text = data.fromAccount;
        var configurationManager = applicationManager.getConfigurationManager();
        let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
        if (Object.keys(clientProperties).length > 0) {
            configurationManager.setVirtualPrepaidCardFee(clientProperties["VIRTUAL_PREPAID_CARD_FEE"]);
        }//getVirtualPrepaidCardFee
        this.setTitleBarVisibility();
    },

    setTitleBarVisibility: function() {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
                //this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
            }
        },

        postShow: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
                this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            }
            this.view.btnContinue.onClick = this.btnContinueOnClick;
            //this.view.txtBoxAmountValue.skin = "ICSknTxtE3E3E31px34px";
            //this.view.txtBoxPanValue.skin = "ICSknTxtE3E3E31px34px";
            this.view.txtBoxAmountValue.onTextChange = this.validateAmountRange;
            this.view.txtBoxPanValue.onTextChange = this.verifyPan;
            this.view.flxCardType.onClick = this.flxCardTypeOnClick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

      verifyPan : function () {
            var pan = this.view.txtBoxPanValue.text;
            if (!kony.sdk.isNullOrUndefined(pan)) {
                if (pan.length === 9) {
                    this.enableOrDisableBtnContinue();
                } else {
                    this.checkForToastMessageError();
                    this.disableContinueButton();
                }
            }
        },

        checkForToastMessageError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.PanError"));
            //applicationManager.getDataProcessorUtility().showToastMessageError(this, "Please enter a valid 9-digit PAN Number.");
        },

        checkForToastMessageAmountError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.AmountSub"));
        },

         checkForToastMessageBalanceError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.transfer.amountGreaterThanAvailBal"));//  i18n.common.errorInsufficientFunds
        },
         getAvailableBalanceByAccountId : function (accountId) {
            var accountObj = applicationManager.getAccountManager();
            var accountsData = accountObj.getSavingsAndCheckingsAccounts();
            for (var i = 0; i < accountsData.length; i++) {
                var account = accountsData[i];
                if (account.Account_id === accountId || account.accountID === accountId) {
                    return account.availableBalance;
                }
            }
            return "Account not found";
        },
        validateAmountRangeDummy : function () {
             var navManager = applicationManager.getNavigationManager();
             var data = navManager.getCustomInfo("defaultAccIdVirtualCard");
             var accId = data.accId;
             var balance = this.getAvailableBalanceByAccountId(accId);
            
            var amountStr = this.view.txtBoxAmountValue.text;
            var amount = parseInt(amountStr);
            if (amount < 50.00 || amount > 500.00) {
                this.checkForToastMessageAmountError();
                this.disableContinueButton();
            }else{
                this.enableOrDisableBtnContinue();
            }            
        },
        
        validateAmountRange: function () {
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("defaultAccIdVirtualCard");
            var accId = data.accId;
            var availableBalanceText = this.getAvailableBalanceByAccountId(accId);

            var amountText = this.view.txtBoxAmountValue.text;
            var amount = parseFloat(amountText);
            var availableBalance = parseFloat(availableBalanceText);

            if (amount < 50.00 || amount > 500.00) {
                this.checkForToastMessageAmountError();
                this.disableContinueButton();
            }else if (amount > availableBalance) {
                this.checkForToastMessageBalanceError();
                this.disableContinueButton();
            }else{
                this.enableOrDisableBtnContinue();
            }
        },

    btnContinueOnClick : function () {
        var config = applicationManager.getConfigurationManager();
        var cardFee = parseInt(config.getVirtualPrepaidCardFee());
        var panNo = this.view.txtBoxPanValue.text;
        var frmAccount = this.view.lblAccountValue.text;
        var amountinUSD =  this.view.txtBoxAmountValue.text;
        var amount =  parseInt(this.view.txtBoxAmountValue.text);
        var totalDebitAmountInNpr = amount + cardFee;
        var formattedTopupAmount = "USD " + CommonUtilities.formatCurrencyWithCommas(amount, true);
        var cardFeeFormatted = "USD " + CommonUtilities.formatCurrencyWithCommas(cardFee, true); 
        var debitAmount = 0.0072 * parseInt(amount);
        var debitAmountFormatted = "NPR " + CommonUtilities.formatCurrencyWithCommas(debitAmount, true);
        var virtualCardType = this.view.lblCardTypeValue.text;
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("defaultAccIdVirtualCard");
        var accId = data.accId;
        var data = {
              "fromAccount" : frmAccount,
              "accId": accId,
              "panNo" : panNo,
              "cardFee" : cardFeeFormatted,
              "topUpAmount" : formattedTopupAmount,
              "totalDebitAmount" : debitAmountFormatted,
              "virtualAmount": amountinUSD,
              "virtualCardType": virtualCardType 
        };
        navManager.setCustomInfo("virtualPrepaidCardDetails", data);
        var params =
        {
            "fromAccountCurrency": "USD",
            "transactionCurrency": "NPR",
            "transactionAmount": totalDebitAmountInNpr
        }
        navManager.setCustomInfo("currencyConversionData", params);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.getCurrencyExchangeRate(params);
        //getCurrecyExchangeRate
        /*
        if (panNo == "" || amount == "") {
            this.view.txtBoxAmountValue.skin = "sknLbl115000000";
            this.view.txtBoxPanValue.skin = "sknLbl115000000";
        } else {
            this.view.txtBoxAmountValue.skin = "ICSknTxtE3E3E31px34px";
            this.view.txtBoxPanValue.skin = "ICSknTxtE3E3E31px34px";
            navManager.navigateTo("frmCardsReviewDetailsScreen");
        }
        */
    },
     
      enableOrDisableBtnContinue : function () {
            var virtualPan = this.view.txtBoxPanValue.text;
            var virtualAmount = this.view.txtBoxAmountValue.text;
            var amount = parseFloat(virtualAmount);
            var virtualCardType = this.view.lblCardTypeValue.text;
            if (
                (!kony.sdk.isNullOrUndefined(virtualPan)) &&
                (virtualPan.length === 9) &&
                (virtualAmount !== null && virtualAmount !== "" && virtualAmount !== undefined) &&
                !isNaN(amount) &&
                (amount >= 50 && amount <= 500) &&
                (virtualCardType !== kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectCard"))
            ) {
                this.enableContinueButton();
                }else{
                    this.disableContinueButton();
                }
                /*
            let panNo = this.view.tbxPANNo.text;
			let topupAmount = this.view.tbxAmount.text
			if (panNo.length == 9 && !(this.isEmptyNullOrUndefined(panNo)) && !(this.isEmptyNullOrUndefined(topupAmount)) && !(this.isEmptyNullOrUndefined(this.selectedVDCardType)))
				FormControllerUtility.enableButton(this.view.btnContinue3);
			else{
				//display valid error message "Please enter a valid 9-digit PAN Number."				
				FormControllerUtility.disableButton(this.view.btnContinue3);
			}
            */
        },
        
       enableContinueButton: function () {
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn055BAF26px";
        },
        disableContinueButton: function () {
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        },

        flxBackOnClick : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCard" });
        },        
      
        flxCancelOnClick : function () {
            var navManager = applicationManager.getNavigationManager(); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
        },

        flxCardTypeOnClick : function () {
        var panNo = this.view.txtBoxPanValue.text;
        var amount = this.view.txtBoxAmountValue.text;
        var virtualCardType = this.view.lblCardTypeValue.text;
        var navManager = applicationManager.getNavigationManager(); 
        var data = {
              "panNo" : panNo,
              "virtualAmount": amount,
              "virtualCardType" :virtualCardType
        };
        navManager.setCustomInfo("cardDetailsVirtualType", data);
        navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmVirtualCardTypes"});
        },

         setCardTypeData : function () {
            var navManager = applicationManager.getNavigationManager();
            var status = navManager.getCustomInfo("selectedVirtualCardType");//flowTyeVirtual
            var flowType = navManager.getCustomInfo("flowTyeVirtual");
            var previousForm = kony.application.getPreviousForm();
            if (previousForm.id === "frmReqVirtualDollerCard") {
                this.view.lblCardTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectCard");
            } else if ((status !== null) && (status !== "") && (status !== undefined)) {
                if (previousForm.id === "frmReqVirtualDollerCard") {
                this.view.lblCardTypeValue.text = status;
            }
            }
        },
        
        checkForToastMessageCommonError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
        },
    }
});