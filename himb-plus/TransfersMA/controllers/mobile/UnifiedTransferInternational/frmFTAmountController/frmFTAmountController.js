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
            this.setTitleBarVisibility();
            this.setDefaultDepositAccount();
            this.disableContinueButton();
            this.view.postShow = this.postShow;
            this.setInitialData();
            this.setAmount();

            this.setPurpose();
            this.setRelationship();

            this.view.lblAmountInINRValue.text = "0.00";
            this.view.lblExchangeRateValue.text = "INR 100 = NPR 160.15";

            this.getDefaultAccNo();
            this.getSelectedAccNo();

            this.initStatements();

            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmVerifyDetails") {
                var navManager = applicationManager.getNavigationManager();
                var data = navManager.getCustomInfo("internationalVPATransferDetails");
                if (!kony.sdk.isNullOrUndefined(data)) {
                    this.view.lblFromAccountValue.text = data.fromAccount;
                    this.view.lblVpaNo.text = data.sendersVpa;
                    this.view.lblReceiversCountryValue = data.country;

                    this.view.lblReceiversVpaValue.text = data.receiversVpa;
                    this.view.lblReceiversNameValue.text = data.to;

                    this.view.lblTransferCurrencyValue.text = data.transferCurrency;
                    this.view.lblAmountValue.text = data.amount;
                    this.view.lblAmountInINRValue.text = data.amountInINR;

                    this.view.lblChargeValue.text = data.charge;
                    this.view.lblExchangeRateValue.text = data.exchangeRate;
                    this.view.lblAuthorizedLimitValue.text = data.authorizedLimit;
                    this.view.lblConsumerLimitValue.text = data.consumerLimit;


                    this.view.lblPurposeValue.text = data.purpose;
                    this.view.lblRelationshipValue.text = data.relationship;

                    this.view.txtNotes.text = data.notes;
                }
            }

            this.isEditVpaFlow();
            this.isEditNameFlow();

            this.enableOrDisableBtnContinue();
        },
        navigateToVerifyScreen: function () {
            var notes = this.view.txtNotes.text;
            if (!kony.sdk.isNullOrUndefined(notes)) {
                if (notes.length > 4) {
                    this.enableOrDisableBtnContinue();
                } else {
                    this.disableContinueButton();
                }
            }


        },
        getDefaultAccNo: function () {
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            var default_account_transfers = userObj['default_account_transfers'];
            if (!kony.sdk.isNullOrUndefined(default_account_transfers)) {
                this.view.lblSelectedAccountNumber.text = default_account_transfers;
                var accNo = default_account_transfers;

            } else {
                var data = applicationManager.getDefaultDashboardObj();
                if (!kony.sdk.isNullOrUndefined(data)) {

                    var accNo = data.Accounts[0].account_id;

                }
            }
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("defaultAccountNo", accNo);
            this.view.lblSelectedAccountNumber.text = accNo;
        },

        getSelectedAccNo: function () {
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("frmInternationalFTFromAccount");
            if (!kony.sdk.isNullOrUndefined(data)) {
                var accNo = data.accountID;
                this.view.lblSelectedAccountNumber.text = accNo;
                navManager.setCustomInfo("selectedAccNoFT", accNo);
            }
        },

        getAccNoandSetAccountDetails: function () {
            var navManager = applicationManager.getNavigationManager();
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmReceiversName") {
                var accNo = navManager.getCustomInfo("defaultAccountNo");
            } else if (previousForm === "frmInternationalFTFromAccount") {
                var accNo = navManager.getCustomInfo("selectedAccNoFT");
            }
            this.setDefaultaccDetails(accNo);
        },


        setDefaultaccDetails: function (accNo) {
            var navManager = applicationManager.getNavigationManager();
            var response = navManager.getCustomInfo("vpaDetails");
            if ((response !== null) && (response !== "") && (response !== undefined)) {
                for (i = 0; i < response.Accounts.length; i++) {
                    if (response.Accounts[i].Account_id == accNo) {
                        var payerVpa = response.Accounts[i].vpaId;
                        var payerAccType = response.Accounts[i].accountType;
                        var payerName = response.Accounts[i].accountName;
                        var payerAccNumber = response.Accounts[i].Account_id;
                        var currencyCode = response.Accounts[i].currencyCode;
                        var balance = response.Accounts[i].availableBalance;
                    }
                }
            }
            var formattedPayerName = payerName + "...." + payerAccNumber.slice(-4);
            this.view.lblFromAccountValue.text = formattedPayerName;
            this.view.lblTransferCurrencyValue.text = currencyCode;
            this.view.lblSelectedAccountNumber.text = payerAccNumber;
            this.view.lblVpaNo.text = payerVpa;
            var formattedCurrency = CommonUtilities.formatCurrencyWithCommas(balance, true);
            var formattedBalance = currencyCode + " " + formattedCurrency;
            this.view.lblBalanceValue.text = formattedBalance;
            var vpaFT = this.view.lblVpaNo.text;
            navManager.setCustomInfo("InternationalVpa", vpaFT);
            navManager.setCustomInfo("getAccountDetailsInternationalFT", {
                "payerAccType": payerAccType,
                "payerName": payerName,
                "payerAccNumber": payerAccNumber,
                "accountBalance" : formattedCurrency
            });
        },

        resetPage: function () {
            this.setDefaultDepositAccount();
            this.setVpa();
            this.view.lblChargeValue.text = "";
            this.view.lblAuthorizedLimitValue.text = "";
            this.view.lblConsumerLimitValue.text = "";

        },
        onNavigate: function (uidata) {
            if (!kony.sdk.isNullOrUndefined(uidata)) {
                this.updateLimitData(uidata);
            }
        },


        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.onClickCancel;
            this.view.btnContinue.onClick = this.btnContinue;
            this.view.flxFromAccount.onClick = this.flxFromAccountOnClick;
            this.view.flxReceiversVpa.onClick = this.flxReceiversVpaOnClick;
            this.view.flxReceiversName.onClick = this.flxReceiversNameOnClick;
            this.view.flxTransferCurrency.onClick = this.flxTransferCurrencyOnClick;
            this.view.flxAmount.onClick = this.flxAmountOnClick;
            this.view.flxPurpose.onClick = this.flxPurposeOnClick;
            this.view.flxRelationship.onClick = this.flxRelationshipOnClick;
            this.view.txtNotes.onTextChange = this.navigateToVerifyScreen;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        enableOrDisableBtnContinue: function () {
            var frmAccount = this.view.lblFromAccountValue.text;
            var vpaNo = this.view.lblVpaNo.text;
            var country = this.view.lblReceiversCountryValue.text;
            var receiversVpa = this.view.lblReceiversVpaValue.text;
            var receiversName = this.view.lblReceiversNameValue.text;
            var currency = this.view.lblTransferCurrencyValue.text;
            var amount = this.view.lblAmountValue.text;
            var amountInINR = this.view.lblAmountInINRValue.text;
            var charge = this.view.lblChargeValue.text;
            var exchangeRate = this.view.lblExchangeRateValue.text;
            var authorizedLimit = this.view.lblAuthorizedLimitValue.text;
            var consumerLimit = this.view.lblConsumerLimitValue.text;
            var purpose = this.view.lblPurposeValue.text;
            var relationship = this.view.lblRelationshipValue.text;
            var notes = this.view.txtNotes.text;
            if (
                (!kony.sdk.isNullOrUndefined(frmAccount)) &&
                (!kony.sdk.isNullOrUndefined(vpaNo)) &&
                (!kony.sdk.isNullOrUndefined(country)) &&
                (!kony.sdk.isNullOrUndefined(receiversVpa)) &&
                (!kony.sdk.isNullOrUndefined(receiversName)) &&
                (!kony.sdk.isNullOrUndefined(currency)) &&
                (amount !== "0.00") &&
                (!kony.sdk.isNullOrUndefined(amountInINR)) &&
                (!kony.sdk.isNullOrUndefined(charge)) &&
                (!kony.sdk.isNullOrUndefined(exchangeRate)) &&
                (!kony.sdk.isNullOrUndefined(authorizedLimit)) &&
                (!kony.sdk.isNullOrUndefined(consumerLimit)) &&
                (purpose !== kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect"))&&
                (relationship !== kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect")) &&
                ((notes !== null) && (notes !== "") && (notes !== undefined))) {

                this.enableContinueButton();
            }

        },

        setInitialData: function () {
            var navManager = applicationManager.getNavigationManager();
            var countryName = navManager.getCustomInfo("countryFT");
            var receiversVpa = navManager.getCustomInfo("receiversVpaFT");
            var receiversName = navManager.getCustomInfo("receiversNameFT");
            this.view.lblReceiversCountryValue.text = countryName;
            this.view.lblReceiversVpaValue.text = receiversVpa;
            this.view.lblReceiversNameValue.text = receiversName;
        },

        setAmount: function () {
            var navManager = applicationManager.getNavigationManager();
            var amount = navManager.getCustomInfo("amountSelectedInternationalFT");
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmReceiversName") {
                this.view.lblAmountValue.text = "0.00";
            } else {
                if (amount && amount !== "") {
                    try {
                        var amountSelected = amount;
                        this.view.lblAmountValue.text = amountSelected;
                    } catch (e) {
                        var amountSelected = amount;
                        this.view.lblAmountValue.text = amountSelected;
                    }

                    this.view.lblAmountValue.text = amountSelected;
                } else {
                    this.view.lblAmountValue.text = "0.00";
                }
            }
        },



        setPurpose: function () {

            var navManager = applicationManager.getNavigationManager();
            var previousForm = kony.application.getPreviousForm().id;
            var purposeName = navManager.getCustomInfo("getPurpose");
            var purposeCode = navManager.getCustomInfo("getPurposeCode");
            if (!kony.sdk.isNullOrUndefined(purposeCode)) {
                navManager.setCustomInfo("purposeCode", purposeCode);
            }
            if (!kony.sdk.isNullOrUndefined(purposeName)) {
                try {
                    this.view.lblPurposeValue.text = purposeName;
                } catch (e) {
                    this.view.lblPurposeValue.text = purposeName;
                }
            } else if (previousForm === "frmReceiversName") {
                this.view.lblPurposeValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
            }

        },

        setRelationship: function () {
            var navManager = applicationManager.getNavigationManager();
            var previousForm = kony.application.getPreviousForm().id;
            var relationshipName = navManager.getCustomInfo("getRelationship");
            var relationshipCode = navManager.getCustomInfo("getRelationshipCode");
            if (!kony.sdk.isNullOrUndefined(relationshipCode)) {
                navManager.setCustomInfo("relationshipCode", relationshipCode);
            }

            if (previousForm === "frmReceiversName") {
                this.view.lblRelationshipValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");

            } else {
                if (relationshipName !== undefined && relationshipName !== "" && relationshipName !== null) {
                    try {
                        this.view.lblRelationshipValue.text = relationshipName;
                    } catch (e) {
                        this.view.lblRelationshipValue.text = relationshipName;
                    }

                } else {
                    this.view.lblRelationshipValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                }
            }
        },



        initStatements: function () {
            var navManager = applicationManager.getNavigationManager();
            var selectedAccount = navManager.getCustomInfo("selectedAccNoFT");
            var previousForm = kony.application.getPreviousForm().id;
            var flow = navManager.getCustomInfo("defaultAccFlow", true);

            if (flow) {
                //       if (previousForm === "frmReceiversName") {
                var accNo = navManager.getCustomInfo("defaultAccountNo");
            } else {
                if (selectedAccount && selectedAccount !== "") {
                    try {
                        var accNo = selectedAccount;
                    } catch (e) {
                        var accNo = selectedAccount;
                    }
                } else {
                    var accNo = navManager.getCustomInfo("defaultAccountNo");
                }
            }
            this.setDefaultaccDetails(accNo);
        },




        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount");
                this.view.flxHeader.isVisible = true;
                this.view.flxFooter.top = "0%";
                this.view.flxMainContainer.top = "56dp";
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.title = kony.i18n.getLocalizedString("i18n.konybb.Common.Amount");
                this.view.flxHeader.isVisible = false;
                this.view.flxFooter.top = "5%";
                this.view.flxMainContainer.top = "0dp";

            }
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("getPurpose", null);
            navManager.setCustomInfo("getPurposeCode", null);
            navManager.setCustomInfo("getRelationship", null);
            navManager.setCustomInfo("getRelationshipCode", null);
            navManager.setCustomInfo("amountSelectedInternationalFT", null);
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceiversName" }); //frmReceiversCountry   frmSelectTransferTypeNew
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferInternational/frmFTAmount"
            });
        },

        onClickCancel: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew" }); //frmReceiversCountry   frmSelectTransferTypeNew

        },


        checkForToastMessage: function () {
       //   var navManager = applicationManager.getNavigationManager();
       //   var flag = navManager.getCustomInfo("InternationalTransferError");
        //  if (flag !== undefined && flag !== "" && flag !== null) {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.approvals.viewDetailsConfirm"));
           //   navManager.setCustomInfo('InternationalTransferError', null);
                //this.enableOrDisableBtnContinue();
          //}
        },
        checkForExchangeRateError: function () {

            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));

        },

        btnContinue: function () {
            var frmAccount = this.view.lblFromAccountValue.text;
            var payerVpa = this.view.lblVpaNo.text;
            var country = this.view.lblReceiversCountryValue.text;
            var receiversVpa = this.view.lblReceiversVpaValue.text;
            var receiversName = this.view.lblReceiversNameValue.text;
            var currency = this.view.lblTransferCurrencyValue.text;
            var amount = this.view.lblAmountValue.text;
            var amountInINR = this.view.lblAmountInINRValue.text;
            var charge = this.view.lblChargeValue.text;
            var exchangeRate = this.view.lblExchangeRateValue.text;
            var authorizedLimit = this.view.lblAuthorizedLimitValue.text;
            var consumerLimit = this.view.lblConsumerLimitValue.text;
            var purpose = this.view.lblPurposeValue.text;
            var relationship = this.view.lblRelationshipValue.text;
            var notes = this.view.txtNotes.text;
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("getAccountDetailsInternationalFT");
            var purposeCode = navManager.getCustomInfo("purposeCode");
            var relationshipCode = navManager.getCustomInfo("relationshipCode");

            navManager.setCustomInfo("internationalVPATransferDetails", {
                "fromAccount": this.view.lblFromAccountValue.text,
                "sendersVpa": this.view.lblVpaNo.text,
                "receiversVpa": this.view.lblReceiversVpaValue.text,
                "to": this.view.lblReceiversNameValue.text,
                "country": this.view.lblReceiversCountryValue.text,
                "transferCurrency": this.view.lblTransferCurrencyValue.text,
                "amount": this.view.lblAmountValue.text,
                "exchangeRate": this.view.lblExchangeRateValue.text,
                "amountInINR": this.view.lblAmountInINRValue.text,
                "charge": this.view.lblChargeValue.text,
                "authorizedLimit": this.view.lblAuthorizedLimitValue.text,
                "consumerLimit": this.view.lblConsumerLimitValue.text,
                "purpose": this.view.lblPurposeValue.text,
                "relationship": this.view.lblRelationshipValue.text,
                "notes": this.view.txtNotes.text,

            });

            var param =
            {
                "amount": amount,
                "purpose": purposeCode,
                "countryCode": "IND",
                "chargeAmount": charge,
                "remarks": notes,
                "currency": currency,
                "payeeName": receiversName,
                "payeeRelationship": relationshipCode,
                "payeeVPA": receiversVpa,
                "payerName": data.payerName,
                "payerVPA": payerVpa,
                "payerAccType": data.payerAccType,
                "payerAccNumber": data.payerAccNumber,
                /*
                "lat": "12.967690",
                "long": "77.520895"
                */
               "lat":"12.967690",
               "long":"77.520895"
            }

            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });

            ManageActivitiesPresenter.getValidateCustomer(param);
            applicationManager.getPresentationUtility().showLoadingScreen();

        },
        enableContinueButton: function () {
            this.view.btnContinue.setEnabled(true);
            this.view.btnContinue.skin = "sknBtn055BAF26px";
        },
        disableContinueButton: function () {
            this.view.btnContinue.setEnabled(false);
            this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        },

        flxFromAccountOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("accountSelection", true);
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getFromAccountsForInternationalFT();
            applicationManager.getPresentationUtility().showLoadingScreen();
        },

        flxReceiversVpaOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("editFlowVpa", true);
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceieversVpa" });
        },

        flxReceiversNameOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("editReceiverNameDetails", {
                "fromAccount": this.view.lblFromAccountValue.text,
                "sendersVpa": this.view.lblVpaNo.text,
                "country": this.view.lblReceiversCountryValue.text,
                "receiversVpa": this.view.lblReceiversVpaValue.text,

                "transferCurrency": this.view.lblTransferCurrencyValue.text,
                "amount": this.view.lblAmountValue.text,
                "amountInINR": this.view.lblAmountInINRValue.text,
                "charge": this.view.lblChargeValue.text,

                "exchangeRate": this.view.lblExchangeRateValue.text,
                "authorizedLimit": this.view.lblAuthorizedLimitValue.text,
                "consumerLimit": this.view.lblConsumerLimitValue.text,
                "purpose": this.view.lblPurposeValue.text,
                "relationship": this.view.lblRelationshipValue.text,
                "notes": this.view.txtNotes.text,
            });
            navManager.setCustomInfo("editFlowName", true);
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceiversName" });
        },

        flxTransferCurrencyOnClick: function () {

        },

        flxAmountOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmTransferAmount" });
        },

        flxPurposeOnClick: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("getPurposeData");
            if (kony.sdk.isNullOrUndefined(data)) {
                navManager.setCustomInfo("flowPurposeTypes", "purposeTypes");
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                var param = {
                    "countryCode": "IND"
                }
                ManageActivitiesPresenter.getPurposeAndRelationship(param);
            } else {
                var navManager = applicationManager.getNavigationManager();
                navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmChoosePurpose" });
            }

        },
        isEmptyNullOrUndefined: function (data) {
            if (data === null || data === undefined || data === "") return true;
            if (typeof data === "object") {
                if (Array.isArray(data)) return data.length === 0;
                return Object.keys(data).length === 0;
            }
            return false;
        },

        flxRelationshipOnClick: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("getRelationshipData");
            if (kony.sdk.isNullOrUndefined(data)) {
                navManager.setCustomInfo("flowRelationshipTypes", "relationshipTypes");
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                var param = {
                    "countryCode": "IND"
                }
                ManageActivitiesPresenter.getPurposeAndRelationship(param);
            } else {
                var navManager = applicationManager.getNavigationManager();
                navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmChooseRelationship" });
            }

        },

        refreshData: function () {
            this.view.lblChargeValue.text = "";
            this.view.lblAuthorizedLimitValue.text = "";
            this.view.lblConsumerLimitValue.text = "";
        },

        setVpa: function () {
            var navManager = applicationManager.getNavigationManager();
            var response = navManager.getCustomInfo("vpaDetails");

            var accNo = this.view.lblSelectedAccountNumber.text;
            if ((response !== null) && (response !== "") && (response !== undefined)) {
                for (i = 0; i < response.Accounts.length; i++) {
                    if (response.Accounts[i].Account_id == accNo) {
                        this.view.lblVpaNo.text = response.Accounts[i].vpaId;
                        var payerAccType = response.Accounts[i].accountType;
                        var payerName = response.Accounts[i].accountName;
                        var payerAccNumber = response.Accounts[i].Account_id;

                    }
                }
            }
            var vpaFT = this.view.lblVpaNo.text;
            navManager.setCustomInfo("InternationalVpa", vpaFT);
            navManager.setCustomInfo("getAccountDetailsInternationalFT", {
                "payerAccType": payerAccType,
                "payerName": payerName,
                "payerAccNumber": payerAccNumber,
            });
        },


        setDefaultDepositAccount: function () {
            var previousForm = kony.application.getPreviousForm().id;
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            var default_account_transfers = userObj['default_account_transfers'];
            if (!kony.sdk.isNullOrUndefined(default_account_transfers)) {
                var navManager = applicationManager.getNavigationManager();
                var response = navManager.getCustomInfo("vpaDetails");
                if ((response !== null) && (response !== "") && (response !== undefined)) {
                    for (i = 0; i < response.Accounts.length; i++) {
                        if (response.Accounts[i].Account_id == default_account_transfers) {
                            var payerVpa = response.Accounts[i].vpaId;
                            var payerAccType = response.Accounts[i].accountType;
                            var payerName = response.Accounts[i].accountName;
                            var payerAccNumber = response.Accounts[i].Account_id;
                            var currencyCode = response.Accounts[i].currencyCode;
                        }
                    }
                }
                var formattedDefaultDepositAccount = payerName + "...." + payerAccNumber.slice(-4);
                this.view.lblFromAccountValue.text = formattedDefaultDepositAccount;
                this.view.lblTransferCurrencyValue.text = currencyCode;
                this.view.lblSelectedAccountNumber.text = payerAccNumber;
                this.view.lblVpaNo.text = payerVpa;
            }

            else {
                var data = applicationManager.getDefaultDashboardObj();
                var acctId = data.Accounts[0].account_id;
                var name = data.Accounts[0].accountName;
                var defaultCurrency = data.Accounts[0].currencyCode;
                var payerVpa = data.Accounts[0].vpaId;
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("defaultAccId", acctId);
                var formattedDashboardAccount = name + "...." + acctId.slice(-4);
                this.view.lblTransferCurrencyValue.text = defaultCurrency;
                this.view.lblFromAccountValue.text = formattedDashboardAccount;
                this.view.lblSelectedAccountNumber.text = acctId;
                this.view.lblVpaNo.text = payerVpa;
            }
        },

        setSelectedAccountData: function () {

            var presenter = applicationManager.getModulesPresentationController({
                "moduleName": "QRPaymentsUIModule",
                "appName": "TransfersMA"
            });
            if ((presenter.getTransObject().fromProcessedName !== null) && (presenter.getTransObject().fromProcessedName !== "") && (presenter.getTransObject().fromProcessedName !== undefined)) {
                var formattedName = presenter.getTransObject().fromProcessedName;
            }
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmInternationalFTFromAccount") {
                if ((presenter.getTransObject().fromAccountNumber !== null) && (presenter.getTransObject().fromAccountNumber !== "") && (presenter.getTransObject().fromAccountNumber !== undefined)) {
                    var accNo = presenter.getTransObject().fromAccountNumber;
                    this.view.lblSelectedAccountNumber.text = accNo;
                    this.view.lblFromAccountValue.text = formattedName;
                }
                var navManager = applicationManager.getNavigationManager();
                var currency = navManager.getCustomInfo("frmInternationalFTFromAccount");
                if ((currency !== null) && (currency !== "") && (currency !== undefined)) {
                    this.view.lblTransferCurrencyValue.text = currency.fromAccountCurrency;
                }
            }


        },

        updateLimitData: function (data) {
            var navManager = applicationManager.getNavigationManager();
            var exchangeData = navManager.getCustomInfo("getExchangeCheckLimitData");
            if ((data !== null) && (data !== "") && (data !== undefined)) {
                var response = data;
                var res = JSON.parse(response);
                this.view.lblChargeValue.text = JSON.stringify(res.calculatedCharge);
                this.view.lblAuthorizedLimitValue.text = JSON.stringify(res.dailyAvailableLimitAmount);
                this.view.lblConsumerLimitValue.text = JSON.stringify(res.dailyAvailableLimitCount);
            }
        },

        isEditVpaFlow: function () {
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmReceiversName") {
                var navManager = applicationManager.getNavigationManager();
                var flag = navManager.getCustomInfo("editFlowVpa");
                if (flag) {
                    var navManager = applicationManager.getNavigationManager();
                    var receiversVpa = navManager.getCustomInfo("receiversVpaFT");
                    this.view.lblReceiversVpaValue.text = receiversVpa;
                    navManager.setCustomInfo("editFlowVpa", null);
                } else {
                    this.getDefaultAccNo();
                    var navManager = applicationManager.getNavigationManager();
                    var accNo = navManager.getCustomInfo("defaultAccountNo");
                    if (!kony.sdk.isNullOrUndefined(accNo)) {
                        this.setDefaultaccDetails(accNo);
                    }

                    this.view.lblAmountValue.text = "0.00";
                    this.view.lblExchangeRateValue.text = "INR 100 = NPR 160.15";
                    this.view.lblAmountInINRValue.text = "0.00";
                    this.view.lblAuthorizedLimitValue.text = "";
                    this.view.lblConsumerLimitValue.text = "";
                    this.view.lblChargeValue.text = "";
                    this.view.lblPurposeValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                    this.view.lblRelationshipValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                    this.view.txtNotes.text = "";

                }
            }


        },

        isEditNameFlow: function () {
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmReceiversName") {
                var navManager = applicationManager.getNavigationManager();
                var flag = navManager.getCustomInfo("editFlowName");
                if (flag) {
                    var navManager = applicationManager.getNavigationManager();

                    var data = navManager.getCustomInfo("editReceiverNameDetails");
                    this.view.lblFromAccountValue.text = data.fromAccount,
                        this.view.lblVpaNo.text = data.sendersVpa;
                    this.view.lblReceiversCountryValue.text = data.country;
                    this.view.lblReceiversVpaValue.tex = data.receiversVpa;

                    this.view.lblTransferCurrencyValue.text = data.transferCurrency;
                    this.view.lblAmountValue.text = data.amount;
                    this.view.lblAmountInINRValue.text = data.amountInINR;
                    this.view.lblChargeValue.text = data.charge;

                    this.view.lblExchangeRateValue.text = data.exchangeRate;
                    this.view.lblAuthorizedLimitValue.text = data.authorizedLimit;
                    this.view.lblConsumerLimitValue.text = data.consumerLimit;
                    this.view.lblPurposeValue.text = data.purpose;
                    this.view.lblRelationshipValue.text = data.relationship;
                    this.view.txtNotes.text = data.notes;

                    navManager.setCustomInfo("editFlowName", null);
                } else {
                    this.getDefaultAccNo();
                    var navManager = applicationManager.getNavigationManager();
                    var accNo = navManager.getCustomInfo("defaultAccountNo");
                    if (!kony.sdk.isNullOrUndefined(accNo)) {
                        this.setDefaultaccDetails(accNo);
                    }

                    this.view.lblAmountValue.text = "0.00";
                    this.view.lblExchangeRateValue.text = "INR 100 = NPR 160.15";
                    this.view.lblAmountInINRValue.text = "0.00";

                    this.view.lblAuthorizedLimitValue.text = "";
                    this.view.lblConsumerLimitValue.text = "";
                    this.view.lblChargeValue.text = "";
                    this.view.lblPurposeValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                    this.view.lblRelationshipValue.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                    this.view.txtNotes.text = "";

                }
            }

        }

    };
});

