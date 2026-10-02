define(['CommonUtilities','OLBConstants'], function (CommonUtilities,OLBConstants) {
return {

    /**
    * Gets getDefaultAccountforLoanPayment
    * @returns {string} -  returns getDefaultAccountforLoanPayment
    */
    getDefaultAccountforLoanPayment: function () {
        return this.getUserObj().default_account_loanpayment ? this.getUserObj().default_account_loanpayment : "";
    },
    /**
     * Gets getDefaultAccountforCardPayment
    * @returns {string} -  returns getDefaultAccountforCardPayment
    */
    getDefaultAccountforCardPayment: function () {
        return this.getUserObj().default_account_cardpayment ? this.getUserObj().default_account_cardpayment : "";
    },
    /**
     * Gets DefaultAccountforCheckManagement
     * @returns {string} -  returns DefaultAccountforCheckManagement
     */
    getDefaultAccountforCheckManagement: function () {
        return this.getUserObj().default_account_checkmanagement ? this.getUserObj().default_account_checkmanagement : "";
    },
    /**
     * Gets DefaultAccountforCheckDeposit
    * @returns {string} -  returns DefaultAccountforCheckDeposit
    */
    getDefaultAccountforCheckDeposit: function () {
        return this.getUserObj().default_account_checkdeposit ? this.getUserObj().default_account_checkdeposit : "";
    },

    fetchPasswordRulesAndPolicyNew : function (presentationSuccessCallback, presentationErrorCallback) {
        var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Users_2");
        kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository('Users_2').setHeaderParams({ "Accept-Language": kony.i18n.getCurrentLocale() });
        var params = {};
        userRepo.customVerb('getPasswordRulesAndPolicy', params, getAllCompletionCallback);
        function getAllCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            }
            else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
    },
    fetchUser : function(presentationSuccess, presentationError) {
    var userProfile = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Users");
    var scope = this;
    var clientProperties = Object.keys(CommonUtilities.CLIENT_PROPERTIES).length > 0 ? CommonUtilities.CLIENT_PROPERTIES :  OLBConstants.CLIENT_PROPERTIES
    let isPrivate = clientProperties['E2E_ENCRYPTION_ENABLED'];
    if(!kony.sdk.isNullOrUndefined(isPrivate))
        isPrivate = isPrivate.toLowerCase() === 'true' ? true : false;
    else isPrivate = false;
    if (isPrivate) {
        var key = clientProperties['E2E_ENCRYPTION_KEY'];
        var iv = clientProperties['E2E_ENCRYPTION_VECTOR'];
    }
    userProfile.getAll(getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
	if(kony.os.deviceInfo().name==="iPhone"){
            if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(data)){
        kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"),
        "alertHandler": scope.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok")
}, {});
            return;
            }
	}
        var profiles = [];
            var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error, presentationSuccess, presentationError);
        scope.userEntitlementsAddresses=[];
        if (obj["status"] === true) {
            if(key) {
                scope.dataPrivacyFetchUser(key, iv, obj["data"][0]);
            }
            scope.setUserObj(obj["data"]);
                if (obj["data"][0]["EmailIds"]&&obj["data"][0]["EmailIds"].length > 0)
                scope.userEntitlementsEmailIds = obj["data"][0]["EmailIds"];
                if (obj["data"][0]["default_account_billPay"]){
                kony.store.setItem("BillPayDefaultAccountid", data[0]["default_account_billPay"]);
                }
            if (obj["data"][0]["ContactNumbers"]&&obj["data"][0]["ContactNumbers"].length > 0)
                scope.userEntitlementsContactNumbers = obj["data"][0]["ContactNumbers"];
            if (obj["data"][0]["isSecurityQuestionConfigured"])
                scope.isSecurityQuestionConfigured = true;
            if (obj["data"][0]["Addresses"])
                scope.userEntitlementsAddresses = obj["data"][0]["Addresses"];
            if (obj["data"][0]["CoreCustomers"]){
                var filteredCoreCustomers = filterDuplicateCoreCustomers(obj["data"][0]["CoreCustomers"]);
                if(filteredCoreCustomers && filteredCoreCustomers!= undefined && filteredCoreCustomers.length>0){
                scope.isSingleCustomerProfile = filteredCoreCustomers.length > 1 ? false : true;
                filteredCoreCustomers.forEach(function(item){
                    scope.accessibleCustomerIds.push({
                        id : item.coreCustomerID,
                        type : item.isBusiness === "true" ? 'business' : 'personal',
                        name : item.coreCustomerName || "",
                        contractId : item.contractId || "",
                        contractName : item.contractName || ""
                    });
                    if(item.isPrimary === "true")
                    scope.primaryCustomerId = {
                        id : item.coreCustomerID,
                        type : item.isBusiness === "true" ? 'business' : 'personal',
                        name : item.coreCustomerName || "",
                        contractId : item.contractId || "",
                        contractName : item.contractName || ""
                    }
                });
                scope.accessibleCustomerIds.forEach(function(item){
                    if(!profiles.includes(item.type))
                    profiles.push(item.type);
                });
                }else{
                scope.accessibleCustomerIds.push({
                    "id" : scope.getUserId()
                })
                }                  
                if(profiles.length>1)
                scope.profileAccess = "both";
                else
                scope.profileAccess = profiles[0];
            }
            presentationSuccess(obj["data"]);
        } else {
            presentationError(obj["errmsg"]);
        }
    }

    function filterDuplicateCoreCustomers (data) {
    try {
        const arr = data;
        var result = arr.reduce((unique, o) => {
        if(!unique.some(obj => obj.coreCustomerID === o.coreCustomerID && obj.coreCustomerName === o.coreCustomerName &&
                        obj.isBusiness === o.isBusiness && obj.isPrimary === o.isPrimary &&
                        obj.contractId === o.contractId  && obj.contractName === o.contractName 
                        )) {
            unique.push(o);
        }
        return unique;
        },[]);
        return result;
    } catch (e) {
        return data;
    }
    }
},
alertCallback: function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	applicationManager.getPresentationFormUtility().logoutUser(true);
},
/*getUserFeaturesAndPermissions : function (presentationSuccessCallback, presentationErrorCallback) {
        var userObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Users");
        userObj.customVerb('getFeaturesAndPermissions', {}, completionCallBack);
        function completionCallBack(status, data, error) {
                     var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj.status === true) {
				alert("bussiness no feature data");
				
				if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(obj.data["features"])){
                return;
            }else{
				if (obj.status === true) {
					alert("bussiness more permissions data" + JSON.parse(JSON.stringify(obj.data["permissions"])));
					alert("bussiness more features data" + JSON.parse(JSON.stringify(obj.data["features"])));
                applicationManager.getConfigurationManager().features = JSON.parse(obj.data["features"]);
                applicationManager.getConfigurationManager().userPermissions = JSON.parse(obj.data["permissions"]);
                applicationManager.getConfigurationManager().setUserPermissions(JSON.parse(obj.data["permissions"]));
                applicationManager.getConfigurationManager().setFeatures(JSON.parse(obj.data["features"]));
                kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params['security_attributes'] ={};
                kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params['security_attributes'].features = obj.data["features"];
                kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params['security_attributes'].permissions = obj.data["permissions"];
                presentationSuccessCallback(obj.data);
            }
          else {
                presentationErrorCallback(obj.errmsg);
            }
            }
        }
    }
},*/
    /**
     * Gets DefaultAccountforQRPayments
    * @returns {string} -  returns DefaultAccountforQRPayments
    */
    /*
    getDefaultAccountforQRPayments: function () {
        return this.getUserObj().default_account_qrpayment ? this.getUserObj().default_account_qrpayment : "";
    }
    */
	 updateQRPayActivationFlag : function(status) {
        this.userObj[0]["isQRPaymentActivated"] = status;
		 kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.isQRPaymentActivated=status;
    },
        
};
});