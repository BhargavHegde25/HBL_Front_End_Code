define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController", "dataFormatUtility", "CommonUtilities", "OLBConstants"], function(AsyncManager, dataFormater, CommonUtilities, OLBConstants){
	return{
		getTotalDebtBalance : function(data) {
        var forUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var totalDebt = 0;
        var currencyCode;
        for (i = 0; i < data.length; i++) {
            if (data[i].accountType === configManager.constants.CREDITCARD||data[i].accountType === configManager.constants.LOAN||data[i].accountType === configManager.constants.MORTGAGE) 
				totalDebt = totalDebt + parseInt(data[i]["currentBalance"]);
        }
        if (data.length > 0) {
            currencyCode = data[0]["currencyCode"];
        }
        return forUtility.formatAmountandAppendCurrencySymbol(totalDebt, currencyCode);
    },

    defaultAccountSC: function () {
      // PERF (LOGIN_INSTANT_DASHBOARD): the Dashboard is already on screen with the saved summary; give it the
      // freshly loaded accounts instead of navigating to it again.
      var instantState = scope_Acc_Pres.instantDashboardState;
      if (instantState) {
        scope_Acc_Pres.instantDashboardState = null;
        try {
          var currentForm = kony.application.getCurrentForm();
          if (currentForm && currentForm.id === "frmHBLUnifiedDashboard") {
            var dashboardController = applicationManager.getPresentationUtility().getController("AccountsUIModule/frmHBLUnifiedDashboard", true, {"appName": "HomepageMA"});
            dashboardController.refreshAfterAccountsLoaded();
          }
        } catch (instantErr) {
          kony.print("defaultAccountSC instant refresh " + instantErr);
        }
        return;
      }
     // var resData = response;
	 /* var navMan=applicationManager.getNavigationManager();
      if (response.Accounts.length === 0) {
        //alert("No account present for the particular user");
		applicationManager.getPresentationUtility().Alert("No account present for the particular user");
        applicationManager.getPresentationFormUtility().logoutUser(true);
        return;
      }
	  if(response.Accounts[0].IBAN){
		  navMan.setCustomInfo("DashboardCardImg",response.Accounts[0].IBAN);
      }*/
      var navManager = applicationManager.getNavigationManager();
      var flag = navManager.getCustomInfo("resetPinDeepLinkFlow");
      if (flag == true) {
        this.profileTransactionPinStatus();
        //var navigationManager = applicationManager.getNavigationManager();
        //navigationManager.navigateTo({ "appName": "ManageProfileMA", "friendlyName": "SettingsUIModule/frmProfileResetTransactionPinEntry"});
        //alert("ResetPinFlow");
      } else {
        //this.profileTransactionPinStatus();
        var navManager = applicationManager.getNavigationManager();
       /*navManager.setCustomInfo("defaultAcc", resData);
        applicationManager.setDefaultDashboardObj(resData);
        var resData = {
          "defaultAccount": response
        }*/
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({
          "appName": "HomepageMA",
          "friendlyName": "frmHBLUnifiedDashboard",
        }, false);
      }
    },

    profileTransactionPinStatus : function() {
    var navManager = applicationManager.getNavigationManager();
    var username = navManager.getCustomInfo("frmLoginusername");
    var configManager = applicationManager.getConfigurationManager();
	var uname=kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
	var updatedUsername;
	if(uname=="username"){
		if(username!="username"){
			updatedUsername=username;
		}
	}
	else{
		updatedUsername=uname;
	}
    var param={
        // "userName": username
        "userName": updatedUsername
    }
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsMod.presentationController.transactionPinStatus(param); 
   },

		presentationAccountsErr : function(err) {
    scope_Acc_Pres.instantDashboardState = null;
    kony.print(err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  applicationManager.getPresentationFormUtility().logoutUser(true);
  },
  processAccountsData :function(data) {
    var configManager = applicationManager.getConfigurationManager();
    var dualBalanceConfig = CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE;
    if (!kony.sdk.isNullOrUndefined(dualBalanceConfig)) {
      dualBalanceConfig = JSON.parse(CommonUtilities.CLIENT_PROPERTIES.DUAL_BALANCE);
    } else {
      dualBalanceConfig = {
        "isAvailableBalanceToBeDisplayed": true,
        "isCurrentBalanceToBeDisplayed": false
      }
    }
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
    var accProcessedData = [];
    var balanceType = "";
    var imgIcon = "";
    var balanceTypeVisiblity = false;
    var forUtility = applicationManager.getFormatUtilManager();
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].availableBalance = this.getAvailableBalanceCurrencyString(data[i]);
      if (data[i].accountType === configManager.constants.SAVINGS || data[i].accountType === configManager.constants.CHECKING || data[i].accountType === "Current") {
        accProcessedData[i].balaceToShow = data[i].availableBalance;
      } else if (data[i].accountType === configManager.constants.CREDITCARD || data[i].accountType === configManager.constants.DEPOSIT || data[i].accountType === "Fixed Deposit") {
        accProcessedData[i].balaceToShow = data[i].currentBalance;
      } else if (data[i].accountType === configManager.constants.MORTGAGE || data[i].accountType === configManager.constants.LOAN) {
        accProcessedData[i].balaceToShow = data[i].outstandingBalance;
      } else if (data[i].accountType === configManager.constants.INVESTMENT) {
        accProcessedData[i].balaceToShow = data[i].marketValue;
      }
      accProcessedData[i].accountID = data[i].Account_id;
      accProcessedData[i].maskedAccountNumber = "...."+data[i].Account_id.substr((data[i].Account_id).length - 4);
      accProcessedData[i].bankName = data[i].bankName;
      accProcessedData[i].accountBalanceType = {
        "text": this.getAvailableBalanceType(data[i]),
        "skin": (data[i].availableBalance < 0 && (data[i].accountType === configManager.constants.SAVINGS || data[i].accountType === configManager.constants.CHECKING))
          ? "sknHBLLblSemiBold112pr000000" : "sknHBLLblSemiBold112pr000000"
      };
      accProcessedData[i].MembershipName = data[i].MembershipName;
      accProcessedData[i].Membership_id = data[i].Membership_id;
      accProcessedData[i].accountType = data[i].accountType;
	  accProcessedData[i].accountDes=data[i].description;
      accProcessedData[i].isBusinessAccount = data[i].isBusinessAccount;
      accProcessedData[i].nickName = kony.sdk.isNullOrUndefined(data[i].nickName) ? (data[i].accountName).substr(0, 25).trim() : (data[i].nickName).substr(0, 25).trim();
      accProcessedData[i].currencyCode = data[i].currencyCode;
      accProcessedData[i].flxStatus = {
        "isVisible" : !kony.sdk.isNullOrUndefined(data[i].accountStatus)? (data[i].accountStatus.toUpperCase() == "CLOSED" ? true : false): false
      }
      if (!isSingleCustomerProfile) {
        if(profileAccess!== "both"){
          if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
              !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
            if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              accProcessedData[i].template = "flxAccountsNoImageEuro";
            }
            else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                     dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              accProcessedData[i].template = "flxAccountsNoImageCur";
            }
            else {
              accProcessedData[i].template = "flxAccountsNoImage";
            }
          } else {
            accProcessedData[i].template = "flxAccountsNoImage";
          }
        }else {
          if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
              !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
            if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              accProcessedData[i].template = "flxCombinedAccountsEuro";
            }
            else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                     dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              accProcessedData[i].template = "flxCombinedAccountsCur";
            }
            else {
              accProcessedData[i].template = "flxCombinedAccounts";
            }
          } else {
            accProcessedData[i].template = "flxCombinedAccounts";
          }
        }
      } else {
        if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
            !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
          if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
              dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
            accProcessedData[i].template = "flxAccountsNoImageEuro";
          }
          else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                   dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
            accProcessedData[i].template = "flxAccountsNoImageCur";
          }
          else {
            accProcessedData[i].template = "flxAccountsNoImage";
          }
        } else {
          accProcessedData[i].template = "flxAccountsNoImage";
        }
      }
      accProcessedData[i].flxBankIcon = {
        "isVisible": false
      }; 
      if (!isSingleCustomerProfile) {
        if(profileAccess!== "both"){
          imgIcon = "";
          accProcessedData[i].imgAccountType = {
            "isVisible" : false
          };
          accProcessedData[i].flxAccountType = {
            "isVisible" : false
          };
        }else {
          imgIcon = data[i].isBusinessAccount === "false" ? "personalaccount.png" : "businessaccount.png"
          accProcessedData[i].imgAccountType = {
            "src" : imgIcon,
            "isVisible" : true
          };
          accProcessedData[i].flxAccountType = {
            "isVisible" : true
          };
        }
      } else {
        imgIcon = "";
        accProcessedData[i].imgAccountType = {
          "isVisible" : false
        };
        accProcessedData[i].flxAccountType = {
          "isVisible" : false
        };
      }
      accProcessedData[i].currentBalanceForDual = data[i].currentBalance;
      if (configManager.constants.SAVINGS === data[i].accountType) {
        balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
        balanceTypeVisiblity = true;
        accProcessedData[i].currentBalanceForDual = {
          "text": forUtility.formatAmountandAppendCurrencySymbol(data[i].currentBalance, data[i].currencyCode),
          "isVisible": true
        }
      } else if (configManager.constants.CHECKING === data[i].accountType) {
        balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
        balanceTypeVisiblity = true;
        accProcessedData[i].currentBalanceForDual = {
          "text": forUtility.formatAmountandAppendCurrencySymbol(data[i].currentBalance, data[i].currencyCode),
          "isVisible": true
        }
      } else {
        balanceType = "";
        balanceTypeVisiblity = false;
        accProcessedData[i].currentBalanceForDual = {
          "text": forUtility.formatAmountandAppendCurrencySymbol(data[i].currentBalanceForDual, data[i].currencyCode),
          "isVisible": false
        }
      }
      accProcessedData[i].lblAccountBal2 = {
        "text": balanceType,
        "isVisible": balanceTypeVisiblity
      };
      if(dualBalanceConfig.isCurrentBalanceToBeDisplayed === true && dualBalanceConfig.isAvailableBalanceToBeDisplayed === false)
      {
        if(configManager.constants.SAVINGS ===  accProcessedData[i].accountType || configManager.constants.CHECKING === accProcessedData[i].accountType){
          if(typeof(accProcessedData[i].currentBalanceForDual) === "object")accProcessedData[i].currentBalanceForDual.isVisible = true;
          else {
            var value = accProcessedData[i].currentBalanceForDual;
            accProcessedData[i].currentBalanceForDual = { "text" : value , "isVisible": true}
          }
          if(typeof(accProcessedData[i].lblAccountBal2) === "object")accProcessedData[i].currentBalanceForDual.isVisible = true;
          else {
            var value = accProcessedData[i].lblAccountBal2;
            accProcessedData[i].lblAccountBal2 = { "text" : value , "isVisible": true}
          }
          if(typeof(accProcessedData[i].accountBalanceType) === "object")accProcessedData[i].accountBalanceType.isVisible = false;
          else {
            var value = accProcessedData[i].accountBalanceType;
            accProcessedData[i].accountBalanceType = { "text" : value , "isVisible": false}
          }
          if(typeof(accProcessedData[i].availableBalance) === "object")accProcessedData[i].availableBalance.isVisible = false;
          else {
            var value = accProcessedData[i].availableBalance;
            accProcessedData[i].availableBalance = { "text" : value , "isVisible": false}
          }
        }
        else{
          if(typeof(accProcessedData[i].accountBalanceType) === "object")accProcessedData[i].accountBalanceType.isVisible = true;
          else {
            var value = accProcessedData[i].accountBalanceType;
            accProcessedData[i].accountBalanceType = { "text" : value , "isVisible": true}
          }
          if(typeof(accProcessedData[i].availableBalance) === "object")accProcessedData[i].availableBalance.isVisible = true;
          else {
            var value = accProcessedData[i].availableBalance;
            accProcessedData[i].availableBalance = { "text" : value , "isVisible": true}
          }
          if(typeof(accProcessedData[i].currentBalanceForDual) === "object")accProcessedData[i].currentBalanceForDual.isVisible = false;
          else {
            var value = accProcessedData[i].currentBalanceForDual;
            accProcessedData[i].currentBalanceForDual = { "text" : value , "isVisible": false}
          }
          if(typeof(accProcessedData[i].lblAccountBal2) === "object")accProcessedData[i].currentBalanceForDual.isVisible = false;
          else {
            var value = accProcessedData[i].lblAccountBal2;
            accProcessedData[i].lblAccountBal2 = { "text" : value , "isVisible": false}
          }
        }
      }
    }
    return accProcessedData;
  },
  presentationAccountsSucc :function(res) {
    try{
      var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var accountObj = applicationManager.getAccountManager();
    var accountData = accountObj.getInternalAccounts();
    var custominfo = navManager.getCustomInfo("frmDashboard");
     var flag= res.length>0?true:false;
	 if(flag){
		 var defaultAcc = res.filter(datas=> datas.isDefaultAccount =="true" || datas.isDefaultAccount ==true)
		 defaultAcc ={
			 "Accounts":defaultAcc,
		 }
		 navManager.setCustomInfo("defaultAcc", defaultAcc);
		 navManager.setCustomInfo("DashboardCardImg", defaultAcc.Accounts[0].IBAN);
         applicationManager.setDefaultDashboardObj(defaultAcc);
         scope_Acc_Pres.saveInstantDashboardSummary(defaultAcc.Accounts[0]);
	 }else{
		  applicationManager.getPresentationUtility().Alert("No account present for the particular user");
           applicationManager.getPresentationFormUtility().logoutUser(true);
           return;
	 }
     navManager.setCustomInfo("getAccountList",flag);
     scope_Acc_Pres.markAccountsFresh();
     var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
    if(!custominfo){
      custominfo = {};
    }
    var closedAccounts = new Map();
    var closedAccts = [];
    if (!kony.sdk.isNullOrUndefined(accountData) && accountData !== "") {
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
    //added to stop showing portfolio accounts on dashboard and added additional condition to stop showing mortgageFacility ccounts in mobile native
    var removePortifolioAccountsData = JSON.parse(JSON.stringify(accountData)) 
    for(var i = removePortifolioAccountsData.length-1; i >=0; i--){
      if(removePortifolioAccountsData[i].isPortFolioAccount==="true" || removePortifolioAccountsData[i].accountType=='Investment' || removePortifolioAccountsData[i].accountType== 'mortgageFacility'){
        removePortifolioAccountsData.splice(i,1);
      }
    }
    if(removePortifolioAccountsData.length==accountData.length)
      custominfo.accountData = accountData;
    else
      custominfo.accountData = removePortifolioAccountsData;
    }
    custominfo.isGetListCalled =true
    navManager.setCustomInfo("frmDashboard", custominfo);
    var configurationManager = applicationManager.getConfigurationManager();
      scope.dashboardService();
    }catch(err){
      kony.print("presentationAccountsSucc"+err);
    }
    
  },
  dashboardService: function() {
     var navManager = applicationManager.getNavigationManager();
    var inputParam = navManager.getCustomInfo("authCred");
  let defaultLocale =  applicationManager.getLocale();
   if(defaultLocale === "en_US"|| "en"){
 defaultLocale = "English"
    }else{
        defaultLocale = "Nepali"
        }
   
    var authParams={
                  "username": inputParam,
                  "rememberMe": true,
                 "defaultLanguage":defaultLocale
              }
            if(kony.application.getCurrentForm().id === "frmLogin" || "frmUnifiedDashboard"){
               //applicationManager.getAccountManager().defaultAccount(authParams, this.defaultAccountSC,  this.defaultAccountEC);
			   this.defaultAccountSC();
            /*  var navManager = applicationManager.getNavigationManager();
               navManager.navigateTo({   
                 "appName": "HomepageMA",
                   "friendlyName": "frmHBLUnifiedDashboard",
                        },true,"Navigation");*/
              }
  },
  /**
   * PERF (mobile login): starts the DigitalArrangements getList request as soon as the user session exists,
   * in parallel with the post-login services, instead of after them. Only the raw response is held here;
   * it is processed (accounts stored, permissions set, callbacks fired) at the usual point in showDashboard.
   */
  prefetchAccountList : function() {
    try {
      var prefetch = {
        "userName": applicationManager.getUserPreferencesManager().getUserName(),
        "startTime": new Date().getTime(),
        "done": false,
        "status": null,
        "data": null,
        "error": null,
        "onDone": null
      };
      scope_Acc_Pres.accountListPrefetch = prefetch;
      var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
      accountsRepo.customVerb('getList', {}, function(status, data, error) {
        prefetch.done = true;
        prefetch.status = status;
        prefetch.data = data;
        prefetch.error = error;
        if (prefetch.onDone) {
          var onDone = prefetch.onDone;
          prefetch.onDone = null;
          onDone();
        }
      });
    } catch (err) {
      scope_Acc_Pres.accountListPrefetch = null;
      kony.print("prefetchAccountList" + err);
    }
  },
  clearAccountListPrefetch : function() {
    scope_Acc_Pres.accountListPrefetch = null;
    scope_Acc_Pres.freshAccountsToken = null;
    scope_Acc_Pres.instantDashboardState = null;
  },
  /**
   * PERF (LOGIN_INSTANT_DASHBOARD, default off). After every successful Dashboard account load, keep a small
   * summary of the default account for the next login: display name, masked number (last 4 digits only),
   * account type label, currency and the card image key. No balance and no full account number. Stored with
   * the app's encrypted store (device-only key) and tied to the user name.
   */
  saveInstantDashboardSummary : function(defaultAccount) {
    try {
      if (CommonUtilities.getBooleanConfig("LOGIN_INSTANT_DASHBOARD", false) !== true || !defaultAccount) {
        return;
      }
      var accountId = String(defaultAccount.Account_id || "");
      var masked = accountId.length > 4 ? ("X".repeat(accountId.length - 4) + accountId.slice(-4)) : accountId;
      var summary = {
        "user": applicationManager.getUserPreferencesManager().getUserName(),
        "name": kony.sdk.util.isNullOrUndefinedOrEmptyObject(defaultAccount.nickName) ? (defaultAccount.accountName || "") : defaultAccount.nickName,
        "masked": masked,
        "type": defaultAccount.description || "",
        "currency": defaultAccount.currencyCode || "",
        "img": defaultAccount.IBAN || ""
      };
      applicationManager.getStorageManager().setStoredEncryptedItem("instantDashboardSummary", JSON.stringify(summary));
    } catch (err) {
      kony.print("saveInstantDashboardSummary " + err);
    }
  },
  /** The saved summary for the logged-in user, or null. */
  getInstantDashboardSummary : function() {
    try {
      var stored = applicationManager.getStorageManager().getStoredEncryptedItem("instantDashboardSummary");
      if (!stored) {
        return null;
      }
      var summary = JSON.parse(stored);
      if (!summary || summary.user !== applicationManager.getUserPreferencesManager().getUserName() || !summary.masked) {
        return null;
      }
      return summary;
    } catch (err) {
      return null;
    }
  },
  /** True while the Dashboard is showing the saved summary and the account list is still loading. */
  isInstantDashboardPending : function() {
    return !!(scope_Acc_Pres.instantDashboardState && scope_Acc_Pres.instantDashboardState.pending === true);
  },
  /**
   * Opens the Dashboard straight away with the saved summary when LOGIN_INSTANT_DASHBOARD is on and a summary
   * exists for this user. Not used for the classic re-design flow, the reset-PIN deep link, the Modern design,
   * or when no summary exists (first login on this device) - those keep today's behaviour.
   * Returns true when the Dashboard was opened.
   */
  startInstantDashboard : function() {
    try {
      if (CommonUtilities.getBooleanConfig("LOGIN_INSTANT_DASHBOARD", false) !== true) {
        return false;
      }
      var navManager = applicationManager.getNavigationManager();
      if (navManager.getCustomInfo("resetPinDeepLinkFlow") == true) {
        return false;
      }
      try {
        if (require("DesignResolver").isModern() === true) {
          return false;
        }
      } catch (designErr) { }
      var summary = scope_Acc_Pres.getInstantDashboardSummary();
      if (!summary) {
        return false;
      }
      scope_Acc_Pres.instantDashboardState = { "pending": true, "summary": summary };
      navManager.navigateTo({
        "appName": "HomepageMA",
        "friendlyName": "frmHBLUnifiedDashboard",
      }, false);
      return true;
    } catch (err) {
      kony.print("startInstantDashboard " + err);
      scope_Acc_Pres.instantDashboardState = null;
      return false;
    }
  },
  /**
   * PERF (DASHBOARD_REUSE, default off): the account list the Dashboard just loaded may be reused once, by
   * the first action taken from the Dashboard ("View all" or Transfers), instead of calling getList again.
   * The token is cleared as soon as the Dashboard is left for anything else (onHide), on logout and when
   * used, so a balance can never be reused after a payment flow has been entered.
   */
  markAccountsFresh : function() {
    try {
      scope_Acc_Pres.freshAccountsToken = {
        "time": new Date().getTime(),
        "userName": applicationManager.getUserPreferencesManager().getUserName()
      };
    } catch (err) {
      scope_Acc_Pres.freshAccountsToken = null;
    }
  },
  clearFreshAccounts : function() {
    scope_Acc_Pres.freshAccountsToken = null;
  },
  /**
   * Returns the stored account list when the token is valid (flag on, same user, under maxAgeMs old), else
   * null. Always clears the token, so it is used at most once.
   */
  takeFreshAccounts : function(maxAgeMs) {
    var token = scope_Acc_Pres.freshAccountsToken;
    scope_Acc_Pres.freshAccountsToken = null;
    try {
      if (!token || CommonUtilities.getBooleanConfig("DASHBOARD_REUSE", false) !== true) {
        return null;
      }
      if (token.userName !== applicationManager.getUserPreferencesManager().getUserName() ||
          (new Date().getTime() - token.time) > maxAgeMs) {
        return null;
      }
      // Only for an action taken from the classic Dashboard itself (never after another flow).
      var currentForm = kony.application.getCurrentForm();
      if (!currentForm || currentForm.id !== "frmHBLUnifiedDashboard") {
        return null;
      }
      var accounts = applicationManager.getAccountManager().getInternalAccounts();
      if (kony.sdk.isNullOrUndefined(accounts) || accounts === "" || !accounts.length) {
        return null;
      }
      return accounts;
    } catch (err) {
      kony.print("takeFreshAccounts " + err);
      return null;
    }
  },
  /**
   * Same as getInternalAccountsWithParams({}, ...) but uses the login prefetch when it belongs to the current
   * user, is recent and has not been used yet. In every other case (no prefetch, other user, too old,
   * prefetch failed) it makes the normal call, so behaviour is unchanged.
   */
  getInternalAccountsForDashboard : function(presentationSuccessCallback, presentationErrorCallback) {
    var accountManager = applicationManager.getAccountManager();
    var prefetch = scope_Acc_Pres.accountListPrefetch;
    scope_Acc_Pres.accountListPrefetch = null;
    var fetchNormally = function() {
      accountManager.getInternalAccountsWithParams({}, presentationSuccessCallback, presentationErrorCallback);
    };
    try {
      var maxAgeMs = 60000;
      var usable = !kony.sdk.isNullOrUndefined(prefetch) &&
          prefetch.userName === applicationManager.getUserPreferencesManager().getUserName() &&
          (new Date().getTime() - prefetch.startTime) <= maxAgeMs &&
          typeof accountManager.processInternalAccountsList === "function";
      if (!usable) {
        if (!kony.sdk.isNullOrUndefined(prefetch)) {
        }
        fetchNormally();
        return;
      }
      var delivered = false;
      var useResponse = function() {
        if (delivered) {
          return;
        }
        delivered = true;
        try {
          var data = prefetch.data;
          var isCleanSuccess = prefetch.status == kony.mvc.constants.STATUS_SUCCESS &&
              !kony.sdk.isNullOrUndefined(data) &&
              (kony.sdk.isNullOrUndefined(data.opstatus) || data.opstatus == 0) &&
              !kony.sdk.isNullOrUndefined(data.Accounts) && data.Accounts.length > 0;
          if (!isCleanSuccess) {
            // Any error or unusual response: make the normal call now, exactly as before.
            fetchNormally();
            return;
          }
          try {
            kony.timer.schedule("logoutFlag", accountManager.showLogout, 5, false);
          } catch (timerErr) {
            kony.print("getInternalAccountsForDashboard timer" + timerErr);
          }
          accountManager.processInternalAccountsList({}, prefetch.status, prefetch.data, prefetch.error, presentationSuccessCallback, presentationErrorCallback);
        } catch (err) {
          kony.print("getInternalAccountsForDashboard" + err);
        }
      };
      // The Dashboard preShow reads the user profile (Users call, post-login slot 0). The prefetched accounts can
      // arrive before it, so wait (up to 5 s) for that call to complete before opening the Dashboard.
      var isUserProfileLoaded = function() {
        try {
          var info = scope_AuthPresenter.asyncManager.responseInfo[0];
          return kony.sdk.isNullOrUndefined(info) || info.completionStatus === true;
        } catch (profileErr) {
          return true;
        }
      };
      var waitTicks = 0;
      var deliverWhenReady = function() {
        // Always deliver asynchronously, like a network callback, so the rest of showDashboard runs first as before.
        try {
          kony.timer.schedule("dashboardAccountsPrefetch", function() {
            try {
              kony.timer.cancel("dashboardAccountsPrefetch");
            } catch (cancelErr) {}
            waitTicks++;
            if (!isUserProfileLoaded() && waitTicks < 50) {
              deliverWhenReady();
              return;
            }
            useResponse();
          }, 0.1, false);
        } catch (timerErr) {
          useResponse();
        }
      };
      if (prefetch.done) {
        deliverWhenReady();
      } else {
        prefetch.onDone = deliverWhenReady;
      }
    } catch (err) {
      kony.print("getInternalAccountsForDashboard" + err);
      fetchNormally();
    }
  },
  showDashboard : function() {
    var navManager = applicationManager.getNavigationManager();
    var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
    if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountManager = applicationManager.getAccountManager();
	if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
      scope_Acc_Pres.accountListPrefetch = null;
      accountManager.fetchInternalAccountsWithOutActions(scope_Acc_Pres.presentationAccountsSucc, scope_Acc_Pres.presentationAccountsErr);
	}else{
      // PERF (LOGIN_INSTANT_DASHBOARD): open the Dashboard now with the saved summary; the accounts below
      // then refresh it (defaultAccountSC). Off or not applicable: unchanged.
      scope_Acc_Pres.instantDashboardState = null;
      scope_Acc_Pres.startInstantDashboard();
      // PERF: was accountManager.getInternalAccountsWithParams({}, ...); now reuses the login prefetch when valid.
      scope_Acc_Pres.getInternalAccountsForDashboard(scope_Acc_Pres.presentationAccountsSucc, scope_Acc_Pres.presentationAccountsErr);
    }
    if(custominfoCD.isMultiCustomer === "false"){
    this.getWealthPortfolio();
    }
  },
  oldDashboard : function() {
    var navManager = applicationManager.getNavigationManager();
    var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
    if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountManager = applicationManager.getAccountManager();
    var configManager = applicationManager.getConfigurationManager();
	if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
      accountManager.fetchInternalAccountsWithOutActions(scope_Acc_Pres.showOldDashboardSucc, scope_Acc_Pres.presentationAccountsErr);
	}else{
      // PERF (DASHBOARD_REUSE): "View all" right after the Dashboard loaded reuses that account list once
      // (delivered asynchronously, like the network callback); otherwise getList is called as before.
      var freshAccounts = scope_Acc_Pres.takeFreshAccounts(60000);
      if (freshAccounts) {
        try {
          kony.timer.schedule("oldDashboardFreshAccounts", function() {
            try { kony.timer.cancel("oldDashboardFreshAccounts"); } catch (cancelErr) {}
            scope_Acc_Pres.showOldDashboardSucc(freshAccounts);
          }, 0.1, false);
        } catch (timerErr) {
          scope_Acc_Pres.showOldDashboardSucc(freshAccounts);
        }
      } else {
        accountManager.getInternalAccountsWithParams({},scope_Acc_Pres.showOldDashboardSucc, scope_Acc_Pres.presentationAccountsErr);
      }
    }
    if(custominfoCD.isMultiCustomer === "false"){
    this.getWealthPortfolio();
    }
    },
    showOldDashboardSucc :function(res) {
      try{
        var scope=this;
      var navManager = applicationManager.getNavigationManager();
      var accountObj = applicationManager.getAccountManager();
      var accountData = accountObj.getInternalAccounts();
      var custominfo = navManager.getCustomInfo("frmDashboard");
       var flag= res.length>0?true:false;
     if(flag){
       var defaultAcc = res.filter(datas=> datas.isDefaultAccount =="true" || datas.isDefaultAccount ==true)
       defaultAcc ={
         "Accounts":defaultAcc,
       }
       navManager.setCustomInfo("defaultAcc", defaultAcc);
       navManager.setCustomInfo("DashboardCardImg", defaultAcc.Accounts[0].IBAN);
           applicationManager.setDefaultDashboardObj(defaultAcc);
     }else{
        applicationManager.getPresentationUtility().Alert("No account present for the particular user");
             applicationManager.getPresentationFormUtility().logoutUser(true);
             return;
     }
       navManager.setCustomInfo("getAccountList",flag);
       var custominfoCD = navManager.getCustomInfo("frmCustomerDashboard");
      if(!custominfo){
        custominfo = {};
      }
      var closedAccounts = new Map();
      var closedAccts = [];
      if (!kony.sdk.isNullOrUndefined(accountData) && accountData !== "") {
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
      //added to stop showing portfolio accounts on dashboard and added additional condition to stop showing mortgageFacility ccounts in mobile native
      var removePortifolioAccountsData = JSON.parse(JSON.stringify(accountData)) 
      for(var i = removePortifolioAccountsData.length-1; i >=0; i--){
        if(removePortifolioAccountsData[i].isPortFolioAccount==="true" || removePortifolioAccountsData[i].accountType=='Investment' || removePortifolioAccountsData[i].accountType== 'mortgageFacility'){
          removePortifolioAccountsData.splice(i,1);
        }
      }
      if(removePortifolioAccountsData.length==accountData.length)
        custominfo.accountData = accountData;
      else
        custominfo.accountData = removePortifolioAccountsData;
      }
      custominfo.isGetListCalled =true
      navManager.setCustomInfo("frmDashboard", custominfo);
      var configurationManager = applicationManager.getConfigurationManager();
     var frmName = "";
      frmName = {"appName": "HomepageMA","friendlyName": "AccountsUIModule/frmUnifiedDashboard"}; 
      if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")))    
      navManager.navigateTo(frmName);
     if(custominfoCD.reDesignFlow === "true"&& kony.application.getCurrentForm().id!="frmUnifiedCustomerDashboard")
          {
            var ntf = new kony.mvc.Navigation({
              "appName": "HomepageMA",
              "friendlyName": "AccountsUIModule/frmUnifiedCustomerDashboard",
            });
            ntf.navigate();
          }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      //old code
                
      }catch(err){
        kony.print("presentationAccountsSucc"+err);
      }
      
    },
    
    getAvailableBalanceType: function (data) {
      var configManager = applicationManager.getConfigurationManager();
      switch (data.accountType) {
        case configManager.constants.SAVINGS:
          if (data.availableBalance < 0)
            return kony.i18n.getLocalizedString("i18n.Accounts.Overdrawn");
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        case configManager.constants.CHECKING:
          if (data.availableBalance < 0)
            return kony.i18n.getLocalizedString("i18n.Accounts.Overdrawn");
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        case configManager.constants.CREDITCARD:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
        case configManager.constants.DEPOSIT:
          //return kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        case configManager.constants.MORTGAGE:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
        case configManager.constants.LOAN:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
        case configManager.constants.INVESTMENT:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
        default:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      }
    },
	};
});