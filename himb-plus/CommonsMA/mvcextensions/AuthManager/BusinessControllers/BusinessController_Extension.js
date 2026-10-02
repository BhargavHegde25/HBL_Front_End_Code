define([], function() {
	return{
  validateLogin : function(params, presentationSuccessCallback, presentationErrorCallback){
      var deviceRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DeviceRegistration");
      deviceRepo.customVerb('ValidateUserDeviceLogin', params, getCompletionCallback);
      function  getCompletionCallback(status,  data,  error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj =  srh.manageResponse(status,  data,  error);
        if(obj["status"] === true){
          presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
    },
	};
  });