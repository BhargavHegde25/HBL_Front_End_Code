define(function() {
	return {
		getDefaultUserProfile : function() {
		var configManager = applicationManager.getConfigurationManager();
		var userObj = applicationManager.getUserPreferencesManager().getUserObj();//kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
		var data = {
            defaultTransferAccount: userObj['default_account_transfers'],
            defaultBillPayAccount: userObj['default_account_payments'],
            defaultOpenFixedDepositAccount: userObj['default_account_deposit'],
            defaultLoanPaymentAccount: userObj['default_account_loanpayment'],
			defaultCardPaymentAccount: userObj['default_account_cardpayment'],
            defaultCheckManagementAccount: userObj['default_account_checkmanagement'],
			defaultPrimaryAccount: defaultPrimaryAccount.accountID

        };
        var getDefaultSelectedKey = function(data) {
            if (data && data !== "-1") {
                return data;
            } else {
                return 'undefined';
            }
        };
     
        var defaultNames = this.getDefaultAccountNames(data);
        var defaultAccountNum = {};
        var defaultAccounts = this.defaultAccounts;
		 defaultAccountNum['defaultTransfersAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultTransferAccount);
        defaultAccountNum['defaultBillPayAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultBillPayAccount);
        defaultAccountNum['defaultOpenFixedDepositAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultOpenFixedDepositAccount);
        defaultAccountNum['defaultLoanPaymentAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultLoanPaymentAccount);
		defaultAccountNum['defaultCardPaymentAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCardPaymentAccount);
        defaultAccountNum['defaultCheckManagementAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultCheckManagementAccount);
        defaultAccountNum['defaultPrimaryAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultPrimaryAccount);
        defaultNames.defaultAccountNum = defaultAccountNum;
        applicationManager.getNavigationManager().navigateTo("frmAccountSettingsDefaultAccount");
         applicationManager.getNavigationManager().updateForm({
            "showDefaultUserAccounts": defaultNames
        }, 'frmAccountSettingsDefaultAccount');
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
		getAccountsListViewModel['PrimaryAccounts'] = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
        getAccountsListViewModel['defaultPrimaryAccounts'] = getDefaultSelectedKey(defaultAccounts.defaultPrimaryAccount);
        var configManager = applicationManager.getConfigurationManager();
		var userObj = applicationManager.getUserPreferencesManager().getUserObj();//kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
        var data = {
            defaultTransferAccount: userObj['default_account_transfers'],
            defaultBillPayAccount: userObj['default_account_payments'],
            defaultOpenFixedDepositAccount: userObj['default_account_deposit'],
            defaultLoanPaymentAccount: userObj['default_account_loanpayment'],
			defaultCardPaymentAccount: userObj['default_account_cardpayment'],
            defaultCheckManagementAccount: userObj['default_account_checkmanagement'],
			defaultPrimaryAccount: defaultPrimaryAccount.accountID	
        };
        var defaultNames = this.getDefaultAccountNames(data);
        getAccountsListViewModel.defaultNames = defaultNames;
      applicationManager.getNavigationManager().navigateTo("frmAccountSettingsSetDefaultAccount");
         applicationManager.getNavigationManager().updateForm({
            "getAccountsList": getAccountsListViewModel
        }, 'frmAccountSettingsSetDefaultAccount');
    },
		
	};
});