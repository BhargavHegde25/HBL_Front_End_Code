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
           this.view.lblPrepaidCard.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.PrepaidCard");
           this.view.lblDebitCard.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.DebitCard");
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
            this.setTitleBarVisibility();
        },
        setTitleBarVisibility: function() {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.ApplyForCards");
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.ApplyForCards");
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
            }
        },
        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            this.view.flxDebitCard.onClick = this.flxDebitCardOnclick;
            this.view.flxPrepaidCard.onClick = this.flxPrepaidCardOnclick;
        },
        
        flxBackOnClick : function () {
            /*
            var navManager = applicationManager.getNavigationManager();
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
            manageCardsModule.presentationController.showCardsHome();
            */
            var navManager = applicationManager.getNavigationManager(); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
        },

        flxCancelOnClick : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
        },

        flxDebitCardOnclick : function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("cardSelectionType", "debitCard"); 
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.navigateToNewCardFlow();
           
        },

        flxPrepaidCardOnclick : function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("cardSelectionType", "Prepaid Card"); 
            navMan.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmApplyForPrepaidCard"});
        },    

    };
});
