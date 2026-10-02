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
            this.setTitleBarVisibility();
            this.segCardTypesData();
           
        },
        
        setTitleBarVisibility: function() {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "0dp";
            }
        },
        postShow: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
                this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
            }
            this.view.segCardTypes.onRowClick = this.segCardTypesOnClick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
         
        flxBackOnClick : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCardsConsent"});
        },        
      
        flxCancelOnClick : function () {
            var navManager = applicationManager.getNavigationManager(); 
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
        },
        
        
    segCardTypesData: function () {
            var data = [
              {
                "lblReason": "VISA"
              }, {
                "lblReason": "AMEX"
              }
            ];
      this.view.segCardTypes.setData(data);
    },

      segCardTypesOnClick : function () {
        var navManager = applicationManager.getNavigationManager(); 
        var data = this.view.segCardTypes.selectedRowItems[0];
        var selectedvalue = data.lblReason;
        navManager.setCustomInfo("selectedVirtualCardType", selectedvalue);
        navManager.setCustomInfo("flowTypeVirtual", "virtualCardTypeFlow");
        navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCardsConsent"});
      }
    };
});


