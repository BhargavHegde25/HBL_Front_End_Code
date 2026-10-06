define(['OLBConstants'], function(OLBConstants) {
  return{
    accountActivity : function(param,presentationSuccessCallback,presentationErrorCallback) {
      var self = this;
      var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
      accountsRepo.customVerb('getAccountActivity', param, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
    },
	updateLatestBalances : function(accounts, presentationSuccessCallback, presentationErrorCallback) {
        var self = this;
        var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
        accounts = Array.isArray(accounts) ? accounts : accounts.Accounts;
        var internalAccounts = self.getInternalAccounts();
      //  if (internalAccounts === "") {
            accountsRepo.customVerb('getList', {}, getAllCompletionCallback);
      //  }

        function getAllCompletionCallback(status, data, error) {
            var loggerManager = applicationManager.getLoggerManager();
            try {
                var srh = applicationManager.getServiceResponseHandler();
                var obj = srh.manageResponse(status, data, error);
                if (obj["status"] === true) {
                  if( data.Accounts.length === 0){
                            // presentationErrorCallback("There are no eligible accounts available to log in to digital banking.");
                            if (kony.application.getCurrentForm()) {

                    var flxPopupFlex = new kony.ui.FlexScrollContainer({
                        id: "flxLoginErrorPinPopupWrapper",
                        isVisible: true,
                        layoutType: kony.flex.FREE_FORM,
                        skin: "ICSknScrlFlx000000OP40",
                        left: "0dp",
                        top: "0dp",
                        width: "100%",
                        height: "100%",
                        zIndex: 1000,
                        enableScrolling: true,
                        scrollDirection: kony.flex.SCROLL_VERTICAL
                    }, {}, {});

                    kony.application.getCurrentForm().add(flxPopupFlex);

                    var customPopup = new com.InfinityOLB.Resources.CustomPopup({
                        id: "flxLoginErrorPinPopup",
                        layoutType: kony.flex.FREE_FORM,
                        masterType: constants.MASTER_TYPE_DEFAULT,
                        isModalContainer: true,
                        isVisible: true,
                        appName: "ResourcesMA"
                    });

                    flxPopupFlex.add(customPopup);
                    // customPopup.doLayout = CommonUtilities.centerPopupFlex;

                    customPopup.btnNo.isVisible = false;
                    customPopup.btnYes.text = "Okay";
                    customPopup.lblHeading.isVisible = false;
                    customPopup.lblPopupMessage.text =
                          "There are no eligible accounts available to log in to digital banking.";
                    var closePopup = function () {
                        flxPopupFlex.setVisibility(false);
                        kony.application.getCurrentForm().remove(flxPopupFlex);
                    };

                    // customPopup.btnNo.onClick = closePopup;
                    customPopup.flxCross.onClick = closePopup;

                    customPopup.btnYes.onClick = function () {
                        closePopup();
                    };
                }
                  }
                  else{
                    applicationManager.getStorageManager().setStoredItem('updateInternalAccounts', true);
                    if (data.Accounts[0].accountsCount === undefined) {
                        self.clearInternalAccounts();
                        var configurationManager = applicationManager.getConfigurationManager();
                        obj["data"]["Accounts"] = obj["data"]["Accounts"].filter(function(account) {
                            return (account.accountStatus !== "CLOSED" || (account.accountStatus === "CLOSED" && JSON.parse(account.actions).includes("VIEW_CLOSED_ACCOUNT")));
                        });
                        if (applicationManager.getNavigationManager().getCustomInfo("getListflowType") == "loginflow") {
                            var Callcount = 0;
                            for (i = 0; i < obj["data"]["Accounts"].length; i++) {
                                if (obj["data"]["Accounts"][i].isDefaultAccount == "true") {
                                    Callcount = 1;
                                    var navManager = applicationManager.getNavigationManager();
                                   // obj["data"]["Accounts"][i].Accounts[0]
                                   var Accounts=[];
                                  Accounts.push(obj["data"]["Accounts"][i]);
                                  var account={
                                  "Accounts":Accounts
                                    };
                                  navManager.setCustomInfo("defaultAcc",account);
                                    let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                                        appName: "HomepageMA",
                                        moduleName: "AccountsUIModule"
                                    });
                                    accounts.presentationController.accountActivity();
                                    break;
                                }
                            }
                            if (Callcount == 0) {
                                var navManager = applicationManager.getNavigationManager();
                                var flow = "defaultAccount";
                                navManager.setCustomInfo("flow", flow);
                                CommonUtilities.showServerDownScreen();
                            }
                            //else{
                            //var resData = response;
                            // if(response.Accounts.length==0){
                            //     var navManager = applicationManager.getNavigationManager();
                            //     var flow="defaultAccount";
                            //     navManager.setCustomInfo("flow", flow);
                            //     CommonUtilities.showServerDownScreen();
                            //     }
                            applicationManager.getNavigationManager().setCustomInfo("getListflowType", "notloginflow");
                        }
                        if (obj["data"] && obj["data"]["Accounts"]) {
                            self.splitInternalAccounts(obj["data"]["Accounts"]);
                            configurationManager.userAccounts = obj["data"]["Accounts"];
                            if (obj["data"]["Accounts"].length > 0)
                                if (params.actions === undefined) {
                                    configurationManager.setAccountPermissions(self.getAccountPermissionMap(obj["data"]["Accounts"]));
                                }
                            presentationSuccessCallback(obj["data"]["Accounts"]);
                        }
                    } else {
                        presentationSuccessCallback(obj["data"]);
                    }
                  }
                } else {
                    presentationErrorCallback(obj["errmsg"]);
                }
            } catch (err) {
                loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
            }
        }
    },
    /**
 * Splits the internal accounts and populate arrays in the class depending on their support type .
 * @param {Array} internalAccounts - Array of Internal Accounts.
 */
    splitInternalAccounts : function(internalAccounts) {
      this.internalAccounts = internalAccounts;
      var savingAccounts =[];
      var checkingAccounts =[];
	  this.savingsAndCheckingAccounts = [];
      this.cardSupportedAccounts.push(checkingAccounts);
      this.cardSupportedAccounts.push(savingAccounts);
      var configManager = applicationManager.getConfigurationManager();
      for (var i = 0; i < internalAccounts.length; i++) {
        if (internalAccounts[i].supportTransferFrom === "1")
          this.fromTransferSupportedAccounts.push(internalAccounts[i]);
        if (internalAccounts[i].supportBillPay === "1")
          this.billPaySupportedAccounts.push(internalAccounts[i]);
        if (internalAccounts[i].supportTransferTo === "1")
          this.toTransferSupportedAccounts.push(internalAccounts[i]);
        if (internalAccounts[i].supportDeposit === "1" && internalAccounts[i].actions.includes("RDC"))
          this.depositSupportedAccounts.push(internalAccounts[i]);
        if (internalAccounts[i].supportCardlessCash === "1" && internalAccounts[i].actions.includes("WITHDRAW_CASH_CARDLESS_CASH"))
          this.cardLessWithdrawlSupportedAccounts.push(internalAccounts[i]);
        if (internalAccounts[i].isPFM === "true")
          this.myMoneySupportedAccounts.push(internalAccounts[i]);
        if (internalAccounts[i].accountType === configManager.constants.SAVINGS )
          this.cardSupportedAccounts[1].push(internalAccounts[i]);
        if (internalAccounts[i].accountType === configManager.constants.CHECKING)
          this.cardSupportedAccounts[0].push(internalAccounts[i]);
	    if(internalAccounts[i].accountType === configManager.constants.CHECKING || internalAccounts[i].accountType === configManager.constants.SAVINGS|| internalAccounts[i].accountType === "Current")
		  this.savingsAndCheckingAccounts.push(internalAccounts[i])
;
      }
    },
    defaultAccount: function(param, presentationSuccessCallback,presentationErrorCallback){
      var self = this;
      var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
      accountsRepo.customVerb('getCustomerdefaultAccount', param, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
    },
    accountTransactions: function(param, presentationSuccessCallback,presentationErrorCallback){
      var self = this;
      var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
      accountsRepo.customVerb('getAccountTransactions', param, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
    },
    defaultAccounts: function(param, presentationSuccessCallback, presentationErrorCallback) {
      var self = this;
      var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
      accountsRepo.customVerb('getCustomerdefaultAccount', param, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
          var srh = applicationManager.getServiceResponseHandler();
          var obj = srh.manageResponse(status, data, error);
          if (obj["status"] === true) {
              presentationSuccessCallback(obj["data"]);
          } else {
              presentationErrorCallback(obj["errmsg"]);
          }
      }
  },
    fetchInternalAccounts :function(presentationSuccessCallback, presentationErrorCallback) {
      var self = this;
      //serve the login prefetch if one is parked for this variant
      if (self.consumeAccountsPrefetch(false, getAllCompletionCallback) === true) { return; }
      var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
      accountsRepo.customVerb('getList', {}, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
      kony.application.dismissLoadingScreen();
          var srh = applicationManager.getServiceResponseHandler();
          var obj = srh.manageResponse(status, data, error);
          if (obj["status"] === true) {
              self.clearInternalAccounts();
              var configurationManager = applicationManager.getConfigurationManager();
              /*  if(configurationManager.getUserPermissions().indexOf("VIEW_CLOSED_ACCOUNT")===-1){
                            obj["data"]["Accounts"] = obj["data"]["Accounts"].filter(function(account){
                                return account.accountStatus !== "CLOSED";
                            });
                        }*/
              obj["data"]["Accounts"] = obj["data"]["Accounts"].filter(function(account) { 
                  return (account.accountStatus !== "CLOSED" || (account.accountStatus === "CLOSED" && JSON.parse(account.actions).includes("VIEW_CLOSED_ACCOUNT")));
              });
              if (obj["data"] && obj["data"]["Accounts"]) {
                  self.splitInternalAccounts(obj["data"]["Accounts"]);
                  configurationManager.userAccounts = obj["data"]["Accounts"];
                  if (obj["data"]["Accounts"].length > 0) configurationManager.setAccountPermissions(self.getAccountPermissionMap(obj["data"]["Accounts"]));
                  presentationSuccessCallback(obj["data"]["Accounts"]);
              }
          } else {
              presentationErrorCallback(obj["errmsg"]);
          }
      }
  },
   getInternalAccountsWithParams : function(params,presentationSuccessCallback, presentationErrorCallback){
	   try{
		var self = this;
    var accountsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
   // accountsRepo.customVerb('getList', params, getAllCompletionCallback);
    var updateInternalAccounts = applicationManager.getStorageManager().getStoredItem('updateInternalAccounts') ;

  //  if (updateInternalAccounts && !self.openNewAccountActive) {
  //    accountsRepo.customVerb('getLatestBalances', {}, getLatestBalancesCompletionCallback);
  //  } else {

	 kony.timer.schedule("logoutFlag", this.showLogout, 5, false) ;
   //serve the login prefetch if one is parked for this variant. This is the branch
   //showDashboard takes when reDesignFlow is not "true", so it needs the guard too.
   if (self.consumeAccountsPrefetch(false, getAllCompletionCallback) === true) { return; }
   accountsRepo.customVerb('getList', {}, getAllCompletionCallback);

  //  }
  /*function getLatestBalancesCompletionCallback(status, data, error) {
	  if(data.Accounts===undefined){
    this.logoutFlag="false";
    }
    else{
      this.logoutFlag="true";
    }

    var srh = applicationManager.getServiceResponseHandler();
    var obj = srh.manageResponse(status, data, error);
    if (obj["status"] === true) {
      self.updateLatestBalances(obj["data"],presentationSuccessCallback, presentationErrorCallback);
      presentationSuccessCallback(self.getInternalAccounts());
    } else {
      presentationErrorCallback(obj["errmsg"]);
    }
  } */

	   }catch(err){
		 kony.print("err"+err)
	   }
     function getAllCompletionCallback(status, data, error) {
      self.processInternalAccountsList(params, status, data, error, presentationSuccessCallback, presentationErrorCallback);
    }
  },
  /**
   * Processes a raw DigitalArrangements getList response exactly as getInternalAccountsWithParams does.
   * Shared by getInternalAccountsWithParams and the mobile login prefetch (HomepageMA AccountsUIModule).
   */
  processInternalAccountsList : function(params, status, data, error, presentationSuccessCallback, presentationErrorCallback){
    var self = this;
    var loggerManager = applicationManager.getLoggerManager();
    try{
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        applicationManager.getStorageManager().setStoredItem('updateInternalAccounts', true);
		
		if(data&&data.Accounts.length!=0){
			if(data.Accounts[0].accountsCount === undefined){
        self.clearInternalAccounts();
        var configurationManager = applicationManager.getConfigurationManager();
        obj["data"]["Accounts"] = obj["data"]["Accounts"].filter(function(account){  
          return (account.accountStatus !== "CLOSED" || (account.accountStatus === "CLOSED" && JSON.parse(account.actions).includes("VIEW_CLOSED_ACCOUNT")));
        });
        if(applicationManager.getNavigationManager().getCustomInfo("getListflowType")== "loginflow"){
          var Callcount=0;
        for(i=0;i<obj["data"]["Accounts"].length;i++){
          if(obj["data"]["Accounts"][i].isDefaultAccount=="true"){
            Callcount=1;
            var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("defaultAcc", obj["data"]["Accounts"][i]);
            var Accounts=[];
            Accounts.push(obj["data"]["Accounts"][i]);
            var account={
              "Accounts":Accounts
            };
            navManager.setCustomInfo("defaultAcc",account);
        let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
        accounts.presentationController.accountActivity();
            break;
          }
        }
          if(Callcount==0){
            var navManager = applicationManager.getNavigationManager();
            var flow="defaultAccount";
            navManager.setCustomInfo("flow", flow);
            CommonUtilities.showServerDownScreen();
          }
          //else{
            //var resData = response;
        // if(response.Accounts.length==0){
        //     var navManager = applicationManager.getNavigationManager();
        //     var flow="defaultAccount";
        //     navManager.setCustomInfo("flow", flow);
        //     CommonUtilities.showServerDownScreen();
        //     }
        applicationManager.getNavigationManager().setCustomInfo("getListflowType","notloginflow");
        }
        if(obj["data"] && obj["data"]["Accounts"]){
          self.splitInternalAccounts(obj["data"]["Accounts"]);
          configurationManager.userAccounts = obj["data"]["Accounts"];
          if(obj["data"]["Accounts"].length>0)
            if(params.actions === undefined){
            configurationManager.setAccountPermissions(self.getAccountPermissionMap(obj["data"]["Accounts"]));
              }
          presentationSuccessCallback(obj["data"]["Accounts"]);
        }
        } else {
          presentationSuccessCallback(obj["data"]);
        }
      }
	  else{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
		   var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.payments.warning"),
      "message":  kony.i18n.getLocalizedString("i18n.mb.dashboard.noelibleAcc"),
      "alertHandler": function(){
		  applicationManager.getPresentationFormUtility().logoutUser(true);
	  },
      "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().CustomAlert(basicConfig, pspConfig, custConfig);
	  }
		}
         else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } catch (err) {
      loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
    }
  },
    fetchCompletedandScheduledTransaction : function (presentationSuccessCallback, presentationErrorCallback) {
      function completionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
      var TransactionModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("TransactionsList");
      TransactionModel.customVerb("getCompletedandScheduledTransactions", {}, completionCallback);
    },
    SendPaperStatementRequest : function(params, presentationSuccessCallback, presentationErrorCallback) {
      var self = this;
      var downloadTransactionModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('DigitalArrangements');
      downloadTransactionModel.customVerb('requestPaperStatement', params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
          var srh = applicationManager.getServiceResponseHandler();
          var obj = srh.manageResponse(status, data, error);
          if (obj["status"] === true) {
              presentationSuccessCallback(obj["data"]);
          } else {
              presentationErrorCallback(obj["errmsg"]);
          }
      }
  },
	 /**
 * Gets all the accounts stored in the class which are of checking and savings account type.
 * @returns {Array} - Array of records of toTransfer Supported Accounts.
 */
  getSavingsAndCheckingsAccounts : function() {
    if (this.savingsAndCheckingAccounts.length === 0)
      return "";
    else
      return this.savingsAndCheckingAccounts;
  },
  resetCustomerDefaultAcc : function(params, presentationSuccessCallback, presentationErrorCallback){
	var self = this;
      var securityRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
      securityRepo.customVerb('resetCustomerDefaultAcc', params, getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
  },
  updateExternalAccountFavouriteStatus : function(params, presentationSuccessCallback, presentationErrorCallback){
	var self = this;
      var securityRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
      securityRepo.customVerb('updateAccNickName', params, getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
  },
  getHBLParkingAccounts : function(presentationSuccessCallback, presentationErrorCallback){
    var self = this;
        var securityRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
        securityRepo.customVerb('GetHBLParkingAccounts', {}, getAllCompletionCallback);
        function getAllCompletionCallback(status, data, error) {
          var srh = applicationManager.getServiceResponseHandler();
          var obj = srh.manageResponse(status, data, error);
          if (obj["status"] === true) {
            presentationSuccessCallback(obj["data"]);
          } else {
            presentationErrorCallback(obj["errmsg"]);
          }
        }
    },
      getMerchantPaymentCharges : function(params, presentationSuccessCallback, presentationErrorCallback){
        var self = this;
            var securityRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Merchants");
            securityRepo.customVerb('getMerchantPaymentCharges', params, getAllCompletionCallback);
            function getAllCompletionCallback(status, data, error) {
              var srh = applicationManager.getServiceResponseHandler();
              var obj = srh.manageResponse(status, data, error);
              if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
              } else {
                presentationErrorCallback(obj["errmsg"]);
              }
            }
      },

          getTransactionPin: function(param, presentationSuccessCallback, presentationErrorCallback) {
            var self = this;
            var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
            infoTerms.customVerb('getTransactionPINStatus', param, getCompletionCallback);
          
            function  getCompletionCallback(status,  data,  error) {
                var srh = applicationManager.getServiceResponseHandler();
                var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
                if (obj["status"] === true) {
                    presentationSuccessCallback(obj["data"]);
                } else {
                    presentationErrorCallback(obj["errmsg"]);
                }
            }
          },
    /* --- Login accounts prefetch (LOGIN_PREFETCH_ACCOUNTS) ---------------------
       The accounts call is the last thing before the dashboard paints and it only
       starts once every post login service has finished. Nothing in its request
       depends on those services, so it can be sent early and its answer held until
       the dashboard asks for it. Only the request moves - the response is processed
       at the same point as before, by the same completion callback. */
    _accountsPrefetch : null,
    /* A parked response must not outlive the screen it was fetched for. Terms and
       conditions hold the dashboard back for as long as the customer reads them,
       and a stale balance is worse than a slow login. */
    _ACCOUNTS_PREFETCH_MAX_AGE_MS : 60000,

    prefetchAccountsForLogin : function(useActionsVariant) {
      var self = this;
      try {
        var CommonUtils = require('CommonUtilities');
        if (CommonUtils.getBooleanConfig("LOGIN_PREFETCH_ACCOUNTS", false) !== true) {
          return;
        }
        if (self._accountsPrefetch !== null) {
          return;   //already in flight or already parked
        }
        var park = {
          "user"    : applicationManager.getUserPreferencesManager().getUserName(),
          "variant" : useActionsVariant === true,
          "at"      : new Date().getTime(),
          "done"    : false,
          "status"  : null,
          "data"    : null,
          "error"   : null,
          "waiting" : null
        };
        self._accountsPrefetch = park;
        var accountsRepo = kony.mvc.MDAApplication.getSharedInstance()
                             .getRepoManager().getRepository("DigitalArrangements");
        accountsRepo.customVerb('getList', park.variant ? {"actions":"true"} : {},
          function(status, data, error) {
            park.done   = true;
            park.status = status;
            park.data   = data;
            park.error  = error;
            //the response is unpacked later, when the dashboard consumes it, so the
            //service timing mark would land then. Record the real arrival here.
            try { CommonUtils.perfMark("accounts response arrived (prefetched)"); }
            catch (perfError) { }
            //the dashboard got here first and is waiting on us
            if (park.waiting) {
              var waiting = park.waiting;
              park.waiting = null;
              self._accountsPrefetch = null;
              waiting(status, data, error);
            }
          });
      } catch (prefetchError) {
        self._accountsPrefetch = null;
        kony.print("[PREFETCH] accounts prefetch not started: " + prefetchError);
      }
    },

    /* completionCallback is the caller's own getAllCompletionCallback, so the
       response is processed exactly as it would have been. Returns true when this
       caller has been served and must not make its own call. */
    consumeAccountsPrefetch : function(useActionsVariant, completionCallback) {
      var self = this;
      //diagnostic only - puts the outcome in the login performance report so a run
      //shows whether the park was used, instead of it having to be inferred.
      function prefetchMark(outcome) {
        try { require('CommonUtilities').perfMark("prefetch " + outcome); }
        catch (markError) { }
      }
      try {
        var park = self._accountsPrefetch;
        if (!park) { return false; }
        if (park.variant !== (useActionsVariant === true)) {
          prefetchMark("declined (variant)");
          return false;
        }
        //a park from a previous session must never be served to this one
        if (park.user !== applicationManager.getUserPreferencesManager().getUserName()) {
          self._accountsPrefetch = null;
          prefetchMark("declined (user)");
          return false;
        }
        if ((new Date().getTime() - park.at) > self._ACCOUNTS_PREFETCH_MAX_AGE_MS) {
          self._accountsPrefetch = null;
          prefetchMark("declined (age)");
          kony.print("[PREFETCH] parked response too old, making a live call");
          return false;
        }
        if (park.done === true) {
          self._accountsPrefetch = null;
          prefetchMark("served (already arrived)");
          completionCallback(park.status, park.data, park.error);
          return true;
        }
        park.waiting = completionCallback;   //still in flight, hand over on arrival
        prefetchMark("served (waiting on response)");
        return true;
      } catch (consumeError) {
        self._accountsPrefetch = null;
        kony.print("[PREFETCH] consume failed, making a live call: " + consumeError);
        return false;
      }
    },

    clearAccountsPrefetch : function() {
      try { this._accountsPrefetch = null; } catch (clearError) { }
    },
  };
});