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
            this.setVerifyDetailsData();

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
            this.view.btnTransfer.onClick = this.onClickbtnTransfer;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },


        setVerifyDetailsData: function () {
            var navMan = applicationManager.getNavigationManager();
            var data = navMan.getCustomInfo("internationalVPATransferDetails");
            /*
            var today = new Date();
            dd = today.getDate();
            mm = today.getMonth() + 1;
            yyyy = today.getFullYear();
            var todaysDate = dd + "-" + mm + "-" + yyyy;
            */
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            day = (day < 10) ? '0' + day : day;
            month = (month < 10) ? '0' + month : month;
            var todaysDate = day + '-' + month + '-' + year;
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
        
        checkForExchangeRateError: function () {
       
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
        
    },
        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.accountsweeps.verifyDetails");
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top ="56dp";
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.accountsweeps.verifyDetails");
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top ="0dp";
            }
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" }); 
        },

        onClickCancel: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" }); 
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferInternational/frmVerifyDetails"
            });
        },

        onClickbtnTransfer: function () {
            
            var navMan = applicationManager.getNavigationManager();
            var data = navMan.getCustomInfo("getValidateCustomerData");
            var params =
            {
                "orgRequestUniqueId": data.orgRequestUniqueId,
                "endToEndId": data.endToEndId,
                "amount": this.view.lblAmountValue.text
            };
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });

            ManageActivitiesPresenter.getPayment(params);

           
        },

        enableContinueButton: function () {
            this.view.btnTransfer.setEnabled(true);
            this.view.btnTransfer.skin = "sknBtn055BAF26px";
        },
        disableContinueButton: function () {
            this.view.btnTransfer.setEnabled(false);
            this.view.btnTransfer.skin = "sknBtna0a0a0SSPReg26px";
        },

        navigateToAcknowledgement: function () {
            var notes = this.view.txtNotes.text;
            if (notes.length > 0) {
                this.enableContinueButton();
            }
            else {
                this.disableContinueButton();
            }
        },
    };
});
