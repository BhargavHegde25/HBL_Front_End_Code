define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        scope_configManager: applicationManager.getConfigurationManager(),
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },

        preShow: function () {
           this.view.postShow = this.postShow;
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.flxCancelOnClick,
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
            this.view.imgCard1.src = "visacredit.png";
            this.view.imgCard2.src = "mastercardcredit.png";
            this.setTitleBarVisibility();
            this.setVirtualCardVisibility();
        },
        setTitleBarVisibility: function() {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
            }
        },

        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            this.view.flxPhysicalCard.onClick = this.flxPhysicalCardOnclick;
            this.view.flxVirtualCard.onClick = this.flxVirtualCardOnclick;
              applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        setVirtualCardVisibility: function () {
            var accountObj = applicationManager.getAccountManager();
            var acctInfo = accountObj.getSavingsAndCheckingsAccounts();
            var filterList = function (input) {
                try {
                    let accountData = JSON.parse(JSON.stringify(input));
                    let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
                    return filteredAccountData;
                } catch (err) {
                    return input;
                }
            };
            var filterListBasedOnCurrency = function (input) {
                try {
                    let accountData = JSON.parse(JSON.stringify(input));
                    let filteredAccountData = accountData.filter(item => ((["NPR"].includes(item["currencyCode"].toUpperCase()))));
                    return filteredAccountData;
                } catch (err) {
                    return input;
                }
            };
            if (!kony.sdk.isNullOrUndefined(acctInfo)) {
                var acctInfoInp = filterList(acctInfo);
                var acctInfoBasedOnCurrency = filterListBasedOnCurrency(acctInfoInp);
                if (acctInfoBasedOnCurrency.length === 0) {
                    this.view.flxVirtualCard.isVisible = false;
                } else {
                    var data = acctInfoBasedOnCurrency[0];
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("firstNprAccount", data);
                    this.view.flxVirtualCard.isVisible = true;
                }
            }
        },
        
        flxBackOnClick : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmApplyForCardsNew"});
        },        
      
        flxCancelOnClick : function () {
            var navManager = applicationManager.getNavigationManager(); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
        },

        flxPhysicalCardOnclick : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("cardSelectionType", "physicalPrepaidCard"); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmPrepaidCardTypes"});
        },

        flxVirtualCardOnclick : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("cardSelectionType", "virtualPrepaidCard");
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCard" });
        },        
    };
});
