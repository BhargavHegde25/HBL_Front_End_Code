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
            this.setFDReviewData();
            this.dataMapping();
            this.setTitleBarVisibility();
            
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

        onClickCancel : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard"  });
        },
        dataMapping : function () {
            this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
            this.view.lblFromAccount.text = kony.i18n.getLocalizedString("i18n.accounts.FromAccount");  
            this.view.lblBranch.text = kony.i18n.getLocalizedString("i18n.unified.branchName");
            this.view.lblAmount.text = kony.i18n.getLocalizedString("i18n.billPayee.review.amount");
            this.view.lblDepositType.text = kony.i18n.getLocalizedString("i18n.HBL.DepositType");
            this.view.lblApplicableInterestRate.text = kony.i18n.getLocalizedString("i18n.HBL.ApplicableIntRate");
            this.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        },

    
        setFDReviewData : function () {
            /*
            this.view.lblFromAccountValue.text = "IronMan1234....7712";
            this.view.lblBranchValue.text = "THAMEL";
            this.view.lblAmountValue.text = "Himal Remit FD";
            this.view.lblDepositValueValue.text = "1 Year";
            this.view.lblApplicableInterestRateValue.text = "3.2%";

            navManager.setCustomInfo("getFixedDepositData", {
                "fromAccount": this.view.lblChooseAccountValue.text,
                "branch": this.view.lblBranchValue.text,
                "amount": this.view.txtAmount.text,
                "depositType": this.view.lblSelectDepositTypeValue.text,
                "tenure": this.view.lblSelectTenureValue.text,
                "interestRates" : this.view.lblInterestRatesValue.text,

            });
            */
            var navManager = applicationManager.getNavigationManager();
            var navData = navManager.getCustomInfo("getFixedDepositData");
            var AccountNameResponse = navManager.getCustomInfo("fixedDepositEligibleAccounts");
            var AccountHolderName = AccountNameResponse.filter((item) => (item.accountID === navData.fromAccount))[0].AccountName;
            
            this.view.lblFromAccountName.text = AccountHolderName;
            this.view.lblFromAccountValue.text = navData.fromAccount;
            this.view.lblBranchValue.text = navData.branch;
            this.view.lblAmountValue.text =  navData.amount;
            this.view.lblDepositValue.text =  navData.depositType;
            this.view.lblTenureTypeValue.text =  navData.tenure;
            this.view.lblApplicableInterestRateValue.text =  navData.interestRates;
        },

        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.ReviewFixedDepositDetails");
                this.view.flxFooter.top = "0%";
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.ReviewFixedDepositDetails");
                this.view.flxFooter.top = "3%";
            }
        },
        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.onClickCancel;
            this.view.btnContinue.onClick = this.btnContinue.bind(this);
        },
        
        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
          //  navManager.setCustomInfo("getFixedDepositData", null);
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositReviewDetails"
            });
        },

        btnContinue : function () {
			applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var navData = navManager.getCustomInfo("getFixedDepositData");
            var product = navManager.getCustomInfo("productId");
            var accType = navManager.getCustomInfo("Req_accountType");
            //var FromAccountNumber = navManager.getCustomInfo("selectedAccount");
            var depositeType = navData.depositType;
            var cleanAmountStr = navData.amount.replace(/,/g, '');
            var cleanAmount = parseFloat(cleanAmountStr).toFixed(2);
            var cleanTenure = navData.tenure.replace(/\s*Months\s*/i, '');
            var navData = navManager.getCustomInfo("getFixedDepositData");
           var fromAccountNumber = navData.fromAccount;
            var param = {
                "currency": "NPR",
                "productId": product,
                "intrestRate": navData.interestRates,
                "fromAccount": fromAccountNumber,//navData.fromAccount,
                "amount": cleanAmount,//navData.amount,
                "tenure": cleanTenure//navData.tenure
            }
         /*   if (depositeType == "Himal Remit FD" && accType != "HIMAL.REMIT") {
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.createFixedDepositWithNonSTPMBL(param);
            } else {
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.createFixedDepositWithSTPMBL(param);
            }*/
			            // Himal Remit FD goes STP only when the debit account's product is one of the codes
            // configured in the Fabric client property HIMAL_FD_ACCOUNT_CODES
            // (e.g. "HIMAL.REMIT,HIMAL.REMIT.WOCHQ"). Other deposit types are always STP.
            var himalCodesProp = applicationManager.getConfigurationManager().HIMAL_FD_ACCOUNT_CODES;
            var himalCodes = (himalCodesProp ? String(himalCodesProp) : "HIMAL.REMIT")
                .split(",")
                .map(function (code) { return code.trim().toUpperCase(); })
                .filter(function (code) { return code !== ""; });
            var isHimalAccount = !kony.sdk.isNullOrUndefined(accType)
                && himalCodes.indexOf(String(accType).trim().toUpperCase()) !== -1;

            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            if (depositeType == "Himal Remit FD" && !isHimalAccount) {
                ManageActivitiesPresenter.createFixedDepositWithNonSTPMBL(param);
            } else {
                ManageActivitiesPresenter.createFixedDepositWithSTPMBL(param);
            }
        },

        checkForToastMessageCommonError: function () {       
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
        },

    };
});
