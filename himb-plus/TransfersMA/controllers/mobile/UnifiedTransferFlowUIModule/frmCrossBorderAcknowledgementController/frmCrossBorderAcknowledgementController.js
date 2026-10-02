define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateToDashboard);
            this.view.onNavigate = this.onNavigate;
        },

        preShow: function () {
            this.view.postShow = this.postShow;
            this.setTitleBarVisibility();
            this.dataMapping();
        },

        onNavigate: function (uidata) {
            if (!kony.sdk.isNullOrUndefined(uidata)) {
                this.updateAcknowledgementData(uidata);
            }
        },
        postShow: function () {
            this.view.btnBackToAccountsDashboard.onClick = this.navigateToDashboard;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        
        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.qrpayments.Acknowledgment");
                this.view.flxHeader.isVisible = true;
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.title = kony.i18n.getLocalizedString("i18n.qrpayments.Acknowledgment");
            }
        },
        
        dataMapping : function () {
            this.view.lblSuccess.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.SuccesMsg");
            this.view.lblReferenceNo.text = kony.i18n.getLocalizedString("i18n.PayAPerson.ReferenceNumber");
            this.view.lblCrossBorderDetails.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.Details");
            this.view.lblChooseAccount.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountNumber");
            this.view.lblVpa.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.VPA");
            this.view.lblConsentApplicableFor.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.ConsentApplicableFor");
            this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardCBTransaction");
            this.view.lblConsentStatus.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.ConsentStatus");
            this.view.btnBackToAccountsDashboard.text = kony.i18n.getLocalizedString("i18n.HBL.BackToAccDashboard");
        },

        navigateToDashboard: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
        },

        updateAcknowledgementData : function (data) {
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            var accName = ManageActivitiesPresenter.crossBorderSelectedAccount;
            if ((data !== null) && (data !== "") && (data !== undefined)) {
                var response = data;
                var res = JSON.parse(response);
                this.view.lblChooseAccountValue.text = accName;
                this.view.lblRefNoValue.text = res.responseData.uniqueTransactingId;
                this.view.lblVpaValue.text = res.responseData.vpaId;
                this.view.lblConsentStatusValue.text = res.responseData.consent;
            }
        },

    };
});

