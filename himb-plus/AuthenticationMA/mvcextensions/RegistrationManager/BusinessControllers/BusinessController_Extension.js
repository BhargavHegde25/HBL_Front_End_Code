define( function(){
  return {
    getResetThirdPartyStatus : function(params, presentationSuccessCallback, presentationErrorCallback){
      var self = this;
      var securityRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
      securityRepo.customVerb('getResetThirdPartyStatus', params, getAllCompletionCallback);

      function getAllCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
          presentationSuccessCallback(obj["data"]);
        } else {
          presentationErrorCallback(obj["errmsg"]);
        }
      }
    },
  }
});