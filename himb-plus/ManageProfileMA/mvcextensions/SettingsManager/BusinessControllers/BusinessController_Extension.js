define(["CommonUtilities","OLBConstants",'SCAConfiguration'],function(CommonUtilities,OLBConstants,SCAConfiguration){
    return{
        getTransactionPin: function(param, presentationSuccessCallback, presentationErrorCallback) {
            var self = this;
            var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
            infoTerms.customVerb('getTransactionPINStatus', param, getCompletionCallback);
          
            function  getCompletionCallback(status,  data,  error) {
                var srh = applicationManager.getServiceResponseHandler();
                var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
                if (obj["status"] === true) {
                    presentationSuccessCallback(obj["data"]);
                } else {
                    presentationErrorCallback(obj["errmsg"]);
                }
            }
          },
          fetchUpdateTransactionPin: function(param, presentationSuccessCallback, presentationErrorCallback) {
            var self = this;
            var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Security");
            infoTerms.customVerb('updateTransactionPIN', param, getCompletionCallback);
          
            function  getCompletionCallback(status,  data,  error) {
                var srh = applicationManager.getServiceResponseHandler();
                var obj = srh.manageResponse(status,  data,  error, presentationSuccessCallback, presentationErrorCallback);
                if (obj["status"] === true) {
                    presentationSuccessCallback(obj["data"]);
                } else {
                    presentationErrorCallback(obj["errmsg"]);
                }
            }
          },
        };
});