define(["CommonUtilities","OLBConstants"],function(CommonUtilities,OLBConstants){
    return{
        createTnC : function(flowType) {
            params = {
                "languageCode": kony.i18n.getCurrentLocale().replace("_", "-")
            };
            if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
                applicationManager.getTermsAndConditionManager().createTermsAndConditionsLogin(params, this.onSuccessCreateTnC.bind(this, flowType), this.onFailureCreateTnC.bind(this, flowType));
            }
        },
        onSuccessCreateTnC : function(flowType) {
            if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                if (kony.application.getCurrentForm().id == "frmPreTermsandCondition") {
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
                }
                else{
                authModule.presentationController.doPostLoginWork();
                }
            }
        },
        onFailureCreateTnC : function(flowType, response) {
            if (flowType === OLBConstants.TNC_FLOW_TYPES.Login_TnC) {
                applicationManager.getNavigationManager().updateForm({
                    error: response
                }, "frmPreTermsandCondition");
            }
        }
    };
});