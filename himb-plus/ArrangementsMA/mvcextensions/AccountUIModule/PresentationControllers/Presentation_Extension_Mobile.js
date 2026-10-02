define([], function () {

    return {

        editAccountNickName: function (accountNickName) {
            var navMan = applicationManager.getNavigationManager();
            var isBusinessUser = navMan.getCustomInfo("isBusinessUserFlow");
            var accountDetailsForm = "frmAccountDetails";
            var username = navMan.getCustomInfo("frmLoginusername");
            if (isBusinessUser) {
                accountDetailsForm = "frmAccountDetailsNew";
            }
            var accDetails = navMan.getCustomInfo(accountDetailsForm);
            var accData = accDetails.selectedAccountData;
            var data = {
                "accountID": accData.accountID,
                "nickName": accountNickName,
            };
            var params = {
                "accountID": accData.accountID,
                "nickName": accountNickName,
                "userName": username
            };
            var accountManager = applicationManager.getAccountManager();
            var addData = accountManager.getInternalAccountByID(data.accountID);
            data.email = "";
            data.favouriteStatus = addData.favouriteStatus == "1" ? 1 : 0;
            data.eStatementEnable = addData.eStatementEnable == "1" ? 1 : 0;
            var isExternalAccount = accData.type === "external" ? true : false;
            if (isExternalAccount) {
                var accountId = accData.accountID;
                var userName = accData.userName;
                var bankId = parseInt(accData.bankId, 10);
                var accountName = accData.account;
                var mainUser = applicationManager.getUserPreferencesManager().getUserName();
                var loopCount = "1";
                var records = {
                    "Account_id": accountId,
                    "NickName": accountNickName,
                    "main_user": mainUser,
                    "username": userName,
                    "bank_id": bankId,
                    "AccountName": accountName,
                    "loop_count": loopCount
                };
                accountManager.partialUpdateExternalAccount(records, function () {
                    this.fetchInfoForExternalBankAccount();
                }, this.editNickNamePresError);
            }
            else {
                navMan.setCustomInfo("frmAccInfoEdit", data.nickName);
                accountManager.updateExternalAccountFavouriteStatus(params, this.editNickNamePresSucc, this.editNickNamePresError);
            }
        },

        editNickNamePresSucc: function (res) {
            var navMan = applicationManager.getNavigationManager();
            var isBusinessUser = navMan.getCustomInfo("isBusinessUserFlow");
            var accountDetailsForm = "frmAccountDetails";
            if (isBusinessUser) {
                accountDetailsForm = "frmAccountDetailsNew";
            }
            var accData = navMan.getCustomInfo("frmAccInfoEdit");
            var accDetails = navMan.getCustomInfo(accountDetailsForm);
            var accountSummaryDetails = navMan.getCustomInfo("currencyDetails");
            accountSummaryDetails.nickName = accData;
            navMan.setCustomInfo("currencyDetails", accountSummaryDetails);
            accDetails.selectedAccountData.nickName = accData;
            navMan.setCustomInfo(accountDetailsForm, accDetails);
            var accInfo = navMan.getCustomInfo("frmAccountInfo");
            accInfo["Accounts[0].nickName"] = accData;
            navMan.setCustomInfo("frmAccountInfo", accInfo);
            var accountManager = applicationManager.getAccountManager();
            accountManager.updateNickNameLocally(accDetails.selectedAccountData);
            navMan.goBack();
        },

        editNickNamePresError: function (err) {
            kony.print("error in edit nick Name" + err);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"])
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        },

        accountActivity: function (param) {
            applicationManager.getAccountManager().accountActivity(param, this.accountActivitySC, this.accountActivityEC);
        },
        accountActivitySC: function (response) {
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("graphDetails", response);
            navMan.setCustomInfo("barGraphDetails", true);
            var navManager = applicationManager.getNavigationManager();
            var formController = applicationManager.getPresentationUtility().getController('frmAccountDetails', true);
            formController.displayBarChart();
            //navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});

        },
        accountActivityEC: function (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]){
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            }else{
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
            }
        },
        presentationAccountsErr : function(err) {
    kony.print(err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  applicationManager.getPresentationFormUtility().logoutUser(true);
  },
   generateTransactionDetailsFailure : function(error) {
     var formController = applicationManager.getPresentationUtility().getController('frmTransactionDetails', true);
      formController.checkForToastMessage();
   },
    presentationAccountsSucc : function(res) {
      var navManager = applicationManager.getNavigationManager();
      var accountObj = applicationManager.getAccountManager();
      var accountData = accountObj.getInternalAccounts();
      var custominfo = navManager.getCustomInfo("frmDashboard");
      var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
      if(!custominfo){
        custominfo = {};
      }
      var closedAccounts = new Map();
      var closedAccts = [];
      accountData.forEach(function(account) {
         if (closedAccounts.has(account.Membership_id)) {
            closedAccounts.set(account.Membership_id, closedAccounts.get(account.Membership_id) + 1);
         } else {
            closedAccounts.set(account.Membership_id, 1);
         }
      });
      accountData.forEach(function(account) {
         if (!((closedAccounts.get(account.Membership_id) === 1) && (account.accountStatus === 'CLOSED' || account.accountStatus === 'Closed') && 
               !applicationManager.getConfigurationManager().checkUserPermission('VIEW_CLOSED_ACCOUNT'))) {
             closedAccts.push(account);
         }
      });
      accountData = closedAccts;
     var removePortifolioAccountsData = JSON.parse(JSON.stringify(accountData)) 
     for(var i = removePortifolioAccountsData.length-1; i >=0; i--){
       if(removePortifolioAccountsData[i].isPortFolioAccount===true){
         removePortifolioAccountsData.splice(i,1);
       }
     }
     if(removePortifolioAccountsData.length==accountData.length)
       custominfo.accountData = accountData;
     else
       custominfo.accountData = removePortifolioAccountsData;
      navManager.setCustomInfo("frmDashboard", custominfo);
      var configurationManager = applicationManager.getConfigurationManager();
     if(kony.application.getCurrentForm().id ==="frmLogin"){
          const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
          if (isAccUIModulePresent) {
          var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule"});
        accMode.presentationController.dashboardService();
          }
     }else{
    var frmName = "";
      frmName = {
            "appName": "HomepageMA",
            "friendlyName": "AccountsUIModule/frmUnifiedDashboard"
        };
      //if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))
      navManager.navigateTo(frmName);
     }
    },
    };
});