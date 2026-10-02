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
            this.setTitleBarVisibility();
            this.setTnCData();
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.onClickCancel,
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
        },

        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.onClickCancel;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        onClickCancel : function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("termsAndConditionType");
            if (flow === "topUpVirtualTnc") {
            navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"});
              }else if (flow === "fixedDepositTnc") {
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard"});
            }
        },

        setTnCData: function () {
            var navManager = applicationManager.getNavigationManager();
             var flow = navManager.getCustomInfo("termsAndConditionType");
             if (flow === "topUpVirtualTnc") {
             var data = "I understand the exposure of risk associated on online card payment / transactions. I am fully committed to protect my card data from possible missuses. \nI shall be fully committed to obey the rules and regulation as prescribed by Nepal Government, Nepa Rastra Bank and Himalayan Bank Limited and use the card prudently for payment of goods and services allowed by law of land, else I shall be fully liable of consequences thereof. \nI authorize the bank to STOP the card immediately if identified in illegal payment activity or breach of above Terms & Conditions. \n\nTerms & Conditions\n\nCustomers must abide by Foreign Exchange Act 2019 and Asset (Money) Laundering (AML) Act 2064.\nIf asked by Regulatory Authority or Central Bank or Card issuing bank, customer must produce and provide the invoices and other transaction details to the bank.. \nBank reserve the right to STOP the card immediately if customer identified in illegal payment activity or breach of above terms and conditions.";
            }else if (flow === "fixedDepositTnc") {
            var dataTnC = navManager.getCustomInfo("TermsAndConditionsData");
            var data = dataTnC.termsAndConditionsContent;
            }
            this.view.rtxInfo.text = data;
        },

        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.TermsAndConditions");
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.ProfileManagement.TermsAndConditions");
                this.view.flxHeader.isVisible = false;
            }
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("termsAndConditionType");
            if (flow === "topUpVirtualTnc") {
             navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmReqVirtualDollerCard"});
            }else if (flow === "fixedDepositTnc") {
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
            }
        },

    };
});

