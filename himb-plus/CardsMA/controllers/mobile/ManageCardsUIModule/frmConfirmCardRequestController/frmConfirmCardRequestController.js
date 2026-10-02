define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },

        preShow: function () {
            this.view.postShow = this.postShow;
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            var default_card_account = userObj['default_account_cardpayment'];
            var response = applicationManager.getNavigationManager().getCustomInfo("frmManageNewCardAccounts");
            var manageCardsModule = applicationManager.getModulesPresentationController({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });
            if ((response !== null) && (response !== "") && (response !== undefined)) {
                for (i = 0; i < response.length; i++) {
                    if (response[i].accountID === default_card_account) {
                        manageCardsModule.cardNewDetails.accName = response[i].accountName;
                        manageCardsModule.cardNewDetails.balance = response[i].availableBalance;
                        
                        manageCardsModule.cardNewDetails.accNo = response[i].accountID;
                        manageCardsModule.cardNewDetails.accType = response[i].accountType;
                    } else {
                        manageCardsModule.cardNewDetails.accName = response[0].accountName;
                        manageCardsModule.cardNewDetails.balance = response[0].availableBalance;
                       
                        manageCardsModule.cardNewDetails.accNo = response[0].accountID;
                        manageCardsModule.cardNewDetails.accType = response[0].accountType;
                    }
                }
            } 
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmHblCards") {
            this.view.lblAccountName.text = manageCardsModule.cardNewDetails.accName;
            this.view.lblBalance.text = manageCardsModule.cardNewDetails.balance;
            this.view.lblAccountNumber.text = manageCardsModule.cardNewDetails.accNo;
            this.view.lblAccountType.text = manageCardsModule.cardNewDetails.accType;
            }
            this.view.imgBranch.src= "branch.png";
            this.setSegmentData();
            this.setCardLimitData();
            this.setWidgetVisibilityBasedOnCard();
            var navManager = applicationManager.getNavigationManager();
            navManager.getCustomInfo("cardDetailsFromSelectCard");
            
            if (previousForm === "frmHblCards") {
                this.view.lblBranchName.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectBranch");
                this.view.lblTxtPAN.text = "";
                this.view.lblTxtAmount.text = "";
                this.disableContinueButton();
            }

            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMainScroll.top = "56dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "0dp";
            }
        },

        setWidgetVisibilityBasedOnCard: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            var data = navManager.getCustomInfo("requestNewCardDetails");
            if (flow === "debitCard") {
                this.view.flxPANNo.setVisibility(false);
                this.view.flxAmount.setVisibility(false);
                this.view.flxInfoGroup.setVisibility(false);
                this.view.flxSelectAccount.setVisibility(true);
                this.view.flxSelectedAccountDetails.setVisibility(true);
            } else if (flow === "domesticPrepaidCard") {
                this.view.flxSelectAccount.setVisibility(false);
                this.view.flxSelectedAccountDetails.setVisibility(false);
                this.view.flxPANNo.setVisibility(false);
                this.view.flxAmount.setVisibility(false);
                this.view.flxInfoGroup.setVisibility(false);
                this.view.flxSelectedAccountDetails.setVisibility(false);
            } else if (flow === "internationalPrepaidCard") {
                this.view.flxSelectAccount.setVisibility(false);
                this.view.flxSelectedAccountDetails.setVisibility(false);
                this.view.flxPANNo.setVisibility(false);
                this.view.flxAmount.setVisibility(false);
                this.view.flxInfoGroup.setVisibility(false);
                this.view.flxSelectedAccountDetails.setVisibility(false);
            } else if (flow === "virtualCard") {
                this.view.flxPANNo.setVisibility(true);
                this.view.flxAmount.setVisibility(true);
                this.view.flxInfoGroup.setVisibility(true);
                this.view.flxSelectAccount.setVisibility(true);
                this.view.flxSelectedAccountDetails.setVisibility(true);
            }
            this.view.lblCardName.text = data.productName;
            this.view.imgCard.src = data.cardImage;
        },

        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            this.view.btnCancel.onClick = this.flxBackOnClick;
            this.view.btnPrimary.onClick = this.btnPrimaryOnclick;
            this.view.flxSelectedAccountDetails.onClick = this.flxSelectAccount;
            this.view.flxSelectedBranch.onClick = this.flxSelectBranch;
            this.view.flxPopupfrombottoms.onClick = this.setPopupVisibility;
            this.view.imgclose.onClick = this.setPopupVisibility;
            this.view.segTransactions.onRowClick = this.segBranchOnClick;
            this.view.lblTxtPAN.onTextChange = this.verifyPan;
            this.view.lblTxtAmount.onTextChange = this.validateAmountRange;
            this.view.flxPANNo.onClick = this.flxPANNoOnclick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        flxSelectAccount: function () {
            var scope = this;
            applicationManager.getPresentationUtility().showLoadingScreen();
            var fromAccount = applicationManager.getNavigationManager().getCustomInfo("frmManageNewCardAccounts");
            var PopupObj = {
                "accounts": fromAccount,
                "flowType": "Cards",
                "rowClickCallback": scope.onRowSelection.bind(this)
            };
            applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope, PopupObj);
        },

        flxPANNoOnclick: function () {
            applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.HBL.Cards.PanError"));
        },

        segBranchOnClick: function () {
            try {
                var selectedItems = this.view.segTransactions.selectedRowItems[0];
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("selectedBranchDetails", selectedItems);
                var data = selectedItems.branchname;
                this.view.lblBranchName.text = data;
                this.setPopupVisibility();
                this.enableOrDisableContinue();
            } catch (er) {
                kony.print(er);
            }
        },
        setPopupVisibility: function () {
            this.view.flxPopupfrombottoms.isVisible = false;
        },

        setCardLimitData: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            var details = navManager.getCustomInfo("requestNewCardDetails");
            var data = navManager.getCustomInfo("cardDetailsFromSelectCard");
            var accHolderName = this.view.lblAccountName.text.toUpperCase();
            if (flow === "debitCard") {
                var dataNew = {
                    [kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2")]: accHolderName
                };
                data = Object.assign(data, dataNew);
            } else if (flow === "domesticPrepaidCard") {
                if (details.cardCategory.toLowerCase().includes("domestic")) {
                    var cardType = kony.i18n.getLocalizedString("i18n.HBL.Cards.Domestic");
                }
                var dataNew = {
                    [kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")]: cardType,
                    [kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2")]: accHolderName
                };
                data = Object.assign(data, dataNew);
            } else if (flow === "internationalPrepaidCard") {
                if (details.cardCategory.toLowerCase().includes("international")) {
                    var cardType = kony.i18n.getLocalizedString("i18n.HBL.Cards.International");
                    var dataNew = {
                        [kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")]: cardType,
                        [kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2")]: accHolderName
                    };
                    data = Object.assign(data, dataNew);
                }

            } else if (flow === "virtualCard") {
                var dataNew = {
                    [kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2")]: accHolderName
                };
                data = Object.assign(data, dataNew);
            }

            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("cardLimitsNewData", data);

            var segmentData = [];

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    segmentData.push({
                        lblKey: key,
                        lblValue: data[key]
                    });
                }
            }
            this.view.segCard.widgetDataMap = {
                "lblKey": "lblKey",
                "lblValue": "lblValue",
            };
            this.view.segCard.setData(segmentData);
        },

        setSegmentData: function () {
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("branchDetails");
            var details = data.hblBranchList;
            if (details.length > 0) {
                for (var i = 0; i < details.length; i++) {
                    details[i]["lblBranch"] = {
                        "text": details[i].branchname,
                        "onClick": function (widget, context) {
                            this.view.flxPopupfrombottoms.isVisible = false;
                            var r = context["rowIndex"];
                            var data1 = context.widgetInfo.data[r];
                            var navManager = applicationManager.getNavigationManager();
                            navManager.setCustomInfo("selectedBranch", data1);
                        }
                    }
                }
            }
            this.view.segTransactions.widgetDataMap = {
                "lblBranch": "lblBranch",
            };
            this.view.segTransactions.setData(details);
        },

        flxSelectBranch: function () {
            this.view.flxPopupfrombottoms.isVisible = true;
            this.view.flxPopupcontainer.animate(kony.ui.createAnimation({
                "100": {
                    "bottom": "-5%",
                    "stepConfig": {
                        "timingFunction": kony.anim.EASE
                    }
                }
            }), {
                "delay": 0,
                "iterationCount": 1,
                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                "duration": 1.0
            }, /*{
     "animationEnd": function() {
    this.view.flxPopupfrombottom.isVisible=false;
}
}*/);
        },

        onRowSelection: function (row) {
            this.view.flxPopupfrombottom.isVisible = false;
            var data = row[0];
            var manageCardsModule = applicationManager.getModulesPresentationController({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });

            manageCardsModule.cardNewDetails.balance = data.lblBalance.text;
            manageCardsModule.cardNewDetails.accNo = data.lblAccNumber;
            manageCardsModule.cardNewDetails.accName = data.lblAccname.text;
            manageCardsModule.cardNewDetails.accType = data.lblAccType.text;

            this.view.lblAccountName.text = manageCardsModule.cardNewDetails.accName;
            this.view.lblBalance.text = manageCardsModule.cardNewDetails.balance;
            this.view.lblAccountNumber.text = manageCardsModule.cardNewDetails.accNo;
            this.view.lblAccountType.text = manageCardsModule.cardNewDetails.accType;
            this.enableOrDisableContinue();
        },

        enableOrDisableContinue: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            if (flow === "debitCard") {
                var branch = this.view.lblBranchName.text;
                var accName = this.view.lblAccountName.text;
                var balance = this.view.lblBalance.text;
                var accNo = this.view.lblAccountNumber.text;
                var accType = this.view.lblAccountType.text;
                if (
                    (!kony.sdk.isNullOrUndefined(branch)) &&
                    (branch !== kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectBranch")) &&
                    (!kony.sdk.isNullOrUndefined(accName)) &&
                    (!kony.sdk.isNullOrUndefined(balance)) &&
                    (!kony.sdk.isNullOrUndefined(accNo)) &&
                    (!kony.sdk.isNullOrUndefined(accType))) {
                    this.enableContinueButton();
                }
                else {
                    this.disableContinueButton();
                }
            } else if (flow === "domesticPrepaidCard") {
                var branch = this.view.lblBranchName.text;
                var accName = this.view.lblAccountName.text;
                var balance = this.view.lblBalance.text;
                var accNo = this.view.lblAccountNumber.text;
                var accType = this.view.lblAccountType.text;
                if (
                    (!kony.sdk.isNullOrUndefined(branch)) &&
                    (branch !== kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectBranch")) &&
                    (!kony.sdk.isNullOrUndefined(accName)) &&
                    (!kony.sdk.isNullOrUndefined(balance)) &&
                    (!kony.sdk.isNullOrUndefined(accNo)) &&
                    (!kony.sdk.isNullOrUndefined(accType))) {
                    this.enableContinueButton();
                }
                else {
                    this.disableContinueButton();
                }
            } else if (flow === "internationalPrepaidCard") {
                var branch = this.view.lblBranchName.text;
                var accName = this.view.lblAccountName.text;
                var balance = this.view.lblBalance.text;
                var accNo = this.view.lblAccountNumber.text;
                var accType = this.view.lblAccountType.text;
                if (
                    (!kony.sdk.isNullOrUndefined(branch)) &&
                    (branch !== kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectBranch")) &&
                    (!kony.sdk.isNullOrUndefined(accName)) &&
                    (!kony.sdk.isNullOrUndefined(balance)) &&
                    (!kony.sdk.isNullOrUndefined(accNo)) &&
                    (!kony.sdk.isNullOrUndefined(accType))) {
                    this.enableContinueButton();
                }
                else {
                    this.disableContinueButton();
                }
            } else if (flow === "virtualCard") {
                var accName = this.view.lblAccountName.text;
                var balance = this.view.lblBalance.text;
                var accNo = this.view.lblAccountNumber.text;
                var accType = this.view.lblAccountType.text;
                var branch = this.view.lblBranchName.text;
                var virtualPan = this.view.lblTxtPAN.text;
                var amount = this.view.lblTxtAmount.text;
                if ((
                    (!kony.sdk.isNullOrUndefined(branch)) &&
                    (!kony.sdk.isNullOrUndefined(accName)) &&
                    (!kony.sdk.isNullOrUndefined(balance)) &&
                    (!kony.sdk.isNullOrUndefined(accNo)) &&
                    (!kony.sdk.isNullOrUndefined(accType)) &&
                    (virtualPan.length === 9) &&
                    !isNaN(amount) &&
                    (amount >= 50 && amount <= 500) &&
                    ((amount !== null) && (amount !== "") && (amount !== undefined)) &&
                    (branch !== kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectBranch")))) {
                    this.enableContinueButton();
                }
                else {
                    this.disableContinueButton();
                }
            }
        },

        enableContinueButton: function () {
            this.view.btnPrimary.setEnabled(true);
            this.view.btnPrimary.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
        },

        disableContinueButton: function () {
            this.view.btnPrimary.setEnabled(false);
            this.view.btnPrimary.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        },

        verifyPan: function () {
            var pan = this.view.lblTxtPAN.text;
            if (!kony.sdk.isNullOrUndefined(pan)) {
                if (pan.length === 9) {
                    this.enableOrDisableContinue();
                } else {
                    //this.checkForToastMessageError();
                    this.disableContinueButton();
                }
            }
        },

        checkForToastMessageError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.PanError"));
            //applicationManager.getDataProcessorUtility().showToastMessageError(this, "Please enter a valid 9-digit PAN Number.");
        },

        validateAmountRange: function () {

            var accId = this.view.lblAccountNumber.text;
            var availableBalanceText = this.getAvailableBalanceByAccountId(accId);

            var amountText = this.view.lblTxtAmount.text;
            var amount = parseFloat(amountText);
            var availableBalance = parseFloat(availableBalanceText);

            if (amount < 50.00 || amount > 500.00) {
                //this.checkForToastMessageAmountError();
                this.disableContinueButton();
            } else if (amount > availableBalance) {
                this.checkForToastMessageBalanceError();
                this.disableContinueButton();
            } else {
                this.enableOrDisableContinue();
            }
        },

        checkForToastMessageAmountError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.AmountSub"));
        },

        checkForToastMessageBalanceError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.transfer.amountGreaterThanAvailBal"));//  i18n.common.errorInsufficientFunds
        },

        getAvailableBalanceByAccountId: function (accountId) {
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

        btnPrimaryOnclick: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            var data = navManager.getCustomInfo("requestNewCardDetails");

            if (flow === "debitCard") {
                var dataNew = {
                    cardImg: data.cardImage,
                    cardName: data.productName,
                    accNo: this.view.lblAccountNumber.text,
                    accName: this.view.lblAccountName.text
                };
                navManager.setCustomInfo("setHblNewCardDetails", dataNew);

                var branch = this.view.lblBranchName.text;
                var cardLimitsNewData = navManager.getCustomInfo("cardLimitsNewData");

                var clonedData = JSON.parse(JSON.stringify(cardLimitsNewData));
                clonedData[kony.i18n.getLocalizedString("i18n.HBL.Cards.PreferredBranch")] = branch;

                navManager.setCustomInfo("setHblConfirmDetails", clonedData);

            } else if (flow === "domesticPrepaidCard") {
                var dataNew = {
                    cardImg: data.cardImage,
                    cardName: data.productName,
                    accName: this.view.lblAccountName.text
                };
                navManager.setCustomInfo("setHblNewCardDetails", dataNew);

                var branch = this.view.lblBranchName.text;
                var cardLimitsNewData = navManager.getCustomInfo("cardLimitsNewData");

                var clonedData = JSON.parse(JSON.stringify(cardLimitsNewData));
                clonedData[kony.i18n.getLocalizedString("i18n.HBL.Cards.PreferredBranch")] = branch;

                navManager.setCustomInfo("setHblConfirmDetails", clonedData);

            } else if (flow === "internationalPrepaidCard") {
                var dataNew = {
                    cardImg: data.cardImage,
                    cardName: data.productName,
                    accName: this.view.lblAccountName.text
                };
                navManager.setCustomInfo("setHblNewCardDetails", dataNew);

                var branch = this.view.lblBranchName.text;
                var cardLimitsNewData = navManager.getCustomInfo("cardLimitsNewData");

                var clonedData = JSON.parse(JSON.stringify(cardLimitsNewData));
                clonedData[kony.i18n.getLocalizedString("i18n.HBL.Cards.PreferredBranch")] = branch;

                navManager.setCustomInfo("setHblConfirmDetails", clonedData);

            } else if (flow === "virtualCard") {
                var dataNew = {
                    cardImg: data.cardImage,
                    cardName: data.productName,
                    accNo: this.view.lblAccountNumber.text,
                    accName: this.view.lblAccountName.text
                };
                navManager.setCustomInfo("setHblNewCardDetails", dataNew);

                var branch = this.view.lblBranchName.text;
                var pan = this.view.lblTxtPAN.text;
                var amount = this.view.lblTxtAmount.text;

                var cardLimitsNewData = navManager.getCustomInfo("cardLimitsNewData");

                var clonedData = JSON.parse(JSON.stringify(cardLimitsNewData));
                clonedData[kony.i18n.getLocalizedString("i18n.HBL.Cards.PreferredBranch")] = branch;
                clonedData[kony.i18n.getLocalizedString("i18n.HBL.Cards.PANNumber")] = pan;
                clonedData[kony.i18n.getLocalizedString("i18n.HBL.Cards.TopupAmount")] = amount;

                navManager.setCustomInfo("setHblConfirmDetails", clonedData);
                navManager.setCustomInfo("panNo", {"panNo":pan});

                var config = applicationManager.getConfigurationManager();
                var cardFee = Number(config.getVirtualPrepaidCardFee());
                var cardFeeFormatted = "USD " + CommonUtilities.formatCurrencyWithCommas(cardFee, true);
                var amountNum = Number(this.view.lblTxtAmount.text);
                var totalDebitAmountInNpr = amountNum + cardFee;
                var formattedTopupAmount = "USD " + CommonUtilities.formatCurrencyWithCommas(amountNum, true);

                var data1 = {
                    "cardFee": cardFeeFormatted,
                    "topUpAmount": formattedTopupAmount,
                    "virtualAmount": amountNum,
                    "totalDebitAmountInNpr": totalDebitAmountInNpr
                };
                navManager.setCustomInfo("virtualPrepaidCardDetails", data1);
            }
            var serviceProvider = null;
            var cardType = data.cardType;
            var debitAccount = this.view.lblAccountNumber.text ? this.view.lblAccountNumber.text : "";

            if (flow === "debitCard" || flow === "domesticPrepaidCard" || flow === "internationalPrepaidCard") {
                serviceProvider = data.cardCategory.toLowerCase();
            } else if (flow === "virtualCard") {
                var cardCategory = data.cardCategory;
                if (cardCategory) {
                    var cardCategoryUpper = cardCategory.toUpperCase();
                    if (cardCategoryUpper.includes("VISA")) {
                        serviceProvider = "VISA";
                    } else if (cardCategoryUpper.includes("AMEX")) {
                        serviceProvider = "AMEX";
                    } else if (cardCategoryUpper.includes("SCTUI")) {
                        serviceProvider = "SCTUI";
                    }
                }
            }

            var param = {
                "cardType": cardType,
                "debitAccount": debitAccount,
                "serviceProvider": serviceProvider
            };

            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });
            manageCardsModule.presentationController.checkCardRequestExists(param);
        },

        getCardType: function (cardType) {
            if (cardType == "Debit Card") {
                return "debitcard"
            } else if (cardType == "Physical Prepaid Card") {
                return "physicalPrepaidCard"
            } else if (cardType == "Virtual Prepaid Card") {
                return "virtualPrepaidCard"
            }
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmHblCards"});
        },

        flxCancelOnClick: function () {
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });
            manageCardsModule.presentationController.isFirstTime = true;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
            manageCardsModule.presentationController.showCardsHome();
        },

        checkForRequestExistsError: function (message) {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, message);
        },
    };
});



