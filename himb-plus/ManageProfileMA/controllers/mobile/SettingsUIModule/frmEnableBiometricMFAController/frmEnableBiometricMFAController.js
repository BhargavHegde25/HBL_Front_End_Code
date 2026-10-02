define({ 
	noteIsEnable:false,

 //Type your controller code here 
 preshow:function(){
	var scope = this;
	 this.view.postShow = this.postShow.bind(this);
	 var navManager = applicationManager.getNavigationManager();
	 var BiometricStaus=kony.store.getItem("BiometricMFAEnable");
	 if(BiometricStaus){
		  this.view.lblNote.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometric.disable");
		 this.view.lblnote2.setVisibility(true);
	 }else{
        this.view.lblNote.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometric.setup");
		 this.view.lblnote2.setVisibility(false);
		
	 }
	 this.view.flxBiometricEnable.setVisibility(false);
	 this.view.flxMainContainer.setVisibility(true);
	 this.view.TPin.setVisibility(false);
     this.view.customHeader.flxBack.setVisibility(true);
	 this.view.title=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricmfa");
      if (kony.os.deviceInfo().name === "iPhone") {
        this.view.flxHeader.isVisible = false;
      } else {
        this.view.flxHeader.isVisible = true;
      }
	  if(this.view.TPin.isVisible){
		  this.view.title=kony.i18n.getLocalizedString("i18n.mb.mfa.verifyMFA");
	  }
	  else{
		 this.view.title=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricmfa"); 
	  }
	  // Note popup
          //scope.setNoteInfo();
          scope.view.TPin.flxInfoNote.onTouchStart = function(){
            scope.noteIsEnable = !scope.noteIsEnable;
            scope.view.TPin.flxNotePopUp.setVisibility(scope.noteIsEnable);
          }
          scope.view.TPin.flxNote.onTouchStart = function(){
            scope.noteIsEnable = false;
            scope.view.TPin.flxNotePopUp.setVisibility(scope.noteIsEnable);
          }
          this.view.TPin.flxNotePopUp.onTouchStart = function(){
            scope.noteIsEnable = false;
            scope.view.TPin.flxNotePopUp.setVisibility(scope.noteIsEnable);
          }

	this.initAction();
	this.view.forceLayout();
 },
 postShow: function () {
    var scope = this;
    scope.setNoteInfo();
  },
 initAction:function(){
	 this.view.btnSetAsDefault.onClick=this.showsettings;
	 this.view.customHeader.flxBack.onClick=this.navBack;
	 this.view.customHeader.btnRight.onClick=this.cancelonclick;
	 this.view.btnMFAContinue.onClick=this.continueOnclick;
	 this.view.TPin.onSuccessCallback = function (response) {
        this.PinSuccess(response);
      };
	   this.view.TPin.onFailureCallback = function (response) {
        this.setErrorMessageAndLogout(response);
      };
 },
 showsettings:function(){
	 this.view.flxBiometricEnable.setVisibility(true);
	 this.view.flxMainContainer.setVisibility(false);
 },
 navBack:function(){
	 if(this.view.TPin.isVisible){
	 this.view.customHeader.flxBack.setVisibility(true);
     this.view.flxMainContainer.setVisibility(true);
     this.view.flxBiometricEnable.setVisibility(false);
     this.view.TPin.setVisibility(false);
	 }
	 else{
		var navManager = applicationManager.getNavigationManager();
	 navManager.navigateTo("frmSettings"); 
	 }
	 this.view.forceLayout();
 },
 cancelonclick:function(){
	 var navManager = applicationManager.getNavigationManager();
	 navManager.navigateTo("frmSettings");
 },
 continueOnclick:function(){
	 var scope=this;
	var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
	if(status==5000){
          scope.view.TPin.action = "";
          scope.view.TPin.setContext("");
		  this.view.title=kony.i18n.getLocalizedString("i18n.mb.mfa.verifyMFA");
		  scope.view.TPin.setVisibility(true);
          this.view.customHeader.flxBack.setVisibility(false);
		  scope.view.flxBiometricEnable.setVisibility(false);
		  scope.view.flxMainContainer.setVisibility(false);
           
	}
	else if(status ==5007){
		applicationManager.getDataProcessorUtility().showToastMessageError(scope,kony.i18n.getLocalizedString("i18n.mb.mfa.biometric.errormsg"));
	}
	
 },
  //setNote Info
        setNoteInfo: function() {
            let note = kony.i18n.getLocalizedString("i18n.HBL.PinNote");
            this.view.TPin.lblNotePopup.text = note;
            this.view.TPin.lblNotePopup.left = 8;
            this.view.TPin.lblNotePopup.top = 8;
            this.view.TPin.lblNotePopup.maxWidth = this.view.TPin.flxNote.frame.width - 20 ;
        },
 
 PinSuccess:function(res){
	 
 },
  setErrorMessageAndLogout: function (response) {
      if(response.hasOwnProperty("isLogoutUser") && response.isLogoutUser ){
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
        loginData = loginData ? loginData : {};
        loginData.toastMessage = response.errorMessage;
        applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
         var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "appName": "AuthenticationMA",
                            "moduleName": "AuthUIModule"
                        });
         authMod.presentationController.onLogout();
      } else {
        applicationManager.getPresentationUtility().MFA.onMFAError(response);
      }
    },
 

 });