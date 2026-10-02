define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {

    return {
        convertedPerRate: "",
        convertedAmountInNpr: "",
        selectedAccBalance:"",
        preShow: function () {
            try {
                if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                    this.view.flxBody.top = "10dp";
                } else {
                    this.view.flxBody.top = "60dp";
                }
                this.view.txtBoxAmountValue.onTextChange = this.validateAmount;
                // this.view.txtBoxAmountValue.onTextChange = this.setDebitAmount;
                this.view.txtArea.onTextChange = this.validateAmount;
                this.view.customHeader.flxBack.onClick = this.goBack;
                this.view.customHeader.btnRight.onClick = this.onCancelClick;
                this.view.btnTransfer.onClick = this.navigateToDomesticPrepaidTopUpReview;
                this.view.flxSelectedFromAccount.onClick = this.selectFromAccNew;
                this.view.btnTransfer.setEnabled(false);
                this.view.btnTransfer.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                this.setData();
                 applicationManager.getPresentationUtility().dismissLoadingScreen();
            } catch (err) {
                kony.print("preShow" + err);
            }

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
                var accBalance = !kony.sdk.util.isNullOrUndefinedOrEmptyObject(formattedAccountBalance)?Number(formattedAccountBalance.split(" ")[1].replace(/,/g,"")):"0.00";
                if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(amountValue)) {
                    // scope.isEnteredAmntIsLessThanAccBalance = Number(amountValue)>=Number(accBalance) ? true:false;
                    if(Number(amountValue)<=Number(accBalance)){
                         if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(notesValue)) {
                        this.enableBtnAndErrorMessage("");

                    }else{
                        this.disableBtnAndErrorMessage(kony.i18n.getLocalizedString("i18n.HBL.NotesMandatory"));
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
        // validateAmount: function () {
        //     try {
        //         var onlyNumericRegex = /^\d+$/;
        //         if (!this.view.txtBoxAmountValue.text.match(onlyNumericRegex)) {
        //             this.view.txtBoxAmountValue.text = "";
        //         }
        //         var amountValue = this.view.txtBoxAmountValue.text;
        //         var notesValue = this.view.txtArea.text;
        //         if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(amountValue)) {
        //             if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(notesValue)) {
        //                 this.view.lblLimitNumber.isVisible = false;
        //                 this.view.lblLimitNumber.text = "";
        //                 this.view.btnTransfer.setEnabled(true);
        //                 this.view.btnTransfer.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
        //                 this.view.btnTransfer.focusSkin = "sknHBLBtn851a1cRounded8pxffffff100pr";

        //             }else {
        //             this.view.lblLimitNumber.isVisible = true;
        //             this.view.lblLimitNumber.text = "Please check and enter amount or notes";
        //             this.view.btnTransfer.setEnabled(false);
        //             this.view.btnTransfer.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        //             this.view.btnTransfer.focusSkin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        //         }
        //         } else {
        //             this.view.lblLimitNumber.isVisible = true;
        //             this.view.lblLimitNumber.text = "Please check and enter amount or notes";
        //             this.view.btnTransfer.setEnabled(false);
        //             this.view.btnTransfer.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        //             this.view.btnTransfer.focusSkin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        //         }
        //     } catch (err) {
        //         kony.print("validateAmount" + err);
        //     }
        // },


        navigateToDomesticPrepaidTopUpReview: function (data) {
            try {
                applicationManager.getPresentationUtility().showLoadingScreen();
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


                var topUpPrepaidDomesticCardData = {
                    "amount": this.view.txtBoxAmountValue.text,
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
                    "topupCurrency": "NPR",
                    "accountNumber": this.view.lblAccountNumberValue.text,
                    "debtorName": this.view.lblAccountNameValue.text,
                    "convertedAmount": "",
                    "referenceId": "",
                    "transactionId": "",
                    //for email trigger
                    "cardProduct": selectedCardData.cardType,
                    "cardType": selectedCardData.Card_Label,
                    "cardHolderName": selectedCardData.chName,
                    //data for review screen
                    "cardHolderName": this.view.lblCardHolderName.text,
                    "exchagevalue": "",
                    "flow": "Prepaid Intl",
                    "enterdAmountInUSD": "",
                    //validation flag
                    "transfer": "",
                }

                navManager.setCustomInfo("topUpPrepaidDomesticCardData", topUpPrepaidDomesticCardData);
                navManager.setCustomInfo("topUpCardAckData", { "flow": "Prepaid Intl" });
                navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "frmPrepaidTopupDomesticReviewScreen" }, false);
            } catch (err) {
                kony.print("navigateToDomesticPrepaidTopUpReview" + err);
            }
        },

        setData: function () {
            try {
                var scope = this;
                scope.resetUi();
                var formatUtil = applicationManager.getFormatUtilManager();
                var navManager = applicationManager.getNavigationManager();
                var prePopulateTopUpFromAccount = navManager.getCustomInfo("prePopulateTopUpFromAccount");
                var selectedCardData = navManager.getCustomInfo("cardsDetails");
                this.view.lblAccountNameValue.text = prePopulateTopUpFromAccount.accountName;
                // this.selectedAccBalance = prePopulateTopUpFromAccount.availableBalance;
                this.view.lblSelctCard.text = kony.i18n.getLocalizedString("i18n.fundsTransfer.notesMandatory");
                this.view.lblAmount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount") + " *";
                this.view.lblAccountbalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(prePopulateTopUpFromAccount.availableBalance, prePopulateTopUpFromAccount.currencyCode);
                this.view.lblAccountNumberValue.text = prePopulateTopUpFromAccount.Account_id;
                this.view.lblAccountTypeValue.text = prePopulateTopUpFromAccount.accountType;
                this.view.lblCardNumberValue.text = selectedCardData.pan;
                this.view.lblCardHolderName.text = selectedCardData.chName;
                this.view.lblCurrencyValue.text = "USD"//prePopulateTopUpFromAccount.currencyCode; // ccy value
                // this.view.lblCurrentInstru.text = ""; //exchange rate details info
                // this.view.lblAmountInstru.text = ""; //min and max amount info
                this.view.txtBoxAmountValue.text = "";
                this.view.txtBoxAmountValue.placeHolder = "0.00";
                this.view.lblLimitNumber.isVisible = false;//limit error info red
                // this.view.lblDebitAmount.text = "0.00"//this.debitAmountValue();//amount that debit from acc
                this.view.txtArea.text = "";
            } catch (err) {
                kony.print("setData" + err);
            }
        },

        resetUi: function () {
            try {
                this.view.lblAccountNameValue.text = "";
                this.view.lblAccountbalanceValue.text = "";
                this.view.lblAccountNumberValue.text = "";
                this.view.lblAccountTypeValue.text = "";
                this.view.txtBoxAmountValue.text = "";
                this.view.txtArea.text = "";
            } catch (err) {
                kony.print("resetUi" + err);
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
                kony.print("onCancelClick" + err);
            }
        },

        postShow: function () { },

        debitAmountValue: function () {
            try {
                var value = this.view.txtBoxAmountValue.text;
                if (!kony.sdk.isNullOrUndefined(value)) {
                    this.view.lblDebitAmount.text = 0.0072 * parseInt(value);
                } else {
                    this.view.lblDebitAmount.text = "-";
                }
            } catch (err) {
                kony.print("debitAmountValue" + err);
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
                kony.print("selectFromAccNew" + err);
            }
        },

        onRowSelection: function (row) {
            try {
                var formatUtil = applicationManager.getFormatUtilManager();
                this.resetUi();
                this.view.lblAccountNameValue.text = row[0].lblAccname.text;//accName
                this.view.lblAccountbalanceValue.text = row[0].lblBalance.text;//formatUtil.formatAmountandAppendCurrencySymbol(row[0].lblBalance.text, "NPR");
                // this.selectedAccBalance = row[0].lblBalance.text;
                this.view.lblAccountNumberValue.text = row[0].lblAccNumber; //accNumber
                this.view.lblAccountTypeValue.text = row[0].lblAccType.text; //accType

                this.view.flxPopupfrombottom.setVisibility(false);
            } catch (err) {
                kony.print("onRowSelection" + err);
            }
        },
        showPopup: function (response) {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, response);
        },

    };
});