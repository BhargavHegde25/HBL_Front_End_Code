define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
            this.view.onNavigate = this.onNavigate;
        },

        preShow: function () {
            this.populateMockResponse();
            this.view.postShow = this.postShow;
            this.setTitleBarVisibility();

            var configManager = applicationManager.getConfigurationManager();
            var value = configManager.getMbUiMockSuccess();
            if (value === "1"){
               this. setMockData();
            }
        },
        
        setMockData: function () {
            this.setAcknowledgementData();
        },

        onNavigate: function (uidata) {
            if (!kony.sdk.isNullOrUndefined(uidata)) {
                var data = uidata;
            }
        },

        populateMockResponse: function () {
            var configurationManager = applicationManager.getConfigurationManager();
            let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
            if (Object.keys(clientProperties).length > 0) {
                configurationManager.setMbUiMockSuccess(clientProperties["MB_UI_MOCK_SUCCESS"]);
            }
        },

        postShow: function () {
            this.view.btnNewTransfer.onClick = this.onClickbtnNewTransfer;
            this.view.btnTransferActivities.onClick = this.onClickbtnTransferActivities;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        checkForExchangeRateError: function () {
       
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
        
    },

        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.qrpayments.Acknowledgment");
                this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top ="56dp";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.qrpayments.Acknowledgment");
                this.view.flxHeader.isVisible = false;
               
                this.view.flxMainContainer.top ="0dp";
            }
        },
        
        onClickbtnNewTransfer : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" });
        },
        onClickbtnTransferActivities: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "ManageActivitiesUIModule/frmTransferActivitiesTransfersEurope" });
        },
        
        setAcknowledgementData : function(){
    
            var navMan = applicationManager.getNavigationManager();
            var data = navMan.getCustomInfo("internationalVPATransferDetails");
            var today = new Date();
            dd = today.getDate();
            mm = today.getMonth() + 1;
            yyyy = today.getFullYear();
            this.view.lblRefNoValue.text = "53580720250130";
            var todaysDate = dd + "-" + mm + "-" + yyyy;
            this.view.lblFromValue.text = data.fromAccount;
            this.view.lblToValue.text = data.to;
            this.view.lblReceiversVpaValue.text = data.receiversVpa;
            this.view.lblCountryValue.text = data.country;
            this.view.lblTransferCurrencyValue.text = data.transferCurrency;
            this.view.lblAmountValue.text = data.amount;
            this.view.lblExchangeRateValue.text = data.exchangeRate;
            this.view.lblAmountInInrValue.text = data.amountInINR;
            this.view.lblCommissionOrChargeValue.text = "NPR" + " " + data.charge;
            this.view.lblTotalDebitAmountValue.text = "NPR 0.00";
            this.view.lblPurposeValue.text = data.purpose;
            this.view.lblRelationshipValue.text = data.relationship;
            this.view.lblDateValue.text = todaysDate;
            this.view.lblNotesValue.text = data.notes;
        },
    };
});
