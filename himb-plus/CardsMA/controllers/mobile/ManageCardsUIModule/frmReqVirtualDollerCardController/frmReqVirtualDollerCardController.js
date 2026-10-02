define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {

        preShow: function () {
            this.view.postShow = this.postShow;
            this.view.imgCheckBoxAccept.src = "hbluncheck.png";
            this.setAccountData();
            this.enableOrDisableContinue();
            this.setTitleBarVisibility();
    },

    setTitleBarVisibility: function() {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
                this.view.flxHeader.isVisible = true;
                //this.view.flxMainContainer.top = "56dp"; 
            } else {
                this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
                //this.view.flxHeader.isVisible = false;
                //this.view.flxMainContainer.top = "0dp";
            }
        },

        postShow : function () {
            if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
                this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            }
            this.view.flxSelectAccount.onClick = this.flxSelectAccountOnclick;
            this.view.btnContinue.onClick = this.btnContinueOnClick;
            this.view.imgCheckBoxAccept.onTouchStart = this.changeImg;
            this.view.btnTNC.onClick = this.getTermsAndConditionForCards;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        changeImg: function () {
            if (this.view.imgCheckBoxAccept.src == "hbluncheck.png") {
                this.view.imgCheckBoxAccept.src = "checkbox_ticked.png";
                this.enableOrDisableContinue();
            } else {
                this.view.imgCheckBoxAccept.src = "hbluncheck.png";
                this.enableOrDisableContinue();
            }
        },

        getTermsAndConditionForCards: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("termsAndConditionType", "topUpVirtualTnc");
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getTermsandConditions();
            applicationManager.getPresentationUtility().showLoadingScreen();
        },

        enableOrDisableContinue: function () {
            var imgCheckbox = this.view.imgCheckBoxAccept.src;
            if (imgCheckbox === "checkbox_ticked.png") {
                this.enableContinueButton();
            } else {
                this.disableContinueButton();
            }
        },
        
        getAvailableBalanceByAccountId: function (accountId, accountsData) {
            for (var i = 0; i < accountsData.length; i++) {
                var account = accountsData[i];
                if (account.Account_id === accountId || account.accountID === accountId) {
                    return account.availableBalance;
                }
            }
            return "Account not found";
        },
        setAccountData: function () {
            var data = applicationManager.getDefaultDashboardObj();
            var navManager = applicationManager.getNavigationManager();
            var firstNprAcccountDetails = navManager.getCustomInfo("firstNprAccount");
            if (!kony.sdk.isNullOrUndefined(data)) {
                var acctId = data.Accounts[0].account_id;
                var accountName = data.Accounts[0].accountName;
                var currency = data.Accounts[0].currencyCode;
                var nickName = data.Accounts[0].nickName;
                if (!kony.sdk.isNullOrUndefined(nickName)) {
                    var name = nickName;
                }
                else if (!kony.sdk.isNullOrUndefined(accountName)) {
                    var name = accountName;
                }
                if (currency === "NPR") {
                    var formattedAccountName = name + "...." + acctId.slice(-4);
                } else {
                    if (!kony.sdk.isNullOrUndefined(firstNprAcccountDetails)) {
                        var data = firstNprAcccountDetails;
                        var acctId = data.accountID;
                        var accountName = data.accountName;
                        var nickName = data.nickName;
                        if (!kony.sdk.isNullOrUndefined(nickName)) {
                            var name = nickName;
                        }
                        else if (!kony.sdk.isNullOrUndefined(accountName)) {
                            var name = accountName;
                        }
                        var formattedAccountName = name + "...." + acctId.slice(-4);
                    }
                }
                var navManager = applicationManager.getNavigationManager();
                this.view.lblAccId.text = acctId;
                navManager.setCustomInfo("defaultVirtualAccId", acctId);
            }
            var data = navManager.getCustomInfo("selectedCardAccountDetails");
            if (!kony.sdk.isNullOrUndefined(data)) {
                var selectedAcctId = data.accountID;
                var accountName = data.accountName;
                var nickName = data.nickName;
                if (!kony.sdk.isNullOrUndefined(nickName)) {
                    var selectedName = nickName;
                }
                else if (!kony.sdk.isNullOrUndefined(accountName)) {
                    var selectedName = accountName;
                }
                var selectedAccountName = selectedName + "...." + selectedAcctId.slice(-4);
                this.view.lblAccId.text = selectedAcctId;
            }
            var flow = navManager.getCustomInfo("virtualCardAccountSelectionFlow");
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmApplyForPrepaidCard") {
                this.view.lblAccountValue.text = formattedAccountName;
            } else if (flow === "true") {
                if (previousForm === "frmManageNewCardAccounts") {
                    this.view.lblAccountValue.text = selectedAccountName;
                    navManager.getCustomInfo("virtualCardAccountSelectionFlow", null);
                }
            }
        },

        disableContinueButton: function () {
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        },
        enableContinueButton: function () {
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn055BAF26px";
        },
        btnContinueOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            var accId = this.view.lblAccId.text;

            navManager.setCustomInfo("defaultAccIdVirtualCard", {
                "accId": this.view.lblAccId.text,
                "fromAccount": this.view.lblAccountValue.text
            });
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCardsConsent" });
        },

        flxSelectAccountOnclick: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.navigateToNewCardFlow();
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmApplyForPrepaidCard" });
        },

        flxCancelOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome" });
        },
    }
});

