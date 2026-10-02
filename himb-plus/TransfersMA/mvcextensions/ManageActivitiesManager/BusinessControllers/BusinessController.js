define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function ManageActivitiesManager() { 

        kony.mvc.Business.Delegator.call(this); 

    } 

    inheritsFrom(ManageActivitiesManager, kony.mvc.Business.Delegator); 
ManageActivitiesManager.prototype.initializeBusinessController = function () {
  };
  ManageActivitiesManager.prototype.execute = function (command) {
    kony.mvc.Business.Controller.prototype.execute.call(this, command);
  };
ManageActivitiesManager.prototype.getPayeesList = function (data, presentationSuccessCallback, presentationErrorCallback) {
    var getRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Payees");
    getRepo.customVerb("getPayeesList", data, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ManageActivitiesManager.prototype.domesticTransferPayment = function (data, presentationSuccessCallback, presentationErrorCallback) {
  var getRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
    getRepo.customVerb("createExternalTransaction", data, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ManageActivitiesManager.prototype.getList = function (data, presentationSuccessCallback, presentationErrorCallback) {
  var getRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
    getRepo.customVerb("getList", data, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ManageActivitiesManager.prototype.getBankDate = function (data, presentationSuccessCallback, presentationErrorCallback) {
  var getRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("BankDate");
    getRepo.customVerb("getBankDate", data, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  ManageActivitiesManager.prototype.getownAccTransfer=function (data, presentationSuccessCallback, presentationErrorCallback) {
   var getRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
    getRepo.customVerb("TransferToOwnAccounts", data, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.getPayeeName = function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Payee_Name");
    payeeModel.customVerb("getPayeeName", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };

  ManageActivitiesManager.prototype.getintraBankTransfer= function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Transaction");
    payeeModel.customVerb("IntraBankAccFundTransfer", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.validateOtherBanks=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CIPSTransfers");
    payeeModel.customVerb("validateOtherBankAccount", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.fetchBankFee=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Fee");
    payeeModel.customVerb("fetchOtherbankTransfersFee", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.fetchBankFee=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Fee");
    payeeModel.customVerb("fetchOtherbankTransfersFee", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.domesticPayment=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CIPSTransfers");
    payeeModel.customVerb("createExternalTransaction", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.getBankList=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("CIPSTransfers");
    payeeModel.customVerb("getOtherBankDetails", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.getContractCustomers=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
    payeeModel.customVerb("getInfinityUserContractCustomers", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.createPayeeCall=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Payees");
    payeeModel.customVerb("createPayee", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.createExchangePay=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("OneTimeTransfer");
    payeeModel.customVerb("Create", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.getAllBenefeAccount=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Recipients");
    payeeModel.customVerb("getExternalPayees", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.editPayeesList=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Payees");
    payeeModel.customVerb("editPayee", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
  ManageActivitiesManager.prototype.deletePayeesList=function (param, presentationSuccessCallback, presentationErrorCallback) {
    var payeeModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Recipients");
    payeeModel.customVerb("deleteExternalPayee", param, getAllCompletionCallback);
     function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    } 
  };
    return ManageActivitiesManager;

});
