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
            this.setWidgetVisibilityBasedOnCard();
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("setHblNewCardDetails");
            var data1 = navManager.getCustomInfo("setHblConfirmDetails");
            this.view.imgCard.src = data.cardImg;
            this.view.lblCardName.text = data.cardName;
            this.view.lblAccountName.text = data.accName;
            this.view.lblAccNo.text = data.accNo;
            this.setCardLimitDetails();

            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMainScroll.top = "56dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "0dp";
            }
        },

        setCardLimitDetails: function () {
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("setHblConfirmDetails");
            var segmentData = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    segmentData.push({
                        lblKey: key,
                        lblValue: data[key]
                    });
                }
            }
            this.view.segCardDetails.widgetDataMap = {
                "lblKey": "lblKey",
                "lblValue": "lblValue",
            };
            this.view.segCardDetails.setData(segmentData);
        },

        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            this.view.btnPrimary.onClick = this.btnPrimaryOnclick;

            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                //this.view.flxMainScroll.top = "56dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                //this.view.flxMainScroll.top = "10dp";
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        setWidgetVisibilityBasedOnCard: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            if (flow === "debitCard") {
                this.view.flxAccountDetails.setVisibility(true);
                this.view.flxInfoGroup.setVisibility(false);
            } else if (flow === "domesticPrepaidCard") {
                this.view.flxAccountDetails.setVisibility(false);
                this.view.flxInfoGroup.setVisibility(false);
            } else if (flow === "internationalPrepaidCard") {
                this.view.flxAccountDetails.setVisibility(false);
                this.view.flxInfoGroup.setVisibility(false);
            } else if (flow === "virtualCard") {
                this.view.flxAccountDetails.setVisibility(true);
                this.view.flxInfoGroup.setVisibility(true);
            }
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmConfirmCardRequest" });
        },

        flxCancelOnClick: function () {
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });
            manageCardsModule.presentationController.isFirstTime = true;
            manageCardsModule.presentationController.showCardsHome();
        },

        btnPrimaryOnclick: function () {
            try{
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardFlowType");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ManageCardsUIModule",
                "appName": "CardsMA"
            });


            if (flow === "debitCard") {
                var navManager = applicationManager.getNavigationManager();
                var data = navManager.getCustomInfo("requestNewCardDetails");
                var accDetail = navManager.getCustomInfo("setHblNewCardDetails");
                var serviceProvider = data.cardCategory.toLowerCase();
                var cardType = data.cardType;

                var limitData = navManager.getCustomInfo("cardDetailsFromSelectCard");
                var keysToRemove = [
                    kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2"),
                    kony.i18n.getLocalizedString("i18n.HBL.Cards.PreferredBranch"),
                ];
                var filteredCardData = Object.keys(limitData).reduce(function (result, key) {
                    if (keysToRemove.indexOf(key) === -1) {
                        result[key] = limitData[key];
                    }
                    return result;
                }, {});

                var debitAccount = accDetail.accNo;
                var accName = accDetail.accName;
                var branchDetails = navManager.getCustomInfo("selectedBranchDetails");
                var paramDebit =
                {
                    "serviceProvider": serviceProvider,
                    "cardType": cardType,
                    "cardDescription": data.cardDescription,
                    "nameOnTheCard": accName,
                    "cardCategory": "",
                    "panNo": "",
                    "topupAmount": "",
                    "debitAccount": debitAccount,
                    "branchname": branchDetails.branchname,
                    "branchcode": branchDetails.mnemonic,
                    "branchtoemail": branchDetails.emailto,
                    "branchccemail": ""
                }
                paramDebit = Object.assign(paramDebit, filteredCardData);
                manageCardsModule.presentationController.applyNewHBLCard(paramDebit);
            } else if (flow === "domesticPrepaidCard" || flow === "internationalPrepaidCard") {
                var navManager = applicationManager.getNavigationManager();
                var data = navManager.getCustomInfo("requestNewCardDetails");
                var accDetail = navManager.getCustomInfo("setHblNewCardDetails");
                var accName = accDetail.accName;
                var serviceProvider = data.cardCategory.toLowerCase();
                var cardType = data.cardType;
                var data1 = navManager.getCustomInfo("cardLimitsNewData");
                var selectedCardSubType = data1[kony.i18n.getLocalizedString("kony.mb.accdetails.cardType")];
                var limitData = navManager.getCustomInfo("cardDetailsFromSelectCard");
                var keysToRemove = [
                    kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard2"),
                    kony.i18n.getLocalizedString("kony.mb.accdetails.cardType"),
                    kony.i18n.getLocalizedString("i18n.HBL.Cards.PreferredBranch")
                ];
                var filteredCardData = Object.keys(limitData).reduce(function (result, key) {
                    if (keysToRemove.indexOf(key) === -1) {
                        result[key] = limitData[key];
                    }
                    return result;
                }, {});
                var branchDetails = navManager.getCustomInfo("selectedBranchDetails");
                var paramPrepaid =
                {
                    "serviceProvider": serviceProvider,
                    "cardType": cardType,
                    "cardDescription": data.cardDescription,
                    "nameOnTheCard": accName,
                    "cardCategory": selectedCardSubType,
                    "panNo": "",
                    "topupAmount": "",
                    "branchname": branchDetails.branchname,
                    "branchcode": branchDetails.mnemonic,
                    "branchtoemail": branchDetails.emailto,
                    "branchccemail": ""
                }
                paramPrepaid = Object.assign(paramPrepaid, filteredCardData);
                manageCardsModule.presentationController.applyNewHBLCard(paramPrepaid);
            } else if (flow === "virtualCard") {
                var navManager = applicationManager.getNavigationManager();
                var data = navManager.getCustomInfo("requestNewCardDetails");
                var accDetail = navManager.getCustomInfo("setHblNewCardDetails");
                var serviceProvider = data.cardCategory.toLowerCase();
                var cardType = data.cardType;
                var debitAccount = accDetail.accNo;

                var convertedAmount = navManager.getCustomInfo("convertedAmountRate");// 
                var convertedVirtualDetails = navManager.getCustomInfo("virtualPrepaidCardDetails"); //"cardCategory": "Visa International",
                var param = navManager.getCustomInfo("currencyConversionData");
                var amountInNPR = param.transactionAmount;
                var finalAmount = parseFloat(amountInNPR) * parseFloat(convertedAmount);
                var debitAmountFormatted = "NPR " + CommonUtilities.formatCurrencyWithCommas(finalAmount, true);
                var convertedDebitAmount = navManager.getCustomInfo("convertedAmount");
                if (!kony.sdk.isNullOrUndefined(convertedDebitAmount)) {
                    var debitAmount = convertedDebitAmount;
                } else {
                    var debitAmount = "";
                }

                var cardCategory = data.cardCategory;
                var cardSubCategory = null;
                if (cardCategory) {
                    if (cardCategory.toUpperCase().includes("VISA")) {
                        cardSubCategory = "VISA";
                    } else if (cardCategory.toUpperCase().includes("AMEX")) {
                        cardSubCategory = "AMEX";
                    } else if (cardCategory.toUpperCase().includes("SCTUI")) {
                        cardSubCategory = "SCTUI";
                    }
                }
                var branchDetails = navManager.getCustomInfo("selectedBranchDetails");
                var panNum = navManager.getCustomInfo("panNo");
                var paramVirtual =
                {
                    "cardType": data.cardType,
                    "debitAccount": debitAccount,
                    "serviceProvider": cardSubCategory,
                    "nameOnTheCard": "",
                    "cardCategory": "",
                    "panNo": !kony.sdk.isNullOrUndefined(panNum.panNo)?panNum.panNo:"",
                    "topupAmount": convertedVirtualDetails.virtualAmount,
                    "totalDebitAmount": debitAmount,
                    "branchname": branchDetails.branchname,
                    "branchcode": branchDetails.mnemonic,
                    "branchtoemail": branchDetails.emailto,
                    "branchccemail": ""
                }
                manageCardsModule.presentationController.applyNewHBLCard(paramVirtual);
            }
        }
            catch(e){
                kony.print("unexpected err in btnPrimaryOnclick function"+e);
            }
        },

        checkForToastMessageError: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("requestCardErrorFlow");
            var error = navManager.getCustomInfo("requestCardError");
            if (flow === "true") {
                if (!kony.sdk.isNullOrUndefined(error.errorMessage)) {
                    var err = error.errorMessage;
                    if (!kony.sdk.isNullOrUndefined(err)) {
                        if (err === 'REQ_EXISTS' || err === "REQ_EXISTS") {
                            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.VirtualCardRequestExistError"));
                            navManager.setCustomInfo("requestCardError", null);
                            navManager.setCustomInfo("requestCardErrorFlow", null);
                        }
                    } else {
                        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
                        navManager.setCustomInfo("requestCardErrorFlow", null);
                    }
                } else {
                    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
                    navManager.setCustomInfo("requestCardErrorFlow", null);
                }
            } else {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
            }
        },

    };
});
