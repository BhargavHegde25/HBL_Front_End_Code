define(function() {
  function suitabilityRiskAppetiteBusinessController(){
    
  }
  
  suitabilityRiskAppetiteBusinessController.prototype.fetchDetails = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options = {
      "dataObject": dataObject
    };    
    objSvc.customVerb(operationName, options,
                      function(response) {
      onSuccess(response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Fetch my strategy service call failed",
            "errorLevel" : "Fabric",
            "error": error
          };
      onError(errorObj);
      kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
    });
  };
  return suitabilityRiskAppetiteBusinessController;
});