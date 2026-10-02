define(["CommonUtilities", "OLBConstants"], function(CommonUtilities, OLBConstants) {
  return{
     createChannelAccess : function(detailsJSON,formCallBack) {
        // kony.applicationManager.showLoadingScreen();
        applicationManager.getNavigationManager().updateForm({
            "showProgressBar": true
        });
        applicationManager.getNewUserBusinessManager().createChannelAccessRequestPayload(detailsJSON, this.createChannelAccessSuccessCallback.bind(this, formCallBack,detailsJSON), this.createChannelAccessErrorCallback.bind(this, formCallBack,detailsJSON));
    },
   createChannelAccessSuccessCallback : function(res,formCallBack,detailsJSON) {
        applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
       });
            var context = {
                "action": "RequestSubmitted",
                "data": formCallBack,
                "result":res
            };
       applicationManager.getNavigationManager().updateForm(context);
  },
 createChannelAccessErrorCallback : function(error) {
    applicationManager.getNavigationManager().updateForm({
            "hideProgressBar": true,
       });
     applicationManager.getNavigationManager().updateForm(context);
  },
  }
});