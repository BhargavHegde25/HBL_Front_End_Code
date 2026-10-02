define(['CampaignUtility', 'CommonUtilities', 'DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils'],
    function (CampaignUtility, CommonUtilities, FormatUtils, DataValidationHandler, InvokeServiceUtils) {
        return {
            sPeriodUsed: false,
            isPeriodUsed: false,
            keypadString: '0.00',
            amountPayable: "",
            formatUtils: new FormatUtils(),
            selectedPaymentType: "Minimum Due",
            isPaymentTypeSelected2ndTime: false,
            isFromCardManageHomeFlow: true,
            isModifyCardPaymentFlow: false,
            intAccBalance:"",
            segFlag:"",
            dataforFrom:"",
                dataforTo:"",
                isKeypadEnabled:false,
                isAmtExceedAccBanalce:false,
                isMinimumAmountEntered:false,
                accBalance:"",
                amtExceedErrMsg:"",
                minimumAmountErrorMsg:"",
            preShow: function () {
                try {
                    var scope = this;
                    applicationManager.getPresentationUtility().dismissLoadingScreen();
                    var currentFormObject = kony.application.getCurrentForm();
                    var currentForm = currentFormObject.id;
                    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
                    scope.setTitleBarVisibility();
                    this.view.lblAmount.text = "0.00";
                    this.view.txtAmountValue.text = "";
                    this.view.txtDescription.text = "";
                    scope.intAccBalance="";
                    scope.setCardPaymentDetails();
                    scope.amountKeyboardDataSetting();
                    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                        var rightBarButtonItem = new kony.ui.BarButtonItem({
                            type: constants.BAR_BUTTON_TITLE,
                            style: constants.BAR_ITEM_STYLE_PLAIN,
                            enabled: true,
                            action: scope.flxBackOnClick,
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
                    this.keypadString = '0.00';
                    this.view.customHeader.btnRight.onClick = this.onClickCancel;
                    this.view.btnContinue.onClick = this.navigateToCreditCardPaymentReview;
                    this.view.btnContinue.setEnabled(false);
                    this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                    this.view.flxChooseAccount.onClick = this.selectFromAccNew;
                    this.view.customHeader.flxBack.onClick = this.onClickCancel;
                    this.view.segCardPaymentDue.onRowClick = this.segOnRowClick;
                    // this.view.flxSendOnDate.onClick = this.navToSelectDate;
                    scope.view.flxAmountKeypad.setVisibility(false);
                     this.view.btnCloseKeypad.onClick = function(){
                        scope.view.flxAmountKeypad.setVisibility(false);
                        scope.isKeypadEnabled = scope.view.flxAmountKeypad.isVisible;
                     };
                    this.view.flxAmountWrapper.onClick = function(){
                        scope.view.flxAmountKeypad.setVisibility(true);
                        scope.isKeypadEnabled = scope.view.flxAmountKeypad.isVisible;
                    };
                    scope_ManageActivitiesPresentationController.fromAccSelectionFlow = currentForm;
                    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
                    manageCardsModule.presentationController.getBankDateMB();
                    var frmData = {
                        "isMainScreen": false
                    };
                    this.getNavMan().setCustomInfo("frmCardManageHome", frmData);
                    var transactionManager = applicationManager.getTransactionManager();
                    // scope.view.flxBankAcc.onClick = function () {
                    //     navMan.setEntryPoint("frmQRFromAccount", "frmQRActivation");
                    //     navMan.setCustomInfo("QRNavigationData", "frmQRfromAcc")
                    //     //qrPresentationController.getFromAccounts();
                    //     applicationManager.getPresentationUtility().showLoadingScreen();
                    //     var fromAccount = navMan.getCustomInfo("frmQRFromAccount");
                    //     var accounts = qrPresentationController.processAccountsData(fromAccount.fromaccounts);
                    //     var PopupObj = {
                    //         "accounts": accounts,//should br Array of object[{},{},{}...]
                    //         "flowType": "QR",
                    //         "rowClickCallback": scope.onRowSelection.bind(this)
                    //     };
                    //     applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope, PopupObj);
                    // };

                    var isAmtExceedAccBanalce = false;
                    this.amtExceedErrMsg = kony.i18n.getLocalizedString("i18n.transfers.amountExceed");
                    
                     this.minimumAmountErrorMsg = "Transaction amount minumum 1.00 NPR";
                    this.mandatoryNoteErrMsg =   "Enter Mandatory notes";
                    if (!kony.sdk.isNullOrUndefined(this.view.lblFromAccalance.text)) {
                        let accBalanceFormated = this.view.lblFromAccalance.text;
                        let withoutCCY = accBalanceFormated.split(" ");
                        scope.accBalance = withoutCCY[1].replace(/,/g, "");
                        // if (!kony.sdk.isNullOrUndefined(this.view.lblAmount.text)) {
                        //     var enteredAmount = this.view.lblAmount.text;
                        //     var enteredAmountWithoutComma = enteredAmount.replace(/,/g, "");
                        //     if (parseFloat(accBalance) < parseFloat(enteredAmountWithoutComma)) {
                        //         scope.isAmtExceedAccBanalce = true;
                        //         scope.disableButton("btnContinue");
                        //         scope.showPopup(this.amtExceedErrMsg)
                        //     }
                        // }

                    }

                    this.view.txtDescription.onTextChange = function () {
                        if (scope.isAmtExceedAccBanalce === true && scope.isMinimumAmountEntered === true) {
                            scope.disableButton("btnContinue");
                            scope.showPopup(scope.amtExceedErrMsg);
                        } else if (scope.isAmtExceedAccBanalce === false && scope.isMinimumAmountEntered === false) {
                            scope.disableButton("btnContinue");
                            scope.showPopup(scope.minimumAmountErrorMsg);
                        }else if (scope.isMinimumAmountEntered === false) {
                            scope.disableButton("btnContinue");
                            scope.showPopup(scope.minimumAmountErrorMsg);
                            scope.view.txtDescription.text = "";
                        } else if (scope.view.txtDescription.text !== "" && scope.isAmtExceedAccBanalce === false && scope.isMinimumAmountEntered === true) {
                            scope.enableButton("btnContinue");
                        } else {
                            scope.showPopup(scope.mandatoryNoteErrMsg);
                            scope.disableButton("btnContinue");
                        }

                        // scope.view.txtDescription.text !== "" && scope.isAmtExceedAccBanalce === false? scope.enableButton("btnContinue") : (scope.disableButton("btnContinue"), scope.showPopup(scope.error));
                    }.bind(this);

                    this.view.flxTopDummy.onTouchStart = function () {
                        scope.view.flxAmountKeypad.setVisibility(false);
                    }.bind(this);
                    this.view.txtAmountValue.onTextChange = this.onAmountTextChange.bind(this);
                    scope.view.txtDescription.text !== "" && scope.isAmtExceedAccBanalce === false ? scope.enableButton("btnContinue") : scope.disableButton("btnContinue");
                } catch (err) {
                    var errObj = {
                        "errorInfo": "Error in preShow.",
                        "errorLevel": "",
                        "error": err
                    };
                    this.onError(errObj);
                }
            },

            onAmountTextChange :function(){
                this.setAmountKeypadChar(this.view.txtAmountValue.text.replace(/,/g, ""))
            },

            onAmountEndEditing: function(){
                try{
                var scope = this;
                var amountData = this.view.txtAmountValue.text.replace(/,/g, "");
                var regex = /^\d+(\.\d{1,2})?$/;
                var beforeDecimal = amountData.split('.')[0];
                var afterDecimal = amountData.split('.')[1];
                if(regex.test(amountData)){
                    this.keypadString = amountData;
                }else{
                    if(amountData[amountData.length - 1] === "."){
                        this.keypadString = beforeDecimal;
                    }else if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(afterDecimal) && afterDecimal.length > 2){
                        this.keypadString = amountData.slice(0, -1);//amountData.substr(0, amountData.length - 1);
                    }else if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(afterDecimal) && afterDecimal === ''){
                        this.keypadString = beforeDecimal;
                    }else if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(afterDecimal) || !kony.sdk.util.isNullOrUndefinedOrEmptyObject(amountData)){
                        this.keypadString = "0.00";
                    }
                }
                this.updateAmountValue();
                }catch(err){
        kony.print("onAmountEndEditing"+ err);
      }
            },


            selectFromAccNew: function () {
                try{
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
                }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("selectFromAccNew"+ err);
      }
            },

            segOnRowClick: function () {
                try{
                var scope = this;
                let rowindex = scope.view.segCardPaymentDue.selectedRowIndex[1];
                let segData = scope.view.segCardPaymentDue.data;

                var activeRadio = "radiobuttonactive.png";
                var inActiveRadio = "radiobtninactive.png";
                //changing all rows "isSelected" and "imgSelectPayment"
                for (var i in segData) {
                    segData[i]["imgSelectPayment"] = inActiveRadio;
                    segData[i]["isSelected"] = false;
                }
                //changing isSelected "true" to selected row
                segData[rowindex]["isSelected"] = true;
                //assigning active image to selected row
                segData[rowindex]["imgSelectPayment"] = activeRadio;

                //assigning inactive image to unselected row
                for (var i in segData) {
                    if (!segData[i]["isSelected"]) {
                        segData[i]["imgSelectPayment"] = inActiveRadio;
                    }
                }
                //assigning updated seg data
                scope.view.segCardPaymentDue.setData(segData);
                scope.selectedPaymentType = scope.view.segCardPaymentDue.data[rowindex].lblCardPaymentDue;
                scope.isPaymentTypeSelected2ndTime = scope.view.segCardPaymentDue.data[rowindex].isSelected;
                // scope.setAmountNdSetKeyboard();
                // scope.enableKeyboard();
                }catch(err){
        kony.print("segOnRowClick"+ err);
      }
            },

            getSelectedCreditCardDetails: function () {
                var selectedCreditCardDetails = this.getNavMan().getCustomInfo("selectedCreditCardDetails");
                return selectedCreditCardDetails;
            },

            setCardPaymentDetails: function () {
                try {
                    var scope = this;
                    let defaultTraAccDetails = this.getNavMan().getCustomInfo("defaultAcc").Accounts[0];
                    let fotmattedDefAccNum, formattedAccBalance, cardPayAccDetails, accountID, accountType = "";
                    let formatUtility = applicationManager.getFormatUtilManager();
                    let previousForm = kony.application.getPreviousForm().id;
                    let selectedTransactionObject = applicationManager.getTransactionManager().getTransactionObject();
                    var frmaccdata = this.getNavMan().getCustomInfo("frmCreditCardPaymentFromAcc");
                    let reviewData = this.getNavMan().getCustomInfo("reviewDataFrmCreditCardBillPaymentReview");
                    //set card account type
                    
                    //card payment acc
                    let userObj = applicationManager.getUserPreferencesManager().getUserObj();
                    let cardPaymentAccNo = userObj['default_account_cardpayment']
                    if (!kony.sdk.isNullOrUndefined(cardPaymentAccNo)) {
                        for (i = 0; i < scope_configManager.userAccounts['length']; i++) {
                            if (cardPaymentAccNo == scope_configManager.userAccounts[i].account_id) {
                                cardPayAccDetails = scope_configManager.userAccounts[i];
                                break;
                            }
                        }
                    }
                    //end
                    if (previousForm == "frmCreditCardPaymentFromAcc") {
                        if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(frmaccdata)) {
                            fotmattedDefAccNum = frmaccdata.processedName;
                            formattedAccBalance = frmaccdata.availableBalance;
                            accountID = frmaccdata.accountID;
                            accountType = frmaccdata.accountType;
                        } else if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(cardPayAccDetails)) {
                            fotmattedDefAccNum = cardPayAccDetails.AccountName;//applicationManager.getPresentationUtility().formatText(cardPayAccDetails.nickName, 15, cardPayAccDetails.account_id, 4);
                            formattedAccBalance = formatUtility.formatAmountandAppendCurrencySymbol(cardPayAccDetails.availableBalance, cardPayAccDetails.currencyCode);
                            accountID = cardPayAccDetails.accountID;
                            accountType = cardPayAccDetails.accountType;
                        } else {
                            fotmattedDefAccNum = defaultTraAccDetails.AccountName;//applicationManager.getPresentationUtility().formatText(defaultTraAccDetails.nickName, 15, defaultTraAccDetails.Account_id, 4);
                            formattedAccBalance = formatUtility.formatAmountandAppendCurrencySymbol(defaultTraAccDetails.availableBalance, defaultTraAccDetails.currencyCode);
                            accountID = defaultTraAccDetails.accountID;
                            accountType = defaultTraAccDetails.accountType;
                        }
                    } else if (previousForm === "frmCardManageHome" || previousForm === "frmCreditCardBillPaymentReview" || previousForm === "frmMFAValidation") {
                        if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(cardPayAccDetails)) {
                            fotmattedDefAccNum = cardPayAccDetails.AccountName;//applicationManager.getPresentationUtility().formatText(cardPayAccDetails.nickName, 15, cardPayAccDetails.account_id, 4);
                            formattedAccBalance = formatUtility.formatAmountandAppendCurrencySymbol(cardPayAccDetails.availableBalance, cardPayAccDetails.currencyCode);
                            accountID = cardPayAccDetails.accountID;
                            accountType = cardPayAccDetails.accountType;
                            if (previousForm === "frmCreditCardBillPaymentReview") {
                                this.view.txtAmountValue.text = reviewData.formattedAmount;
                                this.view.txtDescription.text = reviewData.notes;
                                scope.enableButton("btnContinue")
                            }
                            
                        } else {
                            fotmattedDefAccNum = defaultTraAccDetails.AccountName;//applicationManager.getPresentationUtility().formatText(defaultTraAccDetails.nickName, 15, defaultTraAccDetails.Account_id, 4);
                            formattedAccBalance = formatUtility.formatAmountandAppendCurrencySymbol(defaultTraAccDetails.availableBalance, defaultTraAccDetails.currencyCode);
                            accountID = defaultTraAccDetails.accountID;
                            accountType = defaultTraAccDetails.accountType;
                        }
                    }
                    this.UpdateformattedAccbalance(formattedAccBalance);
                    this.view.lblFromAccountValue.text = fotmattedDefAccNum; // from account
                    this.view.lblFromAccalance.text = formattedAccBalance;
                    this.view.lblAccountNumber.text = accountID;
                    this.view.lblAccountType.text = accountType;
                    //card number formatting
                    var cardNumebr = this.getSelectedCreditCardDetails().pan;
                    var first = cardNumebr.slice(0, 4);
                    var second = cardNumebr.slice(0, 6).slice(-2) + "XX";
                    var third = "XXXX";
                    var fourth = cardNumebr.slice(-4);
                    var formattedSlice = first + " " + second + " " + third + " " + fourth;
                    //card number formatting end
                    this.view.lblToAccountNumber.text = formattedSlice;
                    //set Account name
                    let cardAccountHolderName = this.getSelectedCreditCardDetails().accountName;
                    this.view.lblToAccountName.text = cardAccountHolderName;
                    var paymentTypeSegData = [];
                    var paymentTypeKey = [];
                    paymentTypeSegData.push({
                        "lblCardPaymentDue": kony.i18n.getLocalizedString("i18n.TransfersEur.MinimumDue"),
                        "imgSelectPayment": "radiobuttonactive.png",
                        "isSelected": true
                    });
                    paymentTypeKey.push(
                        kony.i18n.getLocalizedString("i18n.TransfersEur.StatementDue"),
                        kony.i18n.getLocalizedString("i18n.TransfersEur.OutstandingBalance"),
                        kony.i18n.getLocalizedString("i18n.Transfers.OtherAmount"),
                    );
                    for (var i in paymentTypeKey) {
                        paymentTypeSegData.push({
                            "lblCardPaymentDue": paymentTypeKey[i],
                            "imgSelectPayment": "radiobtninactive.png",
                            "isSelected": false
                        });
                    }
                    this.view.segCardPaymentDue.widgetDataMap = {
                        "lblCardPaymentDue": "lblCardPaymentDue",
                        "imgSelectPayment": "imgSelectPayment"
                    };
                    this.view.segCardPaymentDue.setData(paymentTypeSegData);
                    let currentData = applicationManager.getFormatUtilManager().getFormatedDateString(new Date(), "d/m/Y");
                    this.view.lblDueDate.text = "Due Date: " + currentData;//today date
                   this.view.lblCurrencyValue.text = scope_ManageActivitiesPresentationController.selectedCardCcy;
                    // var selectedSendOnDate = this.getNavMan().getCustomInfo("selectedSendOnDate");
                    // if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(selectedSendOnDate)) {
                    //     this.view.lblSendOnDateValue.text = selectedTransactionObject.scheduledDate; //selected send on date
                    // } else this.view.lblSendOnDateValue.text = currentData;

                    // let flow = this.getNavMan().getCustomInfo("flowFromReview");
                    // if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(flow)) {
                    //     this.getNavMan().setCustomInfo("flowFromReview", "");
                    //     if (flow === "frmCreditCardBillPaymentReview") { scope.setReviewDetails(); }
                    // }
                    this.view.txtDescription.maxTextLength = 60;
                    this.view.txtDescription.restrictCharactersSet = "~`!@#$%^&*()_+-=][}{:;\"\\'|\><,.?/";
                    this.view.txtDescription.placeholder = kony.i18n.getLocalizedString("i18n.fundsTransfer.notesMandatory");
                    // this.view.txtDescription.text = "";
                } catch (err) {
                    var errObj = {
                        "errorInfo": "Error in setCardPaymentDetails method.",
                        "errorLevel": "",
                        "error": err
                    };
                    this.onError(errObj);
                }
            },

            UpdateformattedAccbalance: function (formattedAccBalance) {
                try{
                this.intAccBalance ="0.00";
                if (!kony.sdk.isNullOrUndefined(formattedAccBalance)) {
                    this.intAccBalance = Number(formattedAccBalance.split(" ")[1].replace(/,/g, ""));
                }
                }catch(err){
        kony.print("UpdateformattedAccbalance"+ err);
      }
            },

            setReviewDetails: function () {
                try {
                    var scope = this;
                    let reviewData = this.getNavMan().getCustomInfo("reviewDataFrmCreditCardBillPaymentReview");
                    this.view.lblFromAccountValue.text = reviewData.formattedFromAccountName; // from account
                    this.view.lblFromAccalance.text = reviewData.formattedAvailableBalance; // from acc balance
                    this.view.lblAccountNumber.text = reviewData.fromAccountNumber;//acc number
                    this.view.lblAccountType.text = reviewData.accountType;//acc type

                    this.view.lblToAccountName.text = reviewData.customerCardName;//card number
                    this.view.lblToAccountNumber.text = reviewData.maskedCardNumber;//to card number
                    // this.view.lblSendOnDateValue.text = reviewData.formattedSendOnDate;// sendOn date
                     if (!kony.sdk.isNullOrUndefined(this.view.lblFromAccalance.text)) {
                        let accBalanceFormated = this.view.lblFromAccalance.text;
                        let withoutCCY = accBalanceFormated.split(" ");
                        scope.intAccBalance = withoutCCY[1].replace(/,/g, "");
                    }
                    //payment type
                    let segData = this.view.segCardPaymentDue.data;
                    for (var i in segData) {
                        if (segData[i].isSelected) {
                            segData[i].imgSelectPayment = "radiobtninactive.png";
                            segData[i].isSelected = false;
                        }
                    }
                    for (var i in segData) {
                        if (segData[i].lblCardPaymentDue === reviewData.paymentType) {
                            segData[i].imgSelectPayment = "radiobuttonactive.png";
                            segData[i].isSelected = true;
                        }
                    }
                    this.view.segCardPaymentDue.setData(segData);
                    scope.selectedPaymentType = reviewData.paymentType;
                    scope.isPaymentTypeSelected2ndTime = true;

                    //amount
                    // this.setAmountNdSetKeyboard();
                    // scope.enableKeyboard();
                } catch (err) {
                    var errObj = {
                        "errorInfo": "Error in setReviewDetails method.",
                        "errorLevel": "",
                        "error": err
                    };
                    this.onError(errObj);
                }
            },

            onClickCancel: function () {
                // this.getNavMan().navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
            manageCardsModule.presentationController.showCardsHome();
            },

            flxBackOnClick: function () {
                // this.getNavMan().navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
                this.getNavMan().navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome" });
                kony.application.destroyForm({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment"
                });
            },

            selectFromAccount: function () {
                this.getNavMan().setCustomInfo("accountSelectionCreditCardBillPayment", true);
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.getFromAccountsCardPayment();
                applicationManager.getPresentationUtility().showLoadingScreen();
            },

            navigateToCreditCardPaymentReview: function () {
                try{
                applicationManager.getPresentationUtility().showLoadingScreen();
                let currentData = applicationManager.getFormatUtilManager().getFormatedDateString(new Date(), "d/m/Y");
                let selectedCreditCardDetails = applicationManager.getNavigationManager().getCustomInfo("selectedCreditCardDetails");
                let transactionObj = applicationManager.getTransactionManager().getTransactionObject();
                let defAccDetails = this.getNavMan().getCustomInfo("defaultAcc").Accounts[0];
                let currentBankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
                let unFormattedSendOnDate = currentBankDate.currentWorkingDate;
                // currentBankDate = kony.os.date(this.dateFormat);
                currentBankDate = new Date(currentBankDate.currentWorkingDate).format("d/m/Y");
                if (!kony.sdk.isNullOrUndefined(currentBankDate)) {
                    var reviewData = {
                        "formattedFromAccountName": this.view.lblFromAccountValue.text,
                        "formattedAvailableBalance": this.view.lblFromAccalance.text,
                        "fromAccountNumber": !kony.sdk.isNullOrUndefined(transactionObj.fromAccountNumber) ? transactionObj.fromAccountNumber : defAccDetails.Account_id,
                        "accountType": this.view.lblAccountType.text,
                        "toCardNumber": this.getSelectedCreditCardDetails().pan,
                        "paymentType": kony.i18n.getLocalizedString("konymb.card.cardpayment"),
                        "formattedAmount": this.view.txtAmountValue.text,
                        "paymentCurr": scope_ManageActivitiesPresentationController.selectedCardCcy,
                        "frequency": "Once",
                        "dueDate": currentData,
                        "formattedSendOnDate": currentBankDate,
                        "notes": this.view.txtDescription.text,
                        "customerCardName": selectedCreditCardDetails.chName,
                        "sendOnDate": currentBankDate,
                        "unFormattedSendOnDate":unFormattedSendOnDate,
                        "maskedCardNumber":this.view.lblToAccountNumber.text,
                    };
                    this.view.lblAmount.text = "0.00";
                    this.view.txtAmountValue.text = "0.00";
                    this.getNavMan().setCustomInfo("cardPaymentReviewData", reviewData);
                    this.getNavMan().navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview"
                    });
                } else {
                    this.showPopup(kony.i18n.getLocalizedString("i18n.bankDate.error"))
                }
                }catch(err){
        kony.print("navigateToCreditCardPaymentReview"+ err);
      }
            },

            setTitleBarVisibility: function () {
                try{
                if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                    this.view.flxHeader.isVisible = true;
                    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("konymb.card.cardpayment");
                    this.view.customHeader.imgBack.src = "backbutton.png";
                    this.view.customHeader.imgBack.isVisible = true;
                } else {
                    this.view.flxHeader.isVisible = false;
                    this.view.title = kony.i18n.getLocalizedString("konymb.card.cardpayment");
                }
                }catch(err){
        kony.print("setTitleBarVisibility"+ err);
      }
            },

            amountKeyboardDataSetting: function () {
                this.view.btnOne.onClick = this.setAmountKeypadChar.bind(this, 1);
                this.view.btnTwo.onClick = this.setAmountKeypadChar.bind(this, 2);
                this.view.btnThree.onClick = this.setAmountKeypadChar.bind(this, 3);
                this.view.btnFour.onClick = this.setAmountKeypadChar.bind(this, 4);
                this.view.btnFive.onClick = this.setAmountKeypadChar.bind(this, 5);
                this.view.btnSix.onClick = this.setAmountKeypadChar.bind(this, 6);
                this.view.btnSeven.onClick = this.setAmountKeypadChar.bind(this, 7);
                this.view.btnEight.onClick = this.setAmountKeypadChar.bind(this, 8);
                this.view.btnNine.onClick = this.setAmountKeypadChar.bind(this, 9);
                this.view.btnZero.onClick = this.setAmountKeypadChar.bind(this, 0);
                this.view.imgClearKeypad.onTouchEnd = this.clearAmountKeypadChar.bind(this);
                this.view.flxClearAmount.onTouchEnd = this.clearAmountKeypad.bind(this);
            },

            setAmountKeypadChar: function (char) {
                try{
                if (char === '.') {
                    if (this.isPeriodUsed === false) {
                        this.isPeriodUsed = true;
                    }
                    else {
                        return;
                    }
                }
                if(this.keypadString > char){
                    this.clearAmountKeypadChar();
                }else{
                this.keypadString = this.keypadString + char[char.length - 1];
                var firstChar = this.keypadString[0];
                this.keypadString = this.keypadString.split("");
                for (var i = 1; i < this.keypadString.length; i++) {
                    if (this.keypadString[i] === '.') {
                        this.keypadString[i - 1] = this.keypadString[i + 1];
                        i++;
                    } else {
                        this.keypadString[i - 1] = this.keypadString[i];
                    }
                }
                this.keypadString = this.keypadString.join("");
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
                if (firstChar !== '0') {
                    this.keypadString = firstChar + this.keypadString;
                }
                this.updateAmountValue();
            }
            }catch(err){
        kony.print("setAmountKeypadChar"+ err);
      }
            },

            /**     
           * Component updateAmountValue
             * To updating values by clicking the value from keyborad 
             */
            updateAmountValue: function () {
                try{
                var scope = this;
                if (parseFloat(this.intAccBalance) < parseFloat(this.keypadString)) {
                    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.transfers.amountExceed"));
                    this.view.flxAmountWrapper.skin = 'sknflxBorderf1f1f1';
                    this.view.lblAmount.text = this.getFormattedAmountWithOutCurrency(this.keypadString);
                    this.view.txtAmountValue.text = this.getFormattedAmountWithOutCurrency(this.keypadString);
                    this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                    this.isAmtExceedAccBanalce = true;
                    this.isMinimumAmountEntered = true;
                    this.showPopup(this.amtExceedErrMsg);
                    this.view.btnContinue.setEnabled(false);
                } else {
                    if ((this.keypadString === '0.00' || this.keypadString === '0') || parseInt(this.keypadString) < 1) {
                        this.view.flxAmountWrapper.skin = 'sknflxBorderf1f1f1';
                        this.view.lblAmount.text = this.getFormattedAmountWithOutCurrency(this.keypadString);
                        this.view.txtAmountValue.text = this.getFormattedAmountWithOutCurrency(this.keypadString);
                        this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                        this.isAmtExceedAccBanalce = false;
                        this.isMinimumAmountEntered = false;
                    this.showPopup(scope.minimumAmountErrorMsg);

                        this.view.btnContinue.setEnabled(false);
                    } else {
                        var keypadStringCommas = '';
                        var beforeDecimal = this.keypadString.split('.')[0];
                        var afterDecimal = this.keypadString.split('.')[1];
                        this.isMinimumAmountEntered = true;
                        this.isAmtExceedAccBanalce = false;
                        if (beforeDecimal.length > 3) {
                            var withoutCommas = (beforeDecimal.length) % 3;
                            var temp = '';
                            if (withoutCommas !== 0) {
                                temp = beforeDecimal.substr(0, withoutCommas) + ',';
                            }
                            for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
                                temp += beforeDecimal.substr(i, 3) + ',';
                            }
                            beforeDecimal = temp.substr(0, temp.length - 1);
                        }
                        keypadStringCommas = beforeDecimal + '.' + afterDecimal;
                        this.view.flxAmountWrapper.skin = 'ICSknFlx003E75Border1px';
                        this.view.lblAmount.text = this.getFormattedAmountWithOutCurrency(this.keypadString);
                        this.view.txtAmountValue.text = this.getFormattedAmountWithOutCurrency(this.keypadString);
                        //Checking with Available balance
                        this.view.lblAmountErrorMsg.setVisibility(false);
                        if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(this.view.txtDescription.text)){
                        this.view.btnContinue.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
                        this.view.btnContinue.setEnabled(true);
                        }else{
                            this.view.btnContinue.setEnabled(false);
                            this.showPopup(this.mandatoryNoteErrMsg);
                        }
                    }
                }
                }catch(err){
        kony.print("updateAmountValue"+ err);
      }
            },
            validateAccBalanceWithTransactionAmount: function (TransactionAmount) {
                try{
                if (!kony.sdk.isNullOrUndefined(TransactionAmount)) {
                    var enteredAmount = TransactionAmount;
                    var enteredAmountWithoutComma = enteredAmount.replace(/,/g, "");
                    if (parseFloat(accBalance) < parseFloat(enteredAmountWithoutComma)) {
                        scope.isAmtExceedAccBanalce = true;
                        scope.disableButton("btnContinue");
                        scope.showPopup(this.amtExceedErrMsg)
                    }
                }
                }catch(err){
        kony.print("validateAccBalanceWithTransactionAmount"+ err);
      }
            },

            /**     
           * Component clearAmountKeypadChar
             * To clear the data one by one while clicking on clear button from keyboard
             */
            clearAmountKeypadChar: function () {
                try{
                if (this.keypadString === '0.00') return;
                this.keypadString = this.keypadString.split("");
                for (var i = this.keypadString.length - 2; i >= 0; i--) {
                    if (this.keypadString[i] === '.') {
                        this.keypadString[i + 1] = this.keypadString[i - 1];
                        i--;
                    } else {
                        this.keypadString[i + 1] = this.keypadString[i];
                    }
                }
                this.keypadString = this.keypadString.join("");
                this.keypadString = this.keypadString.substr(1);
                if (this.keypadString[0] === '.') {
                    this.keypadString = '0' + this.keypadString;
                }
                this.updateAmountValue();
                }catch(err){
        kony.print("clearAmountKeypadChar"+ err);
      }
            },

            /**     
           * Component clearAmountKeypad
             * To clear all the data while clicking on clear image
             */
            clearAmountKeypad: function () {
                this.keypadString = '0.00';
                // this.closeKeypad();
                this.updateAmountValue();
            },

            closeKeypad: function () {
                scope.view.flxAmountKeypad.setVisibility(false);
                scope.isKeypadEnabled = scope.view.flxAmountKeypad.isVisible;
            },

            /**
    * @api : getFormattedAmount
    * get the formatted amount value
    * @return : formattedAmount
    */
            getFormattedAmountWithOutCurrency: function (amountValue) {
                try{
                var scope = this;
                if (amountValue) {
                    amountValue = amountValue.replace(/[^0-9\.-]+/g, "");
                    return scope.formatUtils.formatData("AMOUNT_WITHOUT_CURRENCY", amountValue);
                }
                return "";
                }catch(err){
        kony.print("getFormattedAmountWithOutCurrency"+ err);
      }
            },

            getNavMan: function () {
                var navManager = applicationManager.getNavigationManager();
                return navManager;
            },

            navToSelectDate: function () {
                var scope = this;
                scope.getNavMan().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmSelectSendOnDate"
                });
            },

            setAmountNdSetKeyboard: function () {
                var scope = this;
                if (scope.selectedPaymentType == "Other Amount" && scope.isPaymentTypeSelected2ndTime) {
                    scope.enableKeyboard();
                }
                else if (scope.selectedPaymentType == "Minimum Due" && scope.isPaymentTypeSelected2ndTime) {
                    scope.view.lblAmount.text = scope.getSelectedCreditCardDetails().availableBalance;
                    scope.disableKeyboard();
                }
                else if (scope.selectedPaymentType == "Statement Due" && scope.isPaymentTypeSelected2ndTime) {
                    scope.view.lblAmount.text = scope.getSelectedCreditCardDetails().terMiniDue;
                    scope.disableKeyboard();
                }
                else if (scope.selectedPaymentType == "Outstanding Balance" && scope.isPaymentTypeSelected2ndTime) {
                    scope.view.lblAmount.text = scope.getSelectedCreditCardDetails().outstdBalance;
                    scope.disableKeyboard();
                } else {
                    scope.disableKeyboard();
                }
            },

            disableKeyboard: function () {
                var scope = this;
                scope.view.flxAmountKeypad.isVisible = false;
            },

            enableKeyboard: function () {
                var scope = this;
                // scope.view.lblAmount.text = "0.00";
                // scope.keypadString = "0.00";
                scope.view.flxAmountKeypad.isVisible = true;
            },

            onRowSelection: function (row) {
                try{
                // var qrPresentationController = applicationManager.getModulesPresentationController({
                //     "moduleName": "QRPaymentsUIModule",
                //     "appName": "TransfersMA"
                // });
                // var accountNumber = row[0].lblAccNumber;
                this.view.lblFromAccountValue.text = row[0].lblAccname.text;//accName
                this.view.lblFromAccalance.text = row[0].lblBalance.text; //accBalance
                this.view.lblAccountNumber.text = row[0].lblAccNumber; //accNumber
                this.view.lblAccountType.text = row[0].lblAccType.text; //accType
                this.UpdateformattedAccbalance(row[0].lblBalance.text);
                this.view.flxPopupfrombottom.setVisibility(false);
               // var qraccounts = applicationManager.getNavigationManager().getCustomInfo("frmQRFromAccount").fromaccounts;
                //var processedaccounts = qrPresentationController.processAccountsData(qraccounts);
            //     var acc = processedaccounts.filter(function (account) {
            //         if (accountNumber == account.accountID)
            //             return account;
            //     });
            //     qrPresentationController.setFromAccountsForTransactions(acc[0]);
            //     this.view.lblSelect.text = acc[0].processedName;
            }catch(err){
        kony.print("onRowSelection"+ err);
      }
            },

            showPopup: function (response) {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, response);
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
