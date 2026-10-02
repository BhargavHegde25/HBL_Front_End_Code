define(function () {

  function AllocationCarousalBusinessController(compViewCtrlScope) {
   this.compViewCtrlScope=compViewCtrlScope;
    this.serviceParameters = {};
   
  }
  
  AllocationCarousalBusinessController.prototype.fetchDetails = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError) {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
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
      applicationManager.getPresentationUtility().dismissLoadingScreen();
 
      var  errorObj =
          {
            "errorInfo" : "Fetch transacation list service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to fetch Instrument Details:" + JSON.stringify(error));
    });
  };


AllocationCarousalBusinessController.prototype.allocationSuccessCallBack = function(response,unicode){
 applicationManager.getPresentationUtility().dismissLoadingScreen();
  if(unicode==="asset"){
     this.compViewCtrlScope.assetResponse=response;
  this.compViewCtrlScope.setAssetData()
  }
  else if(unicode==="sector"){
    this.compViewCtrlScope.sectorData=response;
  }
},
  
  AllocationCarousalBusinessController.prototype.setProperties = function (contextDataToBeStored, serviceParameters, customDataFormat, contextData, rowDataMapping) {
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

  
  AllocationCarousalBusinessController.prototype.setError = function (errorMsg, method) {
    var errorObj = {
      "level": "ComponentBusinessController",
      "method": method,
      "error": errorMsg
    };
    this.compViewCtrlScope.onError(errorObj);
  };


  return AllocationCarousalBusinessController;
});