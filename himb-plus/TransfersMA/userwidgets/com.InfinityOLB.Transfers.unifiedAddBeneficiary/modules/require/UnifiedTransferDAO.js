define(function () {

  function UnifiedTransferDAO(){
    this.client = kony.sdk.getCurrentInstance();
  }
  /**
     * @api : validateAccountNumber
     * @description :  method to invoke save this Payee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : onError{function} -function to be invoekd on error
     */
    UnifiedTransferDAO.prototype.validateAccountNumber = function(objServiceName,objName,operationName,criteria,onSuccess,onError){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options1,
                      function(response) {
      onSuccess(response);
      kony.print("AccountNumber Successfully validated: " + JSON.stringify(response));
    },
                      function(error) {

      var errObj = {
        "errorInfo" : "Error in validating account number.",
        "error": error
      };
      onError(errObj);

    });
  },
  /**
     * @api : searchClearingCode
     * @description :  method to invoke save this Payee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : onError{function} -function to be invoekd on error
     */
    UnifiedTransferDAO.prototype.searchClearingCode = function(objServiceName,objName,operationName,criteria,onSuccess,onError){
      kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
      var objSvc = this.client.getObjectService(objServiceName, {
          access: "online",
      });
      var dataObject = new kony.sdk.dto.DataObject(objName);
      for (var key in criteria) {
          dataObject.addField(key, criteria[key]);
      }
      var options1 = {
          dataObject: dataObject,
      };
      objSvc.customVerb(
          operationName,
          options1,
          function (response) {
              onSuccess(response);
              kony.print("fetched bank clearing codes successfully : " + JSON.stringify(response));
          },
          function (error) {
              var errObj = {
                  errorInfo: "Error in fetching searched clearing code.",
                  error: error,
              };
              onError(errObj);
          }
      );
  },
      /**
     * @api : getSwiftCode
     * @description :  method to invoke save this Payee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : onError{function} -function to be invoekd on error
     */
       UnifiedTransferDAO.prototype.getSwiftCode = function(objServiceName,objName,operationName,criteria,onSuccess,onError){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options1,
                      function(response) {
      onSuccess(response);
      kony.print(" Swift Code fetched Successfully : " + JSON.stringify(response));										  
    },
                      function(error) {

      onError(error);

    });
  },
     /**
     * @api : fetchCountriesList
     * @description :  method to invoke fetchCountriesList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  UnifiedTransferDAO.prototype.fetchCountriesList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options1,
                      function(response1) {
      kony.application.dismissLoadingScreen();
      onSuccess(response1["records"],unicode);
      kony.print("FetchCountriesList Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Error in fetchCountriesList method of the component.",
        "error": error
      };
      onError(errObj);
    });
  };
  /**
     * @api : fetchStatesList
     * @description :  method to invoke fetchStatesList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  UnifiedTransferDAO.prototype.fetchStatesList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1["records"],unicode);
      kony.print("Fetch State List Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Error in fetchStatesList method of the component.",
        "error": error
      };
      onError(errObj);
    });
  };
  
  /**
     * @api : fetchcontractsList
     * @description :  method to invoke fetchContractssList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  UnifiedTransferDAO.prototype.fetchContractsList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Contracts List Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Error in fetchContractsList method of the component.",
        "error": error
      };
      onError(errObj);
    });
  };
  /**
  * @api : invokeCustomVerbforFetchBanks
  * validate the transaction data using service call
  * @return : NA
  */
  UnifiedTransferDAO.prototype.fetchBanks = function(presentationSuccessCallback, presentationErrorCallback){	  
      var cipsTransfers  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
      cipsTransfers.customVerb('getOtherBankDetails', {}, getCompletionCallback);
      function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj =  srh.manageResponse(status,  data,  error);
        if(obj["status"] === true){
          presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
  };
   /**
  * @api : validateBank
  * validate the selected bank using service call
  * @return : NA
  */
  UnifiedTransferDAO.prototype.validateBank = function(){
	  var collectionObj = this.store.getState();
	  var scope = this;
	  var params = { 
			"accountId": collectionObj.Collection.Transaction.accountId,
			"bankId": collectionObj.Collection.Transaction.bankId,
			"accountName": collectionObj.Collection.Transaction.accountName};
      var cipsTransfers  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
      cipsTransfers.customVerb('validateOtherBankAccount', params, getCompletionCallback);
      function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj =  srh.manageResponse(status,  data,  error);
        if(obj["status"] === true){
          scope.fetchOtherbankTransfersFee(data);
        }
        else {
          scope.setError("invokeCustomVerbforValidateTransaction");
        }
      }
  };

   /**
     * @api : getBankNamefromBic
     * @description :  method to invoke getBankNamefromBic service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @paxram : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
   UnifiedTransferDAO.prototype.getBankNamefromBic = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Contracts List Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Error in fetchContractsList method of the component.",
        "error": error
      };
      onError(errObj);
    });
  };
  /**
	* @api : getClearingIdentifierCodes
	* fetches ClearingIdentifierCodes
	* @return : NA
	*/ 
  UnifiedTransferDAO.prototype.getClearingIdentifierCodes = function(successCallback, errorCallback) {
    var scope = this;
    let serviceName = "TransactionObjects";
    let objectName = "ExternalCodes";
    let verb = "getPurposeCodes";
    let criteria = {
      "id": "ClearingSysId"
    };

    kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
    var objSvc = this.client.getObjectService(serviceName, {
      access: "online",
    });
    var dataObject = new kony.sdk.dto.DataObject(objectName);
    for (var key in criteria) {
      dataObject.addField(key, criteria[key]);
    }
    var options = {
      dataObject: dataObject,
    };
    objSvc.customVerb(
      verb,
      options,
      function (response) {
        successCallback(response.PurposeCodes);
        kony.print("Fetch Contracts List Performed Successfully: " + JSON.stringify(response));
      },
      function (error) {
        var errObj = {
          "errorInfo" : "Error in getClearingIdentifierCodes method" ,
          "errorLevel" : "Component",
          "error": error
        };
        errorCallback(errObj);
      }
    );
  };
 return UnifiedTransferDAO;
});