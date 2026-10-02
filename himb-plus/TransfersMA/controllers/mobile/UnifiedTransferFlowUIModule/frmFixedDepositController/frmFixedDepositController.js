define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },

        preShow : function () {
            this.setTitleBarVisibility();
            this.setFixedDepositEligibleAccounts();
            this.disableButton(this.view.btnContinue);
            this.view.postShow = this.postShow;
            this.dataMapping();
            this.dummyDataMapping();
            this.setFlowActions();
            this.setAccountDetails();
            this.setDefaultFixedDepositAccount();
            this.setDataForDepositType();
            this.setDataForTenure();
        
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.flxBackOnClick,
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
            this.view.imgTnC.src = "hbluncheck.png";
            this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmHBLUnifiedDashboard" || previousForm === "frmUnifiedDashboard") {
            this.view.txtAmount.text = "";
            }
            //this.view.txtAmount.text = "";
            //  this.enableOrDisableBtnContinue();
            this.enableOrDisableContinue();
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmRequestFixedDepositReviewDetails") {
                var navManager = applicationManager.getNavigationManager();
                var data = navManager.getCustomInfo("getFixedDepositData");
                this.view.lblAccountName.text = data.accName;
                this.view.lblAccountNumber.text = data.fromAccount;
                this.view.lblBalance.text = data.balance;
                this.view.lblAccountType.text = data.acctype;
                this.view.lblBranchValue.text = data.branch;
                this.view.txtAmount.text = data.amount;
                this.view.lblSelectDepositTypeValue.text = data.depositType;
                this.view.lblSelectTenureValue.text = data.tenure;
                this.view.lblInterestRatesValue.text = data.interestRates;
            }
            //frmRequestFixedDepositAcknowledgement
            if (previousForm === "frmRequestFixedDepositAcknowledgement") {
                // this.view.lblAccountName.text = data.fromAccount;
                //this.view.lblBranchValue.text = data.branch;
                this.view.txtAmount.text = "";
                this.view.lblSelectDepositTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdDepositTypePlaceholder");
                this.view.lblSelectTenureValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdTenurePlaceholder");
                // this.view.lblInterestRatesValue.text = data.interestRates;
            }
        },

        enableOrDisableBtnContinue: function () {
            var scope = this;
            if (scope.view.imgTnC.src === "hbluncheck.png") {
                scope.view.btnContinue.setEnabled(false);
                scope.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
                scope.view.btnContinue.focusSkin = "sknBtnE2E9F0Rounded";
            } 
        },
        
        enableOrDisableContinue: function () {
            var fromAccount = this.view.lblAccountName.text;
            var branch = this.view.lblBranchValue.text;
            var amount = this.view.txtAmount.text;
            var depositType = this.view.lblSelectDepositTypeValue.text;
            var tenure = this.view.lblSelectTenureValue.text;
            var interestRates = this.view.lblInterestRatesValue.text;
            var imgCheckbox = this.view.imgTnC.src;
            if (
                (!kony.sdk.isNullOrUndefined(fromAccount)) &&
                (!kony.sdk.isNullOrUndefined(branch)) &&
                ((amount !== null) && (amount !== "") && (amount !== undefined))&&
                (!kony.sdk.isNullOrUndefined(interestRates)) &&
                (depositType !== kony.i18n.getLocalizedString("i18n.HBL.FdDepositTypePlaceholder")) &&
                (tenure !== kony.i18n.getLocalizedString("i18n.HBL.FdTenurePlaceholder")))
            //&&(imgCheckbox === "checkbox_ticked.png")) 
            {
                this.enableContinueButton();
            }
			else{
				this.disableContinueButton();
			}
        },
        enableContinueButton: function () {
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
        },
        disableContinueButton: function () {
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        },
        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.RequestFixedDeposit");
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "75dp";
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.RequestFixedDeposit");
                this.view.flxHeader.isVisible = false;
                this.view.flxMainContainer.top = "15dp";
            }
        },
        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
            this.view.btnContinue.onClick = this.btnContinue.bind(this);
            this.view.flxChooseAccount.onClick = this.flxChooseAccountOnclick;
            this.view.flxSelectDepositType.onTouchStart = this.flxSelectDepositTypeOnclick;
            this.view.flxSelectTenure.onTouchStart = this.flxSelectTenureOnclick;
            this.view.flxTnCIcon.onClick = this.flxTnCIconOnclick;
            //this.view.txtAmount.onTextChange = this.navigateToVerifyScreen;
            this.view.txtAmount.onTextChange = this.onAmountTextChange.bind(this);
            this.view.txtAmount.onEndEditing = this.onAmountEndEditing.bind(this);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        flxChooseAccountOnclick: function () {
            var scope = this;
            applicationManager.getPresentationUtility().showLoadingScreen();
            var fromAccount = applicationManager.getNavigationManager().getCustomInfo("fixedDepositEligibleAccounts");
			fromAccount=fromAccount.filter(function(acc){
				if(acc.currencyCode=="NPR"){
					return acc;
				}
			});
            var PopupObj = {
                "accounts": fromAccount,
                "flowType": "FD",
                "rowClickCallback": scope.onRowSelection.bind(this)
            };
            applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope, PopupObj);
        },

        onRowSelection: function (row) {
            this.view.flxPopupfrombottom.isVisible = false;
            var data = row[0];
            this.view.lblBalance.text = data.lblBalance.text;
            this.view.lblAccountNumber.text = data.lblAccNumber;
            this.view.lblAccountName.text = data.lblAccname.text;
            this.view.lblAccountType.text = data.lblAccType.text;
            this.enableOrDisableContinue();
        },

        navigateToVerifyScreen: function () {
            var amount = this.view.txtAmount.text;
            if (!kony.sdk.isNullOrUndefined(amount)) {
                if (amount.length > 0) {
                    this.enableOrDisableContinue();
                } else {
                    this.disableButton(this.view.btnContinue);
                }
            }
        },

        onAmountTextChange : function () {
            try {
                var rawValue = this.view.txtAmount.text;
                var amount = parseFloat(rawValue);
                if (isNaN(amount)) {
                    this.view.txtAmount.text = "";
                }
                this.enableOrDisableContinue();
            } catch (e) {
                kony.print("****************onAmountTextChange Error**************" + e);
            }
        },

        onAmountEndEditing : function () {
            try {
                var rawValue = this.view.txtAmount.text;
                rawValue = rawValue.replace(/[^0-9.]/g, '');
                var amount = parseFloat(rawValue);
                if (!isNaN(amount)) {
                    var formatted = amount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    this.view.txtAmount.text = formatted;
                } else {
                    this.view.txtAmount.text = "";
                }
                this.enableOrDisableContinue();
            } catch (e) {
                kony.print("****************onAmountEndEditing Error**************" + e);
            }
        },
        formatAmount: function () {
            var amount = this.view.txtAmount.text;
            var formattedCurrency = CommonUtilities.formatCurrencyWithCommas(amount, true);
            this.view.txtAmount.text = formattedCurrency;
        },
        dataMapping: function () {
            this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
            this.view.lblChooseAccount.text = kony.i18n.getLocalizedString("i18n.accounts.FromAccount");
            this.view.lblBranch.text = kony.i18n.getLocalizedString("i18n.unified.branchName");
            this.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        },

        dummyDataMapping: function () {
			
            
            //this.view.lblSelectDepositTypeValue.text = "Himal Remit FD";
            //this.view.lblSelectTenureValue.text = "1 Year";
              var navManager = applicationManager.getNavigationManager();
            var previousForm = kony.application.getPreviousForm().id;
            var navManager = applicationManager.getNavigationManager();
            var dashboardFlow = navManager.getCustomInfo("fixedDepositFromDashboard");
            var finalRate=navManager.getCustomInfo("selectedDataRate");
            if (previousForm === "frmRequestFixedDepositAcknowledgement" || dashboardFlow === true) {
                this.view.lblInterestRatesValue.text = "0.00";
            } else if (!kony.sdk.isNullOrUndefined(finalRate)) {
                var convertedRate = CommonUtilities.formatCurrencyWithCommas(finalRate, true);
                this.view.lblInterestRatesValue.text = convertedRate;
            }
        },

        disableButton: function (button) {
            button.setEnabled(false);
            button.skin = "sknBtnE2E9F0Rounded";
            button.focusSkin = "sknBtnE2E9F0Rounded";
        },

        enableButton: function (button) {
            button.setEnabled(true);
            button.skin = "sknBtn0095e4RoundedffffffSSP26px";
            button.focusSkin = "sknBtn0095e4RoundedffffffSSP26px";
        },

        setFlowActions: function () {
            var scope = this;

            this.view.btnTnC.onClick = function () {
                scope.getTermsAndConditionForFd();
            };
            
            		
		this.view.txtAmount.onTouchEnd = function(){
            let enteredAmount = scope.view.txtAmount.text;
          };
          
          
        this.view.txtAmount.onTouchStart = function(){
            
          };
        },
        flxTnCIconOnclick: function () {
            var scope = this;
                if (scope.view.imgTnC.src === "hbluncheck.png") {
                    scope.view.imgTnC.src = "checkbox_ticked.png";
                } else {
                    scope.view.imgTnC.src = "hbluncheck.png";
                }
            this.enableOrDisableContinue();
        },

        getTermsAndConditionForFd: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("accountSelectionFD", true);
            navManager.setCustomInfo("termsAndConditionType", "fixedDepositTnc");
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getTermsandConditions();
            applicationManager.getPresentationUtility().showLoadingScreen();
        },

        flxSelectDepositTypeOnclick: function () {
			var scope=this;
            var navManager = applicationManager.getNavigationManager();
            var option = "DEPOSITTYPE";
            var depositTypeFlow = true;
            navManager.setCustomInfo("depositTypeFlow", depositTypeFlow);
            navManager.setCustomInfo("selectionDepositType", option);
            var navManager = applicationManager.getNavigationManager();
			var data = [
              {
                "lblFrequency": "Normal FD"
              }, {
                "lblFrequency": "Himal Remit FD"
              }, {
                "lblFrequency": "Structured FD"
              },
            ];
			var obj={"title":"Select Deposit Type","key":"lblFrequency","Segdata":data,"rowClickCallback":scope.depositSelection.bind(scope)}
			applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
            //navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositChooseOptions" });
        },
		depositSelection:function(res){
			try{
				var navManager = applicationManager.getNavigationManager();
			 var selectedvalue = res[0].lblValue;
        var valueSelected;
        if(selectedvalue)
        this.view.lblSelectDepositTypeValue.text=selectedvalue;
        if(selectedvalue=="Normal FD"){
            valueSelected="1"
        }else if(selectedvalue=="Himal Remit FD"){
            valueSelected="2"
        }else {
            valueSelected="3"
        }
             navManager.setCustomInfo("setDataforDepositType", null);
        navManager.setCustomInfo("selectedDataDepositType", selectedvalue);
        var param = {
                    "depositType": valueSelected
                }
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.getFixedDepositTenureIntrestMBL(param);
                this.view.flxPopupfrombottom.setVisibility(false);
                this.enableOrDisableContinue();
            } catch (e) {
                kony.print("-------------------Error in depositSelection-----------" + e);
            }

        },

        flxSelectTenureOnclick: function () {
			var scope=this;
            var navManager = applicationManager.getNavigationManager();
            var option = "TENURE";
            var tenureFlow = true;
            navManager.setCustomInfo("tenureTypeFlow", tenureFlow);
            navManager.setCustomInfo("selectTenureType", option);
			var tenureData=navManager.getCustomInfo("Tenureresponsedata");
            if(tenureData){
            var data=[];
			for(i=0;i<tenureData.length;i++){
				var rowData={};
			rowData.lblFrequency=tenureData[i].term+" Months";
			data.push(rowData);
			}
			var obj={"title":"Select Tenure Type","key":"lblFrequency","Segdata":data,"rowClickCallback":scope.tenureSelection.bind(scope)}
			applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
            }
            else{
                applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.common.OoopsServerErrormb"));
            }
        },

        tenureSelection: function (res) {
            var navManager = applicationManager.getNavigationManager();
            var data = res[0];
            var selectedvalue = data.lblValue;
            if (selectedvalue)
                this.view.lblSelectTenureValue.text = selectedvalue;
            var tenureData = navManager.getCustomInfo("Tenureresponsedata");
            var tenure = tenureData.filter(function (a) {
                if (a.term == selectedvalue.split(' ')[0]) {
                    return a;
                }
            });
            var selectedRate = tenure[0].rate;
            var productId = tenure[0].aaProductId;
            navManager.setCustomInfo("setDataforTenureType", null);
            navManager.setCustomInfo("selectedDataTenure", selectedvalue);
            navManager.setCustomInfo("selectedDataRate", selectedRate);
            navManager.setCustomInfo("productId", productId);
            if (!kony.sdk.isNullOrUndefined(selectedRate)) {
                var convertedRate = CommonUtilities.formatCurrencyWithCommas(selectedRate, true);
                this.view.lblInterestRatesValue.text = convertedRate;
            }
            this.view.flxPopupfrombottom.isVisible = false;
            this.enableOrDisableContinue();
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("selectedDataTenure",null);
            navManager.setCustomInfo("selectedDataDepositType",null);
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard"  });
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit"
            });
        },

        flxChooseAccountOnclickOld: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("accountSelectionFD", true);
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getFromAccountsFD();
            applicationManager.getPresentationUtility().showLoadingScreen();
        },

        setAccountDetails: function () {
            var presenter = applicationManager.getModulesPresentationController({
                "moduleName": "QRPaymentsUIModule",
                "appName": "TransfersMA"
            });

            if ((presenter.getTransObject().fromProcessedName !== null) && (presenter.getTransObject().fromProcessedName !== "") && (presenter.getTransObject().fromProcessedName !== undefined)) {
                var formattedName = presenter.getTransObject().fromProcessedName;
            }
			var formatUtility = applicationManager.getFormatUtilManager();
            var data = applicationManager.getDefaultDashboardObj();
            var acctId = data.Accounts[0].account_id;
            var name = data.Accounts[0].accountName;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("defaultAccId", acctId);
            var formattedAccountName = name + "...." + acctId.slice(-4);
            var previousForm = kony.application.getPreviousForm().id;

            var dashboardFlow = navManager.getCustomInfo("fixedDepositFromDashboard");
            if ((dashboardFlow === true)) {
                this.view.lblAccountName.text = name;
                this.view.lblAccountNumber.text = acctId;
				this.view.lblBalance.text=formatUtility.formatAmountandAppendCurrencySymbol(data.Accounts[0].availableBalance, data.Accounts[0].currencyCode);
				this.view.lblAccountType.text=data.Accounts[0].accountType;
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("fixedDepositFromDashboard", null);
            } else if ((presenter.getTransObject().fromAccountNumber !== null) && (presenter.getTransObject().fromAccountNumber !== "") && (presenter.getTransObject().fromAccountNumber !== undefined)) {
                if (previousForm === "frmRequestFixedDepositFromAccount" || previousForm === "frmRequestFixedDepositChooseOptions") {
                    var accNo = presenter.getTransObject().fromAccountNumber;
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("selectedAccount", accNo);
                    this.view.lblAccountName.text = name;
                    this.view.lblAccountNumber.text = accNo;
					this.view.lblBalance.text=formatUtility.formatAmountandAppendCurrencySymbol(data.Accounts[0].availableBalance, data.Accounts[0].currencyCode);
				this.view.lblAccountType.text=data.Accounts[0].accountType;
                } else {
                    this.view.lblAccountName.text = name;
                    this.view.lblAccountNumber.text = acctId;
					this.view.lblBalance.text=formatUtility.formatAmountandAppendCurrencySymbol(data.Accounts[0].availableBalance, data.Accounts[0].currencyCode);
				this.view.lblAccountType.text=data.Accounts[0].accountType;
                }

            } else {
                this.view.lblAccountName.text = name;
                this.view.lblAccountNumber.text = acctId;
				this.view.lblBalance.text=formatUtility.formatAmountandAppendCurrencySymbol(data.Accounts[0].availableBalance, data.Accounts[0].currencyCode);
				this.view.lblAccountType.text=data.Accounts[0].accountType;
            }

            var fdAccountName = this.view.lblAccountName.text;
            navManager.setCustomInfo("requestFixedDepositAccountName", fdAccountName);
            var fdChoosenAccount = this.view.lblAccountNumber.text;
            navManager.setCustomInfo("requestFixedDepositChoosenAccount", fdChoosenAccount);
        },

        setDefaultFixedDepositAccount: function () {
            var navManager = applicationManager.getNavigationManager();
            var previousForm = kony.application.getPreviousForm().id;
            var payerName;
            var payerAccNumber;
            var currencyCode;
            var balance;
            var accType;
            var data1 = navManager.getCustomInfo("FDfromAccData");
            var presenter = applicationManager.getModulesPresentationController({
                "moduleName": "QRPaymentsUIModule",
                "appName": "TransfersMA"
            });
            if ((presenter.getTransObject().fromProcessedName !== null) && (presenter.getTransObject().fromProcessedName !== "") && (presenter.getTransObject().fromProcessedName !== undefined)) {
                var formattedName = presenter.getTransObject().fromProcessedName;
            }
            var navManager = applicationManager.getNavigationManager();
            var dashboardFlow = navManager.getCustomInfo("fixedDepositFromDashboard");
            if ((dashboardFlow === true)) {
                var userObj = applicationManager.getUserPreferencesManager().getUserObj();
                var default_account_deposit = userObj['default_account_deposit'];
                if (!kony.sdk.isNullOrUndefined(default_account_deposit)) {
                    var navManager = applicationManager.getNavigationManager();
                    var response = navManager.getCustomInfo("fixedDepositEligibleAccounts");
                    if ((response !== null) && (response !== "") && (response !== undefined)) {
                        for (i = 0; i < response.length; i++) {
                            if (response[i].Account_id == default_account_deposit) {
                                response[i].fromAccountBalance = response[i].availableBalance;
                                payerName = response[i].accountName;
                                payerAccNumber = response[i].Account_id;
                                currencyCode = response[i].currencyCode;
                                balance = response[i].availableBalance;
                                accType = response[i].accountType;
                                navManager.setCustomInfo("FDfromAccData", response[i]);
                            }
                        }
                    }
                    var formattedDefaultDepositAccount = payerName + "...." + payerAccNumber.slice(-4);
                    //this.view.lblAccountNumber.text = payerAccNumber;
                    //this.view.lblAccountName.text = formattedDefaultDepositAccount;
                    var formattedCurrency = CommonUtilities.formatCurrencyWithCommas(balance, true);
                    var formattedBalance = currencyCode + " " + formattedCurrency;
                    this.view.lblBalance.text = formattedBalance;
                    this.view.lblAccountNumber.text = payerAccNumber;
                    this.view.lblAccountName.text = payerName;
                    this.view.lblAccountType.text = accType;

                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("fixedDepositFromDashboard", null);
                    var data = {
                        "accName": payerName,
                        "accId": payerAccNumber
                    };
                    navManager.setCustomInfo("fDAccountSelectedDetails", data);
                } else {
                    var data = applicationManager.getDefaultDashboardObj();
                    if (kony.sdk.isNullOrUndefined(default_account_deposit)) {
                        var acctId = data.Accounts[0].account_id;
                        var name = data.Accounts[0].accountName;
                        var balance = data.Accounts[0].accountName;
                        var accType = data.Accounts[0].accountType;
                        var currencyCode = data.Accounts[0].currencyCode;
                        var formattedCurrency = CommonUtilities.formatCurrencyWithCommas(balance, true);
                        var formattedBalance = currencyCode + " " + formattedCurrency;
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("defaultAccId", acctId);
                        //var formattedAccountName = name + "...." + acctId.slice(-4);
                        this.view.lblBalance.text = formattedBalance;
                        this.view.lblAccountNumber.text = acctId;
                        this.view.lblAccountName.text = name;
                        this.view.lblAccountType.text = accType;

                        this.view.lblAccountName.text = formattedAccountName;
                        var data = {
                            "accName": formattedAccountName,
                            "accId": acctId
                        };
                        navManager.setCustomInfo("fDAccountSelectedDetails", data);
                        navManager.setCustomInfo("fixedDepositFromDashboard", null);
                    }
                }
            } else if ((presenter.getTransObject().fromAccountNumber !== null) && (presenter.getTransObject().fromAccountNumber !== "") && (presenter.getTransObject().fromAccountNumber !== undefined)) {
                var previousForm = kony.application.getPreviousForm().id;
                if (previousForm === "frmRequestFixedDepositFromAccount") {
                    var navMan = applicationManager.getNavigationManager();
                    var flowType = navMan.getCustomInfo("flowTypeFromAccountFDSelection");
                    if (flowType == true) {
                        var presenter = applicationManager.getModulesPresentationController({
                            "moduleName": "QRPaymentsUIModule",
                            "appName": "TransfersMA"
                        });
                        if ((presenter.getTransObject().fromProcessedName !== null) && (presenter.getTransObject().fromProcessedName !== "") && (presenter.getTransObject().fromProcessedName !== undefined)) {
                            var formattedName = presenter.getTransObject().fromProcessedName;
                        }
                        var accNo = presenter.getTransObject().fromAccountNumber;
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("selectedAccount", accNo);
                        this.view.lblAccountName.text = formattedName;
                        this.view.lblAccountNumber.text = data1.accountID;
                        this.view.lblBalance.text = data1.availableBalance;
                        this.view.lblAccountType = data1.accountType;
                        this.view.lblAccountNumber.text = accNo;
                        var data = {
                            "accName": formattedName,
                            "accId": accNo
                        };
                        navManager.setCustomInfo("fDAccountSelectedDetails", data);
                    }
                }
            } else if (previousForm === "frmRequestFixedDepositChooseOptions") {
                var navManager = applicationManager.getNavigationManager();
                var details = navManager.getCustomInfo("fDAccountSelectedDetails");
                this.view.lblAccountName.text = details.accName;
                this.view.lblAccountNumber.text = details.accId;
            }
            else {
                var navManager = applicationManager.getNavigationManager();
                /*
                var details = navManager.getCustomInfo("fDAccountSelectedDetails");
                this.view.lblAccountName.text = details.accName;
                this.view.lblAccountNumber.text = details.accId;
                */
                var response = navManager.getCustomInfo("fixedDepositEligibleAccounts");
                if ((response !== null) && (response !== "") && (response !== undefined)) {
                    for (i = 0; i < response.length; i++) {
                        if (response[i].Account_id == default_account_deposit) {
                            response[i].fromAccountBalance = response[i].availableBalance;
                            payerName = response[i].accountName;
                            payerAccNumber = response[i].Account_id;
                            currencyCode = response[i].currencyCode;
                            balance = response[i].availableBalance;
                            accType = response[i].accountType;
                            navManager.setCustomInfo("FDfromAccData", response[i]);
                        }
                    }
                }
            }
            var fdAccountName = this.view.lblAccountName.text;
            navManager.setCustomInfo("requestFixedDepositAccountName", fdAccountName);
            var fdChoosenAccount = this.view.lblAccountNumber.text;
            var scope = this;
            var configManager = applicationManager.getConfigurationManager();
            for (var i = 0; i < configManager.userAccounts.length; i++) {
                if (fdChoosenAccount == configManager.userAccounts[i].accountID) {
                    scope.view.lblBranchValue.text = configManager.userAccounts[i].bankName;
                    navManager.setCustomInfo("Req_accountType", configManager.userAccounts[i].productId);
                }
            }
            navManager.setCustomInfo("requestFixedDepositChoosenAccount", fdChoosenAccount);
        },


        setFixedDepositEligibleAccounts: function () {
            var accountObj = applicationManager.getAccountManager();
            var acctInfo = accountObj.getSavingsAndCheckingsAccounts();
            var filterList = function (input) {
                try {
                    let accountData = JSON.parse(JSON.stringify(input));
                    let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
                    return filteredAccountData;
                } catch (err) {
                    return input;
                }
            };
            var filterListBasedOnCurrency = function (input) {
                try {
                    let accountData = JSON.parse(JSON.stringify(input));
                    //let filteredAccountData = accountData.filter(item => ((["NPR"].includes(item["currencyCode"].toUpperCase()))));
                    let filteredAccountData = accountData.filter(item => {
                        return (item["accountType"].toUpperCase() === "SAVINGS" && !(["CLOSED"].includes(item["accountStatus"].toUpperCase())));
                    });
                    return filteredAccountData;
                } catch (err) {
                    return input;
                }
            };
            if (!kony.sdk.isNullOrUndefined(acctInfo)) {
                var acctInfoInp = filterList(acctInfo);
                var acctInfoBasedOnCurrency = filterListBasedOnCurrency(acctInfoInp);
                if (acctInfoBasedOnCurrency.length === 0) {
                    this.showErrorPopup();
                } else {
                    var navMan = applicationManager.getNavigationManager();
                    navMan.setCustomInfo("fixedDepositEligibleAccounts", acctInfoBasedOnCurrency);
                }
            }
        },


        showErrorPopup: function () {
           /* kony.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "",
                "message": kony.i18n.getLocalizedString("i18n.HBL.RequestFDError"),
                "alertHandler": this.alertCallback,
                "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
            },*/ 
			applicationManager.getPresentationUtility().Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "",
                "message": kony.i18n.getLocalizedString("i18n.HBL.RequestFDError"),
                "alertHandler": this.alertCallback,
                "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
            },{});
        },
        alertCallback: function () {
        },
        setDataForDepositType: function () {
            var navManager = applicationManager.getNavigationManager();
            var status = navManager.getCustomInfo("selectedDataDepositType");
            var flow = navManager.getCustomInfo("accountSelectionFD");
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmHBLUnifiedDashboard" || previousForm === "frmUnifiedDashboard" || previousForm === "frmRequestFixedDepositFromAccount") {
                this.view.lblSelectDepositTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdDepositTypePlaceholder");
            } else if ((status !== null) && (status !== "") && (status !== undefined)) {
                if (previousForm === "frmRequestFixedDepositChooseOptions") {
                this.view.lblSelectDepositTypeValue.text = status;
                //navManager.setCustomInfo('selectedDataDepositType', null);
                navManager.setCustomInfo("depositTypeFlow", null);
                navManager.setCustomInfo("selectionDepositType", null);
                }
            } else if (flow === true) {
                this.view.lblSelectDepositTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdDepositTypePlaceholder");
                navManager.setCustomInfo('accountSelectionFD', null);
            }else{
                this.view.lblSelectDepositTypeValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdDepositTypePlaceholder");
            }
        },
        
        
        setDataForTenure : function () {
            var navManager = applicationManager.getNavigationManager();
            var status = navManager.getCustomInfo("selectedDataTenure");
            var flow = navManager.getCustomInfo("accountSelectionFD");
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmHBLUnifiedDashboard" || previousForm === "frmUnifiedDashboard" || previousForm === "frmRequestFixedDepositFromAccount") {
                this.view.lblSelectTenureValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdTenurePlaceholder");
            } else if ((status !== null) && (status !== "") && (status !== undefined)) {
                if (previousForm === "frmRequestFixedDepositChooseOptions") {
                this.view.lblSelectTenureValue.text = status;
                //navManager.setCustomInfo('selectedDataTenure', null);
                navManager.setCustomInfo("tenureTypeFlow", null);
                navManager.setCustomInfo("selectTenureType", null);
                }
            } else if (flow === true) {
                this.view.lblSelectTenureValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdTenurePlaceholder");
                navManager.setCustomInfo('accountSelectionFD', null);
            } else {
                this.view.lblSelectTenureValue.text = kony.i18n.getLocalizedString("i18n.HBL.FdTenurePlaceholder");
            }

        },

        btnContinue: function () {
            var scope=this;
            var navManager = applicationManager.getNavigationManager();
            /* for (var i = 0; i < scope_configManager.userAccounts.length; i++) {
                     accId = applicationManager.getNavigationManager().getCustomInfo("AccountIdconsent");
                     if (accId == scope_configManager.userAccounts[i].accountID) {
                         navManager.setCustomInfo("Req_accountType", scope_configManager.userAccounts[i].productId);
                     }
                 }*/
            var strucktureMinAmt = applicationManager.getConfigurationManager().MIN_AMT_STRUCTURE_FD;
            var frmAccAmount = navManager.getCustomInfo("FDfromAccData");
            var minAmt = navManager.getCustomInfo("Tenureresponsedata");
            var amttext = this.view.txtAmount.text;
            if (amttext.indexOf(',') != -1) {
                amttext = amttext.replace(/,/g, "");
            }
            var amount = Number(amttext);
            var minElgAmount = Number(minAmt[0].minEligibilityAmt);
            if (minAmt[0].aaProductId != "STRUCTURED") {
                if (amount < minElgAmount) {
                    var errmsg = kony.i18n.getLocalizedString("i18n.mb.FD.minAmterrormsg") + " NPR " + CommonUtilities.formatCurrencyWithCommas(minAmt[0].minEligibilityAmt, true);
                    applicationManager.getDataProcessorUtility().showToastMessageError(this, errmsg);
                    this.disableContinueButton();
                    return;
                }
                else if (frmAccAmount && Number(frmAccAmount.fromAccountBalance) < amount) {
                    var errmsg = kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg") + " NPR " + CommonUtilities.formatCurrencyWithCommas(frmAccAmount.fromAccountBalance, true);
                    applicationManager.getDataProcessorUtility().showToastMessageError(this, errmsg);
                    this.disableContinueButton();
                    return;
                }
            }
            else {
                if (amount < strucktureMinAmt) {
                    var errmsg = kony.i18n.getLocalizedString("i18n.mb.FD.minAmterrormsg") + " NPR " + CommonUtilities.formatCurrencyWithCommas(strucktureMinAmt, true);
                    applicationManager.getDataProcessorUtility().showToastMessageError(this, errmsg);
                    this.disableContinueButton();
                    return;
                }
                else if (frmAccAmount && Number(frmAccAmount.fromAccountBalance) < amount) {
                    var errmsg = kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg") + " NPR " + CommonUtilities.formatCurrencyWithCommas(frmAccAmount.fromAccountBalance, true);
                    applicationManager.getDataProcessorUtility().showToastMessageError(this, errmsg);
                    this.disableContinueButton();
                    return;
                }
            }

            if (frmAccAmount && Number(frmAccAmount.fromAccountBalance) < amount) {
                var errmsg = kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg") + " NPR " + CommonUtilities.formatCurrencyWithCommas(frmAccAmount.fromAccountBalance, true);
                applicationManager.getDataProcessorUtility().showToastMessageError(this, errmsg);
                this.disableContinueButton();
                return;
            }

            var formattedCurrency = CommonUtilities.formatCurrencyWithCommas(amount, true);
            this.view.txtAmount.text = formattedCurrency;
            navManager.setCustomInfo("getFixedDepositData", {
                "fromAccount": this.view.lblAccountNumber.text,
                "accName": this.view.lblAccountName.text,
                "balance": this.view.lblBalance.text,
                "acctype": this.view.lblAccountType.text,
                "branch": this.view.lblBranchValue.text,
                "amount": this.view.txtAmount.text,
                "depositType": this.view.lblSelectDepositTypeValue.text,
                "tenure": this.view.lblSelectTenureValue.text,
                "interestRates" : this.view.lblInterestRatesValue.text,

            });
            //navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositReviewDetails" });
            scope.getTermsAndConditionForFd();
        },

        checkForToastMessage: function () {
            var navManager = applicationManager.getNavigationManager();
            var flag = navManager.getCustomInfo("fdError");
            if (flag !== undefined && flag !== "" && flag !== null) {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
                navManager.setCustomInfo('fdError', null);
            }
        },

    };
});
