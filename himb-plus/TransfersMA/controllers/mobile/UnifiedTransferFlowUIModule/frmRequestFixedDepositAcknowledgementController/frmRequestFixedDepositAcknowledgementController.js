define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateToDashboard);
        },

        preShow: function () {
            this.view.postShow = this.postShow;
            this.setTitleBarVisibility();
            this.dataMapping();
            this.setAcknowledgentData();
            this.view.lblAvailableBalance.isVisible = false;
            this.view.lblAvailableBalanceValue.isVisible = false;
        },

        postShow: function () {
            this.view.btnBackToAccountsDashboard.onClick = this.navigateToDashboard;
            this.view.btnOpenAnotherFixedDeposit.onClick = this.navigateToFixedDepositDashboard;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        
        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.RequestFDAcknowledgement");
                this.view.flxHeader.isVisible = true;
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.RequestFDAcknowledgement");
            }
        },
        
        dataMapping : function () {
            //this.view.lblSuccess.text = kony.i18n.getLocalizedString("i18n.HBL.FDSuccessMessage");
            this.view.lblReferenceNo.text = kony.i18n.getLocalizedString("i18n.PayAPerson.ReferenceNumber");
            this.view.btnBackToAccountsDashboard.text = kony.i18n.getLocalizedString("i18n.HBL.BackToAccDashboard");
            this.view.lbBranch.text = kony.i18n.getLocalizedString("i18n.unified.branchName");
        },

        setAcknowledgentData : function () {
            /*
            this.view.lblRefNoValue.text = "Ref1279933009";
            this.view.lblAvailableBalanceValue.text = "NPR 100000";
            this.view.lblFromAccountValue.text = "IronMan1234....7712";
            this.view.lblBranchValue.text = "THAMEL";
            this.view.lblAmountValue.text = "NPR 10000";
            this.view.lblDepositTypeValue.text = "Himal Remit FD";
            this.view.lblApplicableInterestRateValue.text = "3.2%";
            */

            // this.view.lblRefNoValue.text = "Ref1279933009";
            //this.view.lblAvailableBalanceValue.text = "NPR 100000";
            
            var navManager = applicationManager.getNavigationManager();
            var navData = navManager.getCustomInfo("getFixedDepositData");
            //formate the From Account Number
            var AccountFormatedArray = [];
            if (navData.fromAccount.length == 16) {
                AccountFormatedArray = ["XXXX", "XXXX", "XXXX"];
                AccountFormatedArray.push(navData.fromAccount.slice(-4));
            } else if (navData.fromAccount.length == 14) {
                AccountFormatedArray = ["XXXX", "XXXXXX"];
                AccountFormatedArray.push(navData.fromAccount.slice(-4));
            }
            var FormatedAccountNumber = AccountFormatedArray.join(" ");
            //formate Account Name
            var AccountNameResponse = navManager.getCustomInfo("fixedDepositEligibleAccounts");
            var AccountNumber = navData.fromAccount;
            var AccountHolderName = AccountNameResponse.filter((item)=>(item.accountID === navData.fromAccount))[0].AccountName;

            this.view.lblFromAccountValue.text = FormatedAccountNumber;
            this.view.lblFromAccountName.text = AccountHolderName;
            this.view.lblBranchValue.text = navData.branch;
            this.view.lblAmountValue.text =  navData.amount;
            this.view.lblDepositTypeValue.text =  navData.depositType;
            this.view.lblTenureTypeValue.text =  navData.tenure;
            this.view.lblApplicableInterestRateValue.text =  navData.interestRates;

        },

        navigateToDashboard : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("getFixedDepositData", null);
            navManager.setCustomInfo("depositTypeFlow", null);
            navManager.setCustomInfo("selectionDepositType", null);
            navManager.setCustomInfo("tenureTypeFlow", null);
            navManager.setCustomInfo("selectTenureType", null);
            navManager.setCustomInfo("selectedDataTenure",null);
            navManager.setCustomInfo("selectedDataDepositType",null);
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositAcknowledgement"
            });
        },

        navigateToFixedDepositDashboard : function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("getFixedDepositData", null);
            navManager.setCustomInfo("depositTypeFlow", null);
            navManager.setCustomInfo("selectionDepositType", null);
            navManager.setCustomInfo("tenureTypeFlow", null);
            navManager.setCustomInfo("selectTenureType", null);
            navManager.setCustomInfo("selectedDataTenure",null);
            navManager.setCustomInfo("selectedDataDepositType",null);
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositAcknowledgement"
            });
        },

        updateFormUI: function (context) {
            if (context.successresponse) {
				if (context.successresponse.transactionStatus == "Live" && context.successresponse.httpStatusCode == "200") {
					this.view.lblSuccess.text=kony.i18n.getLocalizedString("i18n.HBL.FDSuccess1");
                this.view.lblRefNoValue.text = context.successresponse.referenceId;
                this.view.lblAvailableBalanceValue.text = context.successresponse.availableBalance;
          } else if(context.successresponse.status =="success" && context.successresponse.transactionStatus == "Unapproved") {
			  this.view.lblSuccess.text=kony.i18n.getLocalizedString("i18n.HBL.FDSuccess2");
            this.view.lblRefNoValue.text = context.successresponse.arrangementId;
                this.view.lblAvailableBalanceValue.text = context.successresponse.availableBalance;
          }
            }
        },

    };
});

