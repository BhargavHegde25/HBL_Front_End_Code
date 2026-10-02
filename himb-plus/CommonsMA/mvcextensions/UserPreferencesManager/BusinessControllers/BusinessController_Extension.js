define(function(){
  return{
    updateUserDetails : function(userJSON, presentationSuccess, presentationError) {
       var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers");
      var scope = this;
      userAccount.customVerb('customUserDetailsUpdate', userJSON, partialUpdateCompletionCallback);
      function partialUpdateCompletionCallback(status, data, error) {
          try{
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccess(obj["data"]);
        } else {
          presentationError(obj["errmsg"]);
        }
        }
        catch(err){
        kony.print("updateUserDetails"+ err);
        }
      }
    },
    crossBorderPendingConsent : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
      userAccount.customVerb('createConsent', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    transferToOwnAccount : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
      userAccount.customVerb('TransferToOwnAccounts', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    interBankDomesticTransfer : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
      userAccount.customVerb("createExternalTransaction", record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    intraBankAccTrasfer : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
      userAccount.customVerb('IntraBankAccFundTransfer', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    intraBankNewAccTrasfer : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("OneTimeTransfer");
      userAccount.customVerb('Create', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    intraDomesticBankAccTrasfer : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
      userAccount.customVerb('IntraBankAccFundTransfer', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    createPayment : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
      userAccount.customVerb('createPayment', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    crossBorderConsent : function(record, presentationSuccess, presentationError) {
      var scope = this;
      var userAccount = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
      userAccount.customVerb('updateConsent', record, completionCallback);
        function completionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccess(obj["data"]);
            } else {
                presentationError(obj["errmsg"]);
            }
        }
    },
    getDefaultAccountforChequeManagement : function() {
      return this.getUserObj().default_account_checkmanagement ? this.getUserObj().default_account_checkmanagement : "";
    },
	getDefaultAccountforesewa : function() {
      return this.getUserObj().default_account_esewa ? this.getUserObj().default_account_esewa : "";
    },
  }

});