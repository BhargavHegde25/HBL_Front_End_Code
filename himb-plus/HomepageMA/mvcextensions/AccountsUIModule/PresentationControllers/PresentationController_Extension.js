define(["CommonUtilities", "OLBConstants"], function(CommonUtilities, OLBConstants) {
  var frmNames = {
    "appName": "HomepageMA",
    "friendlyName": "AccountsUIModule/frmFirst"
  };
  return{
   getCampaignsSuccess : function(res) {
     if (kony.application.getCurrentForm().id === "frmFirst") {
         var response = {
             "campaignId" : res
         }
 var navMan = applicationManager.getNavigationManager();
  navMan.navigateTo({   
   "appName": "HomepageMA",
     "friendlyName": "frmFirst",
          },true,response);
      } else {
         applicationManager.getNavigationManager().updateForm({
             "campaignRes": res
         });
     }
 },
 accountActivity : function(){
    //calling getDisputeConfigurations below to make account details screen populate data properly while navigating from new dashboard(frmFirst)
    var config = applicationManager.getConfigurationManager();
    config.getDisputeConfigurations();
  navManager = applicationManager.getNavigationManager();
            var accId=navManager.getCustomInfo("defaultAcc").Accounts[0].Account_id;
  params={
    "accountID":accId
  }
       applicationManager.getAccountManager().accountActivity(params,this.accountActivitySC.bind(this), this.accountActivityEC.bind(this));
  },
  accountActivitySC : function(response){
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo({
        "appName": "HomepageMA",
        "friendlyName": "frmFirst",
      }, true, response);
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "appName": "HomepageMA",
        "moduleName": "AccountsUIModule"
      }).presentationController.fetchCompletedandScheduledTransactions();
    },
    accountActivityEC: function (error) {
   var err = error;
   var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo({
        "appName": "HomepageMA",
        "friendlyName": "frmFirst",
      }, true, "response");
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "appName": "HomepageMA",
        "moduleName": "AccountsUIModule"
      }).presentationController.fetchCompletedandScheduledTransactions();
   //alert("error" + err);   
   },
   accountTransactions: function(){
     var params ={
     accountId : "105538",
     CompanyId : "GB0010001"
     }
     applicationManager.getAccountManager().getaccountTransactions(params,this.accountTrSC.bind(this), this.accountTrEC.bind(this));
   },
   accountTrSC: function(res){
     //alert ("response:" + res)
	 applicationManager.getPresentationUtility().Alert ("response:" + res)
   },
   accountTrEC: function(err){
     //alert ("error:" + err)
	applicationManager.getPresentationUtility().Alert ("error:" + err)
   },
   fetchCompletedandScheduledTransactions : function() {
     applicationManager.getAccountManager().fetchCompletedandScheduledTransaction(this.fetchCompletedandScheduledTransactionsSuccess.bind(this), this.fetchCompletedandScheduledTransactionsFailure.bind(this));
  },
  /**
   * Method that receives upcomming scheduled transactions for accounts dashboard
   * @param {Collection} transactions List of transactions
   */
  fetchCompletedandScheduledTransactionsSuccess :function(transactions) {
    var response = {
          "transactions": transactions
      }
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo({
          "appName": "HomepageMA",
          "friendlyName": "frmFirst",
      }, true, response);
    // applicationManager.getNavigationManager().updateForm({
    //             transactions: response.transactions
    //         });
    //   applicationManager.getNavigationManager().updateForm({
    //       ResetPinCheck: "true"
    //   });
    //   kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
    //       "appName": "HomepageMA",
    //       "moduleName": "AccountsUIModule"
    //   }).presentationController.fetchHBLParkingAccounts();
  },
  /**
   * Method that gets called when there is an error in fetching upcomming account dasboard transactions
   * @param {Object} error Error Object
   */
 fetchCompletedandScheduledTransactionsFailure : function(error) {
      applicationManager.getNavigationManager().updateForm({
          UpcomingTransactions: [],
          serviceError: true
      });
  },
  checkResetPinFlow : function() {
     var flag = kony.store.getItem("DeeplinkReset");
        if(flag  == "true"){
            // var navMan = applicationManager.getNavigationManager();
            // res ={
            //     "Deeplink": "true"
            // }
            // navMan.navigateTo({   
            //     "appName": "ManageProfileMA",
            //     "friendlyName": "frmResetTransactionPin",
            // },true,res);
            this.doResetPinFlowNavigation();
            kony.store.setItem("DeeplinkReset","false",false)
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("DeepLinkResetPin","response");
        }
    //applicationManager.getAccountManager().getHBLParkingAccounts(this.fetchHBLParkingAccountsSuccess.bind(this), this.fetchHBLParkingAccountsFailure.bind(this));
 },
 /**
  * Method that receives upcomming scheduled transactions for accounts dashboard
  * @param {Collection} transactions List of transactions
  */
 doResetPinFlowNavigation :function() {
    var navMan = applicationManager.getNavigationManager();
            res ={
                "Deeplink": "true"
            }
            navMan.navigateTo({   
                "appName": "ManageProfileMA",
                "friendlyName": "frmResetTransactionPin",
            },true,res);
//   var navManager = applicationManager.getNavigationManager();
//   navManager.setCustomInfo("getHBLParkingAccounts", response);
//   kony.mvc.MDAApplication.getSharedInstance().appContext.HBLParkingAccountDetails=response;
//   var flag = kony.store.getItem("DeeplinkReset");
//         if(flag  == "true"){
//             var navManager = applicationManager.getNavigationManager();
//             navManager.setCustomInfo("DeepLinkResetPin",response);
//             var navMan = applicationManager.getNavigationManager();
//             kony.store.setItem("DeeplinkReset","false",false)
//             res ={
//                 "Deeplink": "true"
//             }
//             navMan.navigateTo({   
//                 "appName": "ManageProfileMA",
//                 "friendlyName": "frmResetTransactionPin",
//             },true,res);
//         }
 },
 /**
  * Method that gets called when there is an error in fetching upcomming account dasboard transactions
  * @param {Object} error Error Object
  */
//  fetchHBLParkingAccountsFailure : function(error) {
//  },
 getMerchantPaymentCharges : function(params) {
  applicationManager.getAccountManager().getMerchantPaymentCharges(params,this.getMerchantPaymentChargesSuccess.bind(this), this.getMerchantPaymentChargesFailure.bind(this));
},
/**
* Method that receives upcomming scheduled transactions for accounts dashboard
* @param {Collection} transactions List of transactions
*/
getMerchantPaymentChargesSuccess :function(response) {

var navManager = applicationManager.getNavigationManager();
//navManager.setCustomInfo("getHBLParkingAccounts", response);
kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges=response;
},
/**
* Method that gets called when there is an error in fetching upcomming account dasboard transactions
* @param {Object} error Error Object
*/
getMerchantPaymentChargesFailure : function(error) {
},

getUnreadMessagesCountCompletionCallback : function(response) {
    applicationManager.getNavigationManager().updateForm({
        unreadCount: {
            count: response.totalUnreadCount,
            priorityMessageCount: response.priorityMessageCount
        }
    }, frmNames);
  },
  processAccountsData : function(data) {
        var accProcessedData = [];
        for (var i = 0; i < data.length; i++) {
            accProcessedData[i] = {};
            accProcessedData[i].accountName = data[i].accountName;
            accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i]);
            accProcessedData[i].accountID = data[i].accountID;
            accProcessedData[i].bankName = data[i].bankName;
            accProcessedData[i].accountBalanceType = this.getAvailableBalanceType(data[i]);
            accProcessedData[i].accountType = data[i].accountType;
            accProcessedData[i].nickName = data[i].nickName;
			accProcessedData[i].currencyCode = data[i].currencyCode;
			accProcessedData[i].supportTransferFrom = data[i].supportTransferFrom
        } 
        return accProcessedData;
    },
    isValidAction : function(actionName, account) {
      var isValid = false;
      var orientationHandler = new OrientationHandler();
      var id = account.accountID;
      var configManager = applicationManager.getConfigurationManager();
      var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
      var principalBalance, currentAmountDue;
      if (account.externalIndicator && account.externalIndicator === "true") {
          switch (actionName) {
              case OLBConstants.ACTION.REFRESH_ACCOUNT:
              case OLBConstants.ACTION.REMOVE_ACCOUNT:
                  return true;
              default:
                  isValid = false;
          }
      } else {
          switch (actionName) {
              case OLBConstants.ACTION.PAY_A_BILL:
                  isValid = configManager.checkAccountAction(id, "BILL_PAY_CREATE");
                  break;
              case OLBConstants.ACTION.VIEW_DOCUMENT:
                  isValid = configManager.checkAccountAction(id, "VIEW_DOCUMENTS") || applicationManager.getConfigurationManager().checkUserPermission('VIEW_DOCUMENTS') ;
                  break;
              case OLBConstants.ACTION.CHANGE_REPAYMENT_DAY:
                  isValid = configManager.checkAccountAction(id, "CHANGE_REPAYMENT_DAY-VIEW")|| applicationManager.getConfigurationManager().checkUserPermission('CHANGE_REPAYMENT_DAY-VIEW') ;
                  break;
              case OLBConstants.ACTION.RAISE_A_REQUEST:
                  isValid = configManager.checkAccountAction(id, "MESSAGES_CREATE_OR_REPLY")|| applicationManager.getConfigurationManager().checkUserPermission('MESSAGES_CREATE_OR_REPLY');
                  break;
              case OLBConstants.ACTION.MAKE_A_TRANSFER:
              case OLBConstants.ACTION.TRANSFER_MONEY:
                  if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE") {
                      if(configManager.TransferFlowType === "UTF"){
                          isValid =  false;
                          return;
                      }
                      isValid = configManager.checkAccountAction(id, "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
                  } 
                  else {
                      isValid = configManager.checkAccountAction(id, "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") ||
                          configManager.checkAccountAction(id, "INTRA_BANK_FUND_TRANSFER_CREATE") ||
                          configManager.checkAccountAction(id, "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") ||
                          configManager.checkAccountAction(id, "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
                      if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true") {
                          isValid = isValid || configManager.checkAccountAction(id, "P2P_CREATE")
                      } else {
                          isValid = isValid || configManager.checkAccountAction(id, "DOMESTIC_WIRE_TRANSFER_CREATE") ||
                              configManager.checkAccountAction(id, "INTERNATIONAL_WIRE_TRANSFER_CREATE");
                      }
                  }
                  break;
              case OLBConstants.ACTION.PAY_MONEY:
                  if (applicationManager.getConfigurationManager().getDeploymentGeography() == "EUROPE") {
                      isValid = configManager.checkAccountAction(id, "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") ||
                          configManager.checkAccountAction(id, "INTRA_BANK_FUND_TRANSFER_CREATE") ||
                          configManager.checkAccountAction(id, "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
                  } else {
                      isValid = false
                  }
                  break;
              case OLBConstants.ACTION.PAY_A_PERSON_OR_SEND_MONEY:
                  if (applicationManager.getConfigurationManager().getConfigurationValue('isFastTransferEnabled') === "true")
                      isValid = false;
                  else
                      isValid = configManager.checkAccountAction(id, "P2P_CREATE")
                  break;
              case OLBConstants.ACTION.PAY_DUE_AMOUNT:
              case OLBConstants.ACTION.PAYOFF_LOAN:
                  principalBalance = Number(account.principalBalance) ? Number(account.principalBalance) : 0;
                  currentAmountDue = Number(account.currentAmountDue) ? Number(account.currentAmountDue) : 0;
                  isValid = configManager.checkAccountAction(id, "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") ||
                      configManager.checkAccountAction(id, "INTRA_BANK_FUND_TRANSFER_CREATE") ||
                      configManager.checkAccountAction(id, "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") ||
                      configManager.checkAccountAction(id, "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE")
                  break;
              case OLBConstants.ACTION.STOPCHECKS_PAYMENT:
                  isValid = applicationManager.getConfigurationManager().checkUserPermission('STOP_PAYMENT_REQUEST_CREATE');
                  break;
              case OLBConstants.ACTION.REQUEST_CHEQUE_BOOK:
              //    isValid = applicationManager.getConfigurationManager().checkUserPermission('CHEQUE_BOOK_REQUEST_CREATE');
                  isValid = applicationManager.getConfigurationManager().checkAccountAction(account.accountID, "CHEQUE_BOOK_REQUEST_CREATE") && (account.supportTransferFrom=="1");
                  break;
              case OLBConstants.ACTION.VIEW_MYCHEQUES:
                  isValid = applicationManager.getConfigurationManager().checkUserPermission('VIEW_CHEQUES_VIEW');
                  break;
              case OLBConstants.ACTION.MANAGE_CARDS:
                  isValid = true;
                  break;
              case OLBConstants.ACTION.SAVINGS_POT:
                  isValid = applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_VIEW) || applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_VIEW);
                  break;
              case OLBConstants.ACTION.UPDATE_ACCOUNT_SETTINGS:
                  isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                  break;
              case OLBConstants.ACTION.ACCOUNT_SETTINGS:
                  isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                  break;
              case OLBConstants.ACTION.ACCOUNT_ALERTS:
                  isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                  break;
              case OLBConstants.ACTION.ACCOUNT_PREFERENCES:
                  isValid = !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640);
                  break;
              case OLBConstants.ACTION.EDIT_ACCOUNT:
                  return !(orientationHandler.isMobile || kony.application.getCurrentBreakpoint() == 640) && applicationManager.getConfigurationManager().checkUserPermission("ACCOUNT_SETTINGS_EDIT");
                  break;
              case OLBConstants.ACTION.REFRESH_ACCOUNT:
              case OLBConstants.ACTION.REMOVE_ACCOUNT:
                  return false;
              case OLBConstants.ACTION.SHOW_DISPUTE_LIST:
                  return applicationManager.getConfigurationManager().checkUserFeature("DISPUTE_TRANSACTIONS");
               case OLBConstants.ACTION.VIEW_STATEMENTS:
                 return applicationManager.getConfigurationManager().checkUserPermission('VIEW_COMBINED_STATEMENTS')||applicationManager.getConfigurationManager().checkUserPermission('VIEW_ESTATEMENTS');
              default:
                  isValid = true;
          }
      }
      return isValid;
  },
  getBankDate: function() {
			applicationManager.getBillManager().fetchBankDate({}, this.getBankDateSuccess.bind(this), this.getBankDateFailure.bind(this));
	},
		getBankDateSuccess: function(response) {
			var bankDates = response.date[0];
			applicationManager.getNavigationManager().setCustomInfo("bankDates", bankDates);
             kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "appName": "HomepageMA",
          "moduleName": "AccountsUIModule"
      }).presentationController.checkResetPinFlow();
		},
		getBankDateFailure: function(response) {
			applicationManager.getNavigationManager().setCustomInfo("bankDates", undefined);
		},
		loadAccountsLandingComponents: function() {
			this.getUnreadMessages();
			//this.fetchScheduledTransactions();
			var configurationManager = applicationManager.getConfigurationManager();
			/* if (configurationManager.isSMEUser === "false")
			 if(applicationManager.getConfigurationManager().isMicroAppPresent("FinanceManagementMA")){
			     this.fetchPFMData();
			   }*/
			if (configurationManager.isCombinedUser === "false")
				this.fetchMessages();
		},
 };
});