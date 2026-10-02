define(function () {

  function viewTransactionsDAO(){

  }
  /**
     * component fetchWatchlist
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post recevinf response
     * @param : unicode        {string}  - unique code to identify service reposne in case of multiple service calls
     */
  viewTransactionsDAO.prototype.fetchDetails = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError) {
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
      onSuccess(response,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Fetch transaction list service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to fetch Transactions:" + JSON.stringify(error));
    });
  };
 
  
  /**
     * component fetchAttachments
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post recevinf response
     */
  viewTransactionsDAO.prototype.fetchAttachments = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    dataObject = {
      "userId": 102,
      "customerId": customerId,
      "ricCodes": "AMZN.O:TSLA.OQ:GOOGL.O",
      "sortBy": "volume",
      "sortOrder": "desc"
    };
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
            "errorInfo" : "Fetch attachments  service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to fetch attachments:" + JSON.stringify(error));
    });
  };
  return viewTransactionsDAO;
});