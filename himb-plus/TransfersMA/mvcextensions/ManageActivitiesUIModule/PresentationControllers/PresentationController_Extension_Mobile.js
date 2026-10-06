define([], function () {
    return {
      /**
       * PERF (DASHBOARD_REUSE): same as getList, but starts the transfer flow from an account list the
       * Dashboard has just loaded instead of calling getList again. Accounts are copied so the flow's
       * changes (transferFlow) never touch AccountManager's own records. Without a bank date yet, or on
       * any problem, it falls back to getList exactly as before.
       */
      getListUsingAccounts: function (accounts) {
        try {
          var bankDate = applicationManager.getBankDate();
          if (kony.sdk.isNullOrUndefined(accounts) || !accounts.length || kony.sdk.isNullOrUndefined(bankDate) || bankDate === "") {
            this.getList();
            return;
          }
          var accountCopies = [];
          for (var i = 0; i < accounts.length; i++) {
            accountCopies.push(Object.assign({}, accounts[i]));
          }
          this.getListPayee = [];
          this.getBankDatees = [];
          this.getBankDetailsResponse = [];
          this.bankListDetails = [];
          this.contracts = [];
          this.getListSuccess({ "Accounts": accountCopies });
        } catch (err) {
          kony.print("getListUsingAccounts " + err);
          this.getList();
        }
      },
      isCardPaymentParkingAccFirstHit:false,
      isCardPrepaidDollorTopupFirstHit:false,
      isCardPaymentSecondHit:false,
      selectedCardCcy:"",
      fromAccSelectionFlow:"",
      selectedTopCardCcy:"",
      isDefaultAccIsValidForTopup:false,
      isFrmAccAvaiable:false,
      isDefaultCardPyAccIsEligible:false,
        getConsentDetails: function (param) {
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.fetchConsents(param, this.getConsentDetailsSuccessCallBack, this.getConsentsDetailsErrorCallback);
        },

        getConsentDetailsSuccessCallBack: function (response) {
            var navManager = applicationManager.getNavigationManager();
            var data = response;
            navManager.setCustomInfo("consentDetails", data);
        },

        getConsentsDetailsErrorCallback: function (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            } else {
              var currentForm = kony.application.getCurrentForm().id;
              var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
              controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
            }
        },

        getAccListDetails: function (param) {
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.getAccList(param, this.accListdetailsSuccessCallBack.bind(this), this.accListdetailsErrorCallback.bind(this));
        },
        accListdetailsSuccessCallBack: function (response) {
            var navManager = applicationManager.getNavigationManager();
            var data = response;
            navManager.setCustomInfo("consentDetails", data);
            navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent"},true,response.responseData);
        },
        accListdetailsErrorCallback: function (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            } else {
              var currentForm = kony.application.getCurrentForm().id;
              var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
              controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
            }
        },

    natigateToCrossBorder : function () {
      this.classifyConsentAccounts();
    },
    classifyConsentAccounts : function () {
      var navManager = applicationManager.getNavigationManager();
      var accountObj = applicationManager.getAccountManager();
      var acctInfoInp = accountObj.getSavingsAndCheckingsAccounts();
      var inwardAccounts = [];
      var outwardAccounts = [];
      var userObj = applicationManager.getUserPreferencesManager().getUserObj();
      var isIndianCitizen = (userObj && userObj.country === "IN");
      if (!acctInfoInp || !Array.isArray(acctInfoInp)) {
        //showErrorPopup
        return;
      }
      for (var i = 0; i < acctInfoInp.length; i++) {
        var account = acctInfoInp[i];
        var currencyCode = account.currencyCode;
        var isNPR = currencyCode === "NPR";
        var supportTransferTo = account.supportTransferTo === "1";
        var supportTransferFrom = account.supportTransferFrom === "1";
        if (supportTransferTo) {
          inwardAccounts.push(account);
        }
        if (isIndianCitizen) {
          if (supportTransferTo) {
            outwardAccounts.push(account);
          }
          if (isNPR && supportTransferFrom && !outwardAccounts.includes(account)) {
            outwardAccounts.push(account);
          }
        } else {
          if (supportTransferTo) {
            outwardAccounts.push(account);
          }
        }
      }
      if (inwardAccounts.length === 0 && outwardAccounts.length === 0) {
        this.showErrorCrossBorderPopup();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else {
        var eligibleAccounts = this.getUniqueAccounts(inwardAccounts, outwardAccounts);
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("crossBorderConsentEligibleAccounts", eligibleAccounts);
        var crossBorderAccounts = navManager.getCustomInfo("crossBorderConsentEligibleAccounts");
        var data = crossBorderAccounts[0];
        var accId = data.Account_id;
        var accountName = data.AccountName;
        //var formattedName = this.getFormattedAccountName(accId, accountName);
        var formattedName =  applicationManager.getPresentationUtility().formatText(accountName, 15, accId, 4);
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
          "appName": "TransfersMA",
          "moduleName": "ManageActivitiesUIModule"
        });
        ManageActivitiesPresenter.crossBorderSelectedAccount = formattedName;
        ManageActivitiesPresenter.crossBorderAccId = accId;
        param = {
          //"customerId": scope_configManager.userAccounts[i].coreCustomerId,
          "customerId": eligibleAccounts[0].coreCustomerId,
          "customerAccount": ManageActivitiesPresenter.crossBorderAccId
        }
        ManageActivitiesPresenter.getAccVPADetails(param); 
      }
    },
    showErrorCrossBorderPopup: function () {
      /*kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsentError"),
        "alertHandler": this.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      }, */
	 applicationManager.getPresentationUtility().Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsentError"),
        "alertHandler": this.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      },{});
    },
    alertCallback : function () {
    },
     getFormattedAccountName : function (accountName, accountId) {
      if (accountName && accountId) {
        var accId = accountId;
        var lastFour = accId.slice(-4);
        return accountName + "...." + lastFour;
      } 
    },
    getUniqueAccounts: function (inwardAccounts, outwardAccounts) {
      var uniqueAccounts = [];
      var allAccounts = inwardAccounts.concat(outwardAccounts);
      for (var i = 0; i < allAccounts.length; i++) {
        var currentAccount = allAccounts[i];
        var accountId = currentAccount.accountID || currentAccount.account_id;
        var isDuplicate = false;
        for (var j = 0; j < uniqueAccounts.length; j++) {
          var existingAccountId = uniqueAccounts[j].accountID || uniqueAccounts[j].account_id;
          if (existingAccountId === accountId) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          uniqueAccounts.push(currentAccount);
        }
      }
      return uniqueAccounts;
    },
      createConsentDetails: function (param) {
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.createConsent(param, this.createConsentsDetailsSuccessCallBack, this.createConsentsDetailsErrorCallback);
      },

      createConsentsDetailsSuccessCallBack: function (response) {
        if (!kony.sdk.isNullOrUndefined(response)) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          if (response.MFAAttributes && response.MFAAttributes.isMFARequired === "true") {
            var mfaJSON = {
              "flowType": "CBC_Create",
              "response": response,
              "objectServiceDetails": {
                "serviceName": "HBLOtherBankTransfers",
                "dataModel": "CrossBorderPayments",
                "operationName": "createConsent"
              }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          }
          else if (response.httpStatusCode == "200" && response.responseCode == "000") {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderAcknowledgement" }, true, response.responseData);
          } else {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("createConsentError", "true");
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false);
          }
        } else {
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("consentErrorMessage", err);
          navManager.setCustomInfo("createConsentError", "true");
          navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false);
        }
      },

      createConsentsDetailsErrorCallback: function (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("createConsentError", "true");
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false);
      },

      getCrossConsentDetails: function (param) {
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.fetchConsent(param, this.getCrossConsentsDetailsSuccessCallBack, this.getCrossConsentsDetailsErrorCallback);
      },

      getCrossConsentsDetailsSuccessCallBack: function (response) {
        if (!kony.sdk.isNullOrUndefined(response)) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          if (response.MFAAttributes && response.MFAAttributes.isMFARequired === "true") {
            var mfaJSON = {
              "flowType": "CBC_Fetch",
              "response": response,
              "objectServiceDetails": {
                "serviceName": "HBLOtherBankTransfers",
                "dataModel": "CrossBorderPayments",
                "operationName": "updateConsent"
              }
            };
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          }
          else if (response.httpStatusCode == "200" && response.responseCode == "000") {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderAcknowledgement" }, true, response.responseData);
          } else {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("createConsentError", "true");
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false);
          }
        } else {
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("createConsentError", "true");
          navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false);
        }
      },

      getConsentsdetailsErrorCallback: function (err) {
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("consentErrorMessage", err);
        navManager.setCustomInfo("createConsentError", "true");
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false);
      },

        getFromAccounts : function () {
            var accountManager = applicationManager.getAccountManager();
            accountManager.fetchInternalAccounts(this.fromAccountsPresentationSuccessCallBack,
              this.fromAccountsPresentationErrorCallBack);
          },
        
          fromAccountsPresentationSuccessCallBack : function (res) {
            var navMan = applicationManager.getNavigationManager();
            var accounts = res.filter(function (account) {
                return account.accountType === "Savings" || account.accountType === "Checking";
            });
            navMan.setCustomInfo("CrossBorderSelectAccount", {
              "fromaccounts": accounts
            });
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderSelectAccount"
            });
          },
        
          fromAccountsPresentationErrorCallBack : function (error) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (error["isServerUnreachable"]) {
              applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
            }
            else {
              var currentForm = kony.application.getCurrentForm().id;
              var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
              controller.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
            }
          },
        
        getFromAccountsFD : function () {
            var accountManager = applicationManager.getAccountManager();
            accountManager.fetchInternalAccounts(this.fromAccountsFDPresentationSuccessCallBack,
              this.fromAccountsFDPresentationErrorCallBack);
          },
          fromAccountsFDPresentationSuccessCallBack : function (res) {
            var navMan = applicationManager.getNavigationManager();
            var accounts = res.filter(function (account) {
                //return account.accountType === "Savings" || account.accountType === "Checking";
                return (
        (account.accountType === "Savings" || account.accountType === "Checking") &&
        account.currencyCode === "NPR"
    );
            });
            navMan.setCustomInfo("fixedDepositSelectAccount", {
              "fromaccounts": accounts
            });
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositFromAccount"
            });
          },
          fromAccountsPresentationFDErrorCallBack : function (error) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (error["isServerUnreachable"]) {
              applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
            }
            else {
              var currentForm = kony.application.getCurrentForm().id;
              var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
              controller.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
            }
          },
    getFromAccountsForInternationalFT: function () {
      var accountManager = applicationManager.getAccountManager();
      accountManager.fetchInternalAccounts(this.fromAccountsForInternationalFTSuccessCallBack,
        this.fromAccountsForInternationalFTErrorCallBack);
    },
    fromAccountsForInternationalFTSuccessCallBack: function (res) {
      var navMan = applicationManager.getNavigationManager();
      var accounts = res.filter(function (account) {
        return account.accountType === "Savings" || account.accountType === "Checking";
      });
      navMan.setCustomInfo("internationalFTSelectAccount", {
        "fromaccounts": accounts
      });
      applicationManager.getNavigationManager().navigateTo({
        "appName": "TransfersMA",
        "friendlyName": "UnifiedTransferInternational/frmInternationalFTFromAccount"
      });
    },
    fromAccountsForInternationalFTErrorCallBack: function (error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
      }
      else {
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
      }
    },

          setFromAccountsForTransactions : function (selectedFromAccount) {
            var trasMan = applicationManager.getTransactionManager();
            trasMan.setTransactionAttribute("fromAccountNumber", selectedFromAccount.accountID);
            trasMan.setTransactionAttribute("fromAccountName", selectedFromAccount.accountName);
            trasMan.setTransactionAttribute("fromProcessedName", selectedFromAccount.processedName);
            trasMan.setTransactionAttribute("fromProcessedAvailableBalance", selectedFromAccount.availableBalance);
            if (selectedFromAccount.fromAccountCurrency) {
              trasMan.setTransactionAttribute("fromAccountCurrency", selectedFromAccount.fromAccountCurrency);
              trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.fromAccountCurrency);
            }
            else {
              trasMan.setTransactionAttribute("fromAccountCurrency", selectedFromAccount.currencyCode);
              trasMan.setTransactionAttribute("transactionCurrency", selectedFromAccount.currencyCode);
            }
          },
          getTermsandConditions : function() {
            var config = applicationManager.getConfigurationManager();
            var locale = config.getLocale();
            var termsAndConditions = config.getTermsAndConditions();
            var param = {
                "languageCode": termsAndConditions[locale],
                "termsAndConditionsCode": "Fixed_deposit"
            };
            var currentLocale =  kony.i18n.getCurrentLocale();
            var params = {
                "languageCode": 'en-US',
                "termsAndConditionsCode": "Fixed_deposit"
            };
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.fetchTermsAndConditionsPostLogin(params, this.getTermsandConditionsSuccessCallBack, this.getTermsandConditionsErrorCallback);
        },
        getTermsandConditionsSuccessCallBack : function (response) {
            var navManager = applicationManager.getNavigationManager();
            var data = response;
            navManager.setCustomInfo("TermsAndConditionsData", data);
            var navManager = applicationManager.getNavigationManager();
			var navigation=function(){
				navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositReviewDetails" });
			};
           // navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmFixedDepositTermsAndConditions"});
		   applicationManager.getDataProcessorUtility().ShowTandC("<font face='SourceSansPro-Regular'>" + response.termsAndConditionsContent,navigation);
           kony.application.dismissLoadingScreen();
        },
        getTermsandConditionsErrorCallback: function () { 
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            } else {
                var currentForm = kony.application.getCurrentForm().id;
              var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
              controller.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
            }
        },
        navigateToFixedDeposit : function () { 
            this.setFixedDepositVisibility();
            /*
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit"}); 
            */
        },
      showErrorPopup: function () {
        /*kony.ui.Alert({
          "alertType": constants.ALERT_TYPE_INFO,
          "alertTitle": "",
          "message": kony.i18n.getLocalizedString("i18n.HBL.RequestFDError"),
          "alertHandler": this.alertCallback,
          "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
        }, */
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
    setFixedDepositVisibility: function () {
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
          let filteredAccountData = accountData.filter(item => ((["NPR"].includes(item["currencyCode"].toUpperCase()))));
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
          navMan.setCustomInfo("fixedDepositFromDashboard", true);
          applicationManager.getPresentationUtility().showLoadingScreen();
          navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
        }
      }
    },
    getPurposeAndRelationship: function (param) {
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.getPurposeDetails(param, this.getPurposeAndRelationshipSuccessCallBack, this.getPurposeAndRelationshipErrorCallback);
    },
    getPurposeAndRelationshipSuccessCallBack: function (response) {
      if (response.httpStatusCode == "200" && response.responseCode == "000") {
      var navManager = applicationManager.getNavigationManager();
      var data = response;
      var purposeAndRelationshipData = JSON.parse(data.responseData);
      var purpose = JSON.parse(purposeAndRelationshipData.purpose);
      var relationship = JSON.parse(purposeAndRelationshipData.relationship);
      navManager.setCustomInfo("getPurposeData", purpose);
      navManager.setCustomInfo("getRelationshipData", relationship);
      var flow = navManager.getCustomInfo("flowPurposeTypes");
      var flowType = navManager.getCustomInfo("flowRelationshipTypes");
      if (flow === "purposeTypes") {
        navManager.setCustomInfo("flowPurposeTypes", null);
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmChoosePurpose" });
      } else if (flowType === "relationshipTypes") {
        navManager.setCustomInfo("flowRelationshipTypes", null);
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmChooseRelationship" });
      }
    }else{
      var formController = applicationManager.getPresentationUtility().getController('frmFTAmount', true);
       formController.checkForExchangeRateError();
    }
    },
    getPurposeAndRelationshipErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var formController = applicationManager.getPresentationUtility().getController('frmFTAmount', true);
        formController.checkForExchangeRateError();
      }
    },
    getExchangeCheckLimit: function (param) {
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.getExchangeCheckLimit(param, this.getExchangeCheckLimitSuccessCallBack, this.getExchangeCheckLimitErrorCallback);
    },
    getExchangeCheckLimitSuccessCallBack: function (response) {
      if (response.httpStatusCode == "200" && response.responseCode == "000" && response.responseMessage === "Success") {
      var navManager = applicationManager.getNavigationManager();
      var amount = navManager.getCustomInfo("amountSelectedFT");
      navManager.setCustomInfo("amountSelectedInternationalFT", amount);
      var data = response;
      navManager.setCustomInfo("getExchangeCheckLimitData", data);
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmFTAmount" }, true, response.responseData);
      }else{
        var data = response;
        var error = data.responseMessage;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("getExchangeLimitError", error);
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.checkForLimitError();
      }
    },
    getExchangeCheckLimitErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.bindGenericError(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
        /*
        var formController = applicationManager.getPresentationUtility().getController('frmTransferAmount',true);
        formController.checkForExchangeRateError();
        */
      }
    },
    getValidateCustomer: function (param) {
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.getValidateCustomer(param, this.getValidateCustomerSuccessCallBack, this.getValidateCustomerErrorCallback);
    },
    getValidateCustomerSuccessCallBack: function (response) {
      if (response.httpStatusCode == "200" && response.responseCode == "000") {
        var data = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("getValidateCustomerData", data);
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmVerifyDetails" });
      } else {
        var error = response.responseMessage.message;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("InternationalTransferError", error);
        var formController = applicationManager.getPresentationUtility().getController('frmFTAmount', true);
        formController.checkForToastMessage();
      }
    },
    getValidateCustomerErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var formController = applicationManager.getPresentationUtility().getController('frmFTAmount', true);
        formController.checkForToastMessage();
      }
    },
    getAccListDetailsForFT: function (param) {
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.getAccList(param, this.getAccListDetailsForFTSuccessCallBack.bind(this), this.getAccListDetailsForFTErrorCallback.bind(this));
    },
    getAccListDetailsForFTSuccessCallBack: function (response) {
      var navManager = applicationManager.getNavigationManager();
      var data = response;
      navManager.setCustomInfo("vpaDetails", data);
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmReceiversCountry" });
    },
    getAccListDetailsForFTErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var currentForm = kony.application.getCurrentForm().id;
        var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
        controller.bindGenericError(kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
      }
    },
    getPayment: function (param) {
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.getPaymentDetails(param, this.getPaymentSuccessCallBack, this.getPaymentErrorCallback);
    },
    getPaymentSuccessCallBack: function (response) {
      if (response.MFAAttributes && response.MFAAttributes.isMFARequired === "true") {
        var mfaJSON = {
          "flowType": "International_Transfer",
          "response": response,
          "objectServiceDetails": {
            "serviceName": "HBLOtherBankTransfers",
            "dataModel": "CrossBorderPayments",
            "operationName": "createPayment"
          }
        }
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        var navManager = applicationManager.getNavigationManager();
        var data = response;
        navManager.setCustomInfo("getPaymentData", data);
        navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferInternational/frmAcknowledgementFT" });
      }
    },
    getPaymentErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var formController = applicationManager.getPresentationUtility().getController('frmFTAmount', true);
        formController.checkForExchangeRateError();
      }
    },
	  withInSameBankDetails: function(response) {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("flxSameBankAcknowledgementNew", response);
            navManager.navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/flxSameBankAcknowledgementNew"
            });
        },
        sameBankTransferError: function(err) {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("flxSameBankAcknowledgementNew", err);
            navManager.navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/flxSameBankAcknowledgementNew"
            });
        },

      getFixedDepositTenureIntrestMBL: function (param) {
       applicationManager.getPresentationUtility().showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getFixedDepositTenureIntrestdetails(param, this.getFixedDepositTenureIntrestdetailsSuccessCallBack, this.getFixedDepositTenureIntrestdetailsErrorCallback);
      },
      getFixedDepositTenureIntrestdetailsSuccessCallBack: function (response) {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (response.opstatus == "0" && response.httpStatusCode == "200") {
		  applicationManager.getNavigationManager().setCustomInfo("Tenureresponsedata",response.result)
        } else {
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.common.OoopsServerErrormb"));
         /* applicationManager.getNavigationManager().updateForm({
            "interestFailureresponse": response
          }, "frmRequestFixedDepositChooseOptions");*/
        }
      },
      getFixedDepositTenureIntrestdetailsErrorCallback: function (err) {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getNavigationManager().navigateTo({
          "appName": "TransfersMA",
          "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit"
        });
        applicationManager.getNavigationManager().updateForm({
          "interestFailureresponse": err
        }, "frmFixedDeposit");
      },

      createFixedDepositWithNonSTPMBL: function (param) {
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.createFixedDepositeWithNonSTP(param, this.createFixedDepositWithNonSTPSuccessCallBack, this.createFixedDepositWithNonSTPErrorCallback);
      },
      createFixedDepositWithNonSTPSuccessCallBack: function (res) {
       applicationManager.getPresentationUtility().showLoadingScreen();
        var mfaManager = applicationManager.getMFAManager();
        if (res.MFAAttributes && res.MFAAttributes.isMFARequired) {
          var mfaJSON = {
            "flowType": "FIXEDDEPOSITWITHNONSTP",
            "response": res,
            "objectServiceDetails": {
              "serviceName": "HBLOtherBankTransfers",
              "dataModel": "FixedDeposit",
              "operationName": "createFixedDepositNonSTP"
            }
          };
          applicationManager.getMFAManager().initMFAFlow(mfaJSON);

          // if (res && res.MFAAttributes) {
          //     if (res.MFAAttributes.isMFARequired == "true") {
          //         var mfaJSON = {
          //             "flowType": "FIXEDDEPOSITWITHNONSTP",
          //             "res": res
          //         };
          //         applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          //     }
        } else {
          if (res.status == "success" && res.transactionStatus == "Unapproved") {
            applicationManager.getNavigationManager().navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositAcknowledgement"
            });
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("FDres", res)
            applicationManager.getNavigationManager().updateForm({
              "successresponse": res
			  
            }, "frmRequestFixedDepositAcknowledgement");
          } else {
            applicationManager.getNavigationManager().updateForm({
              "Failureres": res
			  
            }, "frmFixedDeposit");
          }
        }
      },
      createFixedDepositWithNonSTPErrorCallback: function (err) {
         applicationManager.getPresentationUtility().dismissLoadingScreen();
      var formController = applicationManager.getPresentationUtility().getController("UnifiedTransferFlowUIModule/frmRequestFixedDepositReviewDetails", true, { "appName": "TransfersMA" });
      formController.checkForToastMessageCommonError();
      },

      createFixedDepositWithSTPMBL: function (param) {
       applicationManager.getPresentationUtility().showLoadingScreen();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.createFixedDepositeWithSTP(param, this.createFixedDepositWithSTPSuccessCallBack, this.createFixedDepositWithSTPErrorCallback);
      },
      createFixedDepositWithSTPSuccessCallBack: function (response) {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       applicationManager.getPresentationUtility().showLoadingScreen();
        var mfaManager = applicationManager.getMFAManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
          var mfaJSON = {
            "flowType": "FIXEDDEPOSITWITHSTP",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "HBLOtherBankTransfers",
              "dataModel": "FixedDeposit",
              "operationName": "createFixedDepositSTP"
            }
          };
          applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          // if (response && response.MFAAttributes) {
          //   if (response.MFAAttributes.isMFARequired == "true") {
          //       var mfaJSON = {
          //           "flowType": "FIXEDDEPOSITWITHSTP",
          //           "response": response
          //       };
          //       applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          //   }
        } else {
          if (response.transactionStatus == "Live" && response.httpStatusCode == "200") {
            applicationManager.getNavigationManager().navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositAcknowledgement"
            });
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("FDResponse", response)
            applicationManager.getNavigationManager().updateForm({
              "successresponse": response
			  
            }, "frmRequestFixedDepositAcknowledgement");
          } else if(response.status =="success" && response.transactionStatus == "Unapproved") {
			 applicationManager.getNavigationManager().navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDepositAcknowledgement"
            });
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("FDResponse", response)
            applicationManager.getNavigationManager().updateForm({
              "successresponse": response
			  
            }, "frmRequestFixedDepositAcknowledgement");
          }
		  else{
            applicationManager.getNavigationManager().navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit"
            });
            applicationManager.getNavigationManager().updateForm({
              "Failureresponse": response
            }, "frmFixedDeposit");
          }
        }
      },
      createFixedDepositWithSTPErrorCallback: function (err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var formController = applicationManager.getPresentationUtility().getController("UnifiedTransferFlowUIModule/frmRequestFixedDepositReviewDetails", true, { "appName": "TransfersMA" });
        formController.checkForToastMessageCommonError();
      },

      //credit card payment service call
      creditCardBillPayment: function (params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transactionManager = applicationManager.getTransactionManager();
        transactionManager.createIntraBankAccFundTransferCards(params, this.creditCardPayBillSuccessCallback, this.creditCardPayBillErrorCallback);
      },

      //credit card payment successCallBack
      creditCardPayBillSuccessCallback: function (response) {
        var mfaManager = applicationManager.getMFAManager();
        var navManager = applicationManager.getNavigationManager();
        if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
          var mfaJSON = {
            "flowType": "INTRA_BANK_FUNDTRANSFER_CREDIT_CARD_PAYMENT",
            "response": response,
            "objectServiceDetails": {
              "serviceName": "TransactionObjects",
              "dataModel": "Transaction",
              "operationName": "IntraBankAccFundTransferCards"
            }
          };
          applicationManager.getMFAManager().initMFAFlow(mfaJSON);
        } else if (!(kony.sdk.isNullOrUndefined(response.status)) && response.status === "success") {
          scope_ManageActivitiesPresentationController.isCardPaymentParkingAccFirstHit = true;
          var formController = applicationManager.getPresentationUtility().getController("UnifiedTransferFlowUIModule/frmCreditCardBillPaymentReview", true, { "appName": "TransfersMA" });
          formController.createCreditCardPayment(response);
        } else if (!(kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.message)) && response.status === "Sent") {
          scope_ManageActivitiesPresentationController.isCardPaymentSecondHit = true;
          navManager.setCustomInfo("creditCardPaymentAckRespose", response);
          navManager.navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardPaymentAcknowledgement"
          });
        } else {
          this.creditCardPayBillErrorCallback(response);
        }
      },

      //credit card payment errorCallBack
      creditCardPayBillErrorCallback: function (response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var formController = applicationManager.getPresentationUtility().getController("UnifiedTransferFlowUIModule/frmCreditCardBillPayment", true, { "appName": "TransfersMA" });
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
          "appName": "TransfersMA",
          "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment"
        });
        formController.showPopup(!kony.sdk.isNullOrUndefined(response.errorMessage.errorMessage)?
        response.errorMessage.errorMessage:kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
      },

      getFromAccountsCardPayment: function () {
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(this.fromAccountsCardPaymentSuccess, this.fromAccountsCardPaymentError);
      },

      fromAccountsCardPaymentSuccess: function (res) {
        var navManager = applicationManager.getNavigationManager();
        var selectedCcy = (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(scope_ManageActivitiesPresentationController.selectedCardCcy)) &&
          (scope_ManageActivitiesPresentationController.selectedCardCcy === "NPR" || scope_ManageActivitiesPresentationController.selectedCardCcy === "USD") ?
          scope_ManageActivitiesPresentationController.selectedCardCcy
          : undefined;
        var accounts = !kony.sdk.util.isNullOrUndefinedOrEmptyObject(res) ? res.filter(function (account) {
          //return account.accountType === "Savings" || account.accountType === "Checking";
          return (
            (account.accountType === "Savings" || account.accountType === "Checking") &&
            (account.currencyCode === selectedCcy) &&
            (account.supportTransferFrom === "1")
          );
        }) : "";
        navManager.setCustomInfo("proccessedCardPaymentFromAcc", { "fromaccounts": accounts });
        //card payment acc
        let userObj = applicationManager.getUserPreferencesManager().getUserObj();
        let cardPaymentAccNo = userObj['default_account_cardpayment'];
        let cardPayAccDetails = "";
        if (!kony.sdk.isNullOrUndefined(cardPaymentAccNo) && !kony.sdk.isNullOrUndefined(accounts)) {
          for (i = 0; i < accounts['length']; i++) {
            if (cardPaymentAccNo == accounts[i].account_id) {
              if (accounts[i].supportTransferFrom == "1") {
                cardPayAccDetails = accounts[i];
                break;
              }
            }
          }
        }
        //end
        let isFrmAccAvaiable = (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(accounts) && accounts.length != 0) ? true : false;
        scope_ManageActivitiesPresentationController.isDefaultCardPyAccIsEligible = (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(cardPayAccDetails)) ? true : false;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (isFrmAccAvaiable == true && scope_ManageActivitiesPresentationController.fromAccSelectionFlow == "frmCardManageHome") {
          if (scope_ManageActivitiesPresentationController.isDefaultCardPyAccIsEligible == true) {
            navManager.navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardBillPayment"
            });
          } else {
            applicationManager.getNavigationManager().navigateTo({
              "appName": "TransfersMA",
              "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardPaymentFromAcc"
            });
          }
        } else if (isFrmAccAvaiable == true && (scope_ManageActivitiesPresentationController.fromAccSelectionFlow == "frmCreditCardBillPayment" ||
          scope_ManageActivitiesPresentationController.fromAccSelectionFlow == "frmCreditCardBillPaymentReview")) {
          navManager.navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "UnifiedTransferFlowUIModule/frmCreditCardPaymentFromAcc"
          });
          
        } else {
          var formController = applicationManager.getPresentationUtility().getController("ManageCardsUIModule/frmCardManageHome", true, { "appName": "CardsMA" });
          formController.noEligibleAccounts();
        }
      },

      fromAccountsCardPaymentError: function (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
        else {
          var currentForm = kony.application.getCurrentForm().id;
          var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
          controller.showPopup(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"), false);
        }
      },

      getFromAccountsCardTopUp: function () {
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(this.fromAccountsForCardTopupSuccess, this.fromAccountsForCardTopupError);
      },
      fromAccountsForCardTopupSuccess: function (res) {
        var navManager = applicationManager.getNavigationManager();
        var selectedCcy = "NPR";
        var accounts = !kony.sdk.util.isNullOrUndefinedOrEmptyObject(res) ? res.filter(function (account) {
          //return account.accountType === "Savings" || account.accountType === "Checking";
          return (
            (account.accountType === "Savings" || account.accountType === "Checking") &&
            (account.currencyCode === selectedCcy) &&
            (account.supportTransferFrom === "1")
          );
        }) : "";
        var flowType = navManager.getCustomInfo("flowtype");
        navManager.setCustomInfo("prePopulateTopUpFromAccount", "cardPayAccDetails");
        navManager.setCustomInfo("proccessedFromAccForTopUp", "");
        navManager.setCustomInfo("proccessedFromAccForTopUp", { "fromaccounts": accounts });
        var defaultAcc = navManager.getCustomInfo("defaultAcc").Accounts[0];
        scope_ManageActivitiesPresentationController.isDefaultAccIsValidForTopup =
          ((defaultAcc.hasOwnProperty("supportTransferFrom") && defaultAcc.supportTransferFrom === "1") && defaultAcc.currencyCode === "NPR") ?
            true : false;

        let userObj = applicationManager.getUserPreferencesManager().getUserObj();
        let cardPaymentAccNo = userObj['default_account_cardpayment'];
        let cardPayAccDetails = "";
        if (!kony.sdk.isNullOrUndefined(cardPaymentAccNo) && !kony.sdk.isNullOrUndefined(accounts)) {
          for (i = 0; i < accounts['length']; i++) {
            if (cardPaymentAccNo == accounts[i].account_id) {
              if (accounts[i].supportTransferFrom == "1") {
                cardPayAccDetails = accounts[i];
                break;
              }
            }
          }
 if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(cardPayAccDetails) && scope_ManageActivitiesPresentationController.isDefaultAccIsValidForTopup){
 cardPayAccDetails = defaultAcc;
          }

        } else if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(cardPayAccDetails) && scope_ManageActivitiesPresentationController.isDefaultAccIsValidForTopup){
 cardPayAccDetails = defaultAcc;
        }
if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(cardPayAccDetails)){
   
   if(flowType === "frmTopUpVirtualCardConsentScreen"){
    navManager.setCustomInfo("prePopulateTopUpFromAccount", cardPayAccDetails);
    navManager.navigateTo({
            "appName": "CardsMA",
            "friendlyName": "ManageCardsUIModule/frmTopUpVirtualCardConsentScreen"
          });
   }else if(flowType === "frmPrepaidTopupDomesticInputScreen"){
    navManager.setCustomInfo("prePopulateTopUpFromAccount", cardPayAccDetails);
    navManager.navigateTo({
            "appName": "CardsMA",
            "friendlyName": "ManageCardsUIModule/frmPrepaidTopupDomesticInputScreen"
          });
   }
        }else {
          var formController = applicationManager.getPresentationUtility().getController("ManageCardsUIModule/frmCardManageHome", true, { "appName": "CardsMA" });
          formController.noEligibleAccounts();
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      },
      fromAccountsForCardTopupError: function (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) {
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        }
        else {
          var currentForm = kony.application.getCurrentForm().id;
          var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
          controller.showPopup(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"), false);
        }
      },

       getAccVPADetails: function (param) {
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.getAccountVPADetails(param, this.getAccountVPADetailsSuccessCallBack, this.getAccountVPADetailsErrorCallback);
    },

    getAccountVPADetailsSuccessCallBack: function (response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false, { "crossBorder": response });
    },

    getAccountVPADetailsErrorCallback: function (err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent" }, false, { "crossBorderConsentError": err });
    },
    domesticTransferSuccessCallBack : function(response){
        try{
        var transRes=  applicationManager.getNavigationManager().getCustomInfo("MFAResponse");
       transRes = Object.assign(transRes,response);
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("flxDomesticAcknowledgementNew", transRes);
        navMan.navigateTo({ "appName": "TransfersMA", "friendlyName":"UnifiedTransferFlowUIModule/flxDomesticAcknowledgementNew"});
        navMan.setCustomInfo("MFAResponse",null);
        }catch(err){
            kony.print("error: "+err);
        }
    },
    domesticTransferErrorCallBack : function(error){
        try{
        var navMan = applicationManager.getNavigationManager();
       var transRes= navMan.getCustomInfo("MFAResponse");
        transRes = Object.assign(transRes,error);
        navMan.setCustomInfo("flxDomesticAcknowledgementNew", transRes);
         navMan.navigateTo({ "appName": "TransfersMA", "friendlyName":"UnifiedTransferFlowUIModule/flxDomesticAcknowledgementNew"});
        navMan.setCustomInfo("MFAResponse",null);
        }catch(err){
            kony.print("error: "+err);
        }
    },
	 navigateToEsewaLoad:function(){
	  try{
		  var scope=this;
		   applicationManager.getPresentationUtility().showLoadingScreen();
		var userObj = applicationManager.getUserPreferencesManager().getUserObj();
		var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
		var navMan=applicationManager.getNavigationManager();
		var tncManager=applicationManager.getTermsAndConditionsManager();
		var transactionManager = applicationManager.getTransactionManager();
		var esewaDefaultAccData;
	  if(userObj['default_account_esewa']){
		 esewaDefaultAccData= accounts.filter(function(acc){
			 return acc.accountID==userObj['default_account_esewa'];
		 });
		 navMan.setCustomInfo("default_account_esewa",esewaDefaultAccData[0]);
		 navMan.setCustomInfo("resetEsewa",true);
		 navMan.navigateTo({"appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmEsewaLoad"});
		 tncManager.getCurrentTimeDetails({},function(res){
			 navMan.setCustomInfo("CurrentBankDate",new Date(res.date[0].currentWorkingDate).toISOString());
			 transactionManager.setTransactionAttribute("CurrentBankDate",new Date(res.date[0].currentWorkingDate).toISOString());
		 },function(err){
			 	applicationManager.getPresentationUtility().dismissLoadingScreen();
applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");	
		 });
	  } else{
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  applicationManager.getPresentationUtility().Alert("Please select Default Account");	
	  } 
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");		 
	  }
  },
	validateEsewa:function(params){
			try{
				var scope=this;
				var tncManager=applicationManager.getTermsAndConditionsManager();
				tncManager.getValidationEsewaIds(params,scope.validateEsewasuccess.bind(this),scope.validateEsewafailure.bind(this));
			}catch(e){
				 applicationManager.getPresentationUtility().dismissLoadingScreen();
applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
kony.print("**********************error in load esewa sample*********************************"+e);
			}
		},
		validateEsewasuccess:function(res){
			try{
				var transactionObj = applicationManager.getTransactionsListManager().getTransactionObject();
				var configManager=applicationManager.getConfigurationManager();
				var tncManager=applicationManager.getTermsAndConditionsManager();
				var navManager=applicationManager.getNavigationManager();
				var scope=this;
				var currentBankDate=navManager.getCustomInfo("CurrentBankDate");
				if(transactionObj.CurrentBankDate){
					currentBankDate=transactionObj.CurrentBankDate;
				}
				// ===== eSewa v2 booking success gate - DISABLED 2026-09-09 =====
				// if(res.code === "UPIB-000")
				// {
				//	applicationManager.getTransactionsListManager().setTransactionAttribute("esewaBookingId",res.bookingId);
				//	applicationManager.getTransactionsListManager().setTransactionAttribute("esewaExpiryTime",res.expiryTime);
				// ===== end eSewa v2 =====
				if(res.success=="true"||res.success==true)
				{
					applicationManager.getTransactionsListManager().setTransactionAttribute("esewaToAccName",res.accountName);
					var obj={
						"ExternalAccountNumber":configManager.ESEWA_TOPUP_PAYABLE_ACCOUNT,
						"amount":transactionObj.esewaAmount,
						"beneficiaryAddressLine1":"",
						"beneficiaryAddressLine2":"",
						"beneficiaryCity":"",
						"beneficiarycountry":"",
						"beneficiaryEmail":"",
						"beneficiaryName":transactionObj.esewaFrmAccName,
						"beneficiaryNickname":"",
						"beneficiaryPhone":"",
						"beneficiaryState":"",
						"beneficiaryZipcode":"",
						"createWithPaymentId":"true",
						"deletedDocuments":"",
						"frequencyEndDate":currentBankDate,
						"frequencyStartDate":currentBankDate,
						"frequencyType":"Once",
						"fromAccountCurrency":transactionObj.esewafromAccCurrency,
						"fromAccountNumber":transactionObj.esewaFromAccount,
						"iban":"",
						"isScheduled":"0",
						"numberOfRecurrences":"",
						"paidBy":"",
						"paymentType":"",
						"scheduledDate":currentBankDate,
						"serviceName":"INTRA_BANK_FUND_TRANSFER_CREATE",
						"swiftCode":"",
						"toAccountCurrency":"NPR",
						"toAccountNumber":configManager.ESEWA_TOPUP_PAYABLE_ACCOUNT,
						"transactionCurrency":transactionObj.esewafromAccCurrency,
						"transactionId":"",
						"transactionType":"ExternalTransfer",
						"transactionsNotes":"",
						"uploadedattachments":"",
						"userId":"",
						"validate":"true"
						};
						navManager.setCustomInfo("esewaTransferObj",obj);
			tncManager.eSewaIntraBankTransfers(obj,scope.eSewaIntraBankTransfersSucc.bind(scope),scope.eSewaIntraBankTransfersfail.bind(scope));
				}
				else{
					applicationManager.getPresentationUtility().dismissLoadingScreen();
					applicationManager.getPresentationUtility().Alert("Please enter valid eSewa ID");
				}
			}catch(e){
				 applicationManager.getPresentationUtility().dismissLoadingScreen();
applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
kony.print("**********************error in load esewa validateEsewasuccess*********************************"+e);
			}
		},
		validateEsewafailure:function(err){
			try{
				var scope=this;
				applicationManager.getPresentationUtility().dismissLoadingScreen();
				applicationManager.getPresentationUtility().Alert(err.errorMessage);
			}catch(e){
				 applicationManager.getPresentationUtility().dismissLoadingScreen();
applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
kony.print("**********************error in load esewa validateEsewafailure*********************************"+e);
			}
		},
		eSewaIntraBankTransfersSucc:function(res){
		try{
		var scope=this;
		var transactionObj = applicationManager.getTransactionsListManager();
		var navMan=applicationManager.getNavigationManager();
		if (res.MFAAttributes && res.MFAAttributes.isMFARequired === "true") {
				var mfaJSON = {
				"flowType": "ESEWA_LOAD",
				"response": res,
				"objectServiceDetails": {
				"serviceName": "TransactionObjects",
				"dataModel": "Transaction",
				"operationName": "IntraBankAccFundTxreSewaTopup"
				}
				};
            applicationManager.getMFAManager().initMFAFlow(mfaJSON);
          }
		else if(res.referenceId&&res.status=="success"){
			transactionObj.setTransactionAttribute("esewaRefId",res.referenceId);
			transactionObj.setTransactionAttribute("esewaAmount",res.totalAmount);
			navMan.getCustomInfo("resetEsewa",false);
			navMan.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmEsewaConfirm"});
		}
		else if(res.referenceId&&res.status=="Sent"){
			transactionObj.setTransactionAttribute("esewaRefId",res.referenceId);
			transactionObj.setTransactionAttribute("esewaTransId",res.transactionId);
			scope.invokeEsewaLoad();
		}else{
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.common.OoopsServerErrormb"));
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa eSewaIntraBankTransfersSucc*********************************"+e);
		}
		},
		eSewaIntraBankTransfersfail:function(err){
		try{
		var scope=this;
		var navMan=applicationManager.getNavigationManager();
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		//navMan.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmEsewaConfirm"});
		navMan.getCustomInfo("resetEsewa",false);
		 //var controller = applicationManager.getPresentationUtility().getController("frmEsewaConfirm", true);
		 //controller.bindError(err.errorMessage);
		 var msg;
		 try{
			 msg=JSON.parse(err.errorMessage);
		 }catch(e){
			 msg=err.errorMessage;
		 }
		 if(typeof msg=='object'){
			 if(msg.errormsg){
				 applicationManager.getPresentationUtility().Alert(msg.errormsg);
			 }
			 else{
				 applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
			 }
		 }
		 else if(typeof err.errorMessage=='string'){
			 applicationManager.getPresentationUtility().Alert(msg);
		 }
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa eSewaIntraBankTransfersfail*********************************"+e);
		}
		},
		eSewaIntraBankTransfer:function(){
		try{
		var scope=this;
		var transactionObj = applicationManager.getTransactionsListManager().getTransactionObject();
				var configManager=applicationManager.getConfigurationManager();
				var tncManager=applicationManager.getTermsAndConditionsManager();
				var navManager=applicationManager.getNavigationManager();
				var currentBankDate=navManager.getCustomInfo("CurrentBankDate");
		var obj={
						"ExternalAccountNumber":configManager.ESEWA_TOPUP_PAYABLE_ACCOUNT,
						"amount":transactionObj.esewaAmount,
						"beneficiaryAddressLine1": transactionObj.esewaId,
						"beneficiaryAddressLine2": transactionObj.esewaId,
						"beneficiaryPhone": transactionObj.esewaToAccName,
						"beneficiaryCity": "eSewa wallet topup",
						"beneficiarycountry": transactionObj.esewaTP,
						"beneficiaryEmail":"",
						"beneficiaryName":transactionObj.esewaFrmAccName,
						"beneficiaryNickname":"",
						"beneficiaryState":"",
						"beneficiaryZipcode":"",
						"createWithPaymentId":"true",
						"deletedDocuments":"",
						"frequencyEndDate":currentBankDate,
						"frequencyStartDate":currentBankDate,
						"frequencyType":"Once",
						"fromAccountCurrency":transactionObj.esewafromAccCurrency,
						"fromAccountNumber":transactionObj.esewaFromAccount,
						"iban":"",
						"isScheduled":"0",
						"numberOfRecurrences":"",
						"paidBy":"",
						"paymentType":"",
						"scheduledDate":currentBankDate,
						"serviceName":"INTRA_BANK_FUND_TRANSFER_CREATE",
						"swiftCode":"",
						"toAccountCurrency":"NPR",
						"toAccountNumber":configManager.ESEWA_TOPUP_PAYABLE_ACCOUNT,
						"transactionCurrency":transactionObj.esewafromAccCurrency,
						"transactionId":transactionObj.esewaRefId,
						"transactionAmount":transactionObj.esewaAmount,
						"transactionType":"ExternalTransfer",
						"transactionsNotes":"",
						"uploadedattachments":"",
						"userId":""
						};
						navManager.setCustomInfo("esewaTransferObj",obj);
			tncManager.eSewaIntraBankTransfers(obj,scope.eSewaIntraBankTransfersSucc.bind(scope),scope.eSewaIntraBankTransfersfail.bind(scope));
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa eSewaIntraBankTransfer*********************************"+e);
		}
		},
		cancelesewa:function(){
			try{
			}catch(e){
				applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
			}
		},
		invokeEsewaLoad:function(){
		try{
				var scope=this;
				var transactionObj = applicationManager.getTransactionsListManager().getTransactionObject();			
				var tncManager=applicationManager.getTermsAndConditionsManager();				
				// ===== eSewa v2 load payload - DISABLED 2026-09-09 =====
				// var userObj = applicationManager.getUserPreferencesManager().getUserObj() || {};
				// var initiatorFullName = ((userObj.userfirstname || "") + " " + (userObj.userlastname || "")).trim();
				// var params=
				// {
				// "frmAccNumber": transactionObj.esewaFromAccount,
				// "frmAccName": initiatorFullName || transactionObj.esewaFrmAccName,
				// "paymentDesc":transactionObj.esewaTP,
				// "field1": userObj.phone || "",
				// "field2": "",
				// "Fee": String(transactionObj.esewaCharges || "").trim(),
				// "eSewaId": transactionObj.esewaId,
				// "amount": String(transactionObj.esewaEnteredAmount || "").trim(),
				// "referenceId": transactionObj.esewaRefId,
				// "transactionId": transactionObj.esewaTransId,
				// "bookingId": transactionObj.esewaBookingId,
				// "originatingUniqueId": transactionObj.esewaOriginatingUniqueId
				// };
				// ===== end eSewa v2 =====
				var params=
				{
				"frmAccNumber": transactionObj.esewaFromAccount,
				"frmAccName": transactionObj.esewaFrmAccName,
				"paymentDesc":transactionObj.esewaTP,
				"field1": transactionObj.esewaToAccName,
				"field2": "",
				"Fee":transactionObj.esewaCharges,
				"eSewaId": transactionObj.esewaId,
				"amount": transactionObj.esewaEnteredAmount,
				"referenceId": transactionObj.esewaRefId,
				"transactionId": transactionObj.esewaTransId
				};
				tncManager.eSewaAmountLoad(params,scope.eSewaAmountLoadSuccess.bind(scope),scope.eSewaAmountLoadFailure.bind(scope));
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		eSewaAmountLoadSuccess:function(res){
		try{
		var scope=this;
		var navMan=applicationManager.getNavigationManager();
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(res.transaction_status=="COMPLETE"){
		navMan.setCustomInfo("esewasuccessRes",res);
		navMan.getCustomInfo("resetEsewa",true);
		navMan.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmEsewaSuccess"});
		}
		else{
			navMan.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmEsewaConfirm"})
		 var controller = applicationManager.getPresentationUtility().getController("frmEsewaConfirm", true);
		 controller.bindError(res);
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa eSewaAmountLoadSuccess*********************************"+e);
		}
		},
		eSewaAmountLoadFailure:function(err){
		try{
		var scope=this;
		var navMan=applicationManager.getNavigationManager();
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		navMan.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmEsewaConfirm"})
		 var controller = applicationManager.getPresentationUtility().getController("frmEsewaConfirm", true);
		 controller.bindError(err.errorMessage);
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa eSewaAmountLoadFailure*********************************"+e);
		}
		},
		getEsewaHistory:function(){
		try{
		var scope=this;
		var tncManager=applicationManager.getTermsAndConditionsManager();	
		tncManager.geteSewaActivities({},scope.getEsewaHistorysuccess.bind(scope),scope.getEsewaHistoryFailure.bind(scope));
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		getEsewaHistorysuccess:function(res){
		try{
		var scope=this;
		var navMan=applicationManager.getNavigationManager();
		var historyData={"isHistorySuccess":false,"data":""};
		if(res.Transactions&&res.Transactions.length!=0){
			historyData.isHistorySuccess=true;
			historyData.data=res.Transactions;
		}
		navMan.setCustomInfo("esewaHistoryData",historyData);
		navMan.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmesewaHistory"})
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		getEsewaHistoryFailure:function(err){
		try{
		var scope=this;
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		}
    /*getPayeeBankDetails: function(){
   var navMan = applicationManager.getNavigationManager();
    applicationManager.getTransfersManager().getPayeesList("", this.getPayeeBankDetailsSuccess.bind(this),this.getPayeeBankDetailsError.bind(this));
    },
getPayeeBankDetailsSuccess: function(response){
    try{
var navMan = applicationManager.getNavigationManager();
var responseData =response;
var preData = navMan.getCustomInfo("frmTransfersDetails");
for(var i=0; i<responseData["ExternalAccounts"].length;i++){
if(preData.toAccountNumber == responseData["ExternalAccounts"][i]["accountNumber"]){
    var payeeDetails = responseData["ExternalAccounts"][i]
}
}
var allData =Object.assign(preData,payeeDetails);
allData.flag ="Domestic Transfers";
 navMan.setCustomInfo("frmTransfersDetails",allData);
navMan.navigateTo("frmTransfersDetails");
    }catch(err){
        kony.print("error"+ err);
    }
},
getPayeeBankDetailsError: function(err){

},*/
    };
});