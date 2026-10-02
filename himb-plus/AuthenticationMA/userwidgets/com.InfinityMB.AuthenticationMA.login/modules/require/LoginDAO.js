define(function () {
  function LoginDAO(){}

  LoginDAO.prototype.login = function(authParams, presentationSuccess, presentationError, identityServiceName){    
    let authClient = KNYMobileFabric.getIdentityService(identityServiceName);
    function successCallback(resSuccess){
      presentationSuccess(resSuccess);
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    function errorCallback(resError){
      var srh = applicationManager.getServiceResponseHandler();
      var res  = srh.manageLoginResponse(resError);
      presentationError(res);
      // applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    authClient.login(authParams,successCallback,errorCallback);
  };

  LoginDAO.prototype.validateLogin = function(params, presentationSuccessCallback, presentationErrorCallback){
      var deviceRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DeviceRegistration");
      deviceRepo.customVerb('ValidateUserDeviceLogin', params, getCompletionCallback);
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

  return LoginDAO;
});