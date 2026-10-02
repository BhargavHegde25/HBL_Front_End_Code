define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        flow: "frmCreditCardBillPaymentReview",
        firstHit: false,
        isAmountModified:false,
        isSendOnDateModified:false,
        isFromAccModified:false,
        isSendOnDateExceed:false,
        notes:"",
        accBalance:"",
        error:{},
        preShow: function () {
            var scope = this;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            var previousForm = kony.application.getPreviousForm().id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
            this.getNavMan().setCustomInfo("flowFromReview", scope.flow);
            this.setTitleBarVisibility();
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.flxBackOnClick,
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: kony.i18n.getLocalizedString("i18n.konybb.common.cancel")
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
            }
            this.setCardPaymentReviewData();
            this.view.customHeader.btnRight.onClick = this.onClickCancel;
            this.view.btnTransfer.onClick = this.createCreditCardPayment;
            this.view.customHeader.btnLeft = this.onClickCancel;
            this.view.btnCancel.onClick = this.onClickCancel;
            // this.view.btnPrimary.onClick = ()=>{
            //     var navManager = applicationManager.getNavigationManager(); 
            //     navManager.navigateTo({
            //         "appName": "TransfersMA",
            //         "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardPaymentAcknowledgement"
            //     });
            // }
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.flxFromArrow.onClick = this.modifyFromAccount;//select from account 
            // this.view.flxPaymentType.onClick = this.modifyPaymentType;//payment type
            this.view.flxAmountContainer.onClick = this.modifyAmount;//amount
            this.view.flxSendOnDate.onClick = this.modifySendOnDate;//send on date

            // var sendOnDate = this.view.lblSelectedSendOnDateValue.text.replace(/\//g, "-");
            // let cardExpDate = this.getSelectedCreditCardDetails().formattedExpiryDate.replace(/\//g, "-");
            // let replaceFSlash = sendOnDate.replace(/\//g, "-");
            // if (new Date(sendOnDate).getTime() > new Date(cardExpDate).getTime()) {
            //     this.isSendOnDateExceed = true;
            //     this.error = {
            //         "errorMessage": kony.i18n.getLocalizedString("i18n.transfers.sendOnDateExceed"),
            //     };
            //     this.showPopup(this.error);
            // }else scope.isSendOnDateExceed = false;
            // this.view.txtDescription.onTextChange = function () {
            //     scope.view.txtDescription.text !== "" && !scope.isSendOnDateExceed? scope.enableButton("btnTransfer") : (scope.disableButton("btnTransfer"), scope.showPopup(scope.error));
            // }.bind(this);
            scope.enableButton("btnTransfer");
            var isAmtExceedAccBanalce = false;
            var amtExceedErr = {
                "errorMessage": kony.i18n.getLocalizedString("i18n.transfers.amountExceed"),
            }
            /* //continue buttin enable disable with balance and entered amount validation
            if (!kony.sdk.isNullOrUndefined(this.view.lblBalanceLabel.text)) {
                let accBalanceFormated = this.view.lblBalanceLabel.text;
                let withoutCCY = accBalanceFormated.split(" ");
                var accBalance = withoutCCY[1].replace(/,/g, "");
                if (!kony.sdk.isNullOrUndefined(this.view.lblTransferAmntValue.text)) {
                    var enteredAmount = this.view.lblTransferAmntValue.text;
                    var enteredAmountWithoutComma = enteredAmount.replace(/,/g, "");
                    if (parseFloat(accBalance) < parseFloat(enteredAmountWithoutComma)) {
                        isAmtExceedAccBanalce = true;
                        scope.disableButton("btnTransfer");
                        scope.showPopup(amtExceedErr)
                    }
                }

            }*/
            // this.error = {
            //     "errorMessage": kony.i18n.getLocalizedString("i18n.transfers.sendOnDateExceed"),
            // };
            this.view.txtDescription.onTextChange = function () {
                if (isAmtExceedAccBanalce === true) {
                    scope.disableButton("btnTransfer");
                    scope.showPopup(amtExceedErr);
                } else if (scope.view.txtDescription.text !== "" && isAmtExceedAccBanalce === false) {
                    scope.enableButton("btnTransfer");
                } else {
                    scope.disableButton("btnTransfer");
                }
                // scope.view.txtDescription.text !== "" && isAmtExceedAccBanalce === false? scope.enableButton("btnTransfer") : (scope.disableButton("btnTransfer"), scope.showPopup(scope.error));
            }.bind(this);            
            // scope.view.txtDescription.text !== "" && isAmtExceedAccBanalce === false? scope.enableButton("btnTransfer") : scope.disableButton("btnTransfer");
            scope_ManageActivitiesPresentationController.fromAccSelectionFlow = currentForm;
        },

        modifyFromAccount: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            // this.isFromAccModified = true;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getFromAccountsCardPayment();
        },

        modifyPaymentType: function () {
            // applicationManager.getPresentationUtility().showLoadingScreen();
            this.getNavMan().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment"
            });
        },


        modifyAmount: function () {
            // applicationManager.getPresentationUtility().showLoadingScreen();
            this.getNavMan().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment"
            });
        },

        modifySendOnDate: function () {
            // applicationManager.getPresentationUtility().showLoadingScreen();
            this.getNavMan().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmSelectSendOnDate"
            });
        },

        getNavMan: function () {
            var navManager = applicationManager.getNavigationManager();
            return navManager;
        },

        setModifiedFromAcc: function () {
            let defaultTraAccDetails = this.getNavMan().getCustomInfo("defaultAcc").Accounts[0];
            let fotmattedDefAccName, formattedAccBalance;
            let formatUtility = applicationManager.getFormatUtilManager();
            let previousForm = kony.application.getPreviousForm().id;
            let selectedTransactionObject = applicationManager.getTransactionManager().getTransactionObject();
            if (previousForm == "frmCreditCardPaymentFromAcc") {
                fotmattedDefAccName = selectedTransactionObject.fromProcessedName;
                formattedAccBalance = selectedTransactionObject.fromProcessedAvailableBalance;
            } else if (previousForm == "frmCardManageHome") {
                fotmattedDefAccName = applicationManager.getPresentationUtility().formatText(defaultTraAccDetails.AccountName, 15, defaultTraAccDetails.Account_id, 4);
                formattedAccBalance = formatUtility.formatAmountandAppendCurrencySymbol(defaultTraAccDetails.availableBalance, defaultTraAccDetails.currencyCode);
            }
            this.view.lblAccHolderName.text = fotmattedDefAccName; // from acc number
            this.view.lblBalanceLabel.text = formattedAccBalance;// from acc balance
        },

        getSelectedCreditCardDetails: function () {
            let selectedCreditCardDetails = this.getNavMan().getCustomInfo("selectedCreditCardDetails");
            return selectedCreditCardDetails;
        },

        setCardPaymentReviewData: function () {
            try {
                var scope = this;
                var data = this.getNavMan().getCustomInfo("cardPaymentReviewData");
                let selectedTransactionObject = applicationManager.getTransactionManager().getTransactionObject();
                let previousForm = kony.application.getPreviousForm().id;
                let fotmattedDefAccName, formattedAccBalance = "";
                this.view.txtDescription.maxTextLength = 140;
                this.view.txtDescription.restrictCharactersSet = "~`!@#$%^&*()_+-=][}{:;\"\\'|\><,.?/";
                this.view.txtDescription.placeholder = kony.i18n.getLocalizedString("i18n.fundsTransfer.notesMandatory");
                this.view.txtDescription.text = "";
                this.isFromAccModified = this.getNavMan().getCustomInfo("isFromAccModified");//changing this value in fromAcc screen
                if (!kony.sdk.isNullOrUndefined(this.isFromAccModified) && this.isFromAccModified) {
                    fotmattedDefAccName = selectedTransactionObject.fromProcessedName; // from acc number
                    formattedAccBalance = selectedTransactionObject.fromProcessedAvailableBalance;// from acc balance
                } else {
                    fotmattedDefAccName = data.formattedFromAccountName;// from acc number
                    formattedAccBalance = data.formattedAvailableBalance;//from acc balance
                }
                
                //this.view.lblAccHolderName.text =data.formattedFromAccountName;// != null? data.formattedFromAccountName.split(".")[0]:"";
                
                //set form data Old
                this.view.lblAccHolderName.text = fotmattedDefAccName; // from acc number
                this.view.lblFromAccountNumber.text = data.fromAccountNumber;

                this.view.lblToAccountName.text = data.customerCardName;
                this.view.lblToAccountNumber.text = data.maskedCardNumber;
                 this.view.lblBalanceLabel.text = formattedAccBalance;//acc balance not using
                 this.view.lblToAccType.text = data.maskedCardNumber;//card number

                this.view.lblCurrency.text = data.paymentCurr;
                this.view.lblTransferAmntValue.text = data.paymentCurr + " " + data.formattedAmount.split(".")[0];
                this.view.lblDecimal.text = "." + data.formattedAmount.split(".")[1];
               
                
                this.view.lblPaymentCurrValue.text = data.paymentCurr;//tranfer ccy
                this.view.lblPaymentTypeValue.text = data.paymentType;//payment typr

                var currentBD = data.formattedSendOnDate;
                var tt = currentBD.split("/");
                var dueDateMDY = tt[1] + "/" + scope_configManager.getCardPaymentDueDate() + "/" + tt[2];//formatting to m/d/Y
                var dueDateObj = new Date(dueDateMDY);
                if (parseInt(tt[0]) > parseInt(scope_configManager.getCardPaymentDueDate())) {
                    dueDateObj.setMonth(dueDateObj.getMonth() + 1);                
                } 
                this.view.lblDueDateValue.text = applicationManager.getFormatUtilManager().getFormatedDateString(new Date(dueDateObj), "d/m/Y");
                //this.view.lblTransferAmntValue.text = data.formattedAmount;//amount
                this.view.lblFrequencyValue.text = data.frequency;//frequency
                this.view.lblSelectedSendOnDateValue.text = "";
                this.isSendOnDateModified = this.getNavMan().getCustomInfo("isSendOnDateModified");//changing this value in sendOnDate screen
                
                var selectedDate = !kony.sdk.isNullOrUndefined(selectedTransactionObject) && selectedTransactionObject.hasOwnProperty("scheduledDate") && !kony.sdk.isNullOrUndefined(selectedTransactionObject.scheduledDate)?selectedTransactionObject.scheduledDate:applicationManager.getFormatUtilManager().getFormatedDateString(new Date(), "m/d/Y");
                var dateObj="";
                var flg = new Date(selectedDate);
                if(isNaN(flg.getTime())){
                    var [day, month, year] = selectedDate.split('/');
                 dateObj = new Date(+year, +month - 1, +day);
                }else dateObj = selectedDate;                
                var selDate = (!kony.sdk.isNullOrUndefined(this.isSendOnDateModified)) && this.isSendOnDateModified ?
                    (kony.sdk.isNullOrUndefined(dateObj) ? data.formattedSendOnDate : applicationManager.getFormatUtilManager().getFormatedDateString(new Date(dateObj), "d/m/Y")) : data.formattedSendOnDate;//send on date
                this.view.lblSelectedSendOnDateValue.text = selDate;
                this.view.lblNotesValue.text = data.notes;
                var reviewData = {
                    "formattedFromAccountName": fotmattedDefAccName,
                    "formattedAvailableBalance": formattedAccBalance,
                    "accountType": "",
                    "toCardNumber": data.toCardNumber,
                    "paymentType": data.paymentType,
                    "formattedAmount": data.formattedAmount,
                    "paymentCurr": data.paymentCurr,
                    "frequency": data.frequency,
                    "dueDate": data.dueDate,
                    "cardHolderName":data.customerCardName,
                    "formattedSendOnDate": this.view.lblSelectedSendOnDateValue.text,
                    "notes": data.notes,
                    "maskedCardNumber":data.maskedCardNumber,
                };
                this.getNavMan().setCustomInfo("reviewDataFrmCreditCardBillPaymentReview", reviewData);
                data.fromAccountNumber = !kony.sdk.isNullOrUndefined(this.isFromAccModified) && this.isFromAccModified===true?selectedTransactionObject.fromAccountNumber:data.fromAccountNumber;
                this.getNavMan().setCustomInfo("cardPaymentReviewData", data);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setCardPaymentReviewData method.",
                    "errorLevel": "",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        onClickCancel: function () {
            var navManager = applicationManager.getNavigationManager();
            // navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            // navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome" });
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
            manageCardsModule.presentationController.showCardsHome();

        },
        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment" });
            // navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome" });
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview"
            });
        },

        createCreditCardPayment: function (response) {
            try {
                var scope = this;
                var data = this.getNavMan().getCustomInfo("cardPaymentReviewData");
                this.getNavMan().setCustomInfo("isSendOnDateModified", false);
                this.isFromAccModified = this.getNavMan().getCustomInfo("isFromAccModified");
                this.getNavMan().setCustomInfo("isFromAccModified", false);
                var selectedTransactionObject = applicationManager.getTransactionManager().getTransactionObject();
                var param = {
                    "ExternalAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),//parking account
                    "amount": data.formattedAmount,
                    "beneficiaryAddressLine1": "",
                    "beneficiaryAddressLine2": "",
                    "beneficiaryCity": "",
                    "beneficiarycountry": "",
                    "beneficiaryEmail": "",
                    "beneficiaryName": data.customerCardName,//card customer name
                    "beneficiaryNickname": "",
                    "beneficiaryPhone": "",
                    "beneficiaryState": "",
                    "beneficiaryZipcode": "",
                    "createWithPaymentId": "true",
                    "deletedDocuments": "",
                    "frequencyEndDate": this.UTCDateFormat(applicationManager.getFormatUtilManager().getFormatedDateString(new Date(), "d/m/Y")),
                    "frequencyStartDate": this.UTCDateFormat(applicationManager.getFormatUtilManager().getFormatedDateString(new Date(), "d/m/Y")),
                    "frequencyType": "Once",
                    "fromAccountCurrency": "NPR",
                    "fromAccountNumber": data.fromAccountNumber,
                    "iban": "",
                    "isScheduled": "0",
                    "numberOfRecurrences": "",
                    "paidBy": "",
                    "paymentType": "",
                    "scheduledDate": this.UTCDateFormat(applicationManager.getFormatUtilManager().getFormatedDateString(new Date(data.unFormattedSendOnDate), "d/m/Y")),
                    "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
                    "swiftCode": "",
                    "toAccountCurrency": data.paymentCurr,
                    "toAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
                    "transactionCurrency": data.paymentCurr,
                    "transactionId": "",
                    "transactionType": "ExternalTransfer",
                    "transactionsNotes": data.notes,
                    "uploadedattachments": "",
                    "userId": "",
                    "cardNumber": data.toCardNumber,
                    "validate": "true",
                    "cardAccNumber":scope.getSelectedCreditCardDetails().mxpAccNum,//for email trigger
                    "fromNickName":scope.getSelectedCreditCardDetails().chName//for email trigger
                }
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });

                if (!(kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.referenceId)) && response.status === "success") {
                    delete param.validate;
                    param.transactionId = response.referenceId;
                    param.paymentType = "cardPayment";//for email trigger
                    //New CR Changes
                    param.beneficiaryAddressLine1 = param.transactionsNotes;
                    param.beneficiaryAddressLine2 = param.cardNumber;
                    param.beneficiaryCity = "card payment";
                    param.beneficiaryPhone = param.cardAccNumber;
                    ManageActivitiesPresenter.creditCardBillPayment(param);//updated param second hit
                    
                } else {
                    ManageActivitiesPresenter.creditCardBillPayment(param);//first hit
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in createCreditCardPayment method.",
                    "errorLevel": "",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("konymb.card.cardpayment");
                this.view.customHeader.imgBack.src = "backbutton.png";
                this.view.customHeader.imgBack.isVisible = true;
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.title = kony.i18n.getLocalizedString("konymb.card.cardpayment");
            }
        },

        UTCDateFormat: function (input) {
            var [day, month, year] = input.split('/');
            // Create a JavaScript Date object (month is 0-based)
            var date = new Date(Date.UTC(year, month - 1, day));
            // Convert to ISO 8601 format
            var isoString = date.toISOString();
            return isoString;
        },

        showPopup: function (response) {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, response.errorMessage);
        },

        /**
     * enableButton
     * To set skin and enable specific button.
     * @return : NA
     */
        enableButton: function (btnName) {
            try {
                var scope = this;
                scope.view[btnName].setEnabled(true);
                scope.view[btnName].skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in enableButton method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         *  disableButton
         * To set skin and disable specific button.
         * @return : NA
         */
        disableButton: function (btnName) {
            try {
                var scope = this;
                scope.view[btnName].setEnabled(false);
                scope.view[btnName].skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in disableButton method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

    };
});
