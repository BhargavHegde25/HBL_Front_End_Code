define(function () {

  function AssetBusinessController(compViewCtrlScope) {
   this.compViewCtrlScope=compViewCtrlScope;
    this.serviceParameters = {};
   
  }
  
  AssetBusinessController.prototype.fetchDetails = function(objServiceName,operationName,objName,criteria,unicode) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var scope=this;
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options = {
      "dataObject": dataObject
    };    
    objSvc.customVerb(operationName, options,
                      function(response) {
      scope.allocationSuccessCallBack(response,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Fetch transacation list service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      scope.allocationFailureCallBack(errorObj);
      kony.print("Failed to fetch Instrument Details:" + JSON.stringify(error));
    });
  };


AssetBusinessController.prototype.allocationSuccessCallBack = function(response,unicode){
 
  debugger;
  if(unicode==="asset"){
     this.compViewCtrlScope.assetResponse=response;
  this.compViewCtrlScope.setAssetData()
  }
  },

    AssetBusinessController.prototype.allocationFailureCallBack = function(eerorobj){

    this.compViewCtrlScope.failureCall();
  },

    AssetBusinessController.prototype.setProperties = function (contextDataToBeStored, serviceParameters, customDataFormat, contextData, rowDataMapping) {
    var scope = this;
    try {
      scope.contextDataToBeStored = contextDataToBeStored;
      this.context = contextData;
      this.serviceParameters = serviceParameters;
      this.rowDataMapping = rowDataMapping;
    } catch (err) {
      scope.setError(err, "setProperties");
    }
  };

  
  AssetBusinessController.prototype.setError = function (errorMsg, method) {
    var errorObj = {
      "level": "ComponentBusinessController",
      "method": method,
      "error": errorMsg
    };
    this.compViewCtrlScope.onError(errorObj);
  };


  return AssetBusinessController;
});