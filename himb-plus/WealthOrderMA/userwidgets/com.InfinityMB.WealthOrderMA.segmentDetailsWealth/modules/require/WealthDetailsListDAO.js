define(function() {

    function WealthDetailsListDAO() {

    }
    WealthDetailsListDAO.prototype.fetchHoldingsList = function(objServiceName, operationName, objName, criteria, onSuccess, onError) {

        var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
            "access": "online"
        });
        var dataObject = new kony.sdk.dto.DataObject(objName);

        for (var key in criteria) {
            dataObject.addField(key, criteria[key]);
        }
        //alert(JSON.stringify(dataObject));
        var options = {
            "dataObject": dataObject
        };

        objSvc.customVerb(operationName, options,
            function(response) {
                onSuccess(response);
                kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
            },
            function(error) {
                var errorObj = {
                    "errorInfo": "Fetch transfers list service call failed",
                    "errorLevel": "Fabric",
                    "error": error
                }
                onError(errorObj);
                kony.print("Failed to fetch Wealth Details:" + JSON.stringify(error));
            });
    };
	
	


    return WealthDetailsListDAO;

});