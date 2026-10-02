define([], function () {
    return {
        updateNickName : function (params, eStatementPopup) {
            applicationManager.getNavigationManager().setCustomInfo("eStatementPopupdata",eStatementPopup);
            
            var accountObj = applicationManager.getAccountManager();
            this.estatementData = params;
            accountObj.updateExternalAccountFavouriteStatus(params, this.updateNickNameSuccessCallback, this.updateNickNameErrorCallback);
        },
        updateNickNameSuccessCallback: function () {
           var eStatementPopup = applicationManager.getNavigationManager().getCustomInfo("eStatementPopupdata");
            scope_SettingsPresenter.eStatementPopup = eStatementPopup;
            this.updateJsonData();
        },
        updateNickNameErrorCallback: function (reserr) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (reserr["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
            }
        },

        setDataDefaultAccLogin: function (selectedAcntRow) {
            var scope_SettingsPresenter = this;
            var accountObj = applicationManager.getAccountManager();
            var navManager = applicationManager.getNavigationManager();
            
            var acctInfo = accountObj.getSavingsAndCheckingsAccounts();
            if (selectedAcntRow === 0) {
                
                scope_SettingsPresenter.defaultAcc = "default_account_dashboard";
            }
            else if (selectedAcntRow === 1) {
               
                scope_SettingsPresenter.defaultAcc = "default_account_transfers";
            }
            else if (selectedAcntRow === 2) {
                
                scope_SettingsPresenter.defaultAcc = "default_account_billPay";
            }
            else if (selectedAcntRow === 3) {
               
                
                scope_SettingsPresenter.defaultAcc = "default_account_cardpayment";
            }
            else if (selectedAcntRow === 4) {
                acctInfo = accountObj.internalAccounts;
                acctInfo =scope_SettingsPresenter.getSavingsAndCheckingsAccounts(acctInfo);
                scope_SettingsPresenter.defaultAcc = "default_from_account_qr";
                //scope_SettingsPresenter.defaultAcc = "default_account_qrpayment";
            }
            else if (selectedAcntRow === 5) {
               
                scope_SettingsPresenter.defaultAcc = "default_account_deposit";
            }
            else if (selectedAcntRow === 6) {
                
                scope_SettingsPresenter.defaultAcc = "default_account_checkmanagement";
            }
            /*
            else if (selectedAcntRow === 7) {
               
                scope_SettingsPresenter.defaultAcc = "default_account_checkdeposit";
            } */
           else if (selectedAcntRow === 7) {
                
                scope_SettingsPresenter.defaultAcc = "default_account_cardless";
            }
			 else if (selectedAcntRow === 8) {
                scope_SettingsPresenter.defaultAcc = "default_account_esewa";
            }

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
            var selectedDefaultAccountType = scope_SettingsPresenter.defaultAcc;
            navManager.setCustomInfo("selectedDefaultAccountType", selectedDefaultAccountType);
            var acctInfoInp = filterList(acctInfo);
            if (selectedAcntRow === 4 || selectedAcntRow === 5 || selectedAcntRow === 7||selectedAcntRow ===8) {
                var acctInfoBasedOnCurrency = filterListBasedOnCurrency(acctInfoInp);
				if(selectedAcntRow==5){
					acctInfoBasedOnCurrency=acctInfoBasedOnCurrency.filter(function(acc){
						if(acc.accountType=="Savings")
						return acc;
					});
				}
				if(selectedAcntRow==8){
					acctInfoBasedOnCurrency=acctInfoBasedOnCurrency.filter(function(acc){
						if(acc.supportTransferFrom == "1")
						return acc;
					});
				}
                if (acctInfoBasedOnCurrency.length === 0) {
                    var currentForm = kony.application.getCurrentForm().id;
                    var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
                    controller.noEligibleAccounts();
                } else {
            var tempData = navManager.getCustomInfo("frmPreferencesDefaultAccount");
                tempData[1] = acctInfoBasedOnCurrency;
                for (var i = 0; i < tempData[1].length; i++) {
                    var account = tempData[1][i];
                    if (account.accountID && account.accountName) {
                        var lastFour = String(account.accountID).slice(-4);
                        account.processedName = account.accountName + "...." + lastFour;
                    } else {
                        account.processedName = ""; 
                    }
                }
                navManager.setCustomInfo("frmPreferencesDefaultAccount", tempData);
                    navManager.navigateTo("frmPreferencesDefaultAccount");
                }
            } else {
                var tempData = navManager.getCustomInfo("frmPreferencesDefaultAccount");
            tempData[1] = acctInfoInp;
                for (var i = 0; i < tempData[1].length; i++) {
                    var account = tempData[1][i];
                    if (account.accountID && account.accountName) {
                        var lastFour = String(account.accountID).slice(-4);
                        account.processedName = account.accountName + "...." + lastFour;
                    } else {
                        account.processedName = ""; 
                    }
                }
            navManager.setCustomInfo("frmPreferencesDefaultAccount", tempData);
            navManager.navigateTo("frmPreferencesDefaultAccount");
            }
        },

        getDefaultAccountforDashboard: function () {
            var default_account_dashboard = applicationManager.getDefaultDashboardObj();
            return default_account_dashboard.Accounts[0].account_id;
        },

         defaultAccounts: function () {
            var userObj = applicationManager.getUserPreferencesManager();
            var accountObj = applicationManager.getAccountManager();
            //1.Dashboard 
            var acctId = this.getDefaultAccountforDashboard();
            var defaultDashboardAcc = accountObj.getInternalAccountByID(acctId);
            //2.Transfers 
            var acctId = userObj.getDefaultAccountforTransfers();
            var defaultTransferAcc = accountObj.getInternalAccountByID(acctId);
            //3. Bill Pay 
            var acctId = userObj.getDefaultAccountforBillPay();
            var defaultBillPayAcc = accountObj.getInternalAccountByID(acctId);
            //4. Loan Payment 
            var acctId = userObj.getDefaultAccountforLoanPayment();
            var defaultLoanAcc = accountObj.getInternalAccountByID(acctId);
            //5. Card Payment 
            var acctId = userObj.getDefaultAccountforCardPayment();
            var defaultCardPaymentAcc = accountObj.getInternalAccountByID(acctId);
            //6. QR Payment  
            var acctId = userObj.getDefaultAccountforQRPayments();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultQRPaymentsAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultQRPaymentsAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
            //7. Open Fixed Deposit  
            var acctId = userObj.getDefaultAccountforDeposit();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultDepositAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultDepositAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
            //8. Check Management 
            var acctId = userObj.getDefaultAccountforCheckManagement();
            var defaultOpenCheckManagementAcc = accountObj.getInternalAccountByID(acctId);
            /*
            //9. Check Deposit 
            var acctId = userObj.getDefaultAccountforCheckDeposit();
            var defaultCheckDepositAcc = accountObj.getInternalAccountByID(acctId);
            */
            //10. Cash Withdrawal 
            var acctId = userObj.getDefaultAccountforCardlessPayments();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultCardlessAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultCardlessAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
			 var acctId = userObj.getDefaultAccountforesewa();
            if ((acctId !== null) && (acctId !== "") && (acctId !== undefined)) {
                var defaultesewaAcc = accountObj.getInternalAccountByID(acctId);
            } else {
                var defaultesewaAcc = {
                    accountName: kony.i18n.getLocalizedString("i18n.common.NA")
                }
            }
            var data = [
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.MM.Dashboard"), "lblValue": this.getFormattedAccountName(defaultDashboardAcc.accountName, defaultDashboardAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultDashboardAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("i18n.TransfersEur.Tabs.Transfers"), "lblValue": this.getFormattedAccountName(defaultTransferAcc.accountName, defaultTransferAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultTransferAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.BillPay.BillPay"), "lblValue": this.getFormattedAccountName(defaultBillPayAcc.accountName, defaultBillPayAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultBillPayAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.transaction.loanPayment"), "lblValue": this.getFormattedAccountName(defaultLoanAcc.accountName, defaultLoanAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultLoanAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.Settings.Mb.CardPayment"), "lblValue": this.getFormattedAccountName(defaultCardPaymentAcc.accountName, defaultCardPaymentAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultCardPaymentAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("i18n.qrpayments.QRPayments"), "lblValue": this.getFormattedAccountName(defaultQRPaymentsAcc.accountName, defaultQRPaymentsAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultQRPaymentsAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.Settings.Mb.OpenFixedDeposit"), "lblValue": this.getFormattedAccountName(defaultDepositAcc.accountName, defaultDepositAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultDepositAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.CM.chequeManagement"), "lblValue": this.getFormattedAccountName(defaultOpenCheckManagementAcc.accountName, defaultOpenCheckManagementAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultOpenCheckManagementAcc.accountID },
                // { "lblTitle": kony.i18n.getLocalizedString("kony.mb.ChequeDeposit"), "lblValue": this.getFormattedAccountName(defaultCheckDepositAcc.accountName,defaultCheckDepositAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultCheckDepositAcc.accountID },
                { "lblTitle": kony.i18n.getLocalizedString("kony.mb.transaction.cashWithdrawal"), "lblValue": this.getFormattedAccountName(defaultCardlessAcc.accountName, defaultCardlessAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultCardlessAcc.accountID },
				{ "lblTitle": kony.i18n.getLocalizedString("i18n.payments.loadeSewa"), "lblValue": this.getFormattedAccountName(defaultesewaAcc.accountName, defaultesewaAcc.accountID), "imgArrow": "chevron.png", "lblAccId": defaultesewaAcc.accountID }
            ];
            return (data);
        },

        getFormattedAccountName: function (accountName, accountId) {
            if (accountName && accountId) {
                var accId = accountId;
                var lastFour = accId.slice(-4);
                return accountName + "...." + lastFour;
            } else {
                var flag = kony.i18n.getLocalizedString("i18n.common.NA");
                if (accountName === flag) {
                    return flag;
                }
            }
        },

        defaultAccountUpdated: function (accId) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var updateUserObj = applicationManager.getUserPreferencesManager();
            
            var dataJSON = {};
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            dataJSON = {
                "default_account_transfers": userObj['default_account_transfers'],
                "default_account_billPay": userObj['default_account_billPay'],
                "default_account_loanpayment": userObj['default_account_loanpayment'],
                "default_account_cardpayment": userObj['default_account_cardpayment'],
                "default_from_account_qr": userObj['default_from_account_qr'],
                //"default_account_qrpayment": userObj['default_account_qrpayment'],
                "default_account_deposit": userObj['default_account_deposit'],
                "default_account_checkmanagement": userObj['default_account_checkmanagement'],
               // "default_account_checkdeposit": userObj['default_account_checkdeposit'],
                "default_account_cardless": userObj['default_account_cardless'],
				"default_account_esewa": userObj['default_account_esewa']
            }
            updateUserObj.updateUserDetails(dataJSON, scope_SettingsPresenter.updateAccSuccess, scope_SettingsPresenter.updateAccFailure);
        },
        saveDefaultAccountForDashboard: function (defaultPrimaryAccount) {
            const accountsManager = applicationManager.getAccountManager();
            accountsManager.resetCustomerDefaultAcc(defaultPrimaryAccount, this.resetCustomerDefaultAccSuccessCB, this.resetCustomerDefaultAccFailureCB);
        },
        /**
         * Method that gets called when saving default accounts is successful
         */
        resetCustomerDefaultAccSuccessCB: function () {
            this.updateDashboardData();
        },
        /**
         * Method that gets called when saving default accounts is failed
         */
        resetCustomerDefaultAccFailureCB: function () {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            }
        },
        updateDashboardData: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var inputParam = navManager.getCustomInfo("authCred")
            var authParams = {
                "username": inputParam,
                "rememberMe": true
            }
            applicationManager.getAccountManager().defaultAccount(authParams, this.updateDefaultAccountDashboardSuccess, this.updateDefaultAccountDashboardError);
        },
        updateDefaultAccountDashboardSuccess: function (response) {
            applicationManager.setDefaultDashboardObj(response);
            var navManager = applicationManager.getNavigationManager();
            var data = scope_SettingsPresenter.defaultAccounts();
            var defaultAccountChangei18NMsg= kony.i18n.getLocalizedString("konymb.settings.defaultAccountSettings");
            data.popUpMsg = (defaultAccountChangei18NMsg);
            navManager.setCustomInfo("frmSetDefaultAccount",data);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            navManager.navigateTo("frmSetDefaultAccount");
            
        },
        updateDefaultAccountDashboardError: function (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.setDefaultDashboardObj(null);
        },

        verifyDefaultAccounts : function(dataJSON) {
            var updateUserObj = applicationManager.getUserPreferencesManager();
            updateUserObj.updateUserDetails(dataJSON, scope_SettingsPresenter.verifyDefaultAccountSuccess, scope_SettingsPresenter.verifyDefaultAccountFailure);
          },
          verifyDefaultAccountSuccess : function () {
           
          },
          verifyDefaultAccountFailure : function () {
             
         },

         disableEBankingAccessSuccess: function (selectedEntities, response) {
      try {
        if (response && response.MFAAttributes && response.MFAAttributes.isMFARequired == "true") { 
          const mfaManager = applicationManager.getMFAManager();
          /*
          const mfaJSON = {
            flowType: "SUSPEND_USER",
            response: response,
            objectServiceDetails: {s
              serviceName: "RBObjects",
              dataModel: "DbxUser",
              operationName: "updateDBXUserStatus",
            },
            */
          const mfaJSON = {
            flowType: "SUSPEND_USER",
            response: response,
            objectServiceDetails: {
              serviceName: "ExternalUserManagement",
              dataModel: "ExternalUsers_2",
              operationName: "updateUserStatus",
            },
          };
          mfaManager.initMFAFlow(mfaJSON);

        } else {
          if (selectedEntities.flowType === "Default Entity NotEqualto Current Entity" || selectedEntities.flowType === "Neither Current Nor Default Entity") {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmEBankingAccessAck", selectedEntities);
            scope_SettingsPresenter.commonFunctionForNavigation("frmEBankingAccessAck");
          } else {
            var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
            authMod.presentationController.disableEBankingLogout();
          }
        }
      } catch (err) {

      }
    }
    };
});