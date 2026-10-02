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
            this.view.imgCard2.src = "amexcredit.png";
            this.setTitleBarVisibility();
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

        postShow : function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            this.view.flxDomestic.onClick = this.flxDomesticOnclick;
            this.view.flxInternational.onClick = this.flxInternationalOnclick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
  
        flxBackOnClick : function () { 
            var navManager = applicationManager.getNavigationManager(); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmApplyForPrepaidCard"});
        },

        flxCancelOnClick : function () {
            var navManager = applicationManager.getNavigationManager(); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
        },

        flxDomesticOnclick : function () {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var navManager = applicationManager.getNavigationManager(); 
          navManager.setCustomInfo("selectedCardSubType", "Domestic"); 
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          var param = {};
          manageCardsModule.presentationController.getCardLimits(param);
        },

        flxInternationalOnclick : function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager(); 
            navManager.setCustomInfo("selectedCardSubType", "International"); 
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            var param = {};
            manageCardsModule.presentationController.getCardLimits(param);
        },         
    };
});
