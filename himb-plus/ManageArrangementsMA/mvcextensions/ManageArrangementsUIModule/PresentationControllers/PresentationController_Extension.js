define(function(){
  return{
    getDefaultUserProfile : function() {
		var configManager = applicationManager.getConfigurationManager();
        var userObj = applicationManager.getUserPreferencesManager().getUserObj();
        var userEsewaObj = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
		var navManager = applicationManager.getNavigationManager();
		var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0];
        var data ;
            var accounts = scope_configManager.userAccounts;
             var acc = accounts.filter(function getEligibleTransferAccounts(account){
                if((account.accountType == "Checking" || account.accountType == "Savings") && account.supportTransferFrom == "1")
                return true;
                else
                return false;
            });
            if(acc.length == 0 ){
                data = {
                    defaultTransferAccount: "NA",
                    defaultBillPayAccount:"NA",
                    defaultOpenFixedDepositAccount: "NA",
                    defaultLoanPaymentAccount: "NA",
                    defaultCardPaymentAccount: "NA",
                    defaultCheckManagementAccount: "NA",
                    defaultLoadeSewaAccount:"NA",
                    defaultPrimaryAccount: "NA"
                };
            }else{
                 var DepositeAcc = "true";
                if(defaultPrimaryAccount.currencyCode !== "NPR"){
                    DepositeAcc = "false";
                }
                data = {
                    defaultTransferAccount: (userObj['default_account_transfers'] !== null)?userObj['default_account_transfers']:defaultPrimaryAccount.accountID,
                    defaultBillPayAccount: (userObj['default_account_billPay'] !== null)?userObj['default_account_billPay']:(DepositeAcc ==="false") ?"NA" :defaultPrimaryAccount.accountID,
                    defaultOpenFixedDepositAccount: (userObj['default_account_deposit'] !== null) ? userObj['default_account_deposit'] : (DepositeAcc ==="false") ?"NA" : defaultPrimaryAccount.accountID,
                    defaultLoanPaymentAccount: (userObj['default_account_loanpayment'] !== null)?userObj['default_account_loanpayment']:defaultPrimaryAccount.accountID,
                    defaultCardPaymentAccount: (userObj['default_account_cardpayment'] !== null)?userObj['default_account_cardpayment']:defaultPrimaryAccount.accountID,
                    defaultCheckManagementAccount: (userObj['default_account_checkmanagement'] !== null)?userObj['default_account_checkmanagement']:defaultPrimaryAccount.accountID,
                    defaultLoadeSewaAccount : (userEsewaObj['default_account_esewa'] !== null && userEsewaObj['default_account_esewa'] !== undefined) ? userEsewaObj['default_account_esewa'] : defaultPrimaryAccount.accountID,
                    defaultPrimaryAccount: defaultPrimaryAccount.accountID
                };
            }
        var getDefaultSelectedKey = function(data) {
            if (data && data !== "-1") {
                return data;
            } else {
                return 'undefined';
            }
        };
     
        var defaultNames = this.getAccountNickNames(data);
        var defaultAccountNum = {};
        var defaultAccounts = this.defaultAccounts;
        defaultAccountNum['defaultTransfersAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultTransferAccount);
        defaultAccountNum['defaultBillPayAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultBillPayAccount);
        defaultAccountNum['defaultOpenFixedDepositAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultOpenFixedDepositAccount);
        defaultAccountNum['defaultLoanPaymentAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultLoanPaymentAccount);
		defaultAccountNum['defaultCardPaymentAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCardPaymentAccount);
        defaultAccountNum['defaultCheckManagementAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCheckManagementAccount);
        defaultAccountNum['defaultLoadeSewaAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultLoadeSewaAccount);
        defaultAccountNum['defaultPrimaryAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultPrimaryAccount);
        defaultNames.defaultAccountNum = defaultAccountNum;
        new kony.mvc.Navigation({"appName" : "ManageArrangementsMA", "friendlyName" : "frmAccountSettingsDefaultAccount" }).navigate();
         applicationManager.getNavigationManager().updateForm({
            "showDefaultUserAccounts": defaultNames
        }, 'frmAccountSettingsDefaultAccount');
    },
    getAccountNickNames: function(accountNumbers) {
            var defaultNames = [];
            this.defaultAccounts = accountNumbers;
            var accounts = applicationManager.getAccountManager().getInternalAccounts()
            for (var keys in accountNumbers) {
                if (accountNumbers[keys] && accountNumbers[keys] !== "-1") {
                    for (var i in accounts) {
                        if (accountNumbers[keys] === accounts[i].accountID) {
                            defaultNames[keys] = accounts[i].nickName;
                            break;
                        }
                    }
                } else {
                    defaultNames[keys] = "None";
                }
            }
            return defaultNames;
        },
    getAccountsList : function() {
        var defaultAccounts = this.defaultAccounts;
        var getDefaultSelectedKey = function(data) {
            if (data && data !== "-1") {
                return data;
            } else {
                return 'undefined';
            }
        };
        var getAccountsListViewModel = {};
        getAccountsListViewModel['TransfersAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultTransfersAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultTransferAccount);
        getAccountsListViewModel['BillPayAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultBillPayAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultBillPayAccount);
        getAccountsListViewModel['OpenFixedDepositAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultOpenFixedDepositAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultOpenFixedDepositAccount);
        getAccountsListViewModel['LoanPaymentAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultLoanPaymentAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultLoanPaymentAccount);
		getAccountsListViewModel['CardPaymentAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultCardPaymentAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCardPaymentAccount);
		getAccountsListViewModel['CheckManagementAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultCheckManagementAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCheckManagementAccount);
        getAccountsListViewModel['LoadeSewaAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultLoadeSewaAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultLoadeSewaAccount);    
		getAccountsListViewModel['PrimaryAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultPrimaryAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultPrimaryAccount);
        var configManager = applicationManager.getConfigurationManager();
		var userObj = applicationManager.getUserPreferencesManager().getUserObj();//
        var userEsewaObj = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
		var navManager = applicationManager.getNavigationManager();
		var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0];
        var data = {
            defaultTransferAccount: userObj['default_account_transfers'],
            defaultBillPayAccount: userObj['default_account_payments'],
            defaultOpenFixedDepositAccount: userObj['default_account_deposit'],
            defaultLoanPaymentAccount: userObj['default_account_loanpayment'],
			defaultCardPaymentAccount: userObj['default_account_cardpayment'],
            defaultCheckManagementAccount: userObj['default_account_checkmanagement'],
            defaultLoadeSewaAccount: userEsewaObj ['default_account_esewa'],
			defaultPrimaryAccount: defaultPrimaryAccount.accountID	
        };
        var defaultNames = this.getAccountNickNames(data);
        getAccountsListViewModel.defaultNames = defaultNames;
        new kony.mvc.Navigation({"appName" : "ManageArrangementsMA", "friendlyName" : "frmAccountSettingsSetDefaultAccount" }).navigate();
         applicationManager.getNavigationManager().updateForm({
            "getAccountsList": getAccountsListViewModel
        }, 'frmAccountSettingsSetDefaultAccount');
    },
    saveDefaultAccounts : function(defaultAccounts, defaultPrimaryAccount) {
      applicationManager.getUserPreferencesManager().updateUserDetails(defaultAccounts, this.saveDefaultAccountsSuccess.bind(this), this.saveDefaultAccountsFailure.bind(this));	
      const accountsManager = applicationManager.getAccountManager();
      accountsManager.resetCustomerDefaultAcc(defaultPrimaryAccount,this.resetCustomerDefaultAccSuccessCB.bind(this),this.resetCustomerDefaultAccFailureCB.bind(this));

    },
    /**
     * Method that gets called when saving default accounts is successful
     */
    resetCustomerDefaultAccSuccessCB : function(response) {
        var navManager = applicationManager.getNavigationManager();
        var inputParam = navManager.getCustomInfo("authCred")
        var authParams = {
            "username": inputParam,
            "rememberMe": true
        }
        applicationManager.getAccountManager().defaultAccounts(authParams, this.defaultAccountsSC.bind(this), this.defaultAccountsEC.bind(this));
        /*if(response.isDefaultAccOldUpdated =="true" && response.isDefaultAccNewUpdated =="true"){
        var navManager = applicationManager.getNavigationManager();
        var UpdateddefaultAcc=navManager.getCustomInfo("defaultaccountnum");
        navManager.setCustomInfo("defaultAcc",UpdateddefaultAcc);*/
      // applicationManager.g	etUserPreferencesManager().fetchUser(this.getDefaultUserProfile.bind(this), this.saveDefaultAccountsFailure.bind(this));
    },
    defaultAccountsSC : function(response) {
        var resData = response;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("defaultAcc", resData);
    },
    defaultAccountsEC : function(err) {
    },
    /**
     * Method that gets called when saving default accounts is failed
     */
    resetCustomerDefaultAccFailureCB : function() {
      applicationManager.getNavigationManager().updateForm({
        showServerError: true
      }, 'frmAccountSettingsSetDefaultAccount');
    },
	/**
     * Method to save preferred account data
     * @param {JSON} data -Json containing account info like favouriteStatus, NickName, E-statements etc
     */
    savePreferredAccountsData : function(data) {
		const accountsManager = applicationManager.getAccountManager();
        accountsManager.updateExternalAccountFavouriteStatus(data,this.updateAccountPreferenceSuccess.bind(this), this.updateAccountPreferenceFailure.bind(this));
    },
    getPreferredAccounts : function(){
      kony.application.showLoadingScreen();
      var self = this;
      /* Commented this line as per the bug number ARB-11106. Removed the aggregate accounts call temperorily
        if (applicationManager.getConfigurationManager().getConfigurationValue("isAggregatedAccountsEnabled") === "true") {
            function completionCallback(asyncResponse) {
                if (asyncResponse.isAllSuccess()) {
                    self.fetchAccountsSuccess(asyncResponse.responses);
                } else {
                    self.fetchAccountsFailure();
                }
            }
            var username = applicationManager.getUserPreferencesManager().getUserObj().userName;
            var asyncManager = applicationManager.getAsyncManager();
            asyncManager.callAsync([
                asyncManager.asyncItem(
                    applicationManager.getAccountManager(),
                    "fetchInternalAccounts"
                ),
                asyncManager.asyncItem(
                    applicationManager.getAccountManager(),
                    "fetchExternalAccountsData", [username]
                )
            ], completionCallback);
        } else {
            applicationManager.getAccountManager().fetchInternalAccounts(this.fetchAccountsSuccess.bind(this), this.fetchAccountsFailure.bind(this));
        }
        */
      kony.timer.schedule("timerIdgetList", function() {
        applicationManager.getAccountManager().fetchInternalAccounts(self.fetchAccountsSuccess.bind(self), self.fetchAccountsFailure.bind(self));
      }, 4, false);
    }
  };
});