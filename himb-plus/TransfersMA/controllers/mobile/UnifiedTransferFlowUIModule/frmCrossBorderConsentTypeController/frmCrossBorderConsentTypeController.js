define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },

        preShow: function () {
            this.setConsentSegmentData();
            this.view.postShow = this.postShow;
            this.setTitleBarVisibility();
        },

        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.segConsent.onRowClick = this.segConsentOnClick;
        },

        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsent");
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsent");
                this.view.flxHeader.isVisible = false;
            }
        },

        flxBackOnClick: function () {
            /*
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" });
            */
            var navManager = applicationManager.getNavigationManager();
            navManager.goBack();
        },

        setConsentSegmentData: function () {
            var data = [
                {
                    "lblConsent": kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardConsent")

                }, {
                    "lblConsent": kony.i18n.getLocalizedString("i18n.HBL.CBC.OutwardwardConsent")

                }
            ];
            this.view.segConsent.setData(data);
        },

        segConsentOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            var data = this.view.segConsent.selectedRowItems[0];
            var selectedvalue = data.lblConsent;
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false, { "crossBorderType": selectedvalue });
        }
    };
});

