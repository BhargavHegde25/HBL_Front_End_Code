define(["CommonUtilities", "OLBConstants"], function(CommonUtilities, OLBConstants) {
  return{
 navigateToFrmEnrollDOB: function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmEnrollDOB");
 }, 
  navigateToFrmEnrollSSN: function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmEnrollSSn");
 }, 
  navigateToemail: function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmEnrollEmail");
 }, 
  enrollRetailUser: function(params){
    	var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    //params["dateOfBirth"]=params["dateOfBirth"].substr(0, 10);
    newUserManager.enrollRetailUser(params,enrollMod.presentationController.enrollRetailUserSuccessCallback,enrollMod.presentationController.enrollRetailUserErrorCallback);
  },
getCountryCodes : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    const userPrefManager = applicationManager.getUserPreferencesManager();
    userPrefManager.getCountryCodes(scope_AuthPresenter.getCountryCodesSuccess, scope_AuthPresenter.getCountryCodesError);
    },
  getCountryCodesSuccess : function(data){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    
    applicationManager.getNavigationManager().updateForm({
             "country": data.countrycode
         },"frmEnrollNow");
  },
  getCountryCodesError : function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
   verifyUser : function(detailsJSON, callback) {
        applicationManager.getNewUserBusinessManager().setUserDetailsForEnroll(detailsJSON);
        //applicationManager.getAuthManager().VerifyUserisalreadyEnrolled(detailsJSON, this.onSuccessVerifyUSer.bind(this, detailsJSON), this.onFailureVerifyUSer.bind(this));
        //applicationManager.getNewUserBusinessManager().enrollRetailUser(detailsJSON, this.onSuccessVerifyUSer.bind(this, detailsJSON, callback), this.onFailureVerifyUSer.bind(this, callback));
  applicationManager.getNewUserBusinessManager().enrollRetailUser(detailsJSON, this.enrollRetailUserSuccessCallback.bind(this, detailsJSON, callback), this.enrollRetailUserErrorCallback.bind(this));
    },
 enrollRetailUserSuccessCallback : function(res,formCallBack,detailsJSON) {
    res.userDetails= detailsJSON;
    var data = res;
    var isUserExists = false;
    var isActivationCodeSent = false;
    var isUserEnrolled = false;
    var channelAccess;
    var statusba;
    var isConsentProvided;
        var viewControllerEnroll =applicationManager.getPresentationUtility().getController("EnrollUIModule/frmEnroll", true, { "appName": "SelfServiceEnrolmentMA" });
//		applicationManager.getPresentationUtility().getController('frmEnroll', true);
    var navManager = applicationManager.getNavigationManager();
    if(!kony.sdk.isNullOrUndefined(data.userDetails["isUserExists"]))
      isUserExists = (data.userDetails["isUserExists"] === "true")? true : false;
   if(!kony.sdk.isNullOrUndefined(data.userDetails["isActivationCodeSent"]))
      isActivationCodeSent = (data.userDetails["isActivationCodeSent"] === "true")? true : false;
    if(!kony.sdk.isNullOrUndefined(data.userDetails["isUserEnrolled"]))
      isUserEnrolled = (data.userDetails["isUserEnrolled"] === "true")? true : false;
    if(!kony.sdk.isNullOrUndefined(data.userDetails["isConsentProvided"]))
      isConsentProvided = (data.userDetails["isConsentProvided"] === "true")? true : false;
      channelAccess = !kony.sdk.isNullOrUndefined(data.userDetails["channelAccess"]) ? data.userDetails.channelAccess : "NONE";
   statusba = !kony.sdk.isNullOrUndefined(detailsJSON.status) ? detailsJSON.status : "NA";
   if(isUserExists == true && isUserEnrolled == true && channelAccess == "MOBILE_BANKING_ONLY" && statusba=="2") {  
    navManager.navigateTo("frmEnrollPreferred",false,{"screen4":data});
   }if(isUserExists == true && isUserEnrolled == true && channelAccess == "ONLINE_BANKING_ONLY" && statusba=="3") {  
    navManager.navigateTo("frmEnrollPreferred",false,{"screen5":data});
   }if(isUserExists == true && isUserEnrolled == true) {
                 navManager.setCustomInfo("checkEnrollStat", "EnrolledAndActivated");
                 navManager.setCustomInfo("screen",3);
         navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            }else if(isConsentProvided ==false){
               navManager.navigateTo("frmEnrollPreferred",false,{"screen1":data});     
            }else if(statusba=="1" && isConsentProvided ==true && channelAccess == "MOBILE_BANKING_ONLY"){
                 navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollPreferred"},false,{"screen2":data});
            }else if(statusba=="2" && isConsentProvided ==true && channelAccess == "ONLINE_BANKING_ONLY"){
                 navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollPreferred"},false,{"screen3":data});
            }else if(statusba=="3" && isActivationCodeSent == true && channelAccess =="BOTH"){
                navManager.setCustomInfo("checkEnrollStat", "EnrolledAndActivated");  
                 navManager.setCustomInfo("screen",4);
                 navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            }else if(data.userDetails.isUserEnrolled =="SID_CUS_PENDING_VERIFICATION"){
                navManager.setCustomInfo("checkEnrollStat", "EnrolledAndActivated");  
                 navManager.setCustomInfo("screen",1);
            navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            }else if(isUserExists == true && detailsJSON.isUserEnrolled == "SID_CONTRACT_REJECTED"){
              navManager.navigateTo("frmEnrollPreferred",false,{"screen1":data});
            }
            else if(isUserExists === false){
                navManager.setCustomInfo("checkEnrollStat", "cantEnroll");  
      navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            }
            else if(!kony.sdk.isNullOrUndefined(data.userDetails.status)){
    if (data.userDetails.status == "PENDING_VERIFICATION") {
                navManager.setCustomInfo("checkEnrollStat", "EnrolledAndActivated");  
                 navManager.setCustomInfo("screen",1);
         navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            } else if (data.userDetails.status == "REQUEST_REJECTED") {
                navManager.setCustomInfo("checkEnrollStat", "cantEnroll");  
      navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            } else if (data.userDetails.status == "REQUEST_SUBMITTED") {
              navManager.setCustomInfo("checkEnrollStat", "EnrolledAndActivated");
              navManager.setCustomInfo("screen",2);  
         navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            }
            }
            else{
                navManager.setCustomInfo("checkEnrollStat", "cantEnroll");  
      navManager.navigateTo({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollInfo"});
            }
			//navManager.setCustomInfo("LegacyUserEnrolldetails", "");  
			applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
 enrollRetailUserErrorCallback : function(error) {
    var viewController = applicationManager.getPresentationUtility().getController('frmEnroll', true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
//     if (error && error["isServerUnreachable"])
//       viewController.enrollError(0);
//     else
     // viewController.enrollError(error.serverErrorRes.dbpErrCode);
     viewController.enrollErrorMsg(error.errorMessage);
  },
    onSuccessVerifyUSer : function(response, formCallBack, detailsJSON) {
        var authManager = applicationManager.getAuthManager();
        authManager.setServicekey(detailsJSON.serviceKey);
        response.userDetails = detailsJSON;
        var context = {
            "action": "VerifyUserSuccess",
            "data": response
        };
        var testFormCallBack = false;
        if (!kony.sdk.isNullOrUndefined(formCallBack)) {
            var isEmpty = (Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}');
            testFormCallBack = !isEmpty;
        }
        if (testFormCallBack) {
            try {
                formCallBack(context);
            } catch (e) {}
        } else {
             var navManager = applicationManager.getNavigationManager();
              navManager.navigateTo({"appName": "SelfServiceEnrolmentMA","friendlyName": "EnrollUIModule/frmEnroll",context})
            //applicationManager.getNavigationManager().updateForm(context);
        }
    },
   onFailureVerifyUSer : function(response, formCallBack) {
        var context = {
            "action": "VerifyUserFailure",
            "data": formCallBack
        };
        var testFormCallBack = false;
        if (!kony.sdk.isNullOrUndefined(formCallBack)) {
            var isEmpty = (Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}');
            testFormCallBack = !isEmpty;
        }
        //     if (testFormCallBack) {
        //       try {
        //         formCallBack(context);
        //       }
        //       catch (e) {}
        //     }
        // else {
        applicationManager.getNavigationManager().updateForm(context);
        // }
    },
setChannelRequest: function(payload){
applicationManager.getNewUserBusinessManager().createChannelAccessRequestPayload(payload, this.channelAccessRequestSuccess.bind(this,payload), this.channelAccessRequestError);
},
channelAccessRequestSuccess: function(payload,response){
var data = response;
if(data.status =="REQUEST_SUBMITTED"){
     var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmEnrollSuccess",false,{"screen":true});
}else{
  var context = {
  "action": "RequestSubmitted",
  "data": payload,
  "result": data
};
var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmEnrollSuccess",false,{"screen":context});
}
},
channelAccessRequestError: function(error){
var err = error;
 var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmEnrollSuccess",false,{"error":true});
},
};
});

