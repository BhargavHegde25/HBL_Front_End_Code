define(['CommonUtilities'],function(CommonUtilities){
  return{
    updateAccountNickName : function(params, presentationSuccessCallback, presentationErrorCallback){
      var self = this;
      var securityRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
      securityRepo.customVerb('updateAccNickName', params, getAllCompletionCallback);
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
    getTransactionPin : function(param, presentationSuccessCallback, presentationErrorCallback) {
      var infoTerms = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
      infoTerms.customVerb('getTransactionPINStatus', param, getCompletionCallback);
      function getCompletionCallback(status, data, error) {
          var srh = applicationManager.getServiceResponseHandler();
          var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
          if (obj["status"] === true) {
              presentationSuccessCallback(obj["data"]);
          } else {
              presentationErrorCallback(obj["errmsg"]);
          }
      }
    },
  };
});