define(function () {
  function SecurityCodeDAO(){

  }

  SecurityCodeDAO.prototype.requestLoginMFAOtp = function(objServiceName, objName, operationName, params, presentationSuccessCallback, presentationErrorCallback){
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject(objName);
    /*
    var options = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options, successCallback, failureCallback);
    */                  
    var userobj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(objName);
    function getUserCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
    userobj.customVerb(operationName, params, getUserCompletionCallback);
  };
  
  SecurityCodeDAO.prototype.verifyLoginMFAOtp = function (objServiceName, objName, operationName, params, presentationSuccessCallback, presentationErrorCallback) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject(objName);
        if (params.MFAAttributes.Biometric && params.MFAAttributes.Biometric.BiometricStatus) kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(objName).setHeaderParams({
                "X-Kony-Bio-Auth-Code": params.MFAAttributes.Biometric.BiometricStatus.toString()
            })
            /*
            var options = {
              "dataObject": dataObject
            };
            objSvc.customVerb(operationName, options, successCallback, failureCallback);
            */
        var userobj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(objName);

        function getUserCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            } else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
        userobj.customVerb(operationName, params, getUserCompletionCallback);
    };
	SecurityCodeDAO.prototype.login = function(authParams, presentationSuccess, presentationError, identityServiceName){    
	applicationManager.getPresentationUtility().showLoadingScreen();
    let authClient = KNYMobileFabric.getIdentityService(identityServiceName);
    function successCallback(resSuccess){
      presentationSuccess(resSuccess);
    }
    function errorCallback(resError){
      var srh = applicationManager.getServiceResponseHandler();
      var res  = srh.manageLoginResponse(resError);
      presentationError(res.errmsg);
    }
    authClient.login(authParams,successCallback,errorCallback);
  };
    return SecurityCodeDAO;
});