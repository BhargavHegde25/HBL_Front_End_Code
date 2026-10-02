define(['./SecurityCodeDAO'],function(SecurityCodeDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objectServiceName1="";
      this._objectName1="";
      this._operationName1="";
      this._objectServiceName2="";
      this._objectName2="";
      this._operationName2="";

      this._screen1SubmitBtnEnabledSkin="";
      this._screen1SubmitBtnDisabledSkin="";

      this._screen2TitleBgSkin="";
      this._screen2TitleSkin="";
      this._screen2SubtitleSkin="";
      this._screen2DescriptionSkin="";
      this._screen2ErrorMsgSkin="";
      this._screen2ResendBtnSkin="";
      this._screen2RegisterDevLblSkin="";
      this._screen2SubmitBtnEnabledSkin="";
      this._screen2SubmitBtnDisabledSkin="";

      this._checkboxUnselectedImg="";
      this._checkboxSelectedImg="";

      this._screen1SubmitBtnText="";

      this._screen2TitleText="";
      this._screen2SubtitleText="";
      this._screen2DescriptionText="";
      this._screen2ErrorMsgText="";
      this._screen2ResendBtnText="";
      this._screen2RegisterDevLblText="";
      this._screen2SubmitBtnText="";

      this.keypadString = '';
      this.time = 10;
      this.pos = 0;
      this.maxNoOfCode = 6;
      this.MFAResponse = "";
      this.flowType = "";
      this.servicekey = "";
      this.MFAType = "";
      this.userName = "";
      this.communicationType = "";
      this.mfaAttributes = "";
      this.serviceId = "";
      this.phoneAndEmail = {
        "phone": "",
        "email": ""
      };      
      this.SecurityCodeDAO = new SecurityCodeDAO();
      this._isPostLogin = true;
      this._action = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "objectServiceName1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objectServiceName1=val;
        }
      });
      defineGetter(this, "objectServiceName1", function() {
        return this._objectServiceName1;
      });
      defineSetter(this, "objectName1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objectName1=val;
        }
      });
      defineGetter(this, "objectName1", function() {
        return this._objectName1;
      });
      defineSetter(this, "operationName1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._operationName1=val;
        }
      });
      defineGetter(this, "operationName1", function() {
        return this._operationName1;
      });      
      defineSetter(this, "objectServiceName2", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objectServiceName2=val;
        }
      });
      defineGetter(this, "objectServiceName2", function() {
        return this._objectServiceName2;
      });
      defineSetter(this, "objectName2", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objectName2=val;
        }
      });
      defineGetter(this, "objectName2", function() {
        return this._objectName2;
      });
      defineSetter(this, "operationName2", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._operationName2=val;
        }
      });
      defineGetter(this, "operationName2", function() {
        return this._operationName2;
      });   
      defineSetter(this, "screen1SubmitBtnEnabledSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen1SubmitBtnEnabledSkin=val;
        }
      });
      defineGetter(this, "screen1SubmitBtnEnabledSkin", function(){
        return this._screen1SubmitBtnEnabledSkin;
      });
      defineSetter(this, "screen1SubmitBtnDisabledSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen1SubmitBtnDisabledSkin=val;
        }
      });
      defineGetter(this, "screen1SubmitBtnDisabledSkin", function(){
        return this._screen1SubmitBtnDisabledSkin;
      });
      defineSetter(this, "screen2TitleBgSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2TitleBgSkin=val;
        }
      });
      defineGetter(this, "screen2TitleBgSkin", function(){
        return this._screen2TitleBgSkin;
      });
      defineSetter(this, "screen2TitleSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2TitleSkin=val;
        }
      });
      defineGetter(this, "screen2TitleSkin", function(){
        return this._screen2TitleSkin;
      });
      defineSetter(this, "screen2SubtitleSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2SubtitleSkin=val;
        }
      });
      defineGetter(this, "screen2SubtitleSkin", function(){
        return this._screen2SubtitleSkin;
      });
      defineSetter(this, "screen2DescriptionSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2DescriptionSkin=val;
        }
      });
      defineGetter(this, "screen2DescriptionSkin", function(){
        return this._screen2DescriptionSkin;
      });
      defineSetter(this, "screen2ErrorMsgSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2ErrorMsgSkin=val;
        }
      });
      defineGetter(this, "screen2ErrorMsgSkin", function(){
        return this._screen2ErrorMsgSkin;
      });
      defineSetter(this, "screen2ResendBtnSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2ResendBtnSkin=val;
        }
      });
      defineGetter(this, "screen2ResendBtnSkin", function(){
        return this._screen2ResendBtnSkin;
      });
      defineSetter(this, "screen2RegisterDevLblSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2RegisterDevLblSkin=val;
        }
      });
      defineGetter(this, "screen2RegisterDevLblSkin", function(){
        return this._screen2RegisterDevLblSkin;
      });
      defineSetter(this, "screen2SubmitBtnEnabledSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2SubmitBtnEnabledSkin=val;
        }
      });
      defineGetter(this, "screen2SubmitBtnEnabledSkin", function(){
        return this._screen2SubmitBtnEnabledSkin;
      });
      defineSetter(this, "screen2SubmitBtnDisabledSkin", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2SubmitBtnDisabledSkin=val;
        }
      });
      defineGetter(this, "screen2SubmitBtnDisabledSkin", function(){
        return this._screen2SubmitBtnDisabledSkin;
      });
      defineSetter(this, "checkboxUnselectedImg", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._checkboxUnselectedImg=val;
        }
      });
      defineGetter(this, "checkboxUnselectedImg", function(){
        return this._checkboxUnselectedImg;
      });
      defineSetter(this, "checkboxSelectedImg", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._checkboxSelectedImg=val;
        }
      });
      defineGetter(this, "checkboxSelectedImg", function(){
        return this._checkboxSelectedImg;
      });
      defineSetter(this, "screen1SubmitBtnText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen1SubmitBtnText=val;
        }
      });
      defineGetter(this, "screen1SubmitBtnText", function(){
        return this._screen1SubmitBtnText;
      });
      defineSetter(this, "screen2TitleText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2TitleText=val;
        }
      });
      defineGetter(this, "screen2TitleText", function(){
        return this._screen2TitleText;
      });
      defineSetter(this, "screen2SubtitleText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2SubtitleText=val;
        }
      });
      defineGetter(this, "screen2SubtitleText", function(){
        return this._screen2SubtitleText;
      });
      defineSetter(this, "screen2DescriptionText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2DescriptionText=val;
        }
      });
      defineGetter(this, "screen2DescriptionText", function(){
        return this._screen2DescriptionText;
      });
      defineSetter(this, "screen2ErrorMsgText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2ErrorMsgText=val;
        }
      });
      defineGetter(this, "screen2ErrorMsgText", function(){
        return this._screen2ErrorMsgText;
      });
      defineSetter(this, "screen2ResendBtnText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2ResendBtnText=val;
        }
      });
      defineGetter(this, "screen2ResendBtnText", function(){
        return this._screen2ResendBtnText;
      });
      defineSetter(this, "screen2RegisterDevLblText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2RegisterDevLblText=val;
        }
      });
      defineGetter(this, "screen2RegisterDevLblText", function(){
        return this._screen2RegisterDevLblText;
      });
      defineSetter(this, "screen2SubmitBtnText", function(val){
        if((typeof val === 'string') && (val !== "")){
          this._screen2SubmitBtnText=val;
        }
      });
      defineGetter(this, "screen2SubmitBtnText", function(){
        return this._screen2SubmitBtnText;
      });
      defineSetter(this, "isPostLogin", function(val) {
        if((typeof val === 'boolean')){
          this._isPostLogin=val;
        }
      });
      defineGetter(this, "isPostLogin", function() {
        return this._isPostLogin;
      });
      defineSetter(this, "action", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._action=val;
        }
      });
      defineGetter(this, "action", function() {
        return this._action;
      });
    },
    setContext: function(mfaJSON){
      this.initMFAFlow(mfaJSON);
    },
    // COMMON FUNCTIONALITY
    /*===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====*/

    preShow : function(){
        var scope = this;
      this.setTextFromi18n();
      this.assignDefaultSkins();
      this.assignDefaultText();
      this.assignDefaultImages();
      this.setDefaultSettings();  
	  this.checkTpstatus();
      //set Note Info 
      var noteIsEnable=false;
      this.setNoteInfo();
      scope.view.flxInfoNote.onTouchStart = function(){
        noteIsEnable = !noteIsEnable;
        scope.view.flxNotePopup.setVisibility(noteIsEnable);
      }	
      scope.view.flxNotePopup.onTouchStart = function(){
         noteIsEnable = false;
         scope.view.flxNotePopup.setVisibility(noteIsEnable);
      }
       scope.view.flxNote.onTouchStart =function(){
        noteIsEnable = false;
        scope.view.flxNotePopup.setVisibility(noteIsEnable);
       }
	   applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setNoteInfo:function(){
        let note = kony.i18n.getLocalizedString("i18n.HBL.PinNote");
        this.view.lblNotePopup.text = note;
    },

    assignDefaultSkins: function(){
      this.view.btnSend.skin = this._screen1SubmitBtnEnabledSkin;
     // this.view.flxSecurityCode.skin = this._screen2TitleBgSkin;
      //this.view.lblEnterInfoTitle.skin = this._screen2TitleSkin;
      this.view.lblEnterInfoSubtitle.skin = this._screen2SubtitleSkin;
      this.view.lblEnterSAC.skin = this._screen2DescriptionSkin;
      this.view.lblError.skin = this._screen2ErrorMsgSkin;
      //this.view.btnReSend.skin = this._screen2ResendBtnSkin;
      this.view.lblRememberMyDevice.skin = this._screen2RegisterDevLblSkin;
    },

    assignDefaultText: function(){
      this.view.btnSend.text = this._screen1SubmitBtnText;
      //this.view.lblEnterInfoTitle.text = this._screen2TitleText;
     // this.view.lblEnterInfoSubtitle.text = this._screen2SubtitleText;
      this.view.lblEnterSAC.text = this._screen2DescriptionText;
            //this.view.btnReSend.text = this._screen2ResendBtnText;
      this.view.lblRememberMyDevice.text = this._screen2RegisterDevLblText;
      //this.view.btnVerify.text = this._screen2SubmitBtnText;      
    },

    assignDefaultImages: function(){

    },

    setTextFromi18n: function(){
      this._screen1SubmitBtnText = this.getStringFromi18n(this._screen1SubmitBtnText);
      this._screen2TitleText = this.getStringFromi18n(this._screen2TitleText);
      this._screen2SubtitleText = this.getStringFromi18n(this._screen2SubtitleText);
      this._screen2DescriptionText = this.getStringFromi18n(this._screen2DescriptionText);
      this._screen2ErrorMsgText = this.getStringFromi18n(this._screen2ErrorMsgText);
      this._screen2ResendBtnText = this.getStringFromi18n(this._screen2ResendBtnText);
      this._screen2RegisterDevLblText = this.getStringFromi18n(this._screen2RegisterDevLblText);
      this._screen2SubmitBtnText = this.getStringFromi18n(this._screen2SubmitBtnText);
    },

    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    initMFAFlow: function (mfaJSON) {
      this.setMFAResponse(mfaJSON.response);
      this.setMFAFlowType(mfaJSON.flowType);
      this.setServicekey(mfaJSON.response.MFAAttributes.serviceKey);
      this.setMFAType(mfaJSON.response.MFAAttributes.MFAType);
      this.setUserName(mfaJSON.userName);
      this.setCommunicationType(mfaJSON.response.MFAAttributes.communicationType);
	  this.setUIforEnroll(mfaJSON);
      this.setDefaultSettings();
      this.navigateToOtpScreen();
	  this.setFaceorBio();
    },
	setUIforEnroll:function(res){
		try{
			var scope=this;
			if(res&&res.response&&res.response.IsLegacyUser){
				scope.view.lblBiometric.setVisibility(false);
				scope.view.flxBiometric.setVisibility(false);
				scope.view.flxBiometricInvoke.setVisibility(false);
				scope.view.flxInfoNote.setVisibility(false);
			}
			else{
				scope.view.lblBiometric.setVisibility(true);
				scope.view.flxBiometric.setVisibility(true);
				scope.view.flxBiometricInvoke.setVisibility(true);
				scope.view.flxInfoNote.setVisibility(true);
			}
		}catch(e){
			kony.print("error in setUIforEnroll"+e);
		}
    },
	setFaceorBio:function(){
		 if (kony.os.deviceInfo().name === "iPhone") {
			 this.view.imgBiometric.src="facefinger.png"
			 this.view.imgBiometricFlow.src="facefinger.png"
      } else {
		  this.view.imgBiometric.src="biometric.png";
		  this.view.imgBiometricFlow.src="biometric.png";
      }
	  this.view.forceLayout();
    },

    setDefaultSettings: function(){
      this.view.flxMFAOption3Screen.setVisibility(false);
      this.view.flxSecurityCodeScreen.setVisibility(false);
      this.setPreShowForSecurityCodeScreen();
      this.preShowForMFAOption3Screen();
    },

    navigateToOtpScreen: function(){
      if(this.getCommunicationType()==="DISPLAY_ALL"){
        this.navigateToPhoneEmailScreen();
      } else {
        this.navigateToSecureCodeScreen();
      }
    },

    navigateToPhoneEmailScreen: function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      let mfaResponse = this.getMFAResponse();
      let flowType = this.getMFAFlowType();
      this.setFormUIMFAOption3(mfaResponse, flowType);
    },

    navigateToSecureCodeScreen : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      let mfaResponse = this.getMFAResponse();
      this.setFormUI(mfaResponse);
    },

    setMFAResponse: function (MFAResponse) {
      if (MFAResponse.MFAAttributes && MFAResponse.MFAAttributes.customerCommunication) {
        for (let i in MFAResponse.MFAAttributes.customerCommunication.phone)
          MFAResponse.MFAAttributes.customerCommunication.phone[i].unmasked = MFAResponse.MFAAttributes.customerCommunication.phone[i].referenceId;
        for (let j in MFAResponse.MFAAttributes.customerCommunication.email)
          MFAResponse.MFAAttributes.customerCommunication.email[j].unmasked = MFAResponse.MFAAttributes.customerCommunication.email[j].referenceId;
      }
      this.MFAResponse = MFAResponse;
    },
    getMFAResponse: function () {
      return this.MFAResponse;
    },

    setMFAFlowType: function (flowType) {
      this.flowType = flowType;
    },
    getMFAFlowType: function () {
      return this.flowType;
    },

    setServicekey: function (servicekey) {
      this.servicekey = servicekey;
    },
    getServicekey: function () {
      return this.servicekey;
    },

    setMFAType: function (MFAType) {
      this.MFAType = MFAType;
    },
    getMFAType: function () {
      return this.MFAType;
    },

    setUserName: function (userName) {
      this.userName = userName;
    },
    getUserName: function () {
      return this.userName;
    },

    setCommunicationType: function (communicationType) {
      this.communicationType = communicationType;
    },
    getCommunicationType: function () {
      return this.communicationType;
    },

    setServiceId: function (serviceId) {
      this.serviceId = serviceId;
    },
    getServiceId: function () {
      return this.serviceId;
    },

    setPhoneAndEmail: function(phoneAndEmail){
      this.phoneAndEmail = phoneAndEmail;
    },
    getPhoneAndEmail: function(){
      return this.phoneAndEmail;
    },    

    // MFA OPTION 3 FUNCTIONALITY
    /*===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====*/
    preShowForMFAOption3Screen: function(){
      this.setFlowActionsForMFAOption3();      
    },

    setFlowActionsForMFAOption3: function(){
      this.view.btnSend.onClick = this.onClickSend;
      this.view.customHeaderOption3.btnRight.onClick = this.onCancelClick;      
    },

    onClickSend : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var selectedData = {
        "phone" : this.view.lbxRegisteredModePhone.selectedKeyValue[0],
        "email" : this.view.lbxRegisteredModeEmail.selectedKeyValue[0]
      };
      this.setPhoneAndEmail(selectedData);
      this.requestOTP(selectedData);
    },

    requestOTP : function(params){
      var data = {
        "MFAAttributes" : {
          "serviceName" : this.getServiceId(),
          "serviceKey" : this.getServicekey(),
          "PIN":{"pin":params,
          "userName":this.getUserName()}
        }
      };
      if(this.action){
        data.Action = this.action;
      }
      this.requestOTPUtility(data);
    },

    requestOTPUtility: function(params){
      this.SecurityCodeDAO.requestLoginMFAOtp(this._objectServiceName1, this._objectName1, this._operationName1, params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
    },

    requestOTPSuccess: function(response){
      this.setMFAResponse(response);
      this.MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
      this.MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
      this.setFormUI(this.getMFAResponse());
    },

    requestOTPFailure: function(error){
      this.mfaOTPError(error);
    },

    mfaOTPError : function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else{
        this.bindError(err.errorMessage);        
      }
    },

    bindError : function(err){
    //   applicationManager.getPresentationUtility().dismissLoadingScreen();
    //   applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
    this.view.lblError.setVisibility(true);
    this.view.lblError.text=err;
    this.view.forceLayout();
    },

    setFormUIMFAOption3 : function(mfaResponse,flowType){
      this.view.flxMFAOption3Screen.setVisibility(true);
      this.view.flxSecurityCodeScreen.setVisibility(false);
      var customerCommunicationInfo = mfaResponse.MFAAttributes.customerCommunication;
      this.setFormUIForDeviceRegistration();
      this.setCustomerCommunicationInfo(customerCommunicationInfo);
      this.view.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setFormUIForDeviceRegistration : function(){      
      this.view.flxNewDevice.setVisibility(!this.isPostLogin);
      this.view.flxDeviceRegistration.setVisibility(false);
      var userObj = applicationManager.getUserPreferencesManager();
      var uname = userObj.gettempUserName();
      this.view.lblName = "Hi!! "+uname+" Let's authenticate";
      this.view.lblLetsAuthenticateTransaction.setVisibility(this.isPostLogin);
    },

    setCustomerCommunicationInfo : function(customerCommunicationInfo){
      if(customerCommunicationInfo.phone && customerCommunicationInfo.email)
      {
        this.view.lblSecurityCode.text=kony.i18n.getLocalizedString("kony.mb.MFA.SentCodeMultiple");
        this.view.flxModeOfContactPhone.setVisibility(true);
        this.view.flxModeOfContactEmail.setVisibility(true);
        this.view.lbxRegisteredModePhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
        this.view.lbxRegisteredModeEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
        this.view.lbxRegisteredModePhone.selectedKey = this.view.lbxRegisteredModePhone.masterData[0][0];
        this.view.lbxRegisteredModeEmail.selectedKey = this.view.lbxRegisteredModeEmail.masterData[0][0];
      }
      else if(customerCommunicationInfo.phone)
      {
        this.view.lblSecurityCode.text=kony.i18n.getLocalizedString("kony.mb.MFA.SentCodetoPhone");
        this.view.flxModeOfContactPhone.setVisibility(true);
        this.view.flxModeOfContactEmail.setVisibility(false);
        this.view.lbxRegisteredModePhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
        this.view.lbxRegisteredModePhone.selectedKey = this.view.lbxRegisteredModePhone.masterData[0][0];
      }
      else if(customerCommunicationInfo.email)
      {
        this.view.lblSecurityCode.text=kony.i18n.getLocalizedString("kony.mb.MFA.SentCodetoEmail");
        this.view.flxModeOfContactPhone.setVisibility(false);
        this.view.flxModeOfContactEmail.setVisibility(true);
        this.view.lbxRegisteredModeEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
        this.view.lbxRegisteredModeEmail.selectedKey = this.view.lbxRegisteredModeEmail.masterData[0][0];
      }
    },

    setDataForPhoneListBox:function(phoneObj){
      var phoneNumbers = phoneObj.map(function (dataItem) {
        var phoneNumber = [];
        phoneNumber.push(dataItem.unmasked);
        phoneNumber.push(dataItem.masked);
        return phoneNumber;
      });
      return phoneNumbers;
    },

    setDataForEmailListBox:function(emailObj){
      var emailsIds = emailObj.map(function (dataItem) {
        var email = [];
        email.push(dataItem.unmasked);
        email.push(dataItem.masked);
        return email;
      });
      return emailsIds;
    },

    // SECURITY CODE FUNCTIONALITY
    /*===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====*/
    mfaDeviceBack:function(){
      // TODO - Call this method whenever user clicks on back button of device
      if(this.view.flxSecurityCodeScreen.isVisible===true){
        this.view.flxMFAOption3Screen.setVisibility(true);
        this.view.flxSecurityCodeScreen.setVisibility(false);
      }
    },

    setPreShowForSecurityCodeScreen: function(){
      // Preshow for flxSecurityCodeScreen
      this.view.btnVerify.setEnabled(false);
      this.view.btnVerify.skin = this._screen2SubmitBtnDisabledSkin;
      this.view.flxResendTimer.setVisibility(false);
      this.view.lblTimeRemaining.text = "59"+" seconds";
            this.view.btnReSend.setVisibility(true);
      this.time=59;
      this.view.flxCode.setVisibility(true);
      this.view.lblError.setVisibility(false);
      this.view.lblTimeRemaining.setVisibility(false);
      let userPreferencesManager = applicationManager.getUserPreferencesManager();
      //this.view.flxRememberMyDevice.setVisibility(this.getMFAFlowType() === "LoginMFA" && (userPreferencesManager.isRememberMeOn() === true));
      this.setFlowActionsSecurityCodeScreen();
      this.clearKeypad();
      this.setKeypadActions();
    },

    setFlowActionsSecurityCodeScreen: function(){
		var scope=this;
		var navManager = applicationManager.getNavigationManager();
		var biometricMfa=kony.store.getItem("BiometricMFAEnable");
		var transactionPinStatus = kony.store.getItem("transactionPinSetOrNot");
		var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
                    if (transactionPinStatus == "true" ||(legacyUserdetails&&legacyUserdetails.IsLegacyUser)) {
					scope.view.flxMFAPopup.setVisibility(false);
					}
					else{
						scope.view.flxMFAPopup.setVisibility(true);
					}
		this.view.btnMFAContinue.onClick=this.navigateTosettings;
		this.view.imgClose.onTouchEnd=this.closePopUp;
		this.view.btnCancel.onClick=this.closePopUp;
		this.view.flxProfilesettings.onClick=this.navigateTosettings;
      this.view.btnReSend.onClick = this.BiometricValidation;
	  this.view.imgBiometricFlow.onTouchEnd= this.BiometricValidation.bind(this);
	  this.view.flxBiometricInvoke.onClick=this.BiometricValidation;
      this.view.flxCheckBox.onClick = this.toggleCheckbox;
      this.view.btnVerify.onClick = this.onVerifyClick;
      this.view.customHeader.btnRight.onClick = this.onCancelClick;      
      this.view.flxCheckBox.onClick=this.deviceregOnclick;
	  this.view.imgPeek.onTouchEnd=this.togglecheck
    },

    onCancelClick : function(){
      const scopeObj = this;
      if(scopeObj.onCancel) 
        scopeObj.onCancel();
    },

    deviceregOnclick:function(){
      const scopeObj = this;
      if(this.view.imgTermsAccepted.src===this._checkboxUnselectedImg){
        if(scopeObj.rememberDeviceRegFlag) scopeObj.rememberDeviceRegFlag(true);        
        this.view.imgTermsAccepted.src=scopeObj._checkboxSelectedImg;
      } else {
        if(scopeObj.rememberDeviceRegFlag) scopeObj.rememberDeviceRegFlag(false);
        this.view.imgTermsAccepted.src=this._checkboxUnselectedImg;
      }
    },

    setFormUI : function(mfaResponse){
      this.view.flxMFAOption3Screen.setVisibility(false);
      this.view.flxSecurityCodeScreen.setVisibility(true);
      this.view.btnVerify.setEnabled(false);
      this.view.btnVerify.skin = this._screen2SubmitBtnDisabledSkin;
      this.view.flxResendTimer.setVisibility(false);
      if(mfaResponse.MFAAttributes.isPinValid==false){
        //this.view.lblError.text = kony.i18n.getLocalizedString("kony.mb.mfa.otpexpirymessage");
        this.view.lblError.setVisibility(true);
        this.clearKeypad();
      
            } else if (mfaResponse.MFAAttributes.remainingResendAttempts <= 0) {
                this.view.btnReSend.setVisibility(true);
                this.view.lblError.setVisibility(false);
            } else if (mfaResponse.MFAAttributes.remainingResendAttempts > 0) {
                this.view.btnReSend.setVisibility(true);
            }
            this.view.lblResendin.setVisibility(false);
            if (mfaResponse.MFAAttributes.sacCodeLength) this.maxNoOfCode = 6;
            this.view.customSecurityCode2.setMaxNoOfChars(this.maxNoOfCode);
            this.setFormUIBasedOnCommunicationType(mfaResponse);
            this.view.forceLayout();
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        setFormUIBasedOnCommunicationType: function(mfaResponse) {
            var communicationType = mfaResponse.MFAAttributes.communicationType;
            if (communicationType === "DISPLAY_NO_VALUE") {
               // this.view.lblEnterInfoSubtitle.text = kony.i18n.getLocalizedString("i18n.mfa.mb.pleaseenter") + " " + this.maxNoOfCode + " " + kony.i18n.getLocalizedString("i18n.mfa.mb.noofTpin");
                this.view.flxDetails.setVisibility(false);
                this.view.lblEnterInfoSubtitle.setVisibility(true);
            } else if (communicationType === "DISPLAY_PRIMARY") {
                var phone = mfaResponse.MFAAttributes.customerCommunication.phone[0];
                var email = mfaResponse.MFAAttributes.customerCommunication.email[0];
                if (phone && email) {
                    //this.view.lblEnterSAC.text = "Enter Secure Access Code sent on your "+ mfaResponse.MFAAttributes.customerCommunication.phone[0].masked +" & "+mfaResponse.MFAAttributes.customerCommunication.email[0].masked;
                } else if (email) {
                    //this.view.lblEnterSAC.text = "Enter Secure Access Code sent on your "+mfaResponse.MFAAttributes.customerCommunication.email[0].masked;
                } else {
                    //this.view.lblEnterSAC.text = "Enter Secure Access Code sent on your "+mfaResponse.MFAAttributes.customerCommunication.phone[0].masked;
                }
                this.view.lblEnterInfoSubtitle.setVisibility(false);
                this.view.flxDetails.setVisibility(true);
            } else {
               // this.view.lblEnterInfoSubtitle.text = kony.i18n.getLocalizedString("i18n.mfa.mb.pleaseenter") + " " + this.maxNoOfCode + " " + kony.i18n.getLocalizedString("i18n.mfa.mb.noofTpin");
                this.view.lblEnterInfoSubtitle.setVisibility(true);
                this.view.flxDetails.setVisibility(false);
            }
        },
        onVerifyClick: function() {
			try{
				var scope=this;
			var transactionPinStatus = kony.store.getItem("transactionPinSetOrNot");
			var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
                    if (transactionPinStatus == "true" || (legacyUserdetails&&legacyUserdetails.IsLegacyUser)) {
						if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
							var  params = {
                "userid": legacyUserdetails.userName,
                "pin": this.keypadString
            };
							scope.SecurityCodeDAO.login(params, scope.verifyOTPSuccess.bind(scope), scope.verifyOTPFailure.bind(scope),"DBXUserLogin");
						}
						else{
            applicationManager.getPresentationUtility().showLoadingScreen();
            var response = this.getMFAResponse();
            var params = {};
            var userObj = applicationManager.getUserPreferencesManager();
            var uname = userObj.gettempUserName();
            params = {
                "userName": uname,
                "pin": this.keypadString
            };
            this.verifyOTP(params);
					}
					}
					else{
						 applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.TPSetup"));
					}
			}catch(e){
				kony.print("error in MFA"+e);
					}
        },
        verifyOTP: function(data) {
            data = {
                "MFAAttributes": {
                    "serviceName": this.getServiceId(),
                    "serviceKey": this.getServicekey(),
                    "PIN": data
                }
            };
            if (this.action) {
                data.Action = this.action;
            }
            this.verifyOTPUtility(data);
        },
        verifyOTPUtility: function(params) {
            this.SecurityCodeDAO.verifyLoginMFAOtp(this._objectServiceName2, this._objectName2, this._operationName2, params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
        },
        verifyOTPSuccess: function(response) {
            const scopeObj = this;
            if (response.MFAAttributes) {
                if (response.MFAAttributes.securityKey) {
                    scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                    scopeObj.MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
                    scopeObj.MFAResponse.MFAAttributes.communicationType = scopeObj.getCommunicationType();
                    scopeObj.MFAResponse.MFAAttributes.isOTPExpired = false;
                } else if (response.MFAAttributes.isOTPExpired) {
                    scopeObj.MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                    scopeObj.MFAResponse.MFAAttributes.isOTPExpired = response.MFAAttributes.isOTPExpired;
                    scopeObj.MFAResponse.MFAAttributes.communicationType = scopeObj.getCommunicationType();
                } else if (response.isPinValid == "false") {
                    this.showIncorrectOTPError(response);
                    return;
                }
                this.navigateToSecureCodeScreen();
            } else {
                if (scopeObj.onSuccessCallback) scopeObj.onSuccessCallback(response);
            }
        },
        verifyOTPFailure: function(error) {
            if (!(error.serverErrorReserror&&error.serverErrorReserror.serverErrorRes.dbpErrCode >= 10500 && error.serverErrorRes.dbpErrCode <= 10700) && this.onFailureCallback) {
                this.setErrorMessageAndLogout(error, false);
            } else {
                this.showIncorrectOTPError(error.serverErrorRes);
            }
        },
        setKeypadChar: function(num) {
			var togglevalue;
			if(this.view.imgPeek.src=="viewicon.png"){
				togglevalue=false;
			}
			else{
				togglevalue=true;
			}
            if (this.keypadString.length === parseInt(this.maxNoOfCode)) return;
            this.keypadString = this.keypadString + num;
            this.view.customSecurityCode2.setSecurityCodeChar(this.pos, num,togglevalue);
            this.pos++;
            this.enableVerifyButton();
        },
        clearKeypad: function() {
            this.keypadString = '';
            this.pos = 0;
            this.clearKeypadChar();
        },
        clearKeypadChar: function() {
            if (this.keypadString.length === 0) {
                this.keypadString = '';
				this.view.customSecurityCode2.setKeypadString(this.keypadString);
                for (i = 0; i < this.maxNoOfCode; i++) this.view.customSecurityCode2.setPlaceholder(i);
            }
            if (this.keypadString.length !== 0) {
                var clearpos = this.pos--;
                this.view.customSecurityCode2.setPlaceholder(clearpos - 1);
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
				this.view.customSecurityCode2.setKeypadString(this.keypadString);
            }
            this.enableVerifyButton();
        },
        setLabel: function() {
            kony.timer.schedule("OTPTimer", this.timerFunction, 1, true);
        },
        timerFunction: function() {
            this.time = this.time - 1;
            if (this.time === 1) {
                this.view.lblTimeRemaining.text = this.time + " second";
            } else if (this.time === 0) {
                kony.timer.cancel("OTPTimer");
                this.view.flxResendTimer.isVisible = false;
               this.view.btnReSend.isVisible = true;
            } else {
                this.view.lblTimeRemaining.text = this.time + " seconds";
            }
        },
        ResendOTP: function() {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var response = this.getMFAResponse();
            if (response.MFAAttributes.remainingResendAttempts >= 1) this.view.btnReSend.isVisible = true;
            else 
				this.view.btnReSend.isVisible = true;
            response = this.getMFAResponse();
            var params;
            if (response.MFAAttributes.hasOwnProperty("customerCommunication")) {
                params = {
                    "phone": response.MFAAttributes.customerCommunication.phone[0].unmasked,
                    "email": response.MFAAttributes.customerCommunication.email[0].unmasked,
                    "securityKey": response.MFAAttributes.securityKey,
                };
                this.setPhoneAndEmail({
                    "phone": params.phone,
                    "email": params.email
                });
            } else {
                params = this.getPhoneAndEmail();
                params.securityKey = response.MFAAttributes.securityKey;
            }
            this.resendOTP(params);
        },
        resendOTP: function(data) {
            data = {
                "MFAAttributes": {
                    "serviceName": this.getServiceId(),
                    "serviceKey": this.getServicekey(),
                    "OTP": data
                }
            };
            if (this.action) {
                data.Action = this.action;
            }
            this.resendOTPUtility(data);
        },
        resendOTPUtility: function(params) {
            this.SecurityCodeDAO.requestLoginMFAOtp(this._objectServiceName1, this._objectName1, this._operationName1, params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
        },
        showIncorrectOTPError: function(response) {
            if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts > 0) {
                this.view.lblError.text = kony.i18n.getLocalizedString("i18n.mfa.invalidTransactionPin") + " " + kony.i18n.getLocalizedString("kony.mb.mfa.youHaveOnly") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
                this.view.lblError.setVisibility(true);
                this.clearKeypad();
                applicationManager.getPresentationUtility().dismissLoadingScreen();
            } else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.lockUser === "true") {
                let msg = kony.i18n.getLocalizedString("kony.mb.mfa.profileLockoutMessage") + response.MFAAttributes.lockoutTime + "minutes(s)";
                this.setErrorMessageAndLogout(msg, true);
            } else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.logoutUser === "true") {
                let msg = kony.i18n.getLocalizedString("kony.mb.mfa.profileloginmessage");
                this.setErrorMessageAndLogout(msg, true);
            } else {
                this.view.lblError.text = response.dbpErrMsg;
                this.view.lblError.setVisibility(true);
                this.clearKeypad();
                applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
            this.view.forceLayout();
        },
        setErrorMessageAndLogout: function(msg, isLogoutUser) {
            const scopeObj = this;
            if (scopeObj.onFailureCallback) {
                scopeObj.onFailureCallback({
                    "errorMessage": msg,
                    "isLogoutUser": isLogoutUser
                });
            }
        },
        toggleCheckbox: function() {
            if (this.view.imgTermsAccepted.src === this._checkboxUnselectedImg) {
                this.view.imgTermsAccepted.src = this._checkboxSelectedImg;
            } else if (this.view.imgTermsAccepted.src === this._checkboxSelectedImg) {
                this.view.imgTermsAccepted.src = this._checkboxUnselectedImg;
            }
            this.view.forceLayout();
        },
		togglecheck:function(){
			var self=this;
			if (self.view.imgPeek.src === "viewicon.png") {
                self.view.imgPeek.src = "viewactive.png";
				self.view.customSecurityCode2.toggleHandler(true);
            } else if (self.view.imgPeek.src === "viewactive.png") {
                self.view.imgPeek.src = "viewicon.png";
				self.view.customSecurityCode2.toggleHandler(false);
            }
            this.view.forceLayout();
		},
        setKeypadActions: function() {
            var scope = this;
            this.view.keypad.btnOne.onClick = function() {
                scope.setKeypadChar("1");
            };
            this.view.keypad.btnTwo.onClick = function() {
                scope.setKeypadChar("2");
            };
            this.view.keypad.btnThree.onClick = function() {
                scope.setKeypadChar("3");
            };
            this.view.keypad.btnFour.onClick = function() {
                scope.setKeypadChar("4");
            };
            this.view.keypad.btnFive.onClick = function() {
                scope.setKeypadChar("5");
            };
            this.view.keypad.btnSix.onClick = function() {
                scope.setKeypadChar("6");
            };
            this.view.keypad.btnSeven.onClick = function() {
                scope.setKeypadChar("7");
            };
            this.view.keypad.btnEight.onClick = function() {
                scope.setKeypadChar("8");
            };
            this.view.keypad.btnNine.onClick = function() {
                scope.setKeypadChar("9");
            };
            this.view.keypad.btnZero.onClick = function() {
                scope.setKeypadChar("0");
            };
            this.view.keypad.imgClearKeypad.onTouchStart = function() {
                scope.clearKeypadChar();
            };
        },
        enableVerifyButton: function() {
            if (this.pos === parseInt(this.maxNoOfCode)) {
                this.view.btnVerify.setEnabled(true);
                this.view.btnVerify.skin = this._screen2SubmitBtnEnabledSkin;
            } else {
                this.view.btnVerify.setEnabled(false);
                this.view.btnVerify.skin = this._screen2SubmitBtnDisabledSkin;
            }
        },
        BiometricValidation: function() {
            try {
                var deviceName = kony.os.deviceInfo().name;
				var navManager=applicationManager.getNavigationManager();
				var bioInfo=kony.store.getItem("BiometricMFAEnable");
                var self = this;

                function isAuthUsingTouchSupported() {
                    var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
                    if (deviceName === "iPhone" || deviceName === "iPhone Simulator" || deviceName === "iPad" || deviceName === "iPad Simulator") {
                        var biometricType = kony.localAuthentication.getBiometryType();
                        return (biometricType == constants.BIOMETRY_TYPE_TOUCHID) ? true : false;
                    } else {
                        var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
                        return (status == 5000) ? true : false;
                    }
                }

                function isFaceIdSupported() {
                    var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
                    if (deviceName === "iPhone" || deviceName === "iPhone Simulator" || deviceName === "iPad" || deviceName === "iPad Simulator") {
                        var biometricType = kony.localAuthentication.getBiometryType();
                        if ((status == 5007 || status == 5000) && biometricType == constants.BIOMETRY_TYPE_FACEID) {
                            return true;
                        } else return false;
                    } else {
                        var result = kony.localAuthentication.checkFeatureAvailability(["face", "fingerprint", "iris"]);
                        if ((status == 5007 || status == 5000) && result.face == kony.localAuthentication.FEATURE_AVAILABLE) {
                            return true;
                        } else return false;
                    }
                }
                var status = kony.localAuthentication.getStatusForAuthenticationMode(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID);
                var touchId = isAuthUsingTouchSupported();
                var faceId = isFaceIdSupported();
                if (status == 5000 && bioInfo) {
                    if (touchId || faceId) {
                        var configMap = {
                            "promptMessage": "Verify Your Identity",
                            "fallbackTitle": "Please enter your Password",
                            "description": "",
                            "policy": constants.LOCAL_AUTHENTICATION_POLICY_DEV_OWNER_AUTH_WITH_BIOMETRICS,
                            "subTitle": "",
                            "deviceCredentialAllowed": true,
                            "confirmationRequired": true,
                            "negativeButtonText": "Negative",
                            "authenticators": [kony.localAuthentication.BIOMETRIC_WEAK, kony.localAuthentication.DEVICE_CREDENTIAL]
                        };
                        kony.localAuthentication.authenticate(constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID, self.BiometriccallBack, configMap)
                    }
                } else if (status == 5007 || !bioInfo) {
					this.view.lblpopupHeader.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricmfa");
						this.view.lblContent1.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricContent1");
						this.view.lblContent2.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricContent2");
						this.view.lblContent3.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricContent3");
						this.view.btnMFAContinue.text=kony.i18n.getLocalizedString("kony.mb.CM.continue");
                    this.view.flxMFAPopup.setVisibility(true);
                }
            } catch (e) {
                kony.print("Error in Biometric*************" + e);
            }
        },
        BiometriccallBack: function(status, message, info) {
            try {
                if (status == 5000) {
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    var response = this.getMFAResponse();
                    var params = {};
                    var userObj = applicationManager.getUserPreferencesManager();
                    var uname = userObj.gettempUserName();
                    params = {
                        "userName": uname,
                        "BiometricStatus": status
                    };
                    this.verifyBiometric(params);
                } else {
                    var messg =  "Authentication Failed";
                   // kony.ui.Alert({
                    //    message: messg,
                     //   alertType: constants.ALERT_TYPE_INFO,
                      //  yesLabel: "Close"
                    //},
					//applicationManager.getPresentationUtility().Alert(messg);
                    kony.localAuthentication.cancelAuthentication();
                }
            } catch (e) {
                kony.print("***********Error in biometric callback*********" + e);
            }
        },
        verifyBiometric: function(data) {
            var data = {
                "MFAAttributes": {
                    "serviceName": this.getServiceId(),
                    "serviceKey": this.getServicekey(),
                    "Biometric": data
                }
            };
            if (this.action) {
                data.Action = this.action;
            }
            //alert(JSON.stringify(data));
            this.verifyOTPUtility(data);
        },
		navigateTosettings:function(){
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("MFAEnrtyPoint","frmMFAValidation");
			 var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
        settingsModule.presentationController.showSettings();
		},
		closePopUp:function(){
			this.view.flxMFAPopup.setVisibility(false);
		},
		setBiometricSuccess:function(){
			var bioInfo=kony.store.getItem("BiometricMFAEnable");
			if(bioInfo){
			applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,kony.i18n.getLocalizedString("i18n.mb.mfa.biometricsuccess"));
			}
			else{
				applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,kony.i18n.getLocalizedString("i18n.mb.mfa.biometric.diablebiomertic"));
			}
		},
		checkTpstatus:function(){
				var transactionPinStatus = kony.store.getItem("transactionPinSetOrNot");
				var res=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
                    if (transactionPinStatus != "true" && (res&&!res.IsLegacyUser)) {
						this.view.flxMFAPopup.setVisibility(true);
						this.view.lblpopupHeader.text=kony.i18n.getLocalizedString("i18n.HBL.TransactionPIN");
						this.view.lblContent1.text=kony.i18n.getLocalizedString("i18n.mb.MFA.TPpin.errmsg1");
						this.view.lblContent2.text=kony.i18n.getLocalizedString("i18n.mb.MFA.TPpin.errmsg2");
						this.view.lblContent3.text=kony.i18n.getLocalizedString("i18n.mb.MFA.TPpin.errmsg3");
						this.view.btnMFAContinue.text=kony.i18n.getLocalizedString("i18n.wealth.proceed");
					}
					else if (!res||!res.IsLegacyUser){
						this.view.lblpopupHeader.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricmfa");
						this.view.lblContent1.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricContent1");
						this.view.lblContent2.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricContent2");
						this.view.lblContent3.text=kony.i18n.getLocalizedString("i18n.mb.mfa.biometricContent3");
						this.view.btnMFAContinue.text=kony.i18n.getLocalizedString("kony.mb.CM.continue");
					}
		}
		
    };
});